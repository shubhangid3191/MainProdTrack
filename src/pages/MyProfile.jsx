import { useEffect, useState } from "react";
import apiRequest from "../Config/api.js";
import { useToast } from "../components/ToastProvider.jsx";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Typography,
  TextField,
} from "@mui/material";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";

// ─── Design tokens ────────────────────────────────────────────────────────────
const FONT =
  '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
const CARD_SHADOW = "0 1px 3px rgba(16,30,54,.07), 0 4px 16px rgba(16,30,54,.06)";
const LINE  = "#dfe4ec";
const LINE2 = "#e8ecf3";
const MUTED = "#6a7585";
const HEAD  = "#1a2434";

// ─── Project chip colors ──────────────────────────────────────────────────────
const CHIP_BG    = ["#e4f6ee", "#fbf1dc", "#efe9fb", "#e6efff"];
const CHIP_COLOR = ["#177a53", "#a9741a", "#603bb3", "#285fb8"];

// ─── Field: label above, plain read-only input box below ─────────────────────
function Field({ label, name, value, onChange }) {
  return (
    <Box>
      <Typography
        sx={{
          fontFamily: FONT,
          fontSize: 12.5,
          fontWeight: 500,
          color: MUTED,
          mb: 0.6,
        }}
      >
        {label}
      </Typography>

      <TextField
        name={name}
        value={value}
        onChange={onChange}
        fullWidth
        size="small"
        sx={{
          "& .MuiOutlinedInput-root": {
            minHeight: 40,
            borderRadius: "8px",
            backgroundColor: "#f8fafc",
            fontFamily: FONT,
            fontSize: 13,
            color: HEAD,

            "& fieldset": {
              borderColor: LINE,
            },

            "&:hover fieldset": {
              borderColor: "#b9c3d1",
            },

            "&.Mui-focused fieldset": {
              borderColor: "#2f6df0",
              borderWidth: "1px",
            },
          },

          "& .MuiInputBase-input": {
            px: 1.5,
            py: 1,
          },
        }}
      />
    </Box>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function MyProfile({ user }) {
  const toast = useToast();
  const defaultEmail = `${(user.username || "user").replace(
    ".",
    ""
  )}@company.com`;
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
const [resetStep, setResetStep]                   = useState(1); // 1=request, 2=set new password
const [resetToken, setResetToken]                 = useState("");
const [changingPassword, setChangingPassword]     = useState(false);
const [passwordData, setPasswordData]             = useState({
  newPassword: "",
  confirmPassword: "",
});

  const [formData, setFormData] = useState({
    emp: user.emp || "EMP-1042",
    name: user.name || "",
    email: defaultEmail,
    dept: user.dept || "Indexing Ops",
    role: user.role || "",
    lead: user.lead || "Rohan Mehta",
  });

  const [assignedProjects, setAssignedProjects] =
  useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  useEffect(() => {
  const loadProfile = async () => {
    try {
      const data = await apiRequest(
        "/profile/me"
      );

      const profile = data.profile;

      setFormData({
        emp: profile.emp || "",
        name: profile.name || "",
        email: profile.email || "",
        dept: profile.department || "",
        role:
          profile.designation ||
          profile.role ||
          "",
        lead:
          profile.team_lead || "—",
      });

      setAssignedProjects(
        (data.assignedProjects || []).map(
          (project) => project.project_name
        )
      );
    } catch (error) {
      console.error(
        "Load Profile Error:",
        error
      );
      toast.error(error.message);
    }
  };

  loadProfile();
}, [toast]);

  const fields = [
    {
      name: "emp",
      label: "Employee ID",
      value: formData.emp,
    },
    {
      name: "name",
      label: "Full name",
      value: formData.name,
    },
    {
      name: "email",
      label: "Email",
      value: formData.email,
    },
    {
      name: "dept",
      label: "Department",
      value: formData.dept,
    },
    {
      name: "role",
      label: "Designation / Role",
      value: formData.role,
    },
    {
      name: "lead",
      label: "Team lead",
      value: formData.lead,
    },
  ];

  const handlePasswordInputChange = (event) => {
    const { name, value } = event.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  // Step 1 — Request reset link → inserts row in password_reset table
  const handleRequestReset = async () => {
    setChangingPassword(true);
    try {
      const data = await apiRequest("/password/request-reset", { method: "POST" });
      setResetToken(data.resetToken);
      setResetStep(2);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setChangingPassword(false);
    }
  };

  // Step 2 — Set new password using the token received
  const handleResetWithToken = async () => {
    if (!passwordData.newPassword || !passwordData.confirmPassword) {
      toast.warning("Enter new password and confirm password");
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.warning("New password and confirm password do not match");
      return;
    }
    setChangingPassword(true);
    try {
      const data = await apiRequest("/password/reset-with-token", {
        method: "POST",
        body: JSON.stringify({
          resetToken,
          newPassword:     passwordData.newPassword,
          confirmPassword: passwordData.confirmPassword,
        }),
      });
      toast.success(data.message);
      setPasswordDialogOpen(false);
      setResetStep(1);
      setResetToken("");
      setPasswordData({ newPassword: "", confirmPassword: "" });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setChangingPassword(false);
    }
  };

  return (
    <Box sx={{ width: "100%", boxSizing: "border-box" }}>

      {/* BREADCRUMB */}
      <Typography sx={{ fontFamily: FONT, fontSize: 12.5, color: MUTED, mb: 0.4 }}>
        ProdTrack · {user.role || "Indexer"}
      </Typography>

      {/* TITLE ROW */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          flexDirection: { xs: "column", sm: "row" },
          gap: 1.5,
          mb: 0.4,
        }}
      >
        <Box>
          <Typography sx={{ fontFamily: FONT, fontSize: 22, fontWeight: 800, letterSpacing: "-0.4px", color: HEAD }}>
            My profile
          </Typography>
          <Typography sx={{ fontFamily: FONT, fontSize: 13.5, color: MUTED, mt: 0.3 }}>
            Your account details and assigned projects.
          </Typography>
        </Box>

        <Button
          variant="outlined"
          onClick={() => setPasswordDialogOpen(true)}
          sx={{
            fontFamily: FONT,
            fontSize: 13,
            fontWeight: 600,
            px: 2,
            py: 0.875,
            borderRadius: "8px",
            textTransform: "none",
            borderColor: LINE,
            color: HEAD,
            bgcolor: "#fff",
            boxShadow: "none",
            flexShrink: 0,
            "&:hover": { borderColor: "#2f6df0", bgcolor: "#f5f8ff", boxShadow: "none" },
          }}
        >
          Reset password
        </Button>
      </Box>

      {/* ── TWO COLUMN LAYOUT ─────────────────────────────────────────────── */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 2,
          mt: 2,
        }}
      >

        {/* ACCOUNT CARD */}
        <Paper
          elevation={0}
          sx={{
            border: `1px solid ${LINE}`,
            borderRadius: "12px",
            boxShadow: CARD_SHADOW,
            bgcolor: "#fff",
            overflow: "hidden",
          }}
        >
          {/* card header */}
          <Box sx={{ px: 2, py: 1.625, borderBottom: `1px solid ${LINE2}` }}>
            <Typography sx={{ fontFamily: FONT, fontWeight: 700, fontSize: 14, color: HEAD }}>
              Account
            </Typography>
          </Box>

          {/* fields grid */}
          <Box
            sx={{
              p: 2,
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 2,
            }}
          >
          {fields.map((field) => (
              <Field
                key={field.name}
                name={field.name}
                label={field.label}
                value={field.value}
                onChange={handleChange}
              />
            ))}
          </Box>
        </Paper>

        {/* ASSIGNED PROJECTS CARD */}
        <Paper
          elevation={0}
          sx={{
            border: `1px solid ${LINE}`,
            borderRadius: "12px",
            boxShadow: CARD_SHADOW,
            bgcolor: "#fff",
            overflow: "hidden",
          }}
        >
          {/* card header */}
          <Box sx={{ px: 2, py: 1.625, borderBottom: `1px solid ${LINE2}` }}>
            <Typography sx={{ fontFamily: FONT, fontWeight: 700, fontSize: 14, color: HEAD }}>
              Assigned projects
            </Typography>
          </Box>

          <Box sx={{ p: 2 }}>
            {/* project chips */}
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
              {assignedProjects.map((project, i) => (
                  <Box
                    key={project}
                    sx={{
                      fontFamily: FONT,
                      fontSize: 12,
                      fontWeight: 600,
                      px: "11px",
                      py: "5px",
                      borderRadius: "20px",
                      bgcolor: CHIP_BG[i % CHIP_BG.length],
                      color: CHIP_COLOR[i % CHIP_COLOR.length],
                    }}
                  >
                    {project}
                  </Box>
                ))}
            </Box>

            {/* info notice */}
            <Box
              sx={{
                mt: 2,
                display: "flex",
                alignItems: "flex-start",
                gap: 1,
                p: 1.5,
                border: "1px solid #cfe0f7",
                bgcolor: "#f0f7ff",
                borderRadius: "8px",
              }}
            >
              <InfoRoundedIcon sx={{ fontSize: 16, color: "#2f6df0", flexShrink: 0, mt: "1px" }} />
              <Typography sx={{ fontFamily: FONT, fontSize: 12.5, color: "#44566f", lineHeight: 1.55 }}>
                You only see updates and entries for projects assigned to you. Contact your admin to change assignments.
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
      <Dialog
        open={passwordDialogOpen}
        onClose={() => {
          if (!changingPassword) {
            setPasswordDialogOpen(false);
            setResetStep(1);
            setResetToken("");
            setPasswordData({ newPassword: "", confirmPassword: "" });
          }
        }}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle sx={{ fontFamily: FONT, fontWeight: 700 }}>
          Reset password
        </DialogTitle>

        <DialogContent>
          {/* STEP 1 — Request reset link */}
          {resetStep === 1 && (
            <Box>
              <Typography sx={{ fontFamily: FONT, fontSize: 13.5, color: MUTED, mb: 1.5 }}>
                Click <strong>Send reset link</strong> to generate a password reset token.
                A row will be created in the system and you can set a new password immediately.
              </Typography>
              <Box sx={{
                p: 1.5, bgcolor: "#f0f7ff", border: "1px solid #cfe0f7",
                borderRadius: "8px", display: "flex", gap: 1, alignItems: "flex-start",
              }}>
                <InfoRoundedIcon sx={{ fontSize: 16, color: "#2f6df0", mt: "2px", flexShrink: 0 }} />
                <Typography sx={{ fontFamily: FONT, fontSize: 12.5, color: "#44566f" }}>
                  In production, a secure link will be sent to your registered email.
                  For this prototype, the token is returned directly.
                </Typography>
              </Box>
            </Box>
          )}

          {/* STEP 2 — Set new password */}
          {resetStep === 2 && (
            <Box>
              <Box sx={{
                p: 1.5, mb: 2, bgcolor: "#f0faf5", border: "1px solid #b7e3cc",
                borderRadius: "8px",
              }}>
                <Typography sx={{ fontFamily: FONT, fontSize: 12.5, color: "#177a53", fontWeight: 600 }}>
                  ✓ Reset link generated — token saved in system
                </Typography>
                <Typography sx={{ fontFamily: FONT, fontSize: 12, color: MUTED, mt: 0.4 }}>
                  Enter your new password below to complete the reset.
                </Typography>
              </Box>

              <TextField
                name="newPassword"
                label="New password"
                type="password"
                value={passwordData.newPassword}
                onChange={handlePasswordInputChange}
                fullWidth
                margin="dense"
                autoComplete="new-password"
              />

              <TextField
                name="confirmPassword"
                label="Confirm new password"
                type="password"
                value={passwordData.confirmPassword}
                onChange={handlePasswordInputChange}
                fullWidth
                margin="dense"
                autoComplete="new-password"
              />
            </Box>
          )}
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              setPasswordDialogOpen(false);
              setResetStep(1);
              setResetToken("");
              setPasswordData({ newPassword: "", confirmPassword: "" });
            }}
            disabled={changingPassword}
            sx={{ fontFamily: FONT }}
          >
            Cancel
          </Button>

          {resetStep === 1 && (
            <Button
              variant="contained"
              onClick={handleRequestReset}
              disabled={changingPassword}
              sx={{ fontFamily: FONT }}
            >
              {changingPassword ? "Generating..." : "Send reset link"}
            </Button>
          )}

          {resetStep === 2 && (
            <Button
              variant="contained"
              onClick={handleResetWithToken}
              disabled={changingPassword}
              sx={{ fontFamily: FONT }}
            >
              {changingPassword ? "Resetting..." : "Set new password"}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
}
