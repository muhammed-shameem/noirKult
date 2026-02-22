import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types';
import { api } from '../api';

interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

interface Address {
  id: string;
  name: string;
  phone: string;
  pincode: string;
  address: string;
  locality: string;
  city: string;
  state: string;
  isDefault: boolean;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, size?: string, color?: string) => void;
  removeItem: (id: string, size?: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addresses: Address[];
  selectedAddress: Address | null;
  addAddress: (address: Omit<Address, 'id'>) => void;
  selectAddress: (id: string) => void;
  coupon: string | null;
  applyCoupon: (code: string) => Promise<boolean>;
  discount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [coupon, setCoupon] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const fetchAddresses = async () => {
      const data = await api.user.getAddresses();
      setAddresses(data);
      const defaultAddr = data.find(a => a.isDefault);
      if (defaultAddr) setSelectedAddress(defaultAddr);
    };
    fetchAddresses();
  }, []);

  const addItem = (product: Product, size?: string, color?: string) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.selectedSize === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, selectedSize: size, selectedColor: color }];
    });
    setCartOpen(true);
  };

  const removeItem = (id: string, size?: string) => {
    setItems((prev) => prev.filter((item) => !(item.id === id && item.selectedSize === size)));
  };

  const updateQuantity = (id: string, size: string, quantity: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id && item.selectedSize === size ? { ...item, quantity: Math.max(0, quantity) } : item))
    );
  };

  const addAddress = async (address: Omit<Address, 'id'>) => {
    const newAddress = await api.user.addAddress(address);
    setAddresses(prev => [...prev, newAddress]);
    if (newAddress.isDefault) setSelectedAddress(newAddress);
  };

  const selectAddress = async (id: string) => {
    await api.user.setDefaultAddress(id);
    const addr = addresses.find(a => a.id === id);
    if (addr) setSelectedAddress(addr);
  };

  const applyCoupon = async (code: string) => {
    if (!code) {
      setCoupon(null);
      setDiscount(0);
      return true;
    }
    const response = await api.checkout.verifyCoupon(code);
    if (response.success) {
      setCoupon(code);
      if (response.discountType === 'PERCENT') {
        setDiscount(Math.round(totalPrice * (response.value / 100)));
      }
      return true;
    }
    return false;
  };

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      items, addItem, removeItem, updateQuantity, totalItems, totalPrice, 
      isCartOpen, setCartOpen, addresses, selectedAddress, addAddress, 
      selectAddress, coupon, applyCoupon, discount 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
