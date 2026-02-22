import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { MapPin, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export function AddressesPage() {
  const { addresses, selectedAddress, selectAddress, addAddress } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="pt-32 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-3xl font-black tracking-tighter uppercase">SAVED ADDRESSES</h1>
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 bg-black text-white px-6 py-3 text-[10px] font-bold tracking-widest rounded-xl hover:bg-gray-900 transition-all uppercase"
          >
            <Plus size={16} /> Add New Address
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((addr) => (
            <motion.div
              key={addr.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-6 bg-white rounded-2xl shadow-sm border-2 transition-all relative group ${
                selectedAddress?.id === addr.id ? 'border-black' : 'border-transparent'
              }`}
            >
              {selectedAddress?.id === addr.id && (
                <div className="absolute top-4 right-4 text-black">
                  <CheckCircle2 size={20} fill="currentColor" className="text-white" />
                </div>
              )}
              
              <div className="space-y-1 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black uppercase">{addr.name}</span>
                  {addr.isDefault && (
                    <span className="text-[9px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded font-bold uppercase">Default</span>
                  )}
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {addr.address}, {addr.locality}<br />
                  {addr.city}, {addr.state} - {addr.pincode}
                </p>
                <p className="text-xs font-bold mt-2">Mobile: {addr.phone}</p>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-gray-50">
                <button 
                  onClick={() => selectAddress(addr.id)}
                  className={`text-[10px] font-bold tracking-widest uppercase ${
                    selectedAddress?.id === addr.id ? 'text-gray-300 cursor-default' : 'text-black hover:underline'
                  }`}
                  disabled={selectedAddress?.id === addr.id}
                >
                  {selectedAddress?.id === addr.id ? 'Selected' : 'Set as Default'}
                </button>
                <button className="text-[10px] font-bold text-gray-400 hover:text-red-500 tracking-widest uppercase transition-colors">
                  Remove
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {addresses.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
            <MapPin size={48} className="mx-auto text-gray-200 mb-4" />
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">No addresses saved yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
