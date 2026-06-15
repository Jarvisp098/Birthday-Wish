import { useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Info } from 'lucide-react';
import { motion } from 'motion/react';
import { Movie } from '../types';

interface MovieRowProps {
  key?: string;
  categoryTitle: string;
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
  onPlayClick: (movie: Movie) => void;
}

export default function MovieRow({ categoryTitle, movies, onMovieClick, onPlayClick }: MovieRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth * 0.75 
        : scrollLeft + clientWidth * 0.75;
      
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div id={`category-row-${categoryTitle.replace(/\s+/g, '-').toLowerCase()}`} className="relative space-y-2 sm:space-y-4 px-4 sm:px-12 md:px-16 select-none font-sans py-4">
      {/* Category Header */}
      <h2 className="text-sm sm:text-lg md:text-xl font-sans font-bold text-neutral-200 tracking-wide hover:text-white transition-colors duration-200 cursor-pointer inline-block">
        {categoryTitle}
      </h2>

      {/* Row Wrapper */}
      <div className="relative group/row">
        {/* Left Arrow Button */}
        <button
          onClick={() => handleScroll('left')}
          style={{ minHeight: '44px', minWidth: '44px' }}
          className="absolute left-0 top-0 bottom-0 w-11 bg-black/60 hover:bg-black/80 text-white flex items-center justify-center rounded-r opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 z-20 cursor-pointer outline-none border-none"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6 hover:scale-125 transition-transform" />
        </button>

        {/* Scrollable Row */}
        <div
          ref={rowRef}
          className="flex space-x-4 overflow-x-auto scrollbar-none pb-4 pt-2 -mt-2 -mb-2 scroll-smooth"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {movies.map((movie, idx) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="relative flex-none w-[200px] sm:w-[260px] md:w-[280px] aspect-[16/9] bg-[#141414] rounded overflow-hidden cursor-pointer group shadow-md border border-white/10 hover:border-white/30 transition-colors"
            >
              {/* Thumbnail Display Backdrop */}
              <div 
                onClick={() => onMovieClick(movie)}
                className="w-full h-full relative z-0 overflow-hidden"
              >
                {/* Trademark red logo block from the Sleek Theme template */}
                <div className="absolute top-1 left-2.5 text-[#E50914] font-black text-xs sm:text-sm tracking-tighter drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] z-10 select-none">
                  L
                </div>

                <img
                  src={movie.backdropUrl}
                  alt={movie.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover roundedopacity-85 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Glowing bottom overlay and title text */}
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(10,10,10,0.9)_0%,rgba(10,10,10,0.3)_40%,transparent_100%)] opacity-100 group-hover:opacity-40 transition-opacity duration-300" />
                
                {/* Card Title Layer */}
                <div className="absolute bottom-2 left-2 right-2 text-white font-sans text-xs sm:text-xs font-bold tracking-wide transition-all truncate drop-shadow-md z-10 group-hover:translate-y-[-8px] group-hover:scale-105 origin-left">
                  {movie.title}
                </div>
              </div>

              {/* Expand on Hover Quick Detail Drawer (Overlay/slide-up) */}
              <div className="absolute inset-x-0 bottom-0 bg-neutral-900 border-t border-neutral-800 p-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20 shadow-xl flex flex-col justify-between h-[45%]">
                <div className="flex items-center justify-between">
                  <div className="flex space-x-1.5 sm:space-x-2">
                    <button
                      onClick={() => onPlayClick(movie)}
                      style={{ minHeight: '18px', minWidth: '18px' }}
                      className="p-1 px-2.5 bg-white hover:bg-neutral-200 text-black text-[9px] font-bold rounded flex items-center space-x-1 cursor-pointer transition-all border-none outline-none"
                    >
                      <Play className="w-2.5 h-2.5 fill-black" />
                      <span>Play</span>
                    </button>
                    <button
                      onClick={() => onMovieClick(movie)}
                      style={{ minHeight: '18px', minWidth: '18px' }}
                      className="p-1 px-2.5 bg-neutral-800 hover:bg-neutral-700 text-white text-[9px] font-bold rounded border border-neutral-700 flex items-center space-x-1 cursor-pointer transition-all outline-none"
                    >
                      <Info className="w-2.5 h-2.5" />
                      <span>Info</span>
                    </button>
                  </div>
                  
                  {/* Match percent badge */}
                  <span className="text-[10px] text-emerald-400 font-bold">{movie.matchScore}% Match</span>
                </div>

                {/* Sub-info: Category genre tags & brief year status */}
                <div className="flex items-center space-x-1.5">
                  <span className="text-[9px] font-semibold text-gray-400 border border-neutral-800 px-1 rounded-sm">{movie.rating}</span>
                  <span className="text-[8px] sm:text-[9px] text-neutral-400 truncate tracking-wide font-light max-w-[70%]">
                    {movie.genres.slice(0, 2).join(' • ')}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={() => handleScroll('right')}
          style={{ minHeight: '44px', minWidth: '44px' }}
          className="absolute right-0 top-0 bottom-0 w-11 bg-black/60 hover:bg-black/80 text-white flex items-center justify-center rounded-l opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 z-20 cursor-pointer outline-none border-none"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6 hover:scale-125 transition-transform" />
        </button>
      </div>
    </div>
  );
}
