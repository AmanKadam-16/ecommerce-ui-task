import { CirclePlus, EllipsisVertical, Filter, ListFilter } from 'lucide-react';
import { adminCategories, adminProducts, adminTransactions } from '../../data/adminData';
import { AreaChart, MetricCard, PageTitle, Panel } from '../../components/admin/AdminUI';

const topProducts = [
  { name: 'Apple iPhone 13', price: '$999.00', image: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=52&h=52&fit=crop' },
  { name: 'Nike Air Jordan', price: '$72.40', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=52&h=52&fit=crop' },
  { name: 'T-shirt', price: '$35.40', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=52&h=52&fit=crop' },
  { name: 'Assorted Cross Bag', price: '$80.00', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=52&h=52&fit=crop' },
];

const addProducts = adminProducts.slice(0, 3).map((product, index) => ({
  ...product,
  price: ['$39.99', '$19.99', '$34.99'][index],
}));

function MiniBars() {
  const bars = [34, 18, 26, 13, 28, 22, 31, 10, 18, 27, 8, 30, 15, 24, 29, 19, 13, 22, 31, 37, 17, 28, 35];

  return (
    <div className="mt-5 flex h-10 items-end gap-2">
      {bars.map((height, index) => (
        <span key={`${height}-${index}`} className="w-2 rounded-t-sm bg-[#4EA674]" style={{ height }} />
      ))}
    </div>
  );
}

function CountrySales() {
  const rows = [
    { flag: '🇺🇸', country: 'US', amount: '30k', change: '25.8%', up: true },
    { flag: '🇧🇷', country: 'Brazil', amount: '30k', change: '15.8%', up: false },
    { flag: '🇦🇺', country: 'Australia', amount: '25k', change: '35.8%', up: true },
  ];

  return (
    <div className="mt-7">
      <div className="mb-4 flex justify-between font-semibold">
        <span>Sales by Country</span>
        <span>Sales</span>
      </div>
      <div className="space-y-4">
        {rows.map((row) => (
          <div key={row.country} className="grid grid-cols-[42px_1fr_auto] items-center gap-3">
            <span className="text-3xl">{row.flag}</span>
            <div>
              <p className="font-semibold">{row.amount}</p>
              <p className="text-xs text-slate-400">{row.country}</p>
            </div>
            <span className={`text-xs ${row.up ? 'text-green-500' : 'text-red-500'}`}>
              {row.up ? '↗' : '↘'} {row.change}
            </span>
          </div>
        ))}
      </div>
      <button className="mt-5 h-9 w-full rounded-full border border-[#6c63ff] text-sm font-medium text-[#6c63ff]">View Insight</button>
    </div>
  );
}

function DashboardReport() {
  const stats = [
    ['52k', 'Customers'],
    ['3.5k', 'Total Products'],
    ['2.5k', 'Stock Products'],
    ['0.5k', 'Out of Stock'],
    ['250k', 'Revenue'],
  ];

  return (
    <Panel className="p-5">
      <div className="mb-7 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Report for this week</h2>
        <div className="flex items-center gap-3">
          <div className="rounded-[7px] bg-[#eaf8e7] p-1">
            <button className="h-8 rounded-[6px] bg-white px-5 text-xs font-semibold text-[#4EA674]">This week</button>
            <button className="h-8 px-5 text-xs text-slate-500">Last week</button>
          </div>
          <EllipsisVertical size={19} className="text-slate-500" />
        </div>
      </div>
      <div className="mb-8 grid grid-cols-2 gap-5 md:grid-cols-5">
        {stats.map(([value, label], index) => (
          <div key={label} className={`border-b pb-4 ${index === 0 ? 'border-[#4EA674]' : 'border-indigo-100'}`}>
            <p className="text-2xl font-bold">{value}</p>
            <p className="mt-1 text-sm text-slate-500">{label}</p>
          </div>
        ))}
      </div>
      <AreaChart tall />
    </Panel>
  );
}

function TransactionPanel() {
  return (
    <Panel className="p-5">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Transaction</h2>
        <button className="inline-flex h-9 items-center gap-2 rounded-[7px] bg-[#4EA674] px-4 text-sm text-white">
          Filter <ListFilter size={17} />
        </button>
      </div>
      <table className="w-full text-left text-sm">
        <thead className="border-b text-slate-500">
          <tr>
            <th className="py-3 font-medium">No</th>
            <th className="py-3 font-medium">Id Customer</th>
            <th className="py-3 font-medium">Order Date</th>
            <th className="py-3 font-medium">Status</th>
            <th className="py-3 text-right font-medium">Amount</th>
          </tr>
        </thead>
        <tbody>
          {adminTransactions.slice(0, 5).map((row) => (
            <tr key={row.no}>
              <td className="py-3">{row.no}.</td>
              <td className="py-3">{row.customerId}</td>
              <td className="py-3">{row.orderDate}</td>
              <td className="py-3">
                <span className={`mr-2 inline-block h-2 w-2 rounded-full ${row.status === 'Pending' ? 'bg-yellow-400' : 'bg-green-500'}`} />
                {row.status}
              </td>
              <td className="py-3 text-right">${row.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="mt-7 float-right h-9 rounded-full border border-[#6c63ff] px-8 text-sm text-[#6c63ff]">Details</button>
    </Panel>
  );
}

function TopProducts() {
  return (
    <Panel className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Top Products</h2>
        <a className="text-xs text-[#6c63ff]">All product</a>
      </div>
      <div className="mb-4 rounded-[7px] bg-[#fafbfc] px-3 py-2 text-sm text-slate-500">Search</div>
      {topProducts.map((product) => (
        <div key={product.name} className="flex items-center gap-3 border-b border-slate-200 py-3">
          <img src={product.image} alt="" className="h-10 w-10 rounded object-cover" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-[#07383f]">{product.name}</p>
            <p className="text-xs text-slate-400">Item: #FXZ-4567</p>
          </div>
          <p className="font-bold text-[#07383f]">{product.price}</p>
        </div>
      ))}
    </Panel>
  );
}

function BestSelling() {
  return (
    <Panel className="p-5">
      <div className="mb-7 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Best selling product</h2>
        <button className="inline-flex h-9 items-center gap-2 rounded-[7px] bg-[#4EA674] px-4 text-sm text-white">
          Filter <Filter size={17} />
        </button>
      </div>
      <table className="w-full text-left text-sm">
        <thead className="bg-[#eaf8e7] text-slate-500">
          <tr>
            <th className="rounded-l-[7px] px-5 py-4 font-medium">PRODUCT</th>
            <th className="px-5 py-4 font-medium">TOTAL ORDER</th>
            <th className="px-5 py-4 font-medium">STATUS</th>
            <th className="rounded-r-[7px] px-5 py-4 font-medium">PRICE</th>
          </tr>
        </thead>
        <tbody>
          {topProducts.map((product, index) => (
            <tr key={product.name}>
              <td className="flex items-center gap-3 px-5 py-4 font-semibold text-[#07383f]">
                <img src={product.image} alt="" className="h-8 w-8 rounded object-cover" />
                {product.name}
              </td>
              <td className="px-5 py-4">{[104, 56, 266, 506][index]}</td>
              <td className="px-5 py-4">
                <span className={`mr-2 inline-block h-2 w-2 rounded-full ${index === 1 ? 'bg-red-500' : 'bg-green-500'}`} />
                <span className={index === 1 ? 'text-red-500' : 'text-green-500'}>{index === 1 ? 'Stock out' : 'Stock'}</span>
              </td>
              <td className="px-5 py-4 font-bold text-[#07383f]">$999.00</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="mt-5 float-right h-9 rounded-full border border-[#6c63ff] px-8 text-sm text-[#6c63ff]">Details</button>
    </Panel>
  );
}

function AddNewProductPanel() {
  return (
    <Panel className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Add New Product</h2>
        <a className="inline-flex items-center gap-1 text-sm text-[#6c63ff]">
          <CirclePlus size={16} /> Add New
        </a>
      </div>
      <p className="mb-3 text-sm text-slate-500">Categories</p>
      <div className="space-y-3">
        {adminCategories.slice(0, 3).map((category) => (
          <div key={category.id} className="flex items-center gap-3 rounded-[7px] border border-slate-100 bg-white p-2 shadow-sm">
            <img src={category.image} alt="" className="h-10 w-10 rounded object-cover" />
            <span className="flex-1 font-medium">{category.name.replace('Electronics', 'Electronic').replace('Home & Lifestyle', 'Home')}</span>
            <span>›</span>
          </div>
        ))}
      </div>
      <p className="my-5 text-center text-sm text-[#6c63ff]">See more</p>
      <p className="mb-3 text-sm text-slate-500">Product</p>
      <div className="space-y-3">
        {addProducts.map((product) => (
          <div key={product.name} className="flex items-center gap-3 border-b border-slate-200 pb-3">
            <img src={product.image} alt="" className="h-10 w-10 rounded object-cover" />
            <div className="flex-1">
              <p className="text-sm">{product.name}</p>
              <p className="text-sm font-semibold text-[#4EA674]">{product.price}</p>
            </div>
            <button className="inline-flex h-7 items-center gap-1 rounded-full bg-[#4EA674] px-3 text-xs text-white">
              <CirclePlus size={13} /> Add
            </button>
          </div>
        ))}
      </div>
      <p className="mt-5 text-center text-sm text-[#6c63ff]">See more</p>
    </Panel>
  );
}

export default function AdminDashboardPage() {
  return (
    <>
      <PageTitle title="Dashboard" />
      <div className="grid gap-5 xl:grid-cols-3">
        <MetricCard title="Total Sales" value="$350K" change="10.4%" detail="Previous 7days ($235)" />
        <MetricCard title="Total Orders" value="10.7K" change="14.4%" detail="Previous 7days (7.6k)" />
        <Panel className="p-5">
          <div className="mb-4 flex justify-between">
            <div>
              <h3 className="text-lg font-semibold">Pending & Canceled</h3>
              <p className="mt-2 text-sm text-slate-500">Last 7 days</p>
            </div>
            <EllipsisVertical size={20} className="text-slate-500" />
          </div>
          <div className="grid grid-cols-2 divide-x divide-slate-200">
            <div>
              <p className="text-sm">Pending</p>
              <p className="mt-2 text-2xl font-bold text-[#07383f]">509 <span className="text-sm font-normal text-[#4EA674]">user 204</span></p>
            </div>
            <div className="pl-6">
              <p className="text-sm">Canceled</p>
              <p className="mt-2 text-2xl font-bold text-red-500">94 <span className="text-sm font-normal">↓ 14.4%</span></p>
            </div>
          </div>
          <button className="mt-8 float-right h-8 rounded-full border border-[#6c63ff] px-8 text-sm text-[#6c63ff]">Details</button>
        </Panel>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[2fr_1fr]">
        <DashboardReport />
        <Panel className="p-5">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-[#6c63ff]">Users in last 30 minutes</p>
              <p className="mt-2 text-3xl font-bold">21.5K</p>
            </div>
            <EllipsisVertical size={20} className="text-slate-500" />
          </div>
          <p className="mt-7 text-sm text-slate-500">Users per minute</p>
          <MiniBars />
          <CountrySales />
        </Panel>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[2fr_0.8fr]">
        <TransactionPanel />
        <TopProducts />
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[2fr_0.8fr]">
        <BestSelling />
        <AddNewProductPanel />
      </div>
    </>
  );
}
