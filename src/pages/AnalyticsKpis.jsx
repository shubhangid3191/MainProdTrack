import { useState } from "react";
import {
  Box,
  Button,
  Chip,
  Snackbar,
  Alert,
  Typography,
  Paper,
} from "@mui/material";
import CorePageShell, {
  CoreMetricCards,
  SectionCard,
  Person,
} from "../components/CorePageShell.jsx";
const projectsCoreTeam = [
  ["ABC Medical Imaging", 120],
  ["Ortho Kids", 145],
  ["Spine Indexing", 98],
  ["Cardio Records", 167],
  ["Neuro Scan", 152],
  ["Ortho Plus", 88],
];
const performersCoreTeam = [
  ["DM", "Divya Menon", "1180", "95%"],
  ["AR", "Aditya Rao", "1122", "94%"],
  ["KP", "Karan Patel", "1040", "90%"],
  ["PS", "Priya Sharma", "998", "87%"],
];
function TrendChartCoreTeam() {
  return (
    <Box
      sx={{
        px: 2,
        pt: 2,
        pb: 1,
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: 180,
        }}
      >
        <svg
          viewBox="0 0 800 180"
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          role="img"
          aria-label="Completed versus target monthly production trend"
        >
          <defs>
            <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3478ed" stopOpacity=".24" />
              <stop offset="100%" stopColor="#3478ed" stopOpacity=".04" />
            </linearGradient>
          </defs>
          <line x1="0" y1="158" x2="800" y2="158" stroke="#dbe3ec" />
          <polygon
            points="0,120 133,86 266,100 400,38 533,56 666,0 800,18 800,158 0,158"
            fill="url(#trendFill)"
          />
          <polyline
            points="0,120 133,86 266,100 400,38 533,56 666,0 800,18"
            fill="none"
            stroke="#3478ed"
            strokeWidth="3"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <polyline
            points="0,136 133,122 266,112 400,98 533,86 666,70 800,56"
            fill="none"
            stroke="#8052df"
            strokeWidth="2"
            strokeDasharray="7 7"
          />
        </svg>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          pt: 1,
          color: "#526581",
          fontSize: 12,
        }}
      >
        <span>
          <i
            style={{
              display: "inline-block",
              width: 12,
              borderTop: "2px solid #3478ed",
              marginRight: 4,
              verticalAlign: "middle",
            }}
          />
          Completed
        </span>
        <span>
          <i
            style={{
              display: "inline-block",
              width: 12,
              borderTop: "2px dashed #8052df",
              marginRight: 4,
              verticalAlign: "middle",
            }}
          />
          Target
        </span>
      </Box>
    </Box>
  );
}
function StatusChartCoreTeam() {
  return (
    <Box
      sx={{
        height: 225,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
        px: 2,
        "@media (max-width: 500px)": {
          gap: 2,
          flexDirection: "column",
          height: 280,
        },
      }}
    >
      <Box
        sx={{
          width: 150,
          height: 150,
          flexShrink: 0,
          borderRadius: "50%",
          background:
            "conic-gradient(#20a36b 0 78%, #e09a20 78% 91%, #3478ed 91% 100%)",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Box
          sx={{
            width: 96,
            height: 96,
            borderRadius: "50%",
            bgcolor: "#fff",
            display: "grid",
            placeItems: "center",
            textAlign: "center",
          }}
        >
          <strong
            style={{
              fontSize: 23,
            }}
          >
            78%
          </strong>
          <small
            style={{
              color: "#667085",
            }}
          >
            Completed
          </small>
        </Box>
      </Box>
      <Box
        sx={{
          display: "grid",
          gap: 1,
          color: "#10233d",
          fontSize: 12,
        }}
      >
        <span>
          <b
            style={{
              color: "#20a36b",
            }}
          >
            ■
          </b>{" "}
          Completed · 980
        </span>
        <span>
          <b
            style={{
              color: "#e09a20",
            }}
          >
            ■
          </b>{" "}
          Pending · 270
        </span>
        <span>
          <b
            style={{
              color: "#3478ed",
            }}
          >
            ■
          </b>{" "}
          In review · 145
        </span>
      </Box>
    </Box>
  );
}
function AnalyticsKpisCoreTeam() {
  const [notice, setNotice] = useState(false);
  return (
    <CorePageShell
      title="Analytics & KPIs"
      description="Real-time production, backlog and performance across all projects."
      headerExtra={
        <Button
          variant="outlined"
          size="small"
          sx={{
            width: 112,
            height: 36,
            bgcolor: "#fff",
            borderColor: "#c8d9ff",
            borderRadius: "8px",
            justifyContent: "space-between",
            px: 1.5,
            color: "#2458c7",
            fontSize: 12,
          }}
        >
          This month <span aria-hidden="true">⌄</span>
        </Button>
      }
      actionLabel="Export"
      actionHandler={() => setNotice(true)}
    >
      <CoreMetricCards
        items={[
          ["Received (mo.)", "12,480"],
          ["Completed (mo.)", "9,860", "▲ 4.1%"],
          ["Backlog", "2,620", "▲ 3.6%"],
          ["Avg. productivity", "88%", "▲ 2 pts"],
        ]}
      />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1.6fr 1fr",
          gap: 2,
          "@media (max-width: 800px)": {
            gridTemplateColumns: "1fr",
          },
        }}
      >
        <SectionCard title="Completed vs target — trend">
          <TrendChartCoreTeam />
        </SectionCard>
        <SectionCard title="Status distribution">
          <StatusChartCoreTeam />
        </SectionCard>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 2,
          "@media (max-width: 700px)": {
            gridTemplateColumns: "1fr",
          },
        }}
      >
        <SectionCard title="Project comparison">
          <Box
            sx={{
              height: 235,
              display: "flex",
              alignItems: "end",
              justifyContent: "space-around",
              px: 2,
              pb: 2,
            }}
          >
            {projectsCoreTeam.map(([name, value], index) => (
              <Box
                key={name}
                sx={{
                  width: 38,
                  height: `${value * 0.82}px`,
                  maxHeight: 145,
                  bgcolor:
                    index === projectsCoreTeam.length - 1
                      ? "#8060d9"
                      : "#4b7ff0",
                  borderRadius: "7px 7px 0 0",
                  position: "relative",
                }}
              >
                <Typography
                  sx={{
                    position: "absolute",
                    top: -22,
                    width: 40,
                    textAlign: "center",
                    fontSize: 11,
                  }}
                >
                  {value}
                </Typography>
                <Typography
                  sx={{
                    position: "absolute",
                    bottom: -24,
                    width: 50,
                    left: -6,
                    textAlign: "center",
                    fontSize: 11,
                    color: "#526581",
                  }}
                >
                  {name.split(" ")[0]}
                </Typography>
              </Box>
            ))}
          </Box>
        </SectionCard>
        <SectionCard title="Top performers — this month">
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 90px 105px",
              bgcolor: "#f8fafc",
              px: 2,
              py: 1,
              color: "#526581",
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            <span>EMPLOYEE</span>
            <span>COMPLETED</span>
            <span>PRODUCTIVITY</span>
          </Box>
          {performersCoreTeam.map(
            ([initials, name, completed, productivity]) => (
              <Box
                key={name}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 90px 105px",
                  alignItems: "center",
                  px: 2,
                  py: 1.1,
                  borderTop: "1px solid #e3e8ef",
                  fontSize: 12,
                }}
              >
                <Person initials={initials} name={name} />
                <span>{completed}</span>
                <Chip
                  label={productivity}
                  size="small"
                  color="success"
                  sx={{
                    width: 43,
                    fontSize: 10,
                    fontWeight: 800,
                  }}
                />
              </Box>
            ),
          )}
        </SectionCard>
      </Box>
      <Snackbar
        open={notice}
        autoHideDuration={2500}
        onClose={() => setNotice(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setNotice(false)}
        >
          Analytics exported successfully
        </Alert>
      </Snackbar>
    </CorePageShell>
  );
}
const weeklyBarsAdministrator = [
  {
    day: "Mon",
    received: 142,
    completed: 128,
  },
  {
    day: "Tue",
    received: 165,
    completed: 154,
  },
  {
    day: "Wed",
    received: 120,
    completed: 98,
  },
  {
    day: "Thu",
    received: 188,
    completed: 175,
  },
  {
    day: "Fri",
    received: 174,
    completed: 162,
  },
  {
    day: "Sat",
    received: 95,
    completed: 88,
  },
];
const projectKpisAdministrator = [
  ["ABC Medical Imaging", "87%", 87, "4,320", "3,760", "#20a36f"],
  ["Ortho Kids", "94%", 94, "2,100", "1,974", "#3475ee"],
  ["Spine Indexing", "81%", 81, "1,860", "1,505", "#e09a22"],
  ["Cardio Records", "95%", 95, "1,440", "1,368", "#20a36f"],
  ["Neuro Scan", "78%", 78, "760", "593", "#e05a22"],
];
const maxReceivedAdministrator = Math.max(
  ...weeklyBarsAdministrator.map((b) => b.received),
);
function WeeklyChartAdministrator() {
  return (
    <Box
      sx={{
        px: {
          xs: 1,
          sm: 3,
        },
        pt: 2,
        pb: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-around",
          height: {
            xs: 120,
            sm: 160,
          },
          gap: {
            xs: 0.5,
            sm: 1.5,
          },
        }}
      >
        {weeklyBarsAdministrator.map((bar) => (
          <Box
            key={bar.day}
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-end",
              height: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-end",
                gap: "3px",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: {
                    xs: 10,
                    sm: 16,
                  },
                  height: `${(bar.received / maxReceivedAdministrator) * 100}%`,
                  minHeight: 10,
                  borderRadius: "4px 4px 0 0",
                  bgcolor: "#cfdeff",
                }}
              />
              <Box
                sx={{
                  width: {
                    xs: 10,
                    sm: 16,
                  },
                  height: `${(bar.completed / maxReceivedAdministrator) * 100}%`,
                  minHeight: 10,
                  borderRadius: "4px 4px 0 0",
                  background: "linear-gradient(180deg,#4f82ef,#2f6df6)",
                }}
              />
            </Box>
            <Typography
              sx={{
                fontSize: {
                  xs: 8,
                  sm: 10,
                },
                color: "#61718a",
                mt: 0.5,
              }}
            >
              {bar.day}
            </Typography>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          pt: 1,
          flexWrap: "wrap",
        }}
      >
        {[
          ["#cfdeff", "Received"],
          ["#2f6df6", "Completed"],
        ].map(([color, label]) => (
          <Box
            key={label}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.7,
            }}
          >
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "2px",
                bgcolor: color,
              }}
            />
            <Typography
              sx={{
                fontSize: 11,
                color: "#526581",
              }}
            >
              {label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
function AnalyticsKpisAdministrator() {
  return (
    <CorePageShell
      breadcrumb="Administrator"
      title="Analytics & KPIs"
      description="Monitor organisation-wide KPIs and operational trends."
    >
      {/* ── METRIC CARDS ── */}
      <CoreMetricCards
        items={[
          ["Org Productivity", "89%", "▲ 2.1% MoM"],
          ["Avg Turnaround", "1.4 days", "▼ 0.2 days"],
          ["Correction Rate", "3.2%", "▼ 0.5%"],
          ["Guide Compliance", "91%", "▲ 4%"],
        ]}
      />

      {/* ── CHART + PRODUCTIVITY BARS ── */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            lg: "1.5fr 1fr",
          },
          gap: 2,
          mb: 2,
        }}
      >
        <SectionCard title="Weekly received vs completed">
          <WeeklyChartAdministrator />
        </SectionCard>

        <SectionCard title="Productivity by project">
          {projectKpisAdministrator.map(([name, pct, raw, , , color]) => (
            <Box
              key={name}
              sx={{
                px: 2,
                py: 0.9,
                borderTop: "1px solid #e7ebf0",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 0.4,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 12,
                    color: "#243b5a",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: "75%",
                  }}
                >
                  {name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 800,
                    color,
                  }}
                >
                  {pct}
                </Typography>
              </Box>
              <Box
                sx={{
                  height: 5,
                  bgcolor: "#edf1f6",
                  borderRadius: 4,
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    width: `${raw}%`,
                    height: "100%",
                    bgcolor: color,
                    borderRadius: 4,
                  }}
                />
              </Box>
            </Box>
          ))}
        </SectionCard>
      </Box>

      {/* ── SUMMARY TABLE ── */}
      <Paper
        elevation={0}
        sx={{
          border: "1px solid #dbe3ec",
          borderRadius: 1.5,
          overflow: "hidden",
          bgcolor: "#fff",
        }}
      >
        <Box
          sx={{
            px: 2,
            py: 1.5,
            borderBottom: "1px solid #e3e8ef",
          }}
        >
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: 13,
            }}
          >
            Project-wise production summary
          </Typography>
        </Box>

        {/* Table header */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "2fr 1fr 1fr",
              sm: "2fr 1fr 1fr 1fr",
            },
            px: 2,
            py: 1,
            bgcolor: "#f8fafc",
            borderBottom: "1px solid #e3e8ef",
          }}
        >
          {["PROJECT", "PRODUCTIVITY", "RECEIVED", "COMPLETED"].map((h, i) => (
            <Typography
              key={h}
              sx={{
                fontSize: 10,
                fontWeight: 800,
                color: "#526581",
                display:
                  i === 3
                    ? {
                        xs: "none",
                        sm: "block",
                      }
                    : "block",
              }}
            >
              {h}
            </Typography>
          ))}
        </Box>

        {/* Table rows */}
        {projectKpisAdministrator.map(
          ([name, pct, , received, completed, color]) => (
            <Box
              key={name}
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "2fr 1fr 1fr",
                  sm: "2fr 1fr 1fr 1fr",
                },
                px: 2,
                py: 1.2,
                alignItems: "center",
                borderTop: "1px solid #e7ebf0",
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    xs: 11,
                    sm: 13,
                  },
                  color: "#243b5a",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {name}
              </Typography>
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 800,
                  color,
                }}
              >
                {pct}
              </Typography>
              <Typography
                sx={{
                  fontSize: 13,
                  color: "#526581",
                }}
              >
                {received}
              </Typography>
              <Typography
                sx={{
                  fontSize: 13,
                  color: "#526581",
                  display: {
                    xs: "none",
                    sm: "block",
                  },
                }}
              >
                {completed}
              </Typography>
            </Box>
          ),
        )}
      </Paper>
    </CorePageShell>
  );
}
void AnalyticsKpisAdministrator;
export default function AnalyticsKpis(props) {
  switch (props.roleKey) {
    case "coreTeam":
      return <AnalyticsKpisCoreTeam {...props} />;
    case "administrator":
      return <AnalyticsKpisCoreTeam {...props} />;
    default:
      return <AnalyticsKpisCoreTeam {...props} />;
  }
}
