import Link from 'next/link';

export default function footer() {
  return (
    <footer className="mx-auto w-full max-w-screen-xl border-t bg-background/95 p-2 text-center backdrop-blur">
      <p className="text-xs text-gray-500 dark:text-gray-400">
        © 2024 FitTrack. All rights reserved.
      </p>
      <nav className="flex gap-4 sm:ml-auto sm:gap-6">
        <Link className="text-xs underline-offset-4 hover:underline" href="#">
          Terms of Service
        </Link>
        <Link className="text-xs underline-offset-4 hover:underline" href="#">
          Privacy
        </Link>
      </nav>
    </footer>
  );
}
