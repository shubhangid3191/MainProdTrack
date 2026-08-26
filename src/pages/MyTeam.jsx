import { Box, Button, Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Avatar } from '@mui/material';

const team = [
  ['PS', 'Priya Sharma', 'EMP-1042', 'ABC Medical, Ortho Kids', '45', 'PENDING', 'PRESENT'],
  ['AR', 'Aditya Rao', 'EMP-1088', 'Ortho Kids', '52', 'DONE', 'PRESENT'],
  ['SI', 'Sneha Iyer', 'EMP-1101', 'Spine Indexing', '38', 'DONE', 'PRESENT'],
  ['KP', 'Karan Patel', 'EMP-1130', 'ABC Medical', '0', 'DONE', 'LEAVE'],
  ['DM', 'Divya Menon', 'EMP-1155', 'Cardio Records', '49', 'PENDING', 'PRESENT'],
];

function GuideStatus({ status }) {
  return <Chip size="small" label={status} sx={{ height: 22, borderRadius: 2, fontSize: 10, fontWeight: 800, bgcolor: status === 'DONE' ? '#e2f6ec' : '#fff3dc', color: status === 'DONE' ? '#087443' : '#ad6900', border: `1px solid ${status === 'DONE' ? '#b7e6d0' : '#f0d18e'}` }} />;
}

function AttendanceStatus({ status }) {
  return <Chip size="small" label={status} sx={{ height: 22, borderRadius: 2, fontSize: 10, fontWeight: 800, bgcolor: status === 'PRESENT' ? '#e2f6ec' : '#eef2f6', color: status === 'PRESENT' ? '#087443' : '#64748b' }} />;
}

export default function MyTeam({ onNavigate }) {
  return <Box sx={{ maxWidth: 1100 }}>
    <Typography sx={{ color: '#667085', fontSize: 12 }}>ProdTrack · Team Lead</Typography>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2, mt: .7, mb: 2, '@media (max-width: 600px)': { flexDirection: 'column' } }}><Box><Typography sx={{ fontSize: 24, fontWeight: 800 }}>My team</Typography><Typography sx={{ color: '#667085', fontSize: 13, mt: .4 }}>Members reporting to you, their assignments and today&apos;s status.</Typography></Box><Button variant="contained" onClick={() => onNavigate?.('reports')}>Team report</Button></Box>
    <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #dbe3ec', borderRadius: 1.5, overflow: 'auto', boxShadow: '0 2px 6px rgba(16,35,61,.08)' }}><Table size="small" sx={{ minWidth: 820 }}><TableHead><TableRow sx={{ bgcolor: '#f8fafc' }}>{['MEMBER', 'EMP ID', 'PROJECT(S)', 'TODAY', 'GUIDE ACK.', 'STATUS'].map(header => <TableCell key={header} sx={{ color: '#526581', fontSize: 11, fontWeight: 800, py: 1.4 }}>{header}</TableCell>)}</TableRow></TableHead><TableBody>{team.map(([initials, name, employeeId, projects, today, guide, attendance]) => <TableRow key={name} hover><TableCell sx={{ py: 1.2 }}><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><Avatar sx={{ width: 28, height: 28, bgcolor: '#5b5ce2', fontSize: 11, fontWeight: 700 }}>{initials}</Avatar><Typography sx={{ fontSize: 13 }}>{name}</Typography></Box></TableCell><TableCell sx={{ color: '#667085', fontSize: 13 }}>{employeeId}</TableCell><TableCell sx={{ fontSize: 13 }}>{projects}</TableCell><TableCell sx={{ fontSize: 13, fontWeight: 700 }}>{today}</TableCell><TableCell><GuideStatus status={guide} /></TableCell><TableCell><AttendanceStatus status={attendance} /></TableCell></TableRow>)}</TableBody></Table></TableContainer>
  </Box>;
}
