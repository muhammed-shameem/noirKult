import { Product } from '../types';
import { mockProducts } from '../data/mock';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  products: {
    list: async (params: { 
      page?: number; 
      limit?: number; 
      category?: string;
      sortBy?: 'price_asc' | 'price_desc' | 'newest';
      search?: string;
    } = {}) => {
      await delay(800);
      const { page = 1, limit = 20, category, sortBy, search } = params;
      
      let filtered = [...mockProducts];
      
      if (category && category !== 'ALL') {
        filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
      }

      if (search) {
        const query = search.toLowerCase();
        filtered = filtered.filter(p => 
          p.name.toLowerCase().includes(query) || 
          p.category.toLowerCase().includes(query)
        );
      }

      if (sortBy) {
        if (sortBy === 'price_asc') {
          filtered.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price_desc') {
          filtered.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'newest') {
          // In mock, we'll just reverse or assume ID order is newest
          filtered.reverse();
        }
      }
      
      const start = (page - 1) * limit;
      const end = start + limit;
      
      return {
        items: filtered.slice(start, end),
        total: filtered.length,
        hasMore: end < filtered.length
      };
    },
    get: async (id: string) => {
      await delay(500);
      return mockProducts.find(p => p.id === id) || null;
    }
  },
  auth: {
    sendOtp: async (value: string) => {
      await delay(1000);
      return { success: true };
    },
    verifyOtp: async (value: string, otp: string) => {
      await delay(1000);
      return { 
        success: true, 
        user: { id: 'u1', role: value === 'admin' ? 'ADMIN' : 'USER', name: 'John Doe' } 
      };
    }
  },
  user: {
    getAddresses: async () => {
      await delay(600);
      return [
        {
          id: 'a-1',
          name: 'Noir User',
          phone: '9876543210',
          pincode: '560001',
          address: '123 Noir Street, Dark Avenue',
          locality: 'Indiranagar',
          city: 'Bengaluru',
          state: 'Karnataka',
          isDefault: true,
        }
      ];
    },
    addAddress: async (address: any) => {
      await delay(800);
      return { ...address, id: `a-${Date.now()}` };
    },
    setDefaultAddress: async (id: string) => {
      await delay(500);
      return { success: true };
    }
  },
  checkout: {
    getOffers: async () => {
      await delay(400);
      return [
        { id: 'o1', title: 'FLAT 20% OFF', description: 'Use code NOIR20 on orders above ₹1999', code: 'NOIR20' },
        { id: 'o2', title: 'FREE SHIPPING', description: 'Automatically applied on all orders today', code: null }
      ];
    },
    verifyCoupon: async (code: string) => {
      await delay(700);
      if (code.toUpperCase() === 'NOIR20') {
        return { success: true, discountType: 'PERCENT', value: 20 };
      }
      return { success: false, message: 'INVALID COUPON' };
    }
  },
  content: {
    getCategories: async () => {
      await delay(500);
      return [
        { label: "SHIRTS", image: "https://picsum.photos/seed/shirts/600/800", href: "/shop?category=shirts" },
        { label: "TROUSERS", image: "https://picsum.photos/seed/trousers/600/800", href: "/shop?category=trousers" },
        { label: "JEANS", image: "https://picsum.photos/seed/jeans/600/800", href: "/shop?category=jeans" },
        { label: "POLOS", image: "https://picsum.photos/seed/polos/600/800", href: "/shop?category=polos" },
        { label: "CARGOS", image: "https://picsum.photos/seed/cargos/600/800", href: "/shop?category=cargos" },
        { label: "OVERSHIRTS", image: "https://picsum.photos/seed/overshirts/600/800", href: "/shop?category=overshirts" },
      ];
    },
    getBanner: async (type: string) => {
      await delay(400);
      if (type === 'last-chance') {
        return {
          title: "Last chance!",
          subtitle: "Last few sizes left",
          image: "https://picsum.photos/seed/lastchance/1920/600",
          cta: "SHOP NOW",
        };
      }
      return null;
    }
  }
};
