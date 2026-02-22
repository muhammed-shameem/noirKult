import { useState } from 'react';
import { ProductList } from '../components/ProductList';
import { Filter, ChevronDown, Search } from 'lucide-react';

export function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [sortBy, setSortBy] = useState<'price_asc' | 'price_desc' | 'newest'>('newest');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = ["ALL", "SHIRTS", "JEANS", "TROUSERS", "T-SHIRTS", "JACKETS", "SWEATERS", "HOODIES", "PERFUMES", "SHORTS", "SHOES"];

  const sortOptions = [
    { label: 'NEWEST', value: 'newest' },
    { label: 'PRICE: LOW TO HIGH', value: 'price_asc' },
    { label: 'PRICE: HIGH TO LOW', value: 'price_desc' },
  ];

  return (
    <div className="pt-32 pb-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-12">
          {/* Header & Filters */}
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="text-4xl font-black tracking-tighter uppercase mb-2">SHOP ALL</h1>
                <div className="relative max-w-md mt-4">
                  <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="SEARCH PRODUCTS..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl py-4 pl-12 pr-4 text-[10px] font-bold tracking-widest outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-3 relative">
                <button className="flex items-center gap-2 px-6 py-3 border border-gray-200 text-[11px] font-bold tracking-widest hover:border-black transition-colors">
                  <Filter size={14} /> FILTERS
                </button>
                <div className="relative">
                  <button 
                    onClick={() => setIsSortOpen(!isSortOpen)}
                    className="flex items-center gap-2 px-6 py-3 border border-gray-200 text-[11px] font-bold tracking-widest hover:border-black transition-colors"
                  >
                    SORT BY: {sortOptions.find(o => o.value === sortBy)?.label} <ChevronDown size={14} />
                  </button>
                  
                  {isSortOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 shadow-xl z-50 py-2">
                      {sortOptions.map(option => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setSortBy(option.value as any);
                            setIsSortOpen(false);
                          }}
                          className={`w-full text-left px-4 py-3 text-[10px] font-bold tracking-widest hover:bg-gray-50 transition-colors ${
                            sortBy === option.value ? 'text-black' : 'text-gray-400'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 border-y border-gray-100 py-6">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2.5 text-[10px] font-bold tracking-widest transition-all border ${
                    activeCategory === cat 
                      ? 'bg-black text-white border-black' 
                      : 'bg-white text-gray-500 border-gray-100 hover:border-gray-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <ProductList category={activeCategory} sortBy={sortBy} search={searchQuery} />
        </div>
      </div>
    </div>
  );
}
