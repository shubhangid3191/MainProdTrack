import { Box, Button, Typography } from "@mui/material";
import CorePageShell, { SectionCard } from "../../components/CorePageShell.jsx";

import MoveToInboxRoundedIcon from "@mui/icons-material/MoveToInboxRounded";
import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";

/* ───────────────────────── tokens ───────────────────────── */

const LINE2 = "#eef1f6";
const MUTED = "#6a7585";
const HEAD = "#1a2434";

/* ───────────────────────── data ───────────────────────── */

const STAT_CARDS = [
  {
    label: "Total Received",
    value: "12,480",
    icon: MoveToInboxRoundedIcon,
    iconBg: "#e5eefe",
    iconColor: "#2f6df0",
  },
  {
    label: "Total Completed",
    value: "9,860",
    icon: AssignmentTurnedInRoundedIcon,
    iconBg: "#e4f6ee",
    iconColor: "#1f9d6b",
    trend: "▲ 4.1% MoM",
    trendColor: "#1f9d6b",
  },
  {
    label: "Project Backlog",
    value: "2,620",
    icon: AccessTimeRoundedIcon,
    iconBg: "#fbf1dc",
    iconColor: "#d9962b",
    trend: "▲ 3.6%",
    trendColor: "#d64545",
  },
  {
    label: "Active employees",
    value: "42",
    icon: PeopleAltRoundedIcon,
    iconBg: "#efe9fb",
    iconColor: "#7a51d6",
    trend: "6 projects",
    trendColor: "#1f9d6b",
  },
];

const BACKLOG = [
  { name: "ABC Medical Imaging", pct: 72, total: 720 },
  { name: "Ortho Kids", pct: 44, total: 440 },
  { name: "Spine Indexing", pct: 58, total: 580 },
  { name: "Cardio Records", pct: 30, total: 300 },
  { name: "Neuro Scan", pct: 18, total: 180 },
];

const KPI_CARDS = [
  {
    label: "Pending corrections",
    value: "6",
    note: "awaiting approval",
    color: "#df9324",
    action: "Review",
    nav: "corrections",
  },
  {
    label: "Guide compliance",
    value: "91%",
    note: "acknowledged this cycle",
    color: "#15966a",
    action: "Details",
    nav: "audit-log",
  },
  {
    label: "Missing entries",
    value: "3",
    note: "employees today",
    color: "#dc3545",
    action: "View",
    nav: "users",
  },
];

const TREND_PTS_TARGET = "0,162 133,156 266,148 400,138 533,126 666,112 800,96";
const TREND_FILL =
  "0,158 133,148 266,132 400,105 533,72 666,38 800,10 800,180 0,180";

/* ───────────────────────── stat card ───────────────────────── */

