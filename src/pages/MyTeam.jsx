import { Box, Button, Card, Paper, Typography, Avatar } from "@mui/material";

// ─── Design tokens — databin.in/kavya ────────────────────────────────────────
const FONT =
  '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
const CARD_SHADOW = "0 1px 3px rgba(16,30,54,.07), 0 4px 16px rgba(16,30,54,.06)";
const LINE  = "#dfe4ec";
const LINE2 = "#e8ecf3";
const MUTED = "#6a7585";
const HEAD  = "#1a2434";

// ─── Data ─────────────────────────────────────────────────────────────────────

const TEAM = [
  { initials: "PS", name: "Priya Sharma", empId: "EMP-1042", avatarColor: "#4f73e3", projects: "ABC Medical, Ortho Kids", today: 45, guide: "PENDING", status: "PRESENT" },
  { initials: "AR", name: "Aditya Rao",   empId: "EMP-1088", avatarColor: "#3aab8e", projects: "Ortho Kids",              today: 52, guide: "DONE",    status: "PRESENT" },
  { initials: "SI", name: "Sneha Iyer",   empId: "EMP-1101", avatarColor: "#5b5ce2", projects: "Spine Indexing",          today: 38, guide: "DONE",    status: "PRESENT" },
  { initials: "KP", name: "Karan Patel",  empId: "EMP-1130", avatarColor: "#e05a3a", projects: "ABC Medical",             today: 0,  guide: "DONE",    status: "LEAVE"   },
  { initials: "DM", name: "Divya Menon",  empId: "EMP-1155", avatarColor: "#7c4dbd", projects: "Cardio Records",          today: 49, guide: "PENDING", status: "PRESENT" },
];

const COLS = "1.4fr 1fr 1.4fr 1fr 1.2fr 1fr";
const HEADERS = ["MEMBER", "EMP ID", "PROJECT(S)", "TODAY", "GUIDE ACK.", "STATUS"];

function GuideChip({ value }) {
  const done = value === "DONE";
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 80,
        fontFamily: FONT,
        fontSize: 11,
        fontWeight: 800,
        py: "4px",
        borderRadius: "6px",
        letterSpacing: "0.4px",
        textTransform: "uppercase",
        lineHeight: 1.4,
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
        width: 80,
        fontFamily: FONT,
        fontSize: 11,
        fontWeight: 800,
        py: "4px",
        borderRadius: "6px",
        letterSpacing: "0.4px",
        textTransform: "uppercase",
        lineHeight: 1.4,
        ...(present
          ? { bgcolor: "#e4f6ee", color: "#177a53", border: "1.5px solid #b7e3cc" }
          : { bgcolor: "#f3f4f6", color: "#6a7585", border: `1.5px solid ${LINE}` }),
      }}
    >
      {value}
    </Box>
  );
}

// ─── Table row ────────────────────────────────────────────────────────────────

function MemberRow({ initials, name, empId, avatarColor, projects, today, guide, status }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: COLS,
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
            width: 32, height: 32,
            bgcolor: avatarColor,
            fontSize: 12, fontWeight: 700,
            fontFamily: FONT,
          }}
        >
          {initials}
        </Avatar>
        <Typography sx={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: HEAD, whiteSpace: "nowrap" }}>
          {name}
        </Typography>
      </Box>

      {/* emp id */}
      <Typography sx={{ fontFamily: FONT, fontSize: 12.5, color: MUTED }}>
        {empId}
      </Typography>

      {/* projects */}
      <Typography sx={{ fontFamily: FONT, fontSize: 12.5, color: MUTED, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {projects}
      </Typography>

      {/* today */}
      <Typography sx={{ fontFamily: FONT, fontSize: 13, fontWeight: 700, color: HEAD }}>
        {today}
      </Typography>

      {/* guide ack */}
      <GuideChip value={guide} />

      {/* status */}
      <StatusChip value={status} />
    </Box>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function MyTeam({ onNavigate }) {
  return (
    <Box sx={{ width: "100%", boxSizing: "border-box" }}>

      {/* BREADCRUMB */}
      <Typography sx={{ fontFamily: FONT, fontSize: 12.5, color: MUTED, mb: 0.4 }}>
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
        <Typography sx={{ fontFamily: FONT, fontWeight: 800, fontSize: 22, letterSpacing: "-0.4px", color: HEAD }}>
          My team
        </Typography>

        <Button
          variant="contained"
          onClick={() => onNavigate?.("reports")}
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
          Team report
        </Button>
      </Box>

      {/* DESCRIPTION */}
      <Typography sx={{ fontFamily: FONT, fontSize: 13.5, color: MUTED, mb: 2.5 }}>
        Members reporting to you, their assignments and today's status.
      </Typography>

      {/* TABLE CARD */}
      <Paper
        elevation={0}
        sx={{
          border: `1px solid ${LINE}`,
          borderRadius: "0px",
          boxShadow: CARD_SHADOW,
          bgcolor: "#fff",
          overflow: "hidden",
        }}
      >
        {/* header row */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: COLS,
            minWidth: 860,
            px: 2,
            py: 1.2,
            bgcolor: "#f8fafc",
            borderBottom: `1px solid ${LINE2}`,
          }}
        >
          {HEADERS.map((h) => (
            <Typography
              key={h}
              sx={{ fontFamily: FONT, fontSize: 11, fontWeight: 800, color: MUTED, letterSpacing: "0.4px" }}
            >
              {h}
            </Typography>
          ))}
        </Box>

        {/* data rows */}
        <Box sx={{ overflowX: "auto" }}>
          {TEAM.map((member) => (
            <MemberRow key={member.name} {...member} />
          ))}
        </Box>
      </Paper>
    </Box>
  );
}
