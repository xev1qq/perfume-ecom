import { useState, useMemo } from 'react';
import { Star, Plus, Loader2 } from 'lucide-react';
import type { Product, VolumeOption } from '@/types';
import { useCart } from '@/context/CartContext';
import { ProductModal } from '@/components/ProductModal';

const categories = [
  { id: 'all', label: 'Все' },
  { id: 'floral', label: 'Цветочные' },
  { id: 'woody', label: 'Древесные' },
  { id: 'oriental', label: 'Восточные' },
  { id: 'fresh', label: 'Свежие' },
  { id: 'unisex', label: 'Унисекс' },
];

function getVolumes(product: Product): VolumeOption[] {
  if (product.volume_options && product.volume_options.length > 0) {
    return [...product.volume_options].sort((a, b) => a.volume_ml - b.volume_ml);
  }
  return [{ volume_ml: product.volume_ml, price: product.price }];
}

function getMinPrice(product: Product): number {
  return Math.min(...getVolumes(product).map((v) => v.price));
}

function getVolumeRange(product: Product): string {
  const vols = getVolumes(product);
  if (vols.length <= 1) return `${vols[0].volume_ml}мл`;
  return `${vols[0].volume_ml}–${vols[vols.length - 1].volume_ml}мл`;
}

function getDefaultVolume(product: Product): VolumeOption {
  const vols = getVolumes(product);
  return vols.find((v) => v.volume_ml === 50) ?? vols[Math.floor(vols.length / 2)];
}

interface Props {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export function Collection({ products, loading, error }: Props) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  const filtered = useMemo(() => {
    if (activeCategory === 'all') return products;
    return products.filter((p) => p.category === activeCategory);
  }, [products, activeCategory]);

  return (
    <section id="collection" className="py-24 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-pistachio-600 text-sm uppercase tracking-[0.25em] font-medium mb-3">
            Наша коллекция
          </p>
          <h2 className="text-4xl sm:text-5xl font-serif font-light text-brown-900 mb-4">
            Ароматы для каждого настроения
          </h2>
          <p className="text-brown-500 max-w-2xl mx-auto text-lg font-light">
            От свежих цитрусовых до глубоких амбровых — найдите свой идеальный аромат
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-pistachio-600 text-cream-50 shadow-lg shadow-pistachio-900/20 scale-105'
                  : 'bg-brown-100 text-brown-700 hover:bg-brown-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 text-pistachio-600 animate-spin" />
          </div>
        )}

        {error && (
          <div className="text-center py-20">
            <p className="text-brown-600">Не удалось загрузить коллекцию. Попробуйте позже.</p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((product, index) => (
              <article
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-up"
                style={{ animationDelay: `${index * 0.08}s`, animationFillMode: 'both' }}
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-brown-100">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-brown-400">
                      <span className="font-serif text-3xl">{product.name}</span>
                    </div>
                  )}
                  {product.featured && (
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-pistachio-600 text-cream-50 text-xs font-medium tracking-wide">
                      Хит продаж
                    </span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-brown-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                <div className="p-6">
                  <p className="text-xs uppercase tracking-[0.15em] text-pistachio-600 font-medium mb-1">
                    {product.brand}
                  </p>
                  <h3 className="text-xl font-serif font-medium text-brown-900 mb-2 group-hover:text-pistachio-700 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-brown-500 mb-3 line-clamp-2 font-light">
                    {product.notes}
                  </p>

                  <div className="flex items-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3.5 h-3.5 ${
                          star <= Math.round(product.rating)
                            ? 'text-brown-400 fill-brown-400'
                            : 'text-brown-200'
                        }`}
                      />
                    ))}
                    <span className="text-xs text-brown-400 ml-1">{product.rating.toFixed(1)}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-serif font-medium text-brown-900">
                        от {getMinPrice(product)} ₽
                      </span>
                      <span className="text-sm text-brown-400 ml-1">{getVolumeRange(product)}</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product, 1, getDefaultVolume(product).volume_ml, getDefaultVolume(product).price);
                      }}
                      className="w-10 h-10 rounded-full bg-pistachio-100 hover:bg-pistachio-600 text-pistachio-700 hover:text-cream-50 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
                      aria-label={`Добавить ${product.name} в корзину`}
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
}
