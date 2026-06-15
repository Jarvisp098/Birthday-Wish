import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
// @ts-ignore
import birthdayMusic from '../assets/sound/birthdaymusic.mp3';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element for birthday music
    const audio = new Audio(birthdayMusic);
    audio.loop = true;
    audio.volume = 0.45; // Pleasant background volume
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const handleToggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn('Playback failed:', err);
      });
    }
  };

  return (
    <div id="ambient-music-player" className="fixed bottom-6 right-6 z-40 bg-black/80 hover:bg-black/95 text-white p-3 rounded-full border border-neutral-800 shadow-[0_4px_12px_rgba(0,0,0,0.5)] flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110">
      <button
        onClick={handleToggle}
        className="text-white hover:text-red-500 transition-colors border-none outline-none bg-transparent flex items-center justify-center"
        aria-label="Toggle Special Birthday Background Music"
        title="Toggle Special Birthday Background Music"
        style={{ minHeight: '38px', minWidth: '38px' }}
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 text-red-500 animate-pulse" />
        ) : (
          <VolumeX className="w-5 h-5 text-gray-400" />
        )}
      </button>
    </div>
  );
}
