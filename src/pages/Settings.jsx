import { useState } from "react";
import {
  Alert,
  Box,
  Checkbox,
  FormControlLabel,
  Paper,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import CorePageShell from "../components/CorePageShell.jsx";

const fieldSx = {
  width: "100%",
  height: 42,
  bgcolor: "#fff",
  border: "1px solid #dbe3ec",
  borderRadius: 1.2,
  fontSize: 13,
  "& .MuiSelect-select": { px: 1.5, py: 1.1 },
};
const notifications = [
  "Daily entry reminder",
  "Entry submission confirmation",
  "Correction request submitted",
  "Correction approved / rejected",
  "User account created",
  "Password reset",
];

function SettingsCard({ title, children }) {
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
        {title}
      </Typography>
      <Box sx={{ p: 2 }}>{children}</Box>
    </Paper>
  );
}

function SelectSetting({ label, value, options }) {
  return (
    <Box>
      <Typography sx={{ color: "#526581", fontSize: 12, mb: 0.6 }}>
        {label}
      </Typography>
      <Select
        native
        defaultValue={value}
        sx={fieldSx}
        inputProps={{ "aria-label": label }}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </Box>
  );
}

export default function Settings() {
  const [saved, setSaved] = useState(false);
  return (
    <>
      <CorePageShell
        breadcrumb="Administrator"
        title="Settings"
        description="Authentication, notifications and productivity formula configuration."
        actionLabel="Save"
        actionIcon={null}
        actionHandler={() => setSaved(true)}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 2,
            mb: 2,
          }}
        >
          <SettingsCard title="Authentication">
            <Box sx={{ display: "grid", gap: 1.7 }}>
              <SelectSetting
                label="Method"
                value="Microsoft Entra ID (SSO) — preferred"
                options={[
                  "Microsoft Entra ID (SSO) — preferred",
                  "Email and password",
                ]}
              />
              <SelectSetting
                label="Password reset"
                value="Self-service via email"
                options={["Self-service via email", "Administrator only"]}
              />
              <SelectSetting
                label="Session timeout"
                value="30 minutes"
                options={["15 minutes", "30 minutes", "60 minutes"]}
              />
            </Box>
          </SettingsCard>
          <SettingsCard title="Productivity formula">
            <Box sx={{ display: "grid", gap: 1.7 }}>
              <SelectSetting
                label="Base metric"
                value="Documents completed"
                options={["Documents completed", "Batches processed"]}
              />
              <SelectSetting
                label="Exclude approved leave"
                value="Yes"
                options={["Yes", "No"]}
              />
              <Box>
                <Typography sx={{ color: "#526581", fontSize: 12, mb: 0.6 }}>
                  Formula
                </Typography>
                <TextField
                  fullWidth
                  defaultValue="completed ÷ (received × available_hours) × 100"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: 42,
                      borderRadius: 1.2,
                      fontSize: 13,
                    },
                  }}
                />
              </Box>
            </Box>
          </SettingsCard>
        </Box>
        <SettingsCard title="Email notifications">
          <Box sx={{ display: "grid" }}>
            {notifications.map((label) => (
              <FormControlLabel
                key={label}
                sx={{ m: 0, minHeight: 39, borderBottom: "1px solid #e3e8ef" }}
                control={<Checkbox defaultChecked size="small" />}
                label={
                  <Typography sx={{ fontSize: 13, color: "#10233d" }}>
                    {label}
                  </Typography>
                }
              />
            ))}
          </Box>
        </SettingsCard>
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
          Settings saved successfully
        </Alert>
      </Snackbar>
    </>
  );
}
