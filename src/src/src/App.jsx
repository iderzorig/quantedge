import { useState } from "react";
import { TrendingUp, ShoppingCart, Play, X, Check, Film, BarChart3, Filter, Star, Plus, Trash2, Lock, Sparkles, Megaphone, Store, User, LogOut, ShoppingBag, GraduationCap, Shirt } from "lucide-react";

// ---- Валют (суурь нь USD). Ханшийг энд шинэчилж болно ----
const currencies = {
  USD: { symbol: "$", rate: 1, pre: true },
  EUR: { symbol: "€", rate: 0.90, pre: true },
  HUF: { symbol: "Ft", rate: 305, pre: false },
  MNT: { symbol: "₮", rate: 3550, pre: true },
  KRW: { symbol: "₩", rate: 1380, pre: true },
};

// ---- Өгөгдөл ----
const indicators = [
  { id: 1, name: "Jump 75 Pro EA", market: "Synthetic", tf: "M15", price: 149, rating: 4.9, sales: 1240, desc: "Deriv Jump 75 индексэд зориулсан автомат робот. Тренд илрүүлэх, эрсдэл удирдах функцтэй.", color: "#22d3ee" },
  { id: 2, name: "Parabolic SAR Master", market: "Forex", tf: "Multi-TF", price: 79, rating: 4.7, sales: 890, desc: "Олон цаг хугацааны SAR сигнал, RSI/ADX шүүлтүүртэй индикатор.", color: "#a78bfa" },
  { id: 3, name: "RSI + MACD Combo", market: "Forex", tf: "H1", price: 59, rating: 4.6, sales: 1520, desc: "RSI ба MACD-ийн нийлмэл сигнал. Орох/гарах цэгийг харуулна.", color: "#34d399" },
  { id: 4, name: "Dow Theory Scanner", market: "Forex", tf: "D1", price: 99, rating: 4.8, sales: 670, desc: "Dow онол дээр суурилсан тренд тодорхойлогч.", color: "#fbbf24" },
  { id: 5, name: "Volatility 75 Scalper", market: "Synthetic", tf: "M5", price: 129, rating: 4.5, sales: 980, desc: "V75 индексийн хурдан скальп стратеги.", color: "#f472b6" },
  { id: 6, name: "ADX Power Filter", market: "Forex", tf: "Multi-TF", price: 49, rating: 4.4, sales: 1100, desc: "Трендийн хүчийг хэмжих шүүлтүүр.", color: "#60a5fa" },
];

const movies = [
  { id: 1, title: "Зах Зээлийн Эзэн", genre: "Драма", year: 2024, price: 6, rating: 8.2, c1: "#1e293b", c2: "#0ea5e9" },
  { id: 2, title: "Сүүлчийн Арилжаа", genre: "Триллер", year: 2023, price: 5, rating: 7.8, c1: "#1c1917", c2: "#f59e0b" },
  { id: 3, title: "Тоонуудын Тоглоом", genre: "Шинжлэх ухаан", year: 2025, price: 7, rating: 8.6, c1: "#0f172a", c2: "#8b5cf6" },
  { id: 4, title: "Хэлбэлзэл", genre: "Адал явдал", year: 2024, price: 5, rating: 7.5, c1: "#172554", c2: "#22d3ee" },
];

const animations = [
  { id: 1, title: "Цахим Дайчин", ep: "1-р анги", price: 0, c1: "#312e81", c2: "#06b6d4" },
  { id: 2, title: "Од Хайгчид", ep: "Бүтэн анги", price: 3, c1: "#581c87", c2: "#ec4899" },
  { id: 3, title: "Мөрөөдлийн Хот", ep: "1-р улирал", price: 4, c1: "#7c2d12", c2: "#facc15" },
  { id: 4, title: "Сүүдрийн Нууц", ep: "Кино урт", price: 5, c1: "#064e3b", c2: "#34d399" },
];

