import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, User, Menu, X, ChevronRight, MapPin, Ticket } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { siteConfig } from '../config/site';
import { cn } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';

import { useCart } from '../contexts/CartContext';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const { user, setLoginModalOpen, logout } = useAuth();
  const { totalItems, setCartOpen, addresses, coupon } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleUserClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      setLoginModalOpen(true);
    } else {
      setIsUserDropdownOpen(!isUserDropdownOpen);
    }
  };

  const handleLogout = () => {
    logout();
    setIsUserDropdownOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled ? 'bg-white/95 backdrop-blur-sm py-3 shadow-sm' : 'bg-white py-5'
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button onClick={() => setIsMenuOpen(true)} className="p-1 hover:bg-gray-100 rounded-md">
              <Menu size={22} strokeWidth={1.5} />
            </button>
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold tracking-[-0.05em] flex items-center">
                <span className="bg-black text-white px-1 mr-1">#</span>
                {siteConfig.logo.text}
              </span>
            </Link>
          </div>

          <nav className="hidden lg:flex items-center gap-10">
            {siteConfig.navigation.filter(n => !n.isAdmin || (user?.role === 'ADMIN')).map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-[11px] font-bold tracking-[0.1em] text-gray-800 hover:text-black transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1 md:gap-4">
            <div className="hidden md:flex items-center bg-gray-50 border border-gray-200 rounded-md px-4 py-2 w-72 group focus-within:border-black transition-colors">
              <Search size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder='Search "Shirts"'
                className="bg-transparent border-none focus:ring-0 text-sm w-full ml-2 outline-none placeholder:text-gray-400"
                onFocus={() => setIsSearchOpen(true)}
              />
            </div>
            <button onClick={() => setIsSearchOpen(true)} className="p-2 hover:bg-gray-100 rounded-full md:hidden">
              <Search size={20} strokeWidth={1.5} />
            </button>
            <div className="relative">
              <button 
                onClick={handleUserClick} 
                className={cn(
                  "p-2 hover:bg-gray-100 rounded-full transition-colors",
                  isUserDropdownOpen && "bg-gray-100"
                )}
                aria-label="User Account"
              >
                <User size={20} strokeWidth={1.5} />
              </button>
              
              <AnimatePresence>
                {isUserDropdownOpen && user && (
                  <>
                    <div 
                      className="fixed inset-0 z-[-1]" 
                      onClick={() => setIsUserDropdownOpen(false)} 
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden py-2"
                    >
                      <div className="px-4 py-3 border-b border-gray-50">
                        <p className="text-[10px] font-black text-gray-400 tracking-widest uppercase">Logged in as</p>
                        <p className="text-sm font-bold truncate">{user.name || 'Noir User'}</p>
                      </div>
                      <div className="py-2">
                        <Link 
                          to="/addresses" 
                          onClick={() => setIsUserDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2 text-xs font-bold hover:bg-gray-50 transition-colors"
                        >
                          <MapPin size={14} /> SAVED ADDRESSES
                        </Link>
                        <Link 
                          to="/offers" 
                          onClick={() => setIsUserDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2 text-xs font-bold hover:bg-gray-50 transition-colors"
                        >
                          <Ticket size={14} /> OFFERS & COUPONS
                        </Link>
                        {user.role === 'ADMIN' && (
                          <Link 
                            to="/admin" 
                            onClick={() => setIsUserDropdownOpen(false)}
                            className="flex items-center gap-3 px-4 py-2 text-xs font-bold hover:bg-gray-50 transition-colors text-emerald-600"
                          >
                            ADMIN PANEL
                          </Link>
                        )}
                      </div>
                      <div className="pt-2 border-t border-gray-50">
                        <button 
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2 text-xs font-bold text-red-500 hover:bg-red-50 transition-colors"
                        >
                          LOGOUT
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
            <button onClick={() => setCartOpen(true)} className="p-2 hover:bg-gray-100 rounded-full relative">
              <ShoppingBag size={20} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 bg-black text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[80%] max-w-sm bg-white z-[70] p-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-xl font-black tracking-tighter">{siteConfig.logo.text}</span>
                <button onClick={() => setIsMenuOpen(false)} className="p-2">
                  <X size={24} />
                </button>
              </div>
              <div className="flex flex-col gap-6">
                {siteConfig.navigation.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="text-lg font-bold tracking-tight border-b border-gray-100 pb-2"
                  >
                    {item.label}
                  </Link>
                ))}
                
                <div className="mt-8 space-y-8">
                  <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase">My Account</h3>
                  
                  {user ? (
                    <div className="space-y-6">
                      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                        <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-black">
                          {user.name?.[0] || 'U'}
                        </div>
                        <div>
                          <p className="text-sm font-bold">{user.name || 'Noir User'}</p>
                          <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">Member</p>
                        </div>
                      </div>

                      <div className="space-y-4 px-2">
                        <Link to="/addresses" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between group">
                          <div className="flex items-center gap-3">
                            <MapPin size={18} className="text-gray-400" />
                            <span className="text-sm font-bold tracking-tight">Saved Addresses</span>
                          </div>
                          <ChevronRight size={16} className="text-gray-300" />
                        </Link>
                        <Link to="/offers" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between group">
                          <div className="flex items-center gap-3">
                            <Ticket size={18} className="text-gray-400" />
                            <span className="text-sm font-bold tracking-tight">Available Offers</span>
                          </div>
                          <ChevronRight size={16} className="text-gray-300" />
                        </Link>
                        <button 
                          onClick={handleLogout}
                          className="w-full flex items-center justify-between group text-red-500"
                        >
                          <span className="text-sm font-bold tracking-tight">Logout</span>
                          <ChevronRight size={16} className="text-gray-300" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="px-2">
                      <button 
                        onClick={() => {
                          setIsMenuOpen(false);
                          setLoginModalOpen(true);
                        }}
                        className="w-full bg-black text-white py-4 rounded-xl font-bold tracking-widest text-xs uppercase"
                      >
                        Login / Register
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-white z-[100] p-4 md:p-8"
          >
            <div className="container mx-auto">
              <div className="flex items-center gap-4 mb-8">
                <div className="flex-1 flex items-center bg-gray-100 rounded-full px-6 py-4">
                  <Search size={24} className="text-gray-400" />
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search for products, brands and more"
                    className="bg-transparent border-none focus:ring-0 text-xl w-full ml-4 outline-none font-medium"
                  />
                </div>
                <button onClick={() => setIsSearchOpen(false)} className="p-4 hover:bg-gray-100 rounded-full">
                  <X size={32} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-xs font-bold tracking-widest text-gray-400 mb-6">TOP SEARCHES</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Jeans", "Shirts", "Polo", "T-Shirt", "Formal Wear", "Bootcut", "Baggy Fit", "Jackets", "Sweaters"].map(s => (
                      <button key={s} className="px-4 py-2 border border-gray-200 rounded-full text-sm font-medium hover:bg-black hover:text-white transition-colors">
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-bold tracking-widest text-gray-400 mb-6">TRENDING</h3>
                  <div className="space-y-4">
                    {/* Mock trending items */}
                    {[1, 2, 3].map(i => (
                      <div key={i} className="flex items-center gap-4 group cursor-pointer">
                        <div className="w-16 h-20 bg-gray-100 rounded overflow-hidden">
                          <img src={`https://picsum.photos/seed/trend-${i}/100/120`} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                        </div>
                        <div>
                          <p className="font-bold text-sm">Classic Chelsea Boots</p>
                          <p className="text-xs text-gray-500">₹2499</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
