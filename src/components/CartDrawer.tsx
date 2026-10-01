import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { CheckoutForm } from '@/components/CheckoutForm';

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-[90] animate-fade-in">
          <div
            className="absolute inset-0 bg-brown-900/50 backdrop-blur-sm"
            onClick={closeCart}
          />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-cream-50 shadow-2xl flex flex-col animate-slide-in">
            <div className="flex items-center justify-between px-6 py-5 border-b border-brown-100">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-pistachio-600" />
                <h3 className="text-lg font-serif font-medium text-brown-900">
                  Корзина {totalItems > 0 && `(${totalItems})`}
                </h3>
              </div>
              <button
                onClick={closeCart}
                className="w-9 h-9 rounded-full hover:bg-brown-100 flex items-center justify-center transition-colors"
                aria-label="Закрыть корзину"
              >
                <X className="w-5 h-5 text-brown-700" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
                <div className="w-20 h-20 rounded-full bg-brown-100 flex items-center justify-center mb-4">
                  <ShoppingBag className="w-10 h-10 text-brown-300" />
                </div>
                <p className="text-brown-500 font-light text-lg mb-1">Корзина пуста</p>
                <p className="text-brown-400 text-sm">Добавьте ароматы из коллекции</p>
              </div>
            ) : showCheckout ? (
              <CheckoutForm
                totalPrice={totalPrice}
                onBack={() => setShowCheckout(false)}
                onSuccess={() => {
                  setShowCheckout(false);
                  closeCart();
                }}
              />
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                  {items.map((item) => {
                    const key = `${item.product.id}_${item.selectedVolume}`;
                    return (
                      <div
                        key={key}
                        className="flex gap-4 bg-white rounded-2xl p-3 shadow-sm"
                      >
                        <div className="w-20 h-24 rounded-xl overflow-hidden bg-brown-100 flex-shrink-0">
                          {item.product.image_url && (
                            <img
                              src={item.product.image_url}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>

                        <div className="flex-1 flex flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="text-[10px] uppercase tracking-wider text-pistachio-600 font-medium">
                                {item.product.brand}
                              </p>
                              <h4 className="text-sm font-serif font-medium text-brown-900 leading-tight">
                                {item.product.name}
                              </h4>
                              <p className="text-xs text-brown-400 mt-0.5">
                                {item.selectedVolume}мл
                              </p>
                            </div>
                            <button
                              onClick={() => removeFromCart(key)}
                              className="p-1.5 rounded-lg hover:bg-brown-100 text-brown-400 hover:text-brown-600 transition-colors"
                              aria-label="Удалить"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between mt-auto pt-2">
                            <div className="flex items-center gap-2 bg-brown-50 rounded-full px-1 py-1">
                              <button
                                onClick={() => updateQuantity(key, item.quantity - 1)}
                                className="w-6 h-6 rounded-full bg-cream-50 hover:bg-brown-200 flex items-center justify-center transition-colors"
                              >
                                <Minus className="w-3 h-3 text-brown-700" />
                              </button>
                              <span className="w-6 text-center text-sm font-medium text-brown-900">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(key, item.quantity + 1)}
                                className="w-6 h-6 rounded-full bg-cream-50 hover:bg-brown-200 flex items-center justify-center transition-colors"
                              >
                                <Plus className="w-3 h-3 text-brown-700" />
                              </button>
                            </div>
                            <span className="font-serif font-medium text-brown-900">
                              {(item.selectedPrice * item.quantity).toLocaleString('ru-RU')} ₽
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-brown-100 px-6 py-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-brown-500 font-light">Итого</span>
                    <span className="text-2xl font-serif font-medium text-brown-900">
                      {totalPrice.toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                  <button
                    onClick={() => setShowCheckout(true)}
                    className="w-full py-4 rounded-full bg-pistachio-600 hover:bg-pistachio-700 text-cream-50 font-medium tracking-wide transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                  >
                    Оформить заказ
                  </button>
                  <p className="text-center text-xs text-brown-400">
                    Бесплатная доставка от 6000 ₽
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
