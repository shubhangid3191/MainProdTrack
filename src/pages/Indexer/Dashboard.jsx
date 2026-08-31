import { useEffect, useState } from "react";
import apiRequest from "../../Config/api.js";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Link from "@mui/material/Link";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import MoveToInboxRoundedIcon from "@mui/icons-material/MoveToInboxRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import BuildRoundedIcon from "@mui/icons-material/BuildRounded";
import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";
import CampaignRoundedIcon from "@mui/icons-material/CampaignRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

import IndexingGuide from "../IndexingGuide.jsx";

// Font family — "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif
const FONT =
  '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

// =========================================================
// DASHBOARD DATA
// =========================================================

const stats = [
  {
    label: "Total Received",
    value: "1,250",
    icon: <MoveToInboxRoundedIcon />,
    iconBg: "#e5eefe",
    iconColor: "#2f6df0",
  },

  {
    label: "Total Completed",
    value: "980",
    icon: <CheckCircleRoundedIcon />,
    iconBg: "#e4f6ee",
    iconColor: "#1f9d6b",
    trend: "▲ 6.4% vs last week",
    trendColor: "#1f9d6b",
  },

  {
    label: "Total Pending",
    value: "270",
    icon: <AccessTimeRoundedIcon />,
    iconBg: "#fbf1dc",
    iconColor: "#d9962b",
    trend: "▲ 12 today",
    trendColor: "#d64545",
  },

  {
    label: "Today's Productivity",
    value: "45",
    icon: <BoltRoundedIcon />,
    iconBg: "#efe9fb",
    iconColor: "#7a51d6",
    trend: "▲ on target",
    trendColor: "#1f9d6b",
  },
];

const projectUpdates = [
  {
    badge: "NEW",
    title: "ABC Medical Imaging — Process update",
    description:
      "Updated 16 May 2025 · Changes in implant indexing process. Please review the updated guide.",
    effectiveDate: "17 May 2025",
  },

  {
    badge: "UPDATED",
    title: "Ortho Kids — Field mapping update",
    description:
      "Updated 14 May 2025 · Field mapping changes on pages 3 & 4. Refer to the updated guide.",
    effectiveDate: "15 May 2025",
  },
];

const announcements = [
  {
    icon: (
      <BuildRoundedIcon
        sx={{
          fontSize: 15,
          color: "#6a7585",
        }}
      />
    ),

    title: "System maintenance",
    description: "System down 25 May, 10:00 PM–12:00 AM.",
    date: "20 May",
  },

  {
    icon: (
      <FiberManualRecordRoundedIcon
        sx={{
          fontSize: 12,
          color: "#1f9d6b",
        }}
      />
    ),

    title: "Monthly meeting",
    description: "Team meeting 22 May at 4:00 PM.",
    date: "18 May",
  },
];

const latestGuide = {
  name: "ABC Medical Imaging Indexing Guide v2.3",
  version: "2.3",
  updatedDate: "16 May 2025",
};

const pendingAcknowledgements = [
  {
    name: "ABC Medical Imaging Guide v2.3",
    updatedDate: "16 May 2025",
    status: "PENDING",
  },

  {
    name: "Ortho Kids Guide v1.7",
    status: "PENDING",
  },
];

// =========================================================
// INDEXER DASHBOARD
// =========================================================

