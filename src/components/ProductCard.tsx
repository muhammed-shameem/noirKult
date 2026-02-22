import React, { memo } from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { Product } from '../types';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = memo(({ product }: ProductCardProps) => {
  const [selectedColor, setSelectedColor] = React.useState(product.colors?.[0] || '');
  const [currentImage, setCurrentImage] = React.useState(product.image);

  const handleColorChange = (color: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedColor(color);
    // Simulate image change on color switch
    setCurrentImage(`https://picsum.photos/seed/${product.id}-${color.replace('#', '')}/800/1000`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "100px" }}
      className="group cursor-pointer"
    >
      <Link to={`/product/${product.id}`} className="block relative aspect-[4/5] overflow-hidden bg-gray-50">
        <img
          src={currentImage}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.tag && (
          <span className="absolute top-3 left-3 bg-white text-black text-[9px] font-bold px-2 py-1 tracking-wider shadow-sm uppercase">
            {product.tag}
          </span>
        )}
        <button className="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
          <Heart size={16} strokeWidth={1.5} />
        </button>
      </Link>
      
      <div className="mt-3 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-[12px] font-bold tracking-tight text-gray-800 line-clamp-1 uppercase">
            {product.name}
          </h3>
        </div>

        {product.colors && product.colors.length > 0 && (
          <div className="flex gap-1.5">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={(e) => handleColorChange(color, e)}
                className={`w-3 h-3 rounded-full border border-gray-200 transition-transform ${
                  selectedColor === color ? 'scale-125 border-black' : 'hover:scale-110'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}

        <div className="flex items-center gap-2">
          <span className="text-sm font-black">₹{product.price}</span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through font-medium">₹{product.originalPrice}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
});

ProductCard.displayName = 'ProductCard';
