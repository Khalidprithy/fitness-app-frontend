'use client';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { sideLinks } from '@/constants/data';
import { cn } from '@/lib/utils';
import { selectIsMinimized, toggle } from '@/redux/slices/sidebar/sidebarSlice';
import { MenuIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminNav from './admin-nav';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  // playlists: Playlist[];
}

export function MobileSidebar({ className }: SidebarProps) {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const isMinimized = useSelector(selectIsMinimized);
  const [status, setStatus] = useState(false);

  const handleToggle = () => {
    setStatus(true);
    dispatch(toggle());
    setTimeout(() => setStatus(false), 500);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    // Close sidebar if already on large screen
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent
          side="left"
          className={cn(
            'block w-52 !px-0 lg:!hidden',
            status && 'duration-500',
            className
          )}
        >
          <div className="space-y-4 py-4">
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                Overview
              </h2>
              <div className="space-y-1">
                <AdminNav
                  id="sidebar-menu"
                  className={`z-40 h-full flex-1 ${
                    isMinimized
                      ? 'max-h-screen'
                      : 'max-h-0 py-0 md:max-h-screen md:py-2'
                  }`}
                  closeNav={() => handleToggle()}
                  links={sideLinks}
                  isCollapsed={false}
                />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
