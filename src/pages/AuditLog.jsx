import { useState } from "react";
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

const rows = [
  [
    "20 May 14:22",
    "RM",
    "Rohan Mehta",
    "APPROVED CORRECTION",
    "ABC-...-11",
    "Implant Name updated",
  ],
  [
    "20 May 12:03",
    "PS",
    "Priya Sharma",
    "ACKNOWLEDGED GUIDE",
    "ABC v2.3",
    "Read & understood",
  ],
  [
    "20 May 09:41",
    "SA",
    "System Admin",
    "CREATED USER",
    "EMP-1160",
    "Nikhil Verma / Indexer",
  ],
  [
    "19 May 18:00",
    "SY",
    "System",
    "AUTO-LOCKED ENTRIES",
    "ABC Medical",
    "142 entries locked",
  ],
  [
    "19 May 10:15",
    "MN",
    "Meera Nair",
    "UPLOADED GUIDE",
    "ABC v2.3",
    "Notified 50 users",
  ],
];

const tabs = ["Activity", "Change history", "Login events"];

export default function AuditLog() {
  const [notice, setNotice] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

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
        <Button variant="contained" onClick={() => setNotice(true)}>
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
                      fontWeight: 800,
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
                  sx={{ color: "#526581", fontSize: 13, whiteSpace: "nowrap" }}
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
                      fontWeight: 800,
                    }}
                  />
                </TableCell>
                <TableCell
                  sx={{ fontSize: 13, fontWeight: 600, whiteSpace: "nowrap" }}
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
