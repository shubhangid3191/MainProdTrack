import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import BeachAccessRoundedIcon from "@mui/icons-material/BeachAccessRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

// =====================================================
// ATTENDANCE DATA
// =====================================================

const attendanceData = [
  {
    date: "20 May",
    day: "Tue",
    status: "Present",
    hours: "8.0",
    note: "—",
  },
  {
    date: "19 May",
    day: "Mon",
    status: "Present",
    hours: "8.0",
    note: "—",
  },
  {
    date: "16 May",
    day: "Fri",
    status: "Planned Leave",
    hours: "0",
    note: "Personal",
  },
  {
    date: "15 May",
    day: "Thu",
    status: "Training",
    hours: "8.0",
    note: "Guide v2.3 session",
  },
  {
    date: "14 May",
    day: "Wed",
    status: "Present",
    hours: "7.5",
    note: "—",
  },
];

// =====================================================
// SUMMARY CARD
// =====================================================

function AttendanceCard({
  icon,
  iconBg,
  iconColor,
  label,
  value,
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "#e5e7eb",
        borderRadius: 1,
        p: 2.5,

        display: "flex",
        alignItems: "center",

        gap: 2,

        height: "100%",

        boxSizing: "border-box",

        backgroundColor: "#fff",
      }}
    >
      <Box
        sx={{
          width: 46,
          height: 46,

          borderRadius: 1,

          bgcolor: iconBg,
          color: iconColor,

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          flexShrink: 0,
        }}
      >
        {icon}
      </Box>

      <Box>
        <Typography
          sx={{
            color: "#6b7280",
            fontSize: 13,
            mb: 0.3,
          }}
        >
          {label}
        </Typography>

        <Typography
          sx={{
            color: "#111827",
            fontSize: 25,
            lineHeight: 1.2,
            fontWeight: 700,
          }}
        >
          {value}
        </Typography>
      </Box>
    </Paper>
  );
}

// =====================================================
// STATUS STYLE
// =====================================================

function getStatusStyle(status) {
  switch (status) {
    case "Present":
      return {
        backgroundColor: "#dcfce7",
        color: "#15803d",
      };

    case "Planned Leave":
      return {
        backgroundColor: "#fef3c7",
        color: "#b45309",
      };

    case "Training":
      return {
        backgroundColor: "#ede9fe",
        color: "#7c3aed",
      };

    default:
      return {
        backgroundColor: "#f3f4f6",
        color: "#374151",
      };
  }
}

// =====================================================
// ATTENDANCE PAGE
// =====================================================

