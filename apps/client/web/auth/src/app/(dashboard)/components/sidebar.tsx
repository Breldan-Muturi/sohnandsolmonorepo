'use client';
import React from 'react';
import { cn } from '@shadcn/lib/utils';
import { Button, Separator, buttonVariants } from '@shadcn/index';
import {
  User,
  Contact,
  Cast,
  ShieldCheck,
  Lock,
  Building2,
  LucideProps,
  LogOut,
  Trash,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useClerk } from '@clerk/nextjs';

type NavItem = {
  href: string;
  label: string;
  icon:
    | 'user'
    | 'contact'
    | 'cast'
    | 'shield-check'
    | 'lock'
    | 'building-2'
    | 'log-out'
    | 'trash';
};

type ActionItem = Omit<NavItem, 'href'> & {
  onClick: () => void;
};

type FooterItem = Omit<NavItem, 'icon'>;

const navItems: NavItem[] = [
  {
    href: '/',
    label: 'Home',
    icon: 'user',
  },
  {
    href: '/personalinfo',
    label: 'Personal Info',
    icon: 'contact',
  },
  {
    href: '/subscriptions',
    label: 'Subscriptions',
    icon: 'cast',
  },
  {
    href: '/security',
    label: 'Security',
    icon: 'shield-check',
  },
  {
    href: '/dataprivacy',
    label: 'Data & Privacy',
    icon: 'lock',
  },
  {
    href: '/organizations',
    label: 'Organizations',
    icon: 'building-2',
  },
];

const footerItems: FooterItem[] = [
  {
    href: '/',
    label: 'Privacy',
  },
  {
    href: '/',
    label: 'Terms',
  },
  {
    href: '/',
    label: 'Help',
  },
  {
    href: '/',
    label: 'About',
  },
];

const iconComponents: Record<
  NavItem['icon'],
  React.ComponentType<LucideProps>
> = {
  'shield-check': ShieldCheck,
  'building-2': Building2,
  cast: Cast,
  contact: Contact,
  lock: Lock,
  user: User,
  'log-out': LogOut,
  trash: Trash,
};

type SidebarProps = React.HTMLAttributes<HTMLElement>;

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { signOut } = useClerk();

  const actionItems: ActionItem[] = [
    {
      icon: 'log-out',
      label: 'Log out',
      onClick: () => signOut(() => router.push('/signin')),
    },
    {
      icon: 'trash',
      label: 'Delete account',
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onClick: () => {},
    },
  ];
  return (
    <aside
      className={cn(
        'flex flex-col col-span-1 h-full justify-between',
        className
      )}
    >
      <nav className="flex flex-col">
        {navItems.map((navItem, i) => {
          const { icon, href, label } = navItem;
          const Icon = iconComponents[icon];
          return (
            <Link
              key={`${i}-${label}-${href}`}
              href={href}
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                'justify-start pl-6 py-3.5 text-[#030C4F] rounded-l-none rounded-r-full items-center',
                pathname === href && 'bg-[#5EE5EB]'
              )}
            >
              <Icon className="mr-4" />
              {label}
            </Link>
          );
        })}
        <Separator className="my-4" />
        {actionItems.map((actionItem, i) => {
          const { icon, label, onClick } = actionItem;
          const Icon = iconComponents[icon];
          return (
            <Button
              key={`${i}-${label}`}
              variant="ghost"
              className="justify-start text-[#EF4444] hover:text-white pl-6 rounded-l-none rounded-r-full items-center hover:bg-[#EF4444]"
              onClick={onClick}
            >
              <Icon className="mr-4" />
              {label}
            </Button>
          );
        })}
      </nav>
      <nav className="flex-row pl-4 justify-between">
        {footerItems.map((footerItem, i) => {
          const { label, href } = footerItem;
          const key = `${i}-${label}-${href}`;
          return (
            <Link
              key={key}
              href={href}
              className={cn(
                buttonVariants({ variant: 'link' }),
                'text-xs p-2 h-8 text-gray-600'
              )}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
