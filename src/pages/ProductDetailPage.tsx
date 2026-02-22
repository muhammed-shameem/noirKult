import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { api } from '../api';
import { Product } from '../types';
import { Loader } from '../components/Loader';
import { useCart } from '../contexts/CartContext';
import { ChevronRight, ShieldCheck, RotateCcw, Truck } from 'lucide-react';

import { ProductList } from '../components/ProductList';

export function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [mainImage, setMainImage] = useState('');
  const { addItem, items } = useCart();
  const navigate = useNavigate();

  const isInCart = items.some(item => item.id === product?.id && item.selectedSize === selectedSize);

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        setLoading(true);
        const data = await api.products.get(id);
        setProduct(data);
        if (data) {
          if (data.sizes?.[0]) setSelectedSize(data.sizes[0]);
          if (data.colors?.[0]) setSelectedColor(data.colors[0]);
          setMainImage(data.image);
        }
        setLoading(false);
      }
    };
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return <Loader />;
  if (!product) return <div className="pt-40 text-center font-bold">Product not found</div>;

  const productImages = product.images || [product.image];

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-8">
          <Link to="/" className="hover:text-black">HOME</Link>
          <ChevronRight size={12} />
          <Link to="/shop" className="hover:text-black">SHOP</Link>
          <ChevronRight size={12} />
          <span className="text-black">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-[3/4] bg-gray-50 overflow-hidden rounded-xl">
              <motion.img 
                key={mainImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={mainImage} 
                alt={product.name} 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {productImages.map((img, i) => (
                <div 
                  key={i} 
                  onClick={() => setMainImage(img)}
                  className={`aspect-[3/4] bg-gray-50 rounded-lg overflow-hidden cursor-pointer transition-all border-2 ${
                    mainImage === img ? 'border-black' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-black tracking-tighter mb-2 uppercase">{product.name}</h1>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-black">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-400 line-through">₹{product.originalPrice}</span>
                )}
                <span className="text-emerald-500 text-xs font-bold tracking-widest">
                  ({Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)}% OFF)
                </span>
              </div>
              <p className="text-[10px] font-bold text-gray-400 mt-2 tracking-widest">INCLUSIVE OF ALL TAXES</p>
            </div>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xs font-bold tracking-widest uppercase">Select Color</h3>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => {
                        setSelectedColor(color);
                        // Simulate image change on color switch
                        setMainImage(`https://picsum.photos/seed/${product.id}-${color.replace('#', '')}/800/1000`);
                      }}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor === color ? 'border-black scale-110' : 'border-gray-100 hover:border-gray-300'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold tracking-widest">SELECT SIZE</h3>
                <button className="text-[10px] font-bold text-gray-400 underline tracking-widest">SIZE GUIDE</button>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes?.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 flex items-center justify-center text-xs font-bold border-2 transition-all ${
                      selectedSize === size ? 'border-black bg-black text-white' : 'border-gray-100 hover:border-gray-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              {isInCart ? (
                <button
                  onClick={() => navigate('/cart')}
                  className="flex-1 bg-black text-white py-5 font-bold tracking-[0.2em] text-xs hover:bg-gray-900 transition-all flex items-center justify-center gap-2"
                >
                  GO TO BAG <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  onClick={() => addItem(product, selectedSize)}
                  className="flex-1 bg-black text-white py-5 font-bold tracking-[0.2em] text-xs hover:bg-gray-900 transition-all"
                >
                  ADD TO BAG
                </button>
              )}
              <button className="flex-1 border-2 border-black py-5 font-bold tracking-[0.2em] text-xs hover:bg-black hover:text-white transition-all">
                WISHLIST
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-8 border-y border-gray-100">
              <div className="flex flex-col items-center text-center gap-2">
                <Truck size={20} strokeWidth={1.5} />
                <p className="text-[9px] font-bold tracking-widest uppercase">Fast Delivery</p>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <RotateCcw size={20} strokeWidth={1.5} />
                <p className="text-[9px] font-bold tracking-widest uppercase">7 Days Return</p>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <ShieldCheck size={20} strokeWidth={1.5} />
                <p className="text-[9px] font-bold tracking-widest uppercase">Secure Payment</p>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold tracking-widest">PRODUCT DESCRIPTION</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Elevate your style with the {product.name}. Crafted from premium materials for ultimate comfort and a modern silhouette. Perfect for any occasion, this piece embodies the NoirKult aesthetic.
              </p>
            </div>
          </div>
        </div>

        {/* Similar Items */}
        <div className="space-y-12">
          <div className="flex flex-col items-center">
            <h2 className="text-[10px] font-bold tracking-[0.4em] text-gray-400 uppercase mb-4">YOU MAY ALSO LIKE</h2>
            <div className="h-px w-12 bg-black/10" />
          </div>
          <ProductList category={product.category} itemsPerPage={4} useVirtualization={false} />
        </div>
      </div>
    </div>
  );
}
