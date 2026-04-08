import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  Plus,
  Pencil,
  Trash2,
  BookOpen,
  Crown,
  Gift,
  Mic2,
  Film,
  TrendingUp,
  Sparkles,
  X,
  ChevronDown,
} from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import Pagination from '../../components/Pagination';
import { series, narrators, type Series, type Narrator } from '../../data/data';

const genreColors: Record<string, string> = {
  'Ficção Científica': 'from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-cyan-400',
  'Thriller': 'from-red-500/20 to-orange-500/20 border-red-500/30 text-red-400',
  'Mistério': 'from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-400',
  'Pós-Apocalíptico': 'from-amber-500/20 to-yellow-500/20 border-amber-500/30 text-amber-400',
  'Tech Thriller': 'from-emerald-500/20 to-green-500/20 border-emerald-500/30 text-emerald-400',
  'Drama': 'from-rose-500/20 to-pink-500/20 border-rose-500/30 text-rose-400',
  'Terror': 'from-gray-500/20 to-slate-500/20 border-gray-500/30 text-gray-300',
  'Fantasia': 'from-indigo-500/20 to-violet-500/20 border-indigo-500/30 text-indigo-400',
};

const genreBadgeColors: Record<string, string> = {
  'Ficção Científica': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  'Thriller': 'bg-red-500/10 text-red-400 border-red-500/20',
  'Mistério': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  'Pós-Apocalíptico': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'Tech Thriller': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'Drama': 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  'Terror': 'bg-gray-500/10 text-gray-300 border-gray-500/20',
  'Fantasia': 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
};

