import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

// =========================================================
// SHARED: LABEL-ABOVE-INPUT FIELD WRAPPER
// =========================================================

function Field({ label, gridColumn, children }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        gridColumn: gridColumn || "auto",
        minWidth: 0,
      }}
    >
      <Typography
        component="label"
        sx={{
          fontSize: 12,
          fontWeight: 600,
          color: "#6A7585",
          lineHeight: 1.2,
        }}
      >
        {label}
      </Typography>

      {children}
    </Box>
  );
}

// =========================================================
// SHARED INPUT STYLE
// =========================================================

const inputSx = {
  width: "100%",

  "& .MuiOutlinedInput-root": {
    height: 50,
    borderRadius: "9px",
    bgcolor: "#fff",
    fontSize: 15,
    color: "#0f172a",
  },

  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#d9e1ea",
  },

  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#cbd5e1",
  },

  "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#3169e8",
    borderWidth: 1,
  },

  "& .MuiInputBase-input": {
    py: 1.4,
  },

  "& .MuiSelect-select": {
    display: "flex",
    alignItems: "center",
    minHeight: "unset !important",
  },
};

const textareaSx = {
  ...inputSx,

  "& .MuiOutlinedInput-root": {
    minHeight: 90,
    height: "auto",
    borderRadius: "9px",
    bgcolor: "#fff",
    fontSize: 15,
    alignItems: "flex-start",
  },

  "& textarea": {
    minHeight: "60px !important",
  },
};

// =========================================================
// TODAY'S ENTRIES
// =========================================================

const entriesIndexer = [
  {
    date: "20 May",
    project: "ABC Medical Imaging",
    batch: "ABC-__-13",
    received: "60",
    completed: "45",
    status: "DRAFT",
  },
  {
    date: "20 May",
    project: "Ortho Kids",
    batch: "ORT-__-08",
    received: "40",
    completed: "40",
    status: "SUBMITTED",
  },
  {
    date: "19 May",
    project: "Spine Indexing",
    batch: "SPN-__-22",
    received: "55",
    completed: "55",
    status: "REVIEWED",
  },
  {
    date: "19 May",
    project: "ABC Medical Imaging",
    batch: "ABC-__-11",
    received: "50",
    completed: "50",
    status: "LOCKED",
  },
];

// =========================================================
// STATUS CHIP
// =========================================================

function StatusChipIndexer({ status }) {
  const styles = {
    DRAFT: {
      bgcolor: "#eef2ff",
      color: "#315fd4",
      borderColor: "#c7d2fe",
    },
    SUBMITTED: {
      bgcolor: "#eaf2ff",
      color: "#2563eb",
      borderColor: "#bfdbfe",
    },
    REVIEWED: {
      bgcolor: "#e0f7fa",
      color: "#00838f",
      borderColor: "#b2ebf2",
    },
    LOCKED: {
      bgcolor: "#f0e9ff",
      color: "#6d28d9",
      borderColor: "#ddd6fe",
    },
  };

  return (
    <Chip
      label={status}
      size="small"
      variant="outlined"
      sx={{
        height: 26,
        borderRadius: "13px",
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: 0.2,
        px: 0.5,
        ...styles[status],
      }}
    />
  );
}

// =========================================================
// INDEXER DAILY ENTRY
// =========================================================

