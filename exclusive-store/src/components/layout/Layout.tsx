import { Link, Outlet } from 'react-router-dom';
import { LayoutDashboard } from 'lucide-react';
import AnnouncementBar from './AnnouncementBar';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Link
        to="/admin"
        className="fixed bottom-5 left-5 z-50 inline-flex items-center gap-2 rounded-full border border-white/60 bg-[#4EA674] px-4 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(78,166,116,0.35)] transition hover:bg-[#3d8f63] focus:outline-none focus:ring-4 focus:ring-[#4EA674]/25"
        aria-label="Open admin dashboard"
      >
        <LayoutDashboard size={18} />
        Admin Dashboard
      </Link>
    </div>
  );
}
