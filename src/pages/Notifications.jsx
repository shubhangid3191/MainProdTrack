import { Box, Paper, Typography } from '@mui/material';

const notifications = [
	['🔴', '#dc3545', 'Missing daily entry', "You haven't submitted an entry for Spine Indexing today.", '2h ago'],
	['📘', '#3478ed', 'Guide update', 'ABC Medical Imaging Guide v2.3 needs acknowledgement.', '5h ago'],
	['✅', '#20a36b', 'Correction approved', 'Your correction on ABC-...-11 was approved by Rohan Mehta.', '1d ago'],
	['📈', '#8060d9', 'Backlog alert', 'Pending volume for Ortho Kids increased by 12%.', '1d ago'],
	['🔒', '#f59e0b', 'Entry lock reminder', 'Entries for 18 May lock at 6:00 PM today.', '2d ago'],
];

export default function Notifications({ user }) {
	return <Box sx={{ width: '100%' }}>
		<Typography sx={{ color: '#667085', fontSize: 12 }}>ProdTrack · {user?.role || 'User'}</Typography>
		<Typography sx={{ fontSize: 24, fontWeight: 800, mt: .7 }}>Notifications</Typography>
		<Typography sx={{ color: '#667085', fontSize: 13, mt: .4, mb: 2 }}>Email and system alerts. Reminders for entries, corrections and guide updates.</Typography>
		<Paper elevation={0} sx={{ border: '1px solid #dbe3ec', borderRadius: 1.5, overflow: 'hidden', boxShadow: '0 2px 6px rgba(16,35,61,.08)' }}>
			{notifications.map(([symbol, color, title, message, time], index) => <Box key={title} sx={{ minHeight: 68, px: 2.2, py: 1.35, display: 'flex', alignItems: 'center', gap: 1.8, borderBottom: index < notifications.length - 1 ? '1px solid #e3e8ef' : 'none' }}>
				<Box sx={{ width: 22, textAlign: 'center', color, fontSize: symbol === '●' ? 26 : 20, lineHeight: 1, flexShrink: 0 }}>{symbol}</Box>
				<Box sx={{ minWidth: 0, flex: 1 }}><Typography sx={{ fontSize: 13, fontWeight: 800, color: '#10233d' }}>{title}</Typography><Typography sx={{ fontSize: 12, color: '#667085', mt: .35 }}>{message}</Typography></Box>
				<Typography sx={{ color: '#667085', fontSize: 12, whiteSpace: 'nowrap', alignSelf: 'flex-start', mt: .2 }}>{time}</Typography>
			</Box>)}
		</Paper>
	</Box>;
}
