// ============================================================
// Catalog Page - Browse all series with filters (Ultra Premium Design)
// ============================================================
import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, X, Sparkles, TrendingUp, Headphones, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, BookOpen, Music, Crown, Zap } from 'lucide-react';
import { series, type Series } from '../data/data';
import SeriesCard from '../components/SeriesCard';
import { useFavorites } from '../hooks/useFavorites';

const ITEMS_PER_PAGE = 8;

const GENRES = [
  { label: 'Ficção Científica', count: 0, color: 'from-cyan-500 to-blue-500' },
  { label: 'Thriller', count: 0, color: 'from-red-500 to-orange-500' },
  { label: 'Mistério', count: 0, color: 'from-purple-500 to-pink-500' },
  { label: 'Pós-Apocalíptico', count: 0, color: 'from-amber-500 to-yellow-500' },
  { label: 'Tech Thriller', count: 0, color: 'from-emerald-500 to-green-500' },
  { label: 'Drama', count: 0, color: 'from-rose-500 to-pink-500' },
  { label: 'Terror', count: 0, color: 'from-gray-500 to-slate-500' },
  { label: 'Fantasia', count: 0, color: 'from-indigo-500 to-violet-500' },
].map((g) => ({ ...g, count: series.filter((s) => s.genre === g.label).length }));

const FEATURED_SERIES = ['series-1', 'series-2', 'series-5'];

