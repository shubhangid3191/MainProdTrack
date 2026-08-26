import { Box, Button, Card, Grid, Link, Paper, Typography } from "@mui/material";

import MoveToInboxRoundedIcon   from "@mui/icons-material/MoveToInboxRounded";
import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import AccessTimeRoundedIcon     from "@mui/icons-material/AccessTimeRounded";
import PeopleAltRoundedIcon      from "@mui/icons-material/PeopleAltRounded";
import BarChartRoundedIcon       from "@mui/icons-material/BarChartRounded";

// ─── Design tokens — identical to databin.in/kavya ───────────────────────────
const FONT =
  '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
const CARD_SHADOW = "0 1px 3px rgba(16,30,54,.07), 0 4px 16px rgba(16,30,54,.06)";
const LINE  = "#dfe4ec";
const LINE2 = "#e8ecf3";
const MUTED = "#6a7585";
const HEAD  = "#1a2434";

// ─── Static data ─────────────────────────────────────────────────────────────

const STAT_CARDS = [
  {
    label:      "Total Received",
    value:      "12,480",
    icon:       <MoveToInboxRoundedIcon />,
    iconBg:     "#e5eefe",
    iconColor:  "#2f6df0",
  },
  {
    label:      "Total Completed",
    value:      "9,860",
    icon:       <AssignmentTurnedInRoundedIcon />,
    iconBg:     "#e4f6ee",
    iconColor:  "#1f9d6b",
    trend:      "▲ 4.1% MoM",
    trendColor: "#1f9d6b",
  },
  {
    label:      "Project Backlog",
    value:      "2,620",
    icon:       <AccessTimeRoundedIcon />,
    iconBg:     "#fbf1dc",
    iconColor:  "#d9962b",
    trend:      "▲ 3.6%",
    trendColor: "#d64545",
  },
  {
    label:      "Active employees",
    value:      "42",
    icon:       <PeopleAltRoundedIcon />,
    iconBg:     "#efe9fb",
    iconColor:  "#7a51d6",
    trend:      "6 projects",
    trendColor: "#1f9d6b",
  },
];

const BACKLOG = [
  { name: "ABC Medical Imaging", pct: 72, total: 720 },
  { name: "Ortho Kids",          pct: 44, total: 440 },
  { name: "Spine Indexing",      pct: 58, total: 580 },
  { name: "Cardio Records",      pct: 30, total: 300 },
  { name: "Neuro Scan",          pct: 18, total: 180 },
];

const KPI_CARDS = [
  { label: "Pending corrections", value: "6",   note: "awaiting approval",      color: "#df9324", action: "Review",  nav: "corrections" },
  { label: "Guide compliance",    value: "91%",  note: "acknowledged this cycle", color: "#15966a", action: "Details", nav: "audit-log"    },
  { label: "Missing entries",     value: "3",   note: "employees today",         color: "#dc3545", action: "View",    nav: "users"        },
];

// SVG trend — Y coords (0=top, 180=bottom).
// Completed: starts low-left, sweeps steeply upward to top-right (beating target).
// Target (dashed): starts at same low point, rises gently — stays BELOW completed.
const TREND_PTS_COMPLETED = "0,158 133,148 266,132 400,105 533,72 666,38 800,10";
const TREND_PTS_TARGET     = "0,162 133,156 266,148 400,138 533,126 666,112 800,96";
const TREND_FILL           = "0,158 133,148 266,132 400,105 533,72 666,38 800,10 800,180 0,180";

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Stat card — icon box on the left, label / big value / trend on the right */
function StatCard({ icon, iconBg, iconColor, label, value, trend, trendColor }) {
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
        "&:hover": { boxShadow: "0 2px 6px rgba(16,30,54,.1), 0 6px 20px rgba(16,30,54,.08)" },
      }}
    >
      {/* icon box */}
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

      {/* text */}
      <Box>
        <Typography sx={{ fontFamily: FONT, color: MUTED, fontSize: 12.5, fontWeight: 600, lineHeight: 1.2, mb: 0.2 }}>
          {label}
        </Typography>
        <Typography sx={{ fontFamily: FONT, color: HEAD, fontSize: 27, fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.6px" }}>
          {value}
        </Typography>
        {trend && (
          <Typography sx={{ fontFamily: FONT, color: trendColor, fontSize: 11.5, fontWeight: 600, mt: "2px" }}>
            {trend}
          </Typography>
        )}
      </Box>
    </Card>
  );
}

