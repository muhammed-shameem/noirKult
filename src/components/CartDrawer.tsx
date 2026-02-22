import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Trash2, Plus, Minus, MapPin, Ticket, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

export function CartDrawer() {
  const { items, removeItem, updateQuantity, totalPrice, isCartOpen, setCartOpen, selectedAddress, coupon, applyCoupon, discount } = useCart();
  const [couponCode, setCouponCode] = useState('');

  const handleApplyCoupon = async () => {
    await applyCoupon(couponCode);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-black/60 z-[200] backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-[210] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} />
                <h2 className="text-lg font-black tracking-tighter uppercase">
                  YOUR BAG ({items.length})
                </h2>
              </div>
              <button onClick={() => setCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={24} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto">
              <div className="p-6 space-y-8">
                {items.length === 0 ? (
                  <div className="h-full py-20 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                      <ShoppingBag size={32} className="text-gray-300" />
                    </div>
                    <p className="text-sm font-bold tracking-widest text-gray-400">YOUR BAG IS EMPTY</p>
                    <button
                      onClick={() => setCartOpen(false)}
                      className="bg-black text-white px-8 py-3 text-[10px] font-bold tracking-widest"
                    >
                      START SHOPPING
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Items List */}
                    <div className="space-y-6">
                      {items.map((item) => (
                        <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 group">
                          <div className="w-24 h-32 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-grow space-y-2">
                            <div className="flex justify-between">
                              <h3 className="text-xs font-bold tracking-tight uppercase line-clamp-1">{item.name}</h3>
                              <button onClick={() => removeItem(item.id, item.selectedSize)} className="text-gray-400 hover:text-red-500 transition-colors">
                                <Trash2 size={14} />
                              </button>
                            </div>
                            <p className="text-[10px] font-bold text-gray-400 tracking-widest">SIZE: {item.selectedSize}</p>
                            <div className="flex items-center justify-between pt-2">
                              <div className="flex items-center border border-gray-100 rounded overflow-hidden">
                                <button
                                  onClick={() => updateQuantity(item.id, item.selectedSize!, item.quantity - 1)}
                                  className="p-1 hover:bg-gray-50"
                                >
                                  <Minus size={12} />
                                </button>
                                <span className="px-3 text-xs font-bold">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.selectedSize!, item.quantity + 1)}
                                  className="p-1 hover:bg-gray-50"
                                >
                                  <Plus size={12} />
                                </button>
                              </div>
                              <span className="text-sm font-black">₹{item.price * item.quantity}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Address Section */}
                    <div className="pt-8 border-t border-gray-100 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MapPin size={16} />
                          <h3 className="text-[11px] font-black tracking-widest uppercase">Delivery Address</h3>
                        </div>
                        <Link to="/addresses" onClick={() => setCartOpen(false)} className="text-[9px] font-bold text-gray-400 underline uppercase">Change</Link>
                      </div>
                      {selectedAddress ? (
                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                          <p className="text-[10px] font-bold uppercase">{selectedAddress.name}</p>
                          <p className="text-[10px] text-gray-500 mt-1 line-clamp-1">{selectedAddress.address}, {selectedAddress.locality}</p>
                          <p className="text-[10px] text-gray-500">{selectedAddress.city} - {selectedAddress.pincode}</p>
                        </div>
                      ) : (
                        <Link to="/addresses" onClick={() => setCartOpen(false)} className="block w-full p-4 border-2 border-dashed border-gray-200 rounded-xl text-center text-[10px] font-bold text-gray-400 uppercase">
                          + Add Address
                        </Link>
                      )}
                    </div>

                    {/* Coupon Section */}
                    <div className="pt-8 border-t border-gray-100 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Ticket size={16} />
                          <h3 className="text-[11px] font-black tracking-widest uppercase">Coupons & Offers</h3>
                        </div>
                        <Link to="/offers" onClick={() => setCartOpen(false)} className="text-[9px] font-bold text-gray-400 underline uppercase">View All</Link>
                      </div>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          placeholder="ENTER CODE"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                          className="flex-grow bg-gray-50 border border-gray-200 px-4 py-3 text-[10px] font-bold tracking-widest rounded-lg outline-none focus:border-black"
                        />
                        <button 
                          onClick={handleApplyCoupon}
                          className="bg-black text-white px-4 py-3 text-[10px] font-bold tracking-widest rounded-lg"
                        >
                          APPLY
                        </button>
                      </div>
                      {coupon && (
                        <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-lg flex items-center justify-between">
                          <span className="text-[9px] font-bold text-emerald-700 tracking-widest uppercase">'{coupon}' Applied</span>
                          <button onClick={() => applyCoupon('')} className="text-[9px] font-bold text-emerald-700 underline">Remove</button>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-gray-100 space-y-4 bg-gray-50">
                <div className="space-y-2 mb-2">
                  <div className="flex justify-between text-[10px] font-bold text-gray-400 tracking-widest uppercase">
                    <span>Bag Total</span>
                    <span>₹{totalPrice}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-[10px] font-bold text-emerald-500 tracking-widest uppercase">
                      <span>Discount</span>
                      <span>-₹{discount}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                    TOTAL AMOUNT
                  </span>
                  <span className="text-lg font-black">₹{totalPrice - discount}</span>
                </div>
                <div className="flex flex-col gap-3">
                  <Link 
                    to="/cart" 
                    onClick={() => setCartOpen(false)}
                    className="w-full bg-black text-white py-4 font-bold tracking-[0.2em] text-[10px] hover:bg-gray-900 transition-all uppercase flex items-center justify-center gap-2"
                  >
                    Checkout <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