const products = [
  { id: 1, name: "Арилжааны Мастер сургалт", cat: "Сургалт", price: 199, icon: "course", desc: "20+ цагийн видео хичээл, A-Z." },
  { id: 2, name: "MQL5 кодчилол сургалт", cat: "Сургалт", price: 149, icon: "course", desc: "Өөрийн EA бичиж сур." },
  { id: 3, name: "QuantEdge футболк", cat: "Бараа", price: 25, icon: "merch", desc: "100% хөвөн, лого хэвлэмэлтэй." },
  { id: 4, name: "Трейдерийн тэмдэглэлийн дэвтэр", cat: "Бараа", price: 15, icon: "merch", desc: "Арилжааны журнал хөтлөх дэвтэр." },
];

const adPlans = [
  { id: 1, name: "Banner", price: 99, period: "7 хоног", feats: ["Хажуугийн баннер", "10,000 харалт", "Үндсэн статистик"], pop: false },
  { id: 2, name: "Featured", price: 249, period: "7 хоног", feats: ["Нүүр хуудсан дээр", "50,000 харалт", "Дэлгэрэнгүй статистик", "Тэргүүлэх байршил"], pop: true },
  { id: 3, name: "Premium", price: 499, period: "14 хоног", feats: ["Бүх хуудсанд", "Хязгааргүй харалт", "A/B тест", "Тусгай дизайн", "Эрхэлсэн менежер"], pop: false },
];

function MiniChart({ color }) {
  const pts = [40, 35, 38, 28, 32, 22, 26, 15, 18, 10];
  const w = 280, h = 90;
  const path = pts.map((p, i) => `${(i / (pts.length - 1)) * w},${p}`).join(" L ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-20">
      <defs>
        <linearGradient id={`g${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,${h} ${path} ${w},${h}`} fill={`url(#g${color})`} />
      <polyline points={path} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  );
}

