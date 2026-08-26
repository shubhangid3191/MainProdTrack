import { useState } from 'react';
import { Alert, Avatar, Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Paper, Snackbar, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';

const icons = ['📊', '✅', '◷', '👥', '📘', '🛡️', '🔗', '📁'];

export function CoreMetricCards({ items }) {
  return <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(150px, 1fr))', gap: 2, mb: 2, '@media (max-width: 800px)': { gridTemplateColumns: 'repeat(2, 1fr)' }, '@media (max-width: 480px)': { gridTemplateColumns: '1fr' } }}>
    {items.map(([label, value, note], index) => <Paper key={label} elevation={0} sx={{ p: 1.7, minHeight: 98, border: '1px solid #dbe3ec', borderRadius: 1.5, boxShadow: '0 2px 5px rgba(16,35,61,.08)', display: 'flex', alignItems: 'center', gap: 1.3 }}><Box sx={{ width: 45, height: 45, flexShrink: 0, borderRadius: 1.3, bgcolor: ['#eaf1ff', '#e2f6ec', '#fff3dc', '#f0e9ff'][index % 4], display: 'grid', placeItems: 'center', fontSize: 22 }}>{icons[index % icons.length]}</Box><Box><Typography sx={{ color: '#667085', fontSize: 12 }}>{label}</Typography><Typography sx={{ fontSize: 25, lineHeight: 1.12, fontWeight: 800 }}>{value}</Typography>{note && <Typography sx={{ color: note.startsWith('-') ? '#dc3545' : '#15966a', fontSize: 11 }}>{note}</Typography>}</Box></Paper>)}
  </Box>;
}

export function CoreTable({ columns, rows, actionLabel = 'Edit', onAction, onCellAction, actionVariant = 'outlined' }) {
  return <Paper elevation={0} sx={{ border: '1px solid #dbe3ec', borderRadius: 1.5, overflow: 'auto' }}><Table size="small" sx={{ minWidth: 680 }}><TableHead><TableRow sx={{ bgcolor: '#f8fafc' }}>{columns.map(column => <TableCell key={column} sx={{ fontWeight: 800, fontSize: 11, color: '#526581', py: 1.4 }}>{column}</TableCell>)}{actionLabel && <TableCell />}</TableRow></TableHead><TableBody>{rows.map((row, rowIndex) => <TableRow key={row[0]} hover>{row.map((cell, cellIndex) => <TableCell key={`${row[0]}-${cellIndex}`} align={cell === '●' || cell === '○' ? 'center' : 'left'}>{cell === '●' || cell === '○' ? <Box component="button" type="button" aria-label={cell === '●' ? 'Revoke project access' : 'Grant project access'} onClick={() => onCellAction?.(rowIndex, cellIndex)} sx={{ width: 10, height: 10, p: 0, minWidth: 10, borderRadius: '50%', border: cell === '●' ? '1px solid #15966a' : '1px solid #cbd5e1', bgcolor: cell === '●' ? '#15966a' : 'transparent', cursor: onCellAction ? 'pointer' : 'default', '&:hover': onCellAction ? { transform: 'scale(1.25)' } : {} }} /> : cellIndex === row.length - 1 && ['Active', 'ACTIVE', 'Pending', 'PENDING', 'INACTIVE'].includes(cell) ? <Chip size="small" label={cell} color={cell.toLowerCase() === 'active' ? 'success' : cell.toLowerCase() === 'pending' ? 'warning' : 'default'} sx={{ fontSize: 10, fontWeight: 800 }} /> : cell}</TableCell>)}{actionLabel && <TableCell><Button size="small" variant={actionVariant} onClick={() => onAction?.(row, rowIndex)} sx={actionVariant === 'text' ? { color: '#10233d', minWidth: 0, px: 0, fontSize: 12 } : {}}>{actionLabel}</Button></TableCell>}</TableRow>)}</TableBody></Table></Paper>;
}


