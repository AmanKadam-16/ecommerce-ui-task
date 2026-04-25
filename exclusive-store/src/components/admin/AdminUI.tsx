import {
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
  Filter,
  Search,
  SlidersHorizontal,
} from 'lucide-react';
import { useState } from 'react';
import type { ReactNode } from 'react';

export function PageTitle({ title }: { title: string }) {
  return <h1 className="mb-14 pt-1 text-[23px] font-bold text-[#07383f]">{title}</h1>;
}

export function Panel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-[8px] border border-slate-100 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.15)] ${className}`}>
      {children}
    </section>
  );
}

export function MetricCard({
  title,
  value,
  detail = 'Last 7 days',
  change,
  negative = false,
}: {
  title: string;
  value: string;
  detail?: string;
  change?: string;
  negative?: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Panel className="relative p-5">
      <div className="mb-5 flex items-start justify-between">
        <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="rounded p-1 text-slate-500 hover:bg-slate-100"
          aria-label={`${title} options`}
        >
          <EllipsisVertical size={20} />
        </button>
      </div>
      {menuOpen && (
        <div className="absolute right-5 top-12 z-20 w-36 rounded-[6px] border border-slate-100 bg-white py-2 text-sm shadow-lg">
          <button type="button" className="block w-full px-4 py-2 text-left hover:bg-[#eef8f1]">View details</button>
          <button type="button" className="block w-full px-4 py-2 text-left hover:bg-[#eef8f1]">Export data</button>
        </div>
      )}
      <div className="flex items-end gap-2">
        <p className="text-[32px] font-bold leading-none text-[#07383f]">{value}</p>
        {change && (
          <span className={`pb-1 text-sm ${negative ? 'text-red-500' : 'text-green-500'}`}>
            {negative ? '↓' : '↑'} {change}
          </span>
        )}
      </div>
      <p className="mt-3 text-sm text-slate-500">{detail}</p>
    </Panel>
  );
}

export function ActionButton({ children }: { children: ReactNode }) {
  const [pressed, setPressed] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        setPressed(true);
        window.setTimeout(() => setPressed(false), 1400);
      }}
      className="relative inline-flex h-12 items-center gap-2 rounded-[7px] bg-[#4EA674] px-5 text-sm font-semibold text-white hover:bg-[#3d8f63]"
    >
      {children}
      {pressed && (
        <span className="absolute left-1/2 top-[calc(100%+8px)] z-20 -translate-x-1/2 whitespace-nowrap rounded bg-[#07383f] px-3 py-1 text-xs text-white shadow">
          Ready for next form batch
        </span>
      )}
    </button>
  );
}

export function MoreButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-12 items-center gap-3 rounded-[7px] border border-slate-200 bg-white px-6 text-sm font-semibold text-[#07383f] hover:bg-slate-50"
      >
        More Action
        <EllipsisVertical size={18} />
      </button>
      {open && (
        <div className="absolute right-0 top-14 z-30 w-44 rounded-[7px] border border-slate-100 bg-white py-2 text-sm shadow-lg">
          <button type="button" className="block w-full px-4 py-2 text-left hover:bg-[#eef8f1]">Import CSV</button>
          <button type="button" className="block w-full px-4 py-2 text-left hover:bg-[#eef8f1]">Export report</button>
          <button type="button" className="block w-full px-4 py-2 text-left hover:bg-[#eef8f1]">Bulk update</button>
        </div>
      )}
    </div>
  );
}

export function SegmentedTabs({
  tabs,
  activeTab,
  onChange,
}: {
  tabs: string[];
  activeTab?: string;
  onChange?: (tab: string) => void;
}) {
  const [internalActive, setInternalActive] = useState(tabs[0]);
  const currentTab = activeTab ?? internalActive;

  return (
    <div className="inline-flex rounded-[7px] bg-[#eaf8e7] p-1">
      {tabs.map((tab) => (
        <button
          type="button"
          key={tab}
          onClick={() => {
            setInternalActive(tab);
            onChange?.(tab);
          }}
          className={`h-9 min-w-[118px] rounded-[6px] px-4 text-sm font-medium ${
            currentTab === tab ? 'bg-white text-slate-900 ring-2 ring-[#dff4df]' : 'text-slate-600 hover:text-[#07383f]'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export function TableToolbar({
  tabs,
  searchPlaceholder,
  sortIcon = 'filter',
  searchValue,
  onSearchChange,
  activeTab,
  onTabChange,
}: {
  tabs: string[];
  searchPlaceholder: string;
  sortIcon?: 'filter' | 'sort';
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}) {
  const SortIcon = sortIcon === 'filter' ? Filter : SlidersHorizontal;
  const [localSearch, setLocalSearch] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const currentSearch = searchValue ?? localSearch;

  function handleSearchChange(value: string) {
    setLocalSearch(value);
    onSearchChange?.(value);
  }

  return (
    <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <SegmentedTabs tabs={tabs} activeTab={activeTab} onChange={onTabChange} />
      <div className="flex items-center gap-3">
        <label className="flex h-10 w-full min-w-[260px] items-center gap-3 rounded-[7px] bg-[#fafbfc] px-4 text-sm text-slate-500 md:w-[300px]">
          <input
            value={currentSearch}
            onChange={(event) => handleSearchChange(event.target.value)}
            placeholder={searchPlaceholder}
            className="min-w-0 flex-1 bg-transparent text-slate-800 outline-none placeholder:text-slate-500"
          />
          <Search size={22} />
        </label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setFilterOpen((open) => !open)}
            className="grid h-10 w-10 place-items-center rounded-[5px] border border-slate-200 text-slate-600 hover:bg-slate-50"
            aria-label="Filter table"
          >
            <SortIcon size={18} />
          </button>
          {filterOpen && (
            <div className="absolute right-0 top-12 z-30 w-36 rounded-[6px] border border-slate-100 bg-white py-2 text-sm shadow-lg">
              <button type="button" className="block w-full px-4 py-2 text-left hover:bg-[#eef8f1]">Newest first</button>
              <button type="button" className="block w-full px-4 py-2 text-left hover:bg-[#eef8f1]">Most ordered</button>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={() => {
            handleSearchChange('');
            onTabChange?.(tabs[0]);
          }}
          className="grid h-10 w-10 place-items-center rounded-[5px] border border-slate-200 text-slate-600 hover:bg-slate-50"
          aria-label="Reset filters"
        >
          <SlidersHorizontal size={18} />
        </button>
        <div className="relative">
          <button
            type="button"
            onClick={() => setToolsOpen((open) => !open)}
            className="grid h-10 w-10 place-items-center rounded-[5px] border border-slate-200 text-slate-600 hover:bg-slate-50"
            aria-label="More table actions"
          >
            <EllipsisVertical size={18} />
          </button>
          {toolsOpen && (
            <div className="absolute right-0 top-12 z-30 w-36 rounded-[6px] border border-slate-100 bg-white py-2 text-sm shadow-lg">
              <button type="button" className="block w-full px-4 py-2 text-left hover:bg-[#eef8f1]">Refresh</button>
              <button type="button" className="block w-full px-4 py-2 text-left hover:bg-[#eef8f1]">Columns</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function Pagination() {
  const pages = ['1', '2', '3', '4', '5', '.....', '24'];
  const [currentPage, setCurrentPage] = useState(1);

  function setPage(page: string) {
    if (!page.includes('.')) {
      setCurrentPage(Number(page));
    }
  }

  return (
    <div className="mt-9 flex flex-col items-center justify-between gap-5 md:flex-row">
      <button
        type="button"
        onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
        className="inline-flex h-11 items-center gap-2 rounded-[7px] bg-white px-4 text-sm shadow-[0_1px_4px_rgba(15,23,42,0.16)] hover:bg-slate-50"
      >
        <ChevronLeft size={18} />
        Previous
      </button>
      <div className="flex items-center gap-3">
        {pages.map((page, index) => (
          <button
            type="button"
            key={`${page}-${index}`}
            onClick={() => setPage(page)}
            className={`h-9 min-w-9 rounded-[4px] border px-3 text-sm ${
              String(currentPage) === page
                ? 'border-[#bce9bd] bg-[#bce9bd] text-[#07383f]'
                : 'border-slate-200 bg-white text-[#07383f] hover:bg-slate-50'
            }`}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setCurrentPage((page) => Math.min(24, page + 1))}
        className="inline-flex h-11 items-center gap-2 rounded-[7px] bg-white px-4 text-sm shadow-[0_1px_4px_rgba(15,23,42,0.16)] hover:bg-slate-50"
      >
        Next
        <ChevronRight size={18} />
      </button>
    </div>
  );
}

export function AreaChart({ tall = false }: { tall?: boolean }) {
  const points = [
    { day: 'Sun', value: '21,800', x: 0, y: 150 },
    { day: 'Mon', value: '37,200', x: 130, y: 80 },
    { day: 'Tue', value: '26,100', x: 300, y: 120 },
    { day: 'Wed', value: '25,409', x: 360, y: 120 },
    { day: 'Thu', value: '49,600', x: 500, y: 54 },
    { day: 'Fri', value: '30,400', x: 590, y: 132 },
    { day: 'Sat', value: '42,000', x: 690, y: 70 },
  ];
  const [activePoint, setActivePoint] = useState(points[3]);

  return (
    <div className={`relative ${tall ? 'h-[260px]' : 'h-[220px]'} overflow-hidden`}>
      <div className="absolute left-0 top-0 flex h-full w-10 flex-col justify-between pb-8 pt-1 text-xs text-slate-400">
        {['50k', '40k', '30k', '20k', '10k', '0k'].map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
      <svg className="absolute inset-y-0 left-10 right-0 h-full w-[calc(100%-40px)]" viewBox="0 0 720 230" preserveAspectRatio="none">
        <defs>
          <linearGradient id="adminArea" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#4EA674" stopOpacity="0.34" />
            <stop offset="100%" stopColor="#4EA674" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <path
          d="M0 150 C55 150 65 150 95 115 C130 76 145 80 220 80 C285 80 310 128 365 120 C420 112 410 58 460 54 C520 50 535 44 560 84 C590 132 635 128 648 96 C660 66 680 70 720 70 L720 220 L0 220 Z"
          fill="url(#adminArea)"
        />
        <path
          d="M0 150 C55 150 65 150 95 115 C130 76 145 80 220 80 C285 80 310 128 365 120 C420 112 410 58 460 54 C520 50 535 44 560 84 C590 132 635 128 648 96 C660 66 680 70 720 70"
          fill="none"
          stroke="#4EA674"
          strokeWidth="3"
        />
        <line x1={activePoint.x} x2={activePoint.x} y1={activePoint.y} y2="220" stroke="#bce9bd" strokeDasharray="5 6" strokeWidth="2" />
        <circle cx={activePoint.x} cy={activePoint.y} r="7" fill="#fff" stroke="#8fd38e" strokeWidth="3" />
        {points.map((point) => (
          <circle
            key={point.day}
            cx={point.x}
            cy={point.y}
            r="20"
            fill="transparent"
            className="cursor-pointer"
            onMouseEnter={() => setActivePoint(point)}
            onFocus={() => setActivePoint(point)}
            tabIndex={0}
          />
        ))}
      </svg>
      <div
        className="absolute rounded-[7px] border border-[#8fd38e] bg-[#bce9bd] px-6 py-2 text-center text-xs font-semibold text-[#07383f] shadow-sm transition-all"
        style={{
          left: `calc(40px + ${(activePoint.x / 720) * 100}% - 42px)`,
          top: `${Math.max(12, activePoint.y - 42)}px`,
        }}
      >
        {activePoint.day}
        <br />
        {activePoint.value}
      </div>
      <div className="absolute bottom-0 left-10 right-0 grid grid-cols-7 text-center text-xs text-slate-500">
        {points.map((point) => (
          <button
            type="button"
            key={point.day}
            onMouseEnter={() => setActivePoint(point)}
            onFocus={() => setActivePoint(point)}
            onClick={() => setActivePoint(point)}
            className={activePoint.day === point.day ? 'font-bold text-[#07383f]' : 'hover:text-[#07383f]'}
          >
            {point.day}
          </button>
        ))}
      </div>
    </div>
  );
}
