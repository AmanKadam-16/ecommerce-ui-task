import { Link } from 'react-router-dom';
import Breadcrumb from '../components/ui/Breadcrumb';

export default function NotFoundPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-16 py-8">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: '404 Error' }]} />

      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h1 className="text-7xl lg:text-8xl font-bold text-gray-900 mb-6">
          404 Not Found
        </h1>
        <p className="text-gray-500 mb-10">
          Your visited page not found. You may go home page.
        </p>
        <Link
          to="/"
          className="bg-[#4EA674] text-white px-12 py-3 rounded text-sm font-medium hover:bg-[#3d8f63] transition-colors"
        >
          Back to home page
        </Link>
      </div>
    </div>
  );
}
