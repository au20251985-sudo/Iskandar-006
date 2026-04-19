/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  Cpu, 
  Globe, 
  Layers, 
  ArrowRight, 
  Github, 
  Twitter, 
  Linkedin, 
  Code2, 
  Atom, 
  Terminal,
  Menu,
  X,
  ChevronRight,
  MessageSquare,
  Send,
  User,
  LogOut,
  Settings,
  HelpCircle,
  Home,
  Beaker,
  Mail,
  Search
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

// --- Types ---

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot' | 'system';
  timestamp: Date;
  senderName: string;
}

// --- Components ---

const ChatWidget = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Xush kelibsiz! Bu yerda laboratoriya a\'zolari bilan muloqot qilishingiz mumkin.', sender: 'system', timestamp: new Date(), senderName: 'System' },
    { id: '2', text: 'Salom Alisher! Bugun qaysi laboratoriyani sinab ko\'ramiz?', sender: 'bot', timestamp: new Date(), senderName: 'Lola (AI)' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
      senderName: 'Alisher Usmonov'
    };
    setMessages([...messages, newMessage]);
    setInputValue('');

    // Mock bot response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: 'Ajoyib tanlov! Men sizga yordam berishga tayyorman.',
        sender: 'bot',
        timestamp: new Date(),
        senderName: 'Lola (AI)'
      }]);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="fixed bottom-24 right-6 w-96 h-[500px] glass rounded-3xl z-[100] flex flex-col overflow-hidden shadow-2xl border-brand-neon/20"
        >
          {/* Header */}
          <div className="p-4 bg-brand-neon/10 border-b border-white/10 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-neon/20 flex items-center justify-center relative">
                 <Atom className="text-brand-neon w-6 h-6" />
                 <div className="absolute bottom-0 right-0 w-3 h-3 bg-brand-neon rounded-full border-2 border-brand-dark"></div>
              </div>
              <div>
                <h4 className="font-bold text-sm">Lab Chat</h4>
                <p className="text-[10px] text-brand-neon uppercase tracking-widest font-bold">48 Online</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors"><X size={20}/></button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
            {messages.map((m) => (
              <div key={m.id} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
                {m.sender !== 'system' && (
                  <span className="text-[10px] text-white/40 mb-1 ml-1">{m.senderName}</span>
                )}
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  m.sender === 'user' ? 'bg-brand-neon text-brand-dark font-medium' : 
                  m.sender === 'system' ? 'w-full text-center text-xs text-white/30 italic' :
                  'bg-white/5 text-white/80 border border-white/10'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10 bg-brand-dark/50">
            <div className="relative">
              <input 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Xabarni yozing..." 
                className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-6 pr-12 focus:outline-none focus:border-brand-neon transition-colors"
              />
              <button 
                onClick={handleSend}
                className="absolute right-2 top-1.5 w-10 h-10 bg-brand-neon rounded-full flex items-center justify-center text-brand-dark hover:scale-110 transition-transform"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const LaboratoryPage = ({ onBack, onOpenLab }: { onBack: () => void, onOpenLab: (lab: any) => void }) => {
  const labs = [
    {
      title: "Elektr Laboratoriyasi 3D",
      desc: "3D-формат интерактивных электрических конструкторов. Компоненты и компоненты тальила.",
      icon: Cpu,
      color: "brand-neon",
      simulation: "⚡ Электр токи ва занжирларни 3D кўринишда йиғиш ва таҳлил қилиш лабораторияси ишга тушмоқда..."
    },
    {
      title: "Kulon qonuni (Закон Кулона)",
      desc: "Иккита нуктави зарядни масофасини ва заряд миксдорини озгартириш оркали улар орасидаги о'заро та'сир кучини (F) ольчаш.",
      icon: Atom,
      color: "blue-500",
      simulation: "⚖️ Кулон қонунини текшириш учун зарядларни танлаш ва масофани ўлчаш режимига ўтилмоқда..."
    },
    {
      title: "Elektr zanjiri yig'ish (Строитель цепей)",
      desc: "Резисторы, лампочки, батареи и калитларни улаш оркали занджир хосил килиш. Ом конунини текшириш.",
      icon: Zap,
      color: "yellow-400",
      simulation: "🔋 Занжир қурувчиси: реал вақтда резистор ва кучланиш кўрсаткичларини ҳисоблаш..."
    },
    {
      title: "Магнит майдони и Эрстед Тайрибаси",
      desc: "То'гри ток о'тайотgan отkazgiч атрофида магнит милининг (компас) ог'ишини кузатиш.",
      icon: Search,
      color: "purple-500",
      simulation: "🧲 Эрстед тажрибаси: токнунг магнит майдонини компас ёрдамида аниқлаш..."
    },
    {
      title: "Электромагнит индукция (конуни Фарадея)",
      desc: "Г'алтак (катушка) ичида магнитни харакатлантириш оркали электр токи хосил килиш.",
      icon: Layers,
      color: "red-500",
      simulation: "🌀 Фарадей қонуни: магнит оқимининг ўзгариши натижасида ЭЮК ҳосил қилиш жараёни..."
    },
    {
      title: "Kondensator va uning sig'imi",
      desc: "Конденсатор пластинчатых орасидаги масофани ва юзасини озгартириб, соединяющий сиг'имини (C) o'lchash.",
      icon: Beaker,
      color: "teal-500",
      simulation: "📉 Конденсатор сиғимини ҳисоблаш ва диэлектрик хусусиятларини ўрганиш..."
    }
  ];

  return (
    <div className="pt-32 pb-20 min-h-screen grid-bg overflow-x-hidden">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div>
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-white/50 hover:text-brand-neon transition-colors mb-4 group"
            >
              <ArrowRight className="rotate-180 group-hover:-translate-x-1 transition-transform" size={18} />
              Asosiy sahifaga qaytish
            </button>
            <h1 className="text-4xl md:text-6xl font-display font-black tracking-tight">Лаборатория электромагнетизма</h1>
            <p className="text-xl text-white/50 mt-4 max-w-2xl leading-relaxed font-sans">
              Ушбу бўлимда сиз физика қонуниятларини амалда синаб кўришингиз мумкин. Ҳар бир лаборатория реал физика моделларига асосланган.
            </p>
          </div>
          <div className="glass p-6 rounded-3xl border-brand-neon/20 flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-brand-neon/20 flex items-center justify-center">
              <User className="text-brand-neon" size={32} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-white/40 font-bold mb-1">Xush kelibsiz</p>
              <h4 className="text-xl font-bold">Алишер Усмонов</h4>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {labs.map((lab, idx) => (
            <motion.div
              key={lab.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              onClick={() => onOpenLab(lab)}
              className="glass p-8 rounded-3xl group border-white/5 hover:border-brand-neon/30 transition-all cursor-pointer relative overflow-hidden"
            >
              <div className={`w-14 h-14 rounded-2xl bg-${lab.color}/10 flex items-center justify-center mb-8 bg-white/5 group-hover:bg-brand-neon group-hover:text-brand-dark transition-all duration-500`}>
                <lab.icon size={28} />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4">{lab.title}</h3>
              <p className="text-white/40 leading-relaxed mb-10 text-sm font-sans">
                {lab.desc}
              </p>
              
              <div className="flex items-center gap-3 text-brand-neon font-black text-xs uppercase tracking-widest pt-6 border-t border-white/5">
                Laboratoriyani ochish <ChevronRight size={16} />
              </div>

              {/* Decorative detail */}
              <div className="absolute -bottom-1 -right-1 opacity-5 scale-150 rotate-12 group-hover:scale-125 transition-transform duration-1000">
                <lab.icon size={120} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Navbar = ({ onBuilding, user }: { onBuilding: () => void, user: any }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4 glass border-b' : 'py-8'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.hash = ''}>
          <div className="w-8 h-8 bg-brand-neon rounded-full flex items-center justify-center">
            <Atom className="text-brand-dark w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-display font-bold tracking-tight leading-none uppercase">И</span>
            <span className="text-[10px] items-center font-display font-bold uppercase tracking-tighter text-white/50 whitespace-nowrap">Лаборатория Искандара</span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          {['Lab', 'Services', 'Projects', 'Values'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="text-sm font-medium text-white/70 hover:text-brand-neon transition-colors"
            >
              {item}
            </a>
          ))}
          {user ? (
            <div className="flex items-center gap-4 pl-6 border-l border-white/10">
               <div className="text-right">
                  <p className="text-xs font-bold truncate max-w-[120px]">{user.name}</p>
                  <p className="text-[10px] text-brand-neon font-bold uppercase tracking-widest leading-none">Pro Member</p>
               </div>
               <div className="w-10 h-10 rounded-full border-2 border-brand-neon overflow-hidden">
                  <img src="https://picsum.photos/seed/alisher/200" className="w-full h-full object-cover" />
               </div>
            </div>
          ) : (
            <button 
              onClick={onBuilding}
              className="px-6 py-2 bg-brand-neon text-brand-dark font-bold rounded-full hover:scale-105 transition-transform"
            >
              Start a Build
            </button>
          )}
        </div>

        {/* Mobile Trigger */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 glass border-b p-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {['Lab', 'Services', 'Projects', 'Values'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium p-2 border-b border-white/5"
                >
                  {item}
                </a>
              ))}
              <button 
                onClick={() => { setMobileMenuOpen(false); onBuilding(); }}
                className="w-full py-3 bg-brand-neon text-brand-dark font-bold rounded-lg mt-4"
              >
                {user ? 'Profile Settings' : 'Start a Build'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-40 pb-20 lg:pt-60 lg:pb-40 overflow-hidden grid-bg">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-neon/10 border border-brand-neon/20 text-brand-neon text-xs font-bold uppercase tracking-widest mb-6">
            <Zap className="w-3 h-3 fill-current" />
            <span>Digital Innovation Lab</span>
          </div>
          
          <h1 className="text-7xl md:text-9xl lg:text-[12rem] font-display font-black leading-[0.8] mb-12 tracking-tighter">
            RAQAMLI <br />
            <span className="text-brand-neon">LABORATORIYA.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/60 max-w-2xl leading-relaxed mb-10">
            Biz shunchaki mahsulotlar yaratmaymiz — biz ertangi kunning raqamli infratuzilmasini va intellektual yechimlarini tajriba qilamiz va quramiz.
          </p>

          <div className="flex flex-wrap gap-6">
            <button className="px-8 py-4 bg-white text-brand-dark font-bold text-lg rounded-full flex items-center gap-3 hover:bg-brand-neon hover:scale-105 transition-all">
              Loyihani boshlash <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 border border-white/20 text-white font-bold text-lg rounded-full flex items-center gap-3 hover:bg-white/5 transition-all">
              Bizning laboratoriya
            </button>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-brand-neon/10 rounded-full blur-[120px] -z-10 group-hover:bg-brand-neon/20 transition-all"></div>
      <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px] -z-10"></div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: "AI Research",
      desc: "Sun'iy intellekt va mashinali o'rganish yordamida jarayonlarni avtomatlashtirish.",
      icon: Cpu,
      tag: "Intelligence"
    },
    {
      title: "Web Ecosystems",
      desc: "Yuqori darajadagi yuklamalarga chidamli ekotizimlar va platformalar yaratish.",
      icon: Globe,
      tag: "Architecture"
    },
    {
      title: "Mobile Lab",
      desc: "Eng so'nggi texnologiyalar asosida mobil ilovalar prototiplash va ishlab chiqish.",
      icon: Layers,
      tag: "Interface"
    },
    {
      title: "Blockchain",
      desc: "Markazlashtirilmagan texnologiyalar va aqlli shartnomalar tadqiqoti.",
      icon: Code2,
      tag: "Web3"
    }
  ];

  return (
    <section id="services" className="py-24 bg-brand-gray/30 border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-6xl md:text-8xl font-display font-black mb-6 tracking-tight">BIZNING <span className="text-white/40">SOHALAR</span></h2>
            <p className="text-xl text-white/50 border-l-2 border-brand-neon pl-6">Biz murakkab muammolarni yuqori darajadagi muhandislik yechimlariga aylantiramiz.</p>
          </div>
          <div className="flex gap-4 p-4 glass rounded-2xl">
             <div className="text-right">
                <div className="text-brand-neon font-mono text-2xl font-bold">120+</div>
                <div className="text-[10px] uppercase tracking-widest text-white/40">Builds</div>
             </div>
             <div className="w-[1px] bg-white/10 mx-2"></div>
             <div className="text-right">
                <div className="text-brand-neon font-mono text-2xl font-bold">12K</div>
                <div className="text-[10px] uppercase tracking-widest text-white/40">COFFEE</div>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, idx) => (
            <motion.div 
              key={s.title}
              whileHover={{ y: -10 }}
              className="p-8 glass rounded-3xl group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 translate-x-4 -translate-y-4 transition-all">
                <s.icon size={120} />
              </div>
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-neon group-hover:text-brand-dark transition-all duration-500">
                <s.icon className="w-5 h-5" />
              </div>
              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 text-white/60 mb-3 tracking-widest uppercase">
                {s.tag}
              </span>
              <h3 className="text-2xl font-display font-bold mb-4">{s.title}</h3>
              <p className="text-white/50 leading-relaxed">{s.desc}</p>
              
              <div className="mt-8 flex items-center gap-2 text-brand-neon font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more <ChevronRight size={16} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const projects = [
    { title: "NeoCore", category: "AI Infrastructure", image: "https://picsum.photos/seed/tech1/800/600" },
    { title: "Z-Chain", category: "DeFi Protocol", image: "https://picsum.photos/seed/tech2/800/600" },
    { title: "OmniFlow", category: "Visual Systems", image: "https://picsum.photos/seed/tech3/800/600" },
  ];

  return (
    <section id="projects" className="py-24 bg-brand-dark overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="text-6xl md:text-8xl font-display font-black mb-20 tracking-tight">LOYIHALAR <span className="text-brand-neon">/ 03</span></h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((p, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden relative mb-6">
                <img 
                  src={p.image} 
                  alt={p.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-brand-dark/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                      <ArrowRight className="text-brand-dark" />
                   </div>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-display font-bold mb-1">{p.title}</h3>
                  <p className="text-white/40 uppercase tracking-widest text-xs font-bold">{p.category}</p>
                </div>
                <div className="text-white/20 font-mono text-sm">0{idx + 1}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="pt-24 pb-12 border-t border-white/5 bg-brand-dark/50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-brand-neon rounded-full flex items-center justify-center">
                <Atom className="text-brand-dark w-5 h-5" />
              </div>
              <span className="text-2xl font-display font-bold tracking-tight">И</span>
              <span className="text-xl font-display font-bold tracking-tight ml-2">Лаборатория Искандара</span>
            </div>
            <p className="text-2xl font-display text-white/50 leading-relaxed max-w-md font-sans">
              Келажакни ҳозир қурамиз. Инновациялар сари интилишда биз билан бўлинг.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold uppercase tracking-widest text-sm text-brand-neon mb-6">Алоқа</h4>
            <p className="text-white/70 mb-2">hello@iskandarlab.uz</p>
            <p className="text-white/70 mb-8">+998 90 123 45 67</p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-brand-dark transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-brand-dark transition-all">
                <Github size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-brand-dark transition-all">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-sm text-brand-neon mb-6">Ижтимоий тармоқлар</h4>
            <div className="flex flex-col gap-3">
              <a href="#" className="text-white/70 hover:text-brand-neon transition-colors">Телеграм</a>
              <a href="#" className="text-white/70 hover:text-brand-neon transition-colors">Инстаграм</a>
              <a href="#" className="text-white/70 hover:text-brand-neon transition-colors">YouTube</a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-4">
          <p className="text-white/30 text-sm">© 2026 Искандар Лаборатория. Барча ҳуқуқлар ҳимояланган.</p>
          <div className="flex gap-8">
            <a href="#" className="text-white/30 text-sm hover:text-white transition-colors">Maxfiylik siyosati</a>
            <a href="#" className="text-white/30 text-sm hover:text-white transition-colors">Termslar</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [view, setView] = useState<'home' | 'lab'>('home');
  const [chatOpen, setChatOpen] = useState(false);
  const [activeSimulation, setActiveSimulation] = useState<any>(null);

  const handleStartBuilding = () => {
    if (!user) {
      setShowLoginModal(true);
    } else {
      setView('lab');
    }
  };

  const handleLogin = () => {
    // Simulated Google Login
    setTimeout(() => {
      setUser({ name: 'Алишер Усмонов', email: 'alisher@example.com' });
      setShowLoginModal(false);
      setView('lab');
    }, 1500);
  };

  return (
    <div className="min-h-screen">
      <Navbar onBuilding={handleStartBuilding} user={user} />
      
      <AnimatePresence mode="wait">
        {view === 'home' ? (
          <motion.div 
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <main>
              <Hero />
              
              {/* Scrolling Stats / Marquee */}
              <div className="py-6 bg-brand-neon text-brand-dark overflow-hidden border-y border-brand-neon select-none">
                <div className="flex whitespace-nowrap animate-marquee">
                  {[...Array(10)].map((_, i) => (
                    <span key={i} className="text-2xl font-display font-black mx-10 flex items-center gap-4">
                      <Atom size={28} /> INNOVATION IS CONSTANT / BIZ BILAN TEXNOLOGIYA OSALASHADI / LAB-001
                    </span>
                  ))}
                </div>
              </div>

              <Services />
              <Portfolio />

              {/* Call to Lab */}
              <section className="py-24 overflow-hidden relative">
                <div className="container mx-auto px-6 relative z-10 text-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="glass p-12 md:p-24 rounded-[3rem] border-brand-neon/20 overflow-hidden relative"
                  >
                    <Terminal className="w-16 h-16 text-brand-neon mx-auto mb-8 opacity-50" />
                    <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 uppercase tracking-tighter leading-none">MURAKKAB MUAMMOLARNI <br />YADIDAN <span className="text-brand-neon">YECHIM</span> TO'BAMIZ</h2>
                    <p className="text-xl text-white/50 mb-12 max-w-2xl mx-auto">
                      Sizning g'oyangiz — bizning laboratoriyamizdagi keyingi kashfiyot bo'lishi mumkin.
                    </p>
                    <button 
                      onClick={handleStartBuilding}
                      className="px-12 py-5 bg-brand-neon text-brand-dark font-black text-xl rounded-full hover:scale-110 transition-transform"
                    >
                      LABGA QO'SHILISH
                    </button>
                    
                    <div className="absolute top-0 left-0 w-64 h-64 bg-brand-neon/5 blur-3xl -z-10"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/5 blur-3xl -z-10"></div>
                  </motion.div>
                </div>
              </section>
            </main>
          </motion.div>
        ) : (
          <motion.div 
            key="lab"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LaboratoryPage onBack={() => setView('home')} onOpenLab={(lab) => setActiveSimulation(lab)} />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />

      {/* Simulation Modal */}
      <AnimatePresence>
        {activeSimulation && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-brand-dark/95 backdrop-blur-2xl">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass max-w-4xl w-full aspect-video rounded-[3rem] p-12 relative flex flex-col justify-center items-center text-center border-brand-neon/20"
            >
              <button 
                onClick={() => setActiveSimulation(null)}
                className="absolute top-8 right-8 text-white/40 hover:text-brand-neon transition-colors"
              >
                <X size={40} />
              </button>
              
              <div className={`w-24 h-24 rounded-3xl bg-brand-neon/20 flex items-center justify-center mb-10`}>
                 <activeSimulation.icon size={48} className="text-brand-neon" />
              </div>
              
              <h2 className="text-4xl md:text-5xl font-display font-black mb-6 uppercase tracking-widest">{activeSimulation.title}</h2>
              <p className="text-2xl text-white/70 max-w-2xl font-mono leading-relaxed">
                {activeSimulation.simulation}
              </p>
              
              <div className="mt-12 flex gap-4">
                 <div className="w-2 h-2 bg-brand-neon rounded-full animate-bounce"></div>
                 <div className="w-2 h-2 bg-brand-neon rounded-full animate-bounce [animation-delay:0.2s]"></div>
                 <div className="w-2 h-2 bg-brand-neon rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
              
              <div className="absolute bottom-12 left-12 flex items-center gap-4">
                 <Terminal size={20} className="text-brand-neon" />
                 <span className="text-xs font-mono text-white/20">SYSTEM_CORE: LOADED / STATUS: SIMULATING</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Chat Trigger */}
      {user && (
        <button 
          onClick={() => setChatOpen(!chatOpen)}
          className={`fixed bottom-6 right-6 w-16 h-16 rounded-full flex items-center justify-center transition-all z-[110] ${
            chatOpen ? 'bg-white text-brand-dark scale-90' : 'bg-brand-neon text-brand-dark shadow-neon-glow hover:scale-110'
          }`}
        >
          {chatOpen ? <X /> : <MessageSquare />}
        </button>
      )}

      {/* Chat Widget */}
      <ChatWidget isOpen={chatOpen} onClose={() => setChatOpen(false)} />

      {/* Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-brand-dark/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="glass max-w-md w-full p-10 rounded-[2rem] border-brand-neon/20 shadow-2xl relative"
            >
              <button 
                onClick={() => setShowLoginModal(false)}
                className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="w-16 h-16 bg-brand-neon/20 rounded-full flex items-center justify-center mx-auto mb-8">
                 <Atom className="text-brand-neon w-10 h-10" />
              </div>
              <h2 className="text-3xl font-display font-black text-center mb-4 uppercase">ISKANDARLAB TIZIMIGA KIRISH</h2>
              <p className="text-center text-white/50 mb-10 leading-relaxed font-sans">
                Лойиҳаларингизни лабораторияда синаб кўриш учун тизимга киринг.
              </p>

              <button 
                onClick={handleLogin}
                className="w-full py-4 bg-white text-brand-dark font-black rounded-2xl flex items-center justify-center gap-4 hover:bg-brand-neon hover:scale-[1.02] transition-all"
              >
                <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="w-6 h-6" />
                Google билан kiring
              </button>

              <div className="mt-8 pt-8 border-t border-white/5 text-center">
                 <p className="text-xs text-white/30 tracking-widest uppercase font-bold">Iskandarlab Secure Systems</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />

      {/* Floating Chat Trigger */}
      {user && (
        <button 
          onClick={() => setChatOpen(!chatOpen)}
          className={`fixed bottom-6 right-6 w-16 h-16 rounded-full flex items-center justify-center transition-all z-[110] ${
            chatOpen ? 'bg-white text-brand-dark scale-90' : 'bg-brand-neon text-brand-dark shadow-neon-glow hover:scale-110'
          }`}
        >
          {chatOpen ? <X /> : <MessageSquare />}
        </button>
      )}

      {/* Chat Widget */}
      <ChatWidget isOpen={chatOpen} onClose={() => setChatOpen(false)} />

      {/* Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-brand-dark/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="glass max-w-md w-full p-10 rounded-[2rem] border-brand-neon/20 shadow-2xl relative"
            >
              <button 
                onClick={() => setShowLoginModal(false)}
                className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="w-16 h-16 bg-brand-neon/20 rounded-full flex items-center justify-center mx-auto mb-8">
                 <Atom className="text-brand-neon w-10 h-10" />
              </div>
              <h2 className="text-3xl font-display font-black text-center mb-4">ILAB TIZIMIGA KIRISH</h2>
              <p className="text-center text-white/50 mb-10 leading-relaxed">
                Loyihalaringizni laboratoriyada sinab ko'rish uchun tizimga kiring.
              </p>

              <button 
                onClick={handleLogin}
                className="w-full py-4 bg-white text-brand-dark font-black rounded-2xl flex items-center justify-center gap-4 hover:bg-brand-neon hover:scale-[1.02] transition-all"
              >
                <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="w-6 h-6" />
                Google bilan kiring
              </button>

              <div className="mt-8 pt-8 border-t border-white/5 text-center">
                 <p className="text-xs text-white/30 tracking-widest uppercase font-bold">Zuild Laboratory Security</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {/* Global CSS for Marquee (Inline or index.css) */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .shadow-neon-glow {
          box-shadow: 0 0 20px rgba(0, 255, 156, 0.4);
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
