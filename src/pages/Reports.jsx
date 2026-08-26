import {
  Box,
  Typography,
  Button,
  Card,
  FormControl,
  Select,
  MenuItem,
  Avatar,
  Chip,
} from "@mui/material";

import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";

// =========================================================
// CHART DATA
// =========================================================

const bars = [
  { day: "Mon", value: 120 },
  { day: "Tue", value: 145 },
  { day: "Wed", value: 98 },
  { day: "Thu", value: 167 },
  { day: "Fri", value: 152 },
  { day: "Sat", value: 88 },
];

// =========================================================
// EMPLOYEE DATA
// =========================================================

const employees = [
  ["PS", "Priya Sharma", "ABC Medical Imaging", 312, 270, 42, "87%"],
  ["AR", "Aditya Rao", "Ortho Kids", 298, 281, 17, "94%"],
  ["SI", "Sneha Iyer", "Spine Indexing", 256, 214, 42, "84%"],
  ["KP", "Karan Patel", "ABC Medical Imaging", 201, 180, 21, "90%"],
  ["DM", "Divya Menon", "Cardio Records", 277, 262, 15, "95%"],
];

// =========================================================
// ROLE NAME
// =========================================================

const roleNames = {
  indexer: "Indexer",
  teamLead: "Team Lead",
  coreTeam: "Core Team",
  administrator: "Administrator",
};

// =========================================================
// SELECT FIELD
// =========================================================

function SelectField({ label, children }) {
  return (
    <Box>
      <Typography
        sx={{
          fontSize: 12,
          fontWeight: 600,
          color: "#52647d",
          mb: 0.5,
        }}
      >
        {label}
      </Typography>

      <FormControl fullWidth size="small">
        <Select
          defaultValue={children[0]?.props?.value}
          sx={{
            height: 34,
            fontSize: 13,
            backgroundColor: "#fff",
            borderRadius: "7px",
          }}
        >
          {children}
        </Select>
      </FormControl>
    </Box>
  );
}

// =========================================================
// REPORTS PAGE
// =========================================================

