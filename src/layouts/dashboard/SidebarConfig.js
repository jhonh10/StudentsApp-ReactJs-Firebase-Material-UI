import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'Alumnos',
    path: '/app/users',
    icon: getIcon(peopleFill)
  },
  {
    title: 'dashboard',
    path: '/app/resume',
    icon: getIcon(pieChart2Fill)
  }
];

export default sidebarConfig;
