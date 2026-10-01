import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Product, CartItem } from '@/types';

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  addToCart: (product: Product, quantity?: number, selectedVolume?: number, selectedPrice?: number) => void;
  removeFromCart: (cartKey: string) => void;
  updateQuantity: (cartKey: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  totalItems: number;
  totalPrice: number;
}

function cartKey(productId: string, volume: number): string {
  return `${productId}_${volume}`;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addToCart = useCallback((product: Product, quantity = 1, selectedVolume?: number, selectedPrice?: number) => {
    const vol = selectedVolume ?? product.volume_ml;
    const price = selectedPrice ?? product.price;
    const key = cartKey(product.id, vol);

    setItems((prev) => {
      const existing = prev.find((item) => cartKey(item.product.id, item.selectedVolume) === key);
      if (existing) {
        return prev.map((item) =>
          cartKey(item.product.id, item.selectedVolume) === key
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, selectedVolume: vol, selectedPrice: price }];
    });
    setIsOpen(true);
  }, []);

  const removeFromCart = useCallback((key: string) => {
    setItems((prev) => prev.filter((item) => cartKey(item.product.id, item.selectedVolume) !== key));
  }, []);

  const updateQuantity = useCallback((key: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => cartKey(item.product.id, item.selectedVolume) !== key));
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        cartKey(item.product.id, item.selectedVolume) === key ? { ...item, quantity } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.selectedPrice * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        openCart,
        closeCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
