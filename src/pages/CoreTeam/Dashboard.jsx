import { Box, Button, Typography } from '@mui/material';
import CorePageShell, { CoreMetricCards, SectionCard } from '../../components/CorePageShell.jsx';

const projects = [['ABC Medical Imaging', 72, 720], ['Ortho Kids', 44, 440], ['Spine Indexing', 58, 580], ['Cardio Records', 30, 300], ['Neuro Scan', 18, 180]];

function TrendChart() {
  return <Box sx={{ px: 2, pt: 2, pb: 1 }}>
    <Box sx={{ height: 180 }}>
      <svg viewBox="0 0 800 180" width="100%" height="100%" preserveAspectRatio="none" role="img" aria-label="Monthly production trend">
        <defs><linearGradient id="dashboardTrendFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3478ed" stopOpacity=".24" /><stop offset="100%" stopColor="#3478ed" stopOpacity=".03" /></linearGradient></defs>
        <line x1="0" y1="158" x2="800" y2="158" stroke="#dbe3ec" />
        <polygon points="0,120 133,86 266,100 400,38 533,56 666,0 800,18 800,158 0,158" fill="url(#dashboardTrendFill)" />
        <polyline points="0,120 133,86 266,100 400,38 533,56 666,0 800,18" fill="none" stroke="#3478ed" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
        <polyline points="0,136 133,122 266,112 400,98 533,86 666,70 800,56" fill="none" stroke="#8052df" strokeWidth="2" strokeDasharray="7 7" />
      </svg>
    </Box>
    <Box sx={{ display: 'flex', gap: 2, pt: 1, color: '#526581', fontSize: 12 }}><span><i style={{ display: 'inline-block', width: 12, borderTop: '2px solid #3478ed', marginRight: 4, verticalAlign: 'middle' }} />Completed</span><span><i style={{ display: 'inline-block', width: 12, borderTop: '2px dashed #8052df', marginRight: 4, verticalAlign: 'middle' }} />Target</span></Box>
  </Box>;
}

export default function Dashboard({ onNavigate }) {
  return <CorePageShell title="Core team dashboard" description="Organisation-wide production, backlogs and compliance across all projects." actionLabel="Open analytics" actionHandler={() => onNavigate('analytics-kpis')} headerExtra={<Button variant="outlined" sx={{ borderColor: '#d0d7e2', color: '#10233d' }}>Export</Button>}>
    <CoreMetricCards items={[['Total Received', '12,480'], ['Total Completed', '9,860', '▲ 4.1% MoM'], ['Project Backlog', '2,620', '▲ 3.6%'], ['Active employees', '42', '6 projects']]}/>
    <Box sx={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 2, '@media (max-width: 800px)': { gridTemplateColumns: '1fr' } }}>
      <SectionCard title="Monthly production trend" action={<Button size="small" onClick={() => onNavigate('analytics-kpis')}>Analytics</Button>}><TrendChart /></SectionCard>
      <SectionCard title="Backlog by project"><Box sx={{ py: 1 }}>{projects.map(([name, width, total]) => <Box key={name} sx={{ display: 'grid', gridTemplateColumns: '135px 1fr 35px', gap: 1, alignItems: 'center', mb: 1.35, px: 2 }}><Typography sx={{ fontSize: 12, whiteSpace: 'nowrap' }}>{name}</Typography><Box sx={{ height: 8, bgcolor: '#edf1f6', borderRadius: 4, overflow: 'hidden' }}><Box sx={{ width: `${width}%`, height: '100%', bgcolor: '#5267e8', borderRadius: 4 }} /></Box><Typography sx={{ fontSize: 12, textAlign: 'right' }}>{total}</Typography></Box>)}</Box></SectionCard>
    </Box>
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, '@media (max-width: 700px)': { gridTemplateColumns: '1fr' } }}>
      {[['Pending corrections', '6', 'awaiting approval', '#df9324'], ['Guide compliance', '91%', 'acknowledged this cycle', '#15966a'], ['Missing entries', '3', 'employees today', '#dc3545']].map(([label, value, note, color]) => <SectionCard key={label} title={label} action={<Button size="small" onClick={() => label === 'Pending corrections' && onNavigate('corrections')}>View</Button>}><Box sx={{ textAlign: 'center', py: 2 }}><Typography sx={{ fontSize: 32, fontWeight: 800, color }}>{value}</Typography><Typography sx={{ color: '#667085', fontSize: 12 }}>{note}</Typography></Box></SectionCard>)}
    </Box>
  </CorePageShell>;
}
