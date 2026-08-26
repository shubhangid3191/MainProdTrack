import {
  Box,
  Button,
  Chip,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

const fieldSx = {
  "& .MuiInputBase-root": { bgcolor: "#f8fafc", fontSize: 13 },
  "& .MuiInputLabel-root": { fontSize: 13 },
};

export default function MyProfile({ user }) {
  const email = `${user.username.replace(".", "")}@company.com`;
  const fields = [
    ["Employee ID", user.emp],
    ["Full name", user.name],
    ["Email", email],
    ["Department", user.dept],
    ["Designation / Role", user.role],
    ["Team lead", user.lead],
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Typography sx={{ color: "#667085", fontSize: 12.5 }}>
        ProdTrack · {user.role}
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          flexDirection: { xs: "column", sm: "row" },
          gap: 1.5,
          mt: 0.5,
          mb: 2,
        }}
      >
        <Box>
          <Typography sx={{ fontSize: { xs: 21, sm: 24 }, fontWeight: 800 }}>
            My profile
          </Typography>
          <Typography sx={{ color: "#667085", fontSize: 13, mt: 0.4 }}>
            Your account details and assigned projects.
          </Typography>
        </Box>
        <Button variant="outlined" sx={{ textTransform: "none", bgcolor: "#fff" }}>
          Reset password
        </Button>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "1.65fr 1fr" },
          gap: 2,
        }}
      >
        <Paper elevation={0} sx={{ border: "1px solid #dbe3ec", borderRadius: 1.5, overflow: "hidden" }}>
          <Typography sx={{ px: 2, py: 1.6, fontSize: 14, fontWeight: 700, borderBottom: "1px solid #e8ecf3" }}>
            Account
          </Typography>
          <Box sx={{ p: 2, display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
            {fields.map(([label, value]) => (
              <TextField
                key={label}
                label={label}
                value={value}
                InputProps={{ readOnly: true }}
                InputLabelProps={{ shrink: true }}
                size="small"
                sx={fieldSx}
              />
            ))}
          </Box>
        </Paper>

        <Paper elevation={0} sx={{ border: "1px solid #dbe3ec", borderRadius: 1.5, overflow: "hidden" }}>
          <Typography sx={{ px: 2, py: 1.6, fontSize: 14, fontWeight: 700, borderBottom: "1px solid #e8ecf3" }}>
            Assigned projects
          </Typography>
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8 }}>
              {user.projects.map((project, index) => (
                <Chip
                  key={project}
                  label={project}
                  size="small"
                  sx={{
                    bgcolor: ["#e4f6ee", "#fbf1dc", "#efe9fb", "#e6efff"][index % 4],
                    color: ["#177a53", "#a9741a", "#603bb3", "#285fb8"][index % 4],
                    fontWeight: 600,
                  }}
                />
              ))}
            </Box>
            <Box sx={{ mt: 2, p: 1.5, border: "1px solid #cfe0f7", bgcolor: "#f4f8fe", borderRadius: 1.5, color: "#44566f", fontSize: 12.5, lineHeight: 1.55 }}>
              ℹ️ You only see updates and entries for projects assigned to you. Contact your admin to change assignments.
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
