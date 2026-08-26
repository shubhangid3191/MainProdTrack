import { useState } from "react";
import { Alert, Box, Snackbar, Typography, Avatar, Button, Paper } from "@mui/material";
import CorePageShell, { CoreTable, Person } from "../components/CorePageShell.jsx";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
const rowsCoreTeam = [[<Person initials="PS" name="Priya Sharma" />, 'INDEXER', '●', '●', '●', '○', '○'], [<Person initials="AR" name="Aditya Rao" />, 'INDEXER', '○', '●', '○', '○', '○'], [<Person initials="SI" name="Sneha Iyer" />, 'INDEXER', '○', '○', '●', '○', '○'], [<Person initials="RM" name="Rohan Mehta" />, 'TEAM LEAD', '●', '●', '●', '●', '○'], [<Person initials="MN" name="Meera Nair" />, 'CORE TEAM', '●', '●', '●', '●', '●']];
function AssignmentMatrixCoreTeam() {
  const [saved, setSaved] = useState(false);
  const [matrix, setMatrix] = useState(rowsCoreTeam);
  const toggleCell = (rowIndex, cellIndex) => setMatrix(current => current.map((row, index) => index === rowIndex ? row.map((cell, position) => position === cellIndex ? cell === '●' ? '○' : '●' : cell) : row));
  return <><CorePageShell title="Project assignment matrix" description="Controls project visibility. Indexers see only assigned projects; core & admin see all." actionLabel="Save changes" actionHandler={() => setSaved(true)}><Box sx={{
        bgcolor: '#eaf1ff',
        border: '1px solid #c8d9ff',
        borderRadius: 1.5,
        p: 1.5,
        mb: 2,
        color: '#2458c7'
      }}><Typography sx={{
          fontSize: 12
        }}>ⓘ &nbsp; Toggle a cell to grant or revoke a user's access to a project.</Typography></Box><CoreTable columns={['USER', 'ROLE', 'ABC', 'ORTHO', 'SPINE', 'CARDIO', 'NEURO']} rows={matrix} actionLabel={null} onCellAction={toggleCell} /></CorePageShell><Snackbar open={saved} autoHideDuration={2600} onClose={() => setSaved(false)} anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right'
    }}><Alert severity="success" variant="filled" onClose={() => setSaved(false)}>Changes saved successfully</Alert></Snackbar></>;
}
// ─── Data ────────────────────────────────────────────────────────────────────

const PROJECTSAdministrator = ["ABC", "ORTHO", "SPINE", "CARDIO", "NEURO"];
const ROLE_STYLEAdministrator = {
  Indexer: {
    label: "INDEXER",
    bg: "#eaf1ff",
    color: "#2458c7",
    border: "#bcd2ff"
  },
  "Team Lead": {
    label: "TEAM LEAD",
    bg: "#e9f7ef",
    color: "#15803d",
    border: "#a7d7bc"
  },
  "Core Team": {
    label: "CORE TEAM",
    bg: "#f3e8ff",
    color: "#7c3aed",
    border: "#d3b4fd"
  },
  Administrator: {
    label: "ADMIN",
    bg: "#fff0e0",
    color: "#b45309",
    border: "#f5c480"
  }
};
const AVATAR_COLORSAdministrator = ["#5b5ce2", "#0ea5e9", "#8b5cf6", "#3b82f6", "#10b981", "#5b5ce2"];
const initialUsersAdministrator = [{
  initials: "PS",
  name: "Priya Sharma",
  role: "Indexer",
  access: [true, true, true, false, false]
}, {
  initials: "AR",
  name: "Aditya Rao",
  role: "Indexer",
  access: [false, true, false, false, false]
}, {
  initials: "SI",
  name: "Sneha Iyer",
  role: "Indexer",
  access: [false, false, true, false, false]
}, {
  initials: "RM",
  name: "Rohan Mehta",
  role: "Team Lead",
  access: [true, true, true, true, false]
}, {
  initials: "MN",
  name: "Meera Nair",
  role: "Core Team",
  access: [true, true, true, true, true]
}, {
  initials: "SA",
  name: "System Admin",
  role: "Administrator",
  access: [true, true, true, true, true]
}];

// ─── Dot toggle ──────────────────────────────────────────────────────────────

function AccessDotAdministrator({
  on,
  locked,
  onClick
}) {
  return <Box component="button" type="button" aria-label={on ? "Revoke access" : "Grant access"} onClick={locked ? undefined : onClick} sx={{
    width: 14,
    height: 14,
    p: 0,
    border: on ? "1.5px solid #15966a" : "1.5px solid #cbd5e1",
    borderRadius: "50%",
    bgcolor: on ? "#15966a" : "transparent",
    cursor: locked ? "default" : "pointer",
    display: "block",
    mx: "auto",
    transition: "transform .15s",
    "&:hover": locked ? {} : {
      transform: "scale(1.3)"
    }
  }} />;
}

// ─── Role chip ────────────────────────────────────────────────────────────────

function RoleChipAdministrator({
  role
}) {
  const s = ROLE_STYLEAdministrator[role] || ROLE_STYLEAdministrator.Indexer;
  return <Box sx={{
    display: "inline-flex",
    alignItems: "center",
    px: 1.2,
    py: 0.3,
    borderRadius: "5px",
    bgcolor: s.bg,
    border: `1px solid ${s.border}`,
    color: s.color,
    fontSize: 10,
    fontWeight: 800,
    letterSpacing: "0.04em",
    whiteSpace: "nowrap"
  }}>
      {s.label}
    </Box>;
}

