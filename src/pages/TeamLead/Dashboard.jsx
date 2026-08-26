import {
  Box,
  Button,
  Chip,
  Card,
  Grid,
  Link,
  Paper,
  Typography,
} from "@mui/material";

import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import ChecklistRoundedIcon from "@mui/icons-material/ChecklistRounded";
import Avatar from "@mui/material/Avatar";

// ─── Design tokens — identical to Admin dashboard / databin.in/kavya ─────────
const FONT =
  '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
const CARD_SHADOW =
  "0 1px 3px rgba(16,30,54,.07), 0 4px 16px rgba(16,30,54,.06)";
const LINE = "#dfe4ec";
const LINE2 = "#e8ecf3";
const MUTED = "#6a7585";
const HEAD = "#1a2434";

// ─── Data ─────────────────────────────────────────────────────────────────────

const STAT_CARDS = [
  {
    label: "Team size",
    value: "8",
    icon: <PeopleAltRoundedIcon />,
    iconBg: "#e5eefe",
    iconColor: "#2f6df0",
  },
  {
    label: "Completed today",
    value: "362",
    icon: <AssignmentTurnedInRoundedIcon />,
    iconBg: "#e4f6ee",
    iconColor: "#1f9d6b",
    trend: "▲ 8% vs yday",
    trendColor: "#1f9d6b",
  },
  {
    label: "Pending approvals",
    value: "4",
    icon: <AccessTimeRoundedIcon />,
    iconBg: "#fbf1dc",
    iconColor: "#d9962b",
    trend: "2 correction reqs",
    trendColor: "#d64545",
  },
  {
    label: "Ack. compliance",
    value: "86%",
    icon: <VerifiedRoundedIcon />,
    iconBg: "#efe9fb",
    iconColor: "#7a51d6",
    trend: "2 pending",
    trendColor: "#d64545",
  },
];

// Bar chart — [day, value, barHeightPx (out of 160)]
const BARS = [
  ["Mon", 120, 115],
  ["Tue", 145, 138],
  ["Wed", 98, 94],
  ["Thu", 167, 160],
  ["Fri", 152, 145],
  ["Sat", 88, 84],
];

// Donut data
const DONUT = [
  { label: "Completed", value: 980, color: "#20a36b", deg: 227 }, // 63%
  { label: "Pending", value: 270, color: "#e09a20", deg: 79 }, // 22%
  { label: "In review", value: 145, color: "#3478ed", deg: 54 }, // 15%
];

// Team members
const MEMBERS = [
  {
    initials: "PS",
    name: "Priya Sharma",
    avatarColor: "#4f73e3",
    project: "ABC Medical Imaging",
    completed: 45,
    pending: 6,
    guide: "PENDING",
    status: "PRESENT",
  },
  {
    initials: "AR",
    name: "Aditya Rao",
    avatarColor: "#3aab8e",
    project: "Ortho Kids",
    completed: 52,
    pending: 3,
    guide: "DONE",
    status: "PRESENT",
  },
  {
    initials: "SI",
    name: "Sneha Iyer",
    avatarColor: "#5b5ce2",
    project: "Spine Indexing",
    completed: 38,
    pending: 9,
    guide: "DONE",
    status: "PRESENT",
  },
  {
    initials: "KP",
    name: "Karan Patel",
    avatarColor: "#e05a3a",
    project: "ABC Medical Imaging",
    completed: 41,
    pending: 4,
    guide: "DONE",
    status: "LEAVE",
  },
  {
    initials: "DM",
    name: "Divya Menon",
    avatarColor: "#7c4dbd",
    project: "Cardio Records",
    completed: 49,
    pending: 2,
    guide: "PENDING",
    status: "PRESENT",
  },
];

// ─── Shared sub-components ────────────────────────────────────────────────────

