import { siteConfig } from '../config/site';
import { Facebook, Instagram, Linkedin, Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#141414] text-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="space-y-6">
            <div className="flex flex-col items-start leading-none">
              <span className="text-3xl font-black tracking-tighter">{siteConfig.logo.text}</span>
              <span className="text-[12px] font-bold tracking-[0.2em] opacity-50">{siteConfig.logo.subtext}</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              NoirKult is a premium men's fashion brand dedicated to the "Dark Culture" aesthetic. Minimalist, bold, and timeless.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>

          {siteConfig.footer.sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-bold tracking-[0.2em] mb-8 text-gray-500 uppercase">{section.title}</h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-gray-300 hover:text-white transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-xs font-bold tracking-[0.2em] mb-8 text-gray-500 uppercase">DOWNLOAD APP</h3>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl py-3 transition-all">
                <div className="text-left">
                  <p className="text-[10px] opacity-50 leading-none">Download on the</p>
                  <p className="text-sm font-bold">App Store</p>
                </div>
              </button>
              <button className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl py-3 transition-all">
                <div className="text-left">
                  <p className="text-[10px] opacity-50 leading-none">Get it on</p>
                  <p className="text-sm font-bold">Google Play</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-gray-500 font-medium">{siteConfig.footer.bottomText}</p>
          <div className="flex items-center gap-8">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4 opacity-30 grayscale" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6 opacity-30 grayscale" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4 opacity-30 grayscale" />
          </div>
        </div>
      </div>
    </footer>
  );
}
