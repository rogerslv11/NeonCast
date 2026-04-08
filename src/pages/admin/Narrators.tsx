import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Plus,
  Users,
  BookOpen,
  BarChart3,
  TrendingUp,
  Edit,
  Trash2,
  Mic2,
  ChevronDown,
  ChevronUp,
  Filter,
  ExternalLink,
  Eye,
} from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { narrators, series, type Narrator } from '../../data/data';

function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}min`;
  return `${m}min`;
}

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  subtitle?: string;
  gradient: string;
  borderColor: string;
}

function StatCard({ icon: Icon, label, value, subtitle, gradient, borderColor }: StatCardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border ${borderColor} bg-card/60 backdrop-blur-xl p-5 group hover:scale-[1.02] transition-all duration-300`}
    >
      <div className={`absolute -top-6 -right-6 w-20 h-20 rounded-full ${gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
      <div className="flex items-start justify-between relative">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-text-muted/70">{label}</p>
          <p className="text-3xl font-bold text-text-primary mt-2">{value}</p>
          {subtitle && (
            <p className="text-xs text-text-muted/60 mt-1.5">{subtitle}</p>
          )}
        </div>
        <div className={`w-11 h-11 rounded-xl ${gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
  );
}

export default function AdminNarratorsPage() {
  const [search, setSearch] = useState('');
  const [sortAsc, setSortAsc] = useState(true);

  const stats = useMemo(() => {
    const totalNarrators = narrators.length;
    const totalSeriesLinked = new Set(narrators.flatMap((n: Narrator) => n.seriesIds)).size;
    const seriesPerNarrator = narrators.map((n: Narrator) => n.seriesIds.length);
    const avgSeries = (seriesPerNarrator.reduce((a: number, b: number) => a + b, 0) / seriesPerNarrator.length).toFixed(1);

    let maxSeries = 0;
    let mostProlific = narrators[0];
    for (const n of narrators) {
      if (n.seriesIds.length > maxSeries) {
        maxSeries = n.seriesIds.length;
        mostProlific = n;
      }
    }

    return { totalNarrators, totalSeriesLinked, avgSeries, mostProlific, maxSeries };
  }, []);

  const filteredNarrators = useMemo(() => {
    const q = search.toLowerCase().trim();
    let result = narrators;
    if (q) {
      result = result.filter(
        (n: Narrator) =>
          n.name.toLowerCase().includes(q) ||
          n.bio.toLowerCase().includes(q)
      );
    }
    return result.sort((a: Narrator, b: Narrator) => {
      const cmp = a.name.localeCompare(b.name);
      return sortAsc ? cmp : -cmp;
    });
  }, [search, sortAsc]);

  const episodeCountForNarrator = (narratorId: string): number => {
    let count = 0;
    for (const s of series) {
      if (s.narratorIds.includes(narratorId)) {
        for (const season of s.seasons) {
          count += season.episodes.length;
        }
      }
    }
    return count;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-text-primary flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-purple-500/20 border border-accent/20 flex items-center justify-center">
                <Mic2 className="w-5 h-5 text-accent" />
              </div>
              Narradores
            </h1>
            <p className="text-text-muted/70 mt-1.5 ml-[52px]">
              Gerencie os narradores da plataforma NeonCast
            </p>
          </div>
          <Link
            to="/admin/narrators/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent/90 to-purple-500/90 text-white text-sm font-semibold hover:from-accent hover:to-purple-500 transition-all duration-300 shadow-lg shadow-accent/20 hover:shadow-accent/30 hover:scale-[1.03] active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            Adicionar Narrador
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={Users}
            label="Total de Narradores"
            value={stats.totalNarrators}
            subtitle="Cadastrados na plataforma"
            gradient="bg-gradient-to-br from-accent to-blue-500"
            borderColor="border-accent/20"
          />
          <StatCard
            icon={BookOpen}
            label="Séries Vinculadas"
            value={stats.totalSeriesLinked}
            subtitle="Séries com narradores ativos"
            gradient="bg-gradient-to-br from-green-400 to-emerald-600"
            borderColor="border-green-500/20"
          />
          <StatCard
            icon={BarChart3}
            label="Média de Séries"
            value={stats.avgSeries}
            subtitle="Séries por narrador"
            gradient="bg-gradient-to-br from-amber-400 to-orange-500"
            borderColor="border-amber-500/20"
          />
          <StatCard
            icon={TrendingUp}
            label="Mais Prolífico"
            value={stats.mostProlific.name.split(' ')[0]}
            subtitle={`${stats.maxSeries} séries vinculadas`}
            gradient="bg-gradient-to-br from-pink-400 to-rose-600"
            borderColor="border-pink-500/20"
          />
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted/50 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar narradores por nome ou bio..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-card/60 border border-border/40 text-text-primary text-sm placeholder:text-text-muted/40 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/40 backdrop-blur-xl transition-all duration-200"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted/40 hover:text-text-primary transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          <button
            className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-card/60 border border-border/40 text-text-secondary text-sm font-medium hover:text-text-primary hover:bg-card/80 backdrop-blur-xl transition-all duration-200"
          >
            <Filter className="w-4 h-4" />
            Filtros
          </button>
          <button
            onClick={() => setSortAsc(!sortAsc)}
            className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-card/60 border border-border/40 text-text-secondary text-sm font-medium hover:text-text-primary hover:bg-card/80 backdrop-blur-xl transition-all duration-200"
          >
            Nome
            {sortAsc ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Narrators Table */}
        <div className="rounded-2xl border border-border/30 bg-card/40 backdrop-blur-xl overflow-hidden">
          {/* Table header (desktop) */}
          <div className="hidden md:grid md:grid-cols-12 items-center px-6 py-3.5 border-b border-border/20 text-xs font-semibold uppercase tracking-wider text-text-muted/60">
            <div className="col-span-1">#</div>
            <div className="col-span-3">Narrador</div>
            <div className="col-span-3">Bio</div>
            <div className="col-span-2 text-center">Séries</div>
            <div className="col-span-2 text-center">Episódios</div>
            <div className="col-span-1 text-right">Ações</div>
          </div>

          {/* Rows */}
          {filteredNarrators.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-text-muted/50">
              <Users className="w-12 h-12 mb-3 opacity-30" />
              <p className="text-sm">Nenhum narrador encontrado</p>
              <p className="text-xs mt-1">Tente ajustar sua busca</p>
            </div>
          ) : (
            <div className="divide-y divide-border/15">
              {filteredNarrators.map((narrator, index) => {
                const seriesCount = narrator.seriesIds.length;
                const episodes = episodeCountForNarrator(narrator.id);
                const seriesNames = narrator.seriesIds
                  .map((id) => series.find((s) => s.id === id)?.title)
                  .filter(Boolean) as string[];

                return (
                  <div
                    key={narrator.id}
                    className="group grid grid-cols-1 md:grid-cols-12 items-center px-6 py-4 hover:bg-white/[0.02] transition-all duration-200"
                  >
                    {/* Index */}
                    <div className="hidden md:flex col-span-1 text-xs text-text-muted/30 font-mono">
                      {String(index + 1).padStart(2, '0')}
                    </div>

                    {/* Avatar + Name */}
                    <div className="col-span-1 md:col-span-3 flex items-center gap-4">
                      <div className="relative flex-shrink-0">
                        <div className="w-12 h-12 rounded-xl overflow-hidden ring-2 ring-border/20 group-hover:ring-accent/30 transition-all duration-300">
                          <img
                            src={narrator.avatar}
                            alt={narrator.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-bg" />
                      </div>
                      <div className="min-w-0">
                        <Link
                          to={`/narradores/${narrator.id}`}
                          className="text-sm font-semibold text-text-primary hover:text-accent transition-colors truncate block"
                        >
                          {narrator.name}
                        </Link>
                        <p className="text-xs text-text-muted/50 truncate mt-0.5">
                          {narrator.id}
                        </p>
                      </div>
                    </div>

                    {/* Bio (truncated) */}
                    <div className="hidden md:block col-span-3 min-w-0 pl-4">
                      <p className="text-xs text-text-muted/60 line-clamp-2 leading-relaxed">
                        {narrator.bio}
                      </p>
                    </div>

                    {/* Series count + badges */}
                    <div className="col-span-1 md:col-span-2 flex items-center justify-center gap-2 mt-3 md:mt-0">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-accent/10 text-accent text-xs font-semibold">
                        <BookOpen className="w-3 h-3" />
                        {seriesCount}
                      </span>
                      {/* Series names tooltip */}
                      <div className="hidden lg:flex flex-wrap gap-1">
                        {seriesNames.slice(0, 2).map((name) => (
                          <span
                            key={name}
                            className="px-2 py-0.5 rounded-md bg-white/5 text-text-muted/60 text-[10px]"
                          >
                            {name.length > 15 ? name.slice(0, 15) + '...' : name}
                          </span>
                        ))}
                        {seriesNames.length > 2 && (
                          <span className="px-2 py-0.5 rounded-md bg-white/5 text-text-muted/50 text-[10px]">
                            +{seriesNames.length - 2}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Episode count */}
                    <div className="col-span-1 md:col-span-2 flex items-center justify-center">
                      <div className="text-center">
                        <span className="text-sm font-bold text-text-primary">{episodes}</span>
                        <span className="text-xs text-text-muted/40 ml-1">eps</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="col-span-1 flex items-center justify-end gap-1 mt-3 md:mt-0">
                      <Link
                        to={`/admin/narrators/${narrator.id}`}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted/40 hover:text-accent hover:bg-accent/10 transition-all duration-200"
                        title="Editar"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted/40 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
                        title="Excluir"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <Link
                        to={`/narradores/${narrator.id}`}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted/40 hover:text-text-primary hover:bg-white/5 transition-all duration-200"
                        title="Ver no site"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between px-6 py-3.5 border-t border-border/20 bg-white/[0.01]">
            <p className="text-xs text-text-muted/50">
              Mostrando{' '}
              <span className="text-text-primary font-medium">{filteredNarrators.length}</span>{' '}
              de{' '}
              <span className="text-text-primary font-medium">{narrators.length}</span> narradores
            </p>
            <div className="flex items-center gap-2 text-xs text-text-muted/40">
              <span>Dados de demonstração</span>
              <div className="w-1.5 h-1.5 rounded-full bg-accent/40" />
              <span>Importados de data/data.ts</span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
