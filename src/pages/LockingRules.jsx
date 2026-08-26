import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Paper,
  Select,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import CorePageShell from "../components/CorePageShell.jsx";

const projects = [
  ["ABC Medical Imaging", "6:00 PM", "30 min"],
  ["Ortho Kids", "7:00 PM", "15 min"],
  ["Spine Indexing", "6:00 PM", "30 min"],
  ["Cardio Records", "8:00 PM", "0 min"],
];
const selectSx = {
  width: "100%",
  height: 42,
  bgcolor: "#fff",
  border: "1px solid #dbe3ec",
  borderRadius: 1.2,
  fontSize: 13,
  "& .MuiSelect-select": { px: 1.5, py: 1.1 },
};

function Workflow() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        mb: 2,
        flexWrap: "wrap",
      }}
    >
      {["Draft", "Submitted", "Reviewed", "Locked"].map((step, index) => (
        <Box key={step} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Button
            variant="contained"
            size="small"
            sx={{ height: 39, minWidth: 61, bgcolor: "#3478ed" }}
          >
            {step}
          </Button>
          {index < 3 && (
            <Typography sx={{ color: "#94a3b8", fontSize: 18 }}>→</Typography>
          )}
        </Box>
      ))}
    </Box>
  );
}

function GlobalRules() {
  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid #dbe3ec",
        borderRadius: 1.5,
        overflow: "hidden",
        bgcolor: "#fff",
      }}
    >
      <Typography
        sx={{
          px: 2,
          py: 1.5,
          fontWeight: 800,
          borderBottom: "1px solid #e3e8ef",
        }}
      >
        Global rules
      </Typography>
      <Box sx={{ p: 2, display: "grid", gap: 1.7 }}>
        {[
          ["Draft entries", "Editable by indexer"],
          ["Submitted entries", "Read-only for indexer"],
          ["Locked entries", "Correction request required"],
          ["Correction approver", "Team lead, then Core Team"],
        ].map(([label, value]) => (
          <Box key={label}>
            <Typography sx={{ color: "#526581", fontSize: 12, mb: 0.6 }}>
              {label}
            </Typography>
            <Select
              native
              defaultValue={value}
              sx={selectSx}
              inputProps={{ "aria-label": label }}
            >
              <option value={value}>{value}</option>
              <option value="Editable">Editable</option>
              <option value="Read-only">Read-only</option>
            </Select>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}

function ProjectRules() {
  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid #dbe3ec",
        borderRadius: 1.5,
        overflow: "hidden",
        bgcolor: "#fff",
      }}
    >
      <Typography
        sx={{
          px: 2,
          py: 1.5,
          fontWeight: 800,
          borderBottom: "1px solid #e3e8ef",
        }}
      >
        Auto-lock timing per project
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow sx={{ bgcolor: "#f8fafc" }}>
            {["PROJECT", "AUTO-LOCK", "GRACE"].map((header) => (
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
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map(([name, time, grace]) => (
            <TableRow key={name}>
              <TableCell sx={{ fontSize: 13, py: 1.4 }}>{name}</TableCell>
              <TableCell sx={{ fontSize: 13, fontWeight: 700, py: 1.4 }}>
                {time}
              </TableCell>
              <TableCell sx={{ color: "#526581", fontSize: 13, py: 1.4 }}>
                {grace}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default function LockingRules() {
  const [saved, setSaved] = useState(false);
  return (
    <>
      <CorePageShell
        breadcrumb="Administrator"
        title="Daily entry locking rules"
        description="Configure the Draft → Submitted → Reviewed → Locked workflow per project."
        actionLabel="Save rules"
        actionHandler={() => setSaved(true)}
      >
        <Workflow />
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 2,
          }}
        >
          <GlobalRules />
          <ProjectRules />
        </Box>
      </CorePageShell>

      <Snackbar
        open={saved}
        autoHideDuration={2600}
        onClose={() => setSaved(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setSaved(false)}
        >
          Rules saved successfully
        </Alert>
      </Snackbar>
    </>
  );
}
