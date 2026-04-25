import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import Breadcrumb from '../components/ui/Breadcrumb';

export default function CartPage() {
  const { cart, removeFromCart, addToCart } = useStore();
  const [coupon, setCoupon] = useState('');
  const navigate = useNavigate();

  const updateQty = (id: number, delta: number) => {
    const item = cart.find((i) => i.id === id);
    if (!item) return;
    if (delta < 0 && item.quantity === 1) {
      removeFromCart(id);
    } else if (delta > 0) {
      addToCart(item);
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-8">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Cart' }]} />
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-xl text-gray-500 mb-6">Your cart is empty</p>
          <Link to="/" className="bg-[#4EA674] text-white px-8 py-3 rounded hover:bg-[#3d8f63] transition-colors">
            Return To Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-16 py-8">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Cart' }]} />

      {/* Cart Table */}
      <div className="border border-gray-200 rounded-md overflow-hidden mb-6">
        {/* Header */}
        <div className="grid grid-cols-12 bg-white px-6 py-4 text-sm font-medium text-gray-700 border-b border-gray-200">
          <span className="col-span-5">Product</span>
          <span className="col-span-2">Price</span>
          <span className="col-span-3">Quantity</span>
          <span className="col-span-2 text-right">Subtotal</span>
        </div>

        {/* Items */}
        {cart.map((item) => (
          <div key={item.id} className="grid grid-cols-12 items-center px-6 py-5 border-b border-gray-100 last:border-0">
            <div className="col-span-5 flex items-center gap-4">
              <button
                onClick={() => removeFromCart(item.id)}
                className="w-5 h-5 rounded-full bg-[#4EA674] flex items-center justify-center shrink-0 hover:bg-[#3d8f63] transition-colors"
              >
                <Trash2 size={10} className="text-white" />
              </button>
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 object-cover rounded"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/48x48/f3f4f6/9ca3af?text=P'; }}
              />
              <span className="text-sm text-gray-800">{item.name}</span>
            </div>
            <span className="col-span-2 text-sm text-gray-700">${item.price}</span>
            <div className="col-span-3">
              <div className="flex items-center border border-gray-300 rounded w-20">
                <button
                  onClick={() => updateQty(item.id, -1)}
                  className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors text-sm"
                >−</button>
                <span className="flex-1 text-center text-sm py-1">{String(item.quantity).padStart(2, '0')}</span>
                <button
                  onClick={() => addToCart(item)}
                  className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors text-sm"
                >+</button>
              </div>
            </div>
            <span className="col-span-2 text-sm text-gray-700 text-right">${item.price * item.quantity}</span>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between mb-10">
        <Link to="/" className="border border-gray-300 text-sm px-6 py-2.5 rounded hover:bg-gray-50 transition-colors">
          Return To Shop
        </Link>
        <button className="border border-gray-300 text-sm px-6 py-2.5 rounded hover:bg-gray-50 transition-colors">
          Update Cart
        </button>
      </div>

      {/* Bottom section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Coupon */}
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Coupon Code"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2.5 text-sm outline-none focus:border-[#4EA674] transition-colors w-52"
          />
          <button className="bg-[#4EA674] text-white px-6 py-2.5 rounded text-sm font-medium hover:bg-[#3d8f63] transition-colors">
            Apply Coupon
          </button>
        </div>

        {/* Cart Total */}
        <div className="border border-gray-200 rounded-md p-6">
          <h3 className="font-semibold text-lg text-gray-900 mb-4">Cart Total</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between pb-3 border-b border-gray-200">
              <span className="text-gray-700">Subtotal:</span>
              <span className="font-medium">${subtotal}</span>
            </div>
            <div className="flex justify-between pb-3 border-b border-gray-200">
              <span className="text-gray-700">Shipping:</span>
              <span className="font-medium text-green-600">Free</span>
            </div>
            <div className="flex justify-between pb-1">
              <span className="font-medium text-gray-900">Total:</span>
              <span className="font-semibold text-gray-900">${subtotal}</span>
            </div>
          </div>
          <button
            onClick={() => navigate('/checkout')}
            className="w-full bg-[#4EA674] text-white py-3 rounded text-sm font-medium hover:bg-[#3d8f63] transition-colors mt-5"
          >
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
}
