import { useState } from 'react';
import { motion } from 'motion/react';
import { Play, Info, Award } from 'lucide-react';
import { HERO_MOVIE } from '../data';
import { Movie } from '../types';

interface HomeBillboardProps {
  onPlayClick: (movie: Movie) => void;
  onInfoClick: (movie: Movie) => void;
  profileName: string;
}

interface FilterSettings {
  preset: string;
  brightness: number;
  saturation: number;
  contrast: number;
  vignette: number;
  blendMode: 'normal' | 'multiply' | 'color-burn' | 'overlay';
  fitMode: 'contain' | 'cover';
  position: 'right' | 'center' | 'left';
}

const DEFAULT_FILTERS: FilterSettings = {
  preset: 'cinema-dark',
  brightness: 80,
  saturation: 90,
  contrast: 100,
  vignette: 45,
  blendMode: 'normal',
  fitMode: 'contain',
  position: 'right'
};

const PRESETS: Record<string, Partial<FilterSettings>> = {
  'cinema-dark': {
    preset: 'cinema-dark',
    brightness: 85,
    saturation: 90,
    contrast: 100,
    vignette: 45,
    blendMode: 'normal'
  },
  'crimson-warm': {
    preset: 'crimson-warm',
    brightness: 50,
    saturation: 90,
    contrast: 110,
    vignette: 90,
    blendMode: 'color-burn'
  },
  'nordic-cool': {
    preset: 'nordic-cool',
    brightness: 58,
    saturation: 60,
    contrast: 95,
    vignette: 75,
    blendMode: 'overlay'
  },
  'vivid-dream': {
    preset: 'vivid-dream',
    brightness: 65,
    saturation: 125,
    contrast: 115,
    vignette: 65,
    blendMode: 'normal'
  },
  'noir-classic': {
    preset: 'noir-classic',
    brightness: 50,
    saturation: 0,
    contrast: 125,
    vignette: 95,
    blendMode: 'normal'
  },
  'raw-native': {
    preset: 'raw-native',
    brightness: 100,
    saturation: 100,
    contrast: 100,
    vignette: 0,
    blendMode: 'normal'
  }
};

