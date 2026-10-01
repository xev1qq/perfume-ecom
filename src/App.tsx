import { CartProvider } from '@/context/CartContext';
import { useProducts } from '@/hooks/useProducts';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Featured } from '@/components/Featured';
import { Collection } from '@/components/Collection';
import { About } from '@/components/About';
import { Testimonials } from '@/components/Testimonials';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';

function AppContent() {
  const { products, loading, error } = useProducts();

  return (
    <div className="min-h-screen bg-cream-50">
      <Header />
      <main>
        <Hero />
        <Featured products={products} />
        <Collection products={products} loading={loading} error={error} />
        <About />
        <Testimonials />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
