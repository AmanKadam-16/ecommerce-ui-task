import { Calendar, Check, CirclePlus, Image as ImageIcon, Pencil, RefreshCw, Save, Search, Wand2, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { adminCategories } from '../../data/adminData';
import { PageTitle, Panel } from '../../components/admin/AdminUI';

const phoneImages = [
  'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=420&h=360&fit=contain&bg=white',
  'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=110&h=110&fit=crop',
  'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=110&h=110&fit=crop&sat=-60',
];

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-3 block text-sm font-semibold text-[#07383f]">{label}</span>
      {children}
    </label>
  );
}

export default function AdminAddProductPage() {
  const [productName, setProductName] = useState('iPhone 15');
  const [description, setDescription] = useState('The iPhone 15 delivers cutting-edge performance with the A16 Bionic chip, an immersive Super Retina XDR display, advanced dual-camera system, and exceptional battery life, all encased in stunning aerospace-grade aluminum.');
  const [price, setPrice] = useState('999.89');
  const [discount, setDiscount] = useState('99');
  const [taxIncluded, setTaxIncluded] = useState(true);
  const [unlimited, setUnlimited] = useState(true);
  const [featured, setFeatured] = useState(true);
  const [category, setCategory] = useState('Electronic');
  const [tag, setTag] = useState('Smartphone');
  const [selectedColor, setSelectedColor] = useState('#dcefd1');
  const [toast, setToast] = useState('');
  const salePrice = useMemo(() => Math.max(0, Number(price || 0) - Number(discount || 0)).toFixed(2), [discount, price]);

  function flash(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(''), 1600);
  }

  return (
    <>
      <PageTitle title="Add Product" />
      <div className="-mt-5 mb-8 flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
        <h2 className="text-2xl font-bold text-[#07383f]">Add New Product</h2>
        <div className="flex flex-wrap gap-3">
          <label className="flex h-12 w-[320px] items-center gap-3 rounded-[7px] border border-slate-200 bg-white px-4 text-slate-500">
            <input className="min-w-0 flex-1 outline-none" placeholder="Search product for add" />
            <Search size={23} />
          </label>
          <button type="button" onClick={() => flash('Product published')} className="h-12 rounded-[7px] bg-[#4EA674] px-5 font-semibold text-white hover:bg-[#3d8f63]">Publish Product</button>
          <button type="button" onClick={() => flash('Draft saved')} className="inline-flex h-12 items-center gap-2 rounded-[7px] border border-slate-200 bg-white px-5 font-semibold text-[#07383f] hover:bg-slate-50">
            <Save size={17} /> Save to draft
          </button>
          <button type="button" onClick={() => flash('New blank product ready')} className="grid h-12 w-12 place-items-center rounded-[7px] border border-slate-200 bg-white text-slate-600 hover:bg-slate-50">
            <CirclePlus size={24} />
          </button>
        </div>
      </div>

      {toast && <div className="fixed right-6 top-24 z-40 rounded bg-[#07383f] px-4 py-2 text-sm text-white shadow-lg">{toast}</div>}

      <div className="grid gap-5 xl:grid-cols-[1.25fr_1fr]">
        <Panel className="p-6">
          <h2 className="mb-7 text-2xl font-bold text-slate-800">Basic Details</h2>
          <div className="space-y-7">
            <Field label="Product Name">
              <input value={productName} onChange={(event) => setProductName(event.target.value)} className="h-12 w-full rounded-[7px] border border-slate-200 bg-[#fafbfc] px-4 font-medium outline-none focus:border-[#4EA674]" />
            </Field>
            <Field label="Product Description">
              <div className="rounded-[7px] border border-slate-200 bg-[#fafbfc] p-4">
                <textarea value={description} onChange={(event) => setDescription(event.target.value)} className="min-h-[110px] w-full resize-none bg-transparent leading-7 outline-none" />
                <div className="flex justify-end gap-4 text-slate-600">
                  <Pencil size={20} />
                  <Wand2 size={20} />
                </div>
              </div>
            </Field>
          </div>

          <h2 className="mb-7 mt-8 text-2xl font-bold text-slate-800">Pricing</h2>
          <div className="grid gap-7">
            <Field label="Product Price">
              <div className="flex h-12 items-center rounded-[7px] border border-slate-200 bg-[#fafbfc] px-4">
                <span className="font-bold">$</span>
                <input value={price} onChange={(event) => setPrice(event.target.value)} className="min-w-0 flex-1 bg-transparent px-1 font-bold outline-none" />
                <span className="border-l pl-4 text-sm text-slate-600">USD</span>
              </div>
            </Field>
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Discounted Price (Optional)">
                <div className="flex h-12 items-center rounded-[7px] border border-slate-200 bg-[#fafbfc] px-4">
                  <span className="mr-3 rounded bg-[#eaf8e7] px-3 py-2 font-bold">$</span>
                  <input value={discount} onChange={(event) => setDiscount(event.target.value)} className="min-w-0 flex-1 bg-transparent font-bold outline-none" />
                  <span className="font-bold">Sale= ${salePrice}</span>
                </div>
              </Field>
              <div>
                <p className="mb-3 text-sm font-semibold text-[#07383f]">Tax Included</p>
                <label className="mr-5 inline-flex items-center gap-2">
                  <input type="radio" checked={taxIncluded} onChange={() => setTaxIncluded(true)} /> Yes
                </label>
                <label className="inline-flex items-center gap-2 text-slate-500">
                  <input type="radio" checked={!taxIncluded} onChange={() => setTaxIncluded(false)} /> No
                </label>
              </div>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {['Start', 'End'].map((label) => (
                <Field key={label} label={label === 'Start' ? 'Expiration' : '\u00a0'}>
                  <button type="button" className="flex h-12 w-full items-center justify-between rounded-[7px] border border-slate-200 bg-[#fafbfc] px-4 text-left">
                    {label} <Calendar size={19} />
                  </button>
                </Field>
              ))}
            </div>
          </div>

          <h2 className="mb-7 mt-8 text-2xl font-bold text-slate-800">Inventory</h2>
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Stock Quantity">
              <input value={unlimited ? 'Unlimited' : '120'} readOnly className="h-12 w-full rounded-[7px] border border-slate-200 bg-[#fafbfc] px-4 outline-none" />
            </Field>
            <Field label="Stock Status">
              <select className="h-12 w-full rounded-[7px] border border-slate-200 bg-[#fafbfc] px-4 outline-none">
                <option>In Stock</option>
                <option>Low Stock</option>
                <option>Out of Stock</option>
              </select>
            </Field>
          </div>
          <button type="button" onClick={() => setUnlimited((value) => !value)} className="mt-3 inline-flex items-center gap-3">
            <span className={`flex h-6 w-12 items-center rounded-full p-1 ${unlimited ? 'justify-end bg-[#4EA674]' : 'justify-start bg-slate-300'}`}>
              <span className="h-4 w-4 rounded-full bg-white" />
            </span>
            Unlimited
          </button>
          <label className="mt-5 flex items-center gap-3 text-slate-500">
            <input type="checkbox" checked={featured} onChange={(event) => setFeatured(event.target.checked)} className="h-5 w-5 accent-[#4EA674]" />
            Highlight this product in a featured section.
          </label>
          <div className="mt-9 flex justify-end gap-3">
            <button type="button" onClick={() => flash('Draft saved')} className="inline-flex h-10 items-center gap-2 rounded-[7px] border border-slate-200 px-4 font-semibold"><Save size={16} /> Save to draft</button>
            <button type="button" onClick={() => flash('Product published')} className="h-10 rounded-[7px] bg-[#4EA674] px-5 font-semibold text-white">Publish Product</button>
          </div>
        </Panel>

        <Panel className="p-6">
          <h2 className="mb-7 text-2xl font-bold text-slate-800">Upload Product Image</h2>
          <p className="mb-3 text-sm font-semibold text-[#07383f]">Product Image</p>
          <div className="rounded-[7px] border border-slate-200 p-3">
            <div className="grid h-[250px] place-items-center">
              <img src={phoneImages[0]} alt="Product preview" className="max-h-[210px] object-contain" />
            </div>
            <div className="flex justify-between">
              <button type="button" className="inline-flex items-center gap-2 rounded-[6px] border border-slate-200 px-4 py-2 text-slate-500"><ImageIcon size={16} /> Browse</button>
              <button type="button" className="inline-flex items-center gap-2 rounded-[6px] border border-slate-200 px-4 py-2"><RefreshCw size={16} /> Replace</button>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-5">
            {phoneImages.slice(1).map((image) => (
              <div key={image} className="relative grid h-24 place-items-center rounded-[7px] border border-slate-200">
                <button type="button" className="absolute right-2 top-2 rounded-full border bg-white"><X size={12} /></button>
                <img src={image} alt="" className="h-16 object-contain" />
              </div>
            ))}
            <button type="button" className="grid h-24 place-items-center rounded-[7px] border border-dashed border-slate-400 text-[#4EA674]">
              <span className="text-center"><CirclePlus className="mx-auto mb-2" />Add Image</span>
            </button>
          </div>

          <h2 className="mb-5 mt-8 text-2xl font-bold text-slate-800">Categories</h2>
          <Field label="Product Categories">
            <select value={category} onChange={(event) => setCategory(event.target.value)} className="h-12 w-full rounded-[7px] border border-slate-200 bg-white px-4 outline-none">
              {adminCategories.slice(0, 4).map((item) => <option key={item.id}>{item.name.replace('Electronics', 'Electronic')}</option>)}
            </select>
          </Field>
          <div className="mt-5">
            <Field label="Product Tag">
              <select value={tag} onChange={(event) => setTag(event.target.value)} className="h-12 w-full rounded-[7px] border border-slate-200 bg-white px-4 outline-none">
                <option>Smartphone</option>
                <option>Featured</option>
                <option>New Arrival</option>
              </select>
            </Field>
          </div>
          <p className="mb-3 mt-6 text-sm font-semibold text-[#07383f]">Select your color</p>
          <div className="flex gap-4">
            {['#dcefd1', '#f2d2d7', '#d6dee2', '#efe9c8', '#42484c'].map((color) => (
              <button
                type="button"
                key={color}
                onClick={() => setSelectedColor(color)}
                className="grid h-12 w-12 place-items-center rounded-[7px] shadow"
                style={{ backgroundColor: color }}
                aria-label={`Select color ${color}`}
              >
                {selectedColor === color && <Check className="text-[#07383f]" size={18} />}
              </button>
            ))}
          </div>
        </Panel>
      </div>
    </>
  );
}