export default function IndexerDashboard({ onNavigate }) {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await apiRequest("/dashboard/indexer");
        setDashboard(data.dashboard);
      } catch (error) {
        console.error("Dashboard loading error:", error);
      }
    };

    loadDashboard();
  }, []);

  const dashboardValues = dashboard
    ? [
        dashboard.totalReceived,
        dashboard.totalCompleted,
        dashboard.totalPending,
        dashboard.todayProductivity,
      ]
    : stats.map((item) => item.value);

  const liveStats = stats.map((item, index) => ({
    ...item,
    value:
      typeof dashboardValues[index] === "number"
        ? dashboardValues[index].toLocaleString()
        : dashboardValues[index],
  }));
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* BREADCRUMB — .page-head .crumb { font-size:12.5px; color:var(--muted):#6a7585 } */}

      <Typography
        sx={{
          fontFamily: FONT,
          fontSize: 12.5,
          color: "#6a7585",
          mb: 0.5,
        }}
      >
        ProdTrack · Indexer
      </Typography>

      {/* TITLE ROW */}

      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 2,
          mb: 0.5,
        }}
      >
        {/* .page-head h1 { font-size:22px; font-weight:800; letter-spacing:-.4px } */}
        <Typography
          sx={{
            fontFamily: FONT,
            fontWeight: 800,
            fontSize: 22,
            letterSpacing: "-0.4px",
            color: "#1a2434",
          }}
        >
          Dashboard
        </Typography>

        {/* .btn.blue { font-size:13px; font-weight:600 (btn base); border-radius:8px } */}
        <Button
          variant="contained"
          startIcon={<AddRoundedIcon />}
          onClick={() => onNavigate("daily-entry")}
          sx={{
            fontFamily: FONT,
            fontSize: 13,
            fontWeight: 600,
            px: 1.75,
            py: 1.125,
            borderRadius: "8px",
            textTransform: "none",
            whiteSpace: "nowrap",
            backgroundColor: "#2f6df0",
            color: "#fff",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#1f57c9",
              boxShadow: "none",
            },
          }}
        >
          New daily entry
        </Button>
      </Box>

      {/* DESCRIPTION — .page-head .desc { font-size:13.5px; color:var(--muted):#6a7585 } */}

      <Typography
        sx={{
          fontFamily: FONT,
          fontSize: 13.5,
          color: "#6a7585",
          mb: 2.5,
        }}
      >
        Your assigned projects, latest guide and pending acknowledgements.
      </Typography>

      {/* ACKNOWLEDGEMENT */}

      <AcknowledgementBanner
        title="ABC Medical Imaging Indexing Guide v2.3"
        message="needs your acknowledgement before you can submit entries."
        onReview={() => onNavigate("indexing-guide")}
      />

      {/* STAT CARDS */}

      <StatCards stats={liveStats} />

      {/* =====================================================
          PROJECT UPDATES + ANNOUNCEMENTS
      ===================================================== */}

      <Grid
        container
        spacing={2}
        sx={{
          mb: 2,
          width: "100%",
        }}
      >
        <Grid
          size={{
            xs: 12,
            md: 7,
          }}
          sx={{
            display: "flex",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <ProjectUpdates
              updates={projectUpdates}
              unreadCount={2}
            />
          </Box>
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 5,
          }}
          sx={{
            display: "flex",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Announcements announcements={announcements} />
          </Box>
        </Grid>
      </Grid>

      {/* =====================================================
          INDEXING GUIDE + ACKNOWLEDGEMENTS
      ===================================================== */}

      <Grid
        container
        spacing={2}
        sx={{
          mb: 2,
          width: "100%",
        }}
      >
        <Grid
          size={{
            xs: 12,
            md: 7,
          }}
          sx={{
            display: "flex",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <IndexingGuide
              variant="card"
              guide={latestGuide}
              onViewGuide={() => onNavigate("indexing-guide")}
            />
          </Box>
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 5,
          }}
          sx={{
            display: "flex",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <PendingAcknowledgements
              items={pendingAcknowledgements}
            />
          </Box>
        </Grid>
      </Grid>

      {/* =====================================================
          MY PROJECTS + KEY HIGHLIGHTS
      ===================================================== */}

      <Grid
        container
        spacing={2}
        sx={{
          width: "100%",
        }}
      >
        <Grid
          size={{
            xs: 12,
            md: 7,
          }}
          sx={{
            display: "flex",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <MyProjects />
          </Box>
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 5,
          }}
          sx={{
            display: "flex",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <KeyHighlights />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
// PanelCard (dashboard-local UI)
// Font family — matches body { font-family: "Inter", ... } in reference

function PanelCard({
  title,
  subtitle,
  children,
  onViewAll,
}) {
  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid #dfe4ec",         // --line
        borderRadius: "12px",                 // --radius
        // .kpi / .card box-shadow: var(--shadow)
        boxShadow:
          "0 1px 2px rgba(16,30,54,.06), 0 4px 16px rgba(16,30,54,.05)",
        backgroundColor: "#ffffff",           // --card
        height: "100%",
        overflow: "hidden",
      }}
    >
      {/* HEADER — .card .ch { padding:14px 16px; border-bottom:1px solid var(--line-2) } */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          py: 1.75,                           // 14px top/bottom
          borderBottom: "1px solid #e8ecf3",  // --line-2
        }}
      >
        {/* .card .ch h3 { font-size:14px; font-weight:700 } */}
        <Typography
          sx={{
            fontFamily: FONT,
            fontWeight: 700,
            fontSize: 14,
            color: "#1a2434",
          }}
        >
          {title}{" "}
          {subtitle && (
            <Typography
              component="span"
              sx={{
                fontFamily: FONT,
                color: "#6a7585",       // --muted
                fontWeight: 600,
                fontSize: 12,           // matches .muted secondary
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Typography>

        {/* .card .ch .link { font-size:12.5px; color:var(--brand):#2f6df0; font-weight:600 } */}
        {onViewAll && (
          <Link
            component="button"
            type="button"
            onClick={onViewAll}
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
              "&:hover": {
                color: "#1f57c9",
              },
            }}
          >
            View all
          </Link>
        )}
      </Box>

      {/* BODY */}

      {children}
    </Card>
  );
}


// AcknowledgementBanner (dashboard-local UI)
// Font family — matches body { font-family: "Inter", ... } in reference

function AcknowledgementBanner({
  title,
  message,
  onReview,
}) {
  return (
    // .notice-strip { background: linear-gradient(90deg,#132338,#1b3050);
    //   color:#dce6f7; border-radius:10px; padding:12px 16px;
    //   font-size:13px; display:flex; gap:10px; align-items:center }
    <Box
      sx={{
        background: "linear-gradient(90deg, #132338, #1b3050)",
        borderRadius: "10px",
        px: 2,
        py: 1.5,
        mb: 2.5,

        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",

        gap: 1.25,
      }}
    >
      {/* LEFT SIDE */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.25,
          flexWrap: "wrap",
        }}
      >
        <CampaignRoundedIcon
          sx={{
            color: "#d64545",   // --red
            fontSize: 18,
          }}
        />

        {/* .notice-strip { font-size:13px } — title portion bold */}
        <Typography
          sx={{
            fontFamily: FONT,
            color: "#dce6f7",
            fontWeight: 700,
            fontSize: 13,
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            fontFamily: FONT,
            color: "#93a4c2",
            fontSize: 13,
          }}
        >
          {message}
        </Typography>
      </Box>

      {/* REVIEW BUTTON — .notice-strip a { color:#7fb0ff; font-weight:700 } */}

      <Link
        component="button"
        type="button"
        onClick={onReview}
        underline="none"
        sx={{
          fontFamily: FONT,
          color: "#7fb0ff",
          fontWeight: 700,
          fontSize: 13,

          display: "flex",
          alignItems: "center",

          gap: 0.5,
          whiteSpace: "nowrap",

          border: 0,
          bgcolor: "transparent",
          cursor: "pointer",
          ml: "auto",

          "&:hover": {
            color: "#a8c8ff",
          },
        }}
      >
        Review now 

        <ArrowForwardRoundedIcon sx={{ fontSize: 15 }} />
      </Link>
    </Box>
  );
}


// StatCards (dashboard-local UI)
// Font family — matches body { font-family: "Inter", ... } in reference

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
        height: 118,
        boxSizing: "border-box",
        px: 2,
        py: 2,
        borderRadius: "12px",               // --radius: 12px

        display: "flex",
        alignItems: "center",
        gap: 1.625,                          // matches .kpi { gap:13px }

        backgroundColor: "#ffffff",          // --card
        border: "1px solid #dfe4ec",         // --line

        // .kpi { box-shadow: var(--shadow) }
        boxShadow:
          "0 1px 2px rgba(16,30,54,.06), 0 4px 16px rgba(16,30,54,.05)",

        "&:hover": {
          boxShadow:
            "0 2px 4px rgba(16,30,54,.08), 0 6px 20px rgba(16,30,54,.08)",
        },
      }}
    >
      {/* ICON — .kpi .kic { width:46px; height:46px; border-radius:11px } */}

      <Box
        sx={{
          width: 46,
          height: 46,
          minWidth: 46,
          borderRadius: "11px",

          backgroundColor: iconBg,

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          color: iconColor,
          flexShrink: 0,

          "& svg": {
            fontSize: 20,   // .kpi .kic { font-size:20px }
          },
        }}
      >
        {icon}
      </Box>

      {/* CONTENT */}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minWidth: 0,
        }}
      >
        {/* .kpi .kt { font-size:12.5px; color:var(--muted):#6a7585; font-weight:600 } */}
        <Typography
          sx={{
            fontFamily: FONT,
            color: "#6a7585",
            fontSize: 12.5,
            fontWeight: 600,
            lineHeight: 1.2,
            mb: 0.25,
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </Typography>

        {/* .kpi .kv { font-size:26px; font-weight:800; letter-spacing:-.6px; line-height:1.05 } */}
        <Typography
          sx={{
            fontFamily: FONT,
            color: "#1a2434",
            fontSize: 26,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.6px",
            whiteSpace: "nowrap",
          }}
        >
          {value}
        </Typography>

        {/* .kpi .kd { font-size:11.5px; font-weight:600; margin-top:3px } */}
        {trend && (
          <Typography
            sx={{
              fontFamily: FONT,
              color: trendColor,
              fontSize: 11.5,
              fontWeight: 600,
              lineHeight: 1.2,
              mt: "3px",
              whiteSpace: "nowrap",
            }}
          >
            {trend}
          </Typography>
        )}
      </Box>
    </Card>
  );
}

