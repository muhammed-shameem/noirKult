import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, MapPin, Ticket, ChevronRight, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, discount, coupon, applyCoupon, selectedAddress, addresses, selectAddress } = useCart();
  const { user, setLoginModalOpen } = useAuth();
  const [couponCode, setCouponCode] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleApplyCoupon = async () => {
    setIsApplying(true);
    setCouponError('');
    const success = await applyCoupon(couponCode);
    if (!success) setCouponError('INVALID COUPON CODE');
    setIsApplying(false);
  };

  const handleCheckout = () => {
    if (!user) {
      setLoginModalOpen(true);
      return;
    }
    // Proceed to payment/order success
    alert('Order placed successfully! (Mock)');
  };

  if (items.length === 0) {
    return (
      <div className="pt-40 pb-20 container mx-auto px-4 text-center">
        <div className="max-w-md mx-auto space-y-6">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
            <ShieldCheck size={48} className="text-gray-200" />
          </div>
          <h1 className="text-2xl font-black tracking-tighter uppercase">YOUR BAG IS EMPTY</h1>
          <p className="text-sm text-gray-500">Looks like you haven't added anything to your bag yet.</p>
          <Link to="/shop" className="inline-block bg-black text-white px-12 py-4 font-bold tracking-[0.2em] text-xs hover:bg-gray-900 transition-all">
            CONTINUE SHOPPING
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-black tracking-tighter uppercase mb-12">CHECKOUT</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column: Items & Address */}
          <div className="lg:col-span-2 space-y-6">
            {/* Address Section */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <MapPin size={20} />
                  <h2 className="text-sm font-black tracking-widest uppercase">Delivery Address</h2>
                </div>
                <button 
                  onClick={() => window.location.href = '/addresses'}
                  className="text-[10px] font-bold text-gray-400 underline tracking-widest uppercase"
                >
                  Change
                </button>
              </div>
              
              {selectedAddress ? (
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold uppercase">{selectedAddress.name}</span>
                    <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded font-bold uppercase">Home</span>
                  </div>
                  <p className="text-xs text-gray-500">{selectedAddress.address}, {selectedAddress.locality}</p>
                  <p className="text-xs text-gray-500">{selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pincode}</p>
                  <p className="text-xs text-gray-500 font-bold mt-2">Mobile: {selectedAddress.phone}</p>
                </div>
              ) : (
                <Link 
                  to="/addresses"
                  className="w-full py-4 border-2 border-dashed border-gray-200 rounded-xl text-xs font-bold text-gray-400 hover:border-black hover:text-black transition-all uppercase flex items-center justify-center"
                >
                  + Add New Address
                </Link>
              )}
            </div>

            {/* Address Modal */}
            <AnimatePresence>
              {isAddressModalOpen && (
                <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsAddressModalOpen(false)}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8"
                  >
                    <h2 className="text-xl font-black tracking-tighter uppercase mb-6">Select Address</h2>
                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                      {addresses.map((addr) => (
                        <div
                          key={addr.id}
                          onClick={() => {
                            selectAddress(addr.id);
                            setIsAddressModalOpen(false);
                          }}
                          className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                            selectedAddress?.id === addr.id ? 'border-black bg-gray-50' : 'border-gray-100 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold uppercase">{addr.name}</span>
                            {addr.isDefault && <span className="text-[9px] bg-black text-white px-2 py-0.5 rounded font-bold uppercase">Default</span>}
                          </div>
                          <p className="text-[10px] text-gray-500 leading-relaxed">{addr.address}, {addr.locality}, {addr.city}, {addr.state} - {addr.pincode}</p>
                          <p className="text-[10px] font-bold mt-2">Mobile: {addr.phone}</p>
                        </div>
                      ))}
                    </div>
                    <button className="w-full mt-6 py-4 border-2 border-black text-black font-bold tracking-widest text-[10px] hover:bg-black hover:text-white transition-all uppercase">
                      + Add New Address
                    </button>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            {/* Items Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-50">
                <h2 className="text-sm font-black tracking-widest uppercase">Items in Bag ({items.length})</h2>
              </div>
              <div className="divide-y divide-gray-50">
                {items.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}`} className="p-6 flex gap-6 group">
                    <div className="w-24 h-32 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow space-y-3">
                      <div className="flex justify-between">
                        <h3 className="text-sm font-black tracking-tight uppercase">{item.name}</h3>
                        <button onClick={() => removeItem(item.id, item.selectedSize)} className="text-gray-300 hover:text-red-500 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="flex gap-4 text-[10px] font-bold text-gray-400 tracking-widest uppercase">
                        <span>Size: {item.selectedSize}</span>
                        <span>Qty: {item.quantity}</span>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border border-gray-100 rounded-lg overflow-hidden">
                          <button onClick={() => updateQuantity(item.id, item.selectedSize!, item.quantity - 1)} className="p-2 hover:bg-gray-50">
                            <Minus size={14} />
                          </button>
                          <span className="px-4 text-xs font-bold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.selectedSize!, item.quantity + 1)} className="p-2 hover:bg-gray-50">
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="text-base font-black">₹{item.price * item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Summary */}
          <div className="space-y-6 lg:sticky lg:top-32">
            {/* Coupons */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <Ticket size={20} />
                <h2 className="text-sm font-black tracking-widest uppercase">Coupons</h2>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="ENTER CODE (e.g. NOIR20)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  className="flex-grow bg-gray-50 border-2 border-transparent focus:border-black outline-none px-4 py-3 text-[10px] font-bold tracking-widest rounded-xl transition-all"
                />
                <button
                  onClick={handleApplyCoupon}
                  disabled={!couponCode || isApplying}
                  className="bg-black text-white px-6 py-3 text-[10px] font-bold tracking-widest rounded-xl hover:bg-gray-900 disabled:opacity-50 transition-all"
                >
                  {isApplying ? '...' : 'APPLY'}
                </button>
              </div>
              {couponError && <p className="text-[9px] font-bold text-red-500 mt-2 tracking-widest">{couponError}</p>}
              {coupon && (
                <div className="mt-4 p-3 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-between">
                  <span className="text-[10px] font-bold text-emerald-700 tracking-widest">'{coupon}' APPLIED!</span>
                  <button onClick={() => applyCoupon('')} className="text-[10px] font-bold text-emerald-700 underline">REMOVE</button>
                </div>
              )}
            </div>

            {/* Offers Section */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-black tracking-widest uppercase">Available Offers</h2>
                <Link to="/offers" className="text-[10px] font-bold text-gray-400 underline uppercase">View All</Link>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                  <p className="text-[10px] font-black text-black tracking-tight">FLAT 20% OFF</p>
                  <p className="text-[9px] text-gray-500 mt-1">Use code <span className="font-bold text-black">NOIR20</span> on orders above ₹1999</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl border border-dashed border-gray-200 opacity-60">
                  <p className="text-[10px] font-black text-black tracking-tight">FREE SHIPPING</p>
                  <p className="text-[9px] text-gray-500 mt-1">Automatically applied on all orders today</p>
                </div>
              </div>
            </div>

            {/* Price Details */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
              <h2 className="text-sm font-black tracking-widest uppercase mb-6">Price Details</h2>
              <div className="flex justify-between text-xs font-bold text-gray-500 tracking-widest">
                <span>TOTAL MRP</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="flex justify-between text-xs font-bold text-emerald-500 tracking-widest">
                <span>COUPON DISCOUNT</span>
                <span>-₹{discount}</span>
              </div>
              <div className="flex justify-between text-xs font-bold text-gray-500 tracking-widest">
                <span>CONVENIENCE FEE</span>
                <span className="text-emerald-500">FREE</span>
              </div>
              <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="text-sm font-black tracking-widest uppercase">Total Amount</span>
                <span className="text-xl font-black">₹{totalPrice - discount}</span>
              </div>
              
              <button
                onClick={handleCheckout}
                className="w-full bg-black text-white py-5 font-bold tracking-[0.2em] text-xs hover:bg-gray-900 transition-all mt-6 rounded-xl shadow-lg shadow-black/10"
              >
                {user ? 'PLACE ORDER' : 'LOGIN TO CHECKOUT'}
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-8 py-4 opacity-40 grayscale">
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
