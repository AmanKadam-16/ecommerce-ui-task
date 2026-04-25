import { useForm } from 'react-hook-form';
import { Phone, Mail } from 'lucide-react';
import Breadcrumb from '../components/ui/Breadcrumb';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function ContactPage() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactFormData>();

  const onSubmit = async (_data: ContactFormData) => {
    await new Promise((r) => setTimeout(r, 600));
    reset();
  };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-16 py-8">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
        {/* Left info card */}
        <div className="border border-gray-200 rounded-lg p-8 flex flex-col gap-8">
          {/* Call To Us */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#4EA674] rounded-full flex items-center justify-center shrink-0">
                <Phone size={18} className="text-white" />
              </div>
              <h3 className="font-semibold text-gray-900">Call To Us</h3>
            </div>
            <p className="text-sm text-gray-600 mb-2">We are available 24/7, 7 days a week.</p>
            <p className="text-sm text-gray-600">Phone: +8801611112222</p>
          </div>

          <div className="border-t border-gray-200" />

          {/* Write To Us */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#4EA674] rounded-full flex items-center justify-center shrink-0">
                <Mail size={18} className="text-white" />
              </div>
              <h3 className="font-semibold text-gray-900">Write To US</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Fill out our form and we will contact you within 24 hours.
            </p>
            <p className="text-sm text-gray-600 mb-1">Emails: customer@exclusive.com</p>
            <p className="text-sm text-gray-600">Emails: support@exclusive.com</p>
          </div>
        </div>

        {/* Right form card */}
        <div className="lg:col-span-2 border border-gray-200 rounded-lg p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            {/* Top row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <input
                  {...register('name', { required: true })}
                  placeholder="Your Name *"
                  className={`w-full bg-gray-50 border rounded px-4 py-3 text-sm outline-none focus:border-[#4EA674] transition-colors placeholder:text-gray-400 ${
                    errors.name ? 'border-red-400' : 'border-gray-200'
                  }`}
                />
              </div>
              <div>
                <input
                  {...register('email', { required: true })}
                  type="email"
                  placeholder="Your Email *"
                  className={`w-full bg-gray-50 border rounded px-4 py-3 text-sm outline-none focus:border-[#4EA674] transition-colors placeholder:text-gray-400 ${
                    errors.email ? 'border-red-400' : 'border-gray-200'
                  }`}
                />
              </div>
              <div>
                <input
                  {...register('phone', { required: true })}
                  type="tel"
                  placeholder="Your Phone *"
                  className={`w-full bg-gray-50 border rounded px-4 py-3 text-sm outline-none focus:border-[#4EA674] transition-colors placeholder:text-gray-400 ${
                    errors.phone ? 'border-red-400' : 'border-gray-200'
                  }`}
                />
              </div>
            </div>

            {/* Message */}
            <textarea
              {...register('message')}
              placeholder="Your Message"
              rows={8}
              className="w-full bg-gray-50 border border-gray-200 rounded px-4 py-3 text-sm outline-none focus:border-[#4EA674] transition-colors placeholder:text-gray-400 resize-none"
            />

            {/* Submit */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#4EA674] text-white px-12 py-3 rounded text-sm font-medium hover:bg-[#3d8f63] transition-colors disabled:opacity-60"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
