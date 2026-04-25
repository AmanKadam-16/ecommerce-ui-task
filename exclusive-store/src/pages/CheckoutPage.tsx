import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import Breadcrumb from '../components/ui/Breadcrumb';

interface BillingFormData {
  firstName: string;
  companyName: string;
  streetAddress: string;
  apartment: string;
  townCity: string;
  phone: string;
  email: string;
  saveInfo: boolean;
}

export default function CheckoutPage() {
  const { cart } = useStore();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<'bank' | 'cod'>('cod');
  const [coupon, setCoupon] = useState('');

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<BillingFormData>({
    defaultValues: { saveInfo: true },
  });

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const onSubmit = async (_data: BillingFormData) => {
    await new Promise((r) => setTimeout(r, 800));
    navigate('/');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-16 py-8">
      <Breadcrumb items={[
        { label: 'Account', href: '/account' },
        { label: 'My Account', href: '/account' },
        { label: 'Product', href: '/' },
        { label: 'View Cart', href: '/cart' },
        { label: 'CheckOut' },
      ]} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Billing Details */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">Billing Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">First Name<span className="text-[#4EA674]">*</span></label>
                <input
                  {...register('firstName', { required: true })}
                  className={`w-full bg-gray-50 border rounded px-4 py-2.5 text-sm outline-none focus:border-[#4EA674] transition-colors ${errors.firstName ? 'border-red-400' : 'border-gray-200'}`}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Company Name</label>
                <input
                  {...register('companyName')}
                  className="w-full bg-gray-50 border border-gray-200 rounded px-4 py-2.5 text-sm outline-none focus:border-[#4EA674] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Street Address<span className="text-[#4EA674]">*</span></label>
                <input
                  {...register('streetAddress', { required: true })}
                  className={`w-full bg-gray-50 border rounded px-4 py-2.5 text-sm outline-none focus:border-[#4EA674] transition-colors ${errors.streetAddress ? 'border-red-400' : 'border-gray-200'}`}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Apartment, floor, etc. (optional)</label>
                <input
                  {...register('apartment')}
                  className="w-full bg-gray-50 border border-gray-200 rounded px-4 py-2.5 text-sm outline-none focus:border-[#4EA674] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Town/City<span className="text-[#4EA674]">*</span></label>
                <input
                  {...register('townCity', { required: true })}
                  className={`w-full bg-gray-50 border rounded px-4 py-2.5 text-sm outline-none focus:border-[#4EA674] transition-colors ${errors.townCity ? 'border-red-400' : 'border-gray-200'}`}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Phone Number<span className="text-[#4EA674]">*</span></label>
                <input
                  {...register('phone', { required: true })}
                  type="tel"
                  className={`w-full bg-gray-50 border rounded px-4 py-2.5 text-sm outline-none focus:border-[#4EA674] transition-colors ${errors.phone ? 'border-red-400' : 'border-gray-200'}`}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Email Address<span className="text-[#4EA674]">*</span></label>
                <input
                  {...register('email', { required: true })}
                  type="email"
                  className={`w-full bg-gray-50 border rounded px-4 py-2.5 text-sm outline-none focus:border-[#4EA674] transition-colors ${errors.email ? 'border-red-400' : 'border-gray-200'}`}
                />
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register('saveInfo')}
                  className="w-4 h-4 accent-[#4EA674] rounded"
                />
                <span className="text-sm text-gray-700">Save this information for faster check-out next time</span>
              </label>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Items */}
            <div className="space-y-4 pt-4">
              {cart.length > 0 ? cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                      onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/48x48/f3f4f6/9ca3af?text=P'; }}
                    />
                    <span className="text-sm text-gray-700">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium">${item.price * item.quantity}</span>
                </div>
              )) : (
                <>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded" />
                      <span className="text-sm text-gray-700">LCD Monitor</span>
                    </div>
                    <span className="text-sm font-medium">$650</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded" />
                      <span className="text-sm text-gray-700">H1 Gamepad</span>
                    </div>
                    <span className="text-sm font-medium">$1100</span>
                  </div>
                </>
              )}
            </div>

            {/* Totals */}
            <div className="space-y-3 text-sm border-t border-gray-200 pt-4">
              <div className="flex justify-between">
                <span className="text-gray-700">Subtotal:</span>
                <span>${subtotal || 1750}</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-3">
                <span className="text-gray-700">Shipping:</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-3">
                <span className="font-medium text-gray-900">Total:</span>
                <span className="font-semibold">${subtotal || 1750}</span>
              </div>
            </div>

            {/* Payment */}
            <div className="space-y-3">
              <label className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    value="bank"
                    checked={paymentMethod === 'bank'}
                    onChange={() => setPaymentMethod('bank')}
                    className="accent-[#4EA674]"
                  />
                  <span className="text-sm font-medium">Bank</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-red-500 text-white px-1.5 py-0.5 rounded font-bold">bKash</span>
                  <span className="text-xs bg-blue-700 text-white px-1.5 py-0.5 rounded font-bold">VISA</span>
                  <span className="text-xs bg-red-600 text-white px-1.5 py-0.5 rounded font-bold">MC</span>
                </div>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="accent-[#4EA674]"
                />
                <span className="text-sm font-medium">Cash on delivery</span>
              </label>
            </div>

            {/* Coupon */}
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Coupon Code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="flex-1 border border-gray-300 rounded px-4 py-2.5 text-sm outline-none focus:border-[#4EA674] transition-colors"
              />
              <button
                type="button"
                className="bg-[#4EA674] text-white px-5 py-2.5 rounded text-sm font-medium hover:bg-[#3d8f63] transition-colors"
              >
                Apply Coupon
              </button>
            </div>

            {/* Place Order */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#4EA674] text-white px-8 py-3 rounded text-sm font-medium hover:bg-[#3d8f63] transition-colors disabled:opacity-60"
            >
              {isSubmitting ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
