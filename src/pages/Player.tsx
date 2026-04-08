// ============================================================
// Player Page - Premium Design with Vinyl Effect
// ============================================================
import { useNavigate } from 'react-router-dom';
import { formatDuration } from '../data/data';
import { usePlayer } from '../contexts/PlayerContext';
import {
  Play, Pause, SkipForward, SkipBack, ChevronDown,
  Volume2, VolumeX, ListMusic, Heart, Shuffle, Repeat,
  Disc3,
} from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useFavorites } from '../hooks/useFavorites';
import { series } from '../data/data';

export default function Player() {
  const {
    currentTrack, isPlaying, currentTime, duration, volume,
    togglePlay, playNext, playPrev, seek, setVolume, queue, setQueue, play,
  } = usePlayer();
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [isMuted, setIsMuted] = useState(false);
  const [showQueue, setShowQueue] = useState(false);
  const [showEpisodes, setShowEpisodes] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('off');
  const [isDragging, setIsDragging] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hoverProgress, setHoverProgress] = useState<number | null>(null);
  const [showTimeTooltip, setShowTimeTooltip] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef(false);
  const vinylRotationRef = useRef(0);
  const animationFrameRef = useRef<number>(undefined);

  // Get current series and episodes
  const currentSeries = currentTrack ? series.find(s => s.id === currentTrack.seriesId) : null;
  const allEpisodes = currentSeries ? currentSeries.seasons.flatMap(season => 
    season.episodes.map(ep => ({ ...ep, seasonNumber: season.number }))
  ) : [];
  const currentEpisodeIndex = currentTrack ? allEpisodes.findIndex(ep => ep.id === currentTrack.id) : -1;

  useEffect(() => {
    if (volume > 0 && isMuted) setIsMuted(false);
  }, [volume, isMuted]);

  useEffect(() => {
    if (currentTrack?.cover) {
      const img = new Image();
      img.src = currentTrack.cover;
      img.onload = () => setImageLoaded(true);
    }
  }, [currentTrack?.cover]);

  // Vinyl rotation animation
  useEffect(() => {
    const animateVinyl = () => {
      if (isPlaying) {
        vinylRotationRef.current = (vinylRotationRef.current + 0.5) % 360;
      }
      animationFrameRef.current = requestAnimationFrame(animateVinyl);
    };
    
    if (isPlaying) {
      animationFrameRef.current = requestAnimationFrame(animateVinyl);
    }
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowQueue(false);
        setShowEpisodes(false);
      }
      if (e.key === ' ' && currentTrack) {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlay, currentTrack]);

  const handlePlayEpisode = useCallback((episodeId: string) => {
    if (!currentSeries) return;
    const episode = allEpisodes.find(ep => ep.id === episodeId);
    if (!episode) return;
    
    const track = {
      id: episode.id,
      title: episode.title,
      seriesTitle: currentSeries.title,
      seriesId: currentSeries.id,
      audioUrl: episode.audioUrl,
      cover: currentSeries.cover,
      duration: episode.duration,
    };
    
    // Add all episodes to queue
    const queueTracks = allEpisodes.map(ep => ({
      id: ep.id,
      title: ep.title,
      seriesTitle: currentSeries.title,
      seriesId: currentSeries.id,
      audioUrl: ep.audioUrl,
      cover: currentSeries.cover,
      duration: ep.duration,
    }));
    
    setQueue(queueTracks);
    play(track);
    setShowEpisodes(false);
  }, [currentSeries, allEpisodes, setQueue, play]);

  const handleToggleMute = () => {
    if (isMuted) {
      setVolume(volume);
      setIsMuted(false);
    } else {
      setVolume(0);
      setIsMuted(true);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    seek((x / rect.width) * duration);
  };

  const handleProgressHover = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = x / rect.width;
    setHoverProgress(percent * duration);
  }, [duration]);

  const handleRepeatChange = () => {
    const modes: Array<'off' | 'all' | 'one'> = ['off', 'all', 'one'];
    const idx = modes.indexOf(repeatMode);
    setRepeatMode(modes[(idx + 1) % modes.length]);
  };

  const VolumeIcon = isMuted || volume === 0 ? VolumeX : Volume2;

  if (!currentTrack) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center px-4 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent animate-pulse" />
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-[100px] animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/3 rounded-full blur-[80px] animate-float-delayed" />
        </div>

        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 text-text-muted/50 hover:text-text-primary hover:bg-white/5 p-2 rounded-xl transition-all"
        >
          <ChevronDown className="w-5 h-5 rotate-90" />
        </button>

        <div className="text-center relative z-10 max-w-md">
          <div className="relative mb-8">
            <div className="w-32 h-32 rounded-full bg-card/50 border border-border/50 flex items-center justify-center mx-auto shadow-2xl shadow-accent/10">
              <ListMusic className="w-12 h-12 text-text-muted/30" />
            </div>
            <div className="absolute inset-0 w-32 h-32 mx-auto rounded-full border border-accent/20 animate-pulse-glow" />
          </div>
          
          <h2 className="text-2xl font-bold text-text-primary mb-3 neon-text">Nenhuma faixa reproduzindo</h2>
          <p className="text-sm text-text-muted/60 mb-8 max-w-xs mx-auto leading-relaxed">
            Escolha uma série do catálogo para começar a ouvir
          </p>
          <button
            onClick={() => navigate('/catalogo')}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-accent to-accent/80 text-white text-sm font-medium hover:shadow-lg hover:shadow-accent/30 transition-all hover:scale-105 active:scale-95"
          >
            Explorar catálogo
          </button>
        </div>
      </div>
    );
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const isFav = isFavorite(currentTrack.seriesId || '');
  const currentIndex = queue.findIndex(q => q.id === currentTrack.id);
  const upcomingQueue = queue.slice(Math.max(0, currentIndex + 1), currentIndex + 6);

  return (
    <div className="min-h-screen bg-bg flex flex-col relative overflow-hidden">
      {/* Premium background effect */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={currentTrack.cover}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover blur-[120px] scale-110 transition-opacity duration-1000 ${imageLoaded ? 'opacity-10' : 'opacity-0'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/90 via-bg/95 to-bg" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent/5 rounded-full blur-[150px]" />
      </div>

      {/* Top Bar */}
      <div className="relative z-20 flex items-center justify-between px-4 sm:px-6 py-4">
        <button
          onClick={() => navigate(-1)}
          className="group w-10 h-10 rounded-xl flex items-center justify-center text-text-muted/50 hover:text-text-primary hover:bg-white/5 transition-all"
        >
          <ChevronDown className="w-5 h-5 rotate-90 transition-transform group-hover:-translate-x-0.5" />
        </button>

        <div className="flex flex-col items-center px-4">
          <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold animate-neon-pulse">
            Tocando agora
          </span>
          <span className="text-xs text-text-muted/60 truncate max-w-[200px] mt-1">
            {currentTrack.seriesTitle}
          </span>
        </div>

        <div className="w-10" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 pb-8">
        {/* Vinyl Cover Art */}
        <div className="relative mb-10">
          {/* Vinyl record effect */}
          <div className="relative">
            {/* Outer vinyl disc */}
            <div 
              className={`w-72 h-72 sm:w-80 sm:h-80 rounded-full transition-all duration-700 ${
                isPlaying ? 'shadow-2xl shadow-accent/20' : 'shadow-xl shadow-black/30'
              }`}
              style={{
                background: isPlaying 
                  ? 'radial-gradient(circle at 30% 30%, #1a1a1a, #0a0a0a, #000)'
                  : 'radial-gradient(circle at 30% 30%, #151515, #080808, #000)',
                transform: `rotate(${vinylRotationRef.current}deg)`,
              }}
            >
              {/* Vinyl grooves */}
              <div className="absolute inset-3 rounded-full border-2 border-white/5" />
              <div className="absolute inset-6 rounded-full border border-white/5" />
              <div className="absolute inset-9 rounded-full border border-white/5" />
              <div className="absolute inset-12 rounded-full border border-white/5" />
              <div className="absolute inset-16 rounded-full border border-white/5" />
              
              {/* Center label with cover art */}
              <div className="absolute inset-[22%] rounded-full overflow-hidden border-2 border-accent/30 shadow-lg shadow-accent/10">
                <img
                  src={currentTrack.cover}
                  alt={currentTrack.title}
                  className="w-full h-full object-cover"
                  onLoad={() => setImageLoaded(true)}
                  style={{ transform: `rotate(${-vinylRotationRef.current}deg)` }}
                />
              </div>
              
              {/* Center hole */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-bg border border-white/10" />
            </div>
            
            {/* Glow ring when playing */}
            {isPlaying && (
              <div className="absolute inset-0 rounded-full animate-glow-ring" />
            )}
          </div>
        </div>

        {/* Track Info */}
        <div className="text-center mb-8 w-full max-w-sm">
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2 tracking-tight">
            {currentTrack.title}
          </h1>
          <p className="text-sm text-text-muted/60 font-medium">{currentTrack.seriesTitle}</p>
        </div>

        {/* Premium Progress Bar */}
        <div className="w-full max-w-sm mb-3 group">
          <div
            ref={progressRef}
            className="relative w-full h-2 bg-white/5 rounded-full cursor-pointer overflow-hidden"
            onClick={handleProgressClick}
            onMouseDown={() => { dragRef.current = true; setIsDragging(true); }}
            onMouseUp={() => { dragRef.current = false; setIsDragging(false); }}
            onMouseMove={(e) => {
              handleProgressHover(e);
              if (dragRef.current && progressRef.current) {
                const rect = progressRef.current.getBoundingClientRect();
                const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
                seek((x / rect.width) * duration);
              }
            }}
            onMouseEnter={() => setShowTimeTooltip(true)}
            onMouseLeave={() => { setShowTimeTooltip(false); setHoverProgress(null); }}
          >
            {/* Background glow */}
            <div className="absolute inset-0 bg-accent/5 rounded-full blur-sm" />
            
            {/* Progress fill */}
            <div
              className="h-full rounded-full relative transition-all duration-75 overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              {/* Gradient fill */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent via-accent to-accent/80" />
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.3)_50%,transparent_100%)] animate-shimmer" />
              
              {/* Thumb */}
              <div
                className={`absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-white shadow-lg shadow-accent/30 transition-all ${
                  isDragging ? 'w-4 h-4 scale-110' : 'w-0 h-0 group-hover:w-4 group-hover:h-4'
                }`}
              />
            </div>
            
            {/* Time tooltip */}
            {showTimeTooltip && hoverProgress !== null && (
              <div
                className="absolute -top-8 bg-card/90 backdrop-blur-sm border border-border/50 px-2 py-1 rounded-md text-[10px] font-mono text-text-primary transform -translate-x-1/2 pointer-events-none"
                style={{ left: `${(hoverProgress / duration) * 100}%` }}
              >
                {formatDuration(Math.floor(hoverProgress))}
              </div>
            )}
          </div>
        </div>

        {/* Time Display */}
        <div className="w-full max-w-sm flex justify-between text-xs text-text-muted/50 mb-10 font-mono">
          <span className="tabular-nums">{formatDuration(Math.floor(currentTime))}</span>
          <span className="tabular-nums text-text-muted/40">-{formatDuration(Math.max(0, Math.floor(duration - currentTime)))}</span>
        </div>

        {/* Premium Controls */}
        <div className="flex items-center gap-3 sm:gap-5 mb-10">
          {/* Shuffle */}
          <button
            onClick={() => setIsShuffle(!isShuffle)}
            className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 ${
              isShuffle 
                ? 'text-accent bg-accent/15 shadow-lg shadow-accent/20' 
                : 'text-text-muted/30 hover:text-text-muted/60 hover:bg-white/5'
            }`}
          >
            <Shuffle className="w-4 h-4" />
          </button>

          {/* Previous */}
          <button
            onClick={playPrev}
            className="w-14 h-14 rounded-xl flex items-center justify-center text-text-secondary/70 hover:text-text-primary hover:bg-white/5 transition-all hover:scale-105 active:scale-90"
          >
            <SkipBack className="w-5 h-5" />
          </button>

          {/* Play/Pause */}
          <button
            onClick={togglePlay}
            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent via-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 flex items-center justify-center text-white transition-all hover:shadow-2xl hover:shadow-accent/30 active:scale-[0.97] group relative overflow-hidden"
          >
            {/* Inner glow */}
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            {isPlaying ? (
              <Pause className="w-8 h-8 fill-current relative z-10" />
            ) : (
              <Play className="w-8 h-8 fill-current ml-1 relative z-10" />
            )}
          </button>

          {/* Next */}
          <button
            onClick={playNext}
            className="w-14 h-14 rounded-xl flex items-center justify-center text-text-secondary/70 hover:text-text-primary hover:bg-white/5 transition-all hover:scale-105 active:scale-90"
          >
            <SkipForward className="w-5 h-5" />
          </button>

          {/* Repeat */}
          <button
            onClick={handleRepeatChange}
            className={`relative w-11 h-11 rounded-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 ${
              repeatMode !== 'off' 
                ? 'text-accent bg-accent/15 shadow-lg shadow-accent/20' 
                : 'text-text-muted/30 hover:text-text-muted/60 hover:bg-white/5'
            }`}
          >
            <Repeat className="w-4 h-4" />
            {repeatMode === 'one' && (
              <span className="absolute -top-1 -right-0.5 text-[7px] font-bold text-accent bg-bg rounded-full w-3.5 h-3.5 flex items-center justify-center border border-accent/30">
                1
              </span>
            )}
          </button>
        </div>

        {/* Action Buttons (Favorite & Episodes) */}
        <div className="flex items-center gap-3 mb-6">
          {/* Favorite */}
          <button
            onClick={() => toggleFavorite(currentTrack.seriesId || '')}
            className={`group flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
              isFav 
                ? 'text-accent bg-accent/10 border border-accent/20' 
                : 'text-text-muted/50 bg-white/5 border border-border/30 hover:text-accent hover:border-accent/20'
            }`}
          >
            <Heart className={`w-4 h-4 transition-all ${isFav ? 'fill-accent' : ''}`} />
            <span className="text-xs font-medium">{isFav ? 'Favoritado' : 'Favoritar'}</span>
          </button>

          {/* Episodes */}
          {currentSeries && (
            <button
              onClick={() => setShowEpisodes(!showEpisodes)}
              className={`group flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
                showEpisodes 
                  ? 'text-accent bg-accent/10 border border-accent/20' 
                  : 'text-text-muted/50 bg-white/5 border border-border/30 hover:text-accent hover:border-accent/20'
              }`}
            >
              <Disc3 className="w-4 h-4" />
              <span className="text-xs font-medium">Episódios</span>
              <span className="text-[10px] text-text-muted/40">({allEpisodes.length})</span>
            </button>
          )}
        </div>

        {/* Volume Control */}
        <div className="w-full max-w-xs group">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-border/30 hover:border-accent/20 transition-all">
            <button
              onClick={handleToggleMute}
              className="text-text-muted/50 hover:text-text-primary transition-colors flex-shrink-0 p-1"
            >
              <VolumeIcon className="w-4 h-4" />
            </button>
            <div className="flex-1 relative">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={(e) => { setVolume(parseFloat(e.target.value)); setIsMuted(false); }}
                className="w-full accent-accent"
              />
              {/* Volume bar background glow */}
              <div className="absolute inset-0 bg-accent/5 rounded-full blur-sm pointer-events-none" />
            </div>
            <span className="text-xs text-text-muted/50 tabular-nums w-10 text-right font-mono group-hover:text-text-muted/70 transition-colors">
              {Math.round((isMuted ? 0 : volume) * 100)}%
            </span>
          </div>
        </div>

        {/* Queue Toggle */}
        {queue.length > 1 && (
          <button
            onClick={() => setShowQueue(!showQueue)}
            className={`mt-6 flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-medium transition-all hover:scale-105 active:scale-95 ${
              showQueue 
                ? 'bg-accent/15 text-accent border border-accent/30 shadow-lg shadow-accent/10' 
                : 'bg-white/5 text-text-muted/50 hover:text-text-muted/70 hover:bg-white/10 border border-border/30'
            }`}
          >
            <ListMusic className="w-4 h-4" />
            Fila ({queue.length})
          </button>
        )}
      </div>

      {/* Queue Drawer */}
      {showQueue && (
        <div className="fixed inset-0 z-30 flex items-end">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowQueue(false)} />
          <div className="relative w-full bg-card/95 backdrop-blur-xl border-t border-border/40 rounded-t-2xl max-h-[60vh] flex flex-col animate-slide-up">
            {/* Handle */}
            <div className="flex justify-center py-3">
              <div className="w-8 h-1 rounded-full bg-white/15" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 pb-3 border-b border-border/40">
              <div>
                <h3 className="text-sm font-semibold text-text-primary">Fila de reprodução</h3>
                <p className="text-[10px] text-text-muted/50">{queue.length} episódios</p>
              </div>
              <button
                onClick={() => setShowQueue(false)}
                className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-text-muted/50 hover:text-white"
              >
                <ChevronDown className="w-3.5 h-3.5 rotate-180" />
              </button>
            </div>

            {/* Queue List */}
            <div className="flex-1 overflow-y-auto py-3 px-4">
              {/* Currently playing */}
              <div className="flex items-center gap-3 px-3 py-2.5 bg-accent/5 rounded-xl border border-accent/10 mb-2">
                <img src={currentTrack.cover} alt="" className="w-9 h-9 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-accent truncate">{currentTrack.title}</p>
                  <p className="text-[10px] text-text-muted/50 truncate">{currentTrack.seriesTitle}</p>
                </div>
                <div className="flex gap-[2px] items-end h-3">
                  {[0, 1, 2].map(i => (
                    <div key={i} className="w-[2px] bg-accent rounded-full animate-pulse" style={{ height: `${6 + i * 2}px`, animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>

              {/* Upcoming */}
              {upcomingQueue.length > 0 ? (
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-text-muted/30 px-3 mb-2 font-semibold">A seguir</p>
                  <div className="space-y-0.5">
                    {upcomingQueue.map((track, i) => (
                      <div
                        key={track.id}
                        className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group"
                      >
                        <span className="text-[10px] text-text-muted/25 w-4 text-center">{i + 1}</span>
                        <img src={track.cover} alt="" className="w-8 h-8 rounded-md object-cover flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-text-secondary truncate group-hover:text-text-primary">{track.title}</p>
                          <p className="text-[9px] text-text-muted/35 truncate">{track.seriesTitle}</p>
                        </div>
                        <span className="text-[10px] text-text-muted/25">{formatDuration(track.duration)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <ListMusic className="w-8 h-8 text-text-muted/15 mx-auto mb-2" />
                  <p className="text-xs text-text-muted/40">Fila vazia</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Episodes Drawer */}
      {showEpisodes && currentSeries && (
        <div className="fixed inset-0 z-30 flex items-end">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowEpisodes(false)} />
          <div className="relative w-full bg-card/95 backdrop-blur-xl border-t border-border/40 rounded-t-2xl max-h-[70vh] flex flex-col animate-slide-up">
            {/* Handle */}
            <div className="flex justify-center py-3">
              <div className="w-8 h-1 rounded-full bg-white/15" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 pb-4 border-b border-border/40">
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-text-primary">Episódios</h3>
                <p className="text-[10px] text-text-muted/50">{currentSeries.title} • {allEpisodes.length} episódios</p>
              </div>
              <button
                onClick={() => setShowEpisodes(false)}
                className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-text-muted/50 hover:text-white"
              >
                <ChevronDown className="w-3.5 h-3.5 rotate-180" />
              </button>
            </div>

            {/* Episodes List */}
            <div className="flex-1 overflow-y-auto py-3 px-4">
              {currentSeries.seasons.map((season) => (
                <div key={season.number} className="mb-6 last:mb-0">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-px flex-1 bg-border/40" />
                    <h4 className="text-[10px] uppercase tracking-wider text-accent/70 font-semibold">
                      Temporada {season.number}
                    </h4>
                    <div className="h-px flex-1 bg-border/40" />
                  </div>
                  
                  <div className="space-y-1">
                    {season.episodes.map((episode, idx) => {
                      const isCurrentEpisode = currentTrack?.id === episode.id;
                      const seasonEpisodeIndex = allEpisodes.findIndex(ep => ep.id === episode.id);
                      
                      return (
                        <button
                          key={episode.id}
                          onClick={() => handlePlayEpisode(episode.id)}
                          className={`w-full flex items-center gap-3 py-2.5 px-3 rounded-xl transition-all group ${
                            isCurrentEpisode
                              ? 'bg-accent/10 border border-accent/20'
                              : 'hover:bg-white/5 border border-transparent'
                          }`}
                        >
                          {/* Episode Number */}
                          <div className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center bg-white/5 group-hover:bg-white/10 transition-colors">
                            {isCurrentEpisode ? (
                              <div className="flex gap-[1.5px] items-end h-3">
                                {[0, 1, 2].map(i => (
                                  <div 
                                    key={i} 
                                    className="w-[2px] bg-accent rounded-full animate-pulse" 
                                    style={{ height: `${5 + i * 2}px`, animationDelay: `${i * 0.15}s` }} 
                                  />
                                ))}
                              </div>
                            ) : (
                              <span className="text-[10px] text-text-muted/40 font-medium">{idx + 1}</span>
                            )}
                          </div>

                          {/* Episode Info */}
                          <div className="flex-1 min-w-0 text-left">
                            <p className={`text-xs font-medium truncate ${
                              isCurrentEpisode ? 'text-accent' : 'text-text-secondary group-hover:text-text-primary'
                            }`}>
                              {episode.title}
                            </p>
                            <p className="text-[9px] text-text-muted/35">
                              {episode.isFree ? 'Gratuito' : 'Premium'}
                            </p>
                          </div>

                          {/* Duration */}
                          <span className="text-[10px] text-text-muted/30 tabular-nums flex-shrink-0">
                            {formatDuration(episode.duration)}
                          </span>

                          {/* Play Icon */}
                          <Play className={`w-3.5 h-3.5 flex-shrink-0 transition-all ${
                            isCurrentEpisode 
                              ? 'text-accent fill-accent' 
                              : 'text-text-muted/20 opacity-0 group-hover:opacity-100'
                          }`} />
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up { animation: slide-up 0.35s cubic-bezier(0.16, 1, 0.3, 1); }
        
        @keyframes pulse-bars {
          0%, 100% { height: 4px; }
          50% { height: 12px; }
        }
        .animate-pulse-bars {
          animation: pulse-bars 0.8s ease-in-out infinite;
        }
        
        @keyframes neon-glow {
          0%, 100% { 
            text-shadow: 0 0 8px rgba(255, 0, 170, 0.6), 0 0 20px rgba(255, 0, 170, 0.3);
          }
          50% { 
            text-shadow: 0 0 12px rgba(255, 0, 170, 0.8), 0 0 30px rgba(255, 0, 170, 0.5);
          }
        }
        .animate-neon-pulse {
          animation: neon-glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
