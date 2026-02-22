import React, { useState, memo } from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { VirtuosoGrid } from 'react-virtuoso';
import { api } from '../api';

interface ProductListProps {
  category?: string;
  sortBy?: 'price_asc' | 'price_desc' | 'newest';
  search?: string;
  itemsPerPage?: number;
  useVirtualization?: boolean;
}

export function ProductList({ 
  category = 'ALL', 
  sortBy = 'newest', 
  search = '', 
  itemsPerPage = 20,
  useVirtualization = true 
}: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  // Reset and fetch when filters change
  React.useEffect(() => {
    const timer = setTimeout(() => {
      const fetchInitial = async () => {
        setIsLoading(true);
        try {
          const response = await api.products.list({ 
            page: 1, 
            limit: itemsPerPage, 
            category,
            sortBy,
            search
          });
          setProducts(response.items);
          setHasMore(response.hasMore);
          setPage(1);
        } finally {
          setIsLoading(false);
        }
      };
      fetchInitial();
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [category, sortBy, search, itemsPerPage]);

  const loadMore = async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    try {
      const nextPage = page + 1;
      const response = await api.products.list({ 
        page: nextPage, 
        limit: itemsPerPage,
        category,
        sortBy,
        search
      });
      if (response.items.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prev) => [...prev, ...response.items]);
        setPage(nextPage);
        setHasMore(response.hasMore);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!useVirtualization) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-16 px-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {isLoading && (
          <div className="flex justify-center py-12 w-full col-span-full">
            <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full">
      <VirtuosoGrid
        useWindowScroll
        totalCount={products.length}
        overscan={400}
        endReached={loadMore}
        components={{
          List: React.forwardRef(({ children, ...props }: any, ref) => (
            <div
              {...props}
              ref={ref}
              className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-16 px-4"
            >
              {children}
            </div>
          )),
          Item: ({ children, ...props }: any) => (
            <div {...props} className="flex flex-col">
              {children}
            </div>
          ),
          Footer: () => (
            <div className="flex justify-center py-12 w-full col-span-full">
              {isLoading && (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
                  <p className="text-xs font-bold tracking-widest text-gray-400">LOADING MORE ITEMS...</p>
                </div>
              )}
              {!hasMore && (
                <p className="text-xs font-bold tracking-widest text-gray-400">YOU'VE SEEN IT ALL</p>
              )}
            </div>
          )
        }}
        itemContent={(index) => {
          const product = products[index];
          return <ProductCard product={product} />;
        }}
      />
    </div>
  );
}
