import { ArrowDown, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/30618765/pexels-photo-30618765.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Парфюм на тёмном фоне"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brown-900/80 via-brown-900/50 to-pistachio-900/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-brown-900/60 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
        <div className="max-w-2xl animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pistachio-500/20 backdrop-blur-sm border border-pistachio-300/30 mb-6">
            <Sparkles className="w-4 h-4 text-pistachio-200" />
            <span className="text-pistachio-100 text-sm font-medium tracking-wide">
              Нишевая парфюмерия ручной работы
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-light text-cream-50 leading-[1.1] mb-6 text-balance">
            Ароматы, которые
            <span className="block italic text-pistachio-200 font-normal">
              рассказывают историю
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-cream-200/90 font-light leading-relaxed mb-10 max-w-xl">
            Каждый флакон ZAFIR создан по мотивам легендарных парфюмов из редких
            натуральных ингредиентов. Свежие цитрусовые, тёплая амбра и восточные
            ноты — ароматы для тех, кто не боится быть собой.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#collection"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-pistachio-500 hover:bg-pistachio-600 text-cream-50 font-medium tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-pistachio-900/30"
            >
              Открыть коллекцию
            </a>
            <a
              href="#about"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-transparent border border-cream-200/40 hover:border-cream-200/80 text-cream-50 font-medium tracking-wide transition-all duration-300 backdrop-blur-sm hover:bg-cream-50/10"
            >
              О парфюмерном доме
            </a>
          </div>
        </div>
      </div>

      <a
        href="#collection"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-cream-200/60 hover:text-cream-200 transition-colors animate-bounce"
      >
        <span className="text-xs uppercase tracking-[0.2em]">Листайте вниз</span>
        <ArrowDown className="w-4 h-4" />
      </a>
    </section>
  );
}
