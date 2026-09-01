import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import BeachAccessRoundedIcon from "@mui/icons-material/BeachAccessRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useCallback, useEffect, useState } from "react";
import apiRequest from "../Config/api.js";
import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

// =====================================================
// ATTENDANCE DATA
// =====================================================

// const attendanceData = [
//   {
//     date: "20 May",
//     day: "Tue",
//     status: "Present",
//     hours: "8.0",
//     note: "—",
//   },
//   {
//     date: "19 May",
//     day: "Mon",
//     status: "Present",
//     hours: "8.0",
//     note: "—",
//   },
//   {
//     date: "16 May",
//     day: "Fri",
//     status: "Planned Leave",
//     hours: "0",
//     note: "Personal",
//   },
//   {
//     date: "15 May",
//     day: "Thu",
//     status: "Training",
//     hours: "8.0",
//     note: "Guide v2.3 session",
//   },
//   {
//     date: "14 May",
//     day: "Wed",
//     status: "Present",
//     hours: "7.5",
//     note: "—",
//   },
// ];

// =====================================================
// SUMMARY CARD
// =====================================================

function AttendanceCard({
  icon,
  iconBg,
  iconColor,
  label,
  value,
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "#e5e7eb",
        borderRadius: 1,
        p: 2.5,

        display: "flex",
        alignItems: "center",

        gap: 2,

        height: "100%",

        boxSizing: "border-box",

        backgroundColor: "#fff",
      }}
    >
      <Box
        sx={{
          width: 46,
          height: 46,

          borderRadius: 1,

          bgcolor: iconBg,
          color: iconColor,

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          flexShrink: 0,
        }}
      >
        {icon}
      </Box>

      <Box>
        <Typography
          sx={{
            color: "#6b7280",
            fontSize: 13,
            mb: 0.3,
          }}
        >
          {label}
        </Typography>

        <Typography
          sx={{
            color: "#111827",
            fontSize: 25,
            lineHeight: 1.2,
            fontWeight: 800,
          }}
        >
          {value}
        </Typography>
      </Box>
    </Paper>
  );
}

// =====================================================
// STATUS STYLE
// =====================================================

function getStatusStyle(status) {
  switch (status) {
    case "Present":
      return {
        backgroundColor: "#dcfce7",
        color: "#15803d",
      };

    case "Planned Leave":
      return {
        backgroundColor: "#fef3c7",
        color: "#b45309",
      };

    case "Training":
      return {
        backgroundColor: "#ede9fe",
        color: "#7c3aed",
      };

    default:
      return {
        backgroundColor: "#f3f4f6",
        color: "#374151",
      };
  }
}

// =====================================================
// ATTENDANCE PAGE
// =====================================================

