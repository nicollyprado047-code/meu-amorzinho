import { useEffect, useRef, useState, useCallback } from 'react';
import { Play, Pause, Music2, Volume2, VolumeX } from 'lucide-react';
import { MUSIC_SRC, MUSIC_VOLUME } from '@/config';

interface MusicPlayerProps {
  shouldPlay: boolean;
}

/**
 * Fixed bottom-corner music player with play/pause, volume, and animated bars.
 * Audio element is created once and controlled via ref.
 * Music starts only after user interaction (browser policy compliant).
 */
export default function MusicPlayer({ shouldPlay }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(MUSIC_VOLUME);
  const [isMuted, setIsMuted] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const audio = new Audio(MUSIC_SRC);
    audio.loop = true;
    audio.volume = MUSIC_VOLUME;
    audio.preload = 'auto';
    audioRef.current = audio;

    const onCanPlay = () => setReady(true);
    audio.addEventListener('canplaythrough', onCanPlay);

    return () => {
      audio.removeEventListener('canplaythrough', onCanPlay);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  // External play trigger (from intro button)
  useEffect(() => {
    if (shouldPlay && ready) {
      startPlayback();
    }
  }, [shouldPlay, ready]);

  const startPlayback = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      // Autoplay blocked — wait for manual toggle
      setIsPlaying(false);
    }
  }, []);

  const togglePlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    }
  }, [isPlaying]);

  const handleVolumeChange = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      setVolume(ratio);
      setIsMuted(ratio === 0);
      if (audioRef.current) {
        audioRef.current.volume = ratio;
        audioRef.current.muted = ratio === 0;
      }
    },
    []
  );

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isMuted || volume === 0) {
      const v = volume || MUSIC_VOLUME;
      audio.volume = v;
      audio.muted = false;
      setVolume(v);
      setIsMuted(false);
    } else {
      audio.muted = true;
      setIsMuted(true);
    }
  }, [isMuted, volume]);

  return (
    <div className="fixed bottom-5 right-5 z-50 select-none">
      <div
        className="glass rounded-2xl flex items-center gap-3 px-4 py-3 transition-all duration-500"
        style={{ animation: 'fadeIn 1s ease forwards' }}
      >
        {/* Music icon + animated bars */}
        <div className="flex items-center gap-2">
          <Music2
            size={18}
            className="text-luminous transition-transform duration-500"
            style={{
              animation: isPlaying ? 'breath 2s ease-in-out infinite' : 'none',
            }}
          />
          {isPlaying && (
            <div className="flex items-end gap-[2px] h-4" aria-hidden="true">
              <span className="music-bar" style={{ height: '4px' }} />
              <span className="music-bar" style={{ height: '4px' }} />
              <span className="music-bar" style={{ height: '4px' }} />
              <span className="music-bar" style={{ height: '4px' }} />
            </div>
          )}
        </div>

        {/* Play / Pause */}
        <button
          onClick={togglePlay}
          className="relative w-9 h-9 rounded-full flex items-center justify-center btn-glow luminous-border"
          aria-label={isPlaying ? 'Pausar música' : 'Tocar música'}
        >
          <span className="absolute inset-0 rounded-full bg-night-700/60" />
          {isPlaying ? (
            <Pause size={15} className="text-luminous-soft relative z-10" fill="currentColor" />
          ) : (
            <Play size={15} className="text-luminous-soft relative z-10 ml-[1px]" fill="currentColor" />
          )}
        </button>

        {/* Volume */}
        <div
          className="relative flex items-center"
          onMouseEnter={() => setShowVolume(true)}
          onMouseLeave={() => setShowVolume(false)}
        >
          <button
            onClick={toggleMute}
            className="w-8 h-8 rounded-full flex items-center justify-center text-luminous-soft/70 hover:text-luminous-soft transition-colors"
            aria-label={isMuted ? 'Ativar som' : 'Silenciar'}
          >
            {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>

          {/* Volume slider */}
          <div
            className={`overflow-hidden transition-all duration-300 ${
              showVolume ? 'w-20 opacity-100' : 'w-0 opacity-0'
            }`}
          >
            <div
              onClick={handleVolumeChange}
              className="relative h-1.5 w-16 rounded-full bg-night-600/80 cursor-pointer ml-1"
              role="slider"
              aria-label="Volume"
              aria-valuenow={Math.round(volume * 100)}
            >
              <div
                className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-luminous-dim to-luminous-soft"
                style={{ width: `${isMuted ? 0 : volume * 100}%` }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-luminous-soft shadow-[0_0_8px_rgba(168,208,255,0.6)] transition-transform"
                style={{
                  left: `calc(${isMuted ? 0 : volume * 100}% - 5px)`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
