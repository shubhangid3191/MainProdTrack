import {
  useEffect,
  useState,
} from "react";

import apiRequest from "../Config/api.js";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";


const tabs = ["Activity", "Change History", "Login Events"];

export default function AuditLog() {
  const [notice, setNotice] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const [logs, setLogs] = useState([]);

useEffect(() => {
  const loadAuditLogs = async () => {
    try {
      const data = await apiRequest(
        "/audit-logs?pageSize=100"
      );

      setLogs(data.logs || []);
    } catch (error) {
      console.error(
        "Load Audit Logs Error:",
        error
      );

      alert(error.message);
    }
  };

  loadAuditLogs();
}, []);

const rows = logs.map((log) => {
  const userName =
    log.user_name || "System";

  const initials = userName
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const createdDate = new Date(
    log.created_at
  );

  const formattedTime =
    Number.isNaN(createdDate.getTime())
      ? "—"
      : createdDate.toLocaleString(
          "en-IN",
          {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }
        );

  const entity = [
    log.entity_type,
    log.entity_ref,
  ]
    .filter(Boolean)
    .join(" #");

  return [
    formattedTime,
    initials || "SY",
    userName,
    String(
      log.action || "Activity"
    ).toUpperCase(),
    entity || "—",
    log.detail || "—",
  ];
});

const handleExport = () => {
  if (logs.length === 0) {
    alert("No audit logs are available");
    return;
  }

  const escapeCsv = (value) => {
    let text = String(value ?? "");

    if (/^[=+\-@]/.test(text)) {
      text = `'${text}`;
    }

    return `"${text.replaceAll('"', '""')}"`;
  };

  const exportRows = [
    [
      "Timestamp",
      "User",
      "Employee ID",
      "Action",
      "Entity Type",
      "Entity Reference",
      "Detail",
    ],

    ...logs.map((log) => [
      log.created_at,
      log.user_name || "System",
      log.emp_code || "",
      log.action,
      log.entity_type,
      log.entity_ref,
      log.detail,
    ]),
  ];

  const csvContent = exportRows
    .map((row) =>
      row.map(escapeCsv).join(",")
    )
    .join("\n");

  const file = new Blob(
    [csvContent],
    {
      type: "text/csv;charset=utf-8;",
    }
  );

  const url = URL.createObjectURL(file);
  const link = document.createElement("a");

  link.href = url;
  link.download =
    `audit-log-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;

  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
  setNotice(true);
};
  return (
    <Box sx={{ width: "100%" }}>
      {/* ── PAGE HEADER ── */}
      <Typography sx={{ color: "#667085", fontSize: 12 }}>
        ProdTrack · Administrator
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: 2,
          mt: 0.7,
          mb: 2,
        }}
      >
        <Box>
          <Typography sx={{ fontSize: 24, fontWeight: 800 }}>
            Audit log
          </Typography>
          <Typography sx={{ color: "#667085", fontSize: 13, mt: 0.4 }}>
            User activity, change history and login events for compliance.
          </Typography>
        </Box>
       <Button
          variant="contained"
          onClick={handleExport}
        >
          Export
        </Button>
      </Box>

      {/* ── TABS ── */}
      <Box
        sx={{
          display: "flex",
          gap: 0,
          borderBottom: "1px solid #dbe3ec",
          mb: 2,
          px: 0.5,
          overflowX: "auto",
        }}
      >
        {tabs.map((tab, i) => (
          <Button
            key={tab}
            onClick={() => setActiveTab(i)}
            sx={{
              borderRadius: 0,
              borderBottom:
                activeTab === i ? "2px solid #3478ed" : "2px solid transparent",
              color: activeTab === i ? "#3478ed" : "#526581",
              minWidth: 0,
              px: 1.5,
              pb: 0.8,
              fontWeight: activeTab === i ? 700 : 400,
              whiteSpace: "nowrap",
            }}
          >
            {tab}
          </Button>
        ))}
      </Box>

      {/* ── TABLE ── */}
      <Paper
        elevation={0}
        sx={{
          border: "1px solid #dbe3ec",
          borderRadius: 1.5,
          overflow: "auto",
          boxShadow: "0 2px 6px rgba(16,35,61,.08)",
          width: "100%",
        }}
      >
        <Table size="small" sx={{ minWidth: 750 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: "#f8fafc" }}>
              {["TIMESTAMP", "USER", "ACTION", "ENTITY", "DETAIL"].map(
                (header) => (
                  <TableCell
                    key={header}
                    sx={{
                      color: "#526581",
                      fontSize: 11,
                      fontWeight: 700,
                      py: 1.4,
                    }}
                  >
                    {header}
                  </TableCell>
                ),
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(([time, initials, name, action, entity, detail]) => (
              <TableRow key={`${time}-${name}`} hover>
                <TableCell
                  sx={{
                    color: "#526581",
                    fontSize: 13,
                    whiteSpace: "nowrap",
                    fontWeight: 500,
                  }}
                >
                  {time}
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      fontSize: 13,
                      whiteSpace: "nowrap",
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 27,
                        height: 27,
                        bgcolor: "#5b5ce2",
                        fontSize: 11,
                        fontWeight: 700,
                      }}
                    >
                      {initials}
                    </Avatar>
                    {name}
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={action}
                    size="small"
                    sx={{
                      color: "#2458c7",
                      bgcolor: "#eaf1ff",
                      border: "1px solid #bcd2ff",
                      fontSize: 10,
                      fontWeight: 700,
                    }}
                  />
                </TableCell>
                <TableCell
                  sx={{ fontSize: 13, fontWeight: 500, whiteSpace: "nowrap" }}
                >
                  {entity}
                </TableCell>
                <TableCell sx={{ color: "#667085", fontSize: 13 }}>
                  {detail}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Snackbar
        open={notice}
        autoHideDuration={2500}
        onClose={() => setNotice(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setNotice(false)}
        >
          Audit log exported successfully
        </Alert>
      </Snackbar>
    </Box>
  );
}
