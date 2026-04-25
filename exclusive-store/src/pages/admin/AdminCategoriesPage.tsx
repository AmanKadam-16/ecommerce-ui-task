import { CirclePlus, Edit3, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { adminCategories, adminProducts } from '../../data/adminData';
import { ActionButton, MoreButton, PageTitle, Pagination, Panel, TableToolbar } from '../../components/admin/AdminUI';

export default function AdminCategoriesPage() {
  const tabs = ['All Product (145)', 'Featured Products', 'On Sale', 'Out of Stock'];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [search, setSearch] = useState('');
  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return adminProducts.filter((product, index) => {
      const matchesSearch = [product.name, product.createdDate, String(product.orders)].some((value) =>
        value.toLowerCase().includes(query),
      );
      const matchesTab =
        activeTab === tabs[0] ||
        (activeTab === 'Featured Products' && index < 5) ||
        (activeTab === 'On Sale' && product.orders >= 35) ||
        (activeTab === 'Out of Stock' && product.orders <= 16);

      return matchesSearch && matchesTab;
    });
  }, [activeTab, search, tabs]);

  return (
    <>
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
        <div>
          <PageTitle title="Categories" />
          <h2 className="-mt-5 mb-10 text-2xl font-bold text-[#07383f]">Discover</h2>
        </div>
        <div className="mt-8 flex gap-3">
          <ActionButton>
            <CirclePlus size={22} /> Add Product
          </ActionButton>
          <MoreButton />
        </div>
      </div>

      <div className="relative mb-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {adminCategories.map((category) => (
          <Panel key={category.id} className="flex h-[90px] items-center gap-4 p-3">
            <img src={category.image} alt="" className="h-16 w-16 rounded-[4px] border border-slate-200 object-cover" />
            <h3 className="text-lg font-medium">{category.name}</h3>
          </Panel>
        ))}
        <button className="absolute -right-12 top-1/2 hidden h-12 w-12 -translate-y-1/2 rounded-full bg-white text-3xl text-[#07383f] shadow-md xl:block">›</button>
      </div>

      <Panel className="p-6">
        <TableToolbar
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search your product"
          sortIcon="filter"
        />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px] text-left text-sm">
            <thead className="bg-[#eaf8e7] text-[#07383f]">
              <tr>
                <th className="rounded-l-[5px] px-4 py-4 font-medium">No.</th>
                <th className="px-4 py-4 font-medium">Product</th>
                <th className="px-4 py-4 font-medium">Created Date</th>
                <th className="px-4 py-4 font-medium">Order</th>
                <th className="rounded-r-[5px] px-4 py-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {visibleProducts.map((product) => (
                <tr key={`${product.name}-${product.orders}`} className="border-b border-slate-200">
                  <td className="px-4 py-3">
                    <span className="mr-3 inline-block h-5 w-5 rounded border border-[#dff4df]" />
                    1
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={product.image} alt="" className="h-10 w-10 rounded border border-slate-200 object-cover" />
                      <span className="max-w-[210px] font-medium">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">{product.createdDate}</td>
                  <td className="px-4 py-3">{product.orders}</td>
                  <td className="px-4 py-3 text-slate-500">
                    <Edit3 size={18} className="mr-3 inline-block" />
                    <Trash2 size={18} className="inline-block" />
                  </td>
                </tr>
              ))}
              {visibleProducts.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-slate-500">
                    No products match your filters.
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
