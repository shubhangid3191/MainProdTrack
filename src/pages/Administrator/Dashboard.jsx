import { Box, Button, Typography } from '@mui/material';
import CorePageShell, { CoreMetricCards, SectionCard } from '../../components/CorePageShell.jsx';

const projects = [
  ['ABC Medical Imaging', 72, 720],
  ['Ortho Kids', 44, 440],
  ['Spine Indexing', 58, 580],
  ['Cardio Records', 30, 300],
  ['Neuro Scan', 18, 180],
];

function TrendChart() {
  return (
    <Box sx={{ px: 2, pt: 2, pb: 1 }}>
      <Box sx={{ height: { xs: 130, sm: 180 } }}>
        <svg
          viewBox="0 0 800 180"
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          role="img"
          aria-label="Monthly production trend"
        >
          <defs>
            <linearGradient id="adminTrendFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3478ed" stopOpacity=".24" />
              <stop offset="100%" stopColor="#3478ed" stopOpacity=".03" />
            </linearGradient>
          </defs>
          <line x1="0" y1="158" x2="800" y2="158" stroke="#dbe3ec" />
          <polygon
            points="0,120 133,86 266,100 400,38 533,56 666,0 800,18 800,158 0,158"
            fill="url(#adminTrendFill)"
          />
          <polyline
            points="0,120 133,86 266,100 400,38 533,56 666,0 800,18"
            fill="none"
            stroke="#3478ed"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <polyline
            points="0,136 133,122 266,112 400,98 533,86 666,70 800,56"
            fill="none"
            stroke="#8052df"
            strokeWidth="2"
            strokeDasharray="7 7"
          />
        </svg>
      </Box>
      <Box sx={{ display: 'flex', gap: 2, pt: 1, color: '#526581', fontSize: 12, flexWrap: 'wrap' }}>
        <span>
          <i style={{ display: 'inline-block', width: 12, borderTop: '2px solid #3478ed', marginRight: 4, verticalAlign: 'middle' }} />
          Completed
        </span>
        <span>
          <i style={{ display: 'inline-block', width: 12, borderTop: '2px dashed #8052df', marginRight: 4, verticalAlign: 'middle' }} />
          Target
        </span>
      </Box>
    </Box>
  );
}

export default function Dashboard({ onNavigate }) {
  return (
    <CorePageShell
      breadcrumb="Administrator"
      title="Admin dashboard"
      description="Organisation-wide production, backlogs and compliance across all projects."
      headerExtra={
        <Button variant="outlined" sx={{ bgcolor: '#fff' }} onClick={() => onNavigate('reports')}>
          Export
        </Button>
      }
      actionLabel="Open analytics"
      actionIcon={null}
      actionHandler={() => onNavigate('analytics-kpis')}
    >
      {/* ── METRIC CARDS ── */}
      <CoreMetricCards
        items={[
          ['Total Received', '12,480'],
          ['Total Completed', '9,860', '▲ 4.1% MoM'],
          ['Project Backlog', '2,620', '▲ 3.6%'],
          ['Active employees', '42', '6 projects'],
        ]}
      />

      {/* ── TREND + BACKLOG ── */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1.6fr 1fr' },
          gap: 2,
          mb: 2,
        }}
      >
        <SectionCard
          title="Monthly production trend"
          action={<Button size="small" onClick={() => onNavigate('analytics-kpis')}>Analytics</Button>}
        >
          <TrendChart />
        </SectionCard>

        <SectionCard title="Backlog by project">
          <Box sx={{ py: 1 }}>
            {projects.map(([name, width, total]) => (
              <Box
                key={name}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  gap: 1,
                  alignItems: 'center',
                  mb: 1.4,
                  px: 2,
                }}
              >
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.4 }}>
                    <Typography sx={{ fontSize: 12, color: '#243b5a' }}>{name}</Typography>
                    <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#243b5a' }}>{total}</Typography>
                  </Box>
                  <Box sx={{ height: 7, bgcolor: '#edf1f6', borderRadius: 4, overflow: 'hidden' }}>
                    <Box sx={{ width: `${width}%`, height: '100%', bgcolor: '#5267e8', borderRadius: 4 }} />
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </SectionCard>
      </Box>

      {/* ── KPI SUMMARY ── */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: 2,
        }}
      >
        {[
          ['Pending corrections', '6', 'awaiting approval', '#df9324', 'Review', 'corrections'],
          ['Guide compliance', '91%', 'acknowledged this cycle', '#15966a', 'Details', 'compliance'],
          ['Missing entries', '3', 'employees today', '#dc3545', 'View', 'missing'],
        ].map(([label, value, note, color, actionLabel, navKey]) => (
          <SectionCard
            key={label}
            title={label}
            action={
              <Button size="small" onClick={() => onNavigate(navKey)}>
                {actionLabel}
              </Button>
            }
          >
            <Box sx={{ textAlign: 'center', py: 2 }}>
              <Typography sx={{ fontSize: 32, fontWeight: 800, color }}>{value}</Typography>
              <Typography sx={{ color: '#667085', fontSize: 12 }}>{note}</Typography>
            </Box>
          </SectionCard>
        ))}
      </Box>
    </CorePageShell>
  );
}
