import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CampaignRoundedIcon from "@mui/icons-material/CampaignRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import MoveToInboxRoundedIcon from "@mui/icons-material/MoveToInboxRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import BuildRoundedIcon from "@mui/icons-material/BuildRounded";
import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";

// One font used everywhere in this file
const FONT =
  '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

/* =========================================================
   SECTION 1: DASHBOARD DATA
   (all the sample content lives here — edit this to change
   what shows up on the dashboard)
========================================================= */

const stats = [
  {
    label: "Total Received",
    value: "1,250",
    icon: <MoveToInboxRoundedIcon />,
    iconBg: "#e5efff",
    iconColor: "#2563eb",
  },
  {
    label: "Total Completed",
    value: "980",
    icon: <CheckCircleRoundedIcon />,
    iconBg: "#e2f6ec",
    iconColor: "#22a06b",
    trend: "▲ 6.4% vs last week",
    trendColor: "#15966a",
  },
  {
    label: "Total Pending",
    value: "270",
    icon: <AccessTimeRoundedIcon />,
    iconBg: "#fff3dc",
    iconColor: "#d97706",
    trend: "▲ 12 today",
    trendColor: "#ef4444",
  },
  {
    label: "Today's Productivity",
    value: "45",
    icon: <BoltRoundedIcon />,
    iconBg: "#f0e9ff",
    iconColor: "#7c3aed",
    trend: "▲ on target",
    trendColor: "#15966a",
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
    icon: <BuildRoundedIcon sx={{ fontSize: 15, color: "text.secondary" }} />,
    title: "System maintenance",
    description: "System down 25 May, 10:00 PM–12:00 AM.",
    date: "20 May",
  },
  {
    icon: (
      <FiberManualRecordRoundedIcon sx={{ fontSize: 12, color: "success.main" }} />
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

const myProjects = ["ABC Medical Imaging", "Ortho Kids", "Spine Indexing"];

const keyHighlights = [
  "Updates shown for assigned projects only",
  "Unread updates highlighted on login",
  "Quick access to the latest guide",
  "Acknowledgement status always visible",
];

/* =========================================================
   SECTION 2: SMALL REUSABLE PIECES
========================================================= */

// Simple card shell used by list-style panels (Project updates,
// Announcements, Pending acknowledgements)
function PanelCard({ title, subtitle, onViewAll, children }) {
  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid #dfe4ec",
        borderRadius: "12px",
        boxShadow: "0 1px 2px rgba(16,30,54,.06), 0 4px 16px rgba(16,30,54,.05)",
        backgroundColor: "#fff",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          px: 2,
          py: 1.75,
          borderBottom: "1px solid #e8ecf3",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography sx={{ fontFamily: FONT, fontSize: 14, fontWeight: 700, color: "#1a2434" }}>
            {title}
          </Typography>
          {subtitle && (
            <Typography sx={{ fontFamily: FONT, fontSize: 12, color: "#6a7585" }}>
              {subtitle}
            </Typography>
          )}
        </Box>

        {onViewAll && (
          <Link
            component="button"
            type="button"
            onClick={onViewAll}
            underline="none"
            sx={{ fontFamily: FONT, fontSize: 12.5, fontWeight: 600, color: "#2f6df0" }}
          >
            View all
          </Link>
        )}
      </Box>

      <Box>{children}</Box>
    </Card>
  );
}

// One row inside a PanelCard list
function PanelRow({ left, right, isLast }) {
  return (
    <Box
      sx={{
        px: 2,
        py: 1.625,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 1.5,
        borderBottom: isLast ? "none" : "1px solid #e8ecf3",
      }}
    >
      <Box sx={{ flex: 1, minWidth: 0 }}>{left}</Box>
      {right}
    </Box>
  );
}

// Small rounded label (NEW / UPDATED / PENDING etc.)
function Badge({ label, bg, color }) {
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
        backgroundColor: bg,
        color: color,
      }}
    >
      {label}
    </Box>
  );
}

const updateBadgeColors = {
  NEW: { bg: "#d64545", color: "#fff" },
  UPDATED: { bg: "#d9962b", color: "#fff" },
};

/* =========================================================
   SECTION 3: ACKNOWLEDGEMENT BANNER
========================================================= */

