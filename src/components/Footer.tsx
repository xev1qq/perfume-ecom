import { Mail, Phone, MapPin, Instagram, Send } from 'lucide-react';
import { useState } from 'react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer id="contact" className="bg-brown-900 text-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pistachio-400 to-pistachio-700 flex items-center justify-center">
                <span className="text-cream-50 font-serif text-xl font-semibold">Z</span>
              </div>
              <span className="font-serif text-xl font-semibold text-cream-50">ZAFIR</span>
            </div>
            <p className="text-cream-300/70 font-light leading-relaxed text-sm">
              Нишевая парфюмерия ручной работы. Создаём ароматы по мотивам
              легендарных парфюмов с 2014 года.
            </p>
            <div className="flex gap-3 mt-6">
              <a href="#" className="w-10 h-10 rounded-full bg-brown-800 hover:bg-pistachio-600 flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5 text-cream-200" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-brown-800 hover:bg-pistachio-600 flex items-center justify-center transition-colors">
                <Send className="w-5 h-5 text-cream-200" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-cream-50 font-serif font-medium mb-4 text-lg">Навигация</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Коллекция', href: '#collection' },
                { label: 'О доме', href: '#about' },
                { label: 'Отзывы', href: '#testimonials' },
                { label: 'Доставка и оплата', href: '#' },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-cream-300/70 hover:text-pistachio-300 text-sm font-light transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-cream-50 font-serif font-medium mb-4 text-lg">Контакты</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-cream-300/70 font-light">
                <Phone className="w-4 h-4 text-pistachio-400 flex-shrink-0" />
                +7 (495) 123-45-67
              </li>
              <li className="flex items-center gap-3 text-sm text-cream-300/70 font-light">
                <Mail className="w-4 h-4 text-pistachio-400 flex-shrink-0" />
                hello@zafir.ru
              </li>
              <li className="flex items-start gap-3 text-sm text-cream-300/70 font-light">
                <MapPin className="w-4 h-4 text-pistachio-400 flex-shrink-0 mt-0.5" />
                Москва, ул. Парфюмерная, 14
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-cream-50 font-serif font-medium mb-4 text-lg">Рассылка</h4>
            <p className="text-cream-300/70 font-light text-sm mb-4">
              Подпишитесь и получите 10% скидку на первый заказ
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ваш email"
                className="flex-1 px-4 py-2.5 rounded-full bg-brown-800 border border-brown-700 focus:border-pistachio-500 outline-none text-cream-50 text-sm placeholder-cream-300/40 transition-colors"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-full bg-pistachio-600 hover:bg-pistachio-700 text-cream-50 text-sm font-medium transition-colors flex-shrink-0"
              >
                OK
              </button>
            </form>
            {subscribed && (
              <p className="text-pistachio-300 text-sm mt-2 animate-fade-in">
                Спасибо за подписку!
              </p>
            )}
          </div>
        </div>

        <div className="border-t border-brown-700/50 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-cream-300/50 text-sm font-light">
            © 2026 ZAFIR. Все права защищены.
          </p>
          <div className="flex gap-6 text-sm text-cream-300/50">
            <a href="#" className="hover:text-pistachio-300 transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-pistachio-300 transition-colors">Условия использования</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
