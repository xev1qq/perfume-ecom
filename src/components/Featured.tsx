import { ArrowRight } from 'lucide-react';
import type { Product, VolumeOption } from '@/types';
import { useCart } from '@/context/CartContext';

interface Props {
  products: Product[];
}

function getVolumes(product: Product): VolumeOption[] {
  if (product.volume_options && product.volume_options.length > 0) {
    return [...product.volume_options].sort((a, b) => a.volume_ml - b.volume_ml);
  }
  return [{ volume_ml: product.volume_ml, price: product.price }];
}

function getMinPrice(product: Product): number {
  return Math.min(...getVolumes(product).map((v) => v.price));
}

function getDefaultVolume(product: Product): VolumeOption {
  const vols = getVolumes(product);
  return vols.find((v) => v.volume_ml === 50) ?? vols[Math.floor(vols.length / 2)];
}

export function Featured({ products }: Props) {
  const { addToCart } = useCart();
  const featured = products.filter((p) => p.featured).slice(0, 4);

  if (featured.length === 0) return null;

  return (
    <section id="categories" className="py-24 bg-gradient-to-b from-cream-50 to-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-pistachio-600 text-sm uppercase tracking-[0.25em] font-medium mb-3">
              Выбор парфюмера
            </p>
            <h2 className="text-4xl sm:text-5xl font-serif font-light text-brown-900">
              Хиты продаж
            </h2>
          </div>
          <a
            href="#collection"
            className="inline-flex items-center gap-2 text-brown-600 hover:text-pistachio-600 font-medium transition-colors group"
          >
            Смотреть все
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product, index) => {
            const def = getDefaultVolume(product);
            return (
              <article
                key={product.id}
                className="group cursor-pointer animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
              >
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-brown-100 mb-4 shadow-md group-hover:shadow-2xl transition-all duration-500">
                  {product.image_url && (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-brown-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product, 1, def.volume_ml, def.price);
                    }}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-full bg-pistachio-600 text-cream-50 text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:bg-pistachio-700"
                  >
                    В корзину
                  </button>
                </div>
                <p className="text-[10px] uppercase tracking-wider text-pistachio-600 font-medium mb-1">
                  {product.brand}
                </p>
                <h3 className="font-serif font-medium text-brown-900 mb-1 group-hover:text-pistachio-700 transition-colors">
                  {product.name}
                </h3>
                <p className="text-lg font-serif text-brown-700">от {getMinPrice(product)} ₽</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
