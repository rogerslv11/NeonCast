// ============================================================
// Home Page (Ultra Premium Design)
// ============================================================
import { Link, useNavigate } from 'react-router-dom';
import { Play, ArrowRight, Headphones, Sparkles, TrendingUp, Users, Newspaper, Crown, Clock, Zap, Star, Award, BookOpen, Volume2, ChevronDown, Flame, Music } from 'lucide-react';
import { series, narrators, news } from '../data/data';
import { useFavorites } from '../hooks/useFavorites';
import SeriesCard from '../components/SeriesCard';
import { usePlayer } from '../contexts/PlayerContext';
import type { TrackInfo } from '../contexts/PlayerContext';
import { useState, useEffect } from 'react';

const FEATURED_COUNT = 5;
const NEWS_COUNT = 3;

export default function Home() {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { play } = usePlayer();
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -30px 0px' }
    );

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const featuredSeries = series.slice(0, FEATURED_COUNT);
  const latestNews = news.slice(0, NEWS_COUNT);
  const freeSeriesList = series.filter(s => s.isFree);
  const premiumSeriesList = series.filter(s => !s.isFree);

  function handlePlayFeatured(seriesId: string) {
    const s = series.find((item) => item.id === seriesId);
    if (!s) return;
    const firstEpisode = s.seasons[0]?.episodes[0];
    if (!firstEpisode) return;

    const track: TrackInfo = {
      id: firstEpisode.id,
      title: firstEpisode.title,
      seriesTitle: s.title,
      seriesId: s.id,
      audioUrl: firstEpisode.audioUrl,
      cover: s.cover,
      duration: firstEpisode.duration,
    };
    play(track);
    navigate('/player');
  }

  const totalEpisodes = series.reduce(
    (acc, s) => acc + s.seasons.reduce((a, season) => a + season.episodes.length, 0), 0
  );

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

  const freeSeries = series.filter(s => s.isFree).length;
  const premiumSeries = series.filter(s => !s.isFree).length;

  const newestSeries = [...series].sort((a, b) => b.year - a.year).slice(0, 4);

  const seriesByEpisodes = [...series].sort((a, b) => {
    const aEps = a.seasons.reduce((acc, s) => acc + s.episodes.length, 0);
    const bEps = b.seasons.reduce((acc, s) => acc + s.episodes.length, 0);
    return bEps - aEps;
  }).slice(0, 4);

  const maxEpisodes = seriesByEpisodes[0]?.seasons.reduce((acc, s) => acc + s.episodes.length, 0) || 1;

  return (
    <main className="min-h-screen bg-bg">
      {/* Premium CSS */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-15px) rotate(1deg); }
          66% { transform: translateY(-8px) rotate(-1deg); }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 30px rgba(255, 0, 170, 0.3), 0 0 60px rgba(255, 0, 170, 0.1); }
          50% { box-shadow: 0 0 50px rgba(255, 0, 170, 0.5), 0 0 100px rgba(255, 0, 170, 0.2); }
        }
        @keyframes text-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes orb-float-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -40px) scale(1.1); }
        }
        @keyframes orb-float-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-40px, 30px) scale(0.9); }
        }
        @keyframes orb-float-3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, 40px) scale(1.05); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes pulse-soft {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-glow-pulse { animation: glow-pulse 4s ease-in-out infinite; }
        .animate-orb-1 { animation: orb-float-1 12s ease-in-out infinite; }
        .animate-orb-2 { animation: orb-float-2 15s ease-in-out infinite; }
        .animate-orb-3 { animation: orb-float-3 10s ease-in-out infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .animate-scale-in { animation: scale-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .animate-slide-left { animation: slide-in-left 0.7s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .animate-slide-right { animation: slide-in-right 0.7s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .animate-pulse-soft { animation: pulse-soft 3s ease-in-out infinite; }
        .animate-gradient { background-size: 200% auto; animation: gradient-x 4s linear infinite; }
        .animate-marquee { animation: marquee 30s linear infinite; }

        .scroll-reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .scroll-reveal.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .hero-mesh {
          background:
            radial-gradient(ellipse at 15% 50%, rgba(255, 0, 170, 0.12) 0%, transparent 50%),
            radial-gradient(ellipse at 85% 30%, rgba(120, 0, 255, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 80%, rgba(255, 0, 170, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 30% 20%, rgba(255, 0, 100, 0.06) 0%, transparent 40%);
        }

        .noise-overlay {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.02'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 256px 256px;
        }

        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

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

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      {/* ==================== HERO SECTION ==================== */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden hero-mesh">
        {/* Animated Orbs */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-orb-1 pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/8 rounded-full blur-3xl animate-orb-2 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-72 h-72 bg-pink-500/6 rounded-full blur-3xl animate-orb-3 pointer-events-none" />

        {/* Floating Stars */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse-soft"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
                opacity: 0.2 + Math.random() * 0.3,
              }}
            />
          ))}
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 noise-overlay pointer-events-none opacity-50" />
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }} />

        {/* Decorative Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-accent/5 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-purple-500/5 pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass-card mb-10 animate-fade-in-up shadow-lg shadow-black/20">
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <div className="absolute inset-0 w-2 h-2 rounded-full bg-accent animate-ping opacity-50" />
            </div>
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span className="text-xs font-semibold tracking-wide text-text-secondary">
              {series.length} séries originais disponíveis
            </span>
            <div className="w-px h-3 bg-border/50" />
            <span className="text-xs text-accent font-bold">Novo</span>
          </div>

          {/* Main Title */}
          <div className="relative mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            {/* Glow behind title */}
            <div className="absolute -inset-4 bg-gradient-to-r from-accent/20 via-purple-500/10 to-pink-500/20 rounded-3xl blur-2xl pointer-events-none" />
            
            <h1 className="relative text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter">
              <span className="block text-white drop-shadow-2xl">NEON</span>
              <span className="block text-gradient animate-gradient" style={{
                backgroundSize: '200% auto',
              }}>
                CAST
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-text-secondary/80 max-w-2xl mx-auto leading-relaxed mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Séries em áudio imersivas que dão vida, emoção e profundidade
            <span className="text-text-primary font-medium"> a cada história</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Link
              to="/catalogo"
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-white text-sm font-bold overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-accent/30 hover:-translate-y-1 animate-gradient"
              style={{
                background: 'linear-gradient(135deg, #ff00aa, #aa00ff, #ff00aa)',
                backgroundSize: '200% auto',
              }}
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Play className="w-5 h-5 fill-current relative z-10 group-hover:scale-110 transition-transform" />
              <span className="relative z-10">Explorar Catálogo</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            </Link>

            <button
              onClick={() => handlePlayFeatured(featuredSeries[0]?.id)}
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-xl text-text-primary text-sm font-bold transition-all duration-300 hover:border-accent/40 hover:bg-card/60 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/10"
            >
              <div className="relative">
                <Headphones className="w-5 h-5 text-accent group-hover:scale-110 transition-transform" />
                <div className="absolute inset-0 w-5 h-5 text-accent animate-ping opacity-20">
                  <Headphones className="w-5 h-5" />
                </div>
              </div>
              Ouvir Agora
            </button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            {[
              { label: 'Séries', value: series.length.toString(), icon: BookOpen, accent: 'text-blue-400', bg: 'bg-blue-400/5', border: 'border-blue-400/10' },
              { label: 'Episódios', value: totalEpisodes.toLocaleString(), icon: Play, accent: 'text-green-400', bg: 'bg-green-400/5', border: 'border-green-400/10' },
              { label: 'Narradores', value: narrators.length.toString(), icon: Users, accent: 'text-purple-400', bg: 'bg-purple-400/5', border: 'border-purple-400/10' },
              { label: 'Horas de áudio', value: formatHours(totalDuration), icon: Clock, accent: 'text-yellow-400', bg: 'bg-yellow-400/5', border: 'border-yellow-400/10' },
            ].map((stat, i) => (
              <div
                key={i}
                className={`group relative overflow-hidden p-5 ${stat.bg} backdrop-blur-sm border ${stat.border} rounded-2xl hover:scale-105 transition-all duration-300`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <stat.icon className={`w-5 h-5 ${stat.accent} mb-2 group-hover:scale-110 transition-transform relative z-10`} />
                <p className="text-xl sm:text-2xl font-black text-text-primary mb-0.5 relative z-10">{stat.value}</p>
                <p className="text-[10px] font-medium text-text-muted/70 uppercase tracking-wider relative z-10">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted/50 animate-bounce">
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </section>

      {/* ==================== FEATURED SECTION ==================== */}
      <section className="px-6 sm:px-8 md:px-12 py-20 scroll-reveal">
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-pink-500/20 border border-accent/30 flex items-center justify-center">
                <Crown className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-text-primary">Destaques</h2>
                <p className="text-sm text-text-muted/70">As séries mais ouvidas da plataforma</p>
              </div>
            </div>
          </div>
          <Link
            to="/catalogo"
            className="group inline-flex items-center gap-2 text-sm text-text-muted/70 hover:text-accent transition-colors px-4 py-2.5 rounded-xl hover:bg-accent/5 border border-transparent hover:border-accent/20"
          >
            Ver todos
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="flex gap-5 overflow-x-auto pb-4 -mx-6 px-6 sm:overflow-visible sm:mx-0 sm:px-0 snap-x snap-mandatory sm:snap-none scrollbar-hide">
          {featuredSeries.map((s) => (
            <div key={s.id} className="min-w-[170px] sm:min-w-0 flex-shrink-0 sm:flex-1 snap-start">
              <SeriesCard
                series={s}
                isFavorite={isFavorite(s.id)}
                onToggleFavorite={() => toggleFavorite(s.id)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ==================== FREE SECTION ==================== */}
      <section className="px-6 sm:px-8 md:px-12 py-20 scroll-reveal">
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 flex items-center justify-center">
                <Zap className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-text-primary">Grátis para Ouvir</h2>
                <p className="text-sm text-text-muted/70">{freeSeriesList.length} séries disponíveis sem custo</p>
              </div>
            </div>
          </div>
          <Link
            to="/catalogo"
            className="group inline-flex items-center gap-2 text-sm text-text-muted/70 hover:text-accent transition-colors px-4 py-2.5 rounded-xl hover:bg-accent/5 border border-transparent hover:border-accent/20"
          >
            Ver todas
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {freeSeriesList.slice(0, 4).map((s) => (
            <SeriesCard
              key={s.id}
              series={s}
              isFavorite={isFavorite(s.id)}
              onToggleFavorite={() => toggleFavorite(s.id)}
            />
          ))}
        </div>
      </section>

      {/* ==================== NEWEST SECTION ==================== */}
      <section className="px-6 sm:px-8 md:px-12 py-20 relative scroll-reveal">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.03] to-transparent pointer-events-none" />
        
        <div className="relative">
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 flex items-center justify-center">
                  <Flame className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-text-primary">Lançamentos</h2>
                  <p className="text-sm text-text-muted/70">As séries mais recentes do catálogo</p>
                </div>
              </div>
            </div>
            <Link
              to="/catalogo"
              className="group inline-flex items-center gap-2 text-sm text-text-muted/70 hover:text-accent transition-colors px-4 py-2.5 rounded-xl hover:bg-accent/5 border border-transparent hover:border-accent/20"
            >
              Ver catálogo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {newestSeries.map((s) => {
              const totalEps = s.seasons.reduce((acc, season) => acc + season.episodes.length, 0);
              const totalDur = s.seasons.reduce((acc, season) =>
                acc + season.episodes.reduce((epAcc, ep) => epAcc + ep.duration, 0), 0);

              return (
                <Link
                  key={s.id}
                  to={`/catalogo/${s.id}`}
                  className="group relative overflow-hidden bg-gradient-to-br from-card/60 to-card/40 backdrop-blur-xl border border-border/60 rounded-2xl p-5 hover:border-accent/40 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/10 hover:-translate-y-1"
                >
                  {/* Cover */}
                  <div className="relative mb-4">
                    <div className="absolute inset-0 bg-accent/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <img
                      src={s.cover}
                      alt={s.title}
                      className="relative w-full aspect-square rounded-xl object-cover shadow-lg group-hover:shadow-xl transition-shadow"
                    />
                    {/* Badge */}
                    <div className="absolute top-2 left-2">
                      {s.isFree ? (
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-green-500/90 text-white backdrop-blur-sm shadow-lg">GRÁTIS</span>
                      ) : (
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-black/70 text-accent backdrop-blur-sm border border-accent/30 shadow-lg">PREMIUM</span>
                      )}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-accent/10 text-accent/80">{s.genre}</span>
                    <span className="text-[10px] text-text-muted/50">{s.year}</span>
                  </div>
                  
                  <h3 className="text-sm font-bold text-text-primary group-hover:text-accent transition-colors truncate mb-2">
                    {s.title}
                  </h3>
                  
                  <p className="text-xs text-text-muted/60 line-clamp-2 mb-4 leading-relaxed">{s.description}</p>
                  
                  {/* Footer */}
                  <div className="flex items-center justify-between text-[10px] text-text-muted/50 pt-3 border-t border-border/40">
                    <div className="flex items-center gap-1">
                      <Play className="w-3 h-3" />
                      <span>{totalEps} eps</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{formatHours(totalDur)}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== POPULAR SECTION ==================== */}
      <section className="px-6 sm:px-8 md:px-12 py-20 scroll-reveal">
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-text-primary">Mais Populares</h2>
                <p className="text-sm text-text-muted/70">As séries com mais conteúdo para maratonar</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {seriesByEpisodes.map((s, index) => {
            const totalEps = s.seasons.reduce((acc, season) => acc + season.episodes.length, 0);
            const totalDur = s.seasons.reduce((acc, season) =>
              acc + season.episodes.reduce((epAcc, ep) => epAcc + ep.duration, 0), 0);
            const progressWidth = (totalEps / maxEpisodes) * 100;

            return (
              <Link
                key={s.id}
                to={`/catalogo/${s.id}`}
                className="group relative overflow-hidden flex items-center gap-5 p-5 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-xl border border-border/50 rounded-2xl hover:border-accent/30 transition-all duration-300 hover:shadow-xl hover:shadow-accent/5 hover:-translate-y-0.5"
              >
                {/* Rank */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="absolute inset-0 bg-accent/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-accent/10 to-purple-500/10 border border-accent/20 flex items-center justify-center">
                      <span className="text-xl font-black text-accent">#{index + 1}</span>
                    </div>
                  </div>
                </div>

                {/* Cover */}
                <div className="relative flex-shrink-0">
                  <img
                    src={s.cover}
                    alt={s.title}
                    className="w-20 h-20 rounded-xl object-cover shadow-lg group-hover:shadow-xl transition-all group-hover:scale-105"
                  />
                  {s.isFree && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center ring-2 ring-card shadow-md">
                      <Zap className="w-2.5 h-2.5 text-white" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-text-primary group-hover:text-accent transition-colors truncate mb-1">
                    {s.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-text-muted/60 mb-3">
                    <span>{s.genre}</span>
                    <span className="text-text-muted/30">•</span>
                    <span>{s.year}</span>
                    <span className="text-text-muted/30">•</span>
                    <span>{totalEps} episódios</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-card/60 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-accent to-purple-500 rounded-full transition-all duration-1000"
                      style={{ width: `${progressWidth}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-text-muted/50 mt-1">{formatHours(totalDur)} de conteúdo</p>
                </div>

                {/* Play Button */}
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-all group-hover:scale-110">
                  <Play className="w-5 h-5 text-accent fill-accent ml-0.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section className="px-6 sm:px-8 md:px-12 py-24 scroll-reveal">
        <div className="relative overflow-hidden rounded-[2rem] border border-accent/25 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 0, 170, 0.12), rgba(170, 0, 255, 0.08), rgba(255, 0, 100, 0.06))',
          }}
        >
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Floating orbs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-orb-1" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/8 rounded-full blur-3xl animate-orb-2" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/6 rounded-full blur-3xl animate-orb-3" />
            
            {/* Grid overlay */}
            <div className="absolute inset-0 opacity-[0.02]" style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }} />

            {/* Floating sound waves */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute bottom-0 rounded-full bg-accent/20"
                style={{
                  left: `${10 + i * 12}%`,
                  width: '3px',
                  height: `${20 + Math.random() * 60}px`,
                  animation: `float ${2 + Math.random() * 2}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>

          {/* Decorative Rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-accent/10 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-purple-500/10 pointer-events-none" />

          <div className="relative z-10 p-10 sm:p-16">
            {/* Icon */}
            <div className="relative inline-block mb-8">
              <div className="absolute -inset-4 bg-accent/20 rounded-3xl blur-2xl animate-glow-pulse" />
              <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-accent/20 to-purple-500/20 border border-accent/30 flex items-center justify-center shadow-2xl shadow-accent/20">
                <Headphones className="w-10 h-10 text-accent" />
              </div>
            </div>

            {/* Features badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
              {[
                { icon: Zap, text: 'Grátis para começar', color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/20' },
                { icon: Crown, text: 'Conteúdo Premium', color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/20' },
                { icon: Sparkles, text: 'Sem compromisso', color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/20' },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${item.bg} border ${item.border}`}
                >
                  <item.icon className={`w-4 h-4 ${item.color}`} />
                  <span className={`text-xs font-semibold ${item.color}`}>{item.text}</span>
                </div>
              ))}
            </div>

            {/* Title */}
            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black text-text-primary mb-4 tracking-tight">
              Comece a ouvir{' '}
              <span className="text-gradient animate-gradient" style={{ backgroundSize: '200% auto' }}>
                agora
              </span>
            </h3>
            
            {/* Description */}
            <p className="text-lg text-text-muted/80 max-w-2xl mx-auto mb-10 leading-relaxed">
              Acesso gratuito a séries incríveis. Faça upgrade quando quiser para desbloquear todo o catálogo e recursos exclusivos.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/subscription"
                className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl text-white text-base font-bold overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-accent/40 hover:-translate-y-1"
                style={{
                  background: 'linear-gradient(135deg, #ff00aa, #aa00ff, #ff00aa)',
                  backgroundSize: '200% auto',
                }}
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Crown className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform" />
                <span className="relative z-10">Ver planos disponíveis</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/catalogo"
                className="group inline-flex items-center gap-3 px-8 py-5 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-xl text-text-primary text-base font-medium hover:bg-card/60 hover:border-accent/30 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/10"
              >
                <Play className="w-5 h-5 text-accent group-hover:scale-110 transition-transform" />
                Explorar grátis
              </Link>
            </div>

            {/* Social proof */}
            <div className="mt-10 flex items-center justify-center gap-4 text-sm text-text-muted/60">
              <div className="flex -space-x-2">
                {['#ff00aa', '#aa00ff', '#00aaff', '#ffaa00'].map((color, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-card flex items-center justify-center text-xs font-bold text-white"
                    style={{ backgroundColor: color }}
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <span>+1.250 ouvintes ativos</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== NEWS SECTION ==================== */}
      <section className="px-6 sm:px-8 md:px-12 py-24 scroll-reveal">
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center shadow-lg shadow-blue-500/10">
                <Newspaper className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-3xl font-black text-text-primary">Novidades</h2>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">Blog</span>
                </div>
                <p className="text-base text-text-muted/70">Fique por dentro do universo NeonCast</p>
              </div>
            </div>
          </div>
          <Link
            to="/news"
            className="group inline-flex items-center gap-2 text-sm font-medium text-text-muted/70 hover:text-accent transition-all px-5 py-3 rounded-xl hover:bg-accent/5 border border-transparent hover:border-accent/20 hover:-translate-y-0.5"
          >
            Ver todas
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestNews.map((article, index) => (
            <Link
              key={article.id}
              to={`/news/${article.slug}`}
              className="group block animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <article className="relative overflow-hidden p-6 rounded-2xl border border-border/50 bg-gradient-to-br from-card/40 to-card/20 backdrop-blur-xl hover:border-blue-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 h-full flex flex-col">
                {/* Category badge */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {index === 0 ? 'Destaque' : index === 1 ? 'Novidade' : 'Comunidade'}
                  </span>
                  <span className="text-xs text-text-muted/50">{article.date}</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-text-primary group-hover:text-blue-400 transition-colors mb-3 line-clamp-2">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-text-muted/70 leading-relaxed line-clamp-3 flex-1">
                  {article.excerpt}
                </p>

                {/* Footer */}
                <div className="mt-4 pt-4 border-t border-border/40 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-[10px] font-bold text-white">
                      {article.author.charAt(0)}
                    </div>
                    <span className="text-xs text-text-muted/60">{article.author}</span>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                    <ArrowRight className="w-4 h-4 text-blue-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* ==================== FOOTER SPACER ==================== */}
      <div className="h-8" />
    </main>
  );
}
