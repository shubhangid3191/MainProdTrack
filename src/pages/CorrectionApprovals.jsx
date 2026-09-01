import { useEffect, useState } from "react";
import apiRequest from "../Config/api.js";
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
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import PendingActionsRoundedIcon from "@mui/icons-material/PendingActionsRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import CorePageShell, {
  CoreMetricCards,
  CoreTable,
} from "../components/CorePageShell.jsx";
const requestsIndexer = [
  {
    project: "ABC Medical Imaging",
    date: "19 May",
    field: "Implant Name",
    change: "ABC Screw 5.0 → ABC Screw 5.5",
  },
  {
    project: "ABC Medical Imaging",
    date: "19 May",
    field: "Implant Name",
    change: "ABC Screw 5.0 → ABC Screw 5.5",
  },
];
function IndexerCorrectionRequestsIndexer() {
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
            key={index}
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
                PS
              </Avatar>

              <Typography
                sx={{
                  fontSize: 12,
                  color: "#1A2434",
                }}
              >
                Priya Sharma
              </Typography>
            </Box>

            {/* STATUS */}

            <Chip
              label="PENDING"
              size="small"
              sx={{
                width: "fit-content",
                height: 22,
                backgroundColor: "#fff4db",
                color: "#c27a12",
                border: "1px solid #f2d39b",
                fontSize: 9,
                fontWeight: 800,
              }}
            />
          </Box>
        ))}
      </Card>
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
function CorrectionsCoreTeam({ roleLabel = "Team Lead" }) {
  const [rows, setRows] = useState([]);
  const [approvalSummary, setApprovalSummary] = useState({
  awaitingReview: 0,
  approvedMonth: 0,
  rejectedMonth: 0,
  averageTurnaroundHours: 0,
});

useEffect(() => {
  const loadPendingRequests = async () => {
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
      alert(error.message);
    }
  };

  loadPendingRequests();
}, []);

const loadApprovalSummary = async () => {
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
}, []);

const updateStatus = async (rowIndex, newStatus) => {
  const requestId = rows[rowIndex]?.[6];

  if (!requestId) {
    alert("Correction request ID is missing");
    return;
  }

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

    alert(data.message);
    await loadApprovalSummary();
  } catch (error) {
    console.error("Update correction status error:", error);
    alert(error.message);
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
      return <CorrectionsCoreTeam {...props} />;
    case "coreTeam":
      return <CorrectionsCoreTeam {...props} />;
    case "administrator":
      return <CorrectionsCoreTeam {...props} />;
    default:
      return <IndexerCorrectionRequestsIndexer {...props} />;
  }
}
