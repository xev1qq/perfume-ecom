import { useState } from 'react';
import { ArrowLeft, Check, Loader2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { supabase } from '@/lib/supabase';

interface Props {
  totalPrice: number;
  onBack: () => void;
  onSuccess: () => void;
}

export function CheckoutForm({ totalPrice, onBack, onSuccess }: Props) {
  const { items, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const orderItems = items.map((item) => ({
      product_id: item.product.id,
      name: item.product.name,
      price: item.selectedPrice,
      quantity: item.quantity,
      volume_ml: item.selectedVolume,
    }));

    const { error: insertError } = await supabase.from('orders').insert({
      customer_name: form.name,
      customer_email: form.email,
      shipping_address: form.address,
      items: orderItems,
      total: totalPrice,
      status: 'pending',
    });

    if (insertError) {
      setError('Не удалось оформить заказ. Попробуйте ещё раз.');
      setLoading(false);
      return;
    }

    setLoading(false);
    setSuccess(true);
    clearCart();

    setTimeout(() => {
      onSuccess();
      setSuccess(false);
      setForm({ name: '', email: '', address: '' });
    }, 2500);
  };

  if (success) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="w-20 h-20 rounded-full bg-pistachio-100 flex items-center justify-center mb-4 animate-scale-in">
          <Check className="w-10 h-10 text-pistachio-600" />
        </div>
        <h3 className="text-xl font-serif font-medium text-brown-900 mb-2">
          Заказ оформлен!
        </h3>
        <p className="text-brown-500 text-sm font-light">
          Спасибо за покупку. Мы свяжемся с вами для подтверждения.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="px-6 pt-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm text-brown-500 hover:text-brown-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Назад в корзину
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col px-6 py-4">
        <h3 className="text-lg font-serif font-medium text-brown-900 mb-4">
          Данные для доставки
        </h3>

        <div className="space-y-4 flex-1">
          <div>
            <label className="block text-xs uppercase tracking-wider text-brown-400 font-medium mb-1.5">
              Имя и фамилия
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white border border-brown-200 focus:border-pistachio-500 focus:ring-2 focus:ring-pistachio-200 outline-none transition-all text-brown-900 placeholder-brown-300"
              placeholder="Иван Иванов"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-brown-400 font-medium mb-1.5">
              Email
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white border border-brown-200 focus:border-pistachio-500 focus:ring-2 focus:ring-pistachio-200 outline-none transition-all text-brown-900 placeholder-brown-300"
              placeholder="ivan@example.com"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-brown-400 font-medium mb-1.5">
              Адрес доставки
            </label>
            <textarea
              required
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-white border border-brown-200 focus:border-pistachio-500 focus:ring-2 focus:ring-pistachio-200 outline-none transition-all text-brown-900 placeholder-brown-300 resize-none"
              placeholder="Город, улица, дом, квартира, индекс"
            />
          </div>

          {error && (
            <p className="text-sm text-brown-600 bg-brown-100 rounded-lg px-4 py-2">
              {error}
            </p>
          )}
        </div>

        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-brown-500 font-light">Сумма заказа</span>
            <span className="text-2xl font-serif font-medium text-brown-900">
              {totalPrice.toLocaleString('ru-RU')} ₽
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-full bg-pistachio-600 hover:bg-pistachio-700 disabled:bg-brown-200 text-cream-50 font-medium tracking-wide transition-all duration-300 hover:scale-[1.02] hover:shadow-xl flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Оформляем...
              </>
            ) : (
              'Подтвердить заказ'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
