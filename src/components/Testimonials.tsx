import { Sparkles, Quote } from 'lucide-react';

const testimonials = [
  {
    text: 'По мотивам Black Opium — это любовь с первого вдоха. Тёплый, кофейный, стойкий. Ношу уже полгода и не устаю, а цена в разы приятнее оригинала.',
    author: 'Мария К.',
    role: 'Постоянная клиентка',
    rating: 5,
  },
  {
    text: 'Заказала По мотивам Christian Dior Sauvage для мужа — свежий, мужской, потрясающая стойкость. Беру уже третий флакон, семья в восторге.',
    author: 'Елена В.',
    role: 'Покупатель',
    rating: 5,
  },
  {
    text: 'По мотивам Miami Shake стал моим летним фаворитом. Тропический, яркий, но не приторный. Доставка быстрая, флакон 50мл пришёл в идеальном состоянии.',
    author: 'Анна П.',
    role: 'Постоянная клиентка',
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-brown-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 text-[200px] font-serif text-pistachio-200">«</div>
        <div className="absolute bottom-10 right-10 text-[200px] font-serif text-pistachio-200">»</div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pistachio-500/20 border border-pistachio-300/20 mb-4">
            <Sparkles className="w-4 h-4 text-pistachio-200" />
            <span className="text-pistachio-100 text-sm font-medium tracking-wide">
              Отзывы клиентов
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif font-light text-cream-50">
            Что говорят наши
            <span className="italic text-pistachio-200"> ценители</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-brown-800/50 backdrop-blur-sm rounded-3xl p-8 border border-brown-700/50 hover:border-pistachio-500/30 transition-colors animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s`, animationFillMode: 'both' }}
            >
              <Quote className="w-8 h-8 text-pistachio-400/60 mb-4" />
              <p className="text-cream-200/90 font-light leading-relaxed mb-6 text-lg">
                {t.text}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pistachio-400 to-pistachio-700 flex items-center justify-center text-cream-50 font-serif font-medium">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <p className="text-cream-50 font-medium">{t.author}</p>
                  <p className="text-cream-300/60 text-sm">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
