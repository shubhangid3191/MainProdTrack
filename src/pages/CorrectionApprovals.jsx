import { Box, Typography, Button, Card, Chip, Avatar, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Alert, Snackbar } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { useState } from "react";
import CorePageShell, { CoreMetricCards, CoreTable } from "../components/CorePageShell.jsx";
const requestsIndexer = [{
  project: "ABC Medical Imaging",
  date: "19 May",
  field: "Implant Name",
  change: "ABC Screw 5.0 → ABC Screw 5.5"
}, {
  project: "ABC Medical Imaging",
  date: "19 May",
  field: "Implant Name",
  change: "ABC Screw 5.0 → ABC Screw 5.5"
}];
function IndexerCorrectionRequestsIndexer() {
  return <Box sx={{
    width: "100%"
  }}>
      {/* =================================================
          HEADER
       ================================================= */}

      <Box sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      mb: 2.2,
      gap: 2
    }}>
        <Box>
          <Typography sx={{
          color: "#6b7b91",
          fontSize: 13,
          mb: 0.7
        }}>
            ProdTrack · Indexer
          </Typography>

          <Typography sx={{
          fontSize: 25,
          fontWeight: 800,
          color: "#17233a"
        }}>
            My correction requests
          </Typography>

          <Typography sx={{
          mt: 0.7,
          color: "#718096",
          fontSize: 14
        }}>
            Request changes to locked entries. Each request is reviewed before
            the audit log updates.
          </Typography>
        </Box>

        <Button variant="contained" startIcon={<AddRoundedIcon />} sx={{
        mt: 1,
        height: 38,
        px: 1.8,
        borderRadius: "8px",
        textTransform: "none",
        fontWeight: 700,
        boxShadow: "none",
        backgroundColor: "#2f6df6",
        flexShrink: 0,
        "&:hover": {
          backgroundColor: "#2458cf",
          boxShadow: "none"
        }
      }}>
          New request
        </Button>
      </Box>

      {/* =================================================
          WORKFLOW
       ================================================= */}

      <Box sx={{
      display: "flex",
      alignItems: "center",
      gap: 0.8,
      mb: 2.2,
      flexWrap: "wrap"
    }}>
        {["Indexer submits", "Lead / Core review", "Approve / Reject", "Audit log update"].map((item, index) => <Box key={item} sx={{
        display: "flex",
        alignItems: "center"
      }}>
            <Box sx={{
          px: 1.6,
          py: 1,
          borderRadius: "8px",
          border: "1px solid #d7e0eb",
          backgroundColor: index === 0 ? "#2f6df6" : "#fff",
          color: index === 0 ? "#fff" : "#263b59",
          fontSize: 12,
          fontWeight: 700
        }}>
              {item}
            </Box>

            {index !== 3 && <ArrowForwardRoundedIcon sx={{
          mx: 0.4,
          color: "#8190a5",
          fontSize: 17
        }} />}
          </Box>)}
      </Box>

      {/* =================================================
          REQUEST TABLE
       ================================================= */}

      <Card elevation={0} sx={{
      border: "1px solid #dce3ec",
      borderRadius: "10px",
      boxShadow: "0 4px 12px rgba(15,23,42,.05)",
      overflow: "hidden",
      backgroundColor: "#fff"
    }}>
        {/* ================= TABLE HEADER ================= */}

        <Box sx={{
        display: "grid",
        gridTemplateColumns: "1.5fr .75fr 1fr 2fr 1.35fr .8fr",
        px: 1.6,
        py: 1.2,
        backgroundColor: "#f8fafc",
        borderBottom: "1px solid #dce3ec",
        columnGap: 1
      }}>
          {["PROJECT", "PROD. DATE", "FIELD", "OLD → NEW", "REQUESTED BY", "STATUS"].map(header => <Typography key={header} sx={{
          fontSize: 10,
          fontWeight: 700,
          color: "#64748b"
        }}>
              {header}
            </Typography>)}
        </Box>

        {/* ================= TABLE ROWS ================= */}

        {requestsIndexer.map((request, index) => <Box key={index} sx={{
        display: "grid",
        gridTemplateColumns: "1.5fr .75fr 1fr 2fr 1.35fr .8fr",
        px: 1.6,
        py: 1.4,
        columnGap: 1,
        alignItems: "center",
        borderBottom: index !== requestsIndexer.length - 1 ? "1px solid #e6ebf1" : "none"
      }}>
            {/* PROJECT */}

            <Typography sx={{
          fontSize: 12,
          color: "#243b5a"
        }}>
              {request.project}
            </Typography>

            {/* DATE */}

            <Typography sx={{
          fontSize: 12,
          color: "#243b5a"
        }}>
              {request.date}
            </Typography>

            {/* FIELD */}

            <Typography sx={{
          fontSize: 12,
          color: "#243b5a"
        }}>
              {request.field}
            </Typography>

            {/* OLD → NEW */}

            <Typography sx={{
          fontSize: 12,
          color: "#66768c"
        }}>
              {request.change}
            </Typography>

            {/* REQUESTED BY */}

            <Box sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.8
        }}>
              <Avatar sx={{
            width: 24,
            height: 24,
            fontSize: 10,
            fontWeight: 700,
            backgroundColor: "#6366df"
          }}>
                PS
              </Avatar>

              <Typography sx={{
            fontSize: 12,
            color: "#243b5a"
          }}>
                Priya Sharma
              </Typography>
            </Box>

            {/* STATUS */}

            <Chip label="PENDING" size="small" sx={{
          width: "fit-content",
          height: 22,
          backgroundColor: "#fff4db",
          color: "#c27a12",
          border: "1px solid #f2d39b",
          fontSize: 9,
          fontWeight: 800
        }} />
          </Box>)}
      </Card>
    </Box>;
}
const initialTeamLead = [['ABC Medical Imaging', '18 Aug 2026', 'Priya Sharma', '312', 'Pending'], ['Ortho Kids', '18 Aug 2026', 'Aditya Rao', '281', 'Pending'], ['Spine Indexing', '17 Aug 2026', 'Sneha Iyer', '214', 'Approved']];
function ApprovalsTeamLead() {
  const [rows, setRows] = useState(initialTeamLead);
  const update = (i, status) => setRows(r => r.map((x, n) => n === i ? [...x.slice(0, 4), status] : x));
  return <Box><Typography sx={{
      color: '#667085',
      fontSize: 12
    }}>ProdTrack · Team Lead</Typography><Typography sx={{
      fontSize: 24,
      fontWeight: 800
    }}>Approvals</Typography><Typography sx={{
      color: '#667085',
      fontSize: 13,
      mt: .4,
      mb: 2
    }}>Review team entries and correction requests before final submission.</Typography><TableContainer component={Paper} elevation={0} sx={{
      border: '1px solid #dbe3ec',
      borderRadius: 2
    }}><Table size="small"><TableHead><TableRow>{['PROJECT', 'DATE', 'EMPLOYEE', 'COMPLETED', 'STATUS', 'ACTION'].map(h => <TableCell key={h} sx={{
              fontWeight: 800,
              fontSize: 11
            }}>{h}</TableCell>)}</TableRow></TableHead><TableBody>{rows.map((r, i) => <TableRow key={r[0] + r[2]}>{r.slice(0, 4).map((c, j) => <TableCell key={j}>{c}</TableCell>)}<TableCell><Chip size="small" label={r[4]} color={r[4] === 'Approved' ? 'success' : 'warning'} /></TableCell><TableCell>{r[4] === 'Pending' && <><Button size="small" variant="contained" onClick={() => update(i, 'Approved')}>Approve</Button><Button size="small" sx={{
                  ml: .5
                }} onClick={() => update(i, 'Rejected')}>Reject</Button></>}</TableCell></TableRow>)}</TableBody></Table></TableContainer></Box>;
}
const rowsCoreTeam = [['ABC Medical Imaging', '19 May', 'Implant Name', 'ABC Screw 5.0 → ABC Screw 5.5', 'Priya Sharma', 'PENDING'], ['Ortho Kids', '18 May', 'Lot Number', 'LT-441 → LT-4471', 'Aditya Rao', 'PENDING'], ['Spine Indexing', '17 May', 'Page Type', 'Op → OP Note', 'Sneha Iyer', 'APPROVED'], ['Cardio Records', '16 May', 'Manufacturer', 'ABC → ABC Medical', 'Divya Menon', 'REJECTED']];
function CorrectionsCoreTeam() {
  return <CorePageShell title="Corrections" description="Review and approve correction requests raised on locked entries." actionLabel="Review queue"><CoreMetricCards items={[['Awaiting review', '6'], ['Approved (mo.)', '41'], ['Rejected (mo.)', '5'], ['Avg. turnaround', '4h']]} /><CoreTable columns={['PROJECT', 'PROD. DATE', 'FIELD', 'OLD → NEW', 'REQUESTED BY', 'STATUS']} rows={rowsCoreTeam} actionLabel="Review" /></CorePageShell>;
}
const rowsAdministrator = [["ABC-2024-0511", "Priya Sharma", "Implant Name", "Typo in device label", "20 May 09:12", "PENDING"], ["ORT-2024-0320", "Aditya Rao", "Procedure Code", "Wrong CPT code entered", "19 May 14:35", "PENDING"], ["SPI-2024-0198", "Karan Patel", "Patient DOB", "Date format mismatch", "18 May 11:00", "PENDING"], ["ABC-2024-0489", "Priya Sharma", "Surgeon Name", "Spelling correction", "17 May 16:20", "APPROVED"], ["CAR-2024-0077", "Sneha Iyer", "Report Date", "Incorrect month", "16 May 08:55", "REJECTED"]];
function CorrectionsAdministrator() {
  const [notice, setNotice] = useState("");
  function handleAction(row) {
    setNotice(`Correction for ${row[0]} updated`);
  }
  return <>
      <CorePageShell breadcrumb="Administrator" title="Corrections" description="Manage correction approval workflow and audit status." actionLabel={null}>
        {/* ── FILTER TABS ── */}
        <Box sx={{
        display: "flex",
        gap: 1,
        mb: 2,
        flexWrap: "wrap"
      }}>
          {["All", "Pending", "Approved", "Rejected"].map(tab => <Chip key={tab} label={tab} clickable variant={tab === "All" ? "filled" : "outlined"} color={tab === "All" ? "primary" : "default"} size="small" sx={{
          fontWeight: 600,
          fontSize: 11
        }} />)}
        </Box>

        <Box sx={{
        width: "100%",
        overflowX: "auto"
      }}>
          <CoreTable columns={["ENTRY ID", "EMPLOYEE", "FIELD", "REASON", "SUBMITTED", "STATUS"]} rows={rowsAdministrator} actionLabel="Review" actionVariant="text" onAction={handleAction} />
        </Box>
      </CorePageShell>

      <Snackbar open={Boolean(notice)} autoHideDuration={2500} onClose={() => setNotice("")} anchorOrigin={{
      vertical: "bottom",
      horizontal: "right"
    }}>
        <Alert severity="success" variant="filled" onClose={() => setNotice("")}>
          {notice}
        </Alert>
      </Snackbar>
    </>;
}
void ApprovalsTeamLead;
void CorrectionsAdministrator;
export default function CorrectionApprovals(props) {
  switch (props.roleKey) {
    case "indexer":
      return <IndexerCorrectionRequestsIndexer {...props} />;
    case "teamLead":
      return <CorrectionsCoreTeam {...props} />;
    case "coreTeam":
      return <CorrectionsCoreTeam {...props} />;
    case "administrator":
      return <CorrectionsCoreTeam {...props} />;
    default:
      return <IndexerCorrectionRequestsIndexer {...props} />;
  }
}
