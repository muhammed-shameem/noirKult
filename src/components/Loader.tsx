import { motion } from 'motion/react';
import { siteConfig } from '../config/site';

export function Loader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center"
        >
          <span className="text-4xl font-black tracking-[-0.05em] flex items-center mb-1">
            <span className="bg-black text-white px-1 mr-1">#</span>
            {siteConfig.logo.text}
          </span>
          <span className="text-[10px] font-bold tracking-[0.4em] text-gray-400 uppercase">
            {siteConfig.logo.subtext}
          </span>
        </motion.div>
        
        <div className="w-32 h-[1px] bg-gray-100 relative overflow-hidden">
          <motion.div
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 bottom-0 w-1/2 bg-black"
          />
        </div>
      </div>
    </div>
  );
}
