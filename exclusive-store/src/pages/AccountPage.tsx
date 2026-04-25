import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import Breadcrumb from '../components/ui/Breadcrumb';

interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const sidebarLinks = [
  {
    section: 'Manage My Account',
    links: ['My Profile', 'Address Book', 'My Payment Options'],
  },
  {
    section: 'My Orders',
    links: ['My Returns', 'My Cancellations'],
  },
  {
    section: 'My WishList',
    links: [],
  },
];

export default function AccountPage() {
  const { user } = useStore();
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<ProfileFormData>({
    defaultValues: {
      firstName: user?.name?.split(' ')[0] || 'Md',
      lastName: user?.name?.split(' ')[1] || 'Rimel',
      email: user?.email || 'rimel1111@gmail.com',
      address: 'Kingston, 5236, United State',
    },
  });

  const onSubmit = async (_data: ProfileFormData) => {
    await new Promise((r) => setTimeout(r, 600));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-16 py-8">
      <div className="flex items-center justify-between mb-8">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'My Account' }]} />
        <p className="text-sm text-gray-600">
          Welcome! <span className="text-[#4EA674] font-medium">{user?.name || 'Md Rimel'}</span>
        </p>
      </div>

      <div className="flex gap-12">
        {/* Sidebar */}
        <aside className="w-52 shrink-0">
          {sidebarLinks.map((group) => (
            <div key={group.section} className="mb-6">
              <p className="font-semibold text-gray-900 mb-2">{group.section}</p>
              {group.links.map((link, i) => (
                <Link
                  key={link}
                  to="#"
                  className={`block text-sm py-1 pl-4 transition-colors ${
                    group.section === 'Manage My Account' && i === 0
                      ? 'text-[#4EA674] font-medium'
                      : 'text-gray-500 hover:text-[#4EA674]'
                  }`}
                >
                  {link}
                </Link>
              ))}
            </div>
          ))}
        </aside>

        {/* Form */}
        <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-100 p-8">
          <h2 className="text-xl font-semibold text-[#4EA674] mb-6">Edit Your Profile</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  {...register('firstName')}
                  className="w-full bg-gray-50 border border-gray-200 rounded px-4 py-2.5 text-sm outline-none focus:border-[#4EA674] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  {...register('lastName')}
                  className="w-full bg-gray-50 border border-gray-200 rounded px-4 py-2.5 text-sm outline-none focus:border-[#4EA674] transition-colors"
                />
              </div>
            </div>

            {/* Email & Address */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  {...register('email')}
                  type="email"
                  className="w-full bg-gray-50 border border-gray-200 rounded px-4 py-2.5 text-sm outline-none focus:border-[#4EA674] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  {...register('address')}
                  className="w-full bg-gray-50 border border-gray-200 rounded px-4 py-2.5 text-sm outline-none focus:border-[#4EA674] transition-colors"
                />
              </div>
            </div>

            {/* Password section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Password Changes</label>
              <div className="space-y-3">
                <input
                  {...register('currentPassword')}
                  type="password"
                  placeholder="Current Password"
                  className="w-full bg-gray-50 border border-gray-200 rounded px-4 py-2.5 text-sm outline-none focus:border-[#4EA674] transition-colors placeholder:text-gray-400"
                />
                <input
                  {...register('newPassword')}
                  type="password"
                  placeholder="New Password"
                  className="w-full bg-gray-50 border border-gray-200 rounded px-4 py-2.5 text-sm outline-none focus:border-[#4EA674] transition-colors placeholder:text-gray-400"
                />
                <input
                  {...register('confirmPassword')}
                  type="password"
                  placeholder="Confirm New Password"
                  className="w-full bg-gray-50 border border-gray-200 rounded px-4 py-2.5 text-sm outline-none focus:border-[#4EA674] transition-colors placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4 pt-2">
              <button type="button" className="text-sm text-gray-600 hover:text-black transition-colors px-4 py-2">
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#4EA674] text-white px-8 py-2.5 rounded text-sm font-medium hover:bg-[#3d8f63] transition-colors disabled:opacity-60"
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