export default function Reports({
  roleKey = "indexer",
}) {
  const max = Math.max(...bars.map((bar) => bar.value));

  const currentRole =
    roleNames[roleKey] || "Indexer";

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      {/* =================================================
          HEADER
      ================================================= */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          mb: 2,
          gap: 2,
        }}
      >
        <Box>
          <Typography
            sx={{
              color: "#6b7b91",
              fontSize: 13,
              mb: 0.4,
            }}
          >
            ProdTrack · {currentRole}
          </Typography>

          <Typography
            sx={{
              fontSize: 24,
              fontWeight: 800,
              color: "#17233a",
            }}
          >
            Reports
          </Typography>

          <Typography
            sx={{
              mt: 0.4,
              color: "#718096",
              fontSize: 13,
            }}
          >
            Daily, weekly, monthly and audit reports. Filter by project,
            employee and date.
          </Typography>
        </Box>

        {/* EXPORT BUTTONS */}

        <Box
          sx={{
            display: "flex",
            gap: 1,
            flexShrink: 0,
          }}
        >
          <Button
            variant="outlined"
            sx={{
              height: 34,

              textTransform: "none",

              borderRadius: "7px",

              color: "#243b5a",

              borderColor: "#d5dee9",

              backgroundColor: "#fff",

              fontSize: 13,

              "&:hover": {
                borderColor: "#2f6df6",
                backgroundColor: "#f8fbff",
              },
            }}
          >
            ↓ CSV
          </Button>

          <Button
            variant="contained"
            startIcon={<DownloadRoundedIcon />}
            sx={{
              height: 34,

              textTransform: "none",

              borderRadius: "7px",

              boxShadow: "none",

              fontSize: 13,

              fontWeight: 700,

              "&:hover": {
                boxShadow: "none",
              },
            }}
          >
            PDF
          </Button>
        </Box>
      </Box>

      {/* =================================================
          FILTERS
      ================================================= */}

      <Card
        elevation={0}
        sx={{
          p: 1.5,

          mb: 2,

          border: "1px solid #dce3ec",

          borderRadius: "9px",

          boxShadow:
            "0 3px 10px rgba(15,23,42,.04)",

          backgroundColor: "#fff",
        }}
      >
        <Box
          sx={{
            display: "grid",

            gridTemplateColumns: {
              xs: "1fr",
              md: "1fr 1fr",
            },

            gap: 1.4,
          }}
        >
          {/* REPORT TYPE */}

          <SelectField label="Report type">
            <MenuItem value="employee">
              Employee-wise production
            </MenuItem>

            <MenuItem value="project">
              Project-wise production
            </MenuItem>

            <MenuItem value="received">
              Received vs Completed
            </MenuItem>

            <MenuItem value="pending">
              Pending backlog
            </MenuItem>

            <MenuItem value="correction">
              Correction request log
            </MenuItem>
          </SelectField>

          {/* PERIOD */}

          <SelectField label="Period">
            <MenuItem value="week">
              This week
            </MenuItem>

            <MenuItem value="month">
              This month
            </MenuItem>

            <MenuItem value="custom">
              Custom range
            </MenuItem>
          </SelectField>

          {/* PROJECT */}

          <SelectField label="Project">
            <MenuItem value="all">
              All projects
            </MenuItem>

            <MenuItem value="abc">
              ABC Medical Imaging
            </MenuItem>

            <MenuItem value="ortho">
              Ortho Kids
            </MenuItem>
          </SelectField>

          {/* EMPLOYEE */}

          <SelectField label="Employee">
            <MenuItem value="all">
              All employees
            </MenuItem>

            <MenuItem value="priya">
              Priya Sharma
            </MenuItem>
          </SelectField>
        </Box>
      </Card>

      {/* =================================================
          CHARTS
      ================================================= */}

      <Box
        sx={{
          display: "grid",

          gridTemplateColumns: {
            xs: "1fr",
            lg: "1.65fr 1fr",
          },

          gap: 1.5,

          mb: 1.7,
        }}
      >
        {/* =================================================
            RECEIVED VS COMPLETED
        ================================================= */}

        <Card
          elevation={0}
          sx={{
            border: "1px solid #dce3ec",

            borderRadius: "9px",

            overflow: "hidden",

            backgroundColor: "#fff",
          }}
        >
          {/* HEADER */}

          <Box
            sx={{
              px: 1.5,
              py: 1.1,

              borderBottom:
                "1px solid #e2e7ee",
            }}
          >
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 800,
                color: "#17233a",
              }}
            >
              Received vs completed
            </Typography>
          </Box>

          {/* BAR GRAPH */}

          <Box
            sx={{
              height: 165,

              px: 4,

              pt: 2,
              pb: 2,

              display: "flex",

              alignItems: "flex-end",

              justifyContent: "space-around",

              gap: 2,
            }}
          >
            {bars.map((bar, index) => (
              <Box
                key={bar.day}
                sx={{
                  height: "100%",

                  flex: 1,

                  display: "flex",

                  flexDirection: "column",

                  alignItems: "center",

                  justifyContent: "flex-end",
                }}
              >
                {/* VALUE */}

                <Typography
                  sx={{
                    fontSize: 11,

                    fontWeight: 700,

                    color: "#31558e",

                    mb: 0.4,
                  }}
                >
                  {bar.value}
                </Typography>

                {/* BAR */}

                <Box
                  sx={{
                    width: 36,

                    height: `${(bar.value / max) * 100}px`,

                    minHeight: 25,

                    borderRadius:
                      "7px 7px 0 0",

                    background:
                      index === 5
                        ? "linear-gradient(180deg,#8a62dc,#7650c8)"
                        : "linear-gradient(180deg,#4f82ef,#2f6df6)",
                  }}
                />

                {/* DAY */}

                <Typography
                  sx={{
                    fontSize: 11,

                    color: "#61718a",

                    mt: 0.6,
                  }}
                >
                  {bar.day}
                </Typography>
              </Box>
            ))}
          </Box>
        </Card>

        {/* =================================================
            DISTRIBUTION
        ================================================= */}

        <Card
          elevation={0}
          sx={{
            border: "1px solid #dce3ec",

            borderRadius: "9px",

            overflow: "hidden",

            backgroundColor: "#fff",
          }}
        >
          {/* HEADER */}

          <Box
            sx={{
              px: 1.5,
              py: 1.1,

              borderBottom:
                "1px solid #e2e7ee",
            }}
          >
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 800,
                color: "#17233a",
              }}
            >
              Distribution
            </Typography>
          </Box>

          {/* DONUT BODY */}

          <Box
            sx={{
              height: 165,

              display: "flex",

              alignItems: "center",

              justifyContent: "center",

              gap: 3,
            }}
          >
            {/* DONUT */}

            <Box
              sx={{
                width: 116,
                height: 116,

                borderRadius: "50%",

                background:
                  "conic-gradient(#20a36f 0deg 225deg,#e09a22 225deg 287deg,#3475ee 287deg 360deg)",

                display: "flex",

                alignItems: "center",

                justifyContent: "center",
              }}
            >
              {/* INNER CIRCLE */}

              <Box
                sx={{
                  width: 74,
                  height: 74,

                  borderRadius: "50%",

                  backgroundColor: "#fff",

                  display: "flex",

                  alignItems: "center",

                  justifyContent: "center",

                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 20,

                    fontWeight: 800,

                    color: "#17233a",
                  }}
                >
                  78%
                </Typography>

                <Typography
                  sx={{
                    fontSize: 11,

                    color: "#718096",
                  }}
                >
                  Completed
                </Typography>
              </Box>
            </Box>

            {/* LEGEND */}

            <Box>
              {[
                [
                  "#20a36f",
                  "Completed · 980",
                ],

                [
                  "#e09a22",
                  "Pending · 270",
                ],

                [
                  "#3475ee",
                  "In review · 145",
                ],
              ].map(([color, label]) => (
                <Box
                  key={label}
                  sx={{
                    display: "flex",

                    alignItems: "center",

                    gap: 0.7,

                    mb: 1,
                  }}
                >
                  <Box
                    sx={{
                      width: 9,
                      height: 9,

                      borderRadius: "2px",

                      backgroundColor: color,
                    }}
                  />

                  <Typography
                    sx={{
                      fontSize: 11,

                      color: "#52647d",
                    }}
                  >
                    {label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Card>
      </Box>

      {/* =================================================
          EMPLOYEE TABLE
      ================================================= */}

      <Card
        elevation={0}
        sx={{
          border: "1px solid #dce3ec",

          borderRadius: "9px",

          overflow: "hidden",

          backgroundColor: "#fff",
        }}
      >
        {/* TABLE TITLE */}

        <Box
          sx={{
            px: 1.5,

            py: 1.1,

            borderBottom:
              "1px solid #e2e7ee",
          }}
        >
          <Typography
            sx={{
              fontSize: 14,

              fontWeight: 800,

              color: "#17233a",
            }}
          >
            Employee-wise production — this week
          </Typography>
        </Box>

        {/* TABLE HEADER */}

        <Box
          sx={{
            display: "grid",

            gridTemplateColumns:
              "2fr 2fr 1fr 1fr 1fr 1fr",

            px: 1.5,

            py: 1,

            backgroundColor: "#f8fafc",
          }}
        >
          {[
            "EMPLOYEE",
            "PROJECT",
            "RECEIVED",
            "COMPLETED",
            "PENDING",
            "PRODUCTIVITY",
          ].map((header) => (
            <Typography
              key={header}
              sx={{
                fontSize: 12,

                color: "#64748b",

                fontWeight: 700,
              }}
            >
              {header}
            </Typography>
          ))}
        </Box>

        {/* TABLE ROWS */}

        {employees.map((employee) => (
          <Box
            key={employee[1]}
            sx={{
              display: "grid",

              gridTemplateColumns:
                "2fr 2fr 1fr 1fr 1fr 1fr",

              px: 1.5,

              py: 1,

              alignItems: "center",

              borderTop:
                "1px solid #e7ebf0",
            }}
          >
            {/* EMPLOYEE */}

            <Box
              sx={{
                display: "flex",

                alignItems: "center",

                gap: 0.8,
              }}
            >
              <Avatar
                sx={{
                  width: 21,

                  height: 21,

                  fontSize: 8,

                  fontWeight: 700,

                  backgroundColor:
                    "#6366df",
                }}
              >
                {employee[0]}
              </Avatar>

              <Typography
                sx={{
                  fontSize: 13,

                  color: "#243b5a",
                }}
              >
                {employee[1]}
              </Typography>
            </Box>

            {/* PROJECT */}

            <Typography
              sx={{
                fontSize: 13,
                color: "#243b5a",
              }}
            >
              {employee[2]}
            </Typography>

            {/* RECEIVED */}

            <Typography
              sx={{
                fontSize: 13,
              }}
            >
              {employee[3]}
            </Typography>

            {/* COMPLETED */}

            <Typography
              sx={{
                fontSize: 13,
              }}
            >
              {employee[4]}
            </Typography>

            {/* PENDING */}

            <Typography
              sx={{
                fontSize: 13,
              }}
            >
              {employee[5]}
            </Typography>

            {/* PRODUCTIVITY */}

            <Chip
              label={employee[6]}
              size="small"
              sx={{
                width: "fit-content",

                height: 20,

                backgroundColor:
                  "#e5f7ef",

                color: "#16815b",

                border:
                  "1px solid #b9e5d1",

                fontSize: 11,

                fontWeight: 700,
              }}
            />
          </Box>
        ))}
      </Card>
    </Box>
  );
}
