import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { siteConfig } from '../config/site';
import { api } from '../api';
import { ProductList } from '../components/ProductList';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function HomePage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [banner, setBanner] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const [cats, bnr] = await Promise.all([
        api.content.getCategories(),
        api.content.getBanner('last-chance')
      ]);
      setCategories(cats);
      setBanner(bnr);
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-24 pb-32">
      {/* Hero Section */}
      <section className="relative h-[90vh] overflow-hidden bg-gray-100">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={siteConfig.homePage.hero.image}
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <h1 className="text-6xl md:text-[120px] font-black tracking-tighter leading-[0.85] uppercase">
              {siteConfig.homePage.hero.title.split(' ').map((word, i) => (
                <span key={i} className="block">{word}</span>
              ))}
            </h1>
            <p className="text-sm md:text-base font-bold tracking-[0.4em] uppercase opacity-90">
              {siteConfig.homePage.hero.subtitle}
            </p>
            <div className="pt-8">
              <Link
                to="/shop"
                className="inline-block bg-white text-black px-12 py-5 text-xs font-bold tracking-[0.2em] hover:bg-black hover:text-white transition-all duration-300"
              >
                {siteConfig.homePage.hero.cta}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories - Minimal Grid */}
      <section className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-[10px] font-bold tracking-[0.4em] text-gray-400 uppercase mb-4">SHOP BY CATEGORY</h2>
          <div className="h-px w-12 bg-black/10" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <Link to={cat.href} className="block">
                <div className="aspect-[3/4] overflow-hidden bg-gray-50 mb-4">
                  <img src={cat.image} alt={cat.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <p className="text-center text-[11px] font-bold tracking-widest text-gray-800 group-hover:text-black">{cat.label}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Banner - Immersive */}
      {banner && (
        <section className="relative h-[70vh] overflow-hidden">
          <img src={banner.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center text-white text-center px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase">{banner.title}</h2>
              <p className="text-sm md:text-lg font-bold tracking-[0.3em] uppercase opacity-90">{banner.subtitle}</p>
              <div className="pt-4">
                <Link to="/shop" className="bg-white text-black px-12 py-5 text-xs font-bold tracking-[0.2em] hover:bg-black hover:text-white transition-all duration-300">
                  {banner.cta}
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Popular Products - Standard Grid */}
      <section className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-16 border-b border-gray-100 pb-8">
          <div>
            <h2 className="text-[10px] font-bold tracking-[0.4em] text-gray-400 uppercase mb-2">CURATED FOR YOU</h2>
            <h3 className="text-3xl font-bold tracking-tighter">NEW & POPULAR</h3>
          </div>
          <Link to="/shop" className="group flex items-center gap-3 text-[11px] font-bold tracking-widest">
            EXPLORE ALL <ArrowRight size={16} className="transition-transform group-hover:translate-x-2" />
          </Link>
        </div>
        <ProductList itemsPerPage={8} />
      </section>
    </div>
  );
}
