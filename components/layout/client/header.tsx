import { clientNavItems } from '@/constants/data';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import ThemeToggle from '../ThemeToggle/theme-toggle';
import { UserNav } from '../user-nav';
import { ClientNav } from './client-nav';
import { MobileSidebar } from './mobile-sidebar';

export default function Header() {
  return (
    <div className="fixed left-0 right-0 top-0 z-50 mx-auto w-full bg-white shadow-md">
      <div className="mx-auto grid h-16 max-w-screen-xl grid-cols-2 items-center px-3 text-black lg:grid-cols-3 lg:px-0">
        <Link href="/">
          <p className="px-2 text-center text-lg font-semibold">Fitness App</p>
        </Link>
        <nav className="hidden h-16 items-center justify-center lg:flex">
          <ClientNav items={clientNavItems} />
        </nav>

        <div className={cn('block lg:!hidden')}>
          <MobileSidebar />{' '}
        </div>
        <div className="flex items-center justify-end gap-2">
          <ThemeToggle />
          <UserNav />
        </div>
      </div>
    </div>
  );
}
