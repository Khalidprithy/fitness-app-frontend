'use client';
import AdminNav from '@/components/layout/admin/admin-nav';
import { sideLinks } from '@/constants/data';
import { cn } from '@/lib/utils';
import { selectIsMinimized, toggle } from '@/redux/slices/sidebar/sidebarSlice';
import { ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
  const dispatch = useDispatch();

  const isMinimized = useSelector(selectIsMinimized);
  const [status, setStatus] = useState(false);

  const handleToggle = () => {
    setStatus(true);
    dispatch(toggle());
    setTimeout(() => setStatus(false), 500);
  };
  return (
    <nav
      className={cn(
        `relative z-10 hidden h-screen flex-none border-r pt-20 lg:block`,
        status && 'duration-500',
        !isMinimized ? 'w-60' : 'w-[72px]',
        className
      )}
    >
      <ChevronLeft
        className={cn(
          'absolute -right-3 top-16 cursor-pointer rounded-full border bg-background text-3xl text-foreground',
          isMinimized && 'rotate-180'
        )}
        onClick={handleToggle}
      />
      <div className="space-y-0 py-0">
        <div className="px-3 py-0">
          <div className="mt-0 space-y-1">
            <AdminNav
              id="sidebar-menu"
              className={`z-40 h-full flex-1 ${
                isMinimized
                  ? 'max-h-screen'
                  : 'max-h-0 py-0 lg:max-h-screen lg:py-2'
              }`}
              closeNav={() => handleToggle()}
              links={sideLinks}
              isCollapsed={isMinimized}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