/** Stat card — icon box left, label / big value / trend right */
function StatCard({
  icon,
  iconBg,
  iconColor,
  label,
  value,
  trend,
  trendColor,
}) {
  return (
    <Card
      elevation={0}
      sx={{
        width: "100%",
        px: 2,
        py: { xs: 1.75, sm: 2 },
        borderRadius: "12px",
        border: `1px solid ${LINE}`,
        boxShadow: CARD_SHADOW,
        bgcolor: "#fff",
        display: "flex",
        alignItems: "center",
        gap: "14px",
        boxSizing: "border-box",
        "&:hover": {
          boxShadow:
            "0 2px 6px rgba(16,30,54,.1), 0 6px 20px rgba(16,30,54,.08)",
        },
      }}
    >
      <Box
        sx={{
          width: 46,
          height: 46,
          minWidth: 46,
          borderRadius: "11px",
          bgcolor: iconBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: iconColor,
          flexShrink: 0,
          "& svg": { fontSize: 21 },
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography
          sx={{
            fontFamily: FONT,
            color: MUTED,
            fontSize: 12.5,
            fontWeight: 600,
            lineHeight: 1.2,
            mb: 0.2,
          }}
        >
          {label}
        </Typography>
        <Typography
          sx={{
            fontFamily: FONT,
            color: HEAD,
            fontSize: 27,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.6px",
          }}
        >
          {value}
        </Typography>
        {trend && (
          <Typography
            sx={{
              fontFamily: FONT,
              color: trendColor,
              fontSize: 11.5,
              fontWeight: 600,
              mt: "2px",
            }}
          >
            {trend}
          </Typography>
        )}
      </Box>
    </Card>
  );
}

/** Panel card — bordered card with header divider */
function PanelCard({ title, action, children, noPad }) {
  return (
    <Paper
      elevation={0}
      sx={{
        border: `1px solid ${LINE}`,
        borderRadius: "12px",
        boxShadow: CARD_SHADOW,
        bgcolor: "#fff",
        height: "100%",
        width: "100%",
        boxSizing: "border-box",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          py: 1.625,
          borderBottom: `1px solid ${LINE2}`,
          flexShrink: 0,
        }}
      >
        <Typography
          sx={{ fontFamily: FONT, fontWeight: 700, fontSize: 14, color: HEAD }}
        >
          {title}
        </Typography>
        {action}
      </Box>
      <Box sx={{ flex: 1 }}>{children}</Box>
    </Paper>
  );
}

/** Blue action link */
function ViewLink({ label, onClick }) {
  return (
    <Link
      component="button"
      type="button"
      onClick={onClick}
      underline="none"
      sx={{
        fontFamily: FONT,
        color: "#2f6df0",
        fontWeight: 600,
        fontSize: 12.5,
        border: 0,
        bgcolor: "transparent",
        cursor: "pointer",
        p: 0,
        "&:hover": { color: "#1f57c9" },
      }}
    >
      {label}
    </Link>
  );
}

// ─── Bar Chart ────────────────────────────────────────────────────────────────

function ProductivityChart() {
  const MAX_H = 160; // max bar height in px

  return (
    <Box
      sx={{
        px: { xs: 1.5, sm: 2.5 },
        pt: 3,
        pb: 0,
        height: { xs: 200, sm: 220 },
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-around",
        gap: { xs: 0.5, sm: 1 },
        overflow: "hidden",
      }}
    >
      {BARS.map(([day, value, barH], i) => {
        const isSat = i === 5;
        const heightPct = `${(barH / MAX_H) * 100}%`;
        return (
          <Box
            key={day}
            sx={{
              flex: 1,
              maxWidth: { xs: 40, sm: 52 },
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-end",
              pb: "26px",
              position: "relative",
            }}
          >
            {/* value label above bar */}
            <Typography
              sx={{
                fontFamily: FONT,
                fontSize: { xs: 10, sm: 11 },
                fontWeight: 700,
                color: HEAD,
                mb: "4px",
                lineHeight: 1,
              }}
            >
              {value}
            </Typography>

            {/* bar */}
            <Box
              sx={{
                width: "100%",
                height: heightPct,
                bgcolor: isSat ? "#8060d9" : "#3478ed",
                borderRadius: "6px 6px 0 0",
              }}
            />

            {/* day label below */}
            <Typography
              sx={{
                position: "absolute",
                bottom: 4,
                fontFamily: FONT,
                fontSize: { xs: 10, sm: 11 },
                color: MUTED,
                fontWeight: 500,
              }}
            >
              {day}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}

// ─── Donut / Completion Split ─────────────────────────────────────────────────

function CompletionSplit() {
  // build conic-gradient stops
  const total = DONUT.reduce((s, d) => s + d.value, 0);
  let cumPct = 0;
  const stops = DONUT.map(({ color, value }) => {
    const pct = (value / total) * 100;
    const stop = `${color} ${cumPct.toFixed(1)}% ${(cumPct + pct).toFixed(1)}%`;
    cumPct += pct;
    return stop;
  }).join(", ");

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: { xs: 3, sm: 5 },
        flexDirection: { xs: "column", sm: "row" },
        py: { xs: 2.5, sm: 0 },
        height: { xs: "auto", sm: "100%" },
        minHeight: { xs: 220, sm: 190 },
      }}
    >
      {/* donut */}
      <Box
        sx={{
          width: { xs: 130, sm: 148 },
          height: { xs: 130, sm: 148 },
          borderRadius: "50%",
          background: `conic-gradient(${stops})`,
          display: "grid",
          placeItems: "center",
          flexShrink: 0,
        }}
      >
        <Box
          sx={{
            width: { xs: 84, sm: 96 },
            height: { xs: 84, sm: 96 },
            borderRadius: "50%",
            bgcolor: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontFamily: FONT,
              fontSize: { xs: 20, sm: 22 },
              fontWeight: 800,
              color: HEAD,
              lineHeight: 1.1,
            }}
          >
            78%
          </Typography>
          <Typography sx={{ fontFamily: FONT, fontSize: 11, color: MUTED }}>
            Completed
          </Typography>
        </Box>
      </Box>

      {/* legend */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {DONUT.map(({ label, value, color }) => (
          <Box
            key={label}
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <Box
              sx={{
                width: 11,
                height: 11,
                bgcolor: color,
                borderRadius: "2px",
                flexShrink: 0,
              }}
            />
            <Typography sx={{ fontFamily: FONT, fontSize: 12.5, color: HEAD }}>
              {label} · {value}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

// ─── Team Members Table ───────────────────────────────────────────────────────

const COL = "1.4fr 1.8fr 1fr 1fr 1.2fr 1fr";

function GuideChip({ value }) {
  const done = value === "DONE";

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "60px",
        fontFamily: FONT,
        fontSize: 10,
        fontWeight: 800,
        px: "4px",
        py: "3px",
        borderRadius: "5px",
        letterSpacing: "0.2px",
        textTransform: "uppercase",
        lineHeight: 1.2,
        border: done ? "1.5px solid #1f9d6b" : "1.5px solid #d9962b",
        color: done ? "#1f9d6b" : "#d9962b",
        bgcolor: "transparent",
      }}
    >
      {value}
    </Box>
  );
}
function StatusChip({ value }) {
  const present = value === "PRESENT";

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "60px",
        fontFamily: FONT,
        fontSize: 10,
        fontWeight: 800,
        px: "4px",
        py: "3px",
        borderRadius: "5px",
        letterSpacing: "0.2px",
        textTransform: "uppercase",
        lineHeight: 1.2,
        ...(present
          ? {
              bgcolor: "#e4f6ee",
              color: "#177a53",
              border: "1.5px solid #b7e3cc",
            }
          : {
              bgcolor: "#f3f4f6",
              color: "#6a7585",
              border: `1.5px solid ${LINE}`,
            }),
      }}
    >
      {value}
    </Box>
  );
}

function MemberRow({
  initials,
  name,
  avatarColor,
  project,
  completed,
  pending,
  guide,
  status,
}) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: COL,
        minWidth: 860,
        alignItems: "center",
        px: 2,
        py: 1.25,
        borderTop: `1px solid ${LINE2}`,
        "&:hover": { bgcolor: "#fafbff" },
      }}
    >
      {/* member */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
        <Avatar
          sx={{
            width: 32,
            height: 32,
            bgcolor: avatarColor,
            fontSize: 12,
            fontWeight: 700,
            fontFamily: FONT,
          }}
        >
          {initials}
        </Avatar>
        <Typography
          sx={{
            fontFamily: FONT,
            fontSize: 13,
            fontWeight: 600,
            color: HEAD,
            whiteSpace: "nowrap",
          }}
        >
          {name}
        </Typography>
      </Box>

      {/* project */}
      <Typography
        sx={{
          fontFamily: FONT,
          fontSize: 13,
          color: MUTED,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {project}
      </Typography>

      {/* completed */}
      <Typography
        sx={{ fontFamily: FONT, fontSize: 13, fontWeight: 700, color: HEAD }}
      >
        {completed}
      </Typography>

      {/* pending */}
      <Typography sx={{ fontFamily: FONT, fontSize: 13, color: HEAD }}>
        {pending}
      </Typography>

      {/* guide ack */}
      <GuideChip value={guide} />

      {/* status */}
      <StatusChip value={status} />
    </Box>
  );
}

function TeamMembersTable({ onNavigate }) {
  return (
    <PanelCard
      title="Team members"
      action={
        <ViewLink label="Manage team" onClick={() => onNavigate("my-team")} />
      }
    >
      {/* table header */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: COL,
          minWidth: 860,
          px: 2,
          py: 1.2,
          bgcolor: "#f8fafc",
          borderBottom: `1px solid ${LINE2}`,
        }}
      >
        {[
          "MEMBER",
          "PROJECT",
          "COMPLETED",
          "PENDING",
          "GUIDE ACK.",
          "STATUS",
        ].map((col) => (
          <Typography
            key={col}
            sx={{
              fontFamily: FONT,
              fontSize: 11,
              fontWeight: 800,
              color: MUTED,
              letterSpacing: "0.4px",
            }}
          >
            {col}
          </Typography>
        ))}
      </Box>

      {/* rows */}
      <Box sx={{ overflowX: "auto" }}>
        {MEMBERS.map((m) => (
          <MemberRow key={m.name} {...m} />
        ))}
      </Box>
    </PanelCard>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function Dashboard({ onNavigate }) {
  return (
    <Box sx={{ width: "100%", boxSizing: "border-box" }}>
      {/* BREADCRUMB */}
      <Typography
        sx={{ fontFamily: FONT, fontSize: 12.5, color: MUTED, mb: 0.4 }}
      >
        ProdTrack · Team Lead
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
        <Typography
          sx={{
            fontFamily: FONT,
            fontWeight: 800,
            fontSize: 22,
            letterSpacing: "-0.4px",
            color: HEAD,
          }}
        >
          Team dashboard
        </Typography>

        <Box sx={{ display: "flex", gap: 1, flexShrink: 0 }}>
          {/* Export report */}
          <Button
            variant="outlined"
            onClick={() => onNavigate("reports")}
            sx={{
              fontFamily: FONT,
              fontSize: 13,
              fontWeight: 600,
              px: 2,
              py: 0.875,
              borderRadius: "8px",
              textTransform: "none",
              borderColor: "#d0d7e2",
              color: HEAD,
              bgcolor: "#fff",
              boxShadow: "none",
              "&:hover": {
                borderColor: "#2f6df0",
                bgcolor: "#f5f8ff",
                boxShadow: "none",
              },
            }}
          >
            Export report
          </Button>

          {/* Review approvals — blue */}
          <Button
            variant="contained"
            //startIcon={<ChecklistRoundedIcon sx={{ fontSize: 17 }} />}
            onClick={() => onNavigate("corrections")}
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
              "&:hover": { bgcolor: "#1f57c9", boxShadow: "none" },
            }}
          >
            Review approvals
          </Button>
        </Box>
      </Box>

      {/* DESCRIPTION */}
      <Typography
        sx={{ fontFamily: FONT, fontSize: 13.5, color: MUTED, mb: 2.5 }}
      >
        Production and acknowledgement status for your team across assigned
        projects.
      </Typography>

      {/* ── 4 STAT CARDS ─────────────────────────────────────────────────── */}
      <Grid container spacing={2} sx={{ mb: 2.5 }}>
        {STAT_CARDS.map((card) => (
          <Grid
            key={card.label}
            size={{ xs: 12, sm: 6, md: 3 }}
            sx={{ display: "flex" }}
          >
            <StatCard {...card} />
          </Grid>
        ))}
      </Grid>

      {/* ── BAR CHART  +  DONUT ──────────────────────────────────────────── */}
      <Grid container spacing={2} sx={{ mb: 2.5 }}>
        {/* team productivity bar chart */}
        <Grid size={{ xs: 12, md: 7 }} sx={{ display: "flex" }}>
          <PanelCard
            title="Team productivity — this week"
            action={
              <ViewLink label="Details" onClick={() => onNavigate("reports")} />
            }
          >
            <ProductivityChart />
          </PanelCard>
        </Grid>

        {/* completion split donut */}
        <Grid size={{ xs: 12, md: 5 }} sx={{ display: "flex" }}>
          <PanelCard title="Completion split">
            <CompletionSplit />
          </PanelCard>
        </Grid>
      </Grid>

      {/* ── TEAM MEMBERS TABLE ───────────────────────────────────────────── */}
      <TeamMembersTable onNavigate={onNavigate} />
    </Box>
  );
}
