// ============================================================
// Navbar - Professional Glass Navigation Bar
// ============================================================
import { Link, useLocation } from 'react-router-dom';
import {
  Menu, X, User, Headphones, Search, Bell, Sparkles,
  ChevronDown, Play, Crown, LayoutDashboard
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';

const navLinks = [
  { label: 'Início', path: '/', icon: Sparkles },
  { label: 'Catálogo', path: '/catalogo', icon: Play },
  { label: 'Narradores', path: '/narradores', icon: Headphones },
  { label: 'News', path: '/news', icon: Search },
];

export default function Navbar() {
  const location = useLocation();
  const { user, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const isAuthPage = location.pathname.startsWith('/auth');
  if (isAuthPage) return null;

  // Track scroll for navbar style change
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Focus search input when shown
  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setShowSearch(false);
    setSearchQuery('');
  }, [location.pathname]);

  // Close mobile menu on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setShowSearch(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const displayName = user?.name?.split(' ')[0] || 'Perfil';
  const userPlan = user?.plan || 'free';

  return (
    <>
      {/* CSS Animations */}
      <style>{`
        @keyframes slide-down {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes mobile-slide-in {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-slide-down { animation: slide-down 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-mobile-slide-in { animation: mobile-slide-in 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
      `}</style>

      {/* Desktop Navbar */}
      <nav className={`hidden md:flex fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-2 bg-bg/90 backdrop-blur-2xl shadow-lg shadow-black/10 border-b border-border/30'
          : 'py-4 bg-transparent backdrop-blur-xl border-b border-transparent'
      }`}>
        <div className="flex items-center justify-between px-8 lg:px-12 w-full max-w-screen-2xl mx-auto">
          {/* Logo */}
          <Link
            to="/"
            className="group flex items-center gap-3 flex-shrink-0"
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${
              scrolled
                ? 'bg-accent/10 border border-accent/20'
                : 'bg-accent/5 border border-accent/10'
            } group-hover:bg-accent/20 group-hover:border-accent/30`}>
              <Headphones className="w-5 h-5 text-accent group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-lg font-bold tracking-wider text-text-primary">
              NEON<span className="text-accent">CAST</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              const isHovered = hoveredLink === link.path;

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onMouseEnter={() => setHoveredLink(link.path)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-accent bg-accent/5'
                      : 'text-text-muted/70 hover:text-text-primary hover:bg-white/5'
                  }`}
                >
                  <link.icon className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-accent' : ''
                  }`} />
                  {link.label}

                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute -bottom-[1px] left-1/2 -translate-x-1/2 w-4 h-0.5 bg-accent rounded-full" />
                  )}

                  {/* Hover glow effect */}
                  {isHovered && !isActive && (
                    <div className="absolute inset-0 bg-white/5 rounded-xl transition-opacity" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Admin Dashboard Link */}
            {isAdmin && (
              <Link
                to="/admin"
                className="group flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-accent/80 hover:text-accent hover:bg-accent/5 transition-all border border-accent/10 hover:border-accent/20"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden lg:inline text-xs font-semibold">Admin</span>
              </Link>
            )}

            {/* Search Toggle */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                showSearch
                  ? 'bg-accent/10 text-accent border border-accent/20'
                  : 'text-text-muted/60 hover:text-text-primary hover:bg-white/5'
              }`}
            >
              <Search className="w-4 h-4" />
            </button>

         
            <div className="w-px h-6 bg-border/50 mx-1" />

            {/* Profile */}
            <Link
              to="/profile"
              className="group flex items-center gap-3 pl-3 pr-1 py-1 rounded-xl hover:bg-white/5 transition-all"
            >
              <div className="hidden lg:block text-right">
                <p className="text-sm font-medium text-text-primary leading-none">
                  {displayName}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  {userPlan === 'premium' && (
                    <Crown className="w-2.5 h-2.5 text-accent" />
                  )}
                  <span className="text-[10px] text-text-muted/50 leading-none">
                    {userPlan === 'premium' ? 'Premium' : userPlan === 'family' ? 'Família' : 'Grátis'}
                  </span>
                </div>
              </div>
              <div className="relative">
                <img
                  src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop&crop=face'}
                  alt={displayName}
                  className="w-8 h-8 rounded-lg object-cover ring-1 ring-white/10 group-hover:ring-accent/30 transition-all"
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-500 ring-2 ring-bg" />
              </div>
            </Link>
          </div>
        </div>
      </nav>

      {/* Search Bar (Desktop - Expandable) */}
      {showSearch && (
        <div className="hidden md:flex fixed top-[72px] left-0 right-0 z-40 px-8 lg:px-12 animate-fade-in">
          <div className="max-w-screen-2xl mx-auto w-full">
            <div className="bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl shadow-black/20 p-3">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted/50" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar séries, narradores, notícias..."
                  className="w-full pl-11 pr-4 py-3 bg-bg/50 border border-border rounded-xl text-text-primary placeholder:text-text-muted/40 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Navbar Header */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-bg/90 backdrop-blur-2xl border-b border-border/30">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
            <Headphones className="w-4 h-4 text-accent" />
          </div>
          <span className="text-base font-bold tracking-wider text-text-primary">
            NEON<span className="text-accent">CAST</span>
          </span>
        </Link>

        <div className="flex items-center gap-1">
          {/* Notifications */}
          <button className="relative w-9 h-9 rounded-xl flex items-center justify-center text-text-muted/60 hover:text-text-primary hover:bg-white/5 transition-all">
            <Bell className="w-4 h-4" />
            <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full ring-2 ring-bg" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
              mobileMenuOpen
                ? 'bg-accent/10 text-accent border border-accent/20'
                : 'text-text-muted/60 hover:text-text-primary hover:bg-white/5'
            }`}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 animate-fade-in">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Menu Panel */}
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-card/95 backdrop-blur-2xl border-l border-border/30 shadow-2xl shadow-black/30 animate-mobile-slide-in">
            {/* Menu Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border/30">
              <span className="text-sm font-semibold text-text-muted uppercase tracking-wider">Menu</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-text-muted/60 hover:text-white hover:bg-white/10 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* User Card */}
            <div className="px-5 py-4 border-b border-border/30">
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 group"
              >
                <div className="relative">
                  <img
                    src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop&crop=face'}
                    alt={displayName}
                    className="w-12 h-12 rounded-xl object-cover ring-2 ring-white/10"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 ring-2 ring-card" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-text-primary truncate">{displayName}</p>
                  <p className="text-xs text-text-muted/60 truncate">{user?.email || 'user@email.com'}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    {userPlan === 'premium' && <Crown className="w-3 h-3 text-accent" />}
                    <span className="text-[10px] text-text-muted/40">
                      {userPlan === 'premium' ? 'Premium' : userPlan === 'family' ? 'Família' : 'Grátis'}
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="py-3 px-2">
              {/* Admin Link (Mobile) */}
              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium bg-accent/10 text-accent border border-accent/10 mb-2"
                >
                  <LayoutDashboard className="w-5 h-5" />
                  Painel Admin
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-accent" />
                </Link>
              )}

              {navLinks.map((link, i) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-accent/10 text-accent'
                        : 'text-text-muted/70 hover:text-text-primary hover:bg-white/5'
                    }`}
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    <link.icon className={`w-5 h-5 ${isActive ? 'text-accent' : ''}`} />
                    {link.label}
                    {isActive && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-accent" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="absolute bottom-0 left-0 right-0 px-5 py-4 border-t border-border/30 bg-card/95">
              <Link
                to="/subscription"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-accent to-pink-500 text-white text-sm font-semibold shadow-lg shadow-accent/20"
              >
                <Crown className="w-4 h-4" />
                Fazer Upgrade
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
