import { useState } from "react";
import CorePageShell, { CoreFormDialog, CoreTable } from "../components/CorePageShell.jsx";
import { Alert, Box, Snackbar } from "@mui/material";
const rowsCoreTeam = [['ABC', 'ABC Medical Imaging', 'ABC Medical', 'Implant Indexing', '6:00 PM', '8', 'ACTIVE'], ['ORT', 'Ortho Kids', 'Ortho Kids Ltd', 'Field Mapping', '7:00 PM', '5', 'ACTIVE'], ['SPN', 'Spine Indexing', 'SpineCare', 'Indexing', '6:00 PM', '6', 'ACTIVE'], ['CAR', 'Cardio Records', 'CardioCorp', 'QC Review', '8:00 PM', '4', 'ACTIVE'], ['NEU', 'Neuro Scan', 'NeuroLab', 'Indexing', '—', '3', 'INACTIVE']];
const fieldsCoreTeam = [{
  name: 'code',
  label: 'Project code',
  placeholder: 'e.g. ABC'
}, {
  name: 'name',
  label: 'Project name',
  placeholder: 'e.g. ABC Medical Imaging'
}, {
  name: 'client',
  label: 'Client name',
  placeholder: 'Enter client name'
}, {
  name: 'category',
  label: 'Reporting category',
  placeholder: 'Select category',
  options: ['Implant Indexing', 'Field Mapping', 'Indexing', 'QC Review']
}, {
  name: 'lock',
  label: 'Auto-lock timing',
  placeholder: '18:00',
  type: 'time'
}, {
  name: 'team',
  label: 'Assigned team',
  placeholder: 'Select team',
  options: ["Rohan's Team", 'Meera\'s Team']
}, {
  name: 'start',
  label: 'Start date',
  placeholder: 'dd-mm-yyyy',
  type: 'date'
}, {
  name: 'status',
  label: 'Status',
  placeholder: 'Active',
  options: ['Active', 'Inactive']
}];
function ProjectMasterCoreTeam({
  breadcrumb = 'Core Team'
}) {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const openEdit = () => {
    setEdit(true);
    setOpen(true);
  };
  return <><CorePageShell breadcrumb={breadcrumb} title="Project master" description="Create and manage projects — no code changes needed. Configure locking, category and team." actionLabel="New project" actionHandler={() => {
      setEdit(false);
      setOpen(true);
    }}><CoreTable columns={['CODE', 'PROJECT', 'CLIENT', 'CATEGORY', 'AUTO-LOCK', 'TEAM', 'STATUS']} rows={rowsCoreTeam} onAction={openEdit} /></CorePageShell><CoreFormDialog open={open} onClose={() => setOpen(false)} title={edit ? 'Project details' : 'Project details'} fields={fieldsCoreTeam} submitLabel="Save project" /></>;
}
const rowsAdministrator = [["ABC", "ABC Medical Imaging", "ABC Medical", "Implant Indexing", "6:00 PM", "8", "ACTIVE"], ["ORT", "Ortho Kids", "Ortho Kids Ltd", "Field Mapping", "7:00 PM", "5", "ACTIVE"], ["SPN", "Spine Indexing", "SpineCare", "Indexing", "6:00", "6", "ACTIVE"], ["CAR", "Cardio Records", "CardioCrop", "QC Review", "8:00", "4", "ACTIVE"], ["NEU", "Neuro Scan", "NeuroLab", "Indexing", "_", "3", "ACTIVE"]];
const fieldsAdministrator = [{
  name: "name",
  label: "Project name",
  placeholder: "e.g. ABC Medical Imaging"
}, {
  name: "category",
  label: "Category",
  placeholder: "e.g. Ortho / Imaging"
}, {
  name: "lead",
  label: "Team lead",
  placeholder: "Rohan Mehta",
  options: ["Rohan Mehta", "Meera Nair"]
}, {
  name: "indexers",
  label: "No. of indexers",
  placeholder: "10",
  type: "number"
}, {
  name: "status",
  label: "Status",
  placeholder: "Active",
  options: ["Active", "Inactive"]
}];
function ProjectMasterAdministrator() {
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  return <>
      <CorePageShell breadcrumb="Administrator" title="Project Master" description="Create and manage projects — no code changes needed. Configure locking, category and team." actionLabel="Add project" actionHandler={() => setOpen(true)}>
        <Box sx={{
        width: "100%",
        overflowX: "auto"
      }}>
          <CoreTable columns={["CODE", "PROJECT", "CLIENT", "CATEGORY", "AUTO-LOCK", "TEAM", "STATUS"]} rows={rowsAdministrator} onAction={() => setOpen(true)} />
        </Box>
      </CorePageShell>

      <CoreFormDialog open={open} onClose={() => {
      setOpen(false);
      setSaved(true);
    }} title="Project details" fields={fieldsAdministrator} submitLabel="Save project" />

      <Snackbar open={saved} autoHideDuration={2500} onClose={() => setSaved(false)} anchorOrigin={{
      vertical: "bottom",
      horizontal: "right"
    }}>
        <Alert severity="success" variant="filled" onClose={() => setSaved(false)}>
          Project saved successfully
        </Alert>
      </Snackbar>
    </>;
}
void ProjectMasterAdministrator;
export default function ProjectMaster(props) {
  switch (props.roleKey) {
    case "coreTeam":
      return <ProjectMasterCoreTeam {...props} />;
    case "administrator":
      return <ProjectMasterCoreTeam {...props} breadcrumb="Administrator" />;
    default:
      return <ProjectMasterCoreTeam {...props} />;
  }
}
