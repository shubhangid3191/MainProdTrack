import { Box, Button, Paper, Typography } from "@mui/material";
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
function Field({ label, value }) {
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
      <Box
        sx={{
          width: "100%",
          boxSizing: "border-box",
          px: 1.5,
          py: 1,
          bgcolor: "#f8fafc",
          border: `1px solid ${LINE}`,
          borderRadius: "8px",
          fontFamily: FONT,
          fontSize: 13,
          color: HEAD,
          lineHeight: "22px",
          minHeight: 38,
          userSelect: "text",
        }}
      >
        {value || <span style={{ color: MUTED }}>—</span>}
      </Box>
    </Box>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function MyProfile({ user }) {
  const email = `${(user.username || "user").replace(".", "")}@company.com`;

  const fields = [
    ["Employee ID",       user.emp  || "EMP-1042"],
    ["Full name",         user.name || "—"],
    ["Email",             email],
    ["Department",        user.dept || "Indexing Ops"],
    ["Designation / Role",user.role || "—"],
    ["Team lead",         user.lead || "Rohan Mehta"],
  ];

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
            {fields.map(([label, value]) => (
              <Field key={label} label={label} value={value} />
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
              {(user.projects || ["ABC Medical Imaging", "Ortho Kids", "Spine Indexing"]).map(
                (project, i) => (
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
                )
              )}
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
    </Box>
  );
}
