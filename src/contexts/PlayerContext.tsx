// ============================================================
// Player Context - Gerencia o estado global do player de áudio
// ============================================================
import { createContext, useContext, useState, useRef, useCallback, useEffect, type ReactNode } from 'react';

export interface TrackInfo {
  id: string;
  title: string;
  seriesTitle: string;
  seriesId: string;
  audioUrl: string;
  cover: string;
  duration: number;
}

interface PlayerContextType {
  currentTrack: TrackInfo | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  play: (track: TrackInfo) => void;
  togglePlay: () => void;
  pause: () => void;
  seek: (time: number) => void;
  setVolume: (vol: number) => void;
  playNext: () => void;
  playPrev: () => void;
  queue: TrackInfo[];
  setQueue: (queue: TrackInfo[]) => void;
}

const PlayerContext = createContext<PlayerContextType | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrack, setCurrentTrack] = useState<TrackInfo | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.8);
  const [queue, setQueue] = useState<TrackInfo[]>([]);

  // Inicializa o elemento de áudio
  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio();
      audio.volume = volume;
      audioRef.current = audio;

      const handleTimeUpdate = () => {
        setCurrentTime(audio.currentTime);
      };

      const handleLoadedMetadata = () => {
        setDuration(audio.duration);
      };

      const handleEnded = () => {
        setIsPlaying(false);
        // Auto-play next
        if (queue.length > 0) {
          const currentIndex = queue.findIndex(t => t.id === currentTrack?.id);
          const nextIndex = (currentIndex + 1) % queue.length;
          if (nextIndex !== currentIndex) {
            play(queue[nextIndex]);
          }
        }
      };

      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('ended', handleEnded);

      return () => {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('ended', handleEnded);
        audio.pause();
        audio.src = '';
      };
    }
  }, []);

  // Update volume when volume state changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const play = useCallback((track: TrackInfo) => {
    if (!audioRef.current) return;

    setCurrentTrack(track);
    audioRef.current.src = track.audioUrl;
    audioRef.current.play();
    setIsPlaying(true);
  }, []);

  const togglePlay = useCallback(() => {
    if (!audioRef.current || !currentTrack) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying, currentTrack]);

  const pause = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  }, []);

  const seek = useCallback((time: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  }, []);

  const setVolume = useCallback((vol: number) => {
    setVolumeState(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
  }, []);

  const playNext = useCallback(() => {
    if (queue.length === 0) return;
    const currentIndex = queue.findIndex(t => t.id === currentTrack?.id);
    const nextIndex = (currentIndex + 1) % queue.length;
    play(queue[nextIndex]);
  }, [queue, currentTrack, play]);

  const playPrev = useCallback(() => {
    if (queue.length === 0) return;
    const currentIndex = queue.findIndex(t => t.id === currentTrack?.id);
    const prevIndex = currentIndex <= 0 ? queue.length - 1 : currentIndex - 1;
    play(queue[prevIndex]);
  }, [queue, currentTrack, play]);

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        currentTime,
        duration,
        volume,
        play,
        togglePlay,
        pause,
        seek,
        setVolume,
        playNext,
        playPrev,
        queue,
        setQueue,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
}