function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}min`;
  return `${m}min`;
}

export default function SeriesPage() {
  const [search, setSearch] = useState('');
  const [genreFilter, setGenreFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  const genres = useMemo(() => {
    const unique = [...new Set(series.map((s: Series) => s.genre))].sort();
    return unique;
  }, []);

  const filtered = useMemo(() => {
    return series.filter((s: Series) => {
      const matchSearch =
        search === '' ||
        s.title.toLowerCase().includes(search.toLowerCase()) ||
        s.description.toLowerCase().includes(search.toLowerCase()) ||
        s.genre.toLowerCase().includes(search.toLowerCase());
      const matchGenre = genreFilter === 'all' || s.genre === genreFilter;
      const matchType = typeFilter === 'all' || (typeFilter === 'free' && s.isFree) || (typeFilter === 'premium' && !s.isFree);
      return matchSearch && matchGenre && matchType;
    });
  }, [search, genreFilter, typeFilter]);

  const stats = useMemo(() => {
    const total = series.length;
    const freeCount = series.filter((s: Series) => s.isFree).length;
    const premiumCount = total - freeCount;
    const totalEpisodes = series.reduce((acc: number, s: Series) => acc + s.seasons.reduce((a: number, se) => a + se.episodes.length, 0), 0);
    const totalNarrators = narrators.length;
    const byGenre = genres.map((g: string) => ({
      genre: g,
      count: series.filter((s: Series) => s.genre === g).length,
    }));
    return { total, freeCount, premiumCount, totalEpisodes, totalNarrators, byGenre };
  }, [genres]);

  const getNarratorNames = (ids: string[]) => {
    return ids
      .map((id: string) => narrators.find((n: Narrator) => n.id === id)?.name)
      .filter(Boolean)
      .join(', ');
  };

  const getTotalEpisodes = (s: typeof series[0]) => {
    return s.seasons.reduce((acc, season) => acc + season.episodes.length, 0);
  };

  const getTotalDuration = (s: typeof series[0]) => {
    return s.seasons.reduce(
      (acc: number, season) => acc + season.episodes.reduce((a: number, ep) => a + ep.duration, 0),
      0
    );
  };

  const clearFilters = () => {
    setSearch('');
    setGenreFilter('all');
    setTypeFilter('all');
    setCurrentPage(1);
  };

  const hasActiveFilters = search !== '' || genreFilter !== 'all' || typeFilter !== 'all';

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedSeries = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-text-primary">
              Gerenciar Séries
            </h1>
            <p className="text-text-secondary mt-1">
              {stats.total} séries cadastradas no catálogo
            </p>
          </div>
          <Link
            to="/admin/series/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent/10 border border-accent/30 text-accent font-semibold text-sm hover:bg-accent/20 hover:border-accent/50 transition-all duration-300 backdrop-blur-sm group"
          >
            <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
            Adicionar Série
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total */}
          <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-5 group hover:border-accent/30 transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-all" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-accent" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">Total</span>
              </div>
              <p className="text-3xl font-bold text-text-primary">{stats.total}</p>
              <p className="text-xs text-text-muted mt-1">{stats.totalEpisodes} episódios no total</p>
            </div>
          </div>

          {/* Free */}
          <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-5 group hover:border-emerald-500/30 transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-all" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <Gift className="w-5 h-5 text-emerald-400" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">Gratuitas</span>
              </div>
              <p className="text-3xl font-bold text-emerald-400">{stats.freeCount}</p>
              <p className="text-xs text-text-muted mt-1">Acesso aberto</p>
            </div>
          </div>

          {/* Premium */}
          <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-5 group hover:border-amber-500/30 transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-all" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                  <Crown className="w-5 h-5 text-amber-400" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">Premium</span>
              </div>
              <p className="text-3xl font-bold text-amber-400">{stats.premiumCount}</p>
              <p className="text-xs text-text-muted mt-1">Exclusivo assinantes</p>
            </div>
          </div>

          {/* Narrators */}
          <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-5 group hover:border-purple-500/30 transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/10 transition-all" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                  <Mic2 className="w-5 h-5 text-purple-400" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">Narradores</span>
              </div>
              <p className="text-3xl font-bold text-purple-400">{stats.totalNarrators}</p>
              <p className="text-xs text-text-muted mt-1">Vozes ativas</p>
            </div>
          </div>
        </div>

        {/* Genre breakdown */}
        <div className="rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-text-muted" />
            <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider">Distribuição por Gênero</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {stats.byGenre.map((item) => (
              <button
                key={item.genre}
                onClick={() => setGenreFilter(genreFilter === item.genre ? 'all' : item.genre)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 cursor-pointer ${
                  genreFilter === item.genre
                    ? genreBadgeColors[item.genre] || 'bg-white/10 text-white border-white/20'
                    : 'bg-white/5 text-text-secondary border-white/10 hover:bg-white/10 hover:text-text-primary'
                }`}
              >
                <span>{item.genre}</span>
                <span className="text-xs opacity-60">{item.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Search & Filters */}
        <div className="rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                placeholder="Buscar séries por título, descrição ou gênero..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-bg/80 border border-border/50 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 ${
                showFilters || hasActiveFilters
                  ? 'bg-accent/10 border-accent/30 text-accent'
                  : 'bg-bg/80 border-border/50 text-text-secondary hover:text-text-primary hover:bg-white/5'
              }`}
            >
              <Filter className="w-4 h-4" />
              Filtros
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-accent" />
              )}
            </button>

            {/* Clear filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border/50 bg-bg/80 text-text-secondary text-sm font-medium hover:text-text-primary hover:bg-white/5 transition-all"
              >
                <X className="w-3.5 h-3.5" />
                Limpar
              </button>
            )}
          </div>

          {/* Expanded filters */}
          {showFilters && (
            <div className="mt-3 pt-3 border-t border-border/30 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-text-muted mb-1.5">Tipo</label>
                <div className="relative">
                  <select
                    value={typeFilter}
                    onChange={(e) => { setTypeFilter(e.target.value); setCurrentPage(1); }}
                    className="w-full appearance-none px-4 py-2.5 rounded-xl bg-bg/80 border border-border/50 text-text-primary text-sm focus:outline-none focus:border-accent/50 transition-all cursor-pointer"
                  >
                    <option value="all">Todos</option>
                    <option value="free">Gratuitos</option>
                    <option value="premium">Premium</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-text-muted mb-1.5">Gênero</label>
                <div className="relative">
                  <select
                    value={genreFilter}
                    onChange={(e) => { setGenreFilter(e.target.value); setCurrentPage(1); }}
                    className="w-full appearance-none px-4 py-2.5 rounded-xl bg-bg/80 border border-border/50 text-text-primary text-sm focus:outline-none focus:border-accent/50 transition-all cursor-pointer"
                  >
                    <option value="all">Todos os Gêneros</option>
                    {genres.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-text-secondary">
            {filtered.length === series.length ? (
              <>Mostrando <span className="text-text-primary font-medium">{filtered.length}</span> séries</>
            ) : (
              <>
                <span className="text-text-primary font-medium">{filtered.length}</span> de {series.length} séries encontradas
              </>
            )}
          </p>
          {hasActiveFilters && (
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span className="text-xs text-text-muted">Filtros ativos</span>
            </div>
          )}
        </div>

        {/* Series Table */}
        {filtered.length > 0 ? (
          <div className="rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm overflow-hidden">
            {/* Desktop Table Header */}
            <div className="hidden lg:grid lg:grid-cols-12 gap-4 px-5 py-3 border-b border-border/30 text-xs font-semibold uppercase tracking-wider text-text-muted">
              <div className="col-span-4">Série</div>
              <div className="col-span-2">Gênero</div>
              <div className="col-span-1 text-center">Ano</div>
              <div className="col-span-1 text-center">Tipo</div>
              <div className="col-span-1 text-center">Narradores</div>
              <div className="col-span-1 text-center">Episódios</div>
              <div className="col-span-2 text-right">Ações</div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-border/30">
              {paginatedSeries.map((s, index) => {
                const totalEps = getTotalEpisodes(s);
                const totalDur = getTotalDuration(s);
                const genreClass = genreColors[s.genre] || 'from-white/10 to-white/5 border-white/20 text-text-secondary';
                const badgeClass = genreBadgeColors[s.genre] || 'bg-white/10 text-text-secondary border-white/20';

                return (
                  <div
                    key={s.id}
                    className="group lg:grid lg:grid-cols-12 gap-4 px-5 py-4 hover:bg-white/[0.02] transition-all duration-200"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Series info */}
                    <div className="col-span-4 flex items-center gap-4 mb-3 lg:mb-0">
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border border-border/50 group-hover:border-accent/30 transition-all duration-300">
                        <img
                          src={s.cover}
                          alt={s.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <Link
                          to={`/admin/series/${s.id}`}
                          className="text-sm font-semibold text-text-primary hover:text-accent transition-colors truncate block"
                        >
                          {s.title}
                        </Link>
                        <p className="text-xs text-text-muted mt-0.5 line-clamp-1">{s.description}</p>
                        <div className="flex items-center gap-3 mt-1.5 text-[10px] text-text-muted/60">
                          <span className="flex items-center gap-1">
                            <Film className="w-3 h-3" />
                            {totalEps} eps
                          </span>
                          <span>{formatDuration(totalDur)}</span>
                          <span>{s.seasons.length} temporadas</span>
                        </div>
                      </div>
                    </div>

                    {/* Genre */}
                    <div className="col-span-2 flex items-center mb-3 lg:mb-0">
                      <span className={`inline-flex px-3 py-1 rounded-lg text-xs font-medium border bg-gradient-to-r ${genreClass}`}>
                        {s.genre}
                      </span>
                    </div>

                    {/* Year */}
                    <div className="col-span-1 flex items-center justify-center mb-3 lg:mb-0">
                      <span className="text-sm text-text-secondary">{s.year}</span>
                    </div>

                    {/* Type badge */}
                    <div className="col-span-1 flex items-center justify-center mb-3 lg:mb-0">
                      {s.isFree ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <Gift className="w-3 h-3" />
                          Free
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          <Crown className="w-3 h-3" />
                          Premium
                        </span>
                      )}
                    </div>

                    {/* Narrators */}
                    <div className="col-span-1 flex items-center justify-center mb-3 lg:mb-0">
                      <span className="text-xs text-text-secondary text-center">{s.narratorIds.length}</span>
                    </div>

                    {/* Episodes */}
                    <div className="col-span-1 flex items-center justify-center mb-3 lg:mb-0">
                      <span className="text-xs text-text-secondary">{totalEps}</span>
                    </div>

                    {/* Actions */}
                    <div className="col-span-2 flex items-center justify-end gap-2">
                      <Link
                        to={`/admin/series/${s.id}/edit`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 text-text-secondary hover:text-accent hover:bg-accent/10 border border-transparent hover:border-accent/20 transition-all duration-200"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        Editar
                      </Link>
                      <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 text-text-secondary hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all duration-200">
                        <Trash2 className="w-3.5 h-3.5" />
                        Excluir
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            <div className="px-5 pb-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalItems={filtered.length}
                itemsPerPage={ITEMS_PER_PAGE}
                label="séries"
              />
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm p-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-border/50 flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-text-muted" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              Nenhuma série encontrada
            </h3>
            <p className="text-text-secondary text-sm mb-6 max-w-md mx-auto">
              {hasActiveFilters
                ? 'Tente ajustar os filtros ou limpar a busca para ver mais resultados.'
                : 'Comece adicionando sua primeira série ao catálogo.'}
            </p>
            {hasActiveFilters ? (
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-border/50 text-text-secondary text-sm font-medium hover:text-text-primary hover:bg-white/10 transition-all"
              >
                <X className="w-4 h-4" />
                Limpar Filtros
              </button>
            ) : (
              <Link
                to="/admin/series/new"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent/10 border border-accent/30 text-accent font-semibold text-sm hover:bg-accent/20 transition-all"
              >
                <Plus className="w-4 h-4" />
                Adicionar Série
              </Link>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
