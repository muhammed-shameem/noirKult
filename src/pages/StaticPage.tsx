import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronRight, Shield, Truck, RefreshCcw, HelpCircle, Mail, Phone, MapPin } from 'lucide-react';

const PAGE_CONTENT: Record<string, { title: string; icon: any; content: React.ReactNode }> = {
  '/about': {
    title: 'ABOUT US',
    icon: Shield,
    content: (
      <div className="space-y-6 text-gray-600 leading-relaxed">
        <p>NoirKult is more than just a brand; it's a movement. Born from the dark aesthetic of urban culture, we bring you premium denims and streetwear that define the modern rebel.</p>
        <p>Our mission is to provide high-quality, sustainable fashion that doesn't compromise on style. Every piece is crafted with precision and a deep understanding of the "Noir" aesthetic.</p>
      </div>
    )
  },
  '/privacy': {
    title: 'PRIVACY POLICY',
    icon: Shield,
    content: (
      <div className="space-y-6 text-gray-600 leading-relaxed">
        <p>Your privacy is our priority. We collect only the information necessary to provide you with the best shopping experience.</p>
        <h3 className="text-black font-bold uppercase tracking-tight">Data Collection</h3>
        <p>We collect your name, email, and shipping address when you place an order. This data is stored securely and never shared with third parties for marketing purposes.</p>
      </div>
    )
  },
  '/terms': {
    title: 'TERMS & CONDITIONS',
    icon: Shield,
    content: (
      <div className="space-y-6 text-gray-600 leading-relaxed">
        <p>By using NoirKult, you agree to our terms of service. All content on this site is the property of NoirKult.</p>
        <h3 className="text-black font-bold uppercase tracking-tight">Usage Policy</h3>
        <p>You may not use our products for any illegal or unauthorized purpose. Violation of any terms will result in immediate termination of your services.</p>
      </div>
    )
  },
  '/shipping': {
    title: 'SHIPPING POLICY',
    icon: Truck,
    content: (
      <div className="space-y-6 text-gray-600 leading-relaxed">
        <p>We offer free shipping on all orders above ₹1999. Standard delivery takes 3-5 business days.</p>
        <h3 className="text-black font-bold uppercase tracking-tight">International Shipping</h3>
        <p>Currently, we only ship within India. We are working hard to bring NoirKult to the rest of the world soon.</p>
      </div>
    )
  },
  '/returns': {
    title: 'RETURNS & EXCHANGES',
    icon: RefreshCcw,
    content: (
      <div className="space-y-6 text-gray-600 leading-relaxed">
        <p>Not happy with your purchase? We offer a 7-day hassle-free return and exchange policy.</p>
        <h3 className="text-black font-bold uppercase tracking-tight">Conditions</h3>
        <p>Items must be unworn, unwashed, and have all original tags attached. Returns are processed within 5-7 business days of receiving the item.</p>
      </div>
    )
  },
  '/faq': {
    title: 'FAQs',
    icon: HelpCircle,
    content: (
      <div className="space-y-8">
        {[
          { q: "How do I track my order?", a: "You can track your order using the 'Track Order' link in the footer or your account dashboard." },
          { q: "What payment methods do you accept?", a: "We accept all major credit/debit cards, UPI, and Net Banking." },
          { q: "Can I cancel my order?", a: "Orders can be cancelled within 2 hours of placement." }
        ].map((item, i) => (
          <div key={i} className="space-y-2">
            <h3 className="text-black font-bold uppercase tracking-tight">{item.q}</h3>
            <p className="text-gray-600 leading-relaxed">{item.a}</p>
          </div>
        ))}
      </div>
    )
  },
  '/contact': {
    title: 'CONTACT US',
    icon: Mail,
    content: (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Us</p>
                <p className="text-sm font-bold">support@noirkult.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Call Us</p>
                <p className="text-sm font-bold">+91 98765 43210</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Visit Us</p>
                <p className="text-sm font-bold">123 Noir Street, Dark Avenue, Bengaluru</p>
              </div>
            </div>
          </div>
        </div>
        
        <form className="space-y-4 pt-8 border-t border-gray-100">
          <h3 className="text-sm font-black uppercase tracking-widest">Send us a message</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="NAME" className="w-full bg-gray-50 border-2 border-transparent focus:border-black outline-none px-6 py-4 text-xs font-bold rounded-xl transition-all" />
            <input type="email" placeholder="EMAIL" className="w-full bg-gray-50 border-2 border-transparent focus:border-black outline-none px-6 py-4 text-xs font-bold rounded-xl transition-all" />
          </div>
          <textarea placeholder="MESSAGE" rows={4} className="w-full bg-gray-50 border-2 border-transparent focus:border-black outline-none px-6 py-4 text-xs font-bold rounded-xl transition-all resize-none"></textarea>
          <button className="bg-black text-white px-12 py-4 font-bold tracking-[0.2em] text-xs hover:bg-gray-900 transition-all rounded-xl">
            SEND MESSAGE
          </button>
        </form>
      </div>
    )
  },
  '/track': {
    title: 'TRACK ORDER',
    icon: Truck,
    content: (
      <div className="space-y-8">
        <p className="text-gray-600">Enter your order ID and phone number to track your package.</p>
        <form className="space-y-4">
          <input type="text" placeholder="ORDER ID (e.g. #NK12345)" className="w-full bg-gray-50 border-2 border-transparent focus:border-black outline-none px-6 py-4 text-xs font-bold rounded-xl transition-all" />
          <input type="tel" placeholder="PHONE NUMBER" className="w-full bg-gray-50 border-2 border-transparent focus:border-black outline-none px-6 py-4 text-xs font-bold rounded-xl transition-all" />
          <button className="w-full bg-black text-white py-4 font-bold tracking-[0.2em] text-xs hover:bg-gray-900 transition-all rounded-xl">
            TRACK SHIPMENT
          </button>
        </form>
      </div>
    )
  }
};

export function StaticPage() {
  const location = useLocation();
  const page = PAGE_CONTENT[location.pathname] || PAGE_CONTENT['/about'];
  const Icon = page.icon;

  return (
    <div className="pt-32 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="bg-black p-12 text-white flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6">
              <Icon size={32} />
            </div>
            <h1 className="text-4xl font-black tracking-tighter uppercase">{page.title}</h1>
            <div className="flex items-center gap-2 mt-4 text-[10px] font-bold tracking-[0.2em] opacity-40">
              <span>HOME</span>
              <ChevronRight size={10} />
              <span>{page.title}</span>
            </div>
          </div>
          
          <div className="p-12">
            {page.content}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
