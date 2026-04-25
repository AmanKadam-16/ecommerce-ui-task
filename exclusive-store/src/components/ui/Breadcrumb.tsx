import { Link } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <span>/</span>}
          {item.href ? (
            <Link to={item.href} className="hover:text-black transition-colors">{item.label}</Link>
          ) : (
            <span className="text-black font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
