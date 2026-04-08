// ============================================================
// Narrators Page - Professional Design
// ============================================================
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Mic, Search, X, ArrowRight, Headphones, TrendingUp } from 'lucide-react';
import { narrators, series, getSeriesById } from '../data/data';

export default function Narrators() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'series-count'>('series-count');

  const filteredNarrators = useMemo(() => {
    let result = narrators.filter((n) =>
      n.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.bio.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortBy === 'series-count') {
      result.sort((a, b) => b.seriesIds.length - a.seriesIds.length);
    } else {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-bg">
      {/* ==================== HEADER ==================== */}
      <section className="relative border-b border-border/50 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.04] via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent" />
          {/* Subtle grid */}
          <div className="absolute inset-0 opacity-[0.015]" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }} />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/5 border border-accent/10 mb-6">
              <div className="relative">
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              </div>
              <Mic className="w-3 h-3 text-accent" />
              <span className="text-xs font-semibold text-accent/80 tracking-wide">Vozes do NeonCast</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-text-primary tracking-tight mb-5 leading-[1.1]">
              Os narradores por trás
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-pink-400 to-purple-400">
                de cada história
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-text-muted/70 leading-relaxed max-w-2xl mb-10">
              Artistas de voz profissionais que transformam texto em experiências imersivas, dando vida, emoção e personalidade a cada personagem.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
              {[
                { label: 'Narradores', value: narrators.length },
                { label: 'Séries', value: series.length },
                { label: 'Gêneros', value: new Set(narrators.flatMap(n => n.seriesIds)).size },
              ].map((stat, i) => (
                <div key={i} className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-text-primary">{stat.value}</span>
                  <span className="text-sm text-text-muted/50">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CONTENT ==================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-border/50">
          {/* Search */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nome ou biografia..."
              className="w-full pl-11 pr-9 py-3 text-sm bg-card/30 border border-border/50 rounded-xl placeholder:text-text-muted/40 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 focus:bg-card/50 text-text-primary transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-text-muted/40 hover:text-text-primary hover:bg-white/10 transition-all"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <TrendingUp className="w-3.5 h-3.5 text-text-muted/40" />
            <span className="text-xs text-text-muted/50 font-medium">Ordenar:</span>
            <div className="flex gap-0.5 bg-card/30 border border-border/50 rounded-lg p-0.5">
              {[
                { value: 'series-count' as const, label: 'Mais séries' },
                { value: 'name' as const, label: 'A-Z' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSortBy(option.value)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-md transition-all ${
                    sortBy === option.value
                      ? 'bg-accent text-white shadow-sm shadow-accent/20'
                      : 'text-text-muted/60 hover:text-text-primary hover:bg-white/5'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results count */}
        {searchQuery && (
          <div className="flex items-center gap-2 mb-6 px-1">
            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
            <p className="text-xs text-text-muted/60">
              {filteredNarrators.length} {filteredNarrators.length === 1 ? 'narrador encontrado' : 'narradores encontrados'}
            </p>
          </div>
        )}

        {/* ==================== GRID ==================== */}
        {filteredNarrators.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredNarrators.map((narrator) => {
              const narratorSeries = narrator.seriesIds.map((id) => getSeriesById(id)).filter(Boolean);
              const totalEps = narratorSeries.reduce((acc, s) =>
                acc + (s?.seasons.reduce((a, season) => a + season.episodes.length, 0) || 0), 0);
              const genres = [...new Set(narratorSeries.map(s => s?.genre).filter(Boolean))];

              return (
                <Link
                  key={narrator.id}
                  to={`/narradores/${narrator.id}`}
                  className="group relative bg-card/30 border border-border/50 rounded-2xl overflow-hidden hover:border-accent/25 hover:bg-card/50 transition-all duration-300"
                >
                  {/* Top gradient accent */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="p-5">
                    {/* Avatar + Header */}
                    <div className="flex items-start gap-3.5 mb-4">
                      <div className="relative flex-shrink-0">
                        {/* Glow on hover */}
                        <div className="absolute -inset-1 bg-gradient-to-br from-accent/15 to-purple-500/15 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative">
                          <img
                            src={narrator.avatar}
                            alt={narrator.name}
                            className="w-14 h-14 rounded-full object-cover ring-1 ring-border/50 group-hover:ring-accent/25 transition-all duration-300"
                            loading="lazy"
                          />
                          {/* Online indicator */}
                          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 ring-2 ring-bg" />
                        </div>
                      </div>

                      <div className="min-w-0 flex-1 pt-0.5">
                        <h3 className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors truncate leading-tight">
                          {narrator.name}
                        </h3>
                        <div className="flex items-center gap-1 mt-1">
                          <Headphones className="w-3 h-3 text-accent/50" />
                          <span className="text-xs text-text-muted/60">
                            {narratorSeries.length} séries · {totalEps} episódios
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="text-xs text-text-muted/60 leading-relaxed line-clamp-2 mb-4 pl-[3.75rem]">
                      {narrator.bio}
                    </p>

                    {/* Genres */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {genres.slice(0, 3).map((g) => (
                        <span
                          key={g}
                          className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-accent/5 text-accent/70 border border-accent/10 hover:bg-accent/10 hover:text-accent transition-colors cursor-default"
                        >
                          {g}
                        </span>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3.5 border-t border-border/30">
                      <span className="text-xs text-text-muted/50 group-hover:text-accent transition-colors font-medium">
                        Ver perfil completo
                      </span>
                      <div className="w-7 h-7 rounded-lg bg-white/[0.03] flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                        <ArrowRight className="w-3.5 h-3.5 text-text-muted/30 group-hover:text-accent group-hover:translate-x-0.5 transition-all duration-300" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          /* ==================== EMPTY STATE ==================== */
          <div className="text-center py-24">
            <div className="relative inline-block mb-8">
              <div className="absolute -inset-6 bg-accent/5 rounded-3xl blur-xl" />
              <div className="relative w-20 h-20 rounded-2xl bg-card/40 border border-border/50 flex items-center justify-center">
                <Mic className="w-9 h-9 text-accent/20" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">Nenhum narrador encontrado</h3>
            <p className="text-sm text-text-muted/60 mb-6 max-w-xs mx-auto">
              Tente ajustar sua busca para encontrar mais resultados
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="inline-flex items-center gap-2 text-sm text-accent hover:underline font-medium"
              >
                <X className="w-3.5 h-3.5" />
                Limpar busca
              </button>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