function StatCard({
  icon: Icon,
  iconBg,
  iconColor,
  label,
  value,
  trend,
  trendColor,
}) {
  return (
    <Box
      sx={{
        width: "100%",
        boxSizing: "border-box",
        px: 2,
        py: { xs: 1.75, sm: 2 },
        borderRadius: "12px",
        border: "1px solid #dfe4ec",
        boxShadow:
          "0 1px 3px rgba(16,30,54,.07), 0 4px 16px rgba(16,30,54,.06)",
        bgcolor: "#fff",
        display: "flex",
        alignItems: "center",
        gap: "14px",
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
        }}
      >
        <Icon sx={{ fontSize: 21 }} />
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography
          sx={{
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
            color: HEAD,
            fontSize: { xs: 18, sm: 20, md: 22 },
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.4px",
          }}
        >
          {value}
        </Typography>
        {trend && (
          <Typography
            sx={{
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
    </Box>
  );
}

/* ───────────────────────── trend chart ───────────────────────── */

function TrendChart() {
  return (
    <Box sx={{ px: { xs: 1.5, sm: 2.5 }, pt: 2, pb: 1.5 }}>
      <Box sx={{ height: { xs: 140, sm: 170, md: 200 } }}>
        <svg
          viewBox="0 0 800 180"
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          role="img"
          aria-label="Monthly production trend"
        >
          <defs>
            <linearGradient id="dashboardTrendFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3478ed" stopOpacity=".18" />
              <stop offset="100%" stopColor="#3478ed" stopOpacity=".02" />
            </linearGradient>
          </defs>
          {[36, 72, 108, 144, 180].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="800"
              y2={y}
              stroke={LINE2}
              strokeWidth="1"
            />
          ))}
          <polygon points={TREND_FILL} fill="url(#dashboardTrendFill)" />
          <path
            d="M0,158 C80,155 160,148 266,132 C350,119 370,88 400,105 C440,118 490,60 533,72 C590,88 630,22 666,38 C720,60 760,12 800,10"
            fill="none"
            stroke="#3478ed"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline
            points={TREND_PTS_TARGET}
            fill="none"
            stroke="#8052df"
            strokeWidth="2"
            strokeDasharray="7 6"
            strokeLinecap="round"
          />
        </svg>
      </Box>
      <Box sx={{ display: "flex", gap: 2.5, pt: 1.25, flexWrap: "wrap" }}>
        {[
          { label: "Completed", dash: false },
          { label: "Target", dash: true },
        ].map(({ label, dash }) => (
          <Box
            key={label}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              fontSize: 12,
              color: MUTED,
            }}
          >
            <Box
              component="i"
              sx={{
                display: "inline-block",
                width: 18,
                height: 0,
                borderTop: dash ? "2px dashed #8052df" : "2px solid #3478ed",
              }}
            />
            {label}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

/* ───────────────────────── backlog row ───────────────────────── */

function BacklogRow({ name, pct, total }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr auto",
          sm: "minmax(110px,1fr) 1fr 36px",
        },
        alignItems: "center",
        gap: { xs: 1, sm: 1.5 },
        px: 2,
        py: 1.1,
        borderBottom: `1px solid ${LINE2}`,
        "&:last-of-type": { borderBottom: "none" },
      }}
    >
      <Typography
        sx={{
          fontSize: 12.5,
          color: HEAD,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {name}
      </Typography>
      <Box
        sx={{
          order: { xs: 3, sm: 0 },
          gridColumn: { xs: "1 / -1", sm: "auto" },
          height: 7,
          bgcolor: "#edf1f6",
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: `${pct}%`,
            height: "100%",
            bgcolor: "#5267e8",
            borderRadius: 4,
          }}
        />
      </Box>
      <Typography
        sx={{
          fontSize: 12.5,
          fontWeight: 700,
          color: HEAD,
          textAlign: "right",
        }}
      >
        {total}
      </Typography>
    </Box>
  );
}

/* ───────────────────────── main page ───────────────────────── */

export default function Dashboard({ onNavigate }) {
  return (
    <CorePageShell
      title={
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: { xs: 18, sm: 20 },
            letterSpacing: "-0.3px",
            color: HEAD,
          }}
        >
          Admin dashboard
        </Typography>
      }
      description="Organisation-wide production, backlogs and compliance across all projects."
      actionLabel="Open analytics"
      actionHandler={() => onNavigate("analytics-kpis")}
      headerExtra={
        <Button
          variant="outlined"
          onClick={() => onNavigate("reports")}
          sx={{
            borderColor: "#d0d7e2",
            color: HEAD,
            textTransform: "none",
            fontWeight: 600,
            borderRadius: "8px",
            width: { xs: "100%", sm: "auto" },
          }}
        >
          Export
        </Button>
      }
    >
      {/* ── STAT CARDS ── */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: 2,
          mb: 2.5,
        }}
      >
        {STAT_CARDS.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </Box>

      {/* ── TREND + BACKLOG ── */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "7.2fr 4.8fr" },
          gap: 2,
          mb: 2.5,
        }}
      >
        <SectionCard
          title="Monthly production trend"
          action={
            <Button
              size="small"
              onClick={() => onNavigate("analytics-kpis")}
              sx={{ textTransform: "none", fontWeight: 600 }}
            >
              Analytics
            </Button>
          }
        >
          <TrendChart />
        </SectionCard>

        <SectionCard title="Backlog by project">
          <Box sx={{ pt: 0.5, pb: 0.5 }}>
            {BACKLOG.map((row) => (
              <BacklogRow key={row.name} {...row} />
            ))}
          </Box>
        </SectionCard>
      </Box>

      {/* ── KPI SUMMARY ── */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
          gap: 2,
        }}
      >
        {KPI_CARDS.map(({ label, value, note, color, action, nav }) => (
          <SectionCard
            key={label}
            title={
              <Typography sx={{ fontWeight: 700, fontSize: 12.5, color: HEAD }}>
                {label}
              </Typography>
            }
            action={
              <Button
                size="small"
                onClick={() => onNavigate(nav)}
                sx={{ textTransform: "none", fontWeight: 600 }}
              >
                {action}
              </Button>
            }
          >
            <Box sx={{ textAlign: "center", py: { xs: 2.25, sm: 3 } }}>
              <Typography
                sx={{
                  fontSize: { xs: 24, sm: 26, md: 30 },
                  fontWeight: 800,
                  color,
                  lineHeight: 1,
                  letterSpacing: "-1px",
                }}
              >
                {value}
              </Typography>
              <Typography sx={{ color: MUTED, fontSize: 12.5, mt: 0.75 }}>
                {note}
              </Typography>
            </Box>
          </SectionCard>
        ))}
      </Box>
    </CorePageShell>
  );
}