function StatCards({ stats = [] }) {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        mb: 2,
        width: "100%",
      }}
    >
      {stats.map((stat) => (
        <Grid
          key={stat.label}
          size={{
            xs: 12,
            sm: 6,
            md: 3,
          }}
          sx={{
            display: "flex",
          }}
        >
          <StatCard {...stat} />
        </Grid>
      ))}
    </Grid>
  );
}


// ProjectUpdates (dashboard-local UI)
// Font family — matches body { font-family: "Inter", ... } in reference

// .pill styles from reference:
// .pill { font-size:10.5px; font-weight:800; padding:3px 8px; border-radius:20px;
//         letter-spacing:.3px; text-transform:uppercase }
// .p-new { background:var(--red):#d64545; color:#fff }
// .p-upd { background:var(--amber):#d9962b; color:#fff }
const badgeStyle = {
  NEW: {
    backgroundColor: "#d64545",
    color: "#fff",
  },
  UPDATED: {
    backgroundColor: "#d9962b",
    color: "#fff",
  },
};

function Badge({ label }) {
  const style = badgeStyle[label] ?? { backgroundColor: "#dfe4ec", color: "#1a2434" };
  return (
    <Box
      sx={{
        fontFamily: FONT,
        fontSize: 10.5,
        fontWeight: 800,
        px: 1,
        py: "3px",
        borderRadius: "20px",
        letterSpacing: "0.3px",
        textTransform: "uppercase",
        display: "inline-block",
        lineHeight: 1.4,
        ...style,
      }}
    >
      {label}
    </Box>
  );
}