function IndexerDailyEntryIndexer() {
  return (
    <Box sx={{ width: "100%" }}>
      {/* =================================================
          TOP SECTION
       ================================================= */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: {
            xs: "stretch",
            md: "flex-start",
          },
          flexDirection: {
            xs: "column",
            md: "row",
          },
          gap: {
            xs: 2.5,
            md: 1,
          },
          mb: 2.25,
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              color: "#64748b",
              fontSize: 14,
              mb: 0.5,
            }}
          >
            ProdTrack · Indexer
          </Typography>

          <Typography
            sx={{
              color: "#0f172a",
              fontSize: {
                xs: 22,
                sm: 26,
              },
              fontWeight: 800,
              lineHeight: 1.5,
            }}
          >
            Daily production entry
          </Typography>

          <Typography
            sx={{
              color: "#64748b",
              fontSize: {
                xs: 13,
                sm: 16,
              },
              mt: 0.5,
            }}
          >
            Log today&apos;s production. Draft → Submitted → Reviewed → Locked.
          </Typography>
        </Box>

        {/* ACTION BUTTONS */}

        <Box
          sx={{
            display: "flex",
            gap: 1,
            mt: {
              xs: 0,
              md: 1.5,
            },
            width: {
              xs: "100%",
              md: "auto",
            },
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="outlined"
            sx={{
              bgcolor: "#fff",
              color: "#173b66",
              borderColor: "#dbe3ec",
              textTransform: "none",
              fontSize: 14,
              fontWeight: 600,
              borderRadius: "10px",
              px: 2.25,
              height: 46,
              minWidth: {
                xs: 0,
                sm: 125,
              },
              flex: {
                xs: 1,
                sm: "unset",
              },
            }}
          >
            Save draft
          </Button>

          <Button
            variant="contained"
            sx={{
              bgcolor: "#3169e8",
              textTransform: "none",
              fontSize: 14,
              fontWeight: 600,
              borderRadius: "10px",
              px: 2.25,
              height: 46,
              minWidth: {
                xs: 0,
                sm: 140,
              },
              flex: {
                xs: 1,
                sm: "unset",
              },
              boxShadow: "none",
              "&:hover": {
                bgcolor: "#2458cf",
                boxShadow: "none",
              },
            }}
          >
            Submit entry
          </Button>
        </Box>
      </Box>

      {/* =================================================
          STATUS STEPS
       ================================================= */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: {
            xs: 0.75,
            sm: 1.1,
          },
          mb: 2.5,
          flexWrap: "wrap",
        }}
      >
        <Chip
          label="Draft"
          size="small"
          sx={{
            bgcolor: "#3169e8",
            color: "#FFF",
            fontSize: 20,
            fontWeight: 700,
            height: 56,
            minWidth: {
              xs: 84,
              sm: 100,
            },
            px: {
              xs: 2,
              sm: 2.5,
            },
            borderRadius: "11px",

            "& .MuiChip-label": {
              color: "#000",
            },
          }}
        />

        <Typography
          sx={{
            color: "#94a3b8",
            fontSize: 12,
          }}
        >
          →
        </Typography>

        <Chip
          label="Submitted"
          size="small"
          variant="outlined"
          sx={{
            bgcolor: "#fff",
            color: "#000",
            borderColor: "#dbe3ec",
            fontSize: 20,
            fontWeight: 600,
            height: 56,
            minWidth: {
              xs: 112,
              sm: 135,
            },
            px: {
              xs: 2,
              sm: 2.5,
            },
            borderRadius: "11px",

            "& .MuiChip-label": {
              color: "#000",
            },
          }}
        />

        <Typography
          sx={{
            color: "#94a3b8",
            fontSize: 12,
          }}
        >
          →
        </Typography>

        <Chip
          label="Reviewed"
          size="small"
          variant="outlined"
          sx={{
            bgcolor: "#fff",
            color: "#000",
            borderColor: "#dbe3ec",
            fontSize: 20,
            fontWeight: 600,
            height: 56,
            minWidth: {
              xs: 108,
              sm: 125,
            },
            px: {
              xs: 2,
              sm: 2.5,
            },
            borderRadius: "11px",

            "& .MuiChip-label": {
              color: "#000",
            },
          }}
        />

        <Typography
          sx={{
            color: "#94a3b8",
            fontSize: 12,
          }}
        >
          →
        </Typography>

        <Chip
          label="Locked"
          size="small"
          variant="outlined"
          sx={{
            bgcolor: "#fff",
            color: "#000",
            borderColor: "#dbe3ec",
            fontSize: 20,
            fontWeight: 600,
            height: 56,
            minWidth: {
              xs: 90,
              sm: 108,
            },
            px: {
              xs: 2,
              sm: 2.5,
            },
            borderRadius: "11px",

            "& .MuiChip-label": {
              color: "#000",
            },
          }}
        />

        <Box
          sx={{
            flex: 1,
            minWidth: 16,
          }}
        />

        <Typography
          sx={{
            fontSize: 11,
            fontWeight: 700,
            color: "#64748b",
            border: "1px solid #dbe3ec",
            bgcolor: "#fff",
            borderRadius: 1,
            px: 1,
            py: 0.5,
          }}
        >
          EDITABLE — DRAFT
        </Typography>
      </Box>

      {/* =================================================
          ENTRY FORM
       ================================================= */}

      <Card
        elevation={0}
        sx={{
          borderRadius: "14px",
          border: "1px solid #dbe3ec",
          bgcolor: "#fff",
          p: {
            xs: 2,
            sm: 2.5,
            md: 2.75,
          },
          mb: 2.5,
          boxShadow: "0 2px 8px rgba(15,23,42,0.05)",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1fr 1fr",
            },
            columnGap: 2.5,
            rowGap: 2.75,
          }}
        >
          {/* Production Date */}

          <Field label="Production date">
            <TextField
              type="date"
              defaultValue="2025-05-20"
              fullWidth
              size="small"
              sx={inputSx}
            />
          </Field>

          {/* Project */}

          <Field label="Project">
            <TextField
              select
              defaultValue="ABC Medical Imaging"
              fullWidth
              size="small"
              sx={inputSx}
            >
              <MenuItem value="ABC Medical Imaging">
                ABC Medical Imaging
              </MenuItem>

              <MenuItem value="Ortho Kids">Ortho Kids</MenuItem>

              <MenuItem value="Spine Indexing">Spine Indexing</MenuItem>
            </TextField>
          </Field>

          {/* Batch / Job ID */}

          <Field label="Batch / Job ID">
            <TextField
              placeholder="e.g. ABC-2025-0520-14"
              fullWidth
              size="small"
              sx={inputSx}
            />
          </Field>

          {/* Reporting Category */}

          <Field label="Reporting category">
            <TextField
              select
              defaultValue="Implant Indexing"
              fullWidth
              size="small"
              sx={inputSx}
            >
              <MenuItem value="Implant Indexing">
                Implant Indexing
              </MenuItem>

              <MenuItem value="General Indexing">
                General Indexing
              </MenuItem>

              <MenuItem value="Review">Review</MenuItem>
            </TextField>
          </Field>

          {/* Documents Received */}

          <Field label="Documents received">
            <TextField
              defaultValue="60"
              fullWidth
              size="small"
              sx={inputSx}
            />
          </Field>

          {/* Documents Completed */}

          <Field label="Documents completed">
            <TextField
              defaultValue="45"
              fullWidth
              size="small"
              sx={inputSx}
            />
          </Field>

          {/* Batches Processed */}

          <Field label="Batches processed">
            <TextField
              defaultValue="4"
              fullWidth
              size="small"
              sx={inputSx}
            />
          </Field>

          {/* Errors Flagged */}

          <Field label="Errors flagged">
            <TextField
              defaultValue="1"
              fullWidth
              size="small"
              sx={inputSx}
            />
          </Field>

          {/* Notes */}

          <Field
            label="Notes / remarks"
            gridColumn={{
              xs: "auto",
              md: "1 / -1",
            }}
          >
            <TextField
              placeholder="Optional — anything the reviewer should know"
              multiline
              rows={1}
              fullWidth
              size="small"
              sx={textareaSx}
            />
          </Field>
        </Box>
      </Card>

      {/* =================================================
          TODAY'S ENTRIES TITLE
       ================================================= */}

      <Typography
        sx={{
          color: "#0f172a",
          fontSize: 15,
          fontWeight: 700,
          mb: 1,
        }}
      >
        Today&apos;s entries
      </Typography>

      {/* =================================================
          TODAY'S ENTRIES TABLE
       ================================================= */}

      <TableContainer
        component={Card}
        elevation={0}
        sx={{
          borderRadius: "14px",
          border: "1px solid #dbe3ec",
          overflowX: "auto",
          overflowY: "hidden",
          boxShadow: "0 2px 8px rgba(15,23,42,0.05)",
        }}
      >
        <Table
          size="small"
          sx={{
            minWidth: 820,
          }}
        >
          <TableHead>
            <TableRow
              sx={{
                bgcolor: "#f8fafc",
              }}
            >
              {[
                "DATE",
                "PROJECT",
                "BATCH",
                "RECEIVED",
                "COMPLETED",
                "STATUS",
                "",
              ].map((heading, index) => (
                <TableCell
                  key={`${heading}-${index}`}
                  sx={{
                    color: "#64748b",
                    fontSize: 13,
                    fontWeight: 700,
                    py: 1.5,
                    borderBottom: "1px solid #e2e8f0",
                    whiteSpace: "nowrap",
                  }}
                >
                  {heading}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {entriesIndexer.map((entry, index) => (
              <TableRow key={index}>
                <TableCell
                  sx={{
                    fontSize: 14,
                    color: "#475569",
                    py: 1.5,
                  }}
                >
                  {entry.date}
                </TableCell>

                <TableCell
                  sx={{
                    fontSize: 14,
                    color: "#334155",
                    py: 1.5,
                  }}
                >
                  {entry.project}
                </TableCell>

                <TableCell
                  sx={{
                    fontSize: 14,
                    color: "#64748b",
                    py: 1.5,
                  }}
                >
                  {entry.batch}
                </TableCell>

                <TableCell
                  sx={{
                    fontSize: 14,
                    color: "#334155",
                    py: 1.5,
                  }}
                >
                  {entry.received}
                </TableCell>

                <TableCell
                  sx={{
                    fontSize: 14,
                    color: "#334155",
                    py: 1.5,
                  }}
                >
                  {entry.completed}
                </TableCell>

                <TableCell
                  sx={{
                    py: 1.5,
                  }}
                >
                  <StatusChipIndexer status={entry.status} />
                </TableCell>

                <TableCell
                  sx={{
                    py: 0.8,
                  }}
                >
                  {entry.status === "DRAFT" && (
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{
                        minWidth: 52,
                        height: 36,
                        px: 1.5,
                        fontSize: 12,
                        textTransform: "none",
                        borderColor: "#e2e8f0",
                        color: "#475569",
                      }}
                    >
                      Edit
                    </Button>
                  )}

                  {entry.status === "LOCKED" && (
                    <Typography
                      sx={{
                        fontSize: 12,
                        color: "#64748b",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Request correction
                    </Typography>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

// =========================================================
// TEAM LEAD DATA
// =========================================================

const entriesTeamLead = [
  {
    date: "20 May",
    project: "ABC Medical Imaging",
    batch: "ABC-__-13",
    received: "60",
    completed: "45",
    status: "DRAFT",
  },
  {
    date: "20 May",
    project: "Ortho Kids",
    batch: "ORT-__-08",
    received: "40",
    completed: "40",
    status: "SUBMITTED",
  },
  {
    date: "19 May",
    project: "Spine Indexing",
    batch: "SPN-__-22",
    received: "55",
    completed: "55",
    status: "REVIEWED",
  },
  {
    date: "19 May",
    project: "ABC Medical Imaging",
    batch: "ABC-__-11",
    received: "50",
    completed: "50",
    status: "LOCKED",
  },
];

// =========================================================
// TEAM LEAD STATUS CHIP
// =========================================================

function StatusChipTeamLead({ status }) {
  const styles = {
    DRAFT: {
      bgcolor: "#eef2ff",
      color: "#315fd4",
      borderColor: "#c7d2fe",
    },
    SUBMITTED: {
      bgcolor: "#eaf2ff",
      color: "#2563eb",
      borderColor: "#bfdbfe",
    },
    REVIEWED: {
      bgcolor: "#e0f7fa",
      color: "#00838f",
      borderColor: "#b2ebf2",
    },
    LOCKED: {
      bgcolor: "#f0e9ff",
      color: "#6d28d9",
      borderColor: "#ddd6fe",
    },
  };

  return (
    <Chip
      label={status}
      size="small"
      variant="outlined"
      sx={{
        height: 26,
        borderRadius: "13px",
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: 0.2,
        px: 0.5,
        ...styles[status],
      }}
    />
  );
}

// =========================================================
// TEAM LEAD DAILY ENTRY
// =========================================================

function TeamLeadDailyEntryTeamLead() {
  return (
    <Box sx={{ width: "100%" }}>
      {/* =================================================
          TOP SECTION
       ================================================= */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: {
            xs: "stretch",
            md: "flex-start",
          },
          flexDirection: {
            xs: "column",
            md: "row",
          },
          gap: {
            xs: 2.5,
            md: 1,
          },
          mb: 2.25,
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              color: "#64748b",
              fontSize: 14,
              mb: 0.5,
            }}
          >
            ProdTrack · Team Lead
          </Typography>

          <Typography
            sx={{
              color: "#0f172a",
              fontSize: {
                xs: 23,
                sm: 28,
              },
              fontWeight: 800,
              lineHeight: 1.2,
            }}
          >
            Daily production entry
          </Typography>

          <Typography
            sx={{
              color: "#64748b",
              fontSize: {
                xs: 13,
                sm: 16,
              },
              mt: 0.5,
            }}
          >
            Log today&apos;s production. Draft → Submitted → Reviewed → Locked.
          </Typography>
        </Box>

        {/* ACTION BUTTONS */}

        <Box
          sx={{
            display: "flex",
            gap: 1,
            mt: {
              xs: 0,
              md: 1.5,
            },
            width: {
              xs: "100%",
              md: "auto",
            },
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="outlined"
            sx={{
              bgcolor: "#fff",
              color: "#173b66",
              borderColor: "#dbe3ec",
              textTransform: "none",
              fontSize: 14,
              fontWeight: 600,
              borderRadius: "10px",
              px: 2.25,
              height: 46,
              minWidth: {
                xs: 0,
                sm: 125,
              },
              flex: {
                xs: 1,
                sm: "unset",
              },
            }}
          >
            Save draft
          </Button>

          <Button
            variant="contained"
            sx={{
              bgcolor: "#3169e8",
              textTransform: "none",
              fontSize: 14,
              fontWeight: 600,
              borderRadius: "10px",
              px: 2.25,
              height: 46,
              minWidth: {
                xs: 0,
                sm: 140,
              },
              flex: {
                xs: 1,
                sm: "unset",
              },
              boxShadow: "none",
              "&:hover": {
                bgcolor: "#2458cf",
                boxShadow: "none",
              },
            }}
          >
            Submit entry
          </Button>
        </Box>
      </Box>

      {/* =================================================
          STATUS STEPS
       ================================================= */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: {
            xs: 0.75,
            sm: 1.1,
          },
          mb: 2.5,
          flexWrap: "wrap",
        }}
      >
        <Chip
          label="Draft"
          size="small"
          sx={{
            bgcolor: "#3169e8",
            color: "#FFF",
            fontSize: 16,
            fontWeight: 700,
            height: 56,
            minWidth: {
              xs: 84,
              sm: 100,
            },
            px: {
              xs: 2,
              sm: 2.5,
            },
            borderRadius: "11px",

            "& .MuiChip-label": {
              color: "#000",
            },
          }}
        />

        <Typography
          sx={{
            color: "#94a3b8",
            fontSize: 12,
          }}
        >
          →
        </Typography>

        <Chip
          label="Submitted"
          size="small"
          variant="outlined"
          sx={{
            bgcolor: "#fff",
            color: "#000",
            borderColor: "#dbe3ec",
            fontSize: 16,
            fontWeight: 600,
            height: 56,
            minWidth: {
              xs: 112,
              sm: 135,
            },
            px: {
              xs: 2,
              sm: 2.5,
            },
            borderRadius: "11px",

            "& .MuiChip-label": {
              color: "#000",
            },
          }}
        />

        <Typography
          sx={{
            color: "#94a3b8",
            fontSize: 12,
          }}
        >
          →
        </Typography>

        <Chip
          label="Reviewed"
          size="small"
          variant="outlined"
          sx={{
            bgcolor: "#fff",
            color: "#000",
            borderColor: "#dbe3ec",
            fontSize: 16,
            fontWeight: 600,
            height: 56,
            minWidth: {
              xs: 108,
              sm: 125,
            },
            px: {
              xs: 2,
              sm: 2.5,
            },
            borderRadius: "11px",

            "& .MuiChip-label": {
              color: "#000",
            },
          }}
        />

        <Typography
          sx={{
            color: "#94a3b8",
            fontSize: 12,
          }}
        >
          →
        </Typography>

        <Chip
          label="Locked"
          size="small"
          variant="outlined"
          sx={{
            bgcolor: "#fff",
            color: "#000",
            borderColor: "#dbe3ec",
            fontSize: 16,
            fontWeight: 600,
            height: 56,
            minWidth: {
              xs: 90,
              sm: 108,
            },
            px: {
              xs: 2,
              sm: 2.5,
            },
            borderRadius: "11px",

            "& .MuiChip-label": {
              color: "#000",
            },
          }}
        />

        <Box
          sx={{
            flex: 1,
            minWidth: 16,
          }}
        />

        <Typography
          sx={{
            fontSize: 9,
            fontWeight: 700,
            color: "#64748b",
            border: "1px solid #dbe3ec",
            bgcolor: "#fff",
            borderRadius: 1,
            px: 1,
            py: 0.5,
          }}
        >
          EDITABLE — DRAFT
        </Typography>
      </Box>

      {/* =================================================
          ENTRY FORM
       ================================================= */}

      <Card
        elevation={0}
        sx={{
          borderRadius: "14px",
          border: "1px solid #dbe3ec",
          bgcolor: "#fff",
          p: {
            xs: 2,
            sm: 2.5,
            md: 2.75,
          },
          mb: 2.5,
          boxShadow: "0 2px 8px rgba(15,23,42,0.05)",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1fr 1fr",
            },
            columnGap: 2.5,
            rowGap: 2.75,
          }}
        >
          <Field label="Production date">
            <TextField
              type="date"
              defaultValue="2025-05-20"
              fullWidth
              size="small"
              sx={inputSx}
            />
          </Field>

          <Field label="Project">
            <TextField
              select
              defaultValue="ABC Medical Imaging"
              fullWidth
              size="small"
              sx={inputSx}
            >
              <MenuItem value="ABC Medical Imaging">
                ABC Medical Imaging
              </MenuItem>
              <MenuItem value="Ortho Kids">Ortho Kids</MenuItem>
              <MenuItem value="Spine Indexing">Spine Indexing</MenuItem>
            </TextField>
          </Field>

          <Field label="Batch / Job ID">
            <TextField
              placeholder="e.g. ABC-2025-0520-14"
              fullWidth
              size="small"
              sx={inputSx}
            />
          </Field>

          <Field label="Reporting category">
            <TextField
              select
              defaultValue="Implant Indexing"
              fullWidth
              size="small"
              sx={inputSx}
            >
              <MenuItem value="Implant Indexing">
                Implant Indexing
              </MenuItem>
              <MenuItem value="General Indexing">
                General Indexing
              </MenuItem>
              <MenuItem value="Review">Review</MenuItem>
            </TextField>
          </Field>

          <Field label="Documents received">
            <TextField
              defaultValue="60"
              fullWidth
              size="small"
              sx={inputSx}
            />
          </Field>

          <Field label="Documents completed">
            <TextField
              defaultValue="45"
              fullWidth
              size="small"
              sx={inputSx}
            />
          </Field>

          <Field label="Batches processed">
            <TextField
              defaultValue="4"
              fullWidth
              size="small"
              sx={inputSx}
            />
          </Field>

          <Field label="Errors flagged">
            <TextField
              defaultValue="1"
              fullWidth
              size="small"
              sx={inputSx}
            />
          </Field>

          <Field
            label="Notes / remarks"
            gridColumn={{
              xs: "auto",
              md: "1 / -1",
            }}
          >
            <TextField
              placeholder="Optional — anything the reviewer should know"
              multiline
              rows={1}
              fullWidth
              size="small"
              sx={textareaSx}
            />
          </Field>
        </Box>
      </Card>

      <Typography
        sx={{
          color: "#0f172a",
          fontSize: 13,
          fontWeight: 700,
          mb: 0.75,
        }}
      >
        Today&apos;s entries
      </Typography>

      <TableContainer
        component={Card}
        elevation={0}
        sx={{
          borderRadius: "14px",
          border: "1px solid #dbe3ec",
          overflowX: "auto",
          overflowY: "hidden",
          boxShadow: "0 2px 8px rgba(15,23,42,0.05)",
        }}
      >
        <Table
          size="small"
          sx={{
            minWidth: 820,
          }}
        >
          <TableHead>
            <TableRow
              sx={{
                bgcolor: "#f8fafc",
              }}
            >
              {[
                "DATE",
                "PROJECT",
                "BATCH",
                "RECEIVED",
                "COMPLETED",
                "STATUS",
                "",
              ].map((heading, index) => (
                <TableCell
                  key={`${heading}-${index}`}
                  sx={{
                    color: "#64748b",
                    fontSize: 11,
                    fontWeight: 700,
                    py: 1,
                    borderBottom: "1px solid #e2e8f0",
                  }}
                >
                  {heading}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {entriesTeamLead.map((entry, index) => (
              <TableRow key={index}>
                <TableCell
                  sx={{
                    fontSize: 13,
                    color: "#475569",
                    py: 1.15,
                  }}
                >
                  {entry.date}
                </TableCell>

                <TableCell
                  sx={{
                    fontSize: 13,
                    color: "#334155",
                    py: 1.15,
                  }}
                >
                  {entry.project}
                </TableCell>

                <TableCell
                  sx={{
                    fontSize: 13,
                    color: "#64748b",
                    py: 1.15,
                  }}
                >
                  {entry.batch}
                </TableCell>

                <TableCell
                  sx={{
                    fontSize: 13,
                    color: "#334155",
                    py: 1.15,
                  }}
                >
                  {entry.received}
                </TableCell>

                <TableCell
                  sx={{
                    fontSize: 13,
                    color: "#334155",
                    py: 1.15,
                  }}
                >
                  {entry.completed}
                </TableCell>

                <TableCell sx={{ py: 1.15 }}>
                  <StatusChipTeamLead status={entry.status} />
                </TableCell>

                <TableCell sx={{ py: 0.8 }}>
                  {entry.status === "DRAFT" && (
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{
                        minWidth: 28,
                        height: 28,
                        p: 0,
                        fontSize: 11,
                        textTransform: "none",
                        borderColor: "#e2e8f0",
                        color: "#475569",
                      }}
                    >
                      Edit
                    </Button>
                  )}

                  {entry.status === "LOCKED" && (
                    <Typography
                      sx={{
                        fontSize: 11,
                        color: "#64748b",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Request correction
                    </Typography>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

// =========================================================
// EXPORT
// =========================================================

export default function DailyEntry(props) {
  switch (props.roleKey) {
    case "indexer":
      return <IndexerDailyEntryIndexer {...props} />;

    case "teamLead":
      return <TeamLeadDailyEntryTeamLead {...props} />;

    default:
      return <IndexerDailyEntryIndexer {...props} />;
  }
}