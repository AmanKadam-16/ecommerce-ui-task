import { CirclePlus } from 'lucide-react';
import { useMemo, useState } from 'react';
import { adminCustomers } from '../../data/adminData';
import { MetricCard, PageTitle, Pagination, Panel, TableToolbar } from '../../components/admin/AdminUI';

const transactionRows = adminCustomers.map((customer, index) => ({
  customerId: customer.customerId,
  name: customer.name,
  date: '01-01-2025',
  total: 2904,
  method: ['CC', 'PayPal', 'CC', 'Bank', 'CC', 'PayPal', 'Bank', 'CC', 'PayPal', 'Bank'][index],
  status: ['Complete', 'Complete', 'Complete', 'Complete', 'Canceled', 'Pending', 'Canceled', 'Complete', 'Pending', 'Canceled'][index],
}));

function statusClass(status: string) {
  if (status === 'Complete') return 'text-green-500';
  if (status === 'Pending') return 'text-amber-500';
  return 'text-red-500';
}

function PaymentMethodCard() {
  const [active, setActive] = useState(true);
  const [cards, setCards] = useState(1);

  return (
    <Panel className="p-5 lg:col-span-2">
      <div className="flex items-start justify-between gap-5">
        <div className="min-w-0 flex-1">
          <h2 className="mb-6 text-lg font-semibold text-slate-800">Payment Method</h2>
          <div className="h-[164px] max-w-[280px] overflow-hidden rounded-[14px] bg-[linear-gradient(135deg,#064852_0%,#1397a8_32%,#4EA674_33%,#63d99d_68%,#4EA674_69%)]" />
          <button
            type="button"
            onClick={() => setCards((count) => count + 1)}
            className="mt-3 flex h-10 w-full max-w-[280px] items-center justify-center gap-2 rounded-[5px] border border-slate-300 text-slate-600 hover:bg-slate-50"
          >
            <CirclePlus size={20} /> Add Card
          </button>
        </div>
        <div className="w-[220px] pt-12 text-sm leading-8">
          <p>Status: <span className={active ? 'text-green-500' : 'text-red-500'}>{active ? 'Active' : 'Inactive'}</span></p>
          <p>Transactions: <b>1,250</b></p>
          <p>Revenue: <b>$50,000</b></p>
          <p className="text-[#6c63ff]">View Transactions</p>
          <p className="text-xs text-slate-400">{cards} saved card{cards === 1 ? '' : 's'}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setActive((value) => !value)}
        className="float-right mt-3 rounded-[6px] border border-red-200 bg-red-50 px-4 py-2 text-red-500 hover:bg-red-100"
      >
        {active ? 'Deactivate' : 'Activate'}
      </button>
    </Panel>
  );
}

export default function AdminTransactionsPage() {
  const tabs = ['All order (240)', 'Completed', 'Pending', 'Canceled'];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [search, setSearch] = useState('');
  const visibleRows = useMemo(() => {
    const query = search.trim().toLowerCase();
    const tabStatus = activeTab === tabs[0] ? '' : activeTab.replace('Completed', 'Complete').replace('Canceled', 'Canceled');

    return transactionRows.filter((row) => {
      const matchesTab = !tabStatus || row.status === tabStatus;
      const matchesSearch = [row.customerId, row.name, row.date, row.method, row.status].some((value) =>
        value.toLowerCase().includes(query),
      );
      return matchesTab && matchesSearch;
    });
  }, [activeTab, search, tabs]);

  return (
    <>
      <PageTitle title="Transaction" />
      <div className="grid gap-5 xl:grid-cols-[1fr_1.2fr]">
        <div className="grid gap-5 sm:grid-cols-2">
          <MetricCard title="Total Revenue" value="$15,045" change="14.4%" />
          <MetricCard title="Completed Transactions" value="3,150" change="20%" />
          <MetricCard title="Pending Transactions" value="150" change="85%" />
          <MetricCard title="Failed Transactions" value="75" change="15%" negative />
        </div>
        <PaymentMethodCard />
      </div>

      <Panel className="mt-5 overflow-hidden">
        <div className="p-6 pb-0">
          <TableToolbar
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            searchValue={search}
            onSearchChange={setSearch}
            searchPlaceholder="Search payment history"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px] text-left text-sm">
            <thead className="bg-[#eaf8e7] text-[#07383f]">
              <tr>
                <th className="px-11 py-4 font-medium">Customer Id</th>
                <th className="px-5 py-4 font-medium">Name</th>
                <th className="px-5 py-4 font-medium">Date</th>
                <th className="px-5 py-4 font-medium">Total</th>
                <th className="px-5 py-4 font-medium">Method</th>
                <th className="px-5 py-4 font-medium">Status</th>
                <th className="px-5 py-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((row, index) => (
                <tr key={`${row.customerId}-${index}`} className="border-b border-slate-200 hover:bg-[#fbfefb]">
                  <td className="px-11 py-5">{row.customerId}</td>
                  <td className="px-5 py-5">{row.name}</td>
                  <td className="px-5 py-5">{row.date}</td>
                  <td className="px-5 py-5">${row.total.toLocaleString()}</td>
                  <td className="px-5 py-5">{row.method}</td>
                  <td className={`px-5 py-5 ${statusClass(row.status)}`}>
                    <span className="mr-2 inline-block h-2 w-2 rounded-full bg-current" />
                    {row.status}
                  </td>
                  <td className="px-5 py-5">
                    <button type="button" className="text-[#6c63ff] hover:underline">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 pb-6">
          <Pagination />
        </div>
      </Panel>
    </>
  );
}
