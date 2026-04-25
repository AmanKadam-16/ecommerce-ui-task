import { ChevronDown } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <div className="bg-black text-white text-sm py-2 px-4 flex items-center justify-between">
      <div className="flex-1 text-center">
        <span>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! </span>
        <a href="#" className="font-semibold underline hover:text-gray-300 transition-colors">
          ShopNow
        </a>
      </div>
      <button className="flex items-center gap-1 text-white hover:text-gray-300 transition-colors ml-4 shrink-0">
        English
        <ChevronDown size={14} />
      </button>
    </div>
  );
}
