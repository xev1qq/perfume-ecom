import { useState, useEffect, useMemo } from 'react';
import { X, Star, ShoppingBag, Minus, Plus } from 'lucide-react';
import type { Product, VolumeOption } from '@/types';
import { useCart } from '@/context/CartContext';

interface Props {
  product: Product;
  onClose: () => void;
}

const DEFAULT_VOLUMES: VolumeOption[] = [
  { volume_ml: 10, price: 1500 },
  { volume_ml: 30, price: 4000 },
  { volume_ml: 50, price: 6000 },
  { volume_ml: 100, price: 9000 },
];

export function ProductModal({ product, onClose }: Props) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedVolumeIdx, setSelectedVolumeIdx] = useState(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const volumes = useMemo<VolumeOption[]>(() => {
    if (product.volume_options && product.volume_options.length > 0) {
      return [...product.volume_options].sort((a, b) => a.volume_ml - b.volume_ml);
    }
    return DEFAULT_VOLUMES;
  }, [product.volume_options]);

  const selected = volumes[selectedVolumeIdx] ?? volumes[0];
  const notes = product.notes.split(', ');

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-brown-900/60 backdrop-blur-sm" />

      <div
        className="relative bg-cream-50 rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-cream-50/80 backdrop-blur-sm hover:bg-brown-200 flex items-center justify-center transition-colors"
          aria-label="Закрыть"
        >
          <X className="w-5 h-5 text-brown-800" />
        </button>

        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative aspect-square md:aspect-auto md:min-h-[500px] bg-brown-100">
            <img
              src={selected.volume_ml === 10 || selected.volume_ml === 30
                ? '/images/product-photos/photo_2026-09-22_20-39-05.jpg'
                : selected.volume_ml === 50
                  ? '/images/product-photos/photo_2026-09-28_20-54-23.jpg'
                  : product.image_url ?? ''}
              alt={product.name}
              className="w-full h-full object-cover transition-opacity duration-300"
            />
          </div>

          <div className="p-8 md:p-10 flex flex-col">
            <p className="text-xs uppercase tracking-[0.2em] text-pistachio-600 font-medium mb-2">
              {product.brand}
            </p>
            <h2 className="text-3xl font-serif font-medium text-brown-900 mb-3">
              {product.name}
            </h2>

            <div className="flex items-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= Math.round(product.rating)
                      ? 'text-brown-400 fill-brown-400'
                      : 'text-brown-200'
                  }`}
                />
              ))}
              <span className="text-sm text-brown-500 ml-1">
                {product.rating.toFixed(1)}
              </span>
            </div>

            <p className="text-brown-600 leading-relaxed font-light mb-6">
              {product.description}
            </p>

            <div className="mb-6">
              <h4 className="text-xs uppercase tracking-[0.2em] text-brown-400 font-medium mb-3">
                Ноты аромата
              </h4>
              <div className="flex flex-wrap gap-2">
                {notes.map((note, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-full bg-pistachio-100 text-pistachio-800 text-sm font-medium"
                  >
                    {note.trim()}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-xs uppercase tracking-[0.2em] text-brown-400 font-medium mb-3">
                Объём
              </h4>
              <div className="flex flex-wrap gap-2">
                {volumes.map((vol, idx) => (
                  <button
                    key={vol.volume_ml}
                    onClick={() => setSelectedVolumeIdx(idx)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium tracking-wide transition-all duration-300 ${
                      idx === selectedVolumeIdx
                        ? 'bg-pistachio-600 text-cream-50 shadow-md scale-105'
                        : 'bg-brown-100 text-brown-700 hover:bg-brown-200'
                    }`}
                  >
                    {vol.volume_ml}мл
                    <span className={`block text-[10px] font-normal mt-0.5 ${idx === selectedVolumeIdx ? 'text-cream-100' : 'text-brown-400'}`}>
                      {vol.price} ₽
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-3xl font-serif font-medium text-brown-900">
                  {selected.price} ₽
                </span>
                <span className="text-sm text-brown-400 ml-1">/ {selected.volume_ml}мл</span>
              </div>
              <span className={`text-sm font-medium ${product.stock > 0 ? 'text-pistachio-600' : 'text-brown-400'}`}>
                {product.stock > 0 ? `В наличии: ${product.stock} шт` : 'Нет в наличии'}
              </span>
            </div>

            <div className="flex items-center gap-4 mt-auto">
              <div className="flex items-center gap-3 bg-brown-100 rounded-full px-2 py-2">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-full bg-cream-50 hover:bg-brown-200 flex items-center justify-center transition-colors"
                >
                  <Minus className="w-4 h-4 text-brown-700" />
                </button>
                <span className="w-8 text-center font-medium text-brown-900">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="w-8 h-8 rounded-full bg-cream-50 hover:bg-brown-200 flex items-center justify-center transition-colors"
                >
                  <Plus className="w-4 h-4 text-brown-700" />
                </button>
              </div>

              <button
                onClick={() => {
                  addToCart(product, quantity, selected.volume_ml, selected.price);
                  onClose();
                }}
                disabled={product.stock === 0}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-pistachio-600 hover:bg-pistachio-700 disabled:bg-brown-200 disabled:cursor-not-allowed text-cream-50 font-medium tracking-wide transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
              >
                <ShoppingBag className="w-5 h-5" />
                В корзину
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
