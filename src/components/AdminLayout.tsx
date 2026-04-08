import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Mic2,
  Newspaper,
  Settings,
  ArrowLeft,
  Menu,
  X,
  Headphones,
  LogOut,
  Crown,
  Users,
  BarChart3,
  Bell,
  Search,
  Zap,
  ChevronDown,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { label: 'Dashboard', path: '/admin', icon: LayoutDashboard, shortcut: 'D' },
  { label: 'Analytics', path: '/admin/analytics', icon: BarChart3, shortcut: 'A' },
  { label: 'Usuários', path: '/admin/users', icon: Users, shortcut: 'U' },
  { label: 'Séries', path: '/admin/series', icon: BookOpen, shortcut: 'S' },
  { label: 'Narradores', path: '/admin/narrators', icon: Mic2, shortcut: 'N' },
  { label: 'Notícias', path: '/admin/news', icon: Newspaper, shortcut: 'W' },
  { label: 'Configurações', path: '/admin/settings', icon: Settings, shortcut: 'C' },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setSearchQuery('');
        setUserDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  const activeItem = navItems.find((item) => isActive(item.path));
  const activeIndex = navItems.findIndex((item) => isActive(item.path));

  const searchResults = searchQuery
    ? navItems.filter((item) =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes active-indicator {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        .animate-fade-in { animation: fade-in 0.2s ease-out; }
        .animate-slide-down { animation: slide-down 0.2s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-slide-up { animation: slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-shimmer {
          background-size: 200% 100%;
          animation: shimmer 3s linear infinite;
        }
        .active-indicator {
          animation: active-indicator 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          transform-origin: left;
        }
      `}</style>

      <div className="min-h-screen bg-bg">
        {/* Mobile menu overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden animate-fade-in"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Search Overlay */}
        {searchOpen && (
          <div className="fixed inset-0 z-[60] flex items-start justify-center pt-32 px-4 animate-fade-in">
            <div className="fixed inset-0 bg-black/70 backdrop-blur-md" onClick={() => { setSearchOpen(false); setSearchQuery(''); }} />
            <div className="relative w-full max-w-lg bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden animate-slide-up">
              {/* Search Header */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-border/40">
                <Search className="w-5 h-5 text-accent/70" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar páginas, configurações..."
                  autoFocus
                  className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-muted/40 focus:outline-none"
                />
                <kbd className="hidden sm:inline-flex items-center px-2 py-1 rounded-md text-[10px] font-mono text-text-muted/50 bg-white/5 border border-border/40">ESC</kbd>
              </div>

              {/* Results */}
              <div className="max-h-72 overflow-y-auto p-2">
                {searchQuery ? (
                  searchResults.length > 0 ? (
                    <div className="space-y-0.5">
                      <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-text-muted/40">
                        {searchResults.length} resultado{searchResults.length !== 1 ? 's' : ''}
                      </p>
                      {searchResults.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                          className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-text-secondary hover:text-text-primary hover:bg-accent/5 transition-all group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                            <item.icon className="w-4 h-4 text-accent" />
                          </div>
                          <div>
                            <p className="font-medium">{item.label}</p>
                            <p className="text-[10px] text-text-muted/40">{item.path}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Search className="w-10 h-10 text-text-muted/20 mx-auto mb-3" />
                      <p className="text-text-muted/50 text-sm">Nenhum resultado para "{searchQuery}"</p>
                    </div>
                  )
                ) : (
                  <div className="space-y-0.5">
                    <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-text-muted/40">Navegação rápida</p>
                    {navItems.slice(0, 5).map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                        className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-text-secondary hover:text-text-primary hover:bg-accent/5 transition-all group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                          <item.icon className="w-4 h-4 text-text-muted/50 group-hover:text-accent transition-colors" />
                        </div>
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-2.5 border-t border-border/30 flex items-center justify-between text-[10px] text-text-muted/40">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded font-mono bg-white/5 border border-border/40">↑↓</kbd> navegar</span>
                  <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded font-mono bg-white/5 border border-border/40">↵</kbd> abrir</span>
                </div>
                <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded font-mono bg-white/5 border border-border/40">⌘K</kbd> command palette</span>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TOP NAVBAR ==================== */}
        <nav
          className={`sticky top-0 z-30 transition-all duration-300 ${
            scrolled
              ? 'border-b border-border/50 shadow-lg shadow-black/20'
              : 'border-b border-border/30'
          }`}
          style={{
            background: scrolled
              ? 'linear-gradient(180deg, rgba(25,25,25,0.99) 0%, rgba(18,18,18,0.98) 100%)'
              : 'linear-gradient(180deg, rgba(30,30,30,0.98) 0%, rgba(22,22,22,0.96) 100%)',
            backdropFilter: 'blur(24px)',
          }}
        >
          {/* Gradient accent line */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

          <div className="max-w-screen-2xl mx-auto">
            {/* Main Navbar Row */}
            <div className="flex items-center h-16 px-4 md:px-6 gap-3">
              {/* Logo */}
              <Link to="/admin" className="flex items-center gap-3 flex-shrink-0 group">
                <div className="relative w-9 h-9 transition-all duration-300 group-hover:scale-105">
                  {/* Outer glow */}
                  <div className="absolute -inset-1 bg-gradient-to-br from-accent to-pink-500 rounded-xl blur-sm opacity-40 group-hover:opacity-60 transition-opacity" />
                  {/* Icon container */}
                  <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-card to-card/90 border border-accent/30 flex items-center justify-center overflow-hidden">
                    {/* Inner gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
                    <Headphones className="w-4 h-4 text-accent relative z-10" />
                  </div>
                </div>
                <div className="hidden sm:block">
                  <span className="text-lg font-black tracking-wider text-text-primary">
                    NEON<span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-pink-400">CAST</span>
                  </span>
                  <div className="flex items-center gap-1.5 -mt-0.5">
                    <Sparkles className="w-2.5 h-2.5 text-accent/60" />
                    <span className="text-[8px] font-semibold uppercase tracking-widest text-text-muted/40">Painel Admin</span>
                  </div>
                </div>
              </Link>

              {/* Divider */}
              <div className="hidden lg:block w-px h-8 bg-gradient-to-b from-transparent via-border/40 to-transparent" />

              {/* Nav Items */}
              <div className="hidden lg:flex items-center gap-1 flex-1 min-w-0 overflow-x-auto scrollbar-hide">
                {navItems.map((item, index) => {
                  const active = isActive(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`group relative flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 whitespace-nowrap ${
                        active
                          ? 'text-accent'
                          : 'text-text-secondary/50 hover:text-text-primary'
                      }`}
                    >
                      {/* Active background */}
                      {active && (
                        <div className="absolute inset-0 bg-accent/10 rounded-xl active-indicator" />
                      )}

                      {/* Active top indicator */}
                      {active && (
                        <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-accent shadow-sm shadow-accent/50 active-indicator" />
                      )}

                      {/* Icon */}
                      <item.icon className={`w-3.5 h-3.5 flex-shrink-0 relative z-10 transition-colors ${
                        active ? 'text-accent' : 'text-text-muted/40 group-hover:text-text-secondary/70'
                      }`} />

                      {/* Label */}
                      <span className="relative z-10">{item.label}</span>

                      {/* Hover glow */}
                      {!active && (
                        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 bg-white/5 transition-opacity" />
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center text-text-muted/60 hover:text-text-primary hover:bg-white/5 transition-all ml-auto relative"
              >
                <div className={`absolute inset-0 rounded-xl bg-accent/10 transition-opacity ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`} />
                {mobileMenuOpen ? <X className="w-5 h-5 relative z-10" /> : <Menu className="w-5 h-5 relative z-10" />}
              </button>

              {/* Right Actions */}
              <div className="flex items-center gap-1.5 flex-shrink-0">
                {/* Search */}
                <button
                  onClick={() => setSearchOpen(true)}
                  className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-text-muted/50 hover:text-text-primary hover:bg-white/5 transition-all border border-border/30 hover:border-border/50"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Buscar...</span>
                  <kbd className="text-[9px] font-mono text-text-muted/30 bg-white/5 px-1.5 py-0.5 rounded-md border border-border/30">⌘K</kbd>
                </button>

                {/* Mobile search */}
                <button
                  onClick={() => setSearchOpen(true)}
                  className="sm:hidden w-9 h-9 rounded-xl flex items-center justify-center text-text-muted/50 hover:text-text-primary hover:bg-white/5 transition-all"
                >
                  <Search className="w-4 h-4" />
                </button>

                {/* Notifications */}
                <button className="relative w-9 h-9 rounded-xl flex items-center justify-center text-text-muted/50 hover:text-text-primary hover:bg-white/5 transition-all group">
                  <Bell className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent ring-2 ring-[#161616] shadow-sm shadow-accent/50" />
                </button>

                {/* Back to site */}
                <Link
                  to="/"
                  className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-text-muted/50 hover:text-text-primary hover:bg-white/5 transition-all border border-transparent hover:border-border/30"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Ver site</span>
                </Link>

                {/* Divider */}
                <div className="hidden sm:block w-px h-6 bg-gradient-to-b from-transparent via-border/40 to-transparent" />

                {/* User Dropdown */}
                <div ref={dropdownRef} className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className={`flex items-center gap-2 pl-1.5 pr-2.5 py-1.5 rounded-xl transition-all ${
                      userDropdownOpen ? 'bg-white/5' : 'hover:bg-white/5'
                    }`}
                  >
                    <div className="relative">
                      {/* Avatar glow */}
                      <div className="absolute -inset-0.5 bg-gradient-to-br from-accent/30 to-purple-500/30 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-accent/20 to-purple-500/20 border border-accent/30 flex items-center justify-center">
                        <Crown className="w-4 h-4 text-accent" />
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-500 ring-2 ring-[#161616]" />
                    </div>
                    <div className="hidden sm:block text-left">
                      <p className="text-xs font-bold text-text-primary leading-none">Admin</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Zap className="w-2.5 h-2.5 text-accent" />
                        <span className="text-[9px] text-text-muted/40">Super Admin</span>
                      </div>
                    </div>
                    <ChevronDown className={`w-3 h-3 text-text-muted/40 transition-transform duration-200 hidden sm:block ${userDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown */}
                  {userDropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setUserDropdownOpen(false)} />
                      <div className="absolute right-0 top-full mt-2 w-64 bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden animate-slide-down z-50">
                        {/* User Header */}
                        <div className="p-4 border-b border-border/30 bg-gradient-to-br from-accent/5 to-transparent">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-purple-500/20 border border-accent/30 flex items-center justify-center">
                                <Crown className="w-5 h-5 text-accent" />
                              </div>
                              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 ring-2 ring-card" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-text-primary">Administrador</p>
                              <p className="text-xs text-text-muted/50">admin@neoncast.com</p>
                            </div>
                          </div>
                        </div>

                        {/* Menu Items */}
                        <div className="p-2">
                          <Link
                            to="/admin/settings"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all"
                          >
                            <Settings className="w-4 h-4 text-text-muted/50" />
                            Configurações
                          </Link>
                          <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-red-400/70 hover:text-red-400 hover:bg-red-500/5 transition-all">
                            <LogOut className="w-4 h-4" />
                            Sair da conta
                          </button>
                        </div>

                        {/* Footer */}
                        <div className="px-4 py-2.5 border-t border-border/30 bg-white/[0.01]">
                          <Link
                            to="/"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2 text-xs text-text-muted/50 hover:text-accent transition-colors"
                          >
                            <ArrowLeft className="w-3 h-3" />
                            Voltar ao site principal
                          </Link>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="lg:hidden border-t border-border/30 animate-slide-up">
                <div className="p-3 space-y-0.5">
                  {navItems.map((item) => {
                    const active = isActive(item.path);
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                          active
                            ? 'bg-accent/10 text-accent'
                            : 'text-text-secondary/60 hover:text-text-primary hover:bg-white/5'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          active ? 'bg-accent/20' : 'bg-white/5'
                        }`}>
                          <item.icon className={`w-4 h-4 ${active ? 'text-accent' : 'text-text-muted/50'}`} />
                        </div>
                        <span>{item.label}</span>
                        {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-accent" />}
                      </Link>
                    );
                  })}

                  {/* Mobile Actions */}
                  <div className="pt-3 mt-3 border-t border-border/30 flex items-center gap-2">
                    <Link
                      to="/"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium text-text-muted/50 hover:text-text-primary hover:bg-white/5 transition-all border border-border/30"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Ver site
                    </Link>
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium text-red-400/70 hover:text-red-400 hover:bg-red-500/5 transition-all border border-red-500/20">
                      <LogOut className="w-3.5 h-3.5" />
                      Sair
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* ==================== CONTENT ==================== */}
        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>
    </>
  );
}