function AcknowledgementBanner({ title, message, onReview }) {
  return (
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
        flexWrap: "wrap",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, flexWrap: "wrap" }}>
        <CampaignRoundedIcon sx={{ color: "#d64545", fontSize: 18 }} />

        <Typography sx={{ fontFamily: FONT, color: "#dce6f7", fontWeight: 700, fontSize: 13 }}>
          {title}
        </Typography>

        <Typography sx={{ fontFamily: FONT, color: "#93a4c2", fontSize: 13 }}>
          {message}
        </Typography>
      </Box>

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
          "&:hover": { color: "#a8c8ff" },
        }}
      >
        Review now →
        <ArrowForwardRoundedIcon sx={{ fontSize: 15 }} />
      </Link>
    </Box>
  );
}

/* =========================================================
   SECTION 4: STAT CARDS
========================================================= */

function StatCard({ icon, iconBg, iconColor, label, value, trend, trendColor }) {
  return (
    <Card
      elevation={0}
      sx={{
        width: "100%",
        height: 118,
        px: 2,
        py: 2,
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        gap: 1.625,
        backgroundColor: "#fff",
        border: "1px solid #dfe4ec",
        boxShadow: "0 1px 2px rgba(16,30,54,.06), 0 4px 16px rgba(16,30,54,.05)",
      }}
    >
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
          "& svg": { fontSize: 20 },
        }}
      >
        {icon}
      </Box>

      <Box sx={{ minWidth: 0 }}>
        <Typography sx={{ fontFamily: FONT, color: "#6a7585", fontSize: 12.5, fontWeight: 600, mb: 0.25 }}>
          {label}
        </Typography>

        <Typography sx={{ fontFamily: FONT, color: "#1a2434", fontSize: 26, fontWeight: 800, letterSpacing: "-0.6px" }}>
          {value}
        </Typography>

        {trend && (
          <Typography sx={{ fontFamily: FONT, color: trendColor, fontSize: 11.5, fontWeight: 600, mt: "3px" }}>
            {trend}
          </Typography>
        )}
      </Box>
    </Card>
  );
}

function StatCards({ stats = [] }) {
  return (
    <Grid container spacing={2} sx={{ mb: 2, width: "100%" }}>
      {stats.map((stat) => (
        <Grid key={stat.label} size={{ xs: 12, sm: 6, md: 3 }} sx={{ display: "flex" }}>
          <StatCard {...stat} />
        </Grid>
      ))}
    </Grid>
  );
}

/* =========================================================
   SECTION 5: PROJECT UPDATES
========================================================= */

function ProjectUpdates({ updates = [], unreadCount = 0, onViewAll }) {
  return (
    <PanelCard title="Project updates" subtitle={`(Unread: ${unreadCount})`} onViewAll={onViewAll}>
      {updates.map((update, i) => (
        <PanelRow
          key={update.title}
          isLast={i === updates.length - 1}
          left={
            <>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: "3px" }}>
                <Badge
                  label={update.badge}
                  bg={updateBadgeColors[update.badge]?.bg}
                  color={updateBadgeColors[update.badge]?.color}
                />
                <Typography sx={{ fontFamily: FONT, fontWeight: 700, fontSize: 13.5, color: "#1a2434" }}>
                  {update.title}
                </Typography>
              </Box>
              <Typography sx={{ fontFamily: FONT, color: "#6a7585", fontSize: 12.5 }}>
                {update.description}
              </Typography>
            </>
          }
          right={
            <Typography sx={{ fontFamily: FONT, color: "#6a7585", fontSize: 12, textAlign: "right", whiteSpace: "nowrap" }}>
              Effective
              <br />
              {update.effectiveDate}
            </Typography>
          }
        />
      ))}
    </PanelCard>
  );
}

/* =========================================================
   SECTION 6: ANNOUNCEMENTS
========================================================= */

function Announcements({ announcements = [], onViewAll }) {
  return (
    <PanelCard title="Announcements" onViewAll={onViewAll}>
      {announcements.map((item, i) => (
        <PanelRow
          key={item.title}
          isLast={i === announcements.length - 1}
          left={
            <>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: "3px" }}>
                {item.icon}
                <Typography sx={{ fontFamily: FONT, fontWeight: 700, fontSize: 13.5, color: "#1a2434" }}>
                  {item.title}
                </Typography>
              </Box>
              <Typography sx={{ fontFamily: FONT, color: "#6a7585", fontSize: 12.5 }}>
                {item.description}
              </Typography>
            </>
          }
          right={
            <Typography sx={{ fontFamily: FONT, color: "#6a7585", fontSize: 12, whiteSpace: "nowrap" }}>
              {item.date}
            </Typography>
          }
        />
      ))}
    </PanelCard>
  );
}

