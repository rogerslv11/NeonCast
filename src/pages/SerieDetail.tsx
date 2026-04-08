// ============================================================
// Series Detail Page (Ultra Premium Design)
// ============================================================
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Play, Lock, Heart, Clock, ArrowLeft, Users, Calendar, Headphones, Sparkles, Star, Bookmark, Music, Disc, Volume2 } from 'lucide-react';
import { getSeriesById, getNarratorsByIds, formatDuration, type Episode } from '../data/data';
import { usePlayer } from '../contexts/PlayerContext';
import type { TrackInfo } from '../contexts/PlayerContext';
import { useFavorites } from '../hooks/useFavorites';

export default function SerieDetail() {
  const { id } = useParams<{ id: string }>();
  const serie = getSeriesById(id || '');
  const [activeSeason, setActiveSeason] = useState(1);
  const navigate = useNavigate();
  const { play } = usePlayer();
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!serie) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center px-4">
        <div className="text-center">
          <div className="relative inline-block mb-6">
            <div className="absolute -inset-4 bg-accent/10 rounded-3xl blur-2xl" />
            <div className="relative w-20 h-20 rounded-3xl glass-card flex items-center justify-center">
              <Bookmark className="w-10 h-10 text-accent/40" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">Série não encontrada</h1>
          <p className="text-text-muted/60 text-sm mb-6">A série que você procura não existe ou foi removida</p>
          <Link
            to="/catalogo"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium bg-accent/10 text-accent rounded-xl hover:bg-accent/20 transition-all border border-accent/20"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao catálogo
          </Link>
        </div>
      </div>
    );
  }

  const narrators = getNarratorsByIds(serie.narratorIds);
  const currentSeason = serie.seasons.find((s) => s.number === activeSeason);
  const episodes = currentSeason?.episodes || [];
  const isFav = isFavorite(serie.id);

  const totalDuration = serie.seasons.reduce(
    (acc, s) => acc + s.episodes.reduce((a, ep) => a + ep.duration, 0), 0
  );

  const totalEpisodes = serie.seasons.reduce((acc, s) => acc + s.episodes.length, 0);
  const freeEpisodes = serie.seasons.reduce(
    (acc, s) => acc + s.episodes.filter(ep => serie.isFree || ep.isFree).length, 0
  );

  const buildTrack = (ep: Episode): TrackInfo => ({
    id: ep.id,
    title: ep.title,
    seriesTitle: serie.title,
    seriesId: serie.id,
    audioUrl: ep.audioUrl,
    cover: serie.cover,
    duration: ep.duration,
  });

  const handlePlay = (ep: Episode) => {
    if (serie.isFree || ep.isFree) {
      play(buildTrack(ep));
      navigate('/player');
    }
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
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .animate-scale-in { animation: scale-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .animate-gradient { background-size: 200% auto; animation: gradient-shift 4s linear infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        
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
      `}</style>

      {/* ==================== HERO SECTION ==================== */}
      <div className="relative overflow-hidden border-b border-border/50">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-purple-500/5 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-accent/8 via-transparent to-transparent" />
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Back Button */}
          <Link
            to="/catalogo"
            className="group inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors mb-10 px-4 py-2.5 rounded-xl glass-card hover:border-accent/30 border border-transparent"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Catálogo
          </Link>

          {/* Content */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Cover */}
            <div className="relative flex-shrink-0 group mx-auto lg:mx-0">
              {/* Glow */}
              <div className="absolute -inset-6 bg-accent/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Image */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-accent to-purple-600 rounded-2xl rotate-6 opacity-30 blur-sm group-hover:rotate-12 transition-transform duration-500" />
                <img
                  src={serie.cover}
                  alt={serie.title}
                  className="relative w-56 h-56 sm:w-64 sm:h-64 object-cover rounded-2xl shadow-2xl shadow-black/50 ring-1 ring-white/10"
                />
              </div>
              
              {/* Favorite Button */}
              <button
                onClick={() => toggleFavorite(serie.id)}
                className="absolute top-4 right-4 w-11 h-11 rounded-xl glass-card flex items-center justify-center hover:bg-card/90 hover:scale-110 transition-all shadow-xl"
              >
                <Heart
                  className={`w-5 h-5 transition-all ${
                    isFav
                      ? 'fill-accent text-accent scale-110'
                      : 'text-white/60 hover:text-white'
                  }`}
                />
              </button>
              
              {/* Badge */}
              <div className="absolute bottom-4 left-4">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold rounded-lg backdrop-blur-sm shadow-xl ${
                    serie.isFree
                      ? 'bg-green-500/90 text-white'
                      : 'bg-black/70 text-accent border border-accent/30'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  {serie.isFree ? 'GRÁTIS' : 'PREMIUM'}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col justify-between min-w-0 flex-1">
              <div>
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2 mb-5 animate-fade-in-up">
                  <span className="px-3.5 py-1.5 text-xs font-semibold glass-card text-text-secondary rounded-lg flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-accent" />
                    {serie.genre}
                  </span>
                  <span className="px-3.5 py-1.5 text-xs font-semibold glass-card text-text-secondary rounded-lg flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-accent" />
                    {serie.year}
                  </span>
                  <span className="px-3.5 py-1.5 text-xs font-semibold glass-card text-text-secondary rounded-lg flex items-center gap-1.5">
                    <Disc className="w-3.5 h-3.5 text-accent" />
                    {serie.seasons.length} temporadas
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-text-primary mb-5 leading-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                  {serie.title}
                </h1>

                {/* Description */}
                <p className="text-sm sm:text-base text-text-secondary/80 leading-relaxed max-w-2xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  {serie.description}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-8 border-t border-border/50 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                {[
                  { label: 'Episódios', value: totalEpisodes.toString(), icon: Play, accent: 'text-green-400', bg: 'bg-green-400/5', border: 'border-green-400/10' },
                  { label: 'Duração total', value: formatDuration(totalDuration), icon: Clock, accent: 'text-blue-400', bg: 'bg-blue-400/5', border: 'border-blue-400/10' },
                  { label: 'Narradores', value: narrators.length.toString(), icon: Users, accent: 'text-purple-400', bg: 'bg-purple-400/5', border: 'border-purple-400/10' },
                  { label: 'Episódios grátis', value: freeEpisodes.toString(), icon: Headphones, accent: 'text-amber-400', bg: 'bg-amber-400/5', border: 'border-amber-400/10' },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className={`group relative overflow-hidden p-4 ${stat.bg} backdrop-blur-sm border ${stat.border} rounded-xl hover:scale-105 transition-all duration-300`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <stat.icon className={`w-5 h-5 ${stat.accent} mb-2 group-hover:scale-110 transition-transform relative z-10`} />
                    <p className="text-lg font-black text-text-primary mb-0.5 relative z-10">{stat.value}</p>
                    <p className="text-[10px] font-medium text-text-muted/70 uppercase tracking-wider relative z-10">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ==================== NARRATORS SECTION ==================== */}
        <div className="mb-16 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center">
              <Volume2 className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-text-primary">Narradores</h2>
              <p className="text-xs text-text-muted/60">As vozes por trás desta série</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {narrators.map((narrator, index) => (
              <Link
                key={narrator.id}
                to={`/narradores/${narrator.id}`}
                className="group glass-card rounded-2xl p-5 hover:border-purple-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/5 hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className="absolute -inset-2 bg-gradient-to-br from-purple-500/30 to-accent/30 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <img
                      src={narrator.avatar}
                      alt={narrator.name}
                      className="relative w-14 h-14 rounded-full object-cover ring-2 ring-border group-hover:ring-purple-500/30 transition-all"
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 ring-2 ring-card" />
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-bold text-text-primary group-hover:text-purple-400 transition-colors truncate mb-1">
                      {narrator.name}
                    </p>
                    <p className="text-xs text-text-muted/60 flex items-center gap-1.5">
                      <Music className="w-3 h-3 text-purple-400/60" />
                      Ver perfil completo
                    </p>
                  </div>
                  
                  {/* Arrow */}
                  <div className="w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors flex-shrink-0">
                    <ArrowLeft className="w-4 h-4 text-purple-400 rotate-180 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ==================== EPISODES SECTION ==================== */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {/* Header with Season Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-pink-500/20 border border-accent/30 flex items-center justify-center">
                <Disc className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-text-primary">Episódios</h2>
                <p className="text-xs text-text-muted/60">{totalEpisodes} episódios no total</p>
              </div>
            </div>
            
            {/* Season Tabs */}
            <div className="flex gap-1.5 glass-card rounded-xl p-1.5">
              {serie.seasons.map((season) => (
                <button
                  key={season.number}
                  onClick={() => setActiveSeason(season.number)}
                  className={`px-5 py-2.5 text-sm font-medium rounded-lg transition-all ${
                    activeSeason === season.number
                      ? 'bg-accent text-white shadow-md shadow-accent/20'
                      : 'text-text-muted/60 hover:text-text-primary hover:bg-card/60'
                  }`}
                >
                  T{season.number}
                </button>
              ))}
            </div>
          </div>

          {/* Episode List */}
          <div className="space-y-3">
            {episodes.map((episode, index) => {
              const isEpisodeFree = serie.isFree || episode.isFree;
              return (
                <div
                  key={episode.id}
                  className={`group flex items-center justify-between p-5 rounded-2xl transition-all duration-300 animate-fade-in-up ${
                    isEpisodeFree
                      ? 'glass-card hover:bg-card/60 cursor-pointer border border-transparent hover:border-accent/20 hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-0.5'
                      : 'bg-bg/20 border border-border/30'
                  }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    {/* Episode Number + Play/Lock */}
                    <div className="relative flex-shrink-0">
                      {isEpisodeFree ? (
                        <button
                          onClick={() => handlePlay(episode)}
                          className="w-12 h-12 rounded-xl bg-accent/10 hover:bg-accent/20 flex items-center justify-center transition-all group-hover:bg-accent/20 group-hover:scale-110"
                        >
                          <Play className="w-5 h-5 text-accent fill-accent ml-0.5" />
                        </button>
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-card/60 border border-border/50 flex items-center justify-center">
                          <Lock className="w-5 h-5 text-text-muted/40" />
                        </div>
                      )}
                    </div>

                    {/* Episode Info */}
                    <div className="min-w-0 flex-1">
                      <p className={`text-sm font-medium truncate ${isEpisodeFree ? 'text-text-primary' : 'text-text-muted/50'}`}>
                        <span className="text-text-muted/40 mr-2 font-mono">{String(index + 1).padStart(2, '0')}</span>
                        {episode.title}
                      </p>
                      {!isEpisodeFree && (
                        <p className="text-[10px] text-text-muted/50 mt-1 flex items-center gap-1.5">
                          <Lock className="w-3 h-3" />
                          Requer assinatura premium
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Duration & Badges */}
                  <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                    <span className={`text-xs tabular-nums px-3 py-1.5 rounded-lg ${
                      isEpisodeFree
                        ? 'text-text-muted/70 bg-bg/30'
                        : 'text-text-muted/40 bg-bg/20'
                    }`}>
                      {formatDuration(episode.duration)}
                    </span>
                    {isEpisodeFree && episode.isFree && !serie.isFree && (
                      <span className="text-[10px] font-medium px-2.5 py-1.5 rounded-lg bg-green-500/10 text-green-400 border border-green-500/20">
                        Grátis
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
