import { useCallback, useEffect, useState } from "react";
import apiRequest from "../Config/api.js";
import { useToast } from "../components/ToastProvider.jsx";
import { useConfirm } from "../components/ConfirmDialog.jsx";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Alert from "@mui/material/Alert";

// =========================================================
// SHARED: LABEL-ABOVE-INPUT FIELD WRAPPER
// =========================================================

function Field({ label, gridColumn, children }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        gridColumn: gridColumn || "auto",
        minWidth: 0,
      }}
    >
      <Typography
        component="label"
        sx={{
          fontSize: 12,
          fontWeight: 600,
          color: "#6A7585",
          lineHeight: 1.2,
        }}
      >
        {label}
      </Typography>

      {children}
    </Box>
  );
}

// =========================================================
// SHARED INPUT STYLE
// =========================================================

const inputSx = {
  width: "100%",

  "& .MuiOutlinedInput-root": {
    height: 50,
    borderRadius: "9px",
    bgcolor: "#fff",
    fontSize: 15,
    color: "#0f172a",
  },

  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#d9e1ea",
  },

  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#cbd5e1",
  },

  "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#3169e8",
    borderWidth: 1,
  },

  "& .MuiInputBase-input": {
    py: 1.4,
  },

  "& .MuiSelect-select": {
    display: "flex",
    alignItems: "center",
    minHeight: "unset !important",
  },
};

const textareaSx = {
  ...inputSx,

  "& .MuiOutlinedInput-root": {
    minHeight: 90,
    height: "auto",
    borderRadius: "9px",
    bgcolor: "#fff",
    fontSize: 15,
    alignItems: "flex-start",
  },

  "& textarea": {
    minHeight: "60px !important",
  },
};

// =========================================================
// TODAY'S ENTRIES
// =========================================================

const entriesIndexer = [
  {
    date: "20 May",
    project: "ABC Medical Imaging",
    batch: "ABC-__-13",
    received: "60",
    completed: "45",
    status: "DRAFT",
  },
  {
    date: "20 May",
    project: "Ortho Kids",
    batch: "ORT-__-08",
    received: "40",
    completed: "40",
    status: "SUBMITTED",
  },
  {
    date: "19 May",
    project: "Spine Indexing",
    batch: "SPN-__-22",
    received: "55",
    completed: "55",
    status: "REVIEWED",
  },
  {
    date: "19 May",
    project: "ABC Medical Imaging",
    batch: "ABC-__-11",
    received: "50",
    completed: "50",
    status: "LOCKED",
  },
];

// =========================================================
// STATUS CHIP
// =========================================================

