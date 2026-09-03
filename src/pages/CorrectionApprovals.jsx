import { useEffect, useState } from "react";
import apiRequest from "../Config/api.js";
import { useToast } from "../components/ToastProvider.jsx";
import { useConfirm } from "../components/ConfirmDialog.jsx";
import {
  Box,
  Typography,
  Button,
  Card,
  Chip,
  Avatar,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  IconButton,
  Divider,
  CircularProgress,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import PendingActionsRoundedIcon from "@mui/icons-material/PendingActionsRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CorePageShell, {
  CoreMetricCards,
  CoreTable,
} from "../components/CorePageShell.jsx";

const FONT =
  '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

// ======================================================
// NEW CORRECTION REQUEST DIALOG
// ======================================================

function NewCorrectionDialog({ open, onClose, onSubmitted }) {
  const toast = useToast();

  // All locked entries returned by the backend.
  const [lockedEntries, setLockedEntries] = useState([]);
  const [loadingEntries, setLoadingEntries] = useState(false);

  // Two-step selection: pick project first, then date.
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [pickedDate, setPickedDate] = useState(""); // "YYYY-MM-DD" string

  // Other form fields.
  const [fieldName, setFieldName] = useState("");
  const [oldValue, setOldValue] = useState("");
  const [newValue, setNewValue] = useState("");
  const [reason, setReason] = useState("");

  // Submission state.
  const [submitting, setSubmitting] = useState(false);

  // Field-level errors.
  const [errors, setErrors] = useState({});

  // Load locked entries whenever the dialog opens.
  useEffect(() => {
    if (!open) return;

    const load = async () => {
      setLoadingEntries(true);
      try {
        const data = await apiRequest(
          "/indexer/corrections/locked-entries"
        );
        setLockedEntries(data.entries || []);
      } catch (err) {
        toast.error(err.message || "Failed to load locked entries");
      } finally {
        setLoadingEntries(false);
      }
    };

    load();

    // Reset entire form on open.
    setSelectedProjectId("");
    setPickedDate("");
    setFieldName("");
    setOldValue("");
    setNewValue("");
    setReason("");
    setErrors({});
  }, [open]);

  // Unique projects from locked entries (deduplicated).
  const uniqueProjects = lockedEntries.reduce((acc, entry) => {
    if (!acc.find((p) => p.project_id === entry.project_id)) {
      acc.push({ project_id: entry.project_id, project_name: entry.project_name });
    }
    return acc;
  }, []);

  // Entries that belong to the selected project.
  const datesForProject = lockedEntries.filter(
    (e) => String(e.project_id) === String(selectedProjectId)
  );

  // Set of valid date strings (YYYY-MM-DD) for the selected project — used to highlight/disable calendar days.
  const validDateStrings = new Set(datesForProject.map((e) => e.production_date));

  // Resolve the entry_id from the picked calendar date.
  const resolvedEntry = pickedDate
    ? datesForProject.find((e) => e.production_date === pickedDate)
    : null;

  const entryId = resolvedEntry?.entry_id ?? null;

  // Format date: YYYY-MM-DD → DD/MM/YYYY.
  const formatDisplayDate = (iso) => {
    if (!iso) return "";
    const [y, m, d] = iso.split("-");
    return `${d}/${m}/${y}`;
  };

  const validate = () => {
    const next = {};
    if (!selectedProjectId) next.project = "Please select a project.";
    if (!pickedDate) next.entryId = "Please select a production date.";
    else if (!entryId) next.entryId = "No locked entry found for this date.";
    if (!fieldName.trim()) next.fieldName = "Field name is required.";
    if (!newValue.trim()) next.newValue = "New value is required.";
    if (!reason.trim()) next.reason = "Reason for change is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate() || submitting) return;

    try {
      setSubmitting(true);

      await apiRequest("/indexer/corrections", {
        method: "POST",
        body: JSON.stringify({
          dailyEntryId: entryId,
          fieldName: fieldName.trim(),
          oldValue: oldValue.trim() || null,
          newValue: newValue.trim(),
          reason: reason.trim(),
        }),
      });

      toast.success("Correction request submitted successfully");
      onSubmitted?.();
      onClose();
    } catch (err) {
      toast.error(err.message || "Failed to submit correction request");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    if (submitting) return;
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={false}
      sx={{
        "& .MuiDialog-paper": {
          width: 540,
          maxWidth: "94vw",
          borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(15,23,42,0.18)",
          fontFamily: FONT,
        },
      }}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(15,23,42,0.35)",
            backdropFilter: "blur(2px)",
          },
        },
      }}
    >
      {/* HEADER */}
      <DialogTitle
        sx={{
          px: 2.75,
          py: 2.2,
          fontFamily: FONT,
          fontSize: 16,
          fontWeight: 700,
          color: "#1A2434",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        New correction request
        <IconButton
          size="small"
          onClick={handleClose}
          disabled={submitting}
          sx={{ color: "#6A7585" }}
        >
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <Divider />

      {/* BODY */}
      <DialogContent sx={{ px: 2.75, py: 2.75 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.2 }}>

          {/* PROJECT */}
          <Box>
            <Typography
              sx={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: "#3B5068", mb: 0.7 }}
            >
              Project
            </Typography>
            <TextField
              select
              fullWidth
              size="small"
              value={selectedProjectId}
              onChange={(e) => {
                setSelectedProjectId(e.target.value);
                setPickedDate(""); // reset date when project changes
                setErrors((prev) => ({ ...prev, project: undefined, entryId: undefined }));
              }}
              disabled={loadingEntries || submitting}
              error={Boolean(errors.project)}
              helperText={errors.project}
              SelectProps={{ displayEmpty: true }}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px", fontFamily: FONT, fontSize: 14 } }}
            >
              <MenuItem value="" disabled>
                <Typography sx={{ fontFamily: FONT, fontSize: 14, color: "#9aa5b4" }}>
                  {loadingEntries ? "Loading…" : "Select project"}
                </Typography>
              </MenuItem>
              {uniqueProjects.map((p) => (
                <MenuItem key={p.project_id} value={String(p.project_id)}>
                  <Typography sx={{ fontFamily: FONT, fontSize: 14 }}>
                    {p.project_name}
                  </Typography>
                </MenuItem>
              ))}
            </TextField>
          </Box>

          {/* PRODUCTION DATE + FIELD NAME */}
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            <Box>
              <Typography
                sx={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: "#3B5068", mb: 0.7 }}
              >
                Production date
              </Typography>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                }}
              >
                <input
                  type="date"
                  value={pickedDate || ""}
                  min={
                    validDateStrings.size > 0
                      ? [...validDateStrings].sort()[0]
                      : undefined
                  }
                  max={
                    validDateStrings.size > 0
                      ? [...validDateStrings].sort().at(-1)
                      : undefined
                  }
                  disabled={!selectedProjectId || submitting}
                  onChange={(e) => {
                    setPickedDate(e.target.value);
                    setErrors((prev) => ({ ...prev, entryId: undefined }));
                  }}
                  style={{
                    width: "100%",
                    height: "40px",
                    padding: "0 14px",
                    borderRadius: "8px",
                    border: errors.entryId
                      ? "1px solid #d32f2f"
                      : "1px solid #c4cdd6",
                    fontFamily: FONT,
                    fontSize: "14px",
                    color: !pickedDate ? "#9aa5b4" : "#1A2434",
                    backgroundColor:
                      !selectedProjectId ? "#f8fafc" : "#fff",
                    cursor: !selectedProjectId ? "not-allowed" : "pointer",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = errors.entryId
                      ? "#d32f2f"
                      : "#2f6df0")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = errors.entryId
                      ? "#d32f2f"
                      : "#c4cdd6")
                  }
                />
                {errors.entryId && (
                  <Typography
                    sx={{
                      fontFamily: FONT,
                      fontSize: 12,
                      color: "#d32f2f",
                      mt: 0.5,
                      ml: 0.25,
                    }}
                  >
                    {errors.entryId}
                  </Typography>
                )}
              </Box>
            </Box>

            <Box>
              <Typography
                sx={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: "#3B5068", mb: 0.7 }}
              >
                Field name
              </Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="e.g. Implant Name"
                value={fieldName}
                onChange={(e) => {
                  setFieldName(e.target.value);
                  setErrors((prev) => ({ ...prev, fieldName: undefined }));
                }}
                disabled={submitting}
                error={Boolean(errors.fieldName)}
                helperText={errors.fieldName}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px", fontFamily: FONT, fontSize: 14 } }}
              />
            </Box>
          </Box>

          {/* OLD VALUE + NEW VALUE */}
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            <Box>
              <Typography
                sx={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: "#3B5068", mb: 0.7 }}
              >
                Old value
              </Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Current value"
                value={oldValue}
                onChange={(e) => setOldValue(e.target.value)}
                disabled={submitting}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px", fontFamily: FONT, fontSize: 14 } }}
              />
            </Box>

            <Box>
              <Typography
                sx={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: "#3B5068", mb: 0.7 }}
              >
                New value
              </Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Corrected value"
                value={newValue}
                onChange={(e) => {
                  setNewValue(e.target.value);
                  setErrors((prev) => ({ ...prev, newValue: undefined }));
                }}
                disabled={submitting}
                error={Boolean(errors.newValue)}
                helperText={errors.newValue}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px", fontFamily: FONT, fontSize: 14 } }}
              />
            </Box>
          </Box>

          {/* REASON FOR CHANGE */}
          <Box>
            <Typography
              sx={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: "#3B5068", mb: 0.7 }}
            >
              Reason for change
            </Typography>
            <TextField
              fullWidth
              multiline
              minRows={3}
              placeholder="Why this correction is needed"
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
                setErrors((prev) => ({ ...prev, reason: undefined }));
              }}
              disabled={submitting}
              error={Boolean(errors.reason)}
              helperText={errors.reason}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px", fontFamily: FONT, fontSize: 14 } }}
            />
          </Box>

        </Box>
      </DialogContent>

      <Divider />

      {/* ACTIONS */}
      <DialogActions
        sx={{
          px: 2.75,
          py: 2,
          backgroundColor: "#f8fafc",
          gap: 1,
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="outlined"
          onClick={handleClose}
          disabled={submitting}
          sx={{
            height: 42,
            px: 2.5,
            borderRadius: "9px",
            textTransform: "none",
            fontFamily: FONT,
            fontSize: 13,
            fontWeight: 600,
            color: "#33415A",
            borderColor: "#dbe3ec",
            backgroundColor: "#fff",
            "&:hover": { borderColor: "#c4cfd9" },
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={submitting}
          startIcon={
            submitting ? (
              <CircularProgress size={14} sx={{ color: "#fff" }} />
            ) : null
          }
          sx={{
            height: 42,
            px: 2.5,
            borderRadius: "9px",
            textTransform: "none",
            fontFamily: FONT,
            fontSize: 13,
            fontWeight: 700,
            backgroundColor: "#2f6df0",
            boxShadow: "none",
            "&:hover": { backgroundColor: "#255dd8", boxShadow: "none" },
            "&.Mui-disabled": { backgroundColor: "#2f6df0", color: "#fff", opacity: 0.7 },
          }}
        >
          {submitting ? "Submitting…" : "Submit request"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}


const correctionStatusStyles = {
  PENDING: {
    backgroundColor: "#fff4db",
    color: "#c27a12",
    border: "1px solid #f2d39b",
  },
  APPROVED: {
    backgroundColor: "#e4f6ee",
    color: "#177a53",
    border: "1px solid #b7e3cc",
  },
  REJECTED: {
    backgroundColor: "#fde8e8",
    color: "#b42318",
    border: "1px solid #f5c4c4",
  },
};

function IndexerCorrectionRequestsIndexer({ user , onNavigate,}) {
  const toast = useToast();
  const [requestsIndexer, setRequestsIndexer] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const userName = user?.name || "Indexer";

  const userInitials = userName
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const loadMyCorrectionRequests = async () => {
      try {
        const data = await apiRequest(
          "/indexer/corrections/my"
        );

        const formattedRequests = (
          data.requests || []
        ).map((request) => ({
          id: request.request_id || request.id,
          project: request.project_name,
          date: request.production_date,
          field: request.field_name,
          change:
            `${request.old_value || "—"} → ` +
            `${request.new_value || "—"}`,
          status: String(
            request.status || "pending"
          ).toUpperCase(),
        }));

        setRequestsIndexer(formattedRequests);
      } catch (error) {
        console.error(
          "Load Indexer corrections error:",
          error
        );
        toast.error(error.message);
      }
    };

  useEffect(() => {
    loadMyCorrectionRequests();
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      {/* =================================================
          HEADER
       ================================================= */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 2.2,
          gap: 2,
        }}
      >
        <Box>
          <Typography
            sx={{
              color: "#6A7585",
              fontSize: 12.5,
              mb: 0.7,
            }}
          >
            ProdTrack · Indexer
          </Typography>

          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 800,
              color: "#1A2434",
            }}
          >
            My correction requests
          </Typography>

          <Typography
            sx={{
              mt: 0.7,
              color: "#6A7585",
              fontSize: 13.5,
            }}
          >
            Request changes to locked entries. Each request is reviewed before
            the audit log updates.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddRoundedIcon />}
          onClick={() => setDialogOpen(true)}
          sx={{
            mt: 1,
            height: 38,
            px: 1.8,
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: 700,
            boxShadow: "none",
            backgroundColor: "#2f6df6",
            flexShrink: 0,
            "&:hover": {
              backgroundColor: "#2458cf",
              boxShadow: "none",
            },
          }}
        >
          New request
        </Button>
      </Box>

      {/* =================================================
          WORKFLOW
       ================================================= */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.8,
          mb: 2.2,
          flexWrap: "wrap",
        }}
      >
        {[
          "Indexer submits",
          "Lead / Core review",
          "Approve / Reject",
          "Audit log update",
        ].map((item, index) => (
          <Box
            key={item}
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                px: 1.6,
                py: 1,
                borderRadius: "8px",
                border: "1px solid #d7e0eb",
                backgroundColor: index === 0 ? "#2f6df6" : "#fff",
                color: index === 0 ? "#fff" : "#1A2434",
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              {item}
            </Box>

            {index !== 3 && (
              <ArrowForwardRoundedIcon
                sx={{
                  mx: 0.4,
                  color: "#6A7585",
                  fontSize: 17,
                }}
              />
            )}
          </Box>
        ))}
      </Box>

      {/* =================================================
          REQUEST TABLE
       ================================================= */}

      <Card
        elevation={0}
        sx={{
          border: "1px solid #dce3ec",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(15,23,42,.05)",
          overflow: "hidden",
          backgroundColor: "#fff",
        }}
      >
        {/* ================= TABLE HEADER ================= */}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1.5fr .75fr 1fr 2fr 1.35fr .8fr",
            px: 1.6,
            py: 1.2,
            backgroundColor: "#f8fafc",
            borderBottom: "1px solid #dce3ec",
            columnGap: 1,
          }}
        >
          {[
            "PROJECT",
            "PROD. DATE",
            "FIELD",
            "OLD → NEW",
            "REQUESTED BY",
            "STATUS",
          ].map((header) => (
            <Typography
              key={header}
              sx={{
                fontSize: 11,
                fontWeight: 800,
                color: "#6A7585",
              }}
            >
              {header}
            </Typography>
          ))}
        </Box>

        {/* ================= TABLE ROWS ================= */}

        {requestsIndexer.map((request, index) => (
          <Box
            key={request.id}
            sx={{
              display: "grid",
              gridTemplateColumns: "1.5fr .75fr 1fr 2fr 1.35fr .8fr",
              px: 1.6,
              py: 1.4,
              columnGap: 1,
              alignItems: "center",
              borderBottom:
                index !== requestsIndexer.length - 1
                  ? "1px solid #e6ebf1"
                  : "none",
            }}
          >
            {/* PROJECT */}

            <Typography
              sx={{
                fontSize: 12,
                color: "#1A2434",
              }}
            >
              {request.project}
            </Typography>

            {/* DATE */}

            <Typography
              sx={{
                fontSize: 13,
                color: "#1A2434",
              }}
            >
              {request.date}
            </Typography>

            {/* FIELD */}

            <Typography
              sx={{
                fontSize: 13,
                color: "#1A2434",
              }}
            >
              {request.field}
            </Typography>

            {/* OLD → NEW */}

            <Typography
              sx={{
                fontSize: 13,
                color: "#6A7585",
              }}
            >
              {request.change}
            </Typography>

            {/* REQUESTED BY */}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.8,
              }}
            >
              <Avatar
                sx={{
                  width: 24,
                  height: 24,
                  fontSize: 10,
                  fontWeight: 700,
                  backgroundColor: "#6366df",
                }}
              >
                {userInitials}
              </Avatar>

              <Typography
                sx={{
                  fontSize: 12,
                  color: "#1A2434",
                }}
              >
                {userName}
              </Typography>
            </Box>

            {/* STATUS */}

            <Chip
              label={request.status}
              size="small"
              sx={{
                width: "fit-content",
                height: 22,
                ...correctionStatusStyles[request.status],
                fontSize: 9,
                fontWeight: 800,
              }}
            />
          </Box>
        ))}
      </Card>

      {/* NEW CORRECTION REQUEST DIALOG */}
      <NewCorrectionDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmitted={loadMyCorrectionRequests}
      />
    </Box>
  );
}
const initialTeamLead = [
  ["ABC Medical Imaging", "18 Aug 2026", "Priya Sharma", "312", "Pending"],
  ["Ortho Kids", "18 Aug 2026", "Aditya Rao", "281", "Pending"],
  ["Spine Indexing", "17 Aug 2026", "Sneha Iyer", "214", "Approved"],
];
function ApprovalsTeamLead() {
  const [rows, setRows] = useState(initialTeamLead);
  const update = (i, status) =>
    setRows((r) => r.map((x, n) => (n === i ? [...x.slice(0, 4), status] : x)));
  return (
    <Box>
      <Typography
        sx={{
          color: "#6A7585",
          fontSize: 12.5,
        }}
      >
        ProdTrack · Team Lead
      </Typography>
      <Typography
        sx={{
          fontSize: 18,
          fontWeight: 800,
        }}
      >
        Approvals
      </Typography>
      <Typography
        sx={{
          color: "#6A7585",
          fontSize: 13.5,
          mt: 0.4,
          mb: 2,
        }}
      >
        Review team entries and correction requests before final submission.
      </Typography>
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          border: "1px solid #dbe3ec",
          borderRadius: 2,
        }}
      >
        <Table size="small">
          <TableHead>
            <TableRow>
              {[
                "PROJECT",
                "DATE",
                "EMPLOYEE",
                "COMPLETED",
                "STATUS",
                "ACTION",
              ].map((h) => (
                <TableCell
                  key={h}
                  sx={{
                    fontWeight: 800,
                    fontSize: 11,
                  }}
                >
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((r, i) => (
              <TableRow key={r[0] + r[2]}>
                {r.slice(0, 4).map((c, j) => (
                  <TableCell key={j}>{c}</TableCell>
                ))}
                <TableCell>
                  <Chip
                    size="small"
                    label={r[4]}
                    color={r[4] === "Approved" ? "success" : "warning"}
                  />
                </TableCell>
                <TableCell>
                  {r[4] === "Pending" && (
                    <>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => update(i, "Approved")}
                      >
                        Approve
                      </Button>
                      <Button
                        size="small"
                        sx={{
                          ml: 0.5,
                        }}
                        onClick={() => update(i, "Rejected")}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
const rowsCoreTeam = [
  [
    "ABC Medical Imaging",
    "19 May",
    "Implant Name",
    "ABC Screw 5.0 → ABC Screw 5.5",
    "Priya Sharma",
    "PENDING",
  ],
  [
    "Ortho Kids",
    "18 May",
    "Lot Number",
    "LT-441 → LT-4471",
    "Aditya Rao",
    "PENDING",
  ],
  [
    "Spine Indexing",
    "17 May",
    "Page Type",
    "Op → OP Note",
    "Sneha Iyer",
    "APPROVED",
  ],
  [
    "Cardio Records",
    "16 May",
    "Manufacturer",
    "ABC → ABC Medical",
    "Divya Menon",
    "REJECTED",
  ],
];
function CorrectionsCoreTeam({
  roleKey,
  roleLabel = "Team Lead",
}) {
  const toast = useToast();
  const { confirm, ConfirmElement } = useConfirm();
  const [rows, setRows] = useState([]);
  const [approvalSummary, setApprovalSummary] = useState({
  awaitingReview: 0,
  approvedMonth: 0,
  rejectedMonth: 0,
  averageTurnaroundHours: 0,
});

useEffect(() => {
  const loadPendingRequests = async () => {
    if (
        ![
          "teamLead",
          "coreTeam",
          "administrator",
        ].includes(roleKey)
      ) {
        return;
      }
    try {
      const data = await apiRequest("/team-lead/approvals");

      const backendRows = (data.requests || []).map((request) => [
        request.project_name,
        request.production_date,
        request.field_name,
        `${request.old_value || "—"} → ${request.new_value || "—"}`,
        request.employee_name,
        String(request.status || "pending").toUpperCase(),
        request.request_id || request.id,
      ]);

      setRows(backendRows);
    } catch (error) {
      console.error("Load correction approvals error:", error);
      toast.error(error.message);
    }
  };

 loadPendingRequests();
}, [roleKey]);

const loadApprovalSummary = async () => {
  if (
      ![
        "teamLead",
        "coreTeam",
        "administrator",
      ].includes(roleKey)
    ) {
      return;
    }
  try {
    const data = await apiRequest(
      "/team-lead/approvals/summary"
    );

    setApprovalSummary(data.summary);
  } catch (error) {
    console.error("Load approval summary error:", error);
  }
};

useEffect(() => {
  loadApprovalSummary();
}, [roleKey]);

const updateStatus = async (rowIndex, newStatus) => {
  const requestId = rows[rowIndex]?.[6];

  if (!requestId) {
    toast.warning("Correction request ID is missing");
    return;
  }

  const isDanger = newStatus === "REJECTED";
  const confirmed = await confirm({
    title: newStatus === "APPROVED" ? "Approve correction?" : "Reject correction?",
    message: `${newStatus === "APPROVED" ? "Approve" : "Reject"} the correction request from ${rows[rowIndex]?.[4] || "this employee"}?`,
    confirmLabel: newStatus === "APPROVED" ? "Approve" : "Reject",
    danger: isDanger,
  });

  if (!confirmed) return;

  const action =
    newStatus === "APPROVED"
      ? "approve"
      : "reject";

  try {
    const data = await apiRequest(
      `/team-lead/approvals/${requestId}/${action}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          reviewComment:
            newStatus === "APPROVED"
              ? "Approved from Team Lead approvals page"
              : "Rejected from Team Lead approvals page",
        }),
      }
    );

    setRows((currentRows) =>
      currentRows.map((row, index) =>
        index === rowIndex
          ? [...row.slice(0, 5), newStatus, row[6]]
          : row
      )
    );

    toast.success(data.message);
    await loadApprovalSummary();
  } catch (error) {
    console.error("Update correction status error:", error);
    toast.error(error.message);
  }
};

  const workflowSteps = [
    "Indexer submits",
    "Lead / Core review",
    "Approve / Reject",
    "Audit log update",
  ];

  const metrics = [
    {
      icon: <PendingActionsRoundedIcon />,
      label: "Awaiting review",
      value: approvalSummary.awaitingReview,
      background: "#fff3dc",
      iconColor: "#a66b00",
    },
    {
      icon: <CheckCircleRoundedIcon />,
      label: "Approved (mo.)",
      value: approvalSummary.approvedMonth,
      background: "#e2f6ec",
      iconColor: "#087a4d",
    },
    {
      icon: <CancelRoundedIcon />,
      label: "Rejected (mo.)",
      value: approvalSummary.rejectedMonth,
      background: "#fde8e8",
      iconColor: "#b42318",
    },
    {
      icon: <AccessTimeRoundedIcon />,
      label: "Avg. turnaround",
      value: `${approvalSummary.averageTurnaroundHours}h`,
      background: "#eaf1ff",
      iconColor: "#2f6df6",
    },
  ];

  const statusColors = {
    PENDING: {
      backgroundColor: "#fff3dc",
      color: "#a66b00",
      border: "1px solid #efd499",
    },
    APPROVED: {
      backgroundColor: "#e2f6ec",
      color: "#087a4d",
      border: "1px solid #b9e5d0",
    },
    REJECTED: {
      backgroundColor: "#fde8e8",
      color: "#b42318",
      border: "1px solid #f5c4c4",
    },
  };

  return (
    <>
    <CorePageShell
      breadcrumb={roleLabel}
      title="Correction requests"
      description="Review and approve/reject correction requests raised on locked entries."
      actionLabel={null}
    >
      {/* WORKFLOW */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 1,
          mb: 2.5,
        }}
      >
        {workflowSteps.map((step, index) => (
          <Box
            key={step}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Box
              sx={{
                px: 2.2,
                py: 1.4,
                borderRadius: "11px",
                border: "1px solid #dbe3ec",
                backgroundColor: index === 1 ? "#3478ed" : "#ffffff",
                color: index === 1 ? "#ffffff" : "#1A2434",
                fontSize: 13,
                fontWeight: 700,
                whiteSpace: "nowrap",
              }}
            >
              {step}
            </Box>

            {index < workflowSteps.length - 1 && (
              <Typography
                sx={{
                  color: "#6A7585",
                  fontSize: 18,
                }}
              >
                →
              </Typography>
            )}
          </Box>
        ))}
      </Box>

      {/* METRIC CARDS */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: 2,
          mb: 2.5,
        }}
      >
        {metrics.map((metric) => (
          <Paper
            key={metric.label}
            elevation={0}
            sx={{
              minHeight: 98,
              p: 2,
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              border: "1px solid #dbe3ec",
              borderRadius: "12px",
              boxShadow: "0 2px 5px rgba(16,35,61,.08)",
            }}
          >
            <Box
              sx={{
                width: 46,
                height: 46,
                flexShrink: 0,
                display: "grid",
                placeItems: "center",
                borderRadius: "12px",
                backgroundColor: metric.background,
                color: metric.iconColor,
              }}
            >
              {metric.icon}
            </Box>

            <Box>
              <Typography
                sx={{
                  color: "#6A7585",
                  fontSize: 12.5,
                }}
              >
                {metric.label}
              </Typography>

              <Typography
                sx={{
                  color: "#1A2434",
                  fontSize: 25,
                  fontWeight: 800,
                  lineHeight: 1.2,
                }}
              >
                {metric.value}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>

      {/* CORRECTION TABLE */}
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          border: "1px solid #dbe3ec",
          borderRadius: "12px",
          overflowX: "auto",
        }}
      >
        <Table size="small" sx={{ minWidth: 1050 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f8fafc" }}>
              {[
                "PROJECT",
                "PROD. DATE",
                "FIELD",
                "OLD → NEW",
                "REQUESTED BY",
                "STATUS",
                "ACTION",
              ].map((heading) => (
                <TableCell
                  key={heading}
                  sx={{
                    py: 1.5,
                    color: "#6A7585",
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                >
                  {heading}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow key={row[6] || `${row[0]}-${rowIndex}`} hover>
                <TableCell>{row[0]}</TableCell>

                <TableCell>{row[1]}</TableCell>

                <TableCell>{row[2]}</TableCell>

                <TableCell sx={{ color: "#6A7585" }}>{row[3]}</TableCell>

                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      whiteSpace: "nowrap",
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: "#5b5ce2",
                        color: "#ffffff",
                        fontSize: 11,
                        fontWeight: 800,
                      }}
                    >
                      {row[4]
                        .split(" ")
                        .map((name) => name[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </Avatar>

                    <Typography
                      sx={{
                        fontSize: 13,
                        color: "#1A2434",
                      }}
                    >
                      {row[4]}
                    </Typography>
                  </Box>
                </TableCell>

                <TableCell>
                  <Chip
                    label={row[5]}
                    size="small"
                    sx={{
                      ...statusColors[row[5]],
                      height: 25,
                      fontSize: 10,
                      fontWeight: 800,
                    }}
                  />
                </TableCell>

                <TableCell>
                  {row[5] === "PENDING" && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.7,
                      }}
                    >
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => updateStatus(rowIndex, "APPROVED")}
                        sx={{
                          minWidth: 84,
                          height: 38,
                          borderRadius: "10px",
                          textTransform: "none",
                          fontWeight: 700,
                          boxShadow: "none",
                        }}
                      >
                        Approve
                      </Button>

                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => updateStatus(rowIndex, "REJECTED")}
                        sx={{
                          minWidth: 70,
                          height: 38,
                          borderRadius: "10px",
                          textTransform: "none",
                          color: "#17233a",
                          borderColor: "#dbe3ec",
                          fontWeight: 500,
                        }}
                      >
                        Reject
                      </Button>
                    </Box>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </CorePageShell>
    {ConfirmElement}
    </>
  );
}
const rowsAdministrator = [
  [
    "ABC-2024-0511",
    "Priya Sharma",
    "Implant Name",
    "Typo in device label",
    "20 May 09:12",
    "PENDING",
  ],
  [
    "ORT-2024-0320",
    "Aditya Rao",
    "Procedure Code",
    "Wrong CPT code entered",
    "19 May 14:35",
    "PENDING",
  ],
  [
    "SPI-2024-0198",
    "Karan Patel",
    "Patient DOB",
    "Date format mismatch",
    "18 May 11:00",
    "PENDING",
  ],
  [
    "ABC-2024-0489",
    "Priya Sharma",
    "Surgeon Name",
    "Spelling correction",
    "17 May 16:20",
    "APPROVED",
  ],
  [
    "CAR-2024-0077",
    "Sneha Iyer",
    "Report Date",
    "Incorrect month",
    "16 May 08:55",
    "REJECTED",
  ],
];
function CorrectionsAdministrator() {
  const [notice, setNotice] = useState("");
  function handleAction(row) {
    setNotice(`Correction for ${row[0]} updated`);
  }
  return (
    <>
      <CorePageShell
        breadcrumb="Administrator"
        title="Corrections"
        description="Manage correction approval workflow and audit status."
        actionLabel={null}
      >
        {/* ── FILTER TABS ── */}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            mb: 2,
            flexWrap: "wrap",
          }}
        >
          {["All", "Pending", "Approved", "Rejected"].map((tab) => (
            <Chip
              key={tab}
              label={tab}
              clickable
              variant={tab === "All" ? "filled" : "outlined"}
              color={tab === "All" ? "primary" : "default"}
              size="small"
              sx={{
                fontWeight: 600,
                fontSize: 11,
              }}
            />
          ))}
        </Box>

        <Box
          sx={{
            width: "100%",
            overflowX: "auto",
          }}
        >
          <CoreTable
            columns={[
              "ENTRY ID",
              "EMPLOYEE",
              "FIELD",
              "REASON",
              "SUBMITTED",
              "STATUS",
            ]}
            rows={rowsAdministrator}
            actionLabel="Review"
            actionVariant="text"
            onAction={handleAction}
          />
        </Box>
      </CorePageShell>

      <Snackbar
        open={Boolean(notice)}
        autoHideDuration={2500}
        onClose={() => setNotice("")}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setNotice("")}
        >
          {notice}
        </Alert>
      </Snackbar>
    </>
  );
}
void ApprovalsTeamLead;
void CorrectionsAdministrator;
export default function CorrectionApprovals(props) {
  switch (props.roleKey) {
    case "indexer":
      return <IndexerCorrectionRequestsIndexer {...props} />;
    case "teamLead":
      return <CorrectionsCoreTeam roleKey={props.roleKey}
        roleLabel={props.roleLabel}{...props} />;
    case "coreTeam":
      return <CorrectionsCoreTeam roleKey={props.roleKey}
            roleLabel={props.roleLabel}{...props} />;
    case "administrator":
      return <CorrectionsCoreTeam roleKey={props.roleKey}
        roleLabel={props.roleLabel}{...props} />;
    default:
      return <IndexerCorrectionRequestsIndexer {...props} />;
  }
}