/* =========================================================
   SECTION 7: INDEXING GUIDE (latest guide card)
========================================================= */

function IndexingGuide({ guide, onViewGuide }) {
  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid #dfe4ec",
        borderRadius: "12px",
        boxShadow: "0 1px 2px rgba(16,30,54,.06), 0 4px 16px rgba(16,30,54,.05)",
        backgroundColor: "#fff",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <Box sx={{ px: 2, py: 1.75, borderBottom: "1px solid #e8ecf3" }}>
        <Typography sx={{ fontFamily: FONT, fontSize: 14, fontWeight: 700, color: "#1a2434" }}>
          Indexing guide (latest)
        </Typography>
      </Box>

      <Box
        sx={{
          px: 2,
          py: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "10px",
              backgroundColor: "#e5efff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#2f6df0",
            }}
          >
            <DescriptionOutlinedIcon sx={{ fontSize: 20 }} />
          </Box>

          <Box>
            <Typography sx={{ fontFamily: FONT, fontWeight: 700, fontSize: 13.5, color: "#1a2434" }}>
              {guide.name}
            </Typography>
            <Typography sx={{ fontFamily: FONT, color: "#6a7585", fontSize: 12.5 }}>
              Version {guide.version} · Updated {guide.updatedDate}
            </Typography>
          </Box>
        </Box>

        <Button
          variant="contained"
          onClick={onViewGuide}
          sx={{
            fontFamily: FONT,
            textTransform: "none",
            fontSize: 13,
            fontWeight: 600,
            borderRadius: "8px",
            boxShadow: "none",
            backgroundColor: "#2f6df0",
            "&:hover": { backgroundColor: "#1f57c9", boxShadow: "none" },
          }}
        >
          View / Download
        </Button>
      </Box>
    </Card>
  );
}

/* =========================================================
   SECTION 8: PENDING ACKNOWLEDGEMENTS
========================================================= */

function PendingAcknowledgements({ items = [], onViewAll }) {
  return (
    <PanelCard title="Pending acknowledgements" onViewAll={onViewAll}>
      {items.map((item, i) => (
        <PanelRow
          key={item.name}
          isLast={i === items.length - 1}
          left={
            <>
              <Typography sx={{ fontFamily: FONT, fontWeight: 700, fontSize: 13.5, color: "#1a2434", mb: "3px" }}>
                {item.name}
              </Typography>
              {item.updatedDate && (
                <Typography sx={{ fontFamily: FONT, color: "#6a7585", fontSize: 12.5 }}>
                  Updated {item.updatedDate}
                </Typography>
              )}
            </>
          }
          right={<Badge label={item.status} bg="#fbf1dc" color="#a9741a" />}
        />
      ))}
    </PanelCard>
  );
}

/* =========================================================
   SECTION 9: MY PROJECTS
========================================================= */

const chipColors = [
  { backgroundColor: "#e4f6ee", color: "#177a53" },
  { backgroundColor: "#fbf1dc", color: "#a9741a" },
  { backgroundColor: "#efe9fb", color: "#603bb3" },
];

function MyProjects({ projects = [] }) {
  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid #dfe4ec",
        borderRadius: "12px",
        boxShadow: "0 1px 2px rgba(16,30,54,.06), 0 4px 16px rgba(16,30,54,.05)",
        backgroundColor: "#fff",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <Box sx={{ px: 2, py: 1.75, borderBottom: "1px solid #e8ecf3" }}>
        <Typography sx={{ fontFamily: FONT, fontSize: 14, fontWeight: 700, color: "#1a2434" }}>
          My projects
        </Typography>
      </Box>

      <Box sx={{ px: 2, py: 2, display: "flex", gap: "6px", flexWrap: "wrap" }}>
        {projects.map((name, i) => (
          <Box
            key={name}
            sx={{
              fontFamily: FONT,
              fontSize: 11.5,
              fontWeight: 800,
              px: "11px",
              py: "5px",
              borderRadius: "20px",
              ...chipColors[i % chipColors.length],
            }}
          >
            {name}
          </Box>
        ))}
      </Box>
    </Card>
  );
}