export default function Attendance({ roleLabel = "Indexer" }) {
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      {/* =================================================
          BREADCRUMB
      ================================================= */}

      <Typography
        sx={{
          color: "#6b7280",
          fontSize: 12,
          mb: 0.7,
        }}
      >
        ProdTrack · {roleLabel}
      </Typography>

      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",

          mb: 0.5,

          gap: 2,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 24,

              color: "#111827",

              lineHeight: 1.3,
            }}
          >
            Leave & attendance
          </Typography>

          <Typography
            sx={{
              color: "#6b7280",
              fontSize: 14,
              mt: 0.5,
            }}
          >
            Track availability. Approved leave can be excluded from productivity
            calculations.
          </Typography>
        </Box>

        {/* APPLY FOR LEAVE */}

        <Button
          variant="contained"
          startIcon={<AddRoundedIcon />}
          sx={{
            px: 2,
            py: 1.15,

            borderRadius: 1,

            textTransform: "none",

            fontSize: 14,
            fontWeight: 600,

            whiteSpace: "nowrap",

            boxShadow: "none",

            flexShrink: 0,

            "&:hover": {
              boxShadow: "none",
            },
          }}
        >
          Apply for leave
        </Button>
      </Box>

      {/* =================================================
          SUMMARY CARDS
      ================================================= */}

      <Grid
        container
        spacing={2.5}
        sx={{
          mt: 2.5,
          mb: 3,
        }}
      >
        {/* PRESENT DAYS */}

        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 3,
          }}
        >
          <AttendanceCard
            icon={<EventAvailableRoundedIcon />}
            iconBg="#dcfce7"
            iconColor="#16a34a"
            label="Present days"
            value="18"
          />
        </Grid>

        {/* LEAVE TAKEN */}

        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 3,
          }}
        >
          <AttendanceCard
            icon={<BeachAccessRoundedIcon />}
            iconBg="#fff3dc"
            iconColor="#d97706"
            label="Leave taken"
            value="2"
          />
        </Grid>

        {/* TRAINING */}

        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 3,
          }}
        >
          <AttendanceCard
            icon={<SchoolRoundedIcon />}
            iconBg="#ede9fe"
            iconColor="#7c3aed"
            label="Training"
            value="1"
          />
        </Grid>

        {/* WORKING DAYS */}

        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 3,
          }}
        >
          <AttendanceCard
            icon={<CalendarMonthRoundedIcon />}
            iconBg="#e5efff"
            iconColor="#2563eb"
            label="Working days"
            value="22"
          />
        </Grid>
      </Grid>

      {/* =================================================
          THIS MONTH
      ================================================= */}

      <Paper
        elevation={0}
        sx={{
          border: "1px solid",

          borderColor: "#e5e7eb",

          borderRadius: 1,

          backgroundColor: "#fff",

          overflow: "hidden",
        }}
      >
        {/* TABLE HEADER */}

        <Box
          sx={{
            px: 2.5,
            py: 2,

            borderBottom: "1px solid",

            borderColor: "#e5e7eb",
          }}
        >
          <Typography
            sx={{
              fontSize: 16,

              fontWeight: 700,

              color: "#111827",
            }}
          >
            This month
          </Typography>
        </Box>

        {/* TABLE */}

        <TableContainer>
          <Table
            sx={{
              minWidth: 700,
            }}
          >
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "#f8fafc",
                }}
              >
                <TableCell
                  sx={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#6b7280",
                    py: 1.5,
                  }}
                >
                  Date
                </TableCell>

                <TableCell
                  sx={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#6b7280",
                    py: 1.5,
                  }}
                >
                  Day
                </TableCell>

                <TableCell
                  sx={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#6b7280",
                    py: 1.5,
                  }}
                >
                  Status
                </TableCell>

                <TableCell
                  align="center"
                  sx={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#6b7280",
                    py: 1.5,
                  }}
                >
                  Hours
                </TableCell>

                <TableCell
                  sx={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#6b7280",
                    py: 1.5,
                  }}
                >
                  Note
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {attendanceData.map((row) => {
                const statusStyle = getStatusStyle(row.status);

                return (
                  <TableRow
                    key={`${row.date}-${row.status}`}
                    sx={{
                      "&:last-child td": {
                        borderBottom: 0,
                      },

                      "&:hover": {
                        backgroundColor: "#f8fafc",
                      },
                    }}
                  >
                    {/* DATE */}

                    <TableCell
                      sx={{
                        fontSize: 14,

                        color: "#111827",

                        fontWeight: 500,

                        py: 1.8,
                      }}
                    >
                      {row.date}
                    </TableCell>

                    {/* DAY */}

                    <TableCell
                      sx={{
                        fontSize: 14,

                        color: "#6b7280",

                        py: 1.8,
                      }}
                    >
                      {row.day}
                    </TableCell>

                    {/* STATUS */}

                    <TableCell
                      sx={{
                        py: 1.8,
                      }}
                    >
                      <Box
                        sx={{
                          display: "inline-flex",

                          alignItems: "center",

                          px: 1.2,

                          py: 0.45,

                          borderRadius: 1.5,

                          backgroundColor:
                            statusStyle.backgroundColor,

                          color:
                            statusStyle.color,

                          fontSize: 12,

                          fontWeight: 600,
                        }}
                      >
                        {row.status}
                      </Box>
                    </TableCell>

                    {/* HOURS */}

                    <TableCell
                      align="center"
                      sx={{
                        fontSize: 14,

                        color: "#111827",

                        fontWeight: 600,

                        py: 1.8,
                      }}
                    >
                      {row.hours}
                    </TableCell>

                    {/* NOTE */}

                    <TableCell
                      sx={{
                        fontSize: 14,

                        color: "#6b7280",

                        py: 1.8,
                      }}
                    >
                      {row.note}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}