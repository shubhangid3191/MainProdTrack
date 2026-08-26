import { useState } from "react";
import { Chip, Box } from "@mui/material";
import CorePageShell, { CoreFormDialog, CoreTable, Person } from "../components/CorePageShell.jsx";
const rowsCoreTeam = [[<Person initials="PS" name="Priya Sharma" />, 'EMP-1042', 'Indexing Ops', <Chip label="INDEXER" size="small" color="primary" />, 'Rohan Mehta', '3', 'ACTIVE'], [<Person initials="RM" name="Rohan Mehta" />, 'EMP-0771', 'Indexing Ops', <Chip label="TEAM LEAD" size="small" color="primary" />, 'Meera Nair', '4', 'ACTIVE'], [<Person initials="MN" name="Meera Nair" />, 'EMP-0310', 'Production Core', <Chip label="CORE TEAM" size="small" color="primary" />, '—', 'All', 'ACTIVE'], [<Person initials="AR" name="Aditya Rao" />, 'EMP-1088', 'Indexing Ops', <Chip label="INDEXER" size="small" color="primary" />, 'Rohan Mehta', '2', 'ACTIVE'], [<Person initials="KP" name="Karan Patel" />, 'EMP-1130', 'Indexing Ops', <Chip label="INDEXER" size="small" color="primary" />, 'Rohan Mehta', '1', 'INACTIVE']];
const fieldsCoreTeam = [{
  name: 'employee',
  label: 'Employee name',
  placeholder: 'Full name'
}, {
  name: 'email',
  label: 'Email',
  placeholder: 'name@company.com',
  type: 'email'
}, {
  name: 'department',
  label: 'Department',
  placeholder: 'Indexing Ops'
}, {
  name: 'designation',
  label: 'Designation',
  placeholder: 'e.g. Senior Indexer'
}, {
  name: 'role',
  label: 'Role',
  placeholder: 'Indexer',
  options: ['Indexer', 'Team Lead', 'Core Team', 'Administrator']
}, {
  name: 'lead',
  label: 'Team lead',
  placeholder: 'Rohan Mehta',
  options: ['Rohan Mehta', 'Meera Nair']
}, {
  name: 'status',
  label: 'Status',
  placeholder: 'Active',
  options: ['Active', 'Inactive']
}, {
  name: 'projects',
  label: 'Assigned projects',
  placeholder: 'Select...',
  options: ['ABC Medical Imaging', 'Ortho Kids', 'Spine Indexing', 'All projects']
}];
function UserMasterCoreTeam() {
  const [open, setOpen] = useState(false);
  return <><CorePageShell title="Users" description="Centralised user management — roles, departments and assignments." actionLabel="Add user" actionHandler={() => setOpen(true)}><CoreTable columns={['EMPLOYEE', 'EMP ID', 'DEPT', 'ROLE', 'TEAM LEAD', 'PROJECTS', 'STATUS']} rows={rowsCoreTeam} onAction={() => setOpen(true)} /></CorePageShell><CoreFormDialog open={open} onClose={() => setOpen(false)} title="User details" fields={fieldsCoreTeam} submitLabel="Save user" /></>;
}
const rowsAdministrator = [[<Person initials="PS" name="Priya Sharma" />, "EMP-1042", "Indexing Ops", <Chip label="INDEXER" size="small" color="primary" />, "Rohan Mehta", "3", "ACTIVE"], [<Person initials="RM" name="Rohan Mehta" />, "EMP-0771", "Indexing Ops", <Chip label="TEAM LEAD" size="small" color="primary" />, "Meera Nair", "4", "ACTIVE"], [<Person initials="MN" name="Meera Nair" />, "EMP-0310", "Production Core", <Chip label="CORE TEAM" size="small" color="primary" />, "—", "All", "ACTIVE"], [<Person initials="AR" name="Aditya Rao" />, "EMP-1088", "Indexing Ops", <Chip label="INDEXER" size="small" color="primary" />, "Rohan Mehta", "2", "ACTIVE"], [<Person initials="KP" name="Karan Patel" />, "EMP-1130", "Indexing Ops", <Chip label="INDEXER" size="small" color="primary" />, "Rohan Mehta", "1", "INACTIVE"], [<Person initials="SA" name="System Admin" />, "EMP-0001", "IT / Admin", <Chip label="ADMINISTRATOR" size="small" color="primary" />, "—", "All", "ACTIVE"]];
const fieldsAdministrator = [{
  name: "employee",
  label: "Employee name",
  placeholder: "Full name"
}, {
  name: "email",
  label: "Email",
  placeholder: "name@company.com",
  type: "email"
}, {
  name: "department",
  label: "Department",
  placeholder: "Indexing Ops"
}, {
  name: "designation",
  label: "Designation",
  placeholder: "e.g. Senior Indexer"
}, {
  name: "role",
  label: "Role",
  placeholder: "Indexer",
  options: ["Indexer", "Team Lead", "Core Team", "Administrator"]
}, {
  name: "lead",
  label: "Team lead",
  placeholder: "Rohan Mehta",
  options: ["Rohan Mehta", "Meera Nair"]
}, {
  name: "status",
  label: "Status",
  placeholder: "Active",
  options: ["Active", "Inactive"]
}, {
  name: "projects",
  label: "Assigned projects",
  placeholder: "Select...",
  options: ["ABC Medical Imaging", "Ortho Kids", "Spine Indexing", "All projects"]
}];
function UserMasterAdministrator() {
  const [open, setOpen] = useState(false);
  return <>
      <CorePageShell breadcrumb="Administrator" title="User master" description="Centralised user management — roles, departments and assignments." actionLabel="Add user" actionHandler={() => setOpen(true)}>
        <Box sx={{
        width: "100%",
        overflowX: "auto"
      }}>
          <CoreTable columns={["EMPLOYEE", "EMP ID", "DEPT", "ROLE", "TEAM LEAD", "PROJECTS", "STATUS"]} rows={rowsAdministrator} onAction={() => setOpen(true)} />
        </Box>
      </CorePageShell>

      <CoreFormDialog open={open} onClose={() => setOpen(false)} title="User details" fields={fieldsAdministrator} submitLabel="Save user" />
    </>;
}
export default function UserMaster(props) {
  switch (props.roleKey) {
    case "coreTeam":
      return <UserMasterCoreTeam {...props} />;
    case "administrator":
      return <UserMasterAdministrator {...props} />;
    default:
      return <UserMasterCoreTeam {...props} />;
  }
}
