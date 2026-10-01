import { Leaf, FlaskConical, Package, Heart } from 'lucide-react';

const features = [
  {
    icon: Leaf,
    title: 'Натуральные ингредиенты',
    description: 'Используем только чистые эфирные масла и натуральные экстракты растений со всего мира',
  },
  {
    icon: FlaskConical,
    title: 'Ручное производство',
    description: 'Каждый флакон создаётся вручную нашим парфюмером в небольшой мастерской',
  },
  {
    icon: Package,
    title: 'Экологичная упаковка',
    description: 'Стеклянные флаконы и перерабатываемые коробки из крафтовой бумаги',
  },
  {
    icon: Heart,
    title: 'Сделано с любовью',
    description: 'Каждый аромат — это история, рассказанная через ноты и аккорды',
  },
];

export function About() {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-cream-100 to-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5]">
              <img
                src="https://images.pexels.com/photos/8450128/pexels-photo-8450128.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Создание парфюма"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 rounded-3xl overflow-hidden shadow-xl border-8 border-cream-50 hidden sm:block">
              <img
                src="https://images.pexels.com/photos/8450219/pexels-photo-8450219.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Парфюмер"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-6 -left-6 bg-pistachio-600 text-cream-50 rounded-2xl px-6 py-4 shadow-xl">
              <p className="text-3xl font-serif font-medium">10+</p>
              <p className="text-xs uppercase tracking-wider text-pistachio-100">лет опыта</p>
            </div>
          </div>

          <div>
            <p className="text-pistachio-600 text-sm uppercase tracking-[0.25em] font-medium mb-3">
              О парфюмерном доме
            </p>
            <h2 className="text-4xl sm:text-5xl font-serif font-light text-brown-900 mb-6 leading-tight">
              Искусство аромата
              <span className="block italic text-pistachio-700">с 2014 года</span>
            </h2>
            <p className="text-brown-600 leading-relaxed font-light text-lg mb-8">
              ZAFIR родился из страсти к редким ароматам и желания создать
              парфюмерию по мотивам легендарных ароматов. Мы работаем с небольшими
              партиями, чтобы каждый флакон сохранил индивидуальность и живость
              натуральных компонентов.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-pistachio-100 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-pistachio-700" />
                  </div>
                  <div>
                    <h3 className="font-serif font-medium text-brown-900 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-brown-500 font-light leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