function ProjectUpdates({
  updates = [],
  unreadCount = 0,
}) {
  return (
    <PanelCard
      title="Project updates"
      subtitle={`(Unread: ${unreadCount})`}
      onViewAll={() => {}}
    >
      {updates.map((update, i) => (
        // .rowitem { padding:13px 16px; border-bottom:1px solid var(--line-2);
        //            display:flex; gap:12px; align-items:flex-start }
        <Box
          key={update.title}
          sx={{
            px: 2,
            py: 1.625,                            // 13px

            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",

            gap: 1.5,

            borderBottom:
              i < updates.length - 1
                ? "1px solid #e8ecf3"             // --line-2
                : "none",
          }}
        >
          {/* LEFT SIDE */}

          <Box sx={{ flex: 1, minWidth: 0 }}>
            {/* .rowitem .ri-t { font-weight:700; font-size:13.5px;
                                display:flex; align-items:center; gap:8px } */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: "3px",
              }}
            >
              <Badge label={update.badge} />

              <Typography
                sx={{
                  fontFamily: FONT,
                  fontWeight: 700,
                  fontSize: 13.5,
                  color: "#1a2434",
                }}
              >
                {update.title}
              </Typography>
            </Box>

            {/* .rowitem .ri-s { color:var(--muted):#6a7585; font-size:12.5px; margin-top:3px } */}
            <Typography
              sx={{
                fontFamily: FONT,
                color: "#6a7585",
                fontSize: 12.5,
                mt: "3px",
              }}
            >
              {update.description}
            </Typography>
          </Box>

          {/* EFFECTIVE DATE — .rowitem .ri-meta { text-align:right; font-size:12px;
                                                   color:var(--muted); white-space:nowrap } */}
          <Typography
            sx={{
              fontFamily: FONT,
              color: "#6a7585",
              fontSize: 12,
              textAlign: "right",
              whiteSpace: "nowrap",
              pt: "2px",
            }}
          >
            Effective
            <br />
            {update.effectiveDate}
          </Typography>
        </Box>
      ))}
    </PanelCard>
  );
}