export default function CorePageShell({ title, description, actionLabel, actionIcon, actionHandler, headerExtra, children, breadcrumb = 'Core Team' }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const openAction = () => setDialogOpen(true);
  const closeAction = () => setDialogOpen(false);
  const completeAction = () => { setDialogOpen(false); setNotice(`${actionLabel || 'Action'} completed`); };

  return <Box sx={{ width: '100%' }}>
    <Typography sx={{ color: '#667085', fontSize: 12 }}>ProdTrack · {breadcrumb}</Typography>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2, mb: 2, mt: .7, '@media (max-width: 600px)': { flexDirection: 'column' } }}><Box><Typography sx={{ fontSize: 24, fontWeight: 800 }}>{title}</Typography><Typography sx={{ color: '#667085', fontSize: 13, mt: .4 }}>{description}</Typography></Box><Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', justifyContent: 'flex-end' }}>{headerExtra}{actionLabel && <Button variant="contained" startIcon={actionIcon === null ? undefined : actionIcon || <AddRoundedIcon />} onClick={actionHandler || openAction}>{actionLabel}</Button>}</Box></Box>
    {children}
    <Dialog open={dialogOpen} onClose={closeAction} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 2 } }}><DialogTitle sx={{ fontWeight: 800, display: 'flex', justifyContent: 'space-between' }}>{actionLabel || 'Action'}<IconButton onClick={closeAction} size="small"><CloseRoundedIcon fontSize="small" /></IconButton></DialogTitle><Divider /><DialogContent sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, pt: 2, '@media (max-width: 560px)': { gridTemplateColumns: '1fr' } }}><TextField label="Name" placeholder="Enter details" fullWidth /><TextField label="Description" placeholder="Add a short description" fullWidth /></DialogContent><Divider /><DialogActions sx={{ p: 2, bgcolor: '#f8fafc' }}><Button onClick={closeAction}>Cancel</Button><Button variant="contained" onClick={completeAction}>Save</Button></DialogActions></Dialog>
    <Snackbar open={Boolean(notice)} autoHideDuration={2600} onClose={() => setNotice('')} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}><Alert onClose={() => setNotice('')} severity="success" variant="filled">{notice}</Alert></Snackbar>
  </Box>;
}

export function UploadAction() { return <UploadFileRoundedIcon />; }
export function SectionCard({ title, action, children }) { return <Paper elevation={0} sx={{ border: '1px solid #dbe3ec', borderRadius: 1.5, overflow: 'hidden', mb: 2 }}><Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid #e3e8ef', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><Typography sx={{ fontWeight: 800 }}>{title}</Typography>{action}</Box>{children}</Paper>; }
export function Person({ initials, name }) { return <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><Avatar sx={{ width: 28, height: 28, bgcolor: '#5b5ce2', fontSize: 11, fontWeight: 700 }}>{initials}</Avatar>{name}</Box>; }
export function CoreFormDialog({ open, onClose, title, fields, submitLabel = 'Save' }) {
  const [values, setValues] = useState({});
  const update = (name, value) => setValues(current => ({ ...current, [name]: value }));
  const submit = () => { onClose(); setValues({}); };
  return <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 2 } }}><DialogTitle sx={{ fontWeight: 800, display: 'flex', justifyContent: 'space-between' }}>{title}<IconButton onClick={onClose} size="small"><CloseRoundedIcon fontSize="small" /></IconButton></DialogTitle><Divider /><DialogContent sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, pt: 2, '@media (max-width: 560px)': { gridTemplateColumns: '1fr' } }}>{fields.map(field => <TextField key={field.name} label={field.label} placeholder={field.placeholder} type={field.type || 'text'} value={values[field.name] || ''} onChange={event => update(field.name, event.target.value)} select={Boolean(field.options)} SelectProps={{ native: true }} fullWidth>{field.options && <option value="">{field.placeholder || 'Select...'}</option>}{field.options?.map(option => <option key={option} value={option}>{option}</option>)}</TextField>)}</DialogContent><Divider /><DialogActions sx={{ p: 2, bgcolor: '#f8fafc' }}><Button onClick={onClose}>Cancel</Button><Button variant="contained" onClick={submit}>{submitLabel}</Button></DialogActions></Dialog>;
}
