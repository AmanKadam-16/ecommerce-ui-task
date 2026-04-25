import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

export default function SignUpPage() {
  const navigate = useNavigate();
  const login = useStore((s) => s.login);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>();

  const onSubmit = async (data: SignUpFormData) => {
    await new Promise((r) => setTimeout(r, 600));
    login({ id: 1, name: data.name, email: data.email });
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
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">Create an account</h1>
          <p className="text-gray-500 mb-8 text-sm">Enter your details below</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Name"
                {...register('name', { required: 'Name is required' })}
                className="w-full border-0 border-b border-gray-300 pb-2 text-sm outline-none focus:border-black transition-colors placeholder:text-gray-400"
              />
              {errors.name && (
                <p className="text-[#4EA674] text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

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
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Min 6 characters' },
                })}
                className="w-full border-0 border-b border-gray-300 pb-2 text-sm outline-none focus:border-black transition-colors placeholder:text-gray-400"
              />
              {errors.password && (
                <p className="text-[#4EA674] text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            <div className="space-y-3 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#4EA674] text-white py-3 rounded text-sm font-medium hover:bg-[#3d8f63] transition-colors disabled:opacity-60"
              >
                {isSubmitting ? 'Creating account...' : 'Create Account'}
              </button>

              <button
                type="button"
                className="w-full border border-gray-300 py-3 rounded text-sm font-medium flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign up with Google
              </button>
            </div>

            <p className="text-sm text-gray-500 text-center">
              Already have account?{' '}
              <Link to="/login" className="text-black font-medium underline hover:text-gray-700">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