// Announcements (dashboard-local UI)
// Font family — matches body { font-family: "Inter", ... } in reference

function Announcements({
  announcements = [],
}) {
  return (
    <PanelCard title="Announcements" onViewAll={() => {}}>
      {announcements.map((item, i) => (
        // .rowitem { padding:13px 16px; border-bottom:1px solid var(--line-2);
        //            display:flex; gap:12px; align-items:flex-start }
        <Box
          key={item.title}
          sx={{
            px: 2,
            py: 1.625,                            // 13px

            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",

            gap: 1.5,

            borderBottom:
              i < announcements.length - 1
                ? "1px solid #e8ecf3"             // --line-2
                : "none",
          }}
        >
          {/* LEFT SIDE */}

          <Box sx={{ flex: 1, minWidth: 0 }}>
            {/* .rowitem .ri-t { font-weight:700; font-size:13.5px;
                                display:flex; align-items:center; gap:8px } */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: "3px",
              }}
            >
              {item.icon}

              <Typography
                sx={{
                  fontFamily: FONT,
                  fontWeight: 700,
                  fontSize: 13.5,
                  color: "#1a2434",
                }}
              >
                {item.title}
              </Typography>
            </Box>

            {/* .rowitem .ri-s { color:var(--muted):#6a7585; font-size:12.5px; margin-top:3px } */}
            <Typography
              sx={{
                fontFamily: FONT,
                color: "#6a7585",
                fontSize: 12.5,
                mt: "3px",
              }}
            >
              {item.description}
            </Typography>
          </Box>

          {/* DATE — .rowitem .ri-meta { text-align:right; font-size:12px;
                                         color:var(--muted); white-space:nowrap } */}
          <Typography
            sx={{
              fontFamily: FONT,
              color: "#6a7585",
              fontSize: 12,
              whiteSpace: "nowrap",
              pt: "2px",
            }}
          >
            {item.date}
          </Typography>
        </Box>
      ))}
    </PanelCard>
  );
}


// PendingAcknowledgements (dashboard-local UI)
// Font family — matches body { font-family: "Inter", ... } in reference

function PendingAcknowledgements({
  items = [],
}) {
  return (
    <PanelCard title="Pending acknowledgements" onViewAll={() => {}}>
      {items.map((item, i) => (
        // .rowitem { padding:13px 16px; border-bottom:1px solid var(--line-2);
        //            display:flex; gap:12px; align-items:flex-start }
        <Box
          key={item.name}
          sx={{
            px: 2,
            py: 1.625,                            // 13px

            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",

            gap: 2,

            borderBottom:
              i < items.length - 1
                ? "1px solid #e8ecf3"             // --line-2
                : "none",
          }}
        >
          {/* LEFT SIDE */}

          <Box sx={{ flex: 1, minWidth: 0 }}>
            {/* .rowitem .ri-t { font-weight:700; font-size:13.5px } */}
            <Typography
              sx={{
                fontFamily: FONT,
                fontWeight: 700,
                fontSize: 13.5,
                color: "#1a2434",
                mb: "3px",
              }}
            >
              {item.name}
            </Typography>

            {/* .rowitem .ri-s { color:var(--muted):#6a7585; font-size:12.5px; margin-top:3px } */}
            {item.updatedDate && (
              <Typography
                sx={{
                  fontFamily: FONT,
                  color: "#6a7585",
                  fontSize: 12.5,
                }}
              >
                Updated {item.updatedDate}
              </Typography>
            )}
          </Box>

          {/* STATUS — .pill.p-pend { background:var(--amber-bg):#fbf1dc;
              color:#a9741a; border:1px solid #ecd6a3;
              font-size:10.5px; font-weight:800; border-radius:20px } */}
          <Box
            sx={{
              fontFamily: FONT,
              fontSize: 10.5,
              fontWeight: 800,
              px: 1,
              py: "3px",
              borderRadius: "20px",
              letterSpacing: "0.3px",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              backgroundColor: "#fbf1dc",
              color: "#a9741a",
              border: "1px solid #ecd6a3",
              lineHeight: 1.4,
              alignSelf: "flex-start",
            }}
          >
            {item.status}
          </Box>
        </Box>
      ))}
    </PanelCard>
  );
}