export default function Attendance({ roleLabel = "Indexer" }) {
  const [summary, setSummary] = useState(null);
  const [summaryError, setSummaryError] = useState("");
  const [attendance, setAttendance] = useState([]);
  const [attendanceLoading, setAttendanceLoading] = useState(true);
  const [attendanceError, setAttendanceError] = useState("");
  const [leaveOpen, setLeaveOpen] = useState(false);
  const [leaveSaving, setLeaveSaving] = useState(false);
  // const [leaveRequests, setLeaveRequests] = useState([]);
  // const [leaveLoading, setLeaveLoading] = useState(true);
  // const [leaveError, setLeaveError] = useState("");

  const loadLeaveRequests = useCallback(async () => {
  setLeaveLoading(true);
  setLeaveError("");

  try {
    const data = await apiRequest("/leave-requests/my");

    if (!data.success) {
      throw new Error(data.message || "Failed to load leave requests");
    }

    setLeaveRequests(data.requests || []);
  } catch (error) {
    setLeaveError(error.message || "Failed to load leave requests");
  } finally {
    setLeaveLoading(false);
  }
}, []);

useEffect(() => {
  loadLeaveRequests();
}, [loadLeaveRequests]);

  const handleSubmitLeave = async () => {
  if (leaveSaving) return;

  if (
    !leaveForm.leaveType ||
    !leaveForm.startDate ||
    !leaveForm.endDate ||
    !leaveForm.reason.trim()
  ) {
    alert("Please complete all leave fields.");
    return;
  }

  if (leaveForm.startDate > leaveForm.endDate) {
    alert("Start date cannot be after end date.");
    return;
  }

  setLeaveSaving(true);
  // await loadLeaveRequests();

  try {
    const data = await apiRequest("/leave-requests", {
      method: "POST",
      body: JSON.stringify({
        ...leaveForm,
        reason: leaveForm.reason.trim(),
      }),
    });

    if (!data.success) {
      throw new Error(data.message || "Failed to submit leave request");
    }

    setLeaveOpen(false);

    setLeaveForm({
      leaveType: "planned_leave",
      startDate: "",
      endDate: "",
      reason: "",
    });

    alert(
      `Leave request #${data.leaveRequestId} submitted. Status: PENDING.`
    );
  } catch (error) {
    alert(error.message || "Failed to submit leave request");
  } finally {
    setLeaveSaving(false);
  }
};

    const [leaveForm, setLeaveForm] = useState({
      leaveType: "planned_leave",
      startDate: "",
      endDate: "",
      reason: "",
    });

    const handleLeaveChange = (event) => {
      const { name, value } = event.target;

      setLeaveForm((current) => ({
        ...current,
        [name]: value,
      }));
    };

  useEffect(() => {
    const loadAttendance = async () => {
      setAttendanceLoading(true);
      setAttendanceError("");

      try {
        const data = await apiRequest("/attendance/my");

        if (!data.success) {
          throw new Error(data.message || "Failed to load attendance");
        }

        setAttendance(
          (data.attendance || []).map((record) => ({
            id: record.id,
            date: new Date(
              `${record.attendance_date}T00:00:00`
            ).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }),
            day: record.day_name,
            status: record.status,
            hours: Number(record.hours || 0).toFixed(1),
            note: record.note || "—",
          }))
        );
      } catch (error) {
        setAttendanceError(
          error.message || "Failed to load attendance"
        );
      } finally {
        setAttendanceLoading(false);
      }
    };

    loadAttendance();
  }, []);

  useEffect(() => {
    const loadSummary = async () => {
      try {
        const data = await apiRequest("/attendance/summary");

        if (!data.success) {
          throw new Error(data.message || "Failed to load summary");
        }

        setSummary(data.summary);
      } catch (error) {
        setSummaryError(error.message || "Failed to load summary");
      }
    };

    loadSummary();
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      {/* =================================================
          BREADCRUMB
      ================================================= */}

      <Typography
        sx={{
          color: "#6A7585",
          fontSize: 12.5,
          mb: 0.7,
        }}
      >
        ProdTrack · {roleLabel}
      </Typography>

      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",

          mb: 0.5,

          gap: 2,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: 22,

              color: "#1A2434",

              lineHeight: 1.5,
            }}
          >
            Leave & attendance
          </Typography>

          <Typography
            sx={{
              color: "#6A7585",
              fontSize: 14,
              mt: 0.5,
            }}
          >
            Track availability. Approved leave can be excluded from productivity
            calculations.
          </Typography>
        </Box>

        {/* APPLY FOR LEAVE */}

        <Button
          variant="contained"
          startIcon={<AddRoundedIcon />}
          type="button"
          onClick={() => setLeaveOpen(true)}
          sx={{
            px: 2,
            py: 1.15,

            borderRadius: 1,

            textTransform: "none",

            fontSize: 14,
            fontWeight: 600,

            whiteSpace: "nowrap",

            boxShadow: "none",

            flexShrink: 0,

            "&:hover": {
              boxShadow: "none",
            },
          }}
        >
          Apply for leave
        </Button>
      </Box>

        {summaryError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {summaryError}
          </Alert>
        )}

        <Typography sx={{ mt: 2, color: "#6A7585", fontSize: 13 }}>
          Summary for all recorded dates
        </Typography>
      {/* =================================================
          SUMMARY CARDS
      ================================================= */}

      <Grid
        container
        spacing={2.5}
        sx={{
          mt: 2.5,
          mb: 3,
        }}
      >
        {/* PRESENT DAYS */}

        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 3,
          }}
        >
          <AttendanceCard
            icon={<EventAvailableRoundedIcon />}
            iconBg="#dcfce7"
            iconColor="#16a34a"
            label="Present days"
            value={summary ? Number(summary.present_days) : "—"}
          />
        </Grid>

        {/* LEAVE TAKEN */}

        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 3,
          }}
        >
          <AttendanceCard
            icon={<BeachAccessRoundedIcon />}
            iconBg="#fff3dc"
            iconColor="#d97706"
            label="Leave taken"
            value={summary ? Number(summary.leave_days) : "—"}
          />
        </Grid>

        {/* TRAINING */}

        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 3,
          }}
        >
          <AttendanceCard
            icon={<SchoolRoundedIcon />}
            iconBg="#ede9fe"
            iconColor="#7c3aed"
            label="Training"
            value={summary ? Number(summary.training_days) : "—"}
          />
        </Grid>

        {/* WORKING DAYS */}

        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 3,
          }}
        >
          <AttendanceCard
            icon={<CalendarMonthRoundedIcon />}
            iconBg="#e5efff"
            iconColor="#2563eb"
            label="Production days"
            value={summary ? Number(summary.working_days) : "—"}
          />
        </Grid>
      </Grid>

      {/* =================================================
          THIS MONTH
      ================================================= */}

      <Paper
        elevation={0}
        sx={{
          border: "1px solid",

          borderColor: "#e5e7eb",

          borderRadius: 1,

          backgroundColor: "#fff",

          overflow: "hidden",
        }}
      >
        {/* TABLE HEADER */}

        <Box
          sx={{
            px: 2.5,
            py: 2,

            borderBottom: "1px solid",

            borderColor: "#e5e7eb",
          }}
        >
          <Typography
            sx={{
              fontSize: 16,

              fontWeight: 700,

              color: "#1A2434",
            }}
          >
            Attendance records
          </Typography>
        </Box>

        {/* TABLE */}

        <TableContainer>
          <Table
            sx={{
              minWidth: 700,
            }}
          >
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "#f8fafc",
                }}
              >
                <TableCell
                  sx={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#6A7585",
                    py: 1.5,
                  }}
                >
                  Date
                </TableCell>

                <TableCell
                  sx={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#6A7585",
                    py: 1.5,
                  }}
                >
                  Day
                </TableCell>

                <TableCell
                  sx={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#6A7585",
                    py: 1.5,
                  }}
                >
                  Status
                </TableCell>

                <TableCell
                  align="center"
                  sx={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#6A7585",
                    py: 1.5,
                  }}
                >
                  Hours
                </TableCell>

                <TableCell
                  sx={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#6A7585",
                    py: 1.5,
                  }}
                >
                  Note
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {attendanceLoading && (
                <TableRow>
                  <TableCell colSpan={5}>
                    Loading attendance...
                  </TableCell>
                </TableRow>
              )}

              {!attendanceLoading && attendanceError && (
                <TableRow>
                  <TableCell colSpan={5} sx={{ color: "error.main" }}>
                    {attendanceError}
                  </TableCell>
                </TableRow>
              )}

              {!attendanceLoading &&
                !attendanceError &&
                attendance.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5}>
                      No attendance records found.
                    </TableCell>
                  </TableRow>
                )}
              {attendance.map((row) => {
                const statusStyle = getStatusStyle(row.status);

                return (
                  <TableRow
                    key={row.id}
                    sx={{
                      "&:last-child td": {
                        borderBottom: 0,
                      },

                      "&:hover": {
                        backgroundColor: "#f8fafc",
                      },
                    }}
                  >
                    {/* DATE */}

                    <TableCell
                      sx={{
                        fontSize: 14,

                        color: "#1A2434",

                        fontWeight: 500,

                        py: 1.8,
                      }}
                    >
                      {row.date}
                    </TableCell>

                    {/* DAY */}

                    <TableCell
                      sx={{
                        fontSize: 14,

                        color: "#1A2434",

                        py: 1.8,
                      }}
                    >
                      {row.day}
                    </TableCell>

                    {/* STATUS */}

                    <TableCell
                      sx={{
                        py: 1.8,
                      }}
                    >
                      <Box
                        sx={{
                          display: "inline-flex",

                          alignItems: "center",

                          px: 1.2,

                          py: 0.45,

                          borderRadius: 1.5,

                          backgroundColor:
                            statusStyle.backgroundColor,

                          color:
                            statusStyle.color,

                          fontSize: 10.5,

                          fontWeight: 800,
                        }}
                      >
                        {row.status.toUpperCase()}
                      </Box>
                    </TableCell>

                    {/* HOURS */}

                    <TableCell
                      align="center"
                      sx={{
                        fontSize: 14,

                        color: "#1A2434",

                        fontWeight: 600,

                        py: 1.8,
                      }}
                    >
                      {row.hours}
                    </TableCell>

                    {/* NOTE */}

                    <TableCell
                      sx={{
                        fontSize: 13,

                        color: "#6A7585",

                        py: 1.8,
                      }}
                    >
                      {row.note}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {/* <Paper
  elevation={0}
  sx={{
    mt: 3,
    border: "1px solid #e5e7eb",
    borderRadius: 1,
    overflow: "hidden",
  }}
>
  <Box
    sx={{
      px: 2.5,
      py: 2,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 2,
      borderBottom: "1px solid #e5e7eb",
    }}
  >
    <Typography sx={{ fontSize: 16, fontWeight: 700 }}>
      My leave requests
    </Typography>

    <Button
      type="button"
      onClick={loadLeaveRequests}
      disabled={leaveLoading || leaveSaving}
      sx={{ textTransform: "none" }}
    >
      Refresh
    </Button>
  </Box>

  <TableContainer>
    <Table size="small" sx={{ minWidth: 700 }}>
      <TableHead>
        <TableRow sx={{ bgcolor: "#f8fafc" }}>
          {["ID", "Leave type", "From", "To", "Status", "Reason"].map(
            (heading) => (
              <TableCell key={heading} sx={{ fontWeight: 700 }}>
                {heading}
              </TableCell>
            )
          )}
        </TableRow>
      </TableHead>

      <TableBody>
        {leaveLoading ? (
          <TableRow>
            <TableCell colSpan={6}>
              Loading leave requests...
            </TableCell>
          </TableRow>
        ) : leaveError ? (
          <TableRow>
            <TableCell colSpan={6} sx={{ color: "error.main" }}>
              {leaveError}
            </TableCell>
          </TableRow>
        ) : leaveRequests.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6}>
              You have not submitted any leave requests.
            </TableCell>
          </TableRow>
        ) : (
          leaveRequests.map((request) => (
            <TableRow key={request.leave_request_id}>
              <TableCell>{request.leave_request_id}</TableCell>
              <TableCell>{request.leave_type}</TableCell>
              <TableCell>{request.start_date}</TableCell>
              <TableCell>{request.end_date}</TableCell>

              <TableCell>
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 700,
                    color:
                      request.status === "APPROVED"
                        ? "#15803d"
                        : request.status === "REJECTED"
                          ? "#b91c1c"
                          : "#b45309",
                  }}
                >
                  {request.status}
                </Typography>
              </TableCell>

              <TableCell
                sx={{
                  maxWidth: 300,
                  whiteSpace: "pre-wrap",
                  overflowWrap: "anywhere",
                }}
              >
                {request.reason}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  </TableContainer>
</Paper> */}
      <Dialog
      
            open={leaveOpen}
            onClose={() => {
                if (!leaveSaving) setLeaveOpen(false);
              }}
            fullWidth
            maxWidth="sm"
            aria-labelledby="leave-dialog-title"
          >
            <DialogTitle id="leave-dialog-title">
              Apply for leave
            </DialogTitle>

            <DialogContent dividers>
              <Box sx={{ display: "grid", gap: 2 }}>
                <TextField
                  select
                  label="Leave type"
                  name="leaveType"
                  value={leaveForm.leaveType}
                  onChange={handleLeaveChange}
                  fullWidth
                  size="small"
                >
                  <MenuItem value="planned_leave">Planned Leave</MenuItem>
                  <MenuItem value="sick_leave">Sick Leave</MenuItem>
                </TextField>

                <TextField
                  label="Start date"
                  type="date"
                  name="startDate"
                  value={leaveForm.startDate}
                  onChange={handleLeaveChange}
                  slotProps={{ inputLabel: { shrink: true } }}
                  fullWidth
                  size="small"
                />

                <TextField
                  label="End date"
                  type="date"
                  name="endDate"
                  value={leaveForm.endDate}
                  onChange={handleLeaveChange}
                  slotProps={{ inputLabel: { shrink: true } }}
                  fullWidth
                  size="small"
                />

                <TextField
                  label="Reason"
                  name="reason"
                  value={leaveForm.reason}
                  onChange={handleLeaveChange}
                  multiline
                  rows={3}
                  slotProps={{ htmlInput: { maxLength: 500 } }}
                  fullWidth
                />
              </Box>
            </DialogContent>

            <DialogActions>
              <Button
                  type="button"
                  disabled={leaveSaving}
                  onClick={() => setLeaveOpen(false)}
                >
                  Cancel
                </Button>

              <Button
                  type="button"
                  variant="contained"
                  onClick={handleSubmitLeave}
                  disabled={leaveSaving}
                >
                  {leaveSaving ? "Submitting..." : "Submit request"}
                </Button>
            </DialogActions>
          </Dialog>

    </Box>
  );
}