import { useEffect, useState } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export function Header() {
  const { totalItems, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Коллекция', href: '#collection' },
    { label: 'Ароматы', href: '#categories' },
    { label: 'О доме', href: '#about' },
    { label: 'Контакты', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-cream-50/95 backdrop-blur-md shadow-md py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pistachio-400 to-pistachio-700 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <span className="text-cream-50 font-serif text-xl font-semibold">Z</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className={`font-serif text-xl font-semibold tracking-wide ${scrolled ? 'text-brown-900' : 'text-brown-900'}`}>
              ZAFIR
            </span>
            <span className={`text-[10px] uppercase tracking-[0.2em] ${scrolled ? 'text-brown-500' : 'text-brown-600'}`}>
              Парфюмерный дом
            </span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-brown-700 hover:text-pistachio-600 transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pistachio-500 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={openCart}
            className="relative p-2.5 rounded-full bg-brown-100 hover:bg-brown-200 transition-colors group"
            aria-label="Корзина"
          >
            <ShoppingBag className="w-5 h-5 text-brown-800 group-hover:scale-110 transition-transform" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-pistachio-600 text-cream-50 text-xs font-semibold flex items-center justify-center animate-scale-in">
                {totalItems}
              </span>
            )}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2.5 rounded-full bg-brown-100 hover:bg-brown-200 transition-colors"
            aria-label="Меню"
          >
            {menuOpen ? <X className="w-5 h-5 text-brown-800" /> : <Menu className="w-5 h-5 text-brown-800" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="md:hidden absolute top-full left-0 right-0 bg-cream-50/98 backdrop-blur-md shadow-lg animate-fade-in">
          <div className="flex flex-col px-6 py-4 gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="py-3 text-brown-700 hover:text-pistachio-600 font-medium border-b border-brown-100 last:border-0"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
