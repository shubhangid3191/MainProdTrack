import { useState } from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Paper,
  Snackbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

// ─── Design tokens ────────────────────────────────────────────────────────────
const FONT =
  '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
const CARD_SHADOW =
  "0 1px 3px rgba(16,30,54,.07), 0 4px 16px rgba(16,30,54,.06)";
const LINE = "#dfe4ec";
const LINE2 = "#e8ecf3";
const MUTED = "#6a7585";
const HEAD = "#1a2434";

// ─── Static data ──────────────────────────────────────────────────────────────

const PROJECTS = [
  { key: "abc", label: "ABC Medical" },
  { key: "ortho", label: "Ortho Kids" },
  { key: "spine", label: "Spine Index" },
  { key: "cardio", label: "Cardio Rec." },
  { key: "neuro", label: "Neuro Scan" },
];

const ROLE_STYLE = {
  Indexer: {
    label: "INDEXER",
    bg: "#eaf1ff",
    color: "#2458c7",
    border: "#bcd2ff",
  },
  "Team Lead": {
    label: "TEAM LEAD",
    bg: "#eaf1ff",
    color: "#2458c7",
    border: "#bcd2ff",
  },
  "Core Team": {
    label: "CORE TEAM",
    bg: "#eaf1ff",
    color: "#2458c7",
    border: "#bcd2ff",
  },
  Administrator: {
    label: "ADMIN",
    bg: "#eaf1ff",
    color: "#2458c7",
    border: "#bcd2ff",
  },
};

const AVATAR_COLORS = [
  "#4f73e3",
];

const INITIAL_USERS = [
  {
    initials: "PS",
    name: "Priya Sharma",
    role: "Indexer",
    access: [true, true, true, false, false],
  },
  {
    initials: "AR",
    name: "Aditya Rao",
    role: "Indexer",
    access: [false, true, false, false, false],
  },
  {
    initials: "SI",
    name: "Sneha Iyer",
    role: "Indexer",
    access: [false, false, true, false, false],
  },
  {
    initials: "RM",
    name: "Rohan Mehta",
    role: "Team Lead",
    access: [true, true, true, true, false],
  },
  {
    initials: "MN",
    name: "Meera Nair",
    role: "Core Team",
    access: [true, true, true, true, true],
  },
  {
    initials: "SA",
    name: "System Admin",
    role: "Administrator",
    access: [true, true, true, true, true],
  },
];

// ─── Role chip ────────────────────────────────────────────────────────────────

function RoleChip({ role }) {
  const s = ROLE_STYLE[role] ?? ROLE_STYLE.Indexer;
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        px: 1.2,
        py: "3px",
        borderRadius: "5px",
        bgcolor: s.bg,
        border: `1px solid ${s.border}`,
        color: s.color,
        fontFamily: FONT,
        fontSize: 10.5,
        fontWeight: 800,
        letterSpacing: "0.04em",
        whiteSpace: "nowrap",
      }}
    >
      {s.label}
    </Box>
  );
}

// ─── Access toggle dot ────────────────────────────────────────────────────────

function AccessDot({ on, locked, onClick }) {
  const dot = (
    <Box
      component="button"
      type="button"
      aria-label={on ? "Revoke access" : "Grant access"}
      onClick={locked ? undefined : onClick}
      sx={{
        width: 8,
        height: 8,
        p: 0,
        border: on ? "1.5px solid #15966a" : `1.5px solid ${LINE}`,
        borderRadius: "50%",
        bgcolor: on ? "#15966a" : "transparent",
        cursor: locked ? "default" : "pointer",
        display: "block",
        mx: "auto",
        transition: "transform .15s, background-color .15s",
        "&:hover": locked ? {} : { transform: "scale(1.35)" },
      }}
    />
  );

  return locked ? (
    <Tooltip title="All projects assigned" placement="top" arrow>
      <span style={{ display: "flex", justifyContent: "center" }}>{dot}</span>
    </Tooltip>
  ) : (
    <Box sx={{ display: "flex", justifyContent: "center" }}>{dot}</Box>
  );
}

// ─── Mobile card view ─────────────────────────────────────────────────────────

function MobileUserCard({ user, userIdx, locked, onToggle, avatarColor }) {
  return (
    <Paper
      elevation={0}
      sx={{
        border: `1px solid ${LINE}`,
        borderRadius: "10px",
        p: 2,
        bgcolor: "#fff",
      }}
    >
      {/* header */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
        <Avatar
          sx={{
            width: 36,
            height: 36,
            bgcolor: avatarColor,
            fontSize: 13,
            fontWeight: 700,
            fontFamily: FONT,
          }}
        >
          {user.initials}
        </Avatar>
        <Box sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              fontFamily: FONT,
              fontSize: 13,
              fontWeight: 600,
              color: HEAD,
            }}
          >
            {user.name}
          </Typography>
          <Box sx={{ mt: 0.4 }}>
            <RoleChip role={user.role} />
          </Box>
        </Box>
      </Box>

      {/* project toggles */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 1,
        }}
      >
        {PROJECTS.map((proj, pi) => (
          <Box key={proj.key} sx={{ textAlign: "center" }}>
            <Typography
              sx={{
                fontFamily: FONT,
                fontSize: 10,
                fontWeight: 700,
                color: MUTED,
                mb: 0.75,
                letterSpacing: "0.03em",
              }}
            >
              {proj.label.split(" ")[0]}
            </Typography>
            <AccessDot
              on={user.access[pi]}
              locked={locked}
              onClick={() => onToggle(userIdx, pi)}
            />
          </Box>
        ))}
      </Box>
    </Paper>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