// ─── Main component ──────────────────────────────────────────────────────────

function AssignmentMatrixAdministrator() {
  const [users, setUsers] = useState(initialUsersAdministrator);
  const [saved, setSaved] = useState(false);
  const isLocked = role => role === "Core Team" || role === "Administrator";
  function toggle(userIdx, projIdx) {
    setUsers(prev => prev.map((u, i) => i === userIdx ? {
      ...u,
      access: u.access.map((v, j) => j === projIdx ? !v : v)
    } : u));
  }
  return <Box sx={{
    width: "100%"
  }}>
      {/* ── PAGE HEADER ── */}
      <Typography sx={{
      color: "#6b7b91",
      fontSize: 12,
      mb: 0.4
    }}>
        ProdTrack · Administrator
      </Typography>

      <Box sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      flexWrap: "wrap",
      gap: 2,
      mb: 2
    }}>
        <Box>
          <Typography sx={{
          fontSize: 23,
          fontWeight: 800,
          color: "#17233a"
        }}>
            Project assignment matrix
          </Typography>
          <Typography sx={{
          color: "#718096",
          fontSize: 12,
          mt: 0.4
        }}>
            Controls project visibility. Indexers see only assigned projects;
            core &amp; admin see all.
          </Typography>
        </Box>

        <Button variant="contained" onClick={() => setSaved(true)} sx={{
        height: 36,
        borderRadius: "8px",
        textTransform: "none",
        fontWeight: 700,
        fontSize: 13,
        boxShadow: "none",
        "&:hover": {
          boxShadow: "none"
        }
      }}>
          Save changes
        </Button>
      </Box>

      {/* ── INFO BANNER ── */}
      <Box sx={{
      display: "flex",
      alignItems: "center",
      gap: 1,
      px: 1.5,
      py: 1,
      mb: 2,
      bgcolor: "#eaf3ff",
      border: "1px solid #bcd5ff",
      borderRadius: "8px"
    }}>
        <InfoOutlinedIcon sx={{
        fontSize: 16,
        color: "#2458c7",
        flexShrink: 0
      }} />
        <Typography sx={{
        fontSize: 12,
        color: "#2458c7"
      }}>
          Toggle a cell to grant or revoke a user's access to a project. Team
          Leads inherit their team's projects; Core Team and Admin always have
          all projects.
        </Typography>
      </Box>

      {/* ── MATRIX TABLE ── */}
      <Paper elevation={0} sx={{
      border: "1px solid #dce3ec",
      borderRadius: "10px",
      overflow: "auto",
      bgcolor: "#fff",
      boxShadow: "0 2px 8px rgba(15,23,42,.05)"
    }}>
        <Box sx={{
        minWidth: 620
      }}>
          {/* Table header */}
          <Box sx={{
          display: "grid",
          gridTemplateColumns: "2fr 1.2fr repeat(5, 1fr)",
          px: 2,
          py: 1.2,
          bgcolor: "#f8fafc",
          borderBottom: "1px solid #e3e8ef"
        }}>
            {["USER", "ROLE", ...PROJECTSAdministrator].map(col => <Typography key={col} sx={{
            fontSize: 10,
            fontWeight: 800,
            color: "#64748b",
            textAlign: col === "USER" || col === "ROLE" ? "left" : "center"
          }}>
                {col}
              </Typography>)}
          </Box>

          {/* Table rows */}
          {users.map((user, ui) => <Box key={user.name} sx={{
          display: "grid",
          gridTemplateColumns: "2fr 1.2fr repeat(5, 1fr)",
          px: 2,
          py: 1.3,
          alignItems: "center",
          borderTop: "1px solid #edf0f4",
          "&:hover": {
            bgcolor: "#fafbfd"
          }
        }}>
              {/* User */}
              <Box sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.2
          }}>
                <Avatar sx={{
              width: 30,
              height: 30,
              fontSize: 11,
              fontWeight: 700,
              bgcolor: AVATAR_COLORSAdministrator[ui % AVATAR_COLORSAdministrator.length],
              flexShrink: 0
            }}>
                  {user.initials}
                </Avatar>
                <Typography sx={{
              fontSize: 13,
              color: "#17233a",
              fontWeight: 500
            }}>
                  {user.name}
                </Typography>
              </Box>

              {/* Role */}
              <Box>
                <RoleChipAdministrator role={user.role} />
              </Box>

              {/* Access dots */}
              {user.access.map((on, pi) => <Box key={pi} sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
                  <AccessDotAdministrator on={on} locked={isLocked(user.role)} onClick={() => toggle(ui, pi)} />
                </Box>)}
            </Box>)}
        </Box>
      </Paper>

      {/* ── SUCCESS SNACKBAR ── */}
      <Snackbar open={saved} autoHideDuration={2500} onClose={() => setSaved(false)} anchorOrigin={{
      vertical: "bottom",
      horizontal: "right"
    }}>
        <Alert severity="success" variant="filled" onClose={() => setSaved(false)}>
          Assignment changes saved
        </Alert>
      </Snackbar>
    </Box>;
}
void AssignmentMatrixAdministrator;
export default function AssignmentMatrix(props) {
  switch (props.roleKey) {
    case "coreTeam":
      return <AssignmentMatrixCoreTeam {...props} />;
    case "administrator":
      return <AssignmentMatrixCoreTeam {...props} />;
    default:
      return <AssignmentMatrixCoreTeam {...props} />;
  }
}