export default function App() {
  const [view, setView] = useState("home");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [demo, setDemo] = useState(null);
  const [marketFilter, setMarketFilter] = useState("Бүгд");
  const [checkout, setCheckout] = useState(false);
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", pass: "" });
  const [adForm, setAdForm] = useState({ company: "", plan: "", msg: "" });
  const [adSent, setAdSent] = useState(false);
  const [cur, setCur] = useState("USD");

  // Үнэ форматлах
  const fmt = (usd) => {
    const c = currencies[cur];
    const v = Math.round(usd * c.rate).toLocaleString("en-US");
    return c.pre ? `${c.symbol}${v}` : `${v} ${c.symbol}`;
  };

  const addToCart = (item, type) => {
    const name = item.name || item.title;
    if (cart.find((c) => c.id === item.id && c.type === type)) return;
    setCart([...cart, { id: item.id, type, name, price: item.price }]);
  };
  const removeFromCart = (id, type) => setCart(cart.filter((c) => !(c.id === id && c.type === type)));
  const total = cart.reduce((s, c) => s + c.price, 0);

  const doAuth = () => {
    if (!form.email || !form.pass || (auth === "register" && !form.name)) return;
    setUser({ name: form.name || form.email.split("@")[0], email: form.email });
    setAuth(null);
    setForm({ name: "", email: "", pass: "" });
  };

  const markets = ["Бүгд", "Forex", "Synthetic"];
  const filtered = marketFilter === "Бүгд" ? indicators : indicators.filter((i) => i.market === marketFilter);
  const nav = [["home", "Нүүр"], ["indicators", "Индикатор"], ["movies", "Кино"], ["animation", "Анимэ"], ["store", "Дэлгүүр"], ["advertise", "Сурталчилгаа"]];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Толгой */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 cursor-pointer shrink-0" onClick={() => setView("home")}>
            <div className="bg-gradient-to-br from-cyan-400 to-violet-500 p-1.5 rounded-lg"><TrendingUp className="w-5 h-5 text-slate-950" /></div>
            <span className="font-bold text-lg tracking-tight hidden sm:block">QuantEdge</span>
          </div>
          <nav className="flex items-center gap-0.5 overflow-x-auto flex-1 justify-center">
            {nav.map(([k, label]) => (
              <button key={k} onClick={() => setView(k)} className={`px-2.5 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition ${view === k ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"}`}>{label}</button>
            ))}
          </nav>
          <div className="flex items-center gap-1.5 shrink-0">
            <select value={cur} onChange={(e) => setCur(e.target.value)} className="px-2 py-1.5 rounded-lg bg-slate-800 text-sm font-medium outline-none cursor-pointer hover:bg-slate-700 border-r-4 border-transparent">
              {Object.keys(currencies).map((k) => (<option key={k} value={k}>{k}</option>))}
            </select>
            {user ? (
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 text-sm"><User className="w-4 h-4 text-cyan-400" /><span className="hidden md:block max-w-20 truncate">{user.name}</span></div>
                <button onClick={() => setUser(null)} className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700" title="Гарах"><LogOut className="w-4 h-4" /></button>
              </div>
            ) : (
              <button onClick={() => setAuth("login")} className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sm font-medium whitespace-nowrap">Нэвтрэх</button>
            )}
            <button onClick={() => setShowCart(true)} className="relative p-2 rounded-lg bg-slate-800 hover:bg-slate-700">
              <ShoppingCart className="w-5 h-5" />
              {cart.length > 0 && (<span className="absolute -top-1 -right-1 bg-cyan-400 text-slate-950 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">{cart.length}</span>)}
            </button>
          </div>
        </div>
      </header>

      {/* Нүүр */}
      {view === "home" && (
        <div>
          <section className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-violet-500/10" />
            <div className="max-w-6xl mx-auto px-4 py-24 relative text-center">
              <span className="inline-block px-3 py-1 rounded-full bg-slate-800 text-cyan-400 text-xs font-medium mb-5">MT5 · Анимэ · Дэлгүүр</span>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-5">Бүгд нэг <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">дээвэр</span> дор</h1>
              <p className="text-slate-400 max-w-xl mx-auto mb-8 text-lg">Арилжааны индикатор, өөрийн анимэ, кино, сургалт, бараа — бүгд энд.</p>
              <div className="flex flex-wrap gap-3 justify-center">
                <button onClick={() => setView("indicators")} className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 text-slate-950 font-semibold hover:opacity-90 flex items-center gap-2"><BarChart3 className="w-5 h-5" /> Индикатор</button>
                <button onClick={() => setView("animation")} className="px-6 py-3 rounded-xl bg-slate-800 font-semibold hover:bg-slate-700 flex items-center gap-2"><Sparkles className="w-5 h-5" /> Анимэ үзэх</button>
              </div>
            </div>
          </section>
          <section className="max-w-6xl mx-auto px-4 pb-20 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[["6+", "Индикатор"], ["4", "Анимэ"], ["4+", "Бараа"], ["4.7★", "Үнэлгээ"]].map(([n, l]) => (
              <div key={l} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center"><div className="text-3xl font-bold text-cyan-400">{n}</div><div className="text-slate-400 text-sm mt-1">{l}</div></div>
            ))}
          </section>
        </div>
      )}

      {/* Индикатор */}
      {view === "indicators" && (
        <section className="max-w-6xl mx-auto px-4 py-10">
          <h2 className="text-2xl font-bold mb-1">Индикатор & EA</h2>
          <p className="text-slate-400 mb-6">Зах зээлээр шүүж сонгоорой.</p>
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            <Filter className="w-4 h-4 text-slate-500" />
            {markets.map((m) => (<button key={m} onClick={() => setMarketFilter(m)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${marketFilter === m ? "bg-cyan-400 text-slate-950" : "bg-slate-800 text-slate-300 hover:bg-slate-700"}`}>{m}</button>))}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((ind) => {
              const inCart = cart.find((c) => c.id === ind.id && c.type === "ind");
              return (
                <div key={ind.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition group">
                  <div className="bg-slate-950 p-4 relative">
                    <MiniChart color={ind.color} />
                    <button onClick={() => setDemo(ind)} className="absolute inset-0 flex items-center justify-center bg-slate-950/60 opacity-0 group-hover:opacity-100 transition"><span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur text-sm font-medium"><Play className="w-4 h-4" /> Дэмо видео</span></button>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2"><span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300">{ind.market}</span><span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300">{ind.tf}</span></div>
                    <h3 className="font-bold text-lg">{ind.name}</h3>
                    <p className="text-slate-400 text-sm mt-1 mb-3 leading-relaxed">{ind.desc}</p>
                    <div className="flex items-center gap-1 text-sm mb-4"><Star className="w-4 h-4 fill-amber-400 text-amber-400" /><span className="font-medium">{ind.rating}</span><span className="text-slate-500">· {ind.sales} зарагдсан</span></div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">{fmt(ind.price)}</span>
                      <button onClick={() => addToCart(ind, "ind")} disabled={inCart} className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition ${inCart ? "bg-emerald-500/20 text-emerald-400" : "bg-cyan-400 text-slate-950 hover:bg-cyan-300"}`}>{inCart ? <><Check className="w-4 h-4" /> Нэмсэн</> : <><Plus className="w-4 h-4" /> Сагслах</>}</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Кино */}
      {view === "movies" && (
        <section className="max-w-6xl mx-auto px-4 py-10">
          <h2 className="text-2xl font-bold mb-1">Кино</h2>
          <p className="text-slate-400 mb-6">Түрээслэх эсвэл худалдаж авах.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {movies.map((m) => {
              const inCart = cart.find((c) => c.id === m.id && c.type === "mov");
              return (
                <div key={m.id} className="group">
                  <div className="relative rounded-2xl overflow-hidden aspect-[2/3] mb-3" style={{ background: `linear-gradient(160deg, ${m.c1}, ${m.c2})` }}>
                    <div className="absolute inset-0 flex flex-col justify-between p-4">
                      <div className="flex justify-between items-start"><span className="text-xs px-2 py-1 rounded bg-black/30 backdrop-blur">{m.genre}</span><span className="flex items-center gap-1 text-xs px-2 py-1 rounded bg-black/30 backdrop-blur"><Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {m.rating}</span></div>
                      <Film className="w-10 h-10 self-center opacity-40" />
                      <div><h3 className="font-bold leading-tight">{m.title}</h3><span className="text-xs text-slate-300">{m.year}</span></div>
                    </div>
                    <button onClick={() => setDemo({ ...m, isMovie: true })} className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition"><Play className="w-12 h-12" /></button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold">{fmt(m.price)}</span>
                    <button onClick={() => addToCart(m, "mov")} disabled={inCart} className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${inCart ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-800 hover:bg-slate-700"}`}>{inCart ? <><Check className="w-3.5 h-3.5" /> Нэмсэн</> : <><Plus className="w-3.5 h-3.5" /> Авах</>}</button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Анимэ */}
      {view === "animation" && (
        <section className="max-w-6xl mx-auto px-4 py-10">
          <div className="flex items-center gap-2 mb-1"><Sparkles className="w-6 h-6 text-violet-400" /><h2 className="text-2xl font-bold">Миний анимэ</h2></div>
          <p className="text-slate-400 mb-6">Өөрийн зохиосон анимэйшнүүд. Зарим нь үнэгүй.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {animations.map((a) => {
              const inCart = cart.find((c) => c.id === a.id && c.type === "ani");
              const free = a.price === 0;
              return (
                <div key={a.id} className="group">
                  <div className="relative rounded-2xl overflow-hidden aspect-[3/4] mb-3" style={{ background: `linear-gradient(160deg, ${a.c1}, ${a.c2})` }}>
                    <div className="absolute inset-0 flex flex-col justify-between p-4">
                      <div className="flex justify-between"><span className="text-xs px-2 py-1 rounded bg-black/30 backdrop-blur flex items-center gap-1"><Sparkles className="w-3 h-3" /> Original</span>{free && <span className="text-xs px-2 py-1 rounded bg-emerald-500 text-slate-950 font-bold">ҮНЭГҮЙ</span>}</div>
                      <div><h3 className="font-bold leading-tight">{a.title}</h3><span className="text-xs text-slate-200">{a.ep}</span></div>
                    </div>
                    <button onClick={() => setDemo({ ...a, name: a.title, desc: a.ep, isMovie: true })} className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition"><Play className="w-12 h-12" /></button>
                  </div>
                  {free ? (
                    <button onClick={() => setDemo({ ...a, name: a.title, desc: a.ep, isMovie: true })} className="w-full py-2 rounded-lg text-sm font-semibold bg-violet-500 hover:bg-violet-400 text-white flex items-center justify-center gap-1.5"><Play className="w-4 h-4" /> Үзэх</button>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="font-bold">{fmt(a.price)}</span>
                      <button onClick={() => addToCart(a, "ani")} disabled={inCart} className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${inCart ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-800 hover:bg-slate-700"}`}>{inCart ? <><Check className="w-3.5 h-3.5" /> Нэмсэн</> : <><Plus className="w-3.5 h-3.5" /> Авах</>}</button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Онлайн дэлгүүр */}
      {view === "store" && (
        <section className="max-w-6xl mx-auto px-4 py-10">
          <div className="flex items-center gap-2 mb-1"><Store className="w-6 h-6 text-cyan-400" /><h2 className="text-2xl font-bold">Онлайн дэлгүүр</h2></div>
          <p className="text-slate-400 mb-6">Сургалт, бараа бүтээгдэхүүн.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map((p) => {
              const inCart = cart.find((c) => c.id === p.id && c.type === "prod");
              return (
                <div key={p.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition flex flex-col">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${p.icon === "course" ? "bg-cyan-400/15 text-cyan-400" : "bg-violet-400/15 text-violet-400"}`}>{p.icon === "course" ? <GraduationCap className="w-6 h-6" /> : <Shirt className="w-6 h-6" />}</div>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 self-start mb-2">{p.cat}</span>
                  <h3 className="font-bold">{p.name}</h3>
                  <p className="text-slate-400 text-sm mt-1 mb-4 flex-1">{p.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold">{fmt(p.price)}</span>
                    <button onClick={() => addToCart(p, "prod")} disabled={inCart} className={`px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-1 transition ${inCart ? "bg-emerald-500/20 text-emerald-400" : "bg-cyan-400 text-slate-950 hover:bg-cyan-300"}`}>{inCart ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}</button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Сурталчилгаа */}
      {view === "advertise" && (
        <section className="max-w-6xl mx-auto px-4 py-10">
          <div className="flex items-center gap-2 mb-1"><Megaphone className="w-6 h-6 text-amber-400" /><h2 className="text-2xl font-bold">Бидэнтэй хамт сурталчил</h2></div>
          <p className="text-slate-400 mb-8">Танай зарыг мянга мянган трейдерт хүргэе. Багцаа сонгоорой.</p>
          <div className="grid md:grid-cols-3 gap-5 mb-12">
            {adPlans.map((pl) => (
              <div key={pl.id} className={`rounded-2xl p-6 border ${pl.pop ? "border-cyan-400 bg-slate-900 relative" : "border-slate-800 bg-slate-900"}`}>
                {pl.pop && <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-cyan-400 text-slate-950 text-xs font-bold">ХАМГИЙН ИХ АВДАГ</span>}
                <h3 className="font-bold text-lg">{pl.name}</h3>
                <div className="my-3"><span className="text-3xl font-bold">{fmt(pl.price)}</span><span className="text-slate-500 text-sm"> / {pl.period}</span></div>
                <ul className="space-y-2 mb-6">{pl.feats.map((f) => (<li key={f} className="flex items-center gap-2 text-sm text-slate-300"><Check className="w-4 h-4 text-emerald-400 shrink-0" /> {f}</li>))}</ul>
                <button onClick={() => { setAdForm({ ...adForm, plan: pl.name }); setAdSent(false); }} className={`w-full py-2.5 rounded-xl font-semibold ${pl.pop ? "bg-cyan-400 text-slate-950 hover:bg-cyan-300" : "bg-slate-800 hover:bg-slate-700"}`}>Сонгох</button>
              </div>
            ))}
          </div>
          <div className="max-w-lg mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="font-bold text-lg mb-4">Зар илгээх хүсэлт</h3>
            {adSent ? (
              <div className="text-center py-6"><div className="w-14 h-14 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-3"><Check className="w-7 h-7 text-emerald-400" /></div><p className="font-semibold">Хүсэлт хүлээж авлаа!</p><p className="text-slate-400 text-sm mt-1">Бид удахгүй танай компанитай холбогдоно.</p></div>
            ) : (
              <div className="space-y-3">
                <input value={adForm.company} onChange={(e) => setAdForm({ ...adForm, company: e.target.value })} placeholder="Компанийн нэр" className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 outline-none focus:border-cyan-400" />
                <select value={adForm.plan} onChange={(e) => setAdForm({ ...adForm, plan: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 outline-none focus:border-cyan-400">
                  <option value="">Багц сонгох</option>
                  {adPlans.map((pl) => (<option key={pl.id} value={pl.name}>{pl.name} — {fmt(pl.price)}</option>))}
                </select>
                <textarea value={adForm.msg} onChange={(e) => setAdForm({ ...adForm, msg: e.target.value })} placeholder="Зарын тухай тайлбар" rows={3} className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 outline-none focus:border-cyan-400 resize-none" />
                <button onClick={() => { if (adForm.company && adForm.plan) setAdSent(true); }} className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-semibold">Илгээх</button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Дэмо/трейлер цонх */}
      {demo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80" onClick={() => setDemo(null)}>
          <div className="bg-slate-900 rounded-2xl max-w-2xl w-full overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="aspect-video bg-slate-950 flex flex-col items-center justify-center relative">
              <div className="w-16 h-16 rounded-full bg-cyan-400/20 flex items-center justify-center mb-3"><Play className="w-8 h-8 text-cyan-400 ml-1" /></div>
              <p className="text-slate-400 text-sm">{demo.isMovie ? "Видео тоглуулагч" : "Дэмо видео"}</p>
              <p className="text-slate-600 text-xs mt-1">(жинхэнэ видеог backend-ээс холбоно)</p>
              <button onClick={() => setDemo(null)} className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-5"><h3 className="font-bold text-lg">{demo.name || demo.title}</h3><p className="text-slate-400 text-sm mt-1">{demo.desc || `${demo.genre} · ${demo.year}`}</p></div>
          </div>
        </div>
      )}

      {/* Нэвтрэх / Бүртгүүлэх */}
      {auth && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80" onClick={() => setAuth(null)}>
          <div className="bg-slate-900 rounded-2xl max-w-sm w-full p-6 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setAuth(null)} className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-slate-800"><X className="w-5 h-5" /></button>
            <div className="flex items-center gap-2 mb-1"><div className="bg-gradient-to-br from-cyan-400 to-violet-500 p-1.5 rounded-lg"><TrendingUp className="w-5 h-5 text-slate-950" /></div><span className="font-bold text-lg">QuantEdge</span></div>
            <h3 className="font-bold text-xl mt-4 mb-1">{auth === "login" ? "Нэвтрэх" : "Бүртгүүлэх"}</h3>
            <p className="text-slate-400 text-sm mb-5">{auth === "login" ? "Дансандаа нэвтэрнэ үү." : "Шинэ данс үүсгэнэ үү."}</p>
            <div className="space-y-3">
              {auth === "register" && (<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Нэр" className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 outline-none focus:border-cyan-400" />)}
              <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Имэйл" type="email" className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 outline-none focus:border-cyan-400" />
              <input value={form.pass} onChange={(e) => setForm({ ...form, pass: e.target.value })} placeholder="Нууц үг" type="password" className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 outline-none focus:border-cyan-400" />
              <button onClick={doAuth} className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 text-slate-950 font-semibold">{auth === "login" ? "Нэвтрэх" : "Бүртгүүлэх"}</button>
            </div>
            <p className="text-center text-sm text-slate-400 mt-4">{auth === "login" ? "Данс байхгүй юу? " : "Аль хэдийн бүртгэлтэй юу? "}<button onClick={() => setAuth(auth === "login" ? "register" : "login")} className="text-cyan-400 font-medium">{auth === "login" ? "Бүртгүүлэх" : "Нэвтрэх"}</button></p>
          </div>
        </div>
      )}

      {/* Сагс */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60" onClick={() => { setShowCart(false); setCheckout(false); }}>
          <div className="bg-slate-900 w-full max-w-md h-full overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-slate-800 flex items-center justify-between"><h3 className="font-bold text-lg flex items-center gap-2"><ShoppingCart className="w-5 h-5" /> Сагс</h3><button onClick={() => { setShowCart(false); setCheckout(false); }} className="p-1.5 rounded-lg hover:bg-slate-800"><X className="w-5 h-5" /></button></div>
            {checkout ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4"><Check className="w-8 h-8 text-emerald-400" /></div>
                <h4 className="font-bold text-xl mb-2">Захиалга амжилттай!</h4>
                <p className="text-slate-400 text-sm mb-6">Татах холбоосыг имэйлээр илгээнэ. (Жинхэнэ төлбөрийн системд холбогдоно.)</p>
                <button onClick={() => { setCart([]); setCheckout(false); setShowCart(false); }} className="px-5 py-2.5 rounded-xl bg-cyan-400 text-slate-950 font-semibold">Дуусгах</button>
              </div>
            ) : cart.length === 0 ? (
              <div className="p-10 text-center text-slate-500"><ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-30" /> Сагс хоосон байна.</div>
            ) : (
              <>
                <div className="p-5 space-y-3">
                  {cart.map((c) => (
                    <div key={c.type + c.id} className="flex items-center justify-between bg-slate-950 rounded-xl p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-slate-800 text-cyan-400">{c.type === "ind" ? <BarChart3 className="w-4 h-4" /> : c.type === "mov" ? <Film className="w-4 h-4" /> : c.type === "ani" ? <Sparkles className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}</div>
                        <div><div className="font-medium text-sm">{c.name}</div><div className="text-slate-500 text-xs">{c.type === "ind" ? "Индикатор" : c.type === "mov" ? "Кино" : c.type === "ani" ? "Анимэ" : "Бараа"}</div></div>
                      </div>
                      <div className="flex items-center gap-3"><span className="font-semibold">{fmt(c.price)}</span><button onClick={() => removeFromCart(c.id, c.type)} className="text-slate-500 hover:text-red-400"><Trash2 className="w-4 h-4" /></button></div>
                    </div>
                  ))}
                </div>
                <div className="p-5 border-t border-slate-800">
                  <div className="flex justify-between text-lg font-bold mb-4"><span>Нийт</span><span>{fmt(total)}</span></div>
                  {!user && <p className="text-amber-400 text-xs mb-3 text-center">Төлбөр төлөхийн тулд эхлээд нэвтэрнэ үү.</p>}
                  <button onClick={() => { if (!user) { setShowCart(false); setAuth("login"); } else setCheckout(true); }} className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 text-slate-950 font-semibold flex items-center justify-center gap-2"><Lock className="w-4 h-4" /> Төлбөр төлөх</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <footer className="border-t border-slate-800 mt-10"><div className="max-w-6xl mx-auto px-4 py-8 text-center text-slate-500 text-sm">© 2026 QuantEdge · Индикатор · Анимэ · Кино · Дэлгүүр</div></footer>
    </div>
  );
}