/* =========================================================
   SECTION 10: KEY HIGHLIGHTS
========================================================= */

function KeyHighlights({ highlights = [] }) {
  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid #dfe4ec",
        borderRadius: "12px",
        boxShadow: "0 1px 2px rgba(16,30,54,.06), 0 4px 16px rgba(16,30,54,.05)",
        backgroundColor: "#fff",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <Box sx={{ px: 2, py: 1.75, borderBottom: "1px solid #e8ecf3" }}>
        <Typography sx={{ fontFamily: FONT, fontWeight: 700, fontSize: 14, color: "#1a2434" }}>
          Key highlights
        </Typography>
      </Box>

      <Box component="ul" sx={{ fontFamily: FONT, m: 0, px: "34px", py: 2, color: "#4a5568" }}>
        {highlights.map((item) => (
          <Box component="li" key={item} sx={{ fontSize: 13, lineHeight: 1.5, mb: "6px", "&:last-child": { mb: 0 } }}>
            {item}
          </Box>
        ))}
      </Box>
    </Card>
  );
}

/* =========================================================
   SECTION 11: MAIN DASHBOARD (default export)
========================================================= */

export default function Dashboard({ onNavigate = () => {} }) {
  const [guideAcknowledged, setGuideAcknowledged] = useState(false);

  return (
    <Box sx={{ width: "100%", maxWidth: "100%", boxSizing: "border-box" }}>
      {/* Breadcrumb */}
      <Typography sx={{ fontFamily: FONT, fontSize: 12.5, color: "#6A7585", mb: 0.5 }}>
        ProdTrack · Indexer
      </Typography>

      {/* Title row */}
      <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 2, mb: 0.5, flexWrap: "wrap" }}>
        <Typography sx={{ fontFamily: FONT, fontWeight: 800, fontSize: 22, color: "#1A2434" }}>
          Dashboard
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddRoundedIcon />}
          onClick={() => onNavigate("daily-entry")}
          sx={{
            fontFamily: FONT,
            px: 2,
            py: 1.25,
            borderRadius: 2,
            whiteSpace: "nowrap",
            fontSize: "13px",
            backgroundColor: "#2F6DF0",
            color: "#FFFFFF",
          }}
        >
          New daily entry
        </Button>
      </Box>

      {/* Description */}
      <Typography sx={{ fontFamily: FONT, fontSize: "13.5px", color: "#6A7585", mb: 2.5 }}>
        Your assigned projects, latest guide and pending acknowledgements.
      </Typography>

      {/* Acknowledgement banner */}
      {!guideAcknowledged && (
        <AcknowledgementBanner
          title="ABC Medical Imaging Indexing Guide v2.3"
          message="needs your acknowledgement before you can submit entries."
          onReview={() => onNavigate("indexing-guide")}
        />
      )}

      {/* Stat cards */}
      <StatCards stats={stats} />

      {/* Project updates + Announcements */}
      <Grid container spacing={2.5} sx={{ mb: 2.5, width: "100%" }}>
        <Grid size={{ xs: 12, md: 7 }} sx={{ display: "flex" }}>
          <ProjectUpdates updates={projectUpdates} unreadCount={2} />
        </Grid>
        <Grid size={{ xs: 12, md: 5 }} sx={{ display: "flex" }}>
          <Announcements announcements={announcements} />
        </Grid>
      </Grid>

      {/* Indexing guide + Pending acknowledgements */}
      <Grid container spacing={2.5} sx={{ mb: 2.5, width: "100%" }}>
        <Grid size={{ xs: 12, md: 7 }} sx={{ display: "flex" }}>
          <IndexingGuide guide={latestGuide} onViewGuide={() => onNavigate("indexing-guide")} />
        </Grid>
        <Grid size={{ xs: 12, md: 5 }} sx={{ display: "flex" }}>
          <PendingAcknowledgements items={pendingAcknowledgements} />
        </Grid>
      </Grid>

      {/* My projects + Key highlights */}
      <Grid container spacing={2.5} sx={{ width: "100%" }}>
        <Grid size={{ xs: 12, md: 7 }} sx={{ display: "flex" }}>
          <MyProjects projects={myProjects} />
        </Grid>
        <Grid size={{ xs: 12, md: 5 }} sx={{ display: "flex" }}>
          <KeyHighlights highlights={keyHighlights} />
        </Grid>
      </Grid>
    </Box>
  );
}