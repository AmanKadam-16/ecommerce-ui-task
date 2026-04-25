import { CirclePlus, Truck } from 'lucide-react';
import { useMemo, useState } from 'react';
import { adminOrders } from '../../data/adminData';
import { ActionButton, MetricCard, MoreButton, PageTitle, Pagination, Panel, TableToolbar } from '../../components/admin/AdminUI';

function statusColor(status: string) {
  if (status === 'Delivered') return 'text-green-500';
  if (status === 'Pending') return 'text-orange-500';
  if (status === 'Cancelled') return 'text-red-500';
  return 'text-slate-900';
}

export default function AdminOrdersPage() {
  const tabs = ['All order (240)', 'Completed', 'Pending', 'Canceled'];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [search, setSearch] = useState('');
  const visibleOrders = useMemo(() => {
    const statusFilter = activeTab === tabs[0] ? '' : activeTab.replace('Canceled', 'Cancelled');
    const query = search.trim().toLowerCase();

    return adminOrders.filter((order) => {
      const matchesTab = !statusFilter || order.status === statusFilter;
      const matchesSearch = [order.orderId, order.product, order.date, order.payment, order.status].some((value) =>
        value.toLowerCase().includes(query),
      );
      return matchesTab && matchesSearch;
    });
  }, [activeTab, search, tabs]);

  return (
    <>
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
        <div>
          <PageTitle title="Order Management" />
          <h2 className="-mt-5 mb-10 text-2xl font-bold text-[#07383f]">Order List</h2>
        </div>
        <div className="mt-8 flex gap-3">
          <ActionButton>
            <CirclePlus size={22} /> Add Order
          </ActionButton>
          <MoreButton />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Total Orders" value="1,240" change="14.4%" />
        <MetricCard title="New Orders" value="240" change="20%" />
        <MetricCard title="Completed Orders" value="960" change="85%" />
        <MetricCard title="Canceled Orders" value="87" change="5%" negative />
      </div>

      <Panel className="mt-5 p-6">
        <TableToolbar
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search order report"
          sortIcon="filter"
        />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[940px] text-left text-sm">
            <thead className="bg-[#eaf8e7] text-[#07383f]">
              <tr>
                <th className="rounded-l-[5px] px-4 py-4 font-medium">No.</th>
                <th className="px-4 py-4 font-medium">Order Id</th>
                <th className="px-4 py-4 font-medium">Product</th>
                <th className="px-4 py-4 font-medium">Date</th>
                <th className="px-4 py-4 font-medium">Price</th>
                <th className="px-4 py-4 font-medium">Payment</th>
                <th className="rounded-r-[5px] px-4 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {visibleOrders.map((order) => (
                <tr key={order.orderId} className="border-b border-slate-200">
                  <td className="px-4 py-3">
                    <span className="mr-3 inline-block h-5 w-5 rounded border border-[#dff4df]" />
                    {order.no}
                  </td>
                  <td className="px-4 py-3">{order.orderId}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={order.productImage} alt="" className="h-10 w-10 rounded border border-slate-200 object-cover" />
                      <span className="max-w-[190px] font-medium">{order.product}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">{order.date}</td>
                  <td className="px-4 py-3">{order.price.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <span className={`mr-2 inline-block h-2 w-2 rounded-full ${order.payment === 'Paid' ? 'bg-green-500' : 'bg-red-500'}`} />
                    {order.payment}
                  </td>
                  <td className={`px-4 py-3 ${statusColor(order.status)}`}>
                    <Truck size={19} className="mr-2 inline-block" />
                    {order.status}
                  </td>
                </tr>
              ))}
              {visibleOrders.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-slate-500">
                    No orders match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination />
      </Panel>
    </>
  );
}