export default function HomeBillboard({ onPlayClick, onInfoClick, profileName }: HomeBillboardProps) {
  const [filters] = useState<FilterSettings>(DEFAULT_FILTERS);

  const getFilterStyle = () => {
    return {
      filter: `brightness(${filters.brightness}%) saturate(${filters.saturation}%) contrast(${filters.contrast}%)`
    };
  };

  return (
    <div id="loveflix-billboard-header" className="relative h-[65vh] sm:h-[82vh] md:h-[88vh] w-full flex items-end justify-start font-sans overflow-hidden select-none bg-black">
      {/* Background Image Container with horizontal layout */}
      <div className="absolute inset-0 z-0 bg-black flex justify-end">
        <div className="relative h-full w-full flex justify-end">
          <img
            src={HERO_MOVIE.backdropUrl}
            alt={HERO_MOVIE.title}
            referrerPolicy="no-referrer"
            style={getFilterStyle()}
            className={`h-full transition-all duration-300 ${
              filters.fitMode === 'contain' ? 'object-contain' : 'object-cover'
            } ${
              filters.position === 'right' ? 'object-right' : 
              filters.position === 'left' ? 'object-left' : 'object-center'
            } ${filters.fitMode === 'contain' ? 'w-auto max-w-full' : 'w-full'}`}
          />
        </div>

        {/* Blend layers based on user selection */}
        {filters.blendMode === 'color-burn' && (
          <div className="absolute inset-0 bg-[#E50914] mix-blend-color-burn opacity-30 pointer-events-none z-10" />
        )}
        {filters.blendMode === 'overlay' && (
          <div className="absolute inset-0 bg-blue-900 mix-blend-overlay opacity-30 pointer-events-none z-10" />
        )}

        {/* User configurable Vignette (Dark shadows on edges of the photo) */}
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
          style={{
            background: `radial-gradient(circle, rgba(0,0,0,0) 20%, rgba(0,0,0,${filters.vignette / 100}) 95%)`
          }}
        />

        {/* Cinematic Netflix Gradients - Top, Bottom, Left with enhanced multi-stop horizontal black blending */}
        {/* Bottom vertical fade */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(20,20,20,0.6)_0%,rgba(20,20,20,0)_25%,rgba(20,20,20,0.5)_70%,rgba(20,20,20,1)_100%)] pointer-events-none z-10" />
        
        {/* Left-to-right fade specifically tailored to blend portrait images sitting on the right beautifully */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(20,20,20,1)_0%,rgba(20,20,20,1)_30%,rgba(20,20,20,0.85)_52%,rgba(20,20,20,0.3)_75%,rgba(20,20,20,0)_100%)] hidden sm:block pointer-events-none z-10" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(20,20,20,1)_0%,rgba(20,20,20,0.8)_50%,rgba(20,20,20,0)_100%)] sm:hidden pointer-events-none z-10" />
      </div>

      {/* Content overlays */}
      <div className="relative z-10 w-full max-w-4xl px-4 sm:px-12 md:px-16 pb-12 sm:pb-20 select-none flex flex-col items-start text-white">
        {/* Glowing Special Category Tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center space-x-2 bg-red-600/90 text-white text-[10px] sm:text-xs font-black tracking-widest px-2.5 py-1 rounded-sm uppercase mb-4 shadow-[0_3px_12px_rgba(220,38,38,0.3)] animate-pulse"
        >
          <Award className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
          <span>TOP 1 DEAREST RELEASES IN YOUR HEART</span>
        </motion.div>

        {/* Billboard Movie Title displaying typography */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="text-4xl sm:text-6xl md:text-7xl font-sans font-black tracking-tighter mb-4 uppercase italic leading-[0.95] drop-shadow-2xl text-white"
        >
          {HERO_MOVIE.title.split(' Story')[0]} <br/>
          <span className="text-[#E50914] bg-none text-red-600">{HERO_MOVIE.title.includes('Story') ? 'Story' : ''}</span>
        </motion.h1>

        {/* Quality Badges Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs mb-3 sm:mb-4 font-sans font-medium text-gray-300 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]"
        >
          <span className="text-emerald-400 font-bold tracking-wide">{HERO_MOVIE.matchScore}% Match</span>
          <span className="border border-neutral-600 px-1 rounded-sm text-[10px] sm:text-xs font-semibold uppercase">{HERO_MOVIE.rating}</span>
          <span className="font-semibold tracking-wide">{HERO_MOVIE.year}</span>
          <span className="border border-neutral-600 px-1 rounded-sm text-[10px] sm:text-xs font-semibold uppercase">Ultra HD 4K</span>
          <span className="text-gray-400 font-bold tracking-wider">{HERO_MOVIE.duration}</span>
        </motion.div>

        {/* Billboard Short Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-sm sm:text-base md:text-lg text-neutral-300 max-w-xl mb-6 sm:mb-8 font-light leading-relaxed drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)]"
        >
          {HERO_MOVIE.description}
        </motion.p>

        {/* Animated Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-wrap items-center gap-3 w-full sm:w-auto"
        >
          <button
            id="play-hero-btn"
            onClick={() => onPlayClick(HERO_MOVIE)}
            style={{ minHeight: '44px' }}
            className="flex-shrink-0 px-6 sm:px-8 py-2.5 bg-white hover:bg-neutral-200 text-black font-sans font-bold rounded flex items-center justify-center space-x-2 transition-all duration-200 hover:scale-[1.03] shadow-[0_4px_15px_rgba(0,0,0,0.4)] cursor-pointer border-none outline-none"
          >
            <Play className="w-5 h-5 text-black fill-black" />
            <span className="text-sm tracking-wide">Play Wish</span>
          </button>

          <button
            id="info-hero-btn"
            onClick={() => onInfoClick(HERO_MOVIE)}
            style={{ minHeight: '44px' }}
            className="flex-shrink-0 px-6 sm:px-8 py-2.5 bg-neutral-600/70 hover:bg-neutral-600/90 text-white font-sans font-bold rounded border border-neutral-500/35 flex items-center justify-center space-x-2 transition-all duration-200 hover:scale-[1.03] backdrop-blur-md cursor-pointer outline-none"
          >
            <Info className="w-5 h-5 text-white" />
            <span className="text-sm tracking-wide">More Info</span>
          </button>
        </motion.div>
      </div>

      {/* Decorative Volume Sound indicator side-text hint */}
      <div className="absolute right-0 bottom-24 bg-zinc-900/40 border-l-4 border-red-600 py-1.5 px-4 pr-12 text-xs sm:text-sm font-sans tracking-wide text-zinc-300 hidden sm:block pointer-events-none select-none">
        {profileName === 'My Queen 👑' ? "EXCLUSIVE SHOWING FOR MY QUEEN 👑" : "LOVEFLIX SPECIAL"}
      </div>
    </div>
  );
}
