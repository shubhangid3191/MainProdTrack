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
    <Box sx={{ width: "100%" }}>
      <Typography
        sx={{
          fontSize: 12,
          fontWeight: 600,
          color: "#6A7585",
          mb: 0.8,
        }}
      >
        {label}
      </Typography>

      <FormControl fullWidth size="small">
        <Select
          defaultValue={children[0]?.props?.value}
          sx={{
            height: 44,
            fontSize: 13,
            backgroundColor: "#fff",
            borderRadius: "8px",

            "& .MuiSelect-select": {
              display: "flex",
              alignItems: "center",
              minHeight: "44px !important",
              boxSizing: "border-box",
              py: 1,
            },

            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#d5dee9",
            },

            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#bfcbd9",
            },

            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#2f6df6",
            },
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
          alignItems: {
            xs: "stretch",
            md: "flex-end",
          },
          flexDirection: {
            xs: "column",
            md: "row",
          },
          mb: 2.5,
          gap: 2,
        }}
      >
        <Box>
          <Typography
            sx={{
              color: "#6A7585",
              fontSize: 12.5,
              mb: 0.4,
            }}
          >
            ProdTrack · {currentRole}
          </Typography>

          <Typography
            sx={{
              fontSize: 22,
              lineHeight: 1.5,
              fontWeight: 800,
              color: "#1A2434",
            }}
          >
            Reports
          </Typography>

          <Typography
            sx={{
              mt: 0.4,
              color: "#6A7585",
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
            width: {
              xs: "100%",
              md: "auto",
            },
          }}
        >
          <Button
            variant="outlined"
            sx={{
              height: 42,
              flex: {
                xs: 1,
                md: "unset",
              },
              textTransform: "none",
              borderRadius: "8px",
              color: "#1A2434",
              borderColor: "#d5dee9",
              backgroundColor: "#fff",
              fontSize: 13,
              px: 2,
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
              height: 42,
              flex: {
                xs: 1,
                md: "unset",
              },
              px: 2,
              textTransform: "none",
              borderRadius: "8px",
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
          p: {
            xs: 2,
            sm: 2.25,
          },
          mb: 2.5,
          border: "1px solid #dce3ec",
          borderRadius: "10px",
          boxShadow: "0 3px 10px rgba(15,23,42,.04)",
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
            gap: {
              xs: 2,
              md: 2.2,
            },
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
          gap: 2,
          mb: 2,
        }}
      >
        {/* =================================================
            RECEIVED VS COMPLETED
        ================================================= */}

        <Card
          elevation={0}
          sx={{
            border: "1px solid #dce3ec",
            borderRadius: "10px",
            overflow: "hidden",
            backgroundColor: "#fff",
          }}
        >
          {/* HEADER */}

          <Box
            sx={{
              px: 2,
              py: 1.5,
              minHeight: 54,
              display: "flex",
              alignItems: "center",
              borderBottom: "1px solid #e2e7ee",
              boxSizing: "border-box",
            }}
          >
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 800,
                color: "#1A2434",
              }}
            >
              Received vs completed
            </Typography>
          </Box>

          {/* BAR GRAPH */}

          <Box
            sx={{
              height: 210,
              px: {
                xs: 2,
                sm: 4,
              },
              pt: 2.5,
              pb: 2.5,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-around",
              gap: {
                xs: 1,
                sm: 2,
              },
              boxSizing: "border-box",
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
                  minWidth: 0,
                }}
              >
                {/* VALUE */}

                <Typography
                  sx={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#6A7585",
                    mb: 0.7,
                  }}
                >
                  {bar.value}
                </Typography>

                {/* BAR */}

                <Box
                  sx={{
                    width: {
                      xs: 28,
                      sm: 36,
                    },
                    height: `${(bar.value / max) * 125}px`,
                    minHeight: 35,
                    borderRadius: "7px 7px 0 0",
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
                    color: "#6A7585",
                    mt: 0.8,
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
            borderRadius: "10px",
            overflow: "hidden",
            backgroundColor: "#fff",
          }}
        >
          {/* HEADER */}

          <Box
            sx={{
              px: 2,
              py: 1.5,
              minHeight: 54,
              display: "flex",
              alignItems: "center",
              borderBottom: "1px solid #e2e7ee",
              boxSizing: "border-box",
            }}
          >
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 800,
                color: "#1A2434",
              }}
            >
              Distribution
            </Typography>
          </Box>

          {/* DONUT BODY */}

          <Box
            sx={{
              minHeight: 210,
              py: 2.5,
              px: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: {
                xs: 2,
                sm: 3,
              },
              flexWrap: {
                xs: "wrap",
                sm: "nowrap",
              },
              boxSizing: "border-box",
            }}
          >
            {/* DONUT */}

            <Box
              sx={{
                width: {
                  xs: 110,
                  sm: 126,
                },
                height: {
                  xs: 110,
                  sm: 126,
                },
                borderRadius: "50%",
                background:
                  "conic-gradient(#20a36f 0deg 225deg,#e09a22 225deg 287deg,#3475ee 287deg 360deg)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {/* INNER CIRCLE */}

              <Box
                sx={{
                  width: {
                    xs: 70,
                    sm: 80,
                  },
                  height: {
                    xs: 70,
                    sm: 80,
                  },
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
                    color: "#1A2434",
                  }}
                >
                  78%
                </Typography>

                <Typography
                  sx={{
                    fontSize: 11,
                    color: "#6A7585",
                  }}
                >
                  Completed
                </Typography>
              </Box>
            </Box>

            {/* LEGEND */}

            <Box>
              {[
                ["#20a36f", "Completed · 980"],
                ["#e09a22", "Pending · 270"],
                ["#3475ee", "In review · 145"],
              ].map(([color, label]) => (
                <Box
                  key={label}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.7,
                    mb: 1.3,
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
                      color: "#6A7585",
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
          borderRadius: "10px",
          overflow: "hidden",
          backgroundColor: "#fff",
        }}
      >
        {/* TABLE TITLE */}

        <Box
          sx={{
            px: 2,
            py: 1.5,
            minHeight: 54,
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid #e2e7ee",
            boxSizing: "border-box",
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
            px: 2,
            py: 1.5,
            minWidth: 760,
            backgroundColor: "#f8fafc",
            boxSizing: "border-box",
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
                color: "#6A7585",
                fontWeight: 700,
              }}
            >
              {header}
            </Typography>
          ))}
        </Box>

        {/* TABLE ROWS */}

        <Box
          sx={{
            overflowX: "auto",
            width: "100%",
          }}
        >
          {employees.map((employee) => (
            <Box
              key={employee[1]}
              sx={{
                display: "grid",
                gridTemplateColumns:
                  "2fr 2fr 1fr 1fr 1fr 1fr",
                minWidth: 760,
                px: 2,
                py: 1.5,
                minHeight: 62,
                alignItems: "center",
                borderTop: "1px solid #e7ebf0",
                boxSizing: "border-box",
              }}
            >
              {/* EMPLOYEE */}

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  minWidth: 0,
                }}
              >
                <Avatar
                  sx={{
                    width: 30,
                    height: 30,
                    fontSize: 10,
                    fontWeight: 700,
                    background: "linear-gradient(135deg, #3f7bff, #7a51d6);",
                    flexShrink: 0,
                  }}
                >
                  {employee[0]}
                </Avatar>

                <Typography
                  sx={{
                    fontSize: 13,
                    color: "#6A7585",
                    whiteSpace: "nowrap",
                  }}
                >
                  {employee[1]}
                </Typography>
              </Box>

              {/* PROJECT */}

              <Typography
                sx={{
                  fontSize: 13,
                  color: "#6A7585",
                  whiteSpace: "nowrap",
                }}
              >
                {employee[2]}
              </Typography>

              {/* RECEIVED */}

              <Typography
                sx={{
                  fontSize: 13,
                  color: "#1A2434",
                  fontWeight: 500,
                }}
              >
                {employee[3]}
              </Typography>

              {/* COMPLETED */}

              <Typography
                sx={{
                  fontSize: 13,
                  color: "#1A2434",
                  fontWeight: 500,
                }}
              >
                {employee[4]}
              </Typography>

              {/* PENDING */}

              <Typography
                sx={{
                  fontSize: 13,
                  color: "#1A2434",
                  fontWeight: 500,
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
                  height: 28,
                  backgroundColor: "#e5f7ef",
                  color: "#10694a",
                  border: "1px solid #b9e5d1",
                  fontSize: 11,
                  fontWeight: 800,
                  borderRadius: "15px",
                }}
              />
            </Box>
          ))}
        </Box>
      </Card>
    </Box>
  );
}