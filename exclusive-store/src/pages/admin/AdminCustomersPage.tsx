import { Copy, MapPin, MessageSquareText, Phone, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { adminCustomers } from '../../data/adminData';
import { AreaChart, MetricCard, PageTitle, Pagination, Panel } from '../../components/admin/AdminUI';
import type { AdminCustomer } from '../../data/adminData';

function CustomerOverview() {
  const [range, setRange] = useState<'This week' | 'Last week'>('This week');
  const stats = [
    range === 'This week' ? ['25k', 'Active Customers'] : ['21k', 'Active Customers'],
    range === 'This week' ? ['5.6k', 'Repeat Customers'] : ['4.8k', 'Repeat Customers'],
    range === 'This week' ? ['250k', 'Shop Visitor'] : ['224k', 'Shop Visitor'],
    range === 'This week' ? ['5.5%', 'Conversion Rate'] : ['4.9%', 'Conversion Rate'],
  ];

  return (
    <Panel className="p-6">
      <div className="mb-7 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Customer Overview</h2>
        <div className="rounded-[7px] bg-[#eaf8e7] p-1">
          {(['This week', 'Last week'] as const).map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => setRange(item)}
              className={`h-8 rounded-[6px] px-5 text-xs ${
                range === item ? 'bg-white font-semibold text-[#4EA674]' : 'text-slate-500'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-8 grid grid-cols-2 gap-5 lg:grid-cols-4">
        {stats.map(([value, label], index) => (
          <div key={label} className={`border-b pb-4 ${index === 0 ? 'border-[#4EA674]' : 'border-indigo-100'}`}>
            <p className="text-2xl font-bold text-slate-800">{value}</p>
            <p className="mt-1 text-sm text-slate-500">{label}</p>
          </div>
        ))}
      </div>
      <AreaChart />
    </Panel>
  );
}

function statusClass(status: AdminCustomer['status']) {
  if (status === 'Active') return 'text-green-500';
  if (status === 'Inactive') return 'text-red-500';
  return 'text-amber-500';
}

function CustomerTable({ compact = false }: { compact?: boolean }) {
  return (
    <Panel className="overflow-hidden border-0 shadow-none">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="bg-[#eaf8e7] text-[#07383f]">
            <tr>
              <th className="rounded-l-[5px] px-5 py-4 font-medium">Customer Id</th>
              <th className="px-5 py-4 font-medium">Name</th>
              <th className="px-5 py-4 font-medium">Phone</th>
              <th className="px-5 py-4 font-medium">Order Count</th>
              <th className="px-5 py-4 font-medium">Total Spend</th>
              <th className="px-5 py-4 font-medium">Status</th>
              <th className="rounded-r-[5px] px-5 py-4 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {adminCustomers.map((customer) => (
              <tr key={customer.customerId} className={`border-b border-slate-200 hover:bg-[#fbfefb] ${compact ? 'h-[63px]' : 'h-[66px]'}`}>
                <td className="px-5 py-3">{customer.customerId}</td>
                <td className="px-5 py-3">{customer.name}</td>
                <td className="px-5 py-3">{customer.phone}</td>
                <td className="px-5 py-3">{customer.orderCount}</td>
                <td className="px-5 py-3">{customer.totalSpend.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                <td className={`px-5 py-3 ${statusClass(customer.status)}`}>
                  <span className="mr-2 inline-block h-2 w-2 rounded-full bg-current" />
                  {customer.status}
                </td>
                <td className="px-5 py-3 text-slate-500">
                  <Link
                    to={`/admin/customers/${customer.customerId.replace('#', '')}`}
                    className="mr-3 inline-block rounded p-1 hover:bg-[#eef8f1] hover:text-[#4EA674]"
                    title="Open customer details"
                  >
                    <MessageSquareText size={18} />
                  </Link>
                  <button type="button" className="inline-block rounded p-1 hover:bg-red-50 hover:text-red-500" title="Remove customer">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination />
    </Panel>
  );
}

function SocialIcons() {
  const items = [
    ['f', 'bg-blue-600'],
    ['☎', 'bg-green-500'],
    ['t', 'bg-sky-500'],
    ['in', 'bg-indigo-500'],
    ['◎', 'bg-pink-500'],
  ];

  return (
    <div className="flex gap-3">
      {items.map(([label, color]) => (
        <span key={label} className={`grid h-5 w-5 place-items-center rounded-[4px] text-[10px] font-bold text-white ${color}`}>
          {label}
        </span>
      ))}
    </div>
  );
}

function CustomerDetailCard({ customer }: { customer: AdminCustomer }) {
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    void navigator.clipboard?.writeText(customer.email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  }

  return (
    <Panel className="p-6">
      <div className="mb-8 flex items-center gap-4">
        <img src={customer.avatar} alt="" className="h-16 w-16 rounded-full object-cover" />
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-bold text-[#07383f]">{customer.name}</h3>
          <p className="truncate text-sm text-slate-500">{customer.email}</p>
        </div>
        <button type="button" onClick={copyEmail} className="relative rounded p-1 text-[#6c63ff] hover:bg-indigo-50" title="Copy email">
          <Copy size={18} />
          {copied && <span className="absolute right-0 top-7 rounded bg-[#07383f] px-2 py-1 text-xs text-white">Copied</span>}
        </button>
      </div>

      <p className="mb-3 text-sm text-slate-400">Customer Info</p>
      <div className="space-y-3">
        <div className="flex h-10 items-center gap-3 rounded-[4px] border border-slate-200 px-3 text-sm text-slate-500">
          <Phone size={16} className="text-[#07383f]" /> {customer.phone}
        </div>
        <div className="flex h-10 items-center gap-3 rounded-[4px] border border-slate-200 px-3 text-sm text-slate-500">
          <MapPin size={16} className="text-[#07383f]" /> {customer.address}
        </div>
      </div>

      <p className="mb-3 mt-7 text-sm text-slate-400">Social Media</p>
      <SocialIcons />

      <p className="mb-3 mt-7 text-sm text-slate-400">Activity</p>
      <p className="mb-2 text-sm text-slate-600">Registration: {customer.registrationDate}</p>
      <p className="text-sm text-slate-600">Last purchase: {customer.lastPurchase}</p>

      <p className="mb-3 mt-7 text-sm text-slate-400">Order overview</p>
      <div className="grid grid-cols-3 gap-2">
        <div className="rounded border border-slate-200 p-3 text-center">
          <p className="text-lg font-bold text-[#07383f]">{customer.totalOrders}</p>
          <p className="mt-2 text-xs text-[#6c63ff]">Total order</p>
        </div>
        <div className="rounded border border-slate-200 p-3 text-center">
          <p className="text-lg font-bold text-[#07383f]">{customer.completedOrders}</p>
          <p className="mt-2 text-xs text-green-500">Completed</p>
        </div>
        <div className="rounded border border-slate-200 p-3 text-center">
          <p className="text-lg font-bold text-[#07383f]">{customer.canceledOrders}</p>
          <p className="mt-2 text-xs text-red-500">Canceled</p>
        </div>
      </div>
    </Panel>
  );
}

export default function AdminCustomersPage() {
  const { customerId } = useParams();
  const selectedCustomer = adminCustomers.find((customer) => customer.customerId.replace('#', '') === customerId) ?? adminCustomers[0];
  const showDetails = Boolean(customerId);

  return (
    <>
      <PageTitle title="Customers" />
      <div className="grid gap-5 xl:grid-cols-[280px_1fr]">
        <div className="grid gap-5">
          <MetricCard title="Total Customers" value="11,040" change="14.4%" />
          <MetricCard title="New Customers" value="2,370" change="20%" />
          <MetricCard title="Visitor" value="250k" change="20%" />
        </div>
        <CustomerOverview />
      </div>

      {showDetails ? (
        <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_310px]">
          <div>
            <h2 className="mb-5 text-lg font-semibold">Customer Details</h2>
            <CustomerTable compact />
          </div>
          <CustomerDetailCard customer={selectedCustomer} />
        </div>
      ) : (
        <div className="mt-5">
          <CustomerTable />
        </div>
      )}
    </>
  );
}
