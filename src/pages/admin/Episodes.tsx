import { useState, useMemo } from 'react';
import {
  Film,
  Search,
  Clock,
  Unlock,
  Lock,
  ChevronDown,
  ChevronUp,
  Play,
  BarChart3,
  Layers,
} from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { series, type Series } from '../../data/data';

function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}min`;
  return `${m}min`;
}

function formatDurationShort(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

interface EpisodeRow {
  seriesId: string;
  seriesTitle: string;
  season: number;
  episodeTitle: string;
  duration: number;
  isFree: boolean;
}

export default function Episodes() {
  const [search, setSearch] = useState('');
  const [expandedSeries, setExpandedSeries] = useState<Set<string>>(new Set(series.map((s: Series) => s.id)));

  const allEpisodes: EpisodeRow[] = useMemo(() => {
    const rows: EpisodeRow[] = [];
    for (const s of series) {
      for (const season of s.seasons) {
        for (const ep of season.episodes) {
          rows.push({
            seriesId: s.id,
            seriesTitle: s.title,
            season: season.number,
            episodeTitle: ep.title,
            duration: ep.duration,
            isFree: ep.isFree,
          });
        }
      }
    }
    return rows;
  }, []);

  const filteredSeries = useMemo(() => {
    if (!search.trim()) return series;
    const q = search.toLowerCase();
    return series.filter(
      (s: Series) =>
        s.title.toLowerCase().includes(q) ||
        s.genre.toLowerCase().includes(q) ||
        s.seasons.some((season) =>
          season.episodes.some((ep) => ep.title.toLowerCase().includes(q))
        )
    );
  }, [search]);

  const stats = useMemo(() => {
    const total = allEpisodes.length;
    const free = allEpisodes.filter((e: EpisodeRow) => e.isFree).length;
    const premium = total - free;
    const totalDuration = allEpisodes.reduce((acc: number, e: EpisodeRow) => acc + e.duration, 0);
    return { total, free, premium, totalDuration };
  }, [allEpisodes]);

  const toggleSeries = (id: string) => {
    setExpandedSeries((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Episódios</h1>
            <p className="text-text-secondary mt-1">Gerencie todos os episódios das séries.</p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar episódios..."
              className="w-full bg-card border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Episodes */}
          <div className="bg-card border border-border rounded-2xl p-5 hover:border-accent/20 transition-all group">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <Film className="w-5 h-5 text-accent" />
              </div>
              <span className="text-xs font-medium text-text-muted">Total</span>
            </div>
            <p className="text-2xl font-bold text-text-primary">{stats.total}</p>
            <p className="text-xs text-text-secondary mt-1">Episódios</p>
          </div>

          {/* Free Episodes */}
          <div className="bg-card border border-border rounded-2xl p-5 hover:border-green-500/20 transition-all group">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                <Unlock className="w-5 h-5 text-green-400" />
              </div>
              <span className="text-xs font-medium text-text-muted">Gratuitos</span>
            </div>
            <p className="text-2xl font-bold text-green-400">{stats.free}</p>
            <p className="text-xs text-text-secondary mt-1">Episódios gratuitos</p>
          </div>

          {/* Premium Episodes */}
          <div className="bg-card border border-border rounded-2xl p-5 hover:border-amber-500/20 transition-all group">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                <Lock className="w-5 h-5 text-amber-400" />
              </div>
              <span className="text-xs font-medium text-text-muted">Premium</span>
            </div>
            <p className="text-2xl font-bold text-amber-400">{stats.premium}</p>
            <p className="text-xs text-text-secondary mt-1">Episódios premium</p>
          </div>

          {/* Total Duration */}
          <div className="bg-card border border-border rounded-2xl p-5 hover:border-cyan-500/20 transition-all group">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                <Clock className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="text-xs font-medium text-text-muted">Duração</span>
            </div>
            <p className="text-2xl font-bold text-cyan-400">{formatDurationShort(stats.totalDuration)}</p>
            <p className="text-xs text-text-secondary mt-1">Duração total</p>
          </div>
        </div>

        {/* Episodes grouped by series */}
        <div className="space-y-4">
          {filteredSeries.map((s) => {
            const isExpanded = expandedSeries.has(s.id);
            const seriesEpisodes = s.seasons.flatMap((season) =>
              season.episodes.map((ep) => ({
                season: season.number,
                ...ep,
              }))
            );
            const freeCount = seriesEpisodes.filter((e) => e.isFree).length;
            const premiumCount = seriesEpisodes.length - freeCount;
            const totalDuration = seriesEpisodes.reduce((acc, e) => acc + e.duration, 0);

            return (
              <div
                key={s.id}
                className="bg-card border border-border rounded-2xl overflow-hidden hover:border-border/80 transition-all"
              >
                {/* Series Header */}
                <button
                  onClick={() => toggleSeries(s.id)}
                  className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-white/[0.02] transition-colors"
                >
                  {/* Cover */}
                  <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-border">
                    <img
                      src={s.cover}
                      alt={s.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-semibold text-text-primary truncate">{s.title}</h3>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-accent/10 text-accent flex-shrink-0">
                        {s.genre}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-text-muted flex items-center gap-1">
                        <Layers className="w-3 h-3" />
                        {s.seasons.length} temporadas
                      </span>
                      <span className="text-xs text-text-muted flex items-center gap-1">
                        <Film className="w-3 h-3" />
                        {seriesEpisodes.length} episódios
                      </span>
                      <span className="text-xs text-green-400/80">{freeCount} gratuitos</span>
                      <span className="text-xs text-amber-400/80">{premiumCount} premium</span>
                      <span className="text-xs text-cyan-400/80 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDurationShort(totalDuration)}
                      </span>
                    </div>
                  </div>

                  {/* Chevron */}
                  <div className="text-text-muted flex-shrink-0">
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </button>

                {/* Episodes Table */}
                {isExpanded && (
                  <div className="border-t border-border">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border/50">
                          <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted px-5 py-2.5">
                            Temporada
                          </th>
                          <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted px-5 py-2.5">
                            Episódio
                          </th>
                          <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted px-5 py-2.5">
                            Duração
                          </th>
                          <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted px-5 py-2.5">
                            Acesso
                          </th>
                          <th className="w-10 px-5 py-2.5" />
                        </tr>
                      </thead>
                      <tbody>
                        {s.seasons.map((season) =>
                          season.episodes.map((ep) => (
                            <tr
                              key={ep.id}
                              className="border-b border-border/30 last:border-0 hover:bg-white/[0.02] transition-colors group"
                            >
                              <td className="px-5 py-3">
                                <span className="text-xs text-text-muted">
                                  T{season.number}
                                </span>
                              </td>
                              <td className="px-5 py-3">
                                <div className="flex items-center gap-2">
                                  <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Play className="w-3 h-3 text-accent" />
                                  </div>
                                  <span className="text-sm text-text-primary">{ep.title}</span>
                                </div>
                              </td>
                              <td className="px-5 py-3">
                                <span className="text-xs text-text-secondary font-mono">
                                  {formatDuration(ep.duration)}
                                </span>
                              </td>
                              <td className="px-5 py-3">
                                {ep.isFree ? (
                                  <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-green-500/10 text-green-400">
                                    <Unlock className="w-3 h-3" />
                                    Gratuito
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400">
                                    <Lock className="w-3 h-3" />
                                    Premium
                                  </span>
                                )}
                              </td>
                              <td className="px-5 py-3">
                                <button className="opacity-0 group-hover:opacity-100 transition-opacity text-text-muted hover:text-accent">
                                  <BarChart3 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          })}

          {filteredSeries.length === 0 && (
            <div className="bg-card border border-border rounded-2xl p-12 text-center">
              <Film className="w-10 h-10 text-text-muted mx-auto mb-3" />
              <p className="text-text-secondary">Nenhum episódio encontrado.</p>
              <p className="text-sm text-text-muted mt-1">Tente buscar com outros termos.</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
