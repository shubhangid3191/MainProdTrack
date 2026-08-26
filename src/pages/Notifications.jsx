import {
  Box,
  Paper,
  Typography,
} from "@mui/material";

import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";

// =========================================================
// NOTIFICATIONS DATA
// =========================================================

const notifications = [
  {
    icon: ErrorOutlineRoundedIcon,
    color: "#dc3545",
    title: "Missing daily entry",
    message:
      "You haven't submitted an entry for Spine Indexing today.",
    time: "2h ago",
  },
  {
    icon: MenuBookRoundedIcon,
    color: "#3478ed",
    title: "Guide update",
    message:
      "ABC Medical Imaging Guide v2.3 needs acknowledgement.",
    time: "5h ago",
  },
  {
    icon: CheckCircleRoundedIcon,
    color: "#20a36b",
    title: "Correction approved",
    message:
      "Your correction on ABC-...-11 was approved by Rohan Mehta.",
    time: "1d ago",
  },
  {
    icon: TrendingUpRoundedIcon,
    color: "#8060d9",
    title: "Backlog alert",
    message:
      "Pending volume for Ortho Kids increased by 12%.",
    time: "1d ago",
  },
  {
    icon: LockRoundedIcon,
    color: "#f59e0b",
    title: "Entry lock reminder",
    message:
      "Entries for 18 May lock at 6:00 PM today.",
    time: "2d ago",
  },

];

// =========================================================
// NOTIFICATIONS PAGE
// =========================================================

export default function Notifications({ user }) {
  return (
    <Box sx={{ width: "100%" }}>
      {/* BREADCRUMB */}

      <Typography
        sx={{
          color: "#6A7585",
          fontSize: 12.5,
        }}
      >
        ProdTrack · {user?.role || "User"}
      </Typography>

      {/* PAGE TITLE */}

      <Typography
        sx={{
          fontSize: 22,
          fontWeight: 800,
          mt: 0.7,
          color: "#1A2434",
        }}
      >
        Notifications
      </Typography>

      {/* DESCRIPTION */}

      <Typography
        sx={{
          color: "#6A7585",
          fontSize: 13.5,
          mt: 0.4,
          mb: 2,
        }}
      >
        Email and system alerts. Reminders for entries, corrections and guide
        updates.
      </Typography>

      {/* NOTIFICATION CARD */}

      <Paper
        elevation={0}
        sx={{
          border: "1px solid #dbe3ec",
          borderRadius: 1.5,
          overflow: "hidden",
          boxShadow: "0 2px 6px rgba(16,35,61,.08)",
        }}
      >
        {notifications.map(
          ({ icon: Icon, color, title, message, time }, index) => (
            <Box
              key={title}
              sx={{
                minHeight: 68,
                px: {
                  xs: 1.5,
                  sm: 2.2,
                },
                py: 1.35,
                display: "flex",
                alignItems: "center",
                gap: {
                  xs: 1.2,
                  sm: 1.8,
                },
                borderBottom:
                  index < notifications.length - 1
                    ? "1px solid #e3e8ef"
                    : "none",
              }}
            >
              {/* MUI ICON */}

              <Box
                sx={{
                  width: 30,
                  height: 30,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color,
                  flexShrink: 0,
                }}
              >
                <Icon
                  sx={{
                    fontSize: 23,
                  }}
                />
              </Box>

              {/* CONTENT */}

              <Box
                sx={{
                  minWidth: 0,
                  flex: 1,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 13.5,
                    fontWeight: 800,
                    color: "#1A2434",
                  }}
                >
                  {title}
                </Typography>

                <Typography
                  sx={{
                    fontSize: 12.5,
                    color: "#6A7585",
                    mt: 0.35,
                  }}
                >
                  {message}
                </Typography>
              </Box>

              {/* TIME */}

              <Typography
                sx={{
                  color: "#667085",
                  fontSize: 12,
                  whiteSpace: "nowrap",
                  alignSelf: "flex-start",
                  mt: 0.2,
                  flexShrink: 0,
                }}
              >
                {time}
              </Typography>
            </Box>
          )
        )}
      </Paper>
    </Box>
  );
}