/** Generic panel card with header divider */
function PanelCard({ title, action, children }) {
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
      {/* header */}
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
        <Typography sx={{ fontFamily: FONT, fontWeight: 700, fontSize: 14, color: HEAD }}>
          {title}
        </Typography>
        {action}
      </Box>

      {/* body */}
      <Box sx={{ flex: 1, width: "100%" }}>{children}</Box>
    </Paper>
  );
}

/** Blue "view-all" link used inside panel-card headers */
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

/** Monthly production trend SVG chart */
function TrendChart() {
  return (
    <Box sx={{ px: 2.5, pt: 2, pb: 1.5 }}>
      {/* chart */}
      <Box sx={{ height: { xs: 130, sm: 150, md: 165 } }}>
        <svg
          viewBox="0 0 800 180"
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          role="img"
          aria-label="Monthly production trend"
        >
          <defs>
            <linearGradient id="adminFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#3478ed" stopOpacity=".18" />
              <stop offset="100%" stopColor="#3478ed" stopOpacity=".02" />
            </linearGradient>
          </defs>

          {/* subtle horizontal grid */}
          {[36, 72, 108, 144, 180].map((y) => (
            <line key={y} x1="0" y1={y} x2="800" y2={y} stroke={LINE2} strokeWidth="1" />
          ))}

          {/* filled area under completed line */}
          <polygon points={TREND_FILL} fill="url(#adminFill)" />

          {/* completed — solid blue, smooth cubic-bezier curve sweeping up steeply */}
          <path
            d="M0,158 C80,155 160,148 266,132 C350,119 370,88 400,105 C440,118 490,60 533,72 C590,88 630,22 666,38 C720,60 760,12 800,10"
            fill="none"
            stroke="#3478ed"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* target — dashed purple, gentle straight-ish rise */}
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

      {/* legend */}
      <Box sx={{ display: "flex", gap: 2.5, pt: 1.25, flexWrap: "wrap" }}>
        {[
          { label: "Completed", dash: false },
          { label: "Target",    dash: true  },
        ].map(({ label, dash }) => (
          <Box
            key={label}
            sx={{ display: "flex", alignItems: "center", gap: "5px", fontFamily: FONT, fontSize: 12, color: MUTED }}
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

/** Single backlog row: name — progress bar — count */
function BacklogRow({ name, pct, total }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "minmax(110px,1fr) 1fr 36px",
        alignItems: "center",
        gap: { xs: 1, sm: 1.5 },
        px: 2,
        py: 1.1,
        borderBottom: `1px solid ${LINE2}`,
        "&:last-child": { borderBottom: "none" },
      }}
    >
      <Typography
        sx={{
          fontFamily: FONT,
          fontSize: 12.5,
          color: HEAD,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {name}
      </Typography>

      <Box sx={{ height: 7, bgcolor: "#edf1f6", borderRadius: 4, overflow: "hidden" }}>
        <Box
          sx={{
            width: `${pct}%`,
            height: "100%",
            bgcolor: "#5267e8",
            borderRadius: 4,
            transition: "width .5s ease",
          }}
        />
      </Box>

      <Typography sx={{ fontFamily: FONT, fontSize: 12.5, fontWeight: 700, color: HEAD, textAlign: "right" }}>
        {total}
      </Typography>
    </Box>
  );
}

/** KPI card — header with title + action link, then big centered value */
function KpiCard({ label, value, note, color, action, nav, onNavigate }) {
  return (
    <Paper
      elevation={0}
      sx={{
        border: `1px solid ${LINE}`,
        borderRadius: "12px",
        boxShadow: CARD_SHADOW,
        bgcolor: "#fff",
        overflow: "hidden",
        width: "100%",
      }}
    >
      {/* header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          py: 1.5,
          borderBottom: `1px solid ${LINE2}`,
        }}
      >
        <Typography sx={{ fontFamily: FONT, fontWeight: 700, fontSize: 14, color: HEAD }}>
          {label}
        </Typography>
        <ViewLink label={action} onClick={() => onNavigate(nav)} />
      </Box>

      {/* centered value */}
      <Box sx={{ textAlign: "center", py: { xs: 2.5, sm: 3 }, px: 2 }}>
        <Typography
          sx={{
            fontFamily: FONT,
            fontSize: { xs: 34, sm: 40 },
            fontWeight: 800,
            color,
            lineHeight: 1,
            letterSpacing: "-1px",
          }}
        >
          {value}
        </Typography>
        <Typography sx={{ fontFamily: FONT, color: MUTED, fontSize: 12.5, mt: 0.75 }}>
          {note}
        </Typography>
      </Box>
    </Paper>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function Dashboard({ onNavigate }) {
  return (
    <Box sx={{ width: "100%", boxSizing: "border-box" }}>

      {/* ── BREADCRUMB ─────────────────────────────────────────────────────── */}
      <Typography sx={{ fontFamily: FONT, fontSize: 12.5, color: MUTED, mb: 0.4 }}>
        ProdTrack · Administrator
      </Typography>

      {/* ── TITLE ROW ──────────────────────────────────────────────────────── */}
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
          sx={{ fontFamily: FONT, fontWeight: 800, fontSize: 22, letterSpacing: "-0.4px", color: HEAD }}
        >
          Admin dashboard
        </Typography>

        {/* buttons — top-right, exactly like reference */}
        <Box sx={{ display: "flex", gap: 1, flexShrink: 0 }}>
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
              "&:hover": { borderColor: "#2f6df0", bgcolor: "#f5f8ff", boxShadow: "none" },
            }}
          >
            Export
          </Button>

          <Button
            variant="contained"
            startIcon={<BarChartRoundedIcon sx={{ fontSize: 17 }} />}
            onClick={() => onNavigate("analytics-kpis")}
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
            Open analytics
          </Button>
        </Box>
      </Box>

      {/* description */}
      <Typography sx={{ fontFamily: FONT, fontSize: 13.5, color: MUTED, mb: 2.5 }}>
        Organisation-wide production, backlogs and compliance across all projects.
      </Typography>

      {/* ── 4 STAT CARDS ───────────────────────────────────────────────────── */}
      <Grid container spacing={2} sx={{ mb: 2.5 }}>
        {STAT_CARDS.map((card) => (
          <Grid key={card.label} size={{ xs: 12, sm: 6, md: 3 }} sx={{ display: "flex" }}>
            <StatCard {...card} />
          </Grid>
        ))}
      </Grid>

      {/* ── TREND CHART  +  BACKLOG ─────────────────────────────────────────── */}
      <Grid container spacing={2} sx={{ mb: 2.5 }}>

        {/* trend */}
        <Grid size={{ xs: 12, md: 7.2 }} sx={{ display: "flex" }}>
          <PanelCard
            title="Monthly production trend"
            action={<ViewLink label="Analytics" onClick={() => onNavigate("analytics-kpis")} />}
          >
            <TrendChart />
          </PanelCard>
        </Grid>

        {/* backlog */}
        <Grid size={{ xs: 12, md: 4.8 }} sx={{ display: "flex" }}>
          <PanelCard title="Backlog by project">
            <Box sx={{ pt: 0.5, pb: 0.5 }}>
              {BACKLOG.map((row) => (
                <BacklogRow key={row.name} {...row} />
              ))}
            </Box>
          </PanelCard>
        </Grid>
      </Grid>

      {/* ── 3 KPI CARDS ────────────────────────────────────────────────────── */}
      <Grid container spacing={2}>
        {KPI_CARDS.map((kpi) => (
          <Grid key={kpi.label} size={{ xs: 12, sm: 4 }} sx={{ display: "flex" }}>
            <KpiCard {...kpi} onNavigate={onNavigate} />
          </Grid>
        ))}
      </Grid>

    </Box>
  );
}