// MyProjects (dashboard-local UI)
// Font family — matches body { font-family: "Inter", ... } in reference

// .chip styles from reference:
// .chip { font-size:11.5px; font-weight:600; padding:5px 11px; border-radius:20px }
// .chip.b { background:var(--green-bg):#e4f6ee; color:#177a53 }
// .chip.o { background:var(--amber-bg):#fbf1dc; color:#a9741a }
// .chip.p { background:var(--violet-bg):#efe9fb; color:#603bb3 }
const CHIP_COLORS = [
  { backgroundColor: "#e4f6ee", color: "#177a53" },  // .chip.b (green)
  { backgroundColor: "#fbf1dc", color: "#a9741a" },  // .chip.o (amber)
  { backgroundColor: "#efe9fb", color: "#603bb3" },  // .chip.p (violet)
];

const projects = ["ABC Medical Imaging", "Ortho Kids", "Spine Indexing"];

function MyProjects() {
  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid #dfe4ec",         // --line
        borderRadius: "12px",                 // --radius
        boxShadow:
          "0 1px 2px rgba(16,30,54,.06), 0 4px 16px rgba(16,30,54,.05)",
        backgroundColor: "#ffffff",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {/* HEADER — .card .ch { padding:14px 16px; border-bottom:1px solid var(--line-2) } */}

      <Box
        sx={{
          px: 2,
          py: 1.75,
          borderBottom: "1px solid #e8ecf3",  // --line-2
        }}
      >
        {/* .card .ch h3 { font-size:14px; font-weight:700 } */}
        <Typography
          sx={{
            fontFamily: FONT,
            fontSize: 14,
            fontWeight: 700,
            color: "#1a2434",
          }}
        >
          My projects
        </Typography>
      </Box>

      {/* BODY — .card .cb { padding:16px } */}

      <Box
        sx={{
          px: 2,
          py: 2,
          display: "flex",
          gap: "6px 6px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {projects.map((name, i) => (
          // .chip { font-size:11.5px; font-weight:600; padding:5px 11px; border-radius:20px }
          <Box
            key={name}
            sx={{
              fontFamily: FONT,
              fontSize: 11.5,
              fontWeight: 600,
              px: "11px",
              py: "5px",
              borderRadius: "20px",
              ...CHIP_COLORS[i % CHIP_COLORS.length],
            }}
          >
            {name}
          </Box>
        ))}
      </Box>
    </Card>
  );
}


// KeyHighlights (dashboard-local UI)
// Font family — matches body { font-family: "Inter", ... } in reference

const highlights = [
  "Updates shown for assigned projects only",
  "Unread updates highlighted on login",
  "Quick access to the latest guide",
  "Acknowledgement status always visible",
];

function KeyHighlights() {
  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",          // --card
        border: "1px solid #dfe4ec",         // --line
        borderRadius: "12px",                // --radius
        overflow: "hidden",
        height: "100%",
        boxShadow:
          "0 1px 2px rgba(16,30,54,.06), 0 4px 16px rgba(16,30,54,.05)",
      }}
    >
      {/* HEADER — .card .ch { padding:14px 16px; border-bottom:1px solid var(--line-2) } */}

      <Box
        sx={{
          px: 2,
          py: 1.75,
          borderBottom: "1px solid #e8ecf3",  // --line-2
        }}
      >
        {/* .card .ch h3 { font-size:14px; font-weight:700 } */}
        <Typography
          sx={{
            fontFamily: FONT,
            fontWeight: 700,
            fontSize: 14,
            color: "#1a2434",
          }}
        >
          Key highlights
        </Typography>
      </Box>

      {/* BODY — .card .cb { padding:16px }
          .hlbox ul { color:#4a5568; padding-left:18px; margin:0; font-size:13px } */}

      <Box
        component="ul"
        sx={{
          fontFamily: FONT,
          m: 0,
          px: "34px",                         // 18px left-padding matches reference pl:18px
          py: 2,
          color: "#4a5568",
        }}
      >
        {highlights.map((highlight) => (
          <Box
            component="li"
            key={highlight}
            sx={{
              fontFamily: FONT,
              fontSize: 13,
              lineHeight: 1.5,
              mb: "6px",                      // .hlbox li { margin-bottom:6px }
              "&:last-child": { mb: 0 },
            }}
          >
            {highlight}
          </Box>
        ))}
      </Box>
    </Box>
  );
}


