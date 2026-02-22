import React, { useEffect, useState } from 'react';
import { Ticket, Copy, CheckCircle2, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { api } from '../api';

export function OffersPage() {
  const [offers, setOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    const fetchOffers = async () => {
      const data = await api.checkout.getOffers();
      setOffers(data);
      setLoading(false);
    };
    fetchOffers();
  }, []);

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="pt-32 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-black tracking-tighter uppercase mb-12">OFFERS & COUPONS</h1>

        <div className="grid grid-cols-1 gap-6">
          {loading ? (
            [1, 2].map(i => (
              <div key={i} className="h-32 bg-gray-200 animate-pulse rounded-2xl" />
            ))
          ) : (
            offers.map((offer) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row"
              >
                <div className="bg-black text-white p-8 flex flex-col justify-center items-center md:w-48 text-center">
                  <Ticket size={32} className="mb-2 opacity-50" />
                  <p className="text-xl font-black tracking-tighter leading-none">{offer.title.split(' ')[1]}</p>
                  <p className="text-[10px] font-bold tracking-widest uppercase opacity-60">Discount</p>
                </div>
                
                <div className="p-8 flex-grow flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-black tracking-tight uppercase">{offer.title}</h3>
                    <p className="text-sm text-gray-500">{offer.description}</p>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 tracking-widest uppercase">
                      <Clock size={12} /> Valid for a limited time
                    </div>
                  </div>

                  {offer.code && (
                    <div className="flex flex-col items-center gap-3">
                      <div className="px-6 py-3 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex items-center gap-3">
                        <span className="text-sm font-black tracking-widest">{offer.code}</span>
                        <button 
                          onClick={() => copyToClipboard(offer.code)}
                          className="text-gray-400 hover:text-black transition-colors"
                        >
                          {copiedCode === offer.code ? <CheckCircle2 size={18} className="text-emerald-500" /> : <Copy size={18} />}
                        </button>
                      </div>
                      <p className="text-[9px] font-bold text-gray-400 tracking-widest uppercase">
                        {copiedCode === offer.code ? 'COPIED TO CLIPBOARD' : 'CLICK ICON TO COPY'}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
