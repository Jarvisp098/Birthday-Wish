import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play } from 'lucide-react';
// @ts-ignore
import introSound from '../assets/sound/Netflixintro.mp3';

interface NetflixIntroProps {
  onComplete: () => void;
}

export default function NetflixIntro({ onComplete }: NetflixIntroProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [letterSpacing, setLetterSpacing] = useState('tracking-[0.1em]');
  const [scale, setScale] = useState(1);
  const [isDone, setIsDone] = useState(false);

  // Play the custom uploaded sound file
  const playTaDum = () => {
    try {
      const audio = new Audio(introSound);
      audio.volume = 0.95;
      audio.play().catch((err) => {
        console.warn("Audio autoplay blocked or failed:", err);
      });
    } catch (err) {
      console.warn("Audio element failed to load:", err);
    }
  };

  const startIntro = () => {
    setIsPlaying(true);
    // Slight delay before Ta-dum to build suspense
    setTimeout(() => {
      setShowLogo(true);
      playTaDum();
    }, 500);
  };

  useEffect(() => {
    if (showLogo) {
      // Step-by-step classic intro tracking/scale expansion
      const spacingTimer = setTimeout(() => {
        setLetterSpacing('tracking-[1.5em] md:tracking-[2.2em]');
      }, 100);

      const scaleTimer = setTimeout(() => {
        setScale(1.6);
      }, 800);

      const doneTimer = setTimeout(() => {
        setIsDone(true);
      }, 3000);

      const completeTimer = setTimeout(() => {
        onComplete();
      }, 3600);

      return () => {
        clearTimeout(spacingTimer);
        clearTimeout(scaleTimer);
        clearTimeout(doneTimer);
        clearTimeout(completeTimer);
      };
    }
  }, [showLogo, onComplete]);

  return (
    <div id="loveflix-intro-container" className="fixed inset-0 bg-[#070707] z-50 flex items-center justify-center overflow-hidden">
      {/* Background scanline retro aesthetic overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,15,15,0.7)_0%,rgba(0,0,0,1)_100%)] z-10 pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-10 pointer-events-none" />

      <AnimatePresence mode="wait">
        {!isPlaying ? (
          // Dynamic vintage starting button landing card
          <motion.div
            key="start-card"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            className="z-20 text-center flex flex-col items-center px-4"
          >
            <h1 className="text-[#E50914] text-5xl md:text-7xl font-sans font-black tracking-tighter mb-2 drop-shadow-[0_0_20px_rgba(229,1,1,0.3)]">
              LOVEFLIX
            </h1>
            <p className="text-gray-400 font-sans tracking-widest text-xs uppercase mb-12">
              A Special Birthday Release • June 15th
            </p>

            <button
              id="start-loveflix-btn"
              onClick={startIntro}
              style={{ minHeight: '44px', minWidth: '180px' }}
              className="relative px-8 py-3 bg-[#E50914] hover:bg-[#ff1521] text-white font-sans font-semibold text-sm rounded shadow-[0_5px_15px_rgba(229,9,20,0.4)] flex items-center justify-center space-x-2 transition-all hover:scale-105 active:scale-95 duration-200 group border-none outline-none cursor-pointer"
            >
              <Play className="w-4 h-4 text-white fill-white transition-transform group-hover:scale-110" />
              <span className="tracking-wide">ENTER UNIVERSE</span>
            </button>
            
            <p className="text-gray-500 font-mono text-[10px] mt-6 italic">
              * Turn your volume up for full cinematic effect
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="intro-animation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="z-20 flex flex-col items-center justify-center w-full"
          >
            {showLogo && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: isDone ? 0 : 1, 
                  scale: scale,
                  filter: isDone ? 'blur(15px)' : 'blur(0px)'
                }}
                transition={{ 
                  duration: isDone ? 0.6 : 3.0, 
                  ease: [0.11, 0, 0.22, 1] 
                }}
                className="text-center select-none"
              >
                {/* Custom glowing layered text replicating Netflix Red */}
                <h2 
                  className={`text-[#E50914] font-sans font-black text-6xl md:text-[8.5rem] leading-none transition-all duration-[2.2s] ease-[cubic-bezier(0.1,0,0.1,1)] select-none uppercase drop-shadow-[0_0_55px_rgba(229,9,20,0.8)] ${letterSpacing}`}
                  style={{
                    textShadow: '0 0 20px rgba(229, 9, 20, 0.4), 0 0 40px rgba(229, 9, 20, 0.2)',
                    display: 'inline-block'
                  }}
                >
                  LOVEFLIX
                </h2>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