function AssignmentMatrixPage({ roleLabel = "Administrator" }) {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [saved, setSaved] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const isLocked = (role) => role === "Core Team" || role === "Administrator";

  function toggle(userIdx, projIdx) {
    setUsers((prev) =>
      prev.map((u, i) =>
        i === userIdx
          ? { ...u, access: u.access.map((v, j) => (j === projIdx ? !v : v)) }
          : u,
      ),
    );
  }

  return (
    <Box sx={{ width: "100%", boxSizing: "border-box" }}>
      {/* BREADCRUMB */}
      <Typography
        sx={{ fontFamily: FONT, fontSize: 12.5, color: MUTED, mb: 0.4 }}
      >
        ProdTrack · {roleLabel}
      </Typography>

      {/* TITLE ROW */}
      <Box
        sx={{
          display: "flex",
          alignItems: { xs: "flex-start", sm: "center" },
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          gap: 1.5,
          mb: 0.4,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontFamily: FONT,
              fontWeight: 800,
              fontSize: 22,
              letterSpacing: "-0.4px",
              color: HEAD,
            }}
          >
            Project assignment matrix
          </Typography>
          <Typography
            sx={{ fontFamily: FONT, fontSize: 13.5, color: MUTED, mt: 0.3 }}
          >
            Controls project visibility. Indexers see only assigned projects;
            core &amp; admin see all.
          </Typography>
        </Box>

        <Button
          variant="contained"
          //startIcon={<SaveRoundedIcon sx={{ fontSize: 17 }} />}
          onClick={() => setSaved(true)}
          sx={{
            fontFamily: FONT,
            fontSize: 13,
            fontWeight: 600,
            px: 2,
            py: 0.875,
            borderRadius: "8px",
            textTransform: "none",
            bgcolor: "#2f6df0",
            color: "#fff",
            boxShadow: "none",
            flexShrink: 0,
            "&:hover": { bgcolor: "#1f57c9", boxShadow: "none" },
          }}
        >
          Save changes
        </Button>
      </Box>

      {/* INFO BANNER */}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 1,
          px: 1.75,
          py: 1.25,
          mb: 2.5,
          mt: 1.5,
          bgcolor: "#f0f7ff",
          border: "1px solid #cfe0f7",
          borderRadius: "6px",
        }}
      >
        <InfoRoundedIcon
          sx={{ fontSize: 16, color: "#2f6df0", flexShrink: 0, mt: "1px" }}
        />
        <Typography
          sx={{
            fontFamily: FONT,
            fontSize: 12.5,
            color: "#44566f",
            lineHeight: 1.6,
          }}
        >
          Toggle a dot to grant or revoke a user's access to a project. Team
          Leads inherit their team's projects. Core Team and Admin always have
          full access.
        </Typography>
      </Box>

      {/* ── DESKTOP TABLE ── */}
      {!isMobile && (
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
          <Box sx={{ overflowX: "auto" }}>
            <Box sx={{ minWidth: 640 }}>
              {/* header */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1.2fr repeat(5, 1fr)",
                  px: 2.5,
                  py: 1.25,
                  bgcolor: "#f8fafc",
                  borderBottom: `1px solid ${LINE2}`,
                }}
              >
                {["USER", "ROLE", ...PROJECTS.map((p) => p.label)].map(
                  (col, i) => (
                    <Typography
                      key={col}
                      sx={{
                        fontFamily: FONT,
                        fontSize: 11,
                        fontWeight: 800,
                        color: MUTED,
                        letterSpacing: "0.4px",
                        textAlign: i >= 2 ? "center" : "left",
                      }}
                    >
                      {col}
                    </Typography>
                  ),
                )}
              </Box>

              {/* rows */}
              {users.map((user, ui) => (
                <Box
                  key={user.name}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1.2fr repeat(5, 1fr)",
                    px: 2.5,
                    py: 1.4,
                    alignItems: "center",
                    borderTop: `1px solid ${LINE2}`,
                    "&:hover": { bgcolor: "#fafbff" },
                  }}
                >
                  {/* user */}
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: 1.25 }}
                  >
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: AVATAR_COLORS[ui % AVATAR_COLORS.length],
                        fontSize: 12,
                        fontWeight: 700,
                        fontFamily: FONT,
                      }}
                    >
                      {user.initials}
                    </Avatar>
                    <Typography
                      sx={{
                        fontFamily: FONT,
                        fontSize: 13,
                        fontWeight: 600,
                        color: HEAD,
                      }}
                    >
                      {user.name}
                    </Typography>
                  </Box>

                  {/* role */}
                  <Box>
                    <RoleChip role={user.role} />
                  </Box>

                  {/* access dots */}
                  {user.access.map((on, pi) => (
                    <AccessDot
                      key={pi}
                      on={on}
                      locked={isLocked(user.role)}
                      onClick={() => toggle(ui, pi)}
                    />
                  ))}
                </Box>
              ))}
            </Box>
          </Box>
        </Paper>
      )}

      {/* ── MOBILE CARDS ── */}
      {isMobile && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {users.map((user, ui) => (
            <MobileUserCard
              key={user.name}
              user={user}
              userIdx={ui}
              locked={isLocked(user.role)}
              onToggle={toggle}
              avatarColor={AVATAR_COLORS[ui % AVATAR_COLORS.length]}
            />
          ))}
        </Box>
      )}

      {/* SNACKBAR */}
      <Snackbar
        open={saved}
        autoHideDuration={2500}
        onClose={() => setSaved(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setSaved(false)}
        >
          Assignment changes saved
        </Alert>
      </Snackbar>
    </Box>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────

export default function AssignmentMatrix(props) {
  const labelMap = {
    administrator: "Administrator",
    coreTeam: "Core Team",
    teamLead: "Team Lead",
  };
  return (
    <AssignmentMatrixPage
      roleLabel={labelMap[props.roleKey] ?? "Administrator"}
    />
  );
}
