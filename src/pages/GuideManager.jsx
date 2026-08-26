import { useState } from "react";
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Snackbar, TextField, Typography, Paper } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CorePageShell, { CoreTable, UploadAction, CoreFormDialog } from "../components/CorePageShell.jsx";
const guidesCoreTeam = [['ABC Medical Imaging', 'Indexing Guide', 'v2.3', '16 May 2025', 72, 'ACTIVE'], ['Ortho Kids', 'Field Mapping', 'v1.7', '14 May 2025', 65, 'ACTIVE'], ['Spine Indexing', 'Indexing Guide', 'v3.1', '02 May 2025', 98, 'ACTIVE'], ['Cardio Records', 'QC Guide', 'v1.2', '28 Apr 2025', 100, 'ACTIVE']];
function AcknowledgementCoreTeam({
  value
}) {
  return <Box sx={{
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    minWidth: 145
  }}><Box sx={{
      width: 105,
      height: 8,
      bgcolor: '#edf1f6',
      borderRadius: 4,
      overflow: 'hidden'
    }}><Box sx={{
        width: `${value}%`,
        height: '100%',
        bgcolor: '#7251d6',
        borderRadius: 4
      }} /></Box><Typography sx={{
      fontSize: 12
    }}>{value}%</Typography></Box>;
}
function GuideManagerCoreTeam() {
  const [uploadOpen, setUploadOpen] = useState(false);
  const [notice, setNotice] = useState(false);
  const rows = guidesCoreTeam.map(([project, guide, version, updated, ack, status]) => [project, guide, <strong key={version}>{version}</strong>, updated, <AcknowledgementCoreTeam key={`${project}-ack`} value={ack} />, status]);
  const upload = () => {
    setUploadOpen(false);
    setNotice(true);
  };
  return <><CorePageShell title="Guide manager" description="Upload guide versions, track acknowledgements and send updates to assigned indexers." actionLabel="Upload new version" actionIcon={<UploadAction />} actionHandler={() => setUploadOpen(true)}>
    <Typography sx={{
        fontSize: 14,
        fontWeight: 800,
        mb: 1.2
      }}>Mandatory acknowledgement workflow</Typography>
    <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        mb: 2,
        flexWrap: 'wrap'
      }}>{['Upload guide', 'Notify indexers', 'Shown on login', 'Read & acknowledge', 'System records'].map((step, index) => <Box key={step} sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}><Button variant={index === 4 ? 'contained' : 'outlined'} size="small" sx={{
            minHeight: 38,
            px: 1.7
          }}>{step}</Button>{index < 4 && <Typography sx={{
            color: '#94a3b8',
            fontSize: 18
          }}>→</Typography>}</Box>)}</Box>
    <Box sx={{
        border: '1px solid #dbe3ec',
        borderRadius: 1.5,
        overflow: 'hidden',
        bgcolor: '#fff'
      }}><Typography sx={{
          px: 2,
          py: 1.5,
          fontWeight: 800,
          borderBottom: '1px solid #e3e8ef'
        }}>Guides</Typography><CoreTable columns={['PROJECT', 'GUIDE', 'VERSION', 'UPDATED', 'ACK. %', 'STATUS']} rows={rows} actionLabel="Compliance" actionVariant="text" /></Box>
  </CorePageShell>
  <Dialog open={uploadOpen} onClose={() => setUploadOpen(false)} fullWidth maxWidth="sm" PaperProps={{
      sx: {
        borderRadius: 2
      }
    }}><DialogTitle sx={{
        fontWeight: 800,
        display: 'flex',
        justifyContent: 'space-between'
      }}>Upload guide<IconButton size="small" onClick={() => setUploadOpen(false)}><CloseRoundedIcon fontSize="small" /></IconButton></DialogTitle><Divider /><DialogContent sx={{
        display: 'grid',
        gap: 2,
        pt: 2
      }}><TextField label="Guide name" placeholder="e.g. Indexing Guide" fullWidth /><Button component="label" variant="outlined" sx={{
          justifyContent: 'flex-start',
          py: 1.5
        }}>Choose guide file<input hidden type="file" /></Button><TextField label="Version" placeholder="e.g. v2.4" fullWidth /></DialogContent><Divider /><DialogActions sx={{
        p: 2,
        bgcolor: '#f8fafc'
      }}><Button onClick={() => setUploadOpen(false)}>Cancel</Button><Button variant="contained" onClick={upload}>Upload guide</Button></DialogActions></Dialog>
  <Snackbar open={notice} autoHideDuration={2800} onClose={() => setNotice(false)} anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right'
    }}><Alert severity="success" variant="filled" onClose={() => setNotice(false)}>Upload dialog successfully completed</Alert></Snackbar></>;
}
const rowsAdministrator = [['ABC Medical v2.3', 'ABC Medical Imaging', '20 May 2026', '50 / 50', 'ACTIVE'], ['Ortho Kids v1.1', 'Ortho Kids', '14 Apr 2026', '9 / 9', 'ACTIVE'], ['Spine Guide v3.0', 'Spine Indexing', '02 Mar 2026', '11 / 12', 'ACTIVE'], ['Cardio v1.0', 'Cardio Records', '10 Jan 2026', '7 / 7', 'ACTIVE'], ['Neuro Guide v2.0', 'Neuro Scan', '01 Jun 2025', '5 / 5', 'INACTIVE']];
const fieldsAdministrator = [{
  name: 'title',
  label: 'Guide title',
  placeholder: 'e.g. ABC Medical v2.4'
}, {
  name: 'project',
  label: 'Project',
  placeholder: 'Select project',
  options: ['ABC Medical Imaging', 'Ortho Kids', 'Spine Indexing', 'Cardio Records', 'Neuro Scan']
}, {
  name: 'version',
  label: 'Version',
  placeholder: 'e.g. 2.4'
}, {
  name: 'status',
  label: 'Status',
  placeholder: 'Active',
  options: ['Active', 'Inactive']
}];
function GuideManagerAdministrator() {
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  return <>
      <CorePageShell breadcrumb="Administrator" title="Guide Manager" description="Manage guide versions and acknowledgement rules." actionLabel="Upload guide" actionHandler={() => setOpen(true)}>
        {/* ── COMPLIANCE SUMMARY ── */}
        <Box sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(3, 1fr)'
        },
        gap: 2,
        mb: 2
      }}>
          {[['Total guides', '5', '#3475ee'], ['Fully acknowledged', '4', '#20a36f'], ['Pending acknowledgement', '1', '#e09a22']].map(([label, value, color]) => <Paper key={label} elevation={0} sx={{
          p: 2,
          border: '1px solid #dbe3ec',
          borderRadius: 1.5,
          bgcolor: '#fff',
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>
              <Typography sx={{
            fontSize: 28,
            fontWeight: 800,
            color
          }}>{value}</Typography>
              <Typography sx={{
            fontSize: 13,
            color: '#526581'
          }}>{label}</Typography>
            </Paper>)}
        </Box>

        <Box sx={{
        width: '100%',
        overflowX: 'auto'
      }}>
          <CoreTable columns={['GUIDE', 'PROJECT', 'UPLOADED', 'ACKNOWLEDGED', 'STATUS']} rows={rowsAdministrator} actionLabel="View" actionVariant="text" onAction={() => {}} />
        </Box>
      </CorePageShell>

      <CoreFormDialog open={open} onClose={() => {
      setOpen(false);
      setSaved(true);
    }} title="Upload guide" fields={fieldsAdministrator} submitLabel="Upload" />

      <Snackbar open={saved} autoHideDuration={2500} onClose={() => setSaved(false)} anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right'
    }}>
        <Alert severity="success" variant="filled" onClose={() => setSaved(false)}>
          Guide uploaded successfully
        </Alert>
      </Snackbar>
    </>;
}
void GuideManagerAdministrator;
export default function GuideManager(props) {
  switch (props.roleKey) {
    case "coreTeam":
      return <GuideManagerCoreTeam {...props} />;
    case "administrator":
      return <GuideManagerCoreTeam {...props} />;
    default:
      return <GuideManagerCoreTeam {...props} />;
  }
}
