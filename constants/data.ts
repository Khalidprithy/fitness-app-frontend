import { NavItem } from '@/types';

export type User = {
  _id: string;
  id: number;
  name: string;
  image: string;
  provider: string;
  email: string;
  type: string;
  role: string;
  verified: boolean;
  status: string;
};

export interface SideLink extends NavItem {
  sub?: NavItem[];
}

export const clientNavItems: NavItem[] = [
  {
    title: 'Home',
    href: '/',
    icon: 'dashboard',
    label: 'Home'
  },
  {
    title: 'Features',
    href: '/#',
    icon: 'user',
    label: 'Features'
  },
  {
    title: 'Screens',
    href: '/#',
    icon: 'employee',
    label: 'Screens'
  },
  {
    title: 'Contact',
    href: '/#',
    icon: 'employee',
    label: 'Contact'
  }
];

export const sideLinks: SideLink[] = [
  {
    title: 'Dashboard',
    href: '/admin/dashboard',
    icon: 'dashboard',
    label: 'Dashboard'
  },
  {
    title: 'Manage App',
    href: '/admin/manage-app',
    icon: 'appStore',
    label: 'manage App'
  },
  {
    title: 'Category',
    href: '/admin/category',
    icon: 'list',
    label: 'Category'
  },
  {
    title: 'Equipment',
    href: '/admin/equipment',
    icon: 'dumbbell',
    label: 'Equipment'
  },
  {
    title: 'Target Muscle',
    href: '/admin/target-muscle',
    icon: 'bicepsFlexed',
    label: 'Target Muscle'
  },
  {
    title: 'Training Level',
    href: '/admin/training-level',
    icon: 'chartBar',
    label: 'Training Level'
  },
  {
    title: 'Workout',
    href: '/admin/workout',
    icon: 'workout',
    label: 'Workout'
  },
  {
    title: 'Users',
    href: '/admin/users',
    icon: 'users',
    label: 'Users'
  },
  // {
  //   title: 'Contact',
  //   href: '/admin/contact',
  //   icon: 'users',
  //   label: 'Contact'
  // },
  // {
  //   title: 'Payment',
  //   href: '/admin/payment',
  //   icon: 'dollar',
  //   label: 'Payment'
  // },
  // {
  //   title: 'Notifications',
  //   href: '/admin/notifications',
  //   icon: 'bellRing',
  //   label: 'Notifications'
  // },
  {
    title: 'Settings',
    label: '',
    href: '',
    icon: 'settings',
    sub: [
      {
        title: 'General',
        label: '',
        href: '/admin/settings/general',
        icon: 'settings'
      },
      {
        title: 'Administration',
        label: '',
        href: '/admin/settings/administration',
        icon: 'userPen'
      }
    ]
  }
];