export default function Catalogo() {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'free' | 'paid'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { toggleFavorite, isFavorite } = useFavorites();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredSeries = useMemo(() => {
    return series.filter((s) => {
      if (selectedGenre && s.genre !== selectedGenre) return false;
      if (filterType === 'free' && !s.isFree) return false;
      if (filterType === 'paid' && s.isFree) return false;
      if (searchQuery && !s.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [selectedGenre, filterType, searchQuery]);

  const hasActiveFilters = selectedGenre || filterType !== 'all' || searchQuery;

  const clearFilters = () => {
    setSelectedGenre(null);
    setFilterType('all');
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handleFilterChange = (fn: () => void) => {
    fn();
    setCurrentPage(1);
  };

  // Pagination
  const totalPages = Math.ceil(filteredSeries.length / ITEMS_PER_PAGE);
  const paginatedSeries = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredSeries.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredSeries, currentPage]);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    const pages: (number | '...')[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  const totalDuration = series.reduce(
    (acc, s) => acc + s.seasons.reduce((a, season) =>
      a + season.episodes.reduce((epAcc, ep) => epAcc + ep.duration, 0), 0),
    0
  );

  const formatHours = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}min` : `${minutes}min`;
  };

  return (
    <div className="min-h-screen bg-bg">
      {/* Premium CSS */}
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-soft {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        .animate-fade-in-up { animation: fade-in-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .animate-scale-in { animation: scale-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .animate-slide-left { animation: slide-in-left 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .animate-gradient { background-size: 200% auto; animation: gradient-shift 4s linear infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-pulse-soft { animation: pulse-soft 3s ease-in-out infinite; }
        
        .glass-card {
          background: linear-gradient(135deg, rgba(30, 30, 30, 0.6), rgba(20, 20, 20, 0.4));
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.06);
        }
        
        .text-gradient {
          background: linear-gradient(135deg, #ff00aa, #ff66b2, #aa00ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* ==================== HERO SECTION ==================== */}
      <div className="relative overflow-hidden border-b border-border/50">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-purple-500/5 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/8 via-transparent to-transparent" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass-card mb-8 animate-fade-in-up shadow-lg shadow-black/20">
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <div className="absolute inset-0 w-2 h-2 rounded-full bg-accent animate-ping opacity-50" />
            </div>
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span className="text-xs font-semibold tracking-wide text-text-secondary">
              Explore o Catálogo Completo
            </span>
          </div>

          {/* Title */}
          <div className="mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="relative inline-block">
              <div className="absolute -inset-4 bg-accent/10 rounded-2xl blur-xl pointer-events-none" />
              <h1 className="relative text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-text-primary mb-3">
                Descubra sua próxima
                <br />
                <span className="text-gradient animate-gradient">
                  {' '}história favorita
                </span>
              </h1>
            </div>
            <p className="text-base sm:text-lg text-text-muted/70 max-w-2xl leading-relaxed">
              {series.length} séries originais em áudio. Histórias imersivas que vivem na sua imaginação.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {[
              { label: 'Séries Grátis', value: series.filter(s => s.isFree).length, icon: Zap, accent: 'text-green-400', bg: 'bg-green-400/5', border: 'border-green-400/10' },
              { label: 'Premium', value: series.filter(s => !s.isFree).length, icon: Crown, accent: 'text-amber-400', bg: 'bg-amber-400/5', border: 'border-amber-400/10' },
              { label: 'Gêneros', value: GENRES.length, icon: BookOpen, accent: 'text-purple-400', bg: 'bg-purple-400/5', border: 'border-purple-400/10' },
              { label: 'Horas de Áudio', value: formatHours(totalDuration), icon: Music, accent: 'text-blue-400', bg: 'bg-blue-400/5', border: 'border-blue-400/10' },
            ].map((stat, i) => (
              <div
                key={i}
                className={`group relative overflow-hidden p-4 ${stat.bg} backdrop-blur-sm border ${stat.border} rounded-xl hover:scale-105 transition-all duration-300`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <stat.icon className={`w-5 h-5 ${stat.accent} mb-2 group-hover:scale-110 transition-transform relative z-10`} />
                <p className="text-xl font-black text-text-primary mb-0.5 relative z-10">{stat.value}</p>
                <p className="text-[10px] font-medium text-text-muted/70 uppercase tracking-wider relative z-10">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* ==================== SEARCH & FILTERS ==================== */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-8">
          {/* Search Bar */}
          <div className="relative flex-1 w-full">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <Search className="w-4 h-4 text-text-muted/50" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar séries por título..."
              className="w-full pl-11 pr-10 py-3.5 text-sm glass-card placeholder:text-text-muted/40 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 text-text-primary transition-all rounded-xl"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center text-accent hover:bg-accent/20 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          
          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2.5 px-5 py-3.5 text-sm font-medium border rounded-xl transition-all ${
              showFilters || hasActiveFilters
                ? 'border-accent/50 bg-accent/10 text-accent shadow-lg shadow-accent/10'
                : 'glass-card text-text-secondary hover:text-text-primary hover:border-accent/30'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filtros</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            )}
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mb-8 p-6 glass-card rounded-2xl space-y-6 animate-scale-in">
            {/* Genre Chips */}
            <div>
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="w-1 h-4 bg-accent rounded-full" />
                Gênero
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleFilterChange(() => setSelectedGenre(null))}
                  className={`px-4 py-2 text-xs font-medium rounded-full transition-all ${
                    !selectedGenre
                      ? 'bg-accent text-white shadow-md shadow-accent/20'
                      : 'glass-card text-text-muted hover:text-text-primary hover:border-accent/30 border border-border'
                  }`}
                >
                  Todos
                </button>
                {GENRES.map((genre) => (
                  <button
                    key={genre.label}
                    onClick={() => handleFilterChange(() => setSelectedGenre(genre.label))}
                    className={`px-4 py-2 text-xs font-medium rounded-full transition-all flex items-center gap-2 ${
                      selectedGenre === genre.label
                        ? 'bg-accent text-white shadow-md shadow-accent/20'
                        : 'glass-card text-text-muted hover:text-text-primary border border-border'
                    }`}
                  >
                    {genre.label}
                    <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                      selectedGenre === genre.label ? 'bg-white/20' : 'bg-accent/10 text-accent'
                    }`}>
                      {genre.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Access Type */}
            <div>
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="w-1 h-4 bg-accent rounded-full" />
                Tipo de Acesso
              </p>
              <div className="flex gap-2">
                {([
                  { value: 'all' as const, label: 'Todos', icon: Headphones, color: 'text-text-secondary' },
                  { value: 'free' as const, label: 'Grátis', icon: Zap, color: 'text-green-400' },
                  { value: 'paid' as const, label: 'Premium', icon: Crown, color: 'text-amber-400' },
                ]).map((type) => (
                  <button
                    key={type.value}
                    onClick={() => handleFilterChange(() => setFilterType(type.value))}
                    className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl transition-all ${
                      filterType === type.value
                        ? 'bg-accent text-white shadow-md shadow-accent/20'
                        : 'glass-card text-text-muted hover:text-text-primary border border-border'
                    }`}
                  >
                    <type.icon className={`w-4 h-4 ${filterType === type.value ? 'text-white' : type.color}`} />
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear All */}
            {hasActiveFilters && (
              <div className="pt-4 border-t border-border/50">
                <button
                  onClick={clearFilters}
                  className="text-sm text-text-muted hover:text-accent transition-colors flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-accent/5"
                >
                  <X className="w-4 h-4" />
                  Limpar todos os filtros
                </button>
              </div>
            )}
          </div>
        )}

        {/* Active Filters Summary */}
        {hasActiveFilters && !showFilters && (
          <div className="flex items-center gap-2 mb-6 flex-wrap p-4 glass-card rounded-xl animate-fade-in-up">
            <span className="text-xs text-accent font-medium mr-2 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5" />
              Filtros ativos:
            </span>
            {selectedGenre && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-accent/15 text-accent rounded-full font-medium">
                {selectedGenre}
                <button onClick={() => setSelectedGenre(null)} className="hover:text-white transition-colors">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filterType !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-accent/15 text-accent rounded-full font-medium">
                {filterType === 'free' ? 'Grátis' : 'Premium'}
                <button onClick={() => setFilterType('all')} className="hover:text-white transition-colors">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-accent/15 text-accent rounded-full font-medium">
                &ldquo;{searchQuery}&rdquo;
                <button onClick={() => setSearchQuery('')} className="hover:text-white transition-colors">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <button
              onClick={clearFilters}
              className="text-xs text-text-muted hover:text-accent transition-colors ml-1 px-2 py-1.5 hover:bg-accent/5 rounded"
            >
              Limpar tudo
            </button>
          </div>
        )}

        {/* Results Count */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm text-text-muted/70">
            {filteredSeries.length === series.length
              ? `Todas as ${filteredSeries.length} séries`
              : `${filteredSeries.length} de ${series.length} séries`
            }
            {hasActiveFilters && ' encontradas'}
          </p>
        </div>

        {/* ==================== SERIES GRID ==================== */}
        {filteredSeries.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
              {paginatedSeries.map((s, index) => (
                <Link
                  key={s.id}
                  to={`/catalogo/${s.id}`}
                  className="cursor-pointer group animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <SeriesCard
                    series={s}
                    isFavorite={isFavorite(s.id)}
                    onToggleFavorite={() => toggleFavorite(s.id)}
                  />
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col items-center gap-4 mt-16 pt-8 border-t border-border/50">
                <p className="text-xs text-text-muted/60">
                  Mostrando {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filteredSeries.length)} de {filteredSeries.length} séries
                </p>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => goToPage(1)}
                    disabled={currentPage === 1}
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-text-muted/40 hover:text-text-primary hover:bg-card/50 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronsLeft className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-text-muted/40 hover:text-text-primary hover:bg-card/50 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-1">
                    {getPageNumbers().map((page, i) =>
                      page === '...' ? (
                        <span key={`ellipsis-${i}`} className="w-10 h-10 flex items-center justify-center text-text-muted/30 text-sm">
                          …
                        </span>
                      ) : (
                        <button
                          key={page}
                          onClick={() => goToPage(page as number)}
                          className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-medium transition-all ${
                            currentPage === page
                              ? 'bg-accent text-white shadow-md shadow-accent/20'
                              : 'text-text-muted/60 hover:text-text-primary hover:bg-card/50'
                          }`}
                        >
                          {page}
                        </button>
                      )
                    )}
                  </div>

                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-text-muted/40 hover:text-text-primary hover:bg-card/50 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => goToPage(totalPages)}
                    disabled={currentPage === totalPages}
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-text-muted/40 hover:text-text-primary hover:bg-card/50 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronsRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          /* Empty State */
          <div className="text-center py-32 animate-fade-in-up">
            <div className="relative inline-block mb-8">
              <div className="absolute -inset-4 bg-accent/10 rounded-3xl blur-2xl" />
              <div className="relative w-24 h-24 rounded-3xl glass-card flex items-center justify-center">
                <Search className="w-12 h-12 text-accent/40" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-text-primary mb-2">Nenhuma série encontrada</h3>
            <p className="text-text-muted/60 text-sm mb-8 max-w-sm mx-auto">
              Tente ajustar seus filtros para encontrar mais conteúdo disponível
            </p>
            <button
              onClick={clearFilters}
              className="px-8 py-3 text-sm font-medium bg-accent/10 text-accent rounded-xl hover:bg-accent/20 transition-all border border-accent/20"
            >
              Limpar todos os filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
