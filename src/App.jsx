import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  ArrowRight, 
  CheckCircle2, 
  Phone, 
  Globe, 
  ShoppingBag, 
  Database, 
  Calculator, 
  Mail, 
  Star, 
  Sparkles, 
  User, 
  Lock, 
  Plus, 
  Minus, 
  Receipt, 
  Clock, 
  ChevronRight, 
  Check, 
  ShieldCheck,
  MessageSquare,
  EyeOff,
  TrendingDown
} from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDemo, setActiveDemo] = useState(null); // 'catalog' | 'cashier' | 'rental' | null
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mockupStep, setMockupStep] = useState(0);

  // Automatically cycle through smartphone screen mockup steps
  useEffect(() => {
    const interval = setInterval(() => {
      setMockupStep((prev) => (prev + 1) % 6);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Phone number for WhatsApp CTA
  const waNumber = '6285183050120';
  const mainWaLink = `https://wa.me/${waNumber}?text=Halo%20MIMO%20DIGITAL%2C%20saya%20tertarik%20untuk%20konsultasi%20digitalisasi%20bisnis%20saya.`;
  const discussWaLink = `https://wa.me/${waNumber}?text=Halo%20MIMO%20DIGITAL%2C%20saya%20ingin%20berdiskusi%20tentang%20kebutuhan%20digital%20bisnis%20saya.`;

  // Monitor scroll for "Scroll to Top" button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- DEMO 1: CATALOGUE STATE ---
  const [catalogCart, setCatalogCart] = useState([]);
  const [catalogSize, setCatalogSize] = useState('M');
  const [catalogCustomerName, setCatalogCustomerName] = useState('');
  const [catalogCustomerAddr, setCatalogCustomerAddr] = useState('');
  const [catalogStep, setCatalogStep] = useState(1); // 1: Browse, 2: Checkout Form, 3: Success WA format

  const catalogProducts = [
    { id: 1, name: 'Kaos Polos Premium Balikpapan', price: 95000, img: '👕' },
    { id: 2, name: 'Kemeja Flannel Modern', price: 185000, img: '👔' },
    { id: 3, name: 'Jaket Hoodie Streetwear BPP', price: 245000, img: '🧥' }
  ];

  const addToCatalogCart = (product) => {
    const existing = catalogCart.find(item => item.id === product.id && item.size === catalogSize);
    if (existing) {
      setCatalogCart(catalogCart.map(item => 
        (item.id === product.id && item.size === catalogSize) 
          ? { ...item, qty: item.qty + 1 } 
          : item
      ));
    } else {
      setCatalogCart([...catalogCart, { ...product, size: catalogSize, qty: 1 }]);
    }
  };

  const updateCatalogQty = (id, size, delta) => {
    setCatalogCart(catalogCart.map(item => {
      if (item.id === id && item.size === size) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const getCatalogTotal = () => {
    return catalogCart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  };

  const getCatalogWaText = () => {
    let orderText = `Halo Mimo Store, saya mau pesan:\n`;
    catalogCart.forEach(item => {
      orderText += `- ${item.name} (${item.size}) x ${item.qty} = Rp ${(item.price * item.qty).toLocaleString('id-ID')}\n`;
    });
    orderText += `\n*Total:* Rp ${getCatalogTotal().toLocaleString('id-ID')}\n`;
    orderText += `*Nama:* ${catalogCustomerName}\n`;
    orderText += `*Alamat:* ${catalogCustomerAddr}`;
    return encodeURIComponent(orderText);
  };

  // --- DEMO 2: CASHIER STATE ---
  const [cashierUser, setCashierUser] = useState('');
  const [cashierPass, setCashierPass] = useState('');
  const [cashierError, setCashierError] = useState('');
  const [isCashierLoggedIn, setIsCashierLoggedIn] = useState(false);
  const [cashierCart, setCashierCart] = useState([]);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptNumber, setReceiptNumber] = useState('');

  const cashierMenu = [
    { id: 1, name: 'Es Kopi Susu Mimo', price: 18000, category: 'Minuman' },
    { id: 2, name: 'Ice Lychee Tea BPP', price: 15000, category: 'Minuman' },
    { id: 3, name: 'Croissant Keju Lumer', price: 22000, category: 'Makanan' },
    { id: 4, name: 'Kentang Goreng Cabe Garam', price: 17000, category: 'Makanan' }
  ];

  const handleCashierLogin = (e) => {
    e.preventDefault();
    if (cashierUser.trim() === 'kasir' && cashierPass === '123') {
      setIsCashierLoggedIn(true);
      setCashierError('');
    } else {
      setCashierError('Username atau password salah! Hubungi Admin.');
    }
  };

  const addToCashierCart = (item) => {
    const existing = cashierCart.find(c => c.id === item.id);
    if (existing) {
      setCashierCart(cashierCart.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c));
    } else {
      setCashierCart([...cashierCart, { ...item, qty: 1 }]);
    }
  };

  const updateCashierQty = (id, delta) => {
    setCashierCart(cashierCart.map(c => {
      if (c.id === id) {
        const newQty = c.qty + delta;
        return newQty > 0 ? { ...c, qty: newQty } : null;
      }
      return c;
    }).filter(Boolean));
  };

  const getCashierSubtotal = () => {
    return cashierCart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  };

  const handleCashierCheckout = () => {
    if (cashierCart.length === 0) return;
    const randNum = 'TRX-' + Math.floor(100000 + Math.random() * 900000);
    setReceiptNumber(randNum);
    setShowReceipt(true);
  };

  const resetCashierDemo = () => {
    setCashierCart([]);
    setShowReceipt(false);
  };

  // --- DEMO 3: RENTAL STATE ---
  const [selectedCar, setSelectedCar] = useState(null);
  const [renterName, setRenterName] = useState('');
  const [rentalDays, setRentalDays] = useState(1);
  const [withDriver, setWithDriver] = useState(false);
  const [rentalDate, setRentalDate] = useState('');
  const [rentalSuccess, setRentalSuccess] = useState(false);

  const rentalCars = [
    { id: 1, name: 'Toyota Avanza Facelift', price: 400000, img: '🚘' },
    { id: 2, name: 'Mitsubishi Xpander', price: 500000, img: '🚙' },
    { id: 3, name: 'Toyota Fortuner VRZ', price: 900000, img: 'SUV' }
  ];

  const getRentalTotal = () => {
    if (!selectedCar) return 0;
    const base = selectedCar.price * rentalDays;
    const driverFee = withDriver ? 150000 * rentalDays : 0;
    return base + driverFee;
  };

  const getRentalWaText = () => {
    if (!selectedCar) return '';
    let text = `Halo Mimo Trans, saya mau booking mobil:\n`;
    text += `*Unit:* ${selectedCar.name}\n`;
    text += `*Mulai Sewa:* ${rentalDate || 'Segera'}\n`;
    text += `*Durasi:* ${rentalDays} Hari\n`;
    text += `*Layanan:* ${withDriver ? 'Dengan Supir (+Rp 150rb/hari)' : 'Lepas Kunci'}\n`;
    text += `\n*Total Biaya:* Rp ${getRentalTotal().toLocaleString('id-ID')}\n`;
    text += `*Nama Pemesan:* ${renterName}`;
    return encodeURIComponent(text);
  };

  return (
    <div className="relative min-h-screen bg-[#F1F5F9] text-slate-700 selection:bg-slate-500 selection:text-white antialiased font-sans pb-12 overflow-x-hidden">
      
      {/* Cool Silver/Titanium background glows */}
      <div className="absolute top-[5%] left-1/4 w-[500px] h-[500px] bg-slate-300/30 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      <div className="absolute top-[25%] right-1/4 w-[400px] h-[400px] bg-slate-200/40 rounded-full blur-[110px] pointer-events-none -z-10"></div>
      <div className="absolute top-[60%] left-10 w-[450px] h-[450px] bg-slate-300/20 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-[10%] right-10 w-[550px] h-[550px] bg-slate-400/10 rounded-full blur-[130px] pointer-events-none -z-10"></div>

      {/* Very subtle tech grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none -z-20"></div>

      {/* 1. Navbar */}
      <nav className="fixed top-0 left-0 w-full z-40 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-5">
          <div className="glass-navbar rounded-2xl px-4 sm:px-6 py-3.5 sm:py-4 flex justify-between items-center border border-slate-800">
            
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <a href="#" className="flex items-center space-x-2 sm:space-x-3 group">
                <div className="bg-white px-2 py-0.5 rounded-xl shadow-sm transition-all hover:bg-slate-50">
                  <img 
                    src="/logo.png" 
                    alt="MIMO DIGITAL Icon" 
                    className="h-8 sm:h-9.5 w-auto object-contain"
                  />
                </div>
                <span className="text-base sm:text-lg md:text-xl font-black tracking-wider text-white font-display group-hover:text-slate-200 transition-colors">
                  MIMO DIGITAL
                </span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8 items-center">
              <a href="#layanan" className="text-slate-300 hover:text-white font-semibold transition-colors duration-200 relative group">
                <span>Layanan</span>
                <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-slate-300 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#demo" className="text-slate-300 hover:text-white font-semibold transition-colors duration-200 relative group">
                <span>Demo</span>
                <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-slate-300 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#kontak" className="text-slate-300 hover:text-white font-semibold transition-colors duration-200 relative group">
                <span>Kontak</span>
                <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-slate-300 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a 
                href={mainWaLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-[#25D366] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#1ebd54] hover:shadow-soft active:scale-95 transition-all duration-200 border border-[#25D366] hover:border-[#1ebd54]"
              >
                Hubungi Sekarang
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="text-slate-200 p-2 hover:bg-white/5 rounded-xl focus:outline-none"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMenuOpen && (
          <div className="md:hidden max-w-7xl mx-auto px-4 sm:px-6 mt-2">
            <div className="glass-navbar rounded-2xl p-5 space-y-2 border border-slate-800">
              <a 
                href="#layanan" 
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 rounded-xl text-base font-semibold text-slate-200 hover:bg-white/5 transition-all"
              >
                Layanan
              </a>
              <a 
                href="#demo" 
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 rounded-xl text-base font-semibold text-slate-200 hover:bg-white/5 transition-all"
              >
                Demo
              </a>
              <a 
                href="#kontak" 
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 rounded-xl text-base font-semibold text-slate-200 hover:bg-white/5 transition-all"
              >
                Kontak
              </a>
              <a 
                href={mainWaLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block w-full text-center bg-[#25D366] text-white py-3.5 rounded-xl font-bold hover:bg-[#1ebd54] transition-all"
              >
                Hubungi Sekarang
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Margin Offset */}
      <div className="h-24 sm:h-32"></div>

      {/* 2. Hero Section */}
      <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          
          {/* Centered Copywriting */}
          <div className="space-y-6 sm:space-y-8 flex flex-col items-center">
            
            <div className="inline-flex items-center space-x-2 bg-slate-200/80 border border-slate-300 text-slate-700 px-4.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide shadow-sm">
              <Sparkles className="h-4 w-4 text-slate-500 animate-spin-slow" />
              <span>IT & Web Specialist Balikpapan</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.14] text-slate-900 font-display max-w-3xl">
              Digitalisasikan Bisnismu di Balikpapan, <br/>
              <span className="text-emerald-600 relative inline-block">
                Tanpa Ribet
              </span> dan <span className="text-emerald-600 relative inline-block">Tanpa Mahal.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-655 font-normal leading-relaxed max-w-2xl mx-auto">
              Dari Landing Page agar bisnis Anda mudah ditemukan di Google, Katalog Digital interaktif WhatsApp, hingga Sistem Aplikasi Kasir & Stok. Saya bantu UMKM dan pengusaha lokal Balikpapan mengelola bisnis lebih modern, rapi, dan serba otomatis.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
              <a 
                href={mainWaLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center space-x-2 bg-[#25D366] hover:bg-[#1ebd54] text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-sm active:scale-95 transition-all duration-200"
              >
                <Phone className="h-5 w-5 fill-current" />
                <span>📱 Konsultasi Gratis WhatsApp</span>
              </a>
              <a 
                href="#demo" 
                className="inline-flex items-center justify-center bg-white border border-slate-300 text-slate-700 px-8 py-4 rounded-2xl font-bold hover:bg-slate-100 hover:text-slate-950 transition-all duration-200 shadow-sm"
              >
                Coba Live Demo
              </a>
            </div>

            {/* Trust Badge Grid */}
            <div className="pt-6 sm:pt-8 border-t border-slate-300 flex flex-wrap gap-y-4 gap-x-8 justify-center items-center w-full max-w-2xl">
              <div className="flex items-center space-x-2 text-slate-550 text-sm">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                <span>Pengerjaan Kilat</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-550 text-sm">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                <span>Bebas Ribet Hosting</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-550 text-sm">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                <span>Full-Support Balikpapan</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Pain Points Section */}
      <section className="py-20 sm:py-28 bg-[#E2E8F0]/40 border-y border-slate-250/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-display">
              Masih Mengelola Bisnis dengan Cara Lama?
            </h2>
            <div className="w-20 h-1 bg-slate-400 mx-auto mt-5 rounded-full"></div>
          </div>

          {/* 3-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div className="glass-card glass-card-hover p-8 rounded-3xl group border border-white/90 shadow-sm">
              <div className="w-14 h-14 bg-slate-200 text-slate-700 border border-slate-300 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-slate-300 group-hover:text-slate-800 transition-colors shadow-inner">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold font-display text-slate-900 mb-3 leading-snug">
                Balas Chat Manual
              </h3>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                "Capek balas WhatsApp pelanggan satu per satu cuma buat jawabin stok barang dan daftar harga yang sama terus menerus?"
              </p>
            </div>

            {/* Card 2 */}
            <div className="glass-card glass-card-hover p-8 rounded-3xl group border border-white/90 shadow-sm">
              <div className="w-14 h-14 bg-slate-200 text-slate-700 border border-slate-300 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-slate-300 group-hover:text-slate-800 transition-colors shadow-inner">
                <EyeOff className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold font-display text-slate-900 mb-3 leading-snug">
                Tidak Terlihat di Google
              </h3>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                "Pendatang di Balikpapan mencari jasamu di Google, tapi bisnismu sama sekali tidak ditemukan dan kompetitormu yang dapat orderan?"
              </p>
            </div>

            {/* Card 3 */}
            <div className="glass-card glass-card-hover p-8 rounded-3xl group border border-white/90 shadow-sm">
              <div className="w-14 h-14 bg-slate-200 text-slate-700 border border-slate-300 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-slate-300 group-hover:text-slate-800 transition-colors shadow-inner">
                <TrendingDown className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold font-display text-slate-900 mb-3 leading-snug">
                Pembukuan Berantakan
              </h3>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                "Pusing dengan pembukuan kas manual, stok barang sering tidak pas, dan nota pesanan kertas yang mudah hilang?"
              </p>
            </div>

          </div>

          {/* Closing Text */}
          <div className="mt-16 text-center max-w-2xl mx-auto">
            <p className="text-lg sm:text-2xl font-bold font-display text-slate-800 leading-relaxed">
              Sudah saatnya beralih. Anda fokus kembangkan bisnisnya, biar saya yang bangun sistem digitalnya.
            </p>
          </div>

        </div>
      </section>

      {/* 4. Services Section */}
      <section id="layanan" className="py-20 sm:py-28 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-display">
              Layanan Unggulan Untuk Bisnismu
            </h2>
            <p className="mt-4 text-slate-550 text-sm sm:text-base max-w-xl mx-auto">
              Pilihan solusi digital tepat sasaran untuk melipatgandakan omset dan mempermudah operasional bisnismu secara instan.
            </p>
            <div className="w-20 h-1 bg-slate-405 bg-slate-400 mx-auto mt-5 rounded-full"></div>
          </div>

          {/* 3-Card Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Service 1 */}
            <div className="glass-card glass-card-hover p-8 sm:p-10 rounded-[2.5rem] border border-white/90 shadow-sm flex flex-col justify-between group">
              <div>
                <div className="w-16 h-16 bg-slate-100 text-slate-700 border border-slate-200 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-slate-700 group-hover:text-white transition-all duration-300 shadow-sm">
                  <Globe className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold font-display text-slate-900 mb-4">
                  Landing Page & Website
                </h3>
                <p className="text-slate-550 text-sm sm:text-base leading-relaxed">
                  Sangat cocok untuk jasa Rental Mobil, Kontraktor, Tour Travel, Kost, dan klinik kecantikan agar tampil di halaman pertama mesin pencarian Google.
                </p>
              </div>
              <div className="pt-8 mt-8 border-t border-slate-250">
                <a 
                  href={mainWaLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-slate-700 hover:text-slate-950 font-bold text-sm inline-flex items-center space-x-2 transition-colors"
                >
                  <span>Pesan Website Premium</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Service 2 */}
            <div className="glass-card glass-card-hover p-8 sm:p-10 rounded-[2.5rem] border border-white/90 shadow-sm flex flex-col justify-between group">
              <div>
                <div className="w-16 h-16 bg-slate-100 text-slate-700 border border-slate-200 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-slate-700 group-hover:text-white transition-all duration-300 shadow-sm">
                  <ShoppingBag className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold font-display text-slate-900 mb-4">
                  Katalog Digital Cerdas
                </h3>
                <p className="text-slate-550 text-sm sm:text-base leading-relaxed">
                  Pelanggan tinggal buka satu tautan, pilih foto produk, lalu pesanan otomatis terkirim langsung ke WhatsApp pribadi Anda dengan format orderan yang sangat rapi.
                </p>
              </div>
              <div className="pt-8 mt-8 border-t border-slate-250">
                <a 
                  href={mainWaLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-slate-700 hover:text-slate-950 font-bold text-sm inline-flex items-center space-x-2 transition-colors"
                >
                  <span>Buat Katalog Sekarang</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Service 3 */}
            <div className="glass-card glass-card-hover p-8 sm:p-10 rounded-[2.5rem] border border-white/90 shadow-sm flex flex-col justify-between group">
              <div>
                <div className="w-16 h-16 bg-slate-100 text-slate-700 border border-slate-200 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-slate-700 group-hover:text-white transition-all duration-300 shadow-sm">
                  <Calculator className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold font-display text-slate-900 mb-4">
                  Aplikasi Kasir & Stok
                </h3>
                <p className="text-slate-550 text-sm sm:text-base leading-relaxed">
                  Sistem manajemen kasir POS, stok barang gudang, dan laporan laba-rugi untuk Cafe, Restoran, Toko Baju, atau Laundry. Cukup pantau semuanya dari HP Anda.
                </p>
              </div>
              <div className="pt-8 mt-8 border-t border-slate-250">
                <a 
                  href={mainWaLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-slate-700 hover:text-slate-950 font-bold text-sm inline-flex items-center space-x-2 transition-colors"
                >
                  <span>Pesan Sistem Kasir</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. Why Choose Us Section */}
      <section className="py-20 sm:py-28 bg-[#E2E8F0]/40 border-y border-slate-250/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Side: Headline */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-slate-200 border border-slate-350 text-slate-700 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide">
                <CheckCircle2 className="h-4 w-4 text-slate-650" />
                <span>Solusi Terbaik UMKM</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight font-display">
                Mengapa Memilih Layanan Saya?
              </h2>
              <p className="text-slate-550 text-sm sm:text-base leading-relaxed">
                Saya tidak hanya membuat sistem kaku dan meninggalkan Anda begitu saja. Saya menyediakan layanan lengkap 'terima beres' mulai dari ide dasar, desain visual kelas atas, hingga sistem Anda online 100%.
              </p>
              <div className="pt-2">
                <a 
                  href={mainWaLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center space-x-2 text-slate-700 hover:text-slate-900 font-bold text-sm"
                >
                  <span>Pelajari alur cara kerja</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Right Side: List items with Checkmark */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Item 1 */}
              <div className="glass-card p-6 rounded-2xl flex items-start space-x-4 border border-white/90 shadow-sm">
                <div className="w-10 h-10 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Check className="h-5 w-5 stroke-[3px]" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 font-display mb-1">
                    Pengerjaan Secepat Kilat
                  </h4>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    Menggunakan teknologi terdepan dalam framework pengembangan sehingga website Anda termuat sangat cepat di browser pelanggan dan selesai tepat waktu.
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="glass-card p-6 rounded-2xl flex items-start space-x-4 border border-white/90 shadow-sm">
                <div className="w-10 h-10 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Check className="h-5 w-5 stroke-[3px]" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 font-display mb-1">
                    Desain Kustom Sesuai Karakter Bisnis
                  </h4>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    Setiap pixel dan alur fitur disesuaikan khusus dengan produk serta karakteristik unik operasional tokomu agar mempermudah alur kerja harian.
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="glass-card p-6 rounded-2xl flex items-start space-x-4 border border-white/90 shadow-sm">
                <div className="w-10 h-10 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Check className="h-5 w-5 stroke-[3px]" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 font-display mb-1">
                    Layanan Terima Beres & Bebas Pusing
                  </h4>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    Tidak perlu repot memikirkan teknis pembelian nama domain, server hosting bulanan, ataupun SSL. Semuanya saya yang kelola untuk Anda!
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 6. Portfolio / Live Demo Section */}
      <section id="demo" className="py-20 sm:py-28 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <div className="inline-flex items-center space-x-2 bg-slate-200 border border-slate-300 text-slate-750 px-4 py-1.5 rounded-full text-xs font-bold mb-3 tracking-wide">
              <span>Interactive Simulators</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-display">
              Coba Langsung Sistemnya (Live Demo)
            </h2>
            <p className="mt-4 text-slate-500 text-sm sm:text-base leading-relaxed">
              Silakan klik dan uji coba langsung purwarupa sistem otomatisasi digital yang telah saya kembangkan di bawah ini:
            </p>
            <div className="w-20 h-1 bg-slate-400 mx-auto mt-5 rounded-full"></div>
          </div>

          {/* Demo Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Demo 1 */}
            <div className="glass-card p-6 sm:p-8 rounded-[2.2rem] border border-white/90 shadow-sm hover:shadow-md transition-all duration-300">
              <div>
                <span className="text-[10px] font-extrabold text-slate-700 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full border border-slate-300">
                  E-Commerce WA
                </span>
                <h3 className="text-xl font-bold font-display text-slate-900 mt-5 mb-2">
                  Katalog Online Toko Baju
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6">
                  Simulasikan cara termudah bagi pelanggan memilih baju premium, menentukan ukuran pakaian, melengkapi alamat, dan checkout otomatis langsung terkirim ke WhatsApp penjual.
                </p>
              </div>
              <button 
                onClick={() => {
                  setActiveDemo('catalog');
                  setCatalogStep(1);
                  setCatalogCart([]);
                }}
                className="w-full bg-slate-700 hover:bg-slate-800 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-sm active:scale-[0.98] inline-flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Lihat Live Demo</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* Demo 2 */}
            <div className="glass-card p-6 sm:p-8 rounded-[2.2rem] border border-white/90 shadow-sm hover:shadow-md transition-all duration-300">
              <div>
                <span className="text-[10px] font-extrabold text-slate-700 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full border border-slate-300">
                  Sistem Kasir Cafe
                </span>
                <h3 className="text-xl font-bold font-display text-slate-900 mt-5 mb-2">
                  Aplikasi Kasir POS Cafe
                </h3>
                <div className="bg-slate-100/70 border border-slate-250 rounded-2xl p-4 text-xs text-slate-650 mb-6 font-mono space-y-1 shadow-inner">
                  <p className="font-semibold text-slate-800">🔑 Akun Akses Demo:</p>
                  <p>User: <span className="text-slate-700 font-bold">kasir</span></p>
                  <p>Pass: <span className="text-slate-700 font-bold">123</span></p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setActiveDemo('cashier');
                  setIsCashierLoggedIn(false);
                  setCashierUser('');
                  setCashierPass('');
                  setCashierCart([]);
                  setShowReceipt(false);
                }}
                className="w-full bg-slate-700 hover:bg-slate-800 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-sm active:scale-[0.98] inline-flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Uji Kasir Digital</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* Demo 3 */}
            <div className="glass-card p-6 sm:p-8 rounded-[2.2rem] border border-white/90 shadow-sm hover:shadow-md transition-all duration-300">
              <div>
                <span className="text-[10px] font-extrabold text-slate-700 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full border border-slate-300">
                  Lead Gen Website
                </span>
                <h3 className="text-xl font-bold font-display text-slate-900 mt-5 mb-2">
                  Sewa Mobil & Rental
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6">
                  Uji coba form canggih pemesanan unit rental mobil lepas kunci atau dengan supir, lengkap dengan fitur auto-kalkulator harga instan berbasis durasi sewa secara interaktif.
                </p>
              </div>
              <button 
                onClick={() => {
                  setActiveDemo('rental');
                  setSelectedCar(null);
                  setRentalSuccess(false);
                  setRenterName('');
                  setRentalDays(1);
                  setWithDriver(false);
                  setRentalDate('');
                }}
                className="w-full bg-slate-700 hover:bg-slate-800 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-sm active:scale-[0.98] inline-flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Coba Rental Page</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 7. Footer / CTA Section */}
      <section id="kontak" className="py-20 sm:py-28 bg-[#FAF9F5]/20 border-t border-slate-250 relative overflow-hidden scroll-mt-20">
        
        {/* Soft Metallic Ambient Background Design */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-slate-200/50 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse-subtle"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center space-y-8">
          
          <div className="inline-flex items-center space-x-2 bg-slate-200 border border-slate-300 text-slate-750 px-4.5 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide">
            <span className="w-2.5 h-2.5 bg-[#25D366] rounded-full animate-ping"></span>
            <span>Khusus Area Balikpapan & Sekitarnya</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-slate-900 font-display">
            Siap Mengubah Bisnismu <br className="hidden sm:inline" />
            Menjadi Jauh Lebih Modern?
          </h2>

          <p className="text-slate-500 text-sm sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Mulailah langkah digitalisasi bisnismu hari ini. Khusus untuk wirausaha di area Balikpapan dan sekitarnya, mari mengobrol santai untuk merumuskan kebutuhan digital terbaik bisnismu.
          </p>

          <div className="pt-4 space-y-4">
            <a 
              href={discussWaLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center justify-center space-x-3 bg-[#25D366] hover:bg-[#1ebd54] text-white active:scale-95 transition-all duration-200 px-10 py-5 rounded-2xl text-xl font-bold shadow-sm"
            >
              <Phone className="h-6 w-6 fill-current" />
              <span>💬 Diskusikan Ide Bisnismu</span>
            </a>
            <p className="text-xs text-slate-550">
              Sesi konsultasi awal 100% gratis, tidak ada paksaan untuk langsung bertransaksi.
            </p>
          </div>

        </div>
      </section>

      {/* Footer Bottom Block */}
      <footer className="w-full bg-[#0F172A] border-t border-[#1E293B] py-12 text-sm text-slate-400 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center sm:items-start gap-3">
            <a href="#" className="flex items-center space-x-3 group">
              <div className="bg-white px-2 py-0.5 rounded-xl shadow-sm hover:bg-slate-50 transition-colors">
                <img 
                  src="/logo.png" 
                  alt="MIMO DIGITAL Icon" 
                  className="h-7 sm:h-8 w-auto object-contain"
                />
              </div>
              <span className="text-base sm:text-lg font-bold tracking-wider text-white font-display group-hover:text-slate-200 transition-colors">
                MIMO DIGITAL
              </span>
            </a>
            <p className="text-xs text-slate-550">© 2026 [MIMO DIGITAL]. All rights reserved.</p>
          </div>
          <div className="flex flex-col items-center sm:items-end gap-2">
            <a 
              href="mailto:mimo.digial.bpp@gmail.com" 
              className="hover:text-white transition-colors duration-200 inline-flex items-center space-x-2 text-slate-300"
            >
              <Mail className="h-4 w-4 text-slate-400" />
              <span>mimo.digial.bpp@gmail.com</span>
            </a>
            <p className="text-xs text-slate-500">Balikpapan, Kalimantan Timur, Indonesia</p>
          </div>
        </div>
      </footer>

      {/* Floating Call-to-action Button for Mobile */}
      <a 
        href={mainWaLink} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="fixed bottom-6 right-6 z-30 bg-[#25D366] text-white p-4.5 rounded-full shadow-lg hover:bg-[#1ebd54] active:scale-90 transition-all duration-250 flex items-center justify-center"
        aria-label="Contact via WhatsApp"
      >
        <Phone className="h-6 w-6 fill-current" />
      </a>

      {/* ======================================================== */}
      {/* =============== INTERACTIVE DEMO MODALS ================ */}
      {/* ======================================================== */}

      {/* DEMO 1: CATALOGUE SIMULATOR MODAL */}
      {activeDemo === 'catalog' && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card rounded-[2rem] shadow-2xl max-w-lg w-full max-h-[85vh] flex flex-col overflow-hidden border border-white bg-[#F8FAFC]/98">
            
            {/* Modal Header */}
            <div className="bg-slate-100/50 border-b border-slate-200 p-6 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg font-display text-slate-900 inline-flex items-center space-x-2">
                  <ShoppingBag className="h-5 w-5 text-slate-750" />
                  <span>Katalog Mimo Store (Simulasi)</span>
                </h3>
                <p className="text-xs text-slate-550 mt-1">Sistem Katalog digital otomatis masuk WhatsApp Anda</p>
              </div>
              <button 
                onClick={() => setActiveDemo(null)}
                className="text-slate-400 hover:text-slate-900 p-2 rounded-xl hover:bg-slate-200/50 transition-all cursor-pointer animate-pulse-subtle"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-750">
              {catalogStep === 1 && (
                <div className="space-y-6">
                  {/* Shop Header banner */}
                  <div className="bg-slate-100 border border-slate-200/70 p-4 rounded-2xl flex items-center justify-between shadow-inner">
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Mimo Store Balikpapan</p>
                      <h4 className="font-bold text-slate-900 text-sm mt-0.5">Katalog Pakaian Premium</h4>
                    </div>
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-250 font-bold text-[10px] px-2.5 py-1 rounded-full uppercase">
                      Buka 🟢
                    </span>
                  </div>

                  {/* Size Selector Widget */}
                  <div className="space-y-2.5">
                    <label className="block text-xs font-extrabold text-slate-500 uppercase tracking-wider">Pilih Ukuran Kaos/Kemeja:</label>
                    <div className="flex space-x-2">
                      {['S', 'M', 'L', 'XL'].map(sz => (
                        <button 
                          key={sz}
                          onClick={() => setCatalogSize(sz)}
                          className={`w-10 h-10 rounded-xl font-bold text-sm transition-all duration-150 border cursor-pointer ${
                            catalogSize === sz 
                              ? 'bg-slate-700 border-slate-700 text-white shadow-md' 
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-350'
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Product List */}
                  <div className="space-y-3">
                    <p className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Daftar Produk Premium:</p>
                    {catalogProducts.map(prod => (
                      <div 
                        key={prod.id} 
                        className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm flex items-center justify-between hover:border-slate-350 transition-all group"
                      >
                        <div className="flex items-center space-x-4">
                          <span className="text-3xl bg-slate-50 w-12 h-12 rounded-xl flex items-center justify-center border border-slate-100">{prod.img}</span>
                          <div>
                            <h5 className="font-bold text-slate-900 text-sm group-hover:text-slate-800 transition-colors">{prod.name}</h5>
                            <p className="text-xs font-bold text-slate-650 mt-1">Rp {prod.price.toLocaleString('id-ID')}</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => addToCatalogCart(prod)}
                          className="bg-slate-700 hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 cursor-pointer active:scale-95 transition-all shadow-sm"
                        >
                          <Plus className="h-3.5 w-3.5" />
                          <span>Beli ({catalogSize})</span>
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Cart Summary Panel */}
                  {catalogCart.length > 0 ? (
                    <div className="border-t border-slate-200 pt-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-900 text-sm">Keranjang Belanja ({catalogCart.reduce((sum, i) => sum + i.qty, 0)})</span>
                        <button 
                          onClick={() => setCatalogCart([])}
                          className="text-xs text-red-500 hover:underline cursor-pointer font-semibold"
                        >
                          Kosongkan Keranjang
                        </button>
                      </div>

                      <div className="bg-slate-50 border border-slate-200 p-4.5 rounded-2xl space-y-3">
                        {catalogCart.map(item => (
                          <div key={`${item.id}-${item.size}`} className="flex justify-between items-center text-xs">
                            <span className="text-slate-700 font-medium">
                              {item.name} <span className="bg-white text-slate-600 border border-slate-200 px-2 py-0.5 rounded text-[10px] font-bold ml-1">{item.size}</span>
                            </span>
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1.5">
                                <button 
                                  onClick={() => updateCatalogQty(item.id, item.size, -1)}
                                  className="w-5.5 h-5.5 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-slate-550 hover:bg-slate-100 cursor-pointer"
                                >
                                  <Minus className="h-2.5 w-2.5" />
                                </button>
                                <span className="font-bold text-slate-800 w-4 text-center">{item.qty}</span>
                                <button 
                                  onClick={() => updateCatalogQty(item.id, item.size, 1)}
                                  className="w-5.5 h-5.5 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-slate-550 hover:bg-slate-100 cursor-pointer"
                                >
                                  <Plus className="h-2.5 w-2.5" />
                                </button>
                              </div>
                              <span className="font-bold text-slate-900 w-24 text-right font-mono">
                                Rp {(item.price * item.qty).toLocaleString('id-ID')}
                              </span>
                            </div>
                          </div>
                        ))}

                        <div className="border-t border-slate-200 pt-3.5 flex justify-between items-center font-bold text-sm text-slate-900 mt-2">
                          <span>Total Pembayaran:</span>
                          <span className="text-slate-850 text-base font-mono">Rp {getCatalogTotal().toLocaleString('id-ID')}</span>
                        </div>
                      </div>

                      <button 
                        onClick={() => setCatalogStep(2)}
                        className="w-full bg-[#25D366] hover:bg-[#1ebd54] text-white font-bold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 text-sm cursor-pointer"
                      >
                        <span>Lanjut ke Formulir Alamat</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-slate-450 text-xs bg-slate-50 border border-slate-200 border-dashed rounded-2xl">
                      Keranjang masih kosong. Pilih produk di atas.
                    </div>
                  )}
                </div>
              )}

              {catalogStep === 2 && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <h4 className="font-bold text-slate-950 text-sm">Lengkapi Data Pengiriman</h4>
                    <button onClick={() => setCatalogStep(1)} className="text-xs text-slate-700 font-semibold hover:underline cursor-pointer">
                      Kembali Belanja
                    </button>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="block text-slate-500 font-bold mb-1.5 uppercase tracking-wide">Nama Penerima:</label>
                      <input 
                        type="text" 
                        value={catalogCustomerName}
                        onChange={(e) => setCatalogCustomerName(e.target.value)}
                        placeholder="Contoh: Budi Santoso"
                        className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400 text-slate-900"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 font-bold mb-1.5 uppercase tracking-wide">Alamat Pengiriman Balikpapan:</label>
                      <textarea 
                        rows="3"
                        value={catalogCustomerAddr}
                        onChange={(e) => setCatalogCustomerAddr(e.target.value)}
                        placeholder="Contoh: Jl. Sudirman No. 12, Klandasan Ilir, Balikpapan Kota"
                        className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400 text-slate-900"
                        required
                      />
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      if (catalogCustomerName.trim() && catalogCustomerAddr.trim()) {
                        setCatalogStep(3);
                      } else {
                        alert('Harap isi Nama dan Alamat pengiriman terlebih dahulu!');
                      }
                    }}
                    className="w-full bg-[#25D366] hover:bg-[#1ebd54] text-white font-bold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 text-sm mt-6 cursor-pointer"
                  >
                    <Phone className="h-4 w-4 fill-current" />
                    <span>Kirim & Simulasi Pemesanan WA</span>
                  </button>
                </div>
              )}

              {catalogStep === 3 && (
                <div className="space-y-6">
                  <div className="text-center space-y-3 py-4">
                    <span className="w-14 h-14 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl animate-bounce">
                      🎉
                    </span>
                    <h4 className="font-extrabold text-slate-950 text-base">Berhasil Mensimulasikan Pemesanan!</h4>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                      Di sistem asli, tombol akan otomatis meluncurkan WhatsApp pelanggan Anda secara otomatis dengan isi format order rapi seperti berikut ini.
                    </p>
                  </div>

                  {/* Format Box Preview */}
                  <div className="bg-slate-950 text-emerald-400 p-5 rounded-2xl font-mono text-xs border border-slate-900 space-y-1 shadow-inner relative max-h-56 overflow-y-auto">
                    <span className="absolute top-2 right-3 text-[10px] uppercase font-bold text-slate-500">Hasil Format Chat</span>
                    <pre className="whitespace-pre-wrap leading-relaxed select-all">
                      {decodeURIComponent(getCatalogWaText())}
                    </pre>
                  </div>

                  <div className="flex gap-3">
                    <button 
                      onClick={() => setCatalogStep(1)} 
                      className="flex-1 bg-slate-100 border border-slate-200 text-slate-700 py-3.5 rounded-xl font-bold text-xs hover:bg-slate-200 cursor-pointer"
                    >
                      Belanja Lagi
                    </button>
                    <a 
                      href={`https://wa.me/${waNumber}?text=${getCatalogWaText()}`}
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex-1 bg-[#25D366] hover:bg-[#1ebd54] text-white py-3.5 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 cursor-pointer shadow-md"
                    >
                      <Phone className="h-4 w-4 fill-current" />
                      <span>Kirim ke WA Asli</span>
                    </a>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* DEMO 2: CASHIER / POS SIMULATOR MODAL */}
      {activeDemo === 'cashier' && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card rounded-[2rem] shadow-2xl max-w-4xl w-full h-[85vh] flex flex-col overflow-hidden border border-white bg-[#F8FAFC]/98">
            
            {/* Modal Header */}
            <div className="bg-slate-100/50 border-b border-slate-200 p-6 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg font-display text-slate-900 inline-flex items-center space-x-2">
                  <Calculator className="h-5 w-5 text-slate-750" />
                  <span>Aplikasi Kasir POS Cafe (Simulasi)</span>
                </h3>
                <p className="text-xs text-slate-550 mt-1">Sistem antarmuka manajemen penjualan cafe responsif HP/Tablet</p>
              </div>
              <button 
                onClick={() => setActiveDemo(null)}
                className="text-slate-400 hover:text-slate-900 p-2 rounded-xl hover:bg-slate-200/50 transition-all cursor-pointer"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-hidden relative bg-[#F1F5F9] flex text-slate-700">
              
              {/* Login State */}
              {!isCashierLoggedIn ? (
                <div className="w-full flex items-center justify-center p-6">
                  <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-soft max-w-md w-full space-y-6">
                    <div className="text-center space-y-2">
                      <div className="w-12 h-12 bg-slate-100 text-slate-700 border border-slate-200 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
                        <Lock className="h-6 w-6" />
                      </div>
                      <h4 className="font-extrabold text-slate-900 text-lg font-display">Akses Masuk Kasir</h4>
                      <p className="text-xs text-slate-500">
                        Gunakan data kredensial simulasi di bawah
                      </p>
                    </div>

                    {/* Instruction Box */}
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-center text-slate-650">
                      User: <span className="font-bold text-slate-700">kasir</span> | Pass: <span className="font-bold text-slate-700">123</span>
                    </div>

                    <form onSubmit={handleCashierLogin} className="space-y-4 text-xs">
                      <div>
                        <label className="block text-slate-550 font-bold mb-1.5">Username:</label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                            <User className="h-4 w-4" />
                          </span>
                          <input 
                            type="text"
                            value={cashierUser}
                            onChange={(e) => setCashierUser(e.target.value)}
                            placeholder="kasir"
                            className="w-full pl-10 p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400 text-slate-900"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-slate-550 font-bold mb-1.5">Password:</label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                            <Lock className="h-4 w-4" />
                          </span>
                          <input 
                            type="password"
                            value={cashierPass}
                            onChange={(e) => setCashierPass(e.target.value)}
                            placeholder="123"
                            className="w-full pl-10 p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400 text-slate-900"
                            required
                          />
                        </div>
                      </div>

                      {cashierError && (
                        <p className="text-red-500 text-center text-[11px] font-bold">{cashierError}</p>
                      )}

                      <button 
                        type="submit" 
                        className="w-full bg-slate-700 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl transition-all shadow-md cursor-pointer"
                      >
                        Masuk Sistem Kasir
                      </button>
                    </form>
                  </div>
                </div>
              ) : (
                // Logged In POS Dashboard
                <div className="w-full h-full flex flex-col md:flex-row overflow-hidden">
                  
                  {/* Left Side: Product Menu Grid */}
                  <div className="flex-1 p-6 overflow-y-auto space-y-6">
                    
                    <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                      <div>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Mimo Cafe Balikpapan</p>
                        <h4 className="font-extrabold text-slate-900 text-sm mt-0.5">Kasir Aktif: kasir_bpp</h4>
                      </div>
                      <button 
                        onClick={() => setIsCashierLoggedIn(false)}
                        className="text-xs text-red-500 hover:underline cursor-pointer font-bold"
                      >
                        Keluar
                      </button>
                    </div>

                    <div className="space-y-4">
                      <p className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Daftar Menu Tersedia:</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {cashierMenu.map(menuItem => (
                          <button 
                            key={menuItem.id}
                            onClick={() => addToCashierCart(menuItem)}
                            className="bg-white border border-slate-200 hover:border-slate-400 p-4 rounded-2xl text-left hover:bg-slate-50 transition-all duration-200 group flex flex-col justify-between shadow-sm cursor-pointer"
                          >
                            <span className="text-[9px] font-extrabold text-slate-650 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full uppercase self-start mb-3">
                              {menuItem.category}
                            </span>
                            <h5 className="font-bold text-slate-900 text-sm leading-tight mb-2 group-hover:text-slate-800 transition-colors">
                              {menuItem.name}
                            </h5>
                            <p className="text-xs font-bold text-slate-800 mt-2 font-mono">
                              Rp {menuItem.price.toLocaleString('id-ID')}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Billing Ticket */}
                  <div className="w-full md:w-80 bg-slate-50/80 border-t md:border-t-0 md:border-l border-slate-200 p-6 flex flex-col justify-between overflow-y-auto">
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm mb-4 pb-2 border-b border-slate-200/60 flex items-center space-x-2 font-display">
                        <Receipt className="h-4 w-4 text-slate-550" />
                        <span>Checkout Pesanan</span>
                      </h4>

                      {cashierCart.length > 0 ? (
                        <div className="space-y-5">
                          <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                            {cashierCart.map(cItem => (
                              <div key={cItem.id} className="flex justify-between items-center text-xs">
                                <div className="space-y-0.5">
                                  <p className="font-bold text-slate-900 leading-tight">{cItem.name}</p>
                                  <p className="text-slate-400 font-semibold font-mono text-[10px]">@ Rp {cItem.price.toLocaleString('id-ID')}</p>
                                </div>
                                <div className="flex items-center space-x-2.5">
                                  <button 
                                    onClick={() => updateCashierQty(cItem.id, -1)}
                                    className="w-5.5 h-5.5 bg-white border border-slate-200 rounded-lg flex items-center justify-center hover:bg-slate-100 text-slate-655 cursor-pointer"
                                  >
                                    <Minus className="h-3 w-3" />
                                  </button>
                                  <span className="font-bold text-slate-800 w-4 text-center">{cItem.qty}</span>
                                  <button 
                                    onClick={() => updateCashierQty(cItem.id, 1)}
                                    className="w-5.5 h-5.5 bg-white border border-slate-200 rounded-lg flex items-center justify-center hover:bg-slate-100 text-slate-655 cursor-pointer"
                                  >
                                    <Plus className="h-3 w-3" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="border-t border-slate-200 pt-4 space-y-2 text-xs">
                            <div className="flex justify-between text-slate-500">
                              <span>Subtotal:</span>
                              <span className="font-mono">Rp {getCashierSubtotal().toLocaleString('id-ID')}</span>
                            </div>
                            <div className="flex justify-between text-slate-500">
                              <span>PB1 Pajak (10%):</span>
                              <span className="font-mono">Rp {(getCashierSubtotal() * 0.1).toLocaleString('id-ID')}</span>
                            </div>
                            <div className="flex justify-between font-extrabold text-slate-900 text-sm pt-2.5 border-t border-slate-200">
                              <span>Grand Total:</span>
                              <span className="text-slate-800 font-mono">Rp {(getCashierSubtotal() * 1.1).toLocaleString('id-ID')}</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-16 text-slate-400 text-xs bg-white border border-slate-200 border-dashed rounded-2xl px-4 shadow-sm">
                          Pilih item menu di sisi kiri untuk memulai transaksi.
                        </div>
                      )}
                    </div>

                    {cashierCart.length > 0 && (
                      <button 
                        onClick={handleCashierCheckout}
                        className="w-full bg-slate-700 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl transition-all shadow-sm mt-6 flex items-center justify-center space-x-2 text-sm cursor-pointer hover:shadow-md"
                      >
                        <Receipt className="h-4 w-4" />
                        <span>Bayar & Cetak Struk</span>
                      </button>
                    )}

                  </div>

                  {/* Thermal Receipt Print Popup overlay */}
                  {showReceipt && (
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-35 flex items-center justify-center p-4">
                      <div className="bg-white w-full max-w-sm rounded-[2rem] p-6 shadow-2xl flex flex-col justify-between border border-slate-200 max-h-[90vh]">
                        
                        {/* Scroll container for physical receipt */}
                        <div className="overflow-y-auto flex-1 pr-1 scrollbar-thin">
                          {/* Physical Receipt Mockup */}
                          <div className="bg-white border-2 border-slate-300 border-dashed p-5 rounded-xl font-mono text-xs text-slate-800 space-y-4 shadow-sm">
                            <div className="text-center space-y-0.5">
                              <h5 className="font-bold text-sm tracking-wider uppercase text-black">MIMO CAFE</h5>
                              <p className="text-[10px] text-slate-500">Jl. Jenderal Sudirman, Balikpapan</p>
                              <p className="text-[10px] text-slate-500">Telp: 0851-8305-0120</p>
                            </div>

                            <div className="border-t border-slate-350 border-dashed pt-3 space-y-1 text-[10px] text-slate-500">
                              <p>No: {receiptNumber}</p>
                              <p>Tanggal: {new Date().toLocaleDateString('id-ID')} {new Date().toLocaleTimeString('id-ID')}</p>
                              <p>Kasir: kasir_bpp</p>
                            </div>

                            <div className="border-t border-slate-350 border-dashed pt-3 space-y-2.5">
                              {cashierCart.map(cItem => (
                                <div key={cItem.id} className="flex justify-between items-start text-[11px]">
                                  <div className="max-w-[200px]">
                                    <p className="font-bold text-slate-900">{cItem.name}</p>
                                    <p className="text-slate-500 text-[10px]">{cItem.qty}x @ Rp {cItem.price.toLocaleString('id-ID')}</p>
                                  </div>
                                  <span className="font-bold text-slate-900">
                                    Rp {(cItem.price * cItem.qty).toLocaleString('id-ID')}
                                  </span>
                                </div>
                              ))}
                            </div>

                            <div className="border-t border-slate-350 border-dashed pt-3 space-y-1 text-[11px] text-slate-700">
                              <div className="flex justify-between">
                                <span>Subtotal:</span>
                                <span>Rp {getCashierSubtotal().toLocaleString('id-ID')}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Pajak (10%):</span>
                                <span>Rp {(getCashierSubtotal() * 0.1).toLocaleString('id-ID')}</span>
                              </div>
                              <div className="flex justify-between font-bold text-slate-900 border-t border-slate-200 pt-2 text-xs">
                                <span>TOTAL AKHIR:</span>
                                <span>Rp {(getCashierSubtotal() * 1.1).toLocaleString('id-ID')}</span>
                              </div>
                            </div>

                            <div className="border-t border-slate-355 border-dashed pt-4.5 text-center text-[10px] text-slate-500">
                              <p className="font-bold uppercase tracking-wider text-black">TERIMA KASIH</p>
                              <p>Atas Kunjungan Anda</p>
                              <p className="mt-2 text-[9px] italic text-primary-600 font-semibold">Simulasi Sistem Kasir MIMO DIGITAL</p>
                            </div>
                          </div>
                        </div>

                        <button 
                          onClick={resetCashierDemo}
                          className="w-full bg-slate-700 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl transition-all shadow-md mt-6 text-xs uppercase tracking-wider cursor-pointer"
                        >
                          Transaksi Baru & Cetak Struk
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              )}

            </div>

          </div>
        </div>
      )}

      {/* DEMO 3: RENTAL BOOKING SIMULATOR MODAL */}
      {activeDemo === 'rental' && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card rounded-[2rem] shadow-2xl max-w-lg w-full max-h-[85vh] flex flex-col overflow-hidden border border-white bg-[#F8FAFC]/98 text-slate-700">
            
            {/* Modal Header */}
            <div className="bg-slate-100/50 border-b border-slate-200 p-6 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg font-display text-slate-900 inline-flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-slate-700" />
                  <span>Rental Mobil (Simulasi Booking)</span>
                </h3>
                <p className="text-xs text-slate-550 mt-1">Landing page auto-kalkulasi & kirim reservasi otomatis ke WA</p>
              </div>
              <button 
                onClick={() => setActiveDemo(null)}
                className="text-slate-400 hover:text-slate-900 p-2 rounded-xl hover:bg-slate-200/50 transition-all cursor-pointer"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {!rentalSuccess ? (
                <div className="space-y-6 text-xs">
                  
                  {/* Banner Info */}
                  <div className="bg-slate-100 border border-slate-200 p-4 rounded-2xl space-y-1 shadow-inner">
                    <p className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">Mimo Trans Balikpapan</p>
                    <h4 className="font-extrabold text-slate-900 text-sm">Formulir Sewa Unit Armada</h4>
                  </div>

                  {/* Car List Selection */}
                  <div className="space-y-3">
                    <label className="block text-slate-500 font-extrabold uppercase tracking-wider">1. Pilih Unit Mobil:</label>
                    <div className="grid grid-cols-1 gap-3">
                      {rentalCars.map(car => (
                        <button 
                          key={car.id}
                          onClick={() => setSelectedCar(car)}
                          className={`p-4 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between cursor-pointer ${
                            selectedCar?.id === car.id
                              ? 'bg-slate-100 border-slate-400 shadow-sm ring-2 ring-slate-300'
                              : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center space-x-4">
                            <span className="text-2.5xl bg-slate-50 w-11 h-11 rounded-xl flex items-center justify-center border border-slate-100">{car.img}</span>
                            <div>
                              <p className="font-extrabold text-slate-900 text-sm">{car.name}</p>
                              <p className="text-slate-500 font-mono mt-0.5">Rp {car.price.toLocaleString('id-ID')} / Hari</p>
                            </div>
                          </div>
                          {selectedCar?.id === car.id ? (
                            <span className="w-5 h-5 bg-slate-700 rounded-full flex items-center justify-center text-white">
                              <Check className="h-3 w-3 stroke-[3px]" />
                            </span>
                          ) : (
                            <span className="w-5 h-5 border border-slate-350 rounded-full"></span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Form fields */}
                  {selectedCar && (
                    <div className="bg-[#FAF9F5]/40 border border-slate-200 p-5 rounded-2xl space-y-4 shadow-inner">
                      <p className="font-extrabold text-slate-800 uppercase tracking-wide">2. Detail Sewa & Pelanggan:</p>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-slate-500 font-bold mb-1.5">Nama Penyewa:</label>
                          <input 
                            type="text"
                            value={renterName}
                            onChange={(e) => setRenterName(e.target.value)}
                            placeholder="Contoh: Andi"
                            className="w-full p-3 bg-white border border-slate-250 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400 text-slate-900 text-xs"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-slate-500 font-bold mb-1.5">Mulai Sewa:</label>
                          <input 
                            type="date"
                            value={rentalDate}
                            onChange={(e) => setRentalDate(e.target.value)}
                            className="w-full p-3 bg-white border border-slate-250 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400 text-slate-900 text-xs"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-slate-500 font-bold mb-1.5">Durasi (Hari):</label>
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => setRentalDays(Math.max(1, rentalDays - 1))}
                              className="w-9 h-9 bg-white border border-slate-200 rounded-lg flex items-center justify-center hover:bg-slate-50 font-bold text-slate-700 cursor-pointer"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="font-extrabold text-slate-900 text-sm w-8 text-center">{rentalDays}</span>
                            <button 
                              onClick={() => setRentalDays(rentalDays + 1)}
                              className="w-9 h-9 bg-white border border-slate-200 rounded-lg flex items-center justify-center hover:bg-slate-50 font-bold text-slate-700 cursor-pointer"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-slate-500 font-bold mb-1.5">Metode Layanan:</label>
                          <button 
                            onClick={() => setWithDriver(!withDriver)}
                            className={`w-full py-2 px-3 border rounded-xl font-bold text-center transition-all cursor-pointer text-[11px] ${
                              withDriver 
                                ? 'bg-slate-700 border-slate-700 text-white shadow-sm' 
                                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            {withDriver ? 'Dengan Supir ✅' : 'Lepas Kunci 🔑'}
                          </button>
                        </div>
                      </div>

                      {/* Real time Price calculation */}
                      <div className="border-t border-slate-200 pt-4 flex justify-between items-center text-sm font-extrabold text-slate-900 mt-2">
                        <span>Total Rental:</span>
                        <span className="text-slate-800 text-base font-mono">Rp {getRentalTotal().toLocaleString('id-ID')}</span>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  {selectedCar && (
                    <button 
                      onClick={() => {
                        if (renterName.trim() && rentalDate) {
                          setRentalSuccess(true);
                        } else {
                          alert('Harap lengkapi Nama Pemesan dan Tanggal Sewa!');
                        }
                      }}
                      className="w-full bg-[#25D366] hover:bg-[#1ebd54] text-white font-bold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 text-sm cursor-pointer"
                    >
                      <Phone className="h-4 w-4 fill-current" />
                      <span>Simulasikan Booking via WA</span>
                    </button>
                  )}

                </div>
              ) : (
                <div className="space-y-6">
                  
                  <div className="text-center space-y-3 py-4">
                    <span className="w-14 h-14 bg-slate-100 border border-slate-200 text-slate-650 rounded-full flex items-center justify-center mx-auto text-2xl animate-bounce">
                      🚙
                    </span>
                    <h4 className="font-extrabold text-slate-950 text-base">Format Simulasi Booking Sukses!</h4>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                      Format pesan otomatis di bawah ini akan terisi di chat pelanggan sewa mobil Anda untuk segera dikirimkan ke nomor WhatsApp admin sewa mobil.
                    </p>
                  </div>

                  {/* WA Format Chat Box */}
                  <div className="bg-slate-950 text-emerald-400 p-5 rounded-2xl font-mono text-xs border border-slate-900 space-y-1 shadow-inner relative max-h-56 overflow-y-auto">
                    <span className="absolute top-2 right-3 text-[10px] uppercase font-bold text-slate-500">Hasil Format Chat</span>
                    <pre className="whitespace-pre-wrap leading-relaxed select-all">
                      {decodeURIComponent(getRentalWaText())}
                    </pre>
                  </div>

                  <div className="flex gap-3">
                    <button 
                      onClick={() => setRentalSuccess(false)} 
                      className="flex-1 bg-slate-50 border border-slate-200 text-slate-700 py-3.5 rounded-xl font-bold text-xs hover:bg-slate-100 cursor-pointer"
                    >
                      Ubah Reservasi
                    </button>
                    <a 
                      href={`https://wa.me/${waNumber}?text=${getRentalWaText()}`}
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex-1 bg-[#25D366] hover:bg-[#1ebd54] text-white py-3.5 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 cursor-pointer shadow-md"
                    >
                      <Phone className="h-4 w-4 fill-current" />
                      <span>Kirim ke WA Asli</span>
                    </a>
                  </div>

                </div>
              )}

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default App;
