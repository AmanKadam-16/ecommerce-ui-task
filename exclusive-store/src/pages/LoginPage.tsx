import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useStore((s) => s.login);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    await new Promise((r) => setTimeout(r, 600));
    login({ id: 1, name: 'User', email: data.email });
    navigate('/');
  };

  return (
    <div className="flex min-h-[calc(100vh-130px)]">
      {/* Left image */}
      <div className="hidden md:block flex-1 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=900&fit=crop"
          alt="Shopping"
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://placehold.co/800x900/dbeafe/1e40af?text=Shopping';
          }}
        />
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-sm">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">Log in to Exclusive</h1>
          <p className="text-gray-500 mb-8 text-sm">Enter your details below</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Email or Phone Number"
                {...register('email', { required: 'Email is required' })}
                className="w-full border-0 border-b border-gray-300 pb-2 text-sm outline-none focus:border-black transition-colors placeholder:text-gray-400"
              />
              {errors.email && (
                <p className="text-[#4EA674] text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Min 6 characters' } })}
                className="w-full border-0 border-b border-gray-300 pb-2 text-sm outline-none focus:border-black transition-colors placeholder:text-gray-400"
              />
              {errors.password && (
                <p className="text-[#4EA674] text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#4EA674] text-white px-10 py-3 rounded text-sm font-medium hover:bg-[#3d8f63] transition-colors disabled:opacity-60"
              >
                {isSubmitting ? 'Logging in...' : 'Log In'}
              </button>
              <Link to="/forgot-password" className="text-sm text-[#4EA674] hover:underline">
                Forget Password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
