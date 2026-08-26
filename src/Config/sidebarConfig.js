const common = [
  { label: 'Corrections', icon: '✅', page: 'corrections' },
  { label: 'Reports', icon: '📊', page: 'reports' },
  { label: 'Notifications', icon: '🔔', page: 'notifications', badge: { text: '2', color: 'error', dot: true } },
  { label: 'My Profile', icon: '👤', page: 'my-profile' },
];

export const sidebarConfig = {
  indexer: [
    { label: 'Dashboard', icon: '🏠', page: 'dashboard' },
    { label: 'Daily Entry', icon: '📝', page: 'daily-entry' },
    { label: 'Projects', icon: '📁', page: 'projects' },
    { label: 'Indexing Guide', icon: '📘', page: 'indexing-guide', badge: { text: 'NEW', color: 'success' } },
    { label: 'Attendance', icon: '🗓️', page: 'attendance' },
    ...common,
  ],

  teamLead: [
    { label: 'Dashboard', icon: '🏠', page: 'dashboard' },
    { label: 'Daily Entry', icon: '📝', page: 'daily-entry' },
    { label: 'My Team', icon: '👥', page: 'my-team' },
    { label: 'Projects', icon: '📁', page: 'projects' },
    { label: 'Indexing Guide', icon: '📘', page: 'indexing-guide', badge: { text: 'NEW', color: 'success' } },
    { label: 'Corrections', icon: '✅', page: 'corrections', badge: { text: '4', color: 'error', dot: true } },
    { label: 'Attendance', icon: '🗓️', page: 'attendance' },
    ...common.filter(item => item.page !== 'corrections'),
  ],

  coreTeam: [
    { label: 'Dashboard', icon: '🏠', page: 'dashboard' },
    { label: 'Analytics & KPIs', icon: '📈', page: 'analytics-kpis' },
    { label: 'Project Master', icon: '📁', page: 'project-master' },
    { label: 'Users', icon: '👥', page: 'users' },
    { label: 'Assignment Matrix', icon: '🔗', page: 'assignment-matrix' },
    { label: 'Guide Manager', icon: '📘', page: 'guide-manager' },
    { label: 'Corrections', icon: '✅', page: 'corrections', badge: { text: '6', color: 'error', dot: true } },
    { label: 'Compliance', icon: '🛡️', page: 'compliance' },
    ...common.filter(item => item.page !== 'corrections'),
  ],

  administrator: [
    { label: 'Dashboard', icon: '🏠', page: 'dashboard' },
    { label: 'Users', icon: '👥', page: 'users' },
    { label: 'Project Master', icon: '📁', page: 'project-master' },
    { label: 'Assignment Matrix', icon: '🔗', page: 'assignment-matrix' },
    { label: 'Guide Manager', icon: '📘', page: 'guide-manager' },
    { label: 'Locking Rules', icon: '🔒', page: 'locking-rules' },
    { label: 'Corrections', icon: '✅', page: 'corrections' },
    { label: 'Analytics & KPIs', icon: '📈', page: 'analytics-kpis' },
    { label: 'Audit Log', icon: '📜', page: 'audit-log' },
    { label: 'Settings', icon: '⚙️', page: 'settings' },
    ...common,
  ],
};

export default sidebarConfig;