function StatusChipIndexer({ status }) {
    const styles = {
      DRAFT: {
        bgcolor: "#eef2ff",
        color: "#315fd4",
        borderColor: "#c7d2fe",
      },
      SUBMITTED: {
        bgcolor: "#eaf2ff",
        color: "#2563eb",
        borderColor: "#bfdbfe",
      },
      REVIEWED: {
        bgcolor: "#e0f7fa",
        color: "#00838f",
        borderColor: "#b2ebf2",
      },
      LOCKED: {
        bgcolor: "#f0e9ff",
        color: "#6d28d9",
        borderColor: "#ddd6fe",
      },
    };

    return (
      <Chip
        label={status}
        size="small"
        variant="outlined"
        sx={{
          height: 26,
          borderRadius: "13px",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: 0.2,
          px: 0.5,
          ...styles[status],
        }}
      />
    );
  }

  // =========================================================
  // INDEXER DAILY ENTRY
  // =========================================================

 function IndexerDailyEntryIndexer({
  onNavigate,
}) {
  const toast = useToast();
  const [entries, setEntries] = useState([]);
  const [projects, setProjects] = useState([]);
  const [saving, setSaving] = useState(false);
  const [editingEntryId, setEditingEntryId] = useState(null);

  // Stores the original workflow status so editing a Submitted entry cannot accidentally turn it back into Draft.
  const [editingEntryStatus, setEditingEntryStatus] = useState(null);

  // ── Correction request dialog state ──────────────────────────────────────
  const [correctionOpen, setCorrectionOpen] = useState(false);
  const [correctionEntry, setCorrectionEntry] = useState(null);
  const [correctionForm, setCorrectionForm] = useState({
    fieldName: "docs_completed",
    newValue: "",
    reason: "",
  });
  const [correctionSaving, setCorrectionSaving] = useState(false);

  const [formData, setFormData] = useState({
    productionDate: new Date().toISOString().slice(0, 10),
    projectId: "",
    batchJobId: "",
    reportingCategory: "",
    documentsReceived: "",
    documentsCompleted: "",
    batchesProcessed: "",
    errorsFlagged: "",
    notes: "",
  });

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await apiRequest("/projects/my");
        setProjects(data.projects);

          if (data.projects.length > 0) {
            const firstProject = data.projects[0];

            setFormData((currentData) => ({
              ...currentData,
              projectId: firstProject.project_id,
              reportingCategory:
                firstProject.reporting_category || "",
            }));
          }
      } catch (error) {
        console.error("Projects loading error:", error);
      }
    };

    loadProjects();
  }, []);

  const loadEntries = useCallback(async () => {
    try {
      const data = await apiRequest("/daily-entries/my");

      setEntries(
        data.entries.map((entry) => ({
          raw: entry,
          id: entry.entry_id,
          date: new Date(entry.production_date).toLocaleDateString(
            "en-IN",
            {
              day: "2-digit",
              month: "short",
            }
          ),
          project: entry.project_name,
          batch: entry.batch_ref || "—",
          received: entry.documents_received,
          completed: entry.documents_completed,
          status: entry.status?.toUpperCase(),

          // Preserves the backend-calculated edit permission for this entry.
          canEdit: Boolean(entry.canEdit),
        }))
      );
    } catch (error) {
      console.error("Daily entries loading error:", error);
      toast.error("Could not refresh the entries table. Please reload the page.");
    }
  }, [toast]);

  useEffect(() => {
    loadEntries();
  }, [loadEntries]);

  const handleProjectChange = (event) => {
    const projectId = event.target.value;

    const selectedProject = projects.find(
      (project) => project.project_id === Number(projectId)
    );

    setFormData((currentData) => ({
      ...currentData,
      projectId,
      reportingCategory:
        selectedProject?.reporting_category || "",
    }));
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleEditEntry = (entry) => {
  if (saving || !entry.canEdit) return;

  const original = entry.raw;

  setEditingEntryId(entry.id);

  // Remembers whether the current entry was Draft or Submitted before editing started.
  setEditingEntryStatus(entry.status);

  setFormData({
    productionDate: original.production_date,
    projectId: original.project_id,
    batchJobId: original.batch_ref || "",
    reportingCategory: original.reporting_category || "",
    documentsReceived: original.documents_received ?? "",
    documentsCompleted: original.documents_completed ?? "",
    batchesProcessed: original.batches_processed ?? "",
    errorsFlagged: original.errors_flagged ?? "",
    notes: original.notes || "",
  });
};

  const handleSaveEntry = async (status) => {
    if (saving) return;

    if (!formData.projectId || !formData.productionDate) {
      toast.warning("Select a project and production date.");
      return;
    }

    const numbers = {
      documentsReceived: Number(formData.documentsReceived || 0),
      documentsCompleted: Number(formData.documentsCompleted || 0),
      batchesProcessed: Number(formData.batchesProcessed || 0),
      errorsFlagged: Number(formData.errorsFlagged || 0),
    };

    if (
      Object.values(numbers).some(
        (value) => !Number.isInteger(value) || value < 0
      )
    ) {
      toast.warning("Enter valid non-negative whole numbers.");
      return;
    }

    if (numbers.documentsCompleted > numbers.documentsReceived) {
      toast.warning("Completed documents cannot exceed received documents.");
      return;
    }

    // Keeps an already Submitted entry in Submitted state while updating its values.
    const statusToSend =
      editingEntryId !== null && editingEntryStatus === "SUBMITTED"
        ? "submitted"
        : status;

    setSaving(true);

    try {
        const data = await apiRequest(
          editingEntryId !== null
            ? `/daily-entries/${editingEntryId}`
            : "/daily-entries",
          {
            method: editingEntryId !== null ? "PATCH" : "POST",

            body: JSON.stringify({
              ...formData,
              ...numbers,
              projectId: Number(formData.projectId),

              // Sends the preserved workflow status when editing an already Submitted entry.
              status: statusToSend,
            }),
          }
        );

      toast.success(`${data.message}. Entry ID: ${data.entryId}`);

      await loadEntries();
      setEditingEntryId(null);

      // Clears the remembered workflow status after the edit has been saved.
      setEditingEntryStatus(null);

      setFormData((currentData) => ({
        ...currentData,
        batchJobId: "",
        documentsReceived: "",
        documentsCompleted: "",
        batchesProcessed: "",
        errorsFlagged: "",
        notes: "",
      }));
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };


  const handleRequestCorrection = (entry) => {
    setCorrectionEntry(entry);
    setCorrectionForm({
      fieldName: "docs_completed",
      newValue: String(entry.completed ?? ""),
      reason: "",
    });
    setCorrectionOpen(true);
  };

  const handleCorrectionFieldChange = (event) => {
    const { name, value } = event.target;
    setCorrectionForm((prev) => ({ ...prev, [name]: value }));
    // Pre-fill newValue when field changes
    if (name === "fieldName" && correctionEntry) {
      const defaultVal =
        value === "docs_completed"
          ? String(correctionEntry.completed ?? "")
          : value === "docs_received"
          ? String(correctionEntry.received ?? "")
          : "";
      setCorrectionForm((prev) => ({ ...prev, [name]: value, newValue: defaultVal }));
    }
  };

  const handleCorrectionSubmit = async () => {
    if (!correctionEntry) return;
    if (!correctionForm.newValue.trim() || !correctionForm.reason.trim()) {
      toast.warning("Please fill in the corrected value and reason.");
      return;
    }
    const oldValue =
      correctionForm.fieldName === "docs_completed"
        ? correctionEntry.completed
        : correctionForm.fieldName === "docs_received"
        ? correctionEntry.received
        : "";
    setCorrectionSaving(true);
    try {
      const data = await apiRequest("/indexer/corrections", {
        method: "POST",
        body: JSON.stringify({
          dailyEntryId: correctionEntry.id,
          fieldName: correctionForm.fieldName,
          oldValue,
          newValue: correctionForm.newValue.trim(),
          reason: correctionForm.reason.trim(),
        }),
      });
      toast.success(
        data.message ||
          "Correction request submitted successfully"
      );

      setCorrectionOpen(false);

      onNavigate?.("corrections");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setCorrectionSaving(false);
    }
  };
  return (
    <Box sx={{ width: "100%" }}>
      {/* =================================================
          TOP SECTION
       ================================================= */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: {
            xs: "stretch",
            md: "flex-start",
          },
          flexDirection: {
            xs: "column",
            md: "row",
          },
          gap: {
            xs: 2.5,
            md: 1,
          },
          mb: 2.25,
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              color: "#64748b",
              fontSize: 14,
              mb: 0.5,
            }}
          >
            ProdTrack · Indexer
          </Typography>

          <Typography
            sx={{
              color: "#0f172a",
              fontSize: {
                xs: 22,
                sm: 26,
              },
              fontWeight: 800,
              lineHeight: 1.5,
            }}
          >
            Daily production entry
          </Typography>

          <Typography
            sx={{
              color: "#64748b",
              fontSize: {
                xs: 13,
                sm: 16,
              },
              mt: 0.5,
            }}
          >
            Log today&apos;s production. Draft → Submitted → Reviewed → Locked.
          </Typography>
        </Box>

        {/* ACTION BUTTONS */}

        <Box
          sx={{
            display: "flex",
            gap: 1,
            mt: {
              xs: 0,
              md: 1.5,
            },
            width: {
              xs: "100%",
              md: "auto",
            },
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="outlined"
            type="button"
            onClick={() => handleSaveEntry("draft")}
            disabled={saving}
            sx={{
              bgcolor: "#fff",
              color: "#173b66",
              borderColor: "#dbe3ec",
              textTransform: "none",
              fontSize: 14,
              fontWeight: 600,
              borderRadius: "10px",
              px: 2.25,
              height: 46,
              minWidth: {
                xs: 0,
                sm: 125,
              },
              flex: {
                xs: 1,
                sm: "unset",
              },
            }}
          >
          {saving ? "Saving..." : "Save draft"}
          </Button>

          <Button
            variant="contained"
            type="button"
            onClick={() => handleSaveEntry("submitted")}
            disabled={saving}
            sx={{
              bgcolor: "#3169e8",
              textTransform: "none",
              fontSize: 14,
              fontWeight: 600,
              borderRadius: "10px",
              px: 2.25,
              height: 46,
              minWidth: {
                xs: 0,
                sm: 140,
              },
              flex: {
                xs: 1,
                sm: "unset",
              },
              boxShadow: "none",
              "&:hover": {
                bgcolor: "#2458cf",
                boxShadow: "none",
              },
            }}
          >
            Submit Entry
          </Button>
        </Box>
      </Box>

      {/* =================================================
          STATUS STEPS
       ================================================= */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: {
            xs: 0.75,
            sm: 1.1,
          },
          mb: 2.5,
          flexWrap: "wrap",
        }}
      >
        <Chip
          label="Draft"
          size="small"
          sx={{
            bgcolor: "#3169e8",
            color: "#FFF",
            fontSize: 20,
            fontWeight: 700,
            height: 56,
            minWidth: {
              xs: 84,
              sm: 100,
            },
            px: {
              xs: 2,
              sm: 2.5,
            },
            borderRadius: "11px",

            "& .MuiChip-label": {
              color: "#fff",
            },
          }}
        />

        <Typography
          sx={{
            color: "#94a3b8",
            fontSize: 18,
          }}
        >
          →
        </Typography>

        <Chip
          label="Submitted"
          size="small"
          variant="outlined"
          sx={{
            bgcolor: "#fff",
            color: "#000",
            borderColor: "#dbe3ec",
            fontSize: 20,
            fontWeight: 600,
            height: 56,
            minWidth: {
              xs: 112,
              sm: 135,
            },
            px: {
              xs: 2,
              sm: 2.5,
            },
            borderRadius: "11px",

            "& .MuiChip-label": {
              color: "#000",
            },
          }}
        />

        <Typography
          sx={{
            color: "#94a3b8",
            fontSize: 12,
          }}
        >
          →
        </Typography>

        <Chip
          label="Reviewed"
          size="small"
          variant="outlined"
          sx={{
            bgcolor: "#fff",
            color: "#000",
            borderColor: "#dbe3ec",
            fontSize: 20,
            fontWeight: 600,
            height: 56,
            minWidth: {
              xs: 108,
              sm: 125,
            },
            px: {
              xs: 2,
              sm: 2.5,
            },
            borderRadius: "11px",

            "& .MuiChip-label": {
              color: "#000",
            },
          }}
        />

        <Typography
          sx={{
            color: "#94a3b8",
            fontSize: 12,
          }}
        >
          →
        </Typography>

        <Chip
          label="Locked"
          size="small"
          variant="outlined"
          sx={{
            bgcolor: "#fff",
            color: "#000",
            borderColor: "#dbe3ec",
            fontSize: 20,
            fontWeight: 600,
            height: 56,
            minWidth: {
              xs: 90,
              sm: 108,
            },
            px: {
              xs: 2,
              sm: 2.5,
            },
            borderRadius: "11px",

            "& .MuiChip-label": {
              color: "#000",
            },
          }}
        />

        <Box
          sx={{
            flex: 1,
            minWidth: 16,
          }}
        />

        <Typography
          sx={{
            fontSize: 11,
            fontWeight: 700,
            color: "#64748b",
            border: "1px solid #dbe3ec",
            bgcolor: "#fff",
            borderRadius: 1,
            px: 1,
            py: 0.5,
          }}
        >
          EDITABLE — DRAFT
        </Typography>
      </Box>

      {/* =================================================
          ENTRY FORM
       ================================================= */}
      {editingEntryId !== null && (
        <Box
          sx={{
            mb: 2,
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography>
            Editing draft #{editingEntryId}
          </Typography>

          <Button
            type="button"
            disabled={saving}
            onClick={() => {
              setEditingEntryId(null);

              // Clears the remembered workflow status when editing is cancelled.
              setEditingEntryStatus(null);

              setFormData((currentData) => ({
                ...currentData,
                batchJobId: "",
                documentsReceived: "",
                documentsCompleted: "",
                batchesProcessed: "",
                errorsFlagged: "",
                notes: "",
              }));
            }}
          >
            Cancel edit
          </Button>
        </Box>
      )}
      <Card 
        elevation={0}
        sx={{
          borderRadius: "14px",
          border: "1px solid #dbe3ec",
          bgcolor: "#fff",
          p: {
            xs: 2,
            sm: 2.5,
            md: 2.75,
          },
          mb: 2.5,
          boxShadow: "0 2px 8px rgba(15,23,42,0.05)",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1fr 1fr",
            },
            columnGap: 2.5,
            rowGap: 2.75,
          }}
        >
          {/* Production Date */}

       <Field label="Production date">
          <TextField
            type="date"
            value={formData.productionDate}
            onChange={(event) =>
              setFormData((currentData) => ({
                ...currentData,
                productionDate: event.target.value,
              }))
            }
            fullWidth
            size="small"
            sx={inputSx}
          />
        </Field>

          {/* Project */}

            <Field label="Project">
              <TextField
                select
                value={formData.projectId}
                onChange={handleProjectChange}
                fullWidth
                size="small"
                sx={inputSx}
              >
                <MenuItem value="">
                  Select project
                </MenuItem>

                {projects.map((project) => (
                  <MenuItem
                    key={project.project_id}
                    value={project.project_id}
                  >
                    {project.project_name}
                  </MenuItem>
                ))}
              </TextField>
            </Field>

          {/* Batch / Job ID */}

         <Field label="Batch / Job ID">
            <TextField
              name="batchJobId"
              value={formData.batchJobId}
              onChange={handleInputChange}
              placeholder="e.g. ABC-2025-0520-14"
              fullWidth
              size="small"
              sx={inputSx}
            />
          </Field>

          {/* Reporting Category */}

          <Field label="Reporting category">
            <TextField
              value={formData.reportingCategory}
              placeholder="Select a project first"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              fullWidth
              size="small"
              sx={inputSx}
            />
          </Field>

          {/* Documents Received */}

         <Field label="Documents received">
            <TextField
              name="documentsReceived"
              type="number"
              value={formData.documentsReceived}
              onChange={handleInputChange}
              fullWidth
              size="small"
              sx={inputSx}
            />
          </Field>

          {/* Documents Completed */}

         <Field label="Documents completed">
            <TextField
              name="documentsCompleted"
              type="number"
              value={formData.documentsCompleted}
              onChange={handleInputChange}
              fullWidth
              size="small"
              sx={inputSx}
            />
          </Field>

          {/* Batches Processed */}

          <Field label="Batches processed">
            <TextField
              name="batchesProcessed"
              type="number"
              value={formData.batchesProcessed}
              onChange={handleInputChange}
              fullWidth
              size="small"
              sx={inputSx}
            />
          </Field>

          {/* Errors Flagged */}

         <Field label="Errors flagged">
            <TextField
              name="errorsFlagged"
              type="number"
              value={formData.errorsFlagged}
              onChange={handleInputChange}
              fullWidth
              size="small"
              sx={inputSx}
            />
          </Field>

          {/* Notes */}

          <Field
            label="Notes / remarks"
            gridColumn={{
              xs: "auto",
              md: "1 / -1",
            }}
          >
           <TextField
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Optional — anything the reviewer should know"
              multiline
              rows={1}
              fullWidth
              size="small"
              sx={textareaSx}
            />
          </Field>
        </Box>
      </Card>

      {/* =================================================
          TODAY'S ENTRIES TITLE
       ================================================= */}

      <Typography
        sx={{
          color: "#0f172a",
          fontSize: 15,
          fontWeight: 700,
          mb: 1,
        }}
      >
        Today&apos;s entries
      </Typography>

      {/* =================================================
          TODAY'S ENTRIES TABLE
       ================================================= */}

      <TableContainer
        component={Card}
        elevation={0}
        sx={{
          borderRadius: "14px",
          border: "1px solid #dbe3ec",
          overflowX: "auto",
          overflowY: "hidden",
          boxShadow: "0 2px 8px rgba(15,23,42,0.05)",
        }}
      >
        <Table
          size="small"
          sx={{
            minWidth: 820,
          }}
        >
          <TableHead>
            <TableRow
              sx={{
                bgcolor: "#f8fafc",
              }}
            >
              {[
                "DATE",
                "PROJECT",
                "BATCH",
                "RECEIVED",
                "COMPLETED",
                "STATUS",
                "",
              ].map((heading, index) => (
                <TableCell
                  key={`${heading}-${index}`}
                  sx={{
                    color: "#64748b",
                    fontSize: 13,
                    fontWeight: 700,
                    py: 1.5,
                    borderBottom: "1px solid #e2e8f0",
                    whiteSpace: "nowrap",
                  }}
                >
                  {heading}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {entries.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell
                  sx={{
                    fontSize: 14,
                    color: "#475569",
                    py: 1.5,
                  }}
                >
                  {entry.date}
                </TableCell>

                <TableCell
                  sx={{
                    fontSize: 14,
                    color: "#334155",
                    py: 1.5,
                  }}
                >
                  {entry.project}
                </TableCell>

                <TableCell
                  sx={{
                    fontSize: 14,
                    color: "#64748b",
                    py: 1.5,
                  }}
                >
                  {entry.batch}
                </TableCell>

                <TableCell
                  sx={{
                    fontSize: 14,
                    color: "#334155",
                    py: 1.5,
                  }}
                >
                  {entry.received}
                </TableCell>

                <TableCell
                  sx={{
                    fontSize: 14,
                    color: "#334155",
                    py: 1.5,
                  }}
                >
                  {entry.completed}
                </TableCell>

                <TableCell
                  sx={{
                    py: 1.5,
                  }}
                >
                  <StatusChipIndexer status={entry.status} />
                </TableCell>

                <TableCell
                  sx={{
                    py: 0.8,
                  }}
                >
                  {entry.canEdit && (
                    <Button
                      size="small"
                      variant="outlined"
                      type="button"
                      onClick={() => handleEditEntry(entry)}
                      disabled={saving || projects.length === 0}
                      sx={{
                        minWidth: 52,
                        height: 36,
                        px: 1.5,
                        fontSize: 12,
                        textTransform: "none",
                        borderColor: "#e2e8f0",
                        color: "#475569",
                      }}
                    >
                      Edit
                    </Button>
                  )}

                  {entry.status === "LOCKED" && (
                    <Typography
                        onClick={() =>
                            handleRequestCorrection(entry)
                          }
                      sx={{
                        fontSize: 12,
                        color: "#64748b",
                        whiteSpace: "nowrap",
                        cursor: "pointer",
                      }}
                    >
                      Request correction
                    </Typography>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ── Correction request dialog ── */}
      <Dialog
        open={correctionOpen}
        onClose={() => { if (!correctionSaving) setCorrectionOpen(false); }}
        fullWidth
        maxWidth="xs"
        aria-labelledby="correction-dialog-title"
      >
        <DialogTitle id="correction-dialog-title">Request correction</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2, fontSize: 13 }}>
            Entry #{correctionEntry?.id} — {correctionEntry?.project}
          </DialogContentText>
          <TextField
            select
            label="Field to correct"
            value={correctionForm.fieldName}
            onChange={(event) => {
              const selectedField =
                event.target.value;

              const selectedValue =
                selectedField ===
                "docs_completed"
                  ? correctionEntry?.completed
                  : selectedField ===
                    "docs_received"
                  ? correctionEntry?.received
                  : "";

              setCorrectionForm(
                (previousForm) => ({
                  ...previousForm,
                  fieldName: selectedField,
                  newValue: String(
                    selectedValue ?? ""
                  ),
                })
              );
            }}
            fullWidth
            size="small"
            sx={{ mb: 2 }}
          >
            <MenuItem value="docs_completed">
              Documents completed
            </MenuItem>

            <MenuItem value="docs_received">
              Documents received
            </MenuItem>
          </TextField>
          <TextField
            label="Corrected value"
            name="newValue"
            value={correctionForm.newValue}
            onChange={handleCorrectionFieldChange}
            fullWidth
            size="small"
            sx={{ mb: 2 }}
          />
          <TextField
            label="Reason"
            name="reason"
            value={correctionForm.reason}
            onChange={handleCorrectionFieldChange}
            fullWidth
            size="small"
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => setCorrectionOpen(false)}
            disabled={correctionSaving}
            variant="outlined"
            sx={{ textTransform: "none", borderColor: "#d0d7e2", color: "#1a2434" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCorrectionSubmit}
            disabled={correctionSaving}
            variant="contained"
            sx={{ textTransform: "none" }}
          >
            {correctionSaving ? "Submitting…" : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

// =========================================================
// TEAM LEAD DATA
// =========================================================

const entriesTeamLead = [
  {
    date: "20 May",
    project: "ABC Medical Imaging",
    batch: "ABC-__-13",
    received: "60",
    completed: "45",
    status: "DRAFT",
  },
  {
    date: "20 May",
    project: "Ortho Kids",
    batch: "ORT-__-08",
    received: "40",
    completed: "40",
    status: "SUBMITTED",
  },
  {
    date: "19 May",
    project: "Spine Indexing",
    batch: "SPN-__-22",
    received: "55",
    completed: "55",
    status: "REVIEWED",
  },
  {
    date: "19 May",
    project: "ABC Medical Imaging",
    batch: "ABC-__-11",
    received: "50",
    completed: "50",
    status: "LOCKED",
  },
];

// =========================================================
// TEAM LEAD STATUS CHIP
// =========================================================

function StatusChipTeamLead({ status }) {
  const styles = {
    DRAFT: {
      bgcolor: "#eef2ff",
      color: "#315fd4",
      borderColor: "#c7d2fe",
    },
    SUBMITTED: {
      bgcolor: "#eaf2ff",
      color: "#2563eb",
      borderColor: "#bfdbfe",
    },
    REVIEWED: {
      bgcolor: "#e0f7fa",
      color: "#00838f",
      borderColor: "#b2ebf2",
    },
    LOCKED: {
      bgcolor: "#f0e9ff",
      color: "#6d28d9",
      borderColor: "#ddd6fe",
    },
  };

  return (
    <Chip
      label={status}
      size="small"
      variant="outlined"
      sx={{
        height: 26,
        borderRadius: "13px",
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: 0.2,
        px: 0.5,
        ...styles[status],
      }}
    />
  );
}


function TeamPendingEntries() {
  const toast = useToast();
  const { confirm, ConfirmElement } = useConfirm();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewingId, setReviewingId] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadPendingEntries = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await apiRequest("/daily-entries/team/pending");

      if (!data.success) {
        throw new Error(data.message || "Failed to load team entries");
      }

      setEntries(data.entries || []);
    } catch (err) {
      setError(err.message || "Failed to load team entries");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPendingEntries();
  }, [loadPendingEntries]);

  const handleReview = async (entry) => {
    if (reviewingId !== null) return;

    const confirmed = await confirm({
      title: "Mark as reviewed?",
      message: `Have you checked entry #${entry.entry_id} from ${entry.employee_name}?`,
      confirmLabel: "Mark as reviewed",
    });

    if (!confirmed) return;

    setReviewingId(entry.entry_id);
    setError("");
    setMessage("");

    try {
      const data = await apiRequest(
        `/daily-entries/${entry.entry_id}/review`,
        { method: "PATCH" }
      );

      if (!data.success) {
        throw new Error(data.message || "Failed to review entry");
      }

      // Remove it only after the backend confirms the review.
      setEntries((current) =>
        current.filter((item) => item.entry_id !== entry.entry_id)
      );

      setMessage(`Entry #${entry.entry_id} marked as Reviewed.`);
    } catch (err) {
      setError(err.message || "Failed to review entry");
    } finally {
      setReviewingId(null);
    }
  };

  return (
    <Card
      elevation={0}
      sx={{
        mb: 3,
        p: 2,
        border: "1px solid #dbe3ec",
        borderRadius: "14px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          mb: 2,
        }}
      >
        <Box>
          <Typography sx={{ fontSize: 18, fontWeight: 800 }}>
            Team entries awaiting review
          </Typography>

          <Typography sx={{ fontSize: 13, color: "#64748b" }}>
            {loading
              ? "Loading..."
              : `${entries.length} submitted entries awaiting review`}
          </Typography>
        </Box>

        <Button
          type="button"
          variant="outlined"
          disabled={loading || reviewingId !== null}
          onClick={() => {
            setMessage("");
            loadPendingEntries();
          }}
          sx={{ textTransform: "none" }}
        >
          Refresh
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {message && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}

      {loading ? (
        <Typography>Loading team entries...</Typography>
      ) : (
        <>
          {!error && entries.length === 0 && (
            <Alert severity="info">
              No submitted entries are waiting for review.
            </Alert>
          )}

          {entries.length > 0 && (
            <TableContainer>
              <Table size="small" sx={{ minWidth: 950 }}>
                <TableHead>
                  <TableRow sx={{ bgcolor: "#f8fafc" }}>
                    {[
                      "Employee",
                      "Date / Batch",
                      "Project",
                      "Production",
                      "Notes",
                      "Action",
                    ].map((heading) => (
                      <TableCell key={heading} sx={{ fontWeight: 700 }}>
                        {heading}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {entries.map((entry) => (
                    <TableRow key={entry.entry_id}>
                      <TableCell>
                        {entry.employee_name}
                        <Typography variant="caption" display="block">
                          {entry.employee_code} · Entry #{entry.entry_id}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        {entry.production_date}
                        <Typography variant="caption" display="block">
                          {entry.batch_job_id || "No batch ID"}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        {entry.project_name}
                        <Typography variant="caption" display="block">
                          {entry.reporting_category || "—"}
                        </Typography>
                      </TableCell>

                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        <Typography variant="body2">
                          Received: {entry.documents_received}
                        </Typography>
                        <Typography variant="body2">
                          Completed: {entry.documents_completed}
                        </Typography>
                        <Typography variant="body2">
                          Batches: {entry.batches_processed}
                        </Typography>
                        <Typography variant="body2">
                          Errors: {entry.errors_flagged}
                        </Typography>
                      </TableCell>

                      <TableCell
                        sx={{
                          minWidth: 160,
                          maxWidth: 280,
                          whiteSpace: "pre-wrap",
                          overflowWrap: "anywhere",
                        }}
                      >
                        {entry.notes || "—"}
                      </TableCell>

                      <TableCell>
                        <Button
                          type="button"
                          variant="contained"
                          size="small"
                          disabled={reviewingId !== null}
                          onClick={() => handleReview(entry)}
                          sx={{
                            textTransform: "none",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {reviewingId === entry.entry_id
                            ? "Saving..."
                            : "Mark as Reviewed"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      )}
      {ConfirmElement}
    </Card>
  );
}
// =========================================================
// TEAM LEAD DAILY ENTRY
// =========================================================

function TeamLeadDailyEntryTeamLead() {
  const toast = useToast();
  const [projects, setProjects] = useState([]);
  const [saving, setSaving] = useState(false);
  const [entries, setEntries] = useState([]);
  const [entriesLoading, setEntriesLoading] = useState(true);
  const [entriesError, setEntriesError] = useState("");
  const [editingEntryId, setEditingEntryId] = useState(null);

  const [formData, setFormData] = useState({
    productionDate: new Date().toISOString().slice(0, 10),
    projectId: "",
    reportingCategory: "",
    batchJobId: "",
    documentsReceived: "",
    documentsCompleted: "",
    batchesProcessed: "",
    errorsFlagged: "",
    notes: "",
  });

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await apiRequest("/projects/my");

        if (!data.success) {
          throw new Error(data.message || "Failed to load projects");
        }

        const assignedProjects = data.projects || [];
        setProjects(assignedProjects);

        if (assignedProjects.length > 0) {
          const firstProject = assignedProjects[0];

          setFormData((current) => ({
            ...current,
            projectId: firstProject.project_id,
            reportingCategory: firstProject.reporting_category || "",
          }));
        }
      } catch (error) {
        toast.error(error.message || "Failed to load projects");
      }
    };

    loadProjects();
  }, [toast]);

  const handleProjectChange = (event) => {
      const projectId = event.target.value;
      const selectedProject = projects.find(
        (project) => String(project.project_id) === String(projectId)
      );

      setFormData((current) => ({
        ...current,
        projectId,
        reportingCategory: selectedProject?.reporting_category || "",
      }));
    };

    const handleInputChange = (event) => {
      const { name, value } = event.target;

      setFormData((current) => ({
        ...current,
        [name]: value,
      }));
    };

    const loadEntries = useCallback(async () => {
    setEntriesLoading(true);
    setEntriesError("");

    try {
      const data = await apiRequest("/daily-entries/my");

      if (!data.success) {
        throw new Error(data.message || "Failed to load entries");
      }

      setEntries(
        (data.entries || []).map((entry) => ({
          id: entry.entry_id,
          raw: entry,
          date: entry.production_date,
          project: entry.project_name,
          batch: entry.batch_ref || "—",
          received: entry.documents_received,
          completed: entry.documents_completed,
          status: String(entry.status || "").toUpperCase(),
        }))
      );
    } catch (error) {
      setEntriesError(error.message || "Failed to load entries");
    } finally {
      setEntriesLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEntries();
  }, [loadEntries]);

  const handleEditEntry = (entry) => {
  if (saving || entry.status !== "DRAFT") return;

  const original = entry.raw;

  setEditingEntryId(entry.id);

  setFormData({
    productionDate: original.production_date,
    projectId: original.project_id,
    reportingCategory: original.reporting_category || "",
    batchJobId: original.batch_ref || "",
    documentsReceived: original.documents_received ?? "",
    documentsCompleted: original.documents_completed ?? "",
    batchesProcessed: original.batches_processed ?? "",
    errorsFlagged: original.errors_flagged ?? "",
    notes: original.notes || "",
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
};

  const handleSaveEntry = async (status) => {
  if (saving) return;

  if (!formData.projectId || !formData.productionDate) {
    toast.warning("Select a project and production date.");
    return;
  }

  const numbers = {
    documentsReceived: Number(formData.documentsReceived || 0),
    documentsCompleted: Number(formData.documentsCompleted || 0),
    batchesProcessed: Number(formData.batchesProcessed || 0),
    errorsFlagged: Number(formData.errorsFlagged || 0),
  };

  if (
    Object.values(numbers).some(
      (value) =>
        !Number.isInteger(value) ||
        value < 0 ||
        value > 4294967295
    )
  ) {
    toast.warning("Enter valid non-negative whole numbers.");
    return;
  }

  if (numbers.documentsCompleted > numbers.documentsReceived) {
    toast.warning("Completed documents cannot exceed received documents.");
    return;
  }

  setSaving(true);

  try {
    const data = await apiRequest(
      editingEntryId !== null
        ? `/daily-entries/${editingEntryId}`
        : "/daily-entries",
      {
        method: editingEntryId !== null ? "PATCH" : "POST",
      body: JSON.stringify({
        ...formData,
        ...numbers,
        projectId: Number(formData.projectId),
        status,
      }),
    });

    if (!data.success) {
      throw new Error(data.message || "Failed to save draft");
    }

    toast.success(`${data.message}. Entry ID: ${data.entryId}`);
    setEditingEntryId(null);
    await loadEntries();

    setFormData((current) => ({
      ...current,
      batchJobId: "",
      documentsReceived: "",
      documentsCompleted: "",
      batchesProcessed: "",
      errorsFlagged: "",
      notes: "",
    }));
  } catch (error) {
    toast.error(error.message || "Failed to save draft");
  } finally {
    setSaving(false);
  }
};

  return (
    <Box sx={{ width: "100%" }}>
            {editingEntryId !== null && (
        <Typography sx={{ mb: 2, color: "#2563eb", fontWeight: 600 }}>
          Editing draft #{editingEntryId} — click Save draft to update it.
        </Typography>
      )}
      {/* =================================================
          TOP SECTION
       ================================================= */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: {
            xs: "stretch",
            md: "flex-start",
          },
          flexDirection: {
            xs: "column",
            md: "row",
          },
          gap: {
            xs: 2.5,
            md: 1,
          },
          mb: 2.25,
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              color: "#64748b",
              fontSize: 14,
              mb: 0.5,
            }}
          >
            ProdTrack · Team Lead
          </Typography>

          <Typography
            sx={{
              color: "#0f172a",
              fontSize: {
                xs: 23,
                sm: 28,
              },
              fontWeight: 800,
              lineHeight: 1.2,
            }}
          >
            Daily production entry
          </Typography>

          <Typography
            sx={{
              color: "#64748b",
              fontSize: {
                xs: 13,
                sm: 16,
              },
              mt: 0.5,
            }}
          >
            Log today&apos;s production. Draft → Submitted → Reviewed → Locked.
          </Typography>
        </Box>

        {/* ACTION BUTTONS */}

        <Box
          sx={{
            display: "flex",
            gap: 1,
            mt: {
              xs: 0,
              md: 1.5,
            },
            width: {
              xs: "100%",
              md: "auto",
            },
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="outlined"
            type="button"
            onClick={() => handleSaveEntry("draft")}
            disabled={saving || projects.length === 0}
            sx={{
              bgcolor: "#fff",
              color: "#173b66",
              borderColor: "#dbe3ec",
              textTransform: "none",
              fontSize: 14,
              fontWeight: 600,
              borderRadius: "10px",
              px: 2.25,
              height: 46,
              minWidth: {
                xs: 0,
                sm: 125,
              },
              flex: {
                xs: 1,
                sm: "unset",
              },
            }}
          >
            {saving ? "Saving..." : "Save draft"}
          </Button>

          <Button
            variant="contained"
            type="button"
            onClick={() => handleSaveEntry("submitted")}
            disabled={saving || projects.length === 0}
            sx={{
              bgcolor: "#3169e8",
              textTransform: "none",
              fontSize: 14,
              fontWeight: 600,
              borderRadius: "10px",
              px: 2.25,
              height: 46,
              minWidth: {
                xs: 0,
                sm: 140,
              },
              flex: {
                xs: 1,
                sm: "unset",
              },
              boxShadow: "none",
              "&:hover": {
                bgcolor: "#2458cf",
                boxShadow: "none",
              },
            }}
          >
            {saving ? "Please wait..." : "Submit entry"}
          </Button>
        </Box>
      </Box>

      {/* =================================================
          STATUS STEPS
       ================================================= */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: {
            xs: 0.75,
            sm: 1.1,
          },
          mb: 2.5,
          flexWrap: "wrap",
        }}
      >
        <Chip
          label="Draft"
          size="small"
          sx={{
            bgcolor: "#3169e8",
            color: "#FFF",
            fontSize: 16,
            fontWeight: 700,
            height: 56,
            minWidth: {
              xs: 84,
              sm: 100,
            },
            px: {
              xs: 2,
              sm: 2.5,
            },
            borderRadius: "11px",

            "& .MuiChip-label": {
              color: "#000",
            },
          }}
        />

        <Typography
          sx={{
            color: "#94a3b8",
            fontSize: 12,
          }}
        >
          →
        </Typography>

        <Chip
          label="Submitted"
          size="small"
          variant="outlined"
          sx={{
            bgcolor: "#fff",
            color: "#000",
            borderColor: "#dbe3ec",
            fontSize: 16,
            fontWeight: 600,
            height: 56,
            minWidth: {
              xs: 112,
              sm: 135,
            },
            px: {
              xs: 2,
              sm: 2.5,
            },
            borderRadius: "11px",

            "& .MuiChip-label": {
              color: "#000",
            },
          }}
        />

        <Typography
          sx={{
            color: "#94a3b8",
            fontSize: 12,
          }}
        >
          →
        </Typography>

        <Chip
          label="Reviewed"
          size="small"
          variant="outlined"
          sx={{
            bgcolor: "#fff",
            color: "#000",
            borderColor: "#dbe3ec",
            fontSize: 16,
            fontWeight: 600,
            height: 56,
            minWidth: {
              xs: 108,
              sm: 125,
            },
            px: {
              xs: 2,
              sm: 2.5,
            },
            borderRadius: "11px",

            "& .MuiChip-label": {
              color: "#000",
            },
          }}
        />

        <Typography
          sx={{
            color: "#94a3b8",
            fontSize: 12,
          }}
        >
          →
        </Typography>

        <Chip
          label="Locked"
          size="small"
          variant="outlined"
          sx={{
            bgcolor: "#fff",
            color: "#000",
            borderColor: "#dbe3ec",
            fontSize: 16,
            fontWeight: 600,
            height: 56,
            minWidth: {
              xs: 90,
              sm: 108,
            },
            px: {
              xs: 2,
              sm: 2.5,
            },
            borderRadius: "11px",

            "& .MuiChip-label": {
              color: "#000",
            },
          }}
        />

        <Box
          sx={{
            flex: 1,
            minWidth: 16,
          }}
        />

        <Typography
          sx={{
            fontSize: 9,
            fontWeight: 700,
            color: "#64748b",
            border: "1px solid #dbe3ec",
            bgcolor: "#fff",
            borderRadius: 1,
            px: 1,
            py: 0.5,
          }}
        >
          EDITABLE — DRAFT
        </Typography>
      </Box>

      {/* =================================================
          ENTRY FORM
       ================================================= */}

      <Card
        elevation={0}
        sx={{
          borderRadius: "14px",
          border: "1px solid #dbe3ec",
          bgcolor: "#fff",
          p: {
            xs: 2,
            sm: 2.5,
            md: 2.75,
          },
          mb: 2.5,
          boxShadow: "0 2px 8px rgba(15,23,42,0.05)",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1fr 1fr",
            },
            columnGap: 2.5,
            rowGap: 2.75,
          }}
        >
          <Field label="Production date">
              <TextField
                type="date"
                value={formData.productionDate}
                onChange={(event) =>
                  setFormData((current) => ({
                    ...current,
                    productionDate: event.target.value,
                  }))
                }
                fullWidth
                size="small"
                sx={inputSx}
              />
            </Field>

          <Field label="Project">
            <TextField
              select
              value={formData.projectId}
              onChange={handleProjectChange}
              fullWidth
              size="small"
              sx={inputSx}
            >
              <MenuItem value="">Select project</MenuItem>

              {projects.map((project) => (
                <MenuItem
                  key={project.project_id}
                  value={project.project_id}
                >
                  {project.project_name}
                </MenuItem>
              ))}
            </TextField>
          </Field>

          <Field label="Batch / Job ID">
              <TextField
                name="batchJobId"
                value={formData.batchJobId}
                onChange={handleInputChange}
                placeholder="e.g. ABC-2025-0520-14"
                fullWidth
                size="small"
                sx={inputSx}
              />
            </Field>

            <Field label="Reporting category">
              <TextField
                value={formData.reportingCategory}
                placeholder="Select a project first"
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
                fullWidth
                size="small"
                sx={inputSx}
              />
            </Field>

          <Field label="Documents received">
              <TextField
                name="documentsReceived"
                type="number"
                value={formData.documentsReceived}
                onChange={handleInputChange}
                fullWidth
                size="small"
                sx={inputSx}
              />
            </Field>

          <Field label="Documents completed">
            <TextField
              name="documentsCompleted"
              type="number"
              value={formData.documentsCompleted}
              onChange={handleInputChange}
              fullWidth
              size="small"
              sx={inputSx}
            />
          </Field>

          <Field label="Batches processed">
            <TextField
              name="batchesProcessed"
              type="number"
              value={formData.batchesProcessed}
              onChange={handleInputChange}
              fullWidth
              size="small"
              sx={inputSx}
            />
          </Field>

          <Field label="Errors flagged">
            <TextField
              name="errorsFlagged"
              type="number"
              value={formData.errorsFlagged}
              onChange={handleInputChange}
              fullWidth
              size="small"
              sx={inputSx}
            />
          </Field>

          <Field
            label="Notes / remarks"
            gridColumn={{
              xs: "auto",
              md: "1 / -1",
            }}
          >
            <TextField
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Optional — anything the reviewer should know"
              multiline
              rows={1}
              fullWidth
              size="small"
              sx={textareaSx}
            />
          </Field>
        </Box>
      </Card>

      <Typography
        sx={{
          color: "#0f172a",
          fontSize: 13,
          fontWeight: 700,
          mb: 0.75,
        }}
      >
        My entries
      </Typography>

      <TableContainer
        component={Card}
        elevation={0}
        sx={{
          borderRadius: "14px",
          border: "1px solid #dbe3ec",
          overflowX: "auto",
          overflowY: "hidden",
          boxShadow: "0 2px 8px rgba(15,23,42,0.05)",
        }}
      >
        <Table
          size="small"
          sx={{
            minWidth: 820,
          }}
        >
          <TableHead>
            <TableRow
              sx={{
                bgcolor: "#f8fafc",
              }}
            >
              {[
                "DATE",
                "PROJECT",
                "BATCH",
                "RECEIVED",
                "COMPLETED",
                "STATUS",
                "",
              ].map((heading, index) => (
                <TableCell
                  key={`${heading}-${index}`}
                  sx={{
                    color: "#64748b",
                    fontSize: 11,
                    fontWeight: 700,
                    py: 1,
                    borderBottom: "1px solid #e2e8f0",
                  }}
                >
                  {heading}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {entriesLoading && (
                <TableRow>
                  <TableCell colSpan={7}>Loading entries...</TableCell>
                </TableRow>
              )}

              {!entriesLoading && entriesError && (
                <TableRow>
                  <TableCell colSpan={7} sx={{ color: "error.main" }}>
                    {entriesError}
                  </TableCell>
                </TableRow>
              )}

              {!entriesLoading && !entriesError && entries.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7}>
                    No entries yet. Save your first draft above.
                  </TableCell>
                </TableRow>
              )}
           {entries.map((entry) => (
            <TableRow key={entry.id}>
                <TableCell
                  sx={{
                    fontSize: 13,
                    color: "#475569",
                    py: 1.15,
                  }}
                >
                  {entry.date}
                </TableCell>

                <TableCell
                  sx={{
                    fontSize: 13,
                    color: "#334155",
                    py: 1.15,
                  }}
                >
                  {entry.project}
                </TableCell>

                <TableCell
                  sx={{
                    fontSize: 13,
                    color: "#64748b",
                    py: 1.15,
                  }}
                >
                  {entry.batch}
                </TableCell>

                <TableCell
                  sx={{
                    fontSize: 13,
                    color: "#334155",
                    py: 1.15,
                  }}
                >
                  {entry.received}
                </TableCell>

                <TableCell
                  sx={{
                    fontSize: 13,
                    color: "#334155",
                    py: 1.15,
                  }}
                >
                  {entry.completed}
                </TableCell>

                <TableCell sx={{ py: 1.15 }}>
                  <StatusChipTeamLead status={entry.status} />
                </TableCell>

                <TableCell sx={{ py: 0.8 }}>
                  {entry.status === "DRAFT" && (
                    <Button
                      size="small"
                      variant="outlined"
                      type="button"
                        onClick={() => handleEditEntry(entry)}
                        disabled={saving || projects.length === 0}
                      sx={{
                        minWidth: 28,
                        height: 28,
                        p: 0,
                        fontSize: 11,
                        textTransform: "none",
                        borderColor: "#e2e8f0",
                        color: "#475569",
                      }}
                    >
                      Edit
                    </Button>
                  )}

                  {entry.status === "LOCKED" && (
                    <Typography
                      sx={{
                        fontSize: 11,
                        color: "#64748b",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Request correction
                    </Typography>
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

// =========================================================
// EXPORT
// =========================================================

export default function DailyEntry(props) {
  switch (props.roleKey) {
    case "indexer":
      return <IndexerDailyEntryIndexer {...props} />;

    case "teamLead":
      return <TeamLeadDailyEntryTeamLead {...props} />;

    default:
      return <IndexerDailyEntryIndexer {...props} />;
  }
}

//Done