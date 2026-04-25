import {
  Bell,
  Boxes,
  ChevronLeft,
  CircleUserRound,
  CreditCard,
  Home,
  LogOut,
  PackagePlus,
  PanelLeft,
  Search,
  ShoppingBag,
  ShoppingCart,
  UsersRound,
} from 'lucide-react';
import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const mainLinks = [
  { label: 'Dashboard', to: '/admin', icon: Home, end: true },
  { label: 'Order Management', to: '/admin/orders', icon: ShoppingCart },
  { label: 'Customers', to: '/admin/customers', icon: UsersRound },
  { label: 'Transaction', to: '/admin/transactions', icon: CreditCard },
  { label: 'Categories', to: '/admin/categories', icon: Boxes },
];

function AdminNavLink({
  label,
  to,
  icon: Icon,
  end,
}: {
  label: string;
  to: string;
  icon: typeof Home;
  end?: boolean;
}) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex h-11 items-center gap-3 rounded-[5px] px-4 text-[15px] transition ${
          isActive
            ? 'bg-[#4EA674] text-white shadow-sm'
            : 'text-slate-500 hover:bg-[#eef8f1] hover:text-[#07383f]'
        }`
      }
    >
      <Icon size={20} strokeWidth={1.9} />
      <span className="font-medium">{label}</span>
    </NavLink>
  );
}

function AdminSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-20 hidden h-screen w-[260px] flex-col overflow-y-auto border-r border-slate-100 bg-white px-2 py-4 lg:flex">
      <div className="mb-7 px-5 text-slate-500">
        <PanelLeft size={20} />
      </div>

      <nav className="space-y-6">
        <div>
          <p className="mb-3 px-5 text-[15px] text-slate-500">Main menu</p>
          <div className="space-y-2 px-2">
            {mainLinks.map((link) => (
              <AdminNavLink key={link.to} {...link} />
            ))}
          </div>
        </div>

        <div className="pt-4">
          <p className="mb-3 px-5 text-[15px] text-slate-500">Product</p>
          <div className="px-2">
            <AdminNavLink label="Add Products" to="/admin/add-product" icon={PackagePlus} />
          </div>
        </div>

        <div className="pt-4">
          <p className="mb-3 px-5 text-[15px] text-slate-500">Admin</p>
          <div className="px-2">
            <AdminNavLink label="Admin role" to="/admin/profile" icon={CircleUserRound} />
          </div>
        </div>
      </nav>

      <div className="mt-auto pt-6">
        <div className="mb-5 flex items-center gap-3 px-4">
          <img
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=48&h=48&fit=crop"
            alt="Admin"
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-800">Dealport</p>
            <p className="truncate text-sm text-slate-500">Mark@thedesigner...</p>
          </div>
          <LogOut size={18} className="text-slate-500" />
        </div>

        <a
          href="/"
          className="flex h-12 items-center gap-3 rounded-[5px] border border-slate-100 bg-white px-6 text-sm font-semibold text-[#07383f] shadow-sm"
        >
          <ShoppingBag size={20} />
          Your Shop
          <ChevronLeft size={17} className="ml-auto rotate-135 text-slate-500" />
        </a>
      </div>
    </aside>
  );
}

export default function AdminLayout() {
  const [search, setSearch] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#061f24]">
      <AdminSidebar />
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-black/30 lg:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div className="h-full w-[260px] bg-white p-2" onClick={(event) => event.stopPropagation()}>
            <AdminSidebar />
          </div>
        </div>
      )}
      <div className="lg:pl-[260px]">
        <header className="sticky top-0 z-10 flex h-[90px] items-center justify-between bg-white/95 px-5 backdrop-blur lg:px-6">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="rounded-md border border-slate-200 p-2 text-slate-600 lg:hidden"
            aria-label="Open menu"
          >
            <PanelLeft size={20} />
          </button>
          <div className="hidden lg:block" />
          <label className="flex w-full max-w-[520px] items-center gap-3 rounded-full bg-[#f8f9fa] px-8 py-3.5 text-slate-500">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search data, users, or reports"
              className="min-w-0 flex-1 bg-transparent text-[15px] text-slate-800 outline-none placeholder:text-slate-500"
            />
            <Search size={24} />
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setNotificationsOpen((open) => !open)}
              className="relative rounded-full p-2 text-slate-600 hover:bg-slate-100"
              aria-label="Notifications"
            >
              <Bell size={22} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
            </button>
            {notificationsOpen && (
              <div className="absolute right-0 top-12 z-30 w-72 rounded-[8px] border border-slate-100 bg-white p-4 shadow-lg">
                <p className="font-semibold text-[#07383f]">Notifications</p>
                <div className="mt-3 space-y-3 text-sm">
                  <p className="rounded bg-[#eef8f1] p-3">New order #ORD0011 needs review.</p>
                  <p className="rounded bg-slate-50 p-3">Inventory report is ready.</p>
                </div>
              </div>
            )}
          </div>
        </header>
        <main className="px-5 pb-12 lg:px-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
