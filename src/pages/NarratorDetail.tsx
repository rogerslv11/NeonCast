// ============================================================
// Narrator Detail Page - Premium Design
// ============================================================
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Mic, Headphones, Clock, Play, BookOpen, Sparkles, TrendingUp, Award } from 'lucide-react';
import { getNarratorById, getSeriesById, narrators } from '../data/data';
import SeriesCard from '../components/SeriesCard';
import { useState } from 'react';

export default function NarratorDetail() {
  const { id } = useParams<{ id: string }>();
  const narrator = getNarratorById(id || '');
  const narratorRank = narrator
    ? [...narrators].sort((a, b) => b.seriesIds.length - a.seriesIds.length).findIndex(n => n.id === narrator.id) + 1
    : 0;

  const [activeTab, setActiveTab] = useState<'series' | 'about'>('series');

  if (!narrator) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent animate-pulse" />
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-[100px] animate-float" />
        </div>
        
        <div className="text-center relative z-10">
          <div className="relative mb-8">
            <div className="w-32 h-32 rounded-full bg-card/50 border border-border/50 flex items-center justify-center mx-auto shadow-2xl shadow-accent/10">
              <Mic className="w-12 h-12 text-text-muted/30" />
            </div>
            <div className="absolute inset-0 w-32 h-32 mx-auto rounded-full border border-accent/20 animate-pulse-glow" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary mb-3 neon-text">Narrador não encontrado</h1>
          <p className="text-sm text-text-muted/60 mb-8 max-w-xs mx-auto leading-relaxed">
            O narrador que você procura não existe no nosso catálogo.
          </p>
          <Link
            to="/narradores"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-accent to-accent/80 text-white text-sm font-medium hover:shadow-lg hover:shadow-accent/30 transition-all hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar aos narradores
          </Link>
        </div>
      </div>
    );
  }

  const associatedSeries = narrator.seriesIds.map((seriesId) => getSeriesById(seriesId)).filter(Boolean);

  const totalEpisodes = associatedSeries.reduce(
    (acc, s) => acc + (s?.seasons.reduce((a, season) => a + season.episodes.length, 0) || 0), 0
  );

  const totalDuration = associatedSeries.reduce(
    (acc, s) => acc + (s?.seasons.reduce((a, season) =>
      a + season.episodes.reduce((epAcc, ep) => epAcc + ep.duration, 0), 0) || 0), 0
  );

  const formatHours = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}min`;
  };

  const genres = [...new Set(associatedSeries.map((s) => s?.genre).filter(Boolean))];
  const avgEpisodesPerSeries = associatedSeries.length > 0 ? Math.round(totalEpisodes / associatedSeries.length) : 0;

  return (
    <div className="min-h-screen bg-bg relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[150px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/3 rounded-full blur-[120px] animate-float-delayed" />
      </div>

      {/* Hero */}
      <div className="relative overflow-hidden">
        {/* Gradient overlays */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-accent/8 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Back */}
          <Link
            to="/narradores"
            className="group inline-flex items-center gap-2 text-sm text-text-muted/60 hover:text-text-primary transition-all mb-10"
          >
            <div className="w-9 h-9 rounded-xl bg-white/5 border border-border/50 flex items-center justify-center group-hover:border-accent/30 group-hover:bg-accent/5 transition-all">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            </div>
            <span className="font-medium">Narradores</span>
          </Link>

          {/* Profile */}
          <div className="flex flex-col sm:flex-row items-start gap-8 sm:gap-10">
            {/* Avatar with Sound Waves */}
            <div className="relative flex-shrink-0 mx-auto sm:mx-0 group">
              {/* Glow effect */}
              <div className="absolute -inset-3 bg-gradient-to-br from-accent/20 to-purple-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Avatar */}
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-br from-accent/30 to-purple-500/30 rounded-2xl blur-lg opacity-50" />
                <img
                  src={narrator.avatar}
                  alt={narrator.name}
                  className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-2xl object-cover shadow-2xl ring-2 ring-white/10"
                />
                
                {/* Online indicator */}
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 ring-3 ring-bg shadow-lg shadow-green-500/30" />
                
                {/* Mic Badge */}
                <div className="absolute -top-3 -left-3 w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-pink-500 flex items-center justify-center shadow-xl shadow-accent/40 ring-2 ring-bg">
                  <Mic className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Sound wave animation */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-1 h-4">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-[2px] bg-accent/50 rounded-full animate-pulse"
                    style={{
                      height: `${8 + Math.sin(i * 0.8) * 6}px`,
                      animationDelay: `${i * 0.12}s`,
                      animationDuration: '1.2s',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              {/* Name & Rank */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-3">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-text-primary tracking-tight">
                  {narrator.name}
                </h1>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-accent/10 text-accent text-xs font-bold border border-accent/20">
                  <Award className="w-3 h-3" />
                  #{narratorRank}
                </span>
              </div>

              {/* Bio snippet */}
              <p className="text-sm text-text-muted/70 mb-6 max-w-lg leading-relaxed">
                {narrator.bio.length > 120 ? narrator.bio.substring(0, 120) + '...' : narrator.bio}
              </p>

              {/* Genres */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-8">
                {genres.map((g) => (
                  <span
                    key={g}
                    className="text-xs font-medium px-3 py-1.5 rounded-full bg-white/5 text-text-muted/70 border border-border/30 hover:border-accent/30 hover:text-accent/70 transition-all"
                  >
                    {g}
                  </span>
                ))}
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'Séries', value: associatedSeries.length.toString(), icon: Play, color: 'from-accent to-pink-500' },
                  { label: 'Episódios', value: totalEpisodes.toString(), icon: Headphones, color: 'from-purple-500 to-indigo-500' },
                  { label: 'Duração', value: formatHours(totalDuration), icon: Clock, color: 'from-blue-500 to-cyan-500' },
                  { label: 'Média eps', value: avgEpisodesPerSeries.toString(), icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
                ].map((stat, i) => (
                  <div 
                    key={i} 
                    className="group relative bg-card/40 border border-border/50 rounded-xl p-4 hover:border-accent/20 transition-all overflow-hidden"
                  >
                    {/* Hover glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="relative">
                      <div className="flex items-start justify-between mb-2">
                        <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                          <stat.icon className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <p className="text-xl font-black text-text-primary">{stat.value}</p>
                      <p className="text-[10px] text-text-muted/60 mt-0.5">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Tabs */}
        <div className="flex gap-1 mb-8 pb-4 border-b border-border/50">
          <div className="flex gap-0.5 bg-card/40 border border-border/50 rounded-xl p-0.5 backdrop-blur-sm">
            <button
              onClick={() => setActiveTab('series')}
              className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg transition-all ${
                activeTab === 'series' 
                  ? 'bg-gradient-to-r from-accent to-accent/80 text-white shadow-lg shadow-accent/20' 
                  : 'text-text-muted/60 hover:text-text-primary hover:bg-white/5'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Séries ({associatedSeries.length})
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg transition-all ${
                activeTab === 'about' 
                  ? 'bg-gradient-to-r from-accent to-accent/80 text-white shadow-lg shadow-accent/20' 
                  : 'text-text-muted/60 hover:text-text-primary hover:bg-white/5'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Sobre
            </button>
          </div>
        </div>

        {/* Series Tab */}
        {activeTab === 'series' && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-10">
              {associatedSeries.map((s) => (
                <SeriesCard key={s!.id} series={s!} />
              ))}
            </div>

            {/* Detailed List */}
            <div className="bg-card/40 border border-border/50 rounded-2xl overflow-hidden backdrop-blur-sm">
              <div className="px-6 py-4 border-b border-border/50">
                <h3 className="text-sm font-semibold text-text-primary">Detalhamento</h3>
                <p className="text-xs text-text-muted/50 mt-0.5">Informações de cada série</p>
              </div>
              <div className="divide-y divide-border/30">
                {associatedSeries.map((s, i) => {
                  const episodes = s!.seasons.reduce((a, season) => a + season.episodes.length, 0);
                  const duration = s!.seasons.reduce((a, season) =>
                    a + season.episodes.reduce((epAcc, ep) => epAcc + ep.duration, 0), 0);

                  return (
                    <Link
                      key={s!.id}
                      to={`/catalogo/${s!.id}`}
                      className="group flex items-center gap-4 px-6 py-4 hover:bg-card/50 transition-all"
                    >
                      <span className="text-xs text-text-muted/20 w-6 text-center font-mono flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
                      <div className="relative flex-shrink-0">
                        <img src={s!.cover} alt={s!.title} className="w-14 h-14 rounded-lg object-cover ring-1 ring-border/50 group-hover:ring-accent/30 transition-all" />
                        <div className="absolute inset-0 rounded-lg bg-accent/0 group-hover:bg-accent/10 transition-all flex items-center justify-center">
                          <Play className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity fill-current" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors truncate">{s!.title}</p>
                        <p className="text-xs text-text-muted/50">{s!.genre} · {s!.year}</p>
                      </div>
                      <div className="text-right flex-shrink-0 hidden sm:block">
                        <p className="text-xs text-text-muted/60">{episodes} eps</p>
                        <p className="text-[10px] text-text-muted/40">{Math.floor(duration / 60)}min</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* About Tab */}
        {activeTab === 'about' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Bio */}
            <div className="lg:col-span-2">
              <div className="bg-card/40 border border-border/50 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
                  <Mic className="w-4 h-4 text-accent" />
                  Sobre o narrador
                </h3>
                <div className="space-y-4 text-sm text-text-muted/70 leading-relaxed">
                  <p>{narrator.bio}</p>
                  <p>
                    Com uma carreira dedicada à arte da narração, {narrator.name.split(' ')[0]} trouxe vida e emoção
                    a {associatedSeries.length} séries diferentes, totalizando {totalEpisodes} episódios e mais de{' '}
                    {formatHours(totalDuration)} de conteúdo narrado.
                  </p>
                  <p>
                    Sua versatilidade é evidente nos {genres.length} gêneros diferentes que já explorou, desde{' '}
                    {genres.slice(0, 2).join(' até ')}{genres.length > 2 ? ` e ${genres[genres.length - 1]}` : ''},
                    demonstrando uma capacidade única de adaptar sua voz e estilo a diferentes atmosferas narrativas.
                  </p>
                </div>
              </div>
            </div>

            {/* Stats & Info */}
            <div className="space-y-6">
              {/* Ranking Card */}
              <div className="bg-card/40 border border-border/50 rounded-2xl p-5 backdrop-blur-sm">
                <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
                  <Award className="w-4 h-4 text-accent" />
                  Estatísticas
                </h3>
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-accent/5 to-transparent rounded-xl p-4 border border-accent/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-text-muted/60">Ranking geral</span>
                      <span className="text-lg font-black text-accent">#{narratorRank}</span>
                    </div>
                    <div className="w-full bg-bg/50 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-accent to-purple-400 rounded-full transition-all duration-1000"
                        style={{ width: `${((narrators.length - narratorRank + 1) / narrators.length) * 100}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-text-muted/40 mt-1">de {narrators.length} narradores</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-text-muted/60">Episódios por série</span>
                      <span className="text-sm font-bold text-text-primary">{avgEpisodesPerSeries}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-text-muted/60">Gêneros explorados</span>
                      <span className="text-sm font-bold text-text-primary">{genres.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-text-muted/60">Tempo médio/ep</span>
                      <span className="text-sm font-bold text-text-primary">
                        {totalEpisodes > 0 ? formatHours(Math.floor(totalDuration / totalEpisodes)) : '0min'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Genres Card */}
              <div className="bg-card/40 border border-border/50 rounded-2xl p-5 backdrop-blur-sm">
                <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent" />
                  Gêneros
                </h3>
                <div className="flex flex-wrap gap-2">
                  {genres.map((g) => (
                    <span
                      key={g}
                      className="text-xs font-medium px-3 py-1.5 rounded-full bg-accent/5 text-accent/70 border border-accent/10 hover:bg-accent/10 transition-all"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
