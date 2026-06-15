import { useState, useRef, useEffect, MouseEvent, FormEvent, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Play, Star, Sparkles, Heart, Plus, Trash2, Calendar, 
  Smile, ShieldAlert, BadgeInfo, CheckCircle, ChevronDown, Award
} from 'lucide-react';
import { Movie, TimelineEvent, InsideJoke } from '../types';
import { TIMELINE_EVENTS, INSIDE_JOKES, COMPLIMENTS } from '../data';
// @ts-ignore
import sweetuVideo from '../assets/video/Sweetu.mp4';

interface MovieDetailModalProps {
  movie: Movie;
  onClose: () => void;
  onPlayClick?: (movie: Movie) => void;
}

interface WishItem {
  id: string;
  title: string;
  description?: string;
}

export default function MovieDetailModal({ movie, onClose, onPlayClick }: MovieDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'interactive'>('overview');
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  
  // Custom states for interactive panels
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [currentCompliment, setCurrentCompliment] = useState<string>('');
  const [complimentHits, setComplimentHits] = useState(0);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [flippedJokes, setFlippedJokes] = useState<Record<string, boolean>>({});
  
  // Future Together wishes state
  const [wishes, setWishes] = useState<WishItem[]>([
    {
      id: 'road_1',
      title: '✈️ Finally Close The Distance',
      description: "The moment we've been dreaming about me getting off the plane and finally meeting you in person. No more screens, no more waiting, just us together at last. ❤️"
    },
    {
      id: 'road_2',
      title: '🏍️ A Romantic Mountain Ride',
      description: "Ride through beautiful mountain roads together, stopping at scenic viewpoints, taking pictures, and creating memories we'll talk about for years."
    },
    {
      id: 'road_3',
      title: '🌶️ Street Food Challenge',
      description: "Explore local street food stalls together and challenge each other to see who can eat more and who can handle the spiciest food without giving up. 😆"
    },
    {
      id: 'road_4',
      title: '👩‍🍳 Our First Kitchen Adventure',
      description: "Cook a meal together from scratch, make a huge mess, steal bites from each other's plates, and turn an ordinary evening into one of our favorite memories."
    },
    {
      id: 'road_5',
      title: '🎬 Our First Movie Date',
      description: "No video calls, no buffering, no counting down together from different countries. Just us sitting side by side, sharing popcorn, arguing over which movie to watch, and finally experiencing our very first movie date together. ❤️"
    }
  ]);
  const [newWish, setNewWish] = useState('');

  // Close modal when pressing ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Flip joke card helper
  const toggleJokeFlip = (id: string) => {
    setFlippedJokes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Compliment shower helper
  const triggerCompliment = (e: MouseEvent) => {
    const randomComp = COMPLIMENTS[Math.floor(Math.random() * COMPLIMENTS.length)];
    setCurrentCompliment(randomComp);
    setComplimentHits(prev => prev + 1);

    // Spawn floating heart particle
    const rect = e.currentTarget.getBoundingClientRect();
    const newHeart = {
      id: Date.now(),
      x: Math.random() * 200 - 100, // random offset
      y: -20
    };
    setHearts(prev => [...prev, newHeart]);
  };

  // Clear spawned hearts
  useEffect(() => {
    if (hearts.length > 0) {
      const timer = setTimeout(() => {
        setHearts(prev => prev.slice(1));
      }, 1400);
      return () => clearTimeout(timer);
    }
  }, [hearts]);

  const handleAddWish = (e: FormEvent) => {
    e.preventDefault();
    if (newWish.trim()) {
      setWishes(prev => [
        ...prev,
        {
          id: `custom_${Date.now()}_${Math.random()}`,
          title: newWish.trim()
        }
      ]);
      setNewWish('');
    }
  };

  const handleRemoveWish = (idx: number) => {
    setWishes(prev => prev.filter((_, i) => i !== idx));
  };

  return (
    <div 
      id="movie-details-modal" 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 sm:p-6 md:p-10 overflow-y-auto select-none font-sans"
    >
      {/* Background click to exit outside overlay modal */}
      <div className="absolute inset-0 bg-transparent cursor-pointer" onClick={onClose} />

      {/* Main Netflix style Window Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="relative bg-[#181818] text-white w-full max-w-4xl rounded-lg overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.85)] z-10 max-h-[92vh] flex flex-col"
      >
        {/* Navigation/Close top action */}
        <button
          onClick={onClose}
          style={{ minHeight: '44px', minWidth: '44px' }}
          className="absolute top-4 right-4 z-40 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors cursor-pointer outline-none border-none"
          aria-label="Close detail view"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Section */}
        <div className="overflow-y-auto flex-1 scrollbar-thin">
          {/* Billboard Image Hero Frame */}
          {isPlayingVideo && movie.playContentKey === 'love_letter' ? (
            <div className="relative aspect-[16/9] sm:aspect-[2.1/1] w-full bg-black leading-none flex items-center justify-center">
              <SweetuVideoPlayer autoPlay={true} />
              <button
                onClick={() => setIsPlayingVideo(false)}
                style={{ minHeight: '36px' }}
                className="absolute top-4 left-4 z-30 px-3 py-1.5 bg-black/75 hover:bg-black/95 text-white text-xs font-sans font-bold rounded flex items-center space-x-1 transition-all border border-white/10 cursor-pointer outline-none"
              >
                <span>← Back to Poster</span>
              </button>
            </div>
          ) : (
            <div className="relative aspect-[16/9] sm:aspect-[2.1/1] w-full bg-zinc-900 leading-none">
              <img
                src={movie.backdropUrl}
                alt={movie.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-80"
              />
              {/* Dark Mask overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-[#181818]/45 to-transparent" />
              
              {/* Visual Title */}
              <div className="absolute bottom-6 left-6 sm:left-12 pr-6">
                <span className="text-[10px] sm:text-xs text-[#E50914] font-black tracking-widest uppercase mb-1 sm:mb-2 block">
                  LOVEFLIX SURPRISE PRESENTATION
                </span>
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-sans font-black tracking-tight leading-tight mb-4 drop-shadow-md">
                  {movie.title}
                </h2>
                
                <div className="flex items-center space-x-3">
                  <button
                    id="modal-play-btn"
                    onClick={() => {
                      if (movie.playContentKey === 'love_letter') {
                        setIsPlayingVideo(true);
                      } else {
                        setActiveTab('interactive');
                      }
                      onPlayClick?.(movie);
                    }}
                    style={{ minHeight: '44px' }}
                    className="px-6 py-2.5 bg-[#E50914] hover:bg-[#ff1521] text-white font-sans font-bold rounded flex items-center space-x-2 transition-transform active:scale-95 duration-150 cursor-pointer border-none outline-none text-xs sm:text-sm shadow-md"
                  >
                    <Play className="w-4 h-4 text-white fill-white" />
                    <span>Start Show</span>
                  </button>
                  <span className="text-emerald-400 text-xs font-bold sm:inline-block hidden">
                    {movie.matchScore}% Match for you
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Core Content Navigation Bar */}
          <div className="px-6 sm:px-12 md:px-16 pt-6 border-b border-neutral-800 flex items-center space-x-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 text-sm sm:text-base font-sans font-bold tracking-wider relative transition-colors outline-none cursor-pointer ${
                activeTab === 'overview' ? 'text-white' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <span>Overview</span>
              {activeTab === 'overview' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#E50914] rounded-t" />
              )}
            </button>
            {movie.playContentKey !== 'love_letter' && (
              <button
                onClick={() => setActiveTab('interactive')}
                className={`pb-3 text-sm sm:text-base font-sans font-bold tracking-wider relative transition-colors cursor-pointer flex items-center space-x-1.5 outline-none ${
                  activeTab === 'interactive' ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                <Sparkles className="w-4 h-4 text-red-500" />
                <span>Interactive Season</span>
                {activeTab === 'interactive' && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#E50914] rounded-t" />
                )}
              </button>
            )}
          </div>

          {/* Custom Tabs Views rendering */}
          <div className="px-6 sm:px-12 md:px-16 py-8">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' ? (
                // VIEW OVERVIEW (Netflix typical details layout)
                <motion.div
                  key="tab-overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-8 text-neutral-300"
                >
                  {/* Left Column: Metrics and Description */}
                  <div className="md:col-span-2 space-y-5">
                    <div className="flex items-center space-x-3 text-xs sm:text-sm font-sans">
                      <span className="text-emerald-500 font-bold">{movie.matchScore}% Match</span>
                      <span className="text-neutral-400">{movie.year}</span>
                      <span className="border border-neutral-700 px-1.5 py-0.2 rounded-sm text-[10px] text-zinc-300 uppercase">
                        {movie.rating}
                      </span>
                      <span className="text-neutral-400 font-bold">{movie.duration}</span>
                    </div>



                    {/* Display the main description text */}
                    <p className="text-sm sm:text-base text-zinc-100 font-sans leading-relaxed pt-2 whitespace-pre-line">
                      {movie.description}
                    </p>

                    {movie.playContentKey === 'love_letter' && (
                      <div className="bg-[#fcfaf2] text-[#1c1917] rounded-lg p-6 sm:p-8 border border-[#e7e1cd] relative font-serif shadow-md mt-4 select-text">
                        <div className="absolute top-4 right-4 text-[10px] font-mono font-bold text-gray-500">
                          June 15th • Private Dedication
                        </div>
                        <div className="space-y-4 text-sm sm:text-base leading-relaxed tracking-wide pt-2">
                          <p className="font-bold text-neutral-900">My Beautiful Birthday Queen, Anjali,</p>
                          <p>
                             Happy Birthday, My Love ❤️ Today isn't just your birthday, it's the day the world was gifted someone truly special. Even though miles separate us, you've become the most beautiful part of my everyday life. Thank you for every late night call, every laugh, every memory, and every moment that made the distance feel smaller. 
                          </p>
                            <p>
                              I made this little website because you deserve something created with love, just like the love you've brought into my life. I can't wait for the day when we celebrate your birthday side by side instead of through a screen.
                             </p>
                             <p>
                              Until then, know that my heart is always with you. I love you endlessly. 
                            </p>
                            <p>
                              Happy Birthday, sweetheart. 🎂💕 Loveflix is 100% yours.
                            </p>
                          <p className="font-sans font-bold text-neutral-900 text-xs mt-6 flex items-center space-x-1.5 pt-4 border-t border-dashed border-stone-300">
                            <Heart className="w-3.5 h-3.5 text-red-600 fill-red-600" />
                            <span>With all my love and warm cuddles,</span>
                          </p>
                          <p className="text-base font-bold text-red-700 italic">
                            Your boyfriend, Brijesh ❤️
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Previews for the interactive feature corresponding to the card's theme */}
                    {movie.playContentKey === 'memory_lane' && (
                      <div className="mt-4 bg-[#202020] border border-neutral-800 p-5 rounded-lg space-y-4 shadow-md">
                        <h4 className="text-sm font-sans font-black uppercase text-[#E50914] tracking-wider flex items-center gap-1.5 select-none">
                          <Sparkles className="w-4 h-4 text-red-500" />
                          <span>Interactive Highlight: Our Memory Lane</span>
                        </h4>
                        <p className="text-[#c2c2c2] text-xs sm:text-sm font-sans leading-relaxed">
                          Switch over to the <strong className="text-white">Interactive Season</strong> tab above to scroll through our beautifully paced timelines:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 select-none">
                          <div className="bg-neutral-950/70 border border-neutral-800 p-3 rounded flex items-start gap-2.5">
                            <span className="text-lg">✨</span>
                            <div className="space-y-0.5">
                              <p className="text-xs text-white font-bold">1. Our Beautiful Beginning</p>
                              <p className="text-[10px] text-gray-400">Our accidental Instagram connection.</p>
                            </div>
                          </div>
                          <div className="bg-neutral-950/70 border border-neutral-800 p-3 rounded flex items-start gap-2.5">
                            <span className="text-lg">🍜</span>
                            <div className="space-y-0.5">
                              <p className="text-xs text-white font-bold">2. Our First "Date"</p>
                              <p className="text-[10px] text-gray-400">Virtual screen-to-screen dinners.</p>
                            </div>
                          </div>
                          <div className="bg-neutral-950/70 border border-neutral-800 p-3 rounded flex items-start gap-2.5">
                            <span className="text-lg">💛</span>
                            <div className="space-y-0.5">
                              <p className="text-xs text-white font-bold">3. Falling In Love</p>
                              <p className="text-[10px] text-gray-400">That breathtaking, killer smile.</p>
                            </div>
                          </div>
                          <div className="bg-neutral-950/70 border border-neutral-800 p-3 rounded flex items-start gap-2.5">
                            <span className="text-lg">🌙</span>
                            <div className="space-y-0.5">
                              <p className="text-xs text-white font-bold">4. Boundless Talks</p>
                              <p className="text-[10px] text-gray-400">Conversations lasting till sunrise.</p>
                            </div>
                          </div>
                        </div>
                        <div className="pt-2 text-center">
                          <button
                            onClick={() => setActiveTab('interactive')}
                            className="text-xs text-[#E50914] font-bold uppercase tracking-wider hover:underline bg-transparent border-none cursor-pointer p-0"
                          >
                            Walk through memory lane now →
                          </button>
                        </div>
                      </div>
                    )}

                    {movie.playContentKey === 'compliment_machine' && (
                      <div className="mt-4 bg-[#202020] border border-neutral-800 p-5 rounded-lg space-y-4 shadow-md">
                        <h4 className="text-sm font-sans font-black uppercase text-[#E50914] tracking-wider flex items-center gap-1.5 select-none">
                          <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                          <span>Interactive Highlight: The Compliment Shower</span>
                        </h4>
                        <p className="text-[#c2c2c2] text-xs sm:text-sm font-sans leading-relaxed">
                          Need a smile? Switch to the <strong className="text-white">Interactive Season</strong> to power up the love machine:
                        </p>
                        <div className="bg-neutral-950/70 border border-neutral-800 p-4 rounded-md flex items-center gap-4 select-none">
                          <div className="w-10 h-10 bg-red-600/10 rounded-full flex items-center justify-center border border-red-500/30 scale-105 shrink-0">
                            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs text-white font-bold">Dose of Pure Devotion</p>
                            <p className="text-[11px] text-gray-400">
                              Every tap showers your screen with custom falling hearts and unlocks endless personal compliments written from my heart.
                            </p>
                          </div>
                        </div>
                        <div className="pt-1 text-center">
                          <button
                            onClick={() => setActiveTab('interactive')}
                            className="text-xs text-[#E50914] font-bold uppercase tracking-wider hover:underline bg-transparent border-none cursor-pointer p-0"
                          >
                            Showering your screen with love →
                          </button>
                        </div>
                      </div>
                    )}

                    {movie.playContentKey === 'boyfriend_stats' && (
                      <div className="mt-4 bg-[#202020] border border-neutral-800 p-5 rounded-lg space-y-4 shadow-md">
                        <h4 className="text-sm font-sans font-black uppercase text-amber-500 tracking-wider flex items-center gap-1.5 select-none">
                          <Award className="w-4 h-4 text-amber-500" />
                          <span>Interactive Highlight: Certified 22/22 Scores</span>
                        </h4>
                        <p className="text-[#c2c2c2] text-xs sm:text-sm font-sans leading-relaxed">
                          A fully documented evaluation dossier verifying why Anjali represents the ultimate girlfriend gold-standard as she enters Season 22:
                        </p>
                        <div className="grid grid-cols-2 gap-3 pt-1 select-none">
                          <div className="bg-neutral-950/70 p-3 rounded border border-neutral-800 text-center">
                            <span className="text-[10px] text-gray-400 uppercase tracking-wider">Overall Audited Score</span>
                            <span className="text-base sm:text-lg font-black text-amber-500 block">Season 22 / 22 🌟</span>
                          </div>
                          <div className="bg-neutral-950/70 p-3 rounded border border-neutral-800 text-center">
                            <span className="text-[10px] text-gray-400 uppercase tracking-wider">Cuteness Rate Index</span>
                            <span className="text-base sm:text-lg font-black text-red-500 block">100% (Certified)</span>
                          </div>
                        </div>
                        <p className="text-[11px] text-gray-400 font-light italic leading-relaxed text-center">
                          "Features interactive ratings, certified boyfriend signature stamp of approval, and customizable traits verification reports."
                        </p>
                        <div className="pt-1 text-center">
                          <button
                            onClick={() => setActiveTab('interactive')}
                            className="text-xs text-amber-500 font-bold uppercase tracking-wider hover:underline bg-transparent border-none cursor-pointer p-0"
                          >
                            Explore interactive scorecards →
                          </button>
                        </div>
                      </div>
                    )}

                    {movie.playContentKey === 'future_together' && (
                      <div className="mt-4 bg-[#202020] border border-neutral-800 p-5 rounded-lg space-y-4 shadow-md">
                        <h4 className="text-sm font-sans font-black uppercase text-[#E50914] tracking-wider flex items-center gap-1.5 select-none">
                          <Plus className="w-4 h-4 text-red-500" />
                          <span>Interactive Highlight: Co-authored Roadmap</span>
                        </h4>
                        <p className="text-[#c2c2c2] text-xs sm:text-sm font-sans leading-relaxed">
                          Our future is a gorgeous story we are scripting line-by-line. Switch to the <strong className="text-white">Interactive Season</strong> above to write our plans together:
                        </p>
                        <div className="bg-neutral-950/70 border border-neutral-800 p-4 rounded-md space-y-3 select-none">
                          <p className="text-xs text-white font-bold flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-[#E50914] animate-ping" />
                            <span>Currently Slated Chapters:</span>
                          </p>
                          <ul className="text-xs text-gray-300 space-y-1.5 list-disc list-inside leading-relaxed pl-1">
                            <li>Closing the miles permanently: no more long distance</li>
                            <li>Scenic motorcycling through epic mountain roads</li>
                            <li>Spicy local street food challenge face-off</li>
                            <li>Snuggling during our very first movie date side-by-side</li>
                          </ul>
                        </div>
                        <p className="text-[11px] text-gray-400 text-center">
                          💡 You can dynamically append your custom vacation plans, dreams, and cute wishes in real-time inside the interactive tab!
                        </p>
                        <div className="pt-1 text-center">
                          <button
                            onClick={() => setActiveTab('interactive')}
                            className="text-xs text-[#E50914] font-bold uppercase tracking-wider hover:underline bg-transparent border-none cursor-pointer p-0"
                          >
                            Add custom dreams to roadmap →
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Extra Boyfriend Review Block */}
                    {movie.boyfriendReview && (
                      <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-md space-y-4 shadow-inner">
                        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                          <h4 className="text-sm font-bold text-white flex items-center space-x-1.5 font-sans">
                            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                            <span>Official Boyfriend Certified Review Score</span>
                          </h4>
                          <span className="text-amber-500 font-black text-lg bg-zinc-800/80 px-2.5 py-0.5 rounded shadow">
                            {movie.boyfriendReview.score}/10
                          </span>
                        </div>
                        
                        <p className="text-zinc-400 text-xs sm:text-sm italic leading-relaxed">
                          "{movie.boyfriendReview.reviewText}"
                        </p>

                        {/* Rating Bars attributes */}
                        <div className="space-y-3 pt-2">
                          {movie.boyfriendReview.attributes.map((attr, index) => (
                            <div key={attr.label} className="space-y-1">
                              <div className="flex justify-between text-xs font-semibold text-zinc-300">
                                <span>{attr.label}</span>
                                <span className="text-[#E50914]">{attr.value}%</span>
                              </div>
                              <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${attr.value}%` }}
                                  transition={{ delay: index * 0.1, duration: 1.0 }}
                                  className="h-full bg-gradient-to-r from-[#E50914] to-red-600 rounded-full"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Cast and Tag Lists */}
                  <div className="space-y-6 text-xs sm:text-sm">
                    <div>
                      <span className="text-gray-500 block">Lead Cast:</span>
                      <span className="text-gray-300 text-medium font-sans block mt-0.5">Anjali, Brijesh</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Director & Writer:</span>
                      <span className="text-gray-300 font-sans block mt-0.5">Destiny & Mutual Affection</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Genres:</span>
                      <span className="text-gray-300 font-sans block mt-0.5">{movie.genres.join(', ')}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">This romantic title is:</span>
                      <span className="text-gray-300 font-sans block mt-0.5">Heartwarming, Absolutely Hilarious, Highly Emotional, Cozy, Magical</span>
                    </div>
                    <div className="pt-2">
                      <div className="flex items-center space-x-1.5 bg-neutral-900 border border-neutral-800 p-3 rounded text-[11px] text-gray-400 leading-relaxed font-mono">
                        <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span>Boyfriend Verified • Family Friendly • Always matches: 100%</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                // VIEW INTERACTIVE PANEL (Dynamic customized applet modules per play key)
                <motion.div
                  key="tab-interactive"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="w-full text-zinc-300"
                >
                  {/* (A) LOVE LETTER CARD DETAILS AND EXPANSION */}
                  {movie.playContentKey === 'love_letter' && (
                    <div className="flex flex-col items-center justify-center py-6">
                      <AnimatePresence mode="wait">
                        {!envelopeOpened ? (
                          // Skeuomorphic sealed envelope
                          <motion.div
                            key="sealed-envelope"
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 1.05, opacity: 0, filter: 'blur(8px)' }}
                            onClick={() => setEnvelopeOpened(true)}
                            className="bg-stone-100 hover:bg-stone-50 text-neutral-800 rounded-xl p-8 max-w-md w-full aspect-[4/3] flex flex-col items-center justify-center space-y-6 shadow-[0_15px_30px_rgba(0,0,0,0.6)] cursor-pointer text-center relative overflow-hidden ring-1 ring-zinc-200 transition-colors"
                          >
                            <div className="absolute inset-0 border-[6px] border-double border-red-200/50 rounded-xl pointer-events-none" />
                            {/* Sealed stamp ring */}
                            <div className="w-16 h-16 rounded-full bg-red-600/95 flex items-center justify-center shadow-lg relative animate-pulse scale-105">
                              <Heart className="w-6 h-6 text-white fill-white" />
                              <div className="absolute inset-0 border-2 border-dashed border-red-300/40 rounded-full animate-spin [animation-duration:8s]" />
                            </div>
                            
                            <div className="space-y-1">
                              <h3 className="font-serif font-black text-xl text-neutral-900">
                                To My Eternal Queen, Anjali 👑
                              </h3>
                              <p className="text-gray-500 text-xs uppercase tracking-widest font-sans">
                                Handcrafted with 100% devotion
                              </p>
                            </div>
                            
                            <span style={{ minHeight: '44px' }} className="px-5 py-2 hover:bg-red-600 hover:text-white rounded text-xs tracking-widest uppercase border border-red-400 text-red-600 transition-colors font-sans font-bold select-none cursor-pointer">
                              Tap To Unseal Letter
                            </span>
                          </motion.div>
                        ) : (
                          // Unveiled beautiful handwritten styled layout
                          <motion.div
                            key="opened-letter"
                            initial={{ scale: 0.95, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            className="bg-[#fcfaf2] text-neutral-800 rounded-lg p-6 sm:p-10 w-full max-w-2xl shadow-[0_15px_40px_rgba(0,0,0,0.7)] border border-[#ece4cb] relative font-serif"
                          >
                            <div className="absolute top-4 right-4 text-xs font-mono font-bold text-gray-400">
                              June 15th • Special Screening
                            </div>
 
                            {/* Deep letter paragraphs */}
                            <div className="space-y-6 text-base sm:text-lg leading-relaxed text-zinc-800 tracking-wide pt-4 font-serif">
                              <p>My Beautiful Birthday Queen, Anjali,</p>

                              <p className="leading-relaxed">
                                Today is the most magical day of the year, because my favorite person in the cosmos is officially stepping into her <strong>spectacular Chapter 22</strong>! Happy 22nd Birthday, my absolute love! 🎂✨
                              </p>

                              <p className="leading-relaxed">
                                From an accidental Instagram invite to the deepest, most beautiful connection I have ever known, you have completely filled my heart with colors. Turning 22 isn't just about another year on the clock; it is the grand entrance into our finest season yet—one where distance is final, and we step into real-life memories we have only held in our dreams.
                              </p>

                              {/* Special Sweetu.mp4 Video Integration */}
                              <div className="my-6 max-w-xl mx-auto font-sans">
                                <span className="text-[10px] text-red-600 font-bold tracking-widest uppercase mb-2 block text-center">
                                  ❤️ Press Play For A Special Surprise Video ❤️
                                </span>
                                <div className="relative aspect-video w-full bg-stone-950 rounded-lg overflow-hidden border border-neutral-300 shadow-[0_8px_20px_rgba(0,0,0,0.3)] p-1 leading-none flex items-center justify-center">
                                  <SweetuVideoPlayer autoPlay={false} />
                                </div>
                                <span className="text-[9px] text-stone-500 italic mt-2 block text-center">
                                  A beautiful custom-made memory tape, created by Brijesh with all my love for you.
                                </span>
                              </div>
                              
                              <p className="leading-relaxed">
                                I rate you 110 out of 10 points in every single index of universe. Thank you for choosing me to be your boyfriend, partner, and biggest supporter. Loveflix is 100% yours, today, and always.
                              </p>
                              
                              <p className="font-sans font-bold text-neutral-900 text-sm mt-8 flex items-center space-x-2">
                                <Heart className="w-4 h-4 text-red-600 fill-red-600" />
                                <span>With all my love and warm cuddles,</span>
                              </p>
                              <p className="text-lg font-serif font-bold text-red-700 italic">
                                Your boyfriend, Brijesh ❤️
                              </p>
                            </div>

                            <div className="mt-8 pt-6 border-t border-dotted border-gray-300 flex justify-between items-center">
                              <button
                                onClick={() => setEnvelopeOpened(false)}
                                style={{ minHeight: '44px' }}
                                className="text-neutral-500 hover:text-neutral-800 text-xs uppercase font-sans tracking-wider border-none bg-transparent cursor-pointer"
                              >
                                ← Reseal envelope
                              </button>
                              
                              <div className="flex space-x-1">
                                <span className="text-xs bg-red-100 text-red-700 px-2.5 py-1 rounded font-sans font-bold uppercase tracking-wide">
                                  Rating: 100% Love Match
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {/* (B) CHRONOLOGICAL MILESTONE TIMELINE */}
                  {movie.playContentKey === 'memory_lane' && (
                    <div className="relative border-l-2 border-neutral-800 ml-4 sm:ml-8 space-y-8 py-4 font-sans max-w-2xl mx-auto">
                      {TIMELINE_EVENTS.map((event, idx) => (
                        <div key={event.id} className="relative pl-10 group">
                          {/* Circle dot marker */}
                          <div className="absolute left-[-9px] top-1 bg-[#E50914] w-4.5 h-4.5 rounded-full border-2 border-[#181818] group-hover:scale-125 transition-transform duration-200 shadow flex items-center justify-center text-[9px] text-white font-bold select-none text-center leading-none">
                            {idx + 1}
                          </div>

                          {/* Date and content layout */}
                          <div className="space-y-1">
                            <span className="text-xs text-[#E50914] tracking-widest uppercase font-black flex items-center gap-1.5 font-sans">
                              <span>{event.icon}</span>
                              <span>{event.date}</span>
                            </span>
                            <h3 className="text-base sm:text-lg font-bold text-white tracking-wide group-hover:text-red-500 transition-colors">
                              {event.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed max-w-xl whitespace-pre-wrap">
                              {event.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* (C) COMPLIMENTS BUBBLE SHOWER PANEL */}
                  {movie.playContentKey === 'compliment_machine' && (
                    <div className="flex flex-col items-center justify-center py-6 text-center max-w-lg mx-auto font-sans relative">
                      <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 sm:p-8 w-full shadow-lg relative overflow-hidden">
                        <Heart className="w-8 h-8 text-red-500/10 fill-red-500/10 absolute top-2 right-2 scale-150 transform rotate-12" />

                        <h3 className="text-lg sm:text-xl font-bold text-white mb-2 font-sans flex items-center justify-center gap-2">
                          <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
                          <span>The Ultimate Love Shower</span>
                        </h3>
                        
                        <p className="text-xs text-gray-400 uppercase tracking-widest mb-6 leading-relaxed">
                          Pop an explosion of love for a custom-crafted compliment
                        </p>

                        <div className="relative min-h-[140px] flex items-center justify-center p-4 bg-[#141414] rounded border border-neutral-800/65 mb-6 shadow-inner.">
                          <AnimatePresence mode="wait">
                            {currentCompliment ? (
                              <motion.p
                                key={currentCompliment}
                                initial={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
                                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, scale: 1.05, filter: 'blur(4px)' }}
                                className="text-sm sm:text-base leading-relaxed text-zinc-300 font-sans tracking-wide font-medium"
                              >
                                "{currentCompliment}"
                              </motion.p>
                            ) : (
                              <p className="text-gray-500 text-xs sm:text-sm font-light italic font-sans">
                                "Click the trigger below to shower your screen with love..."
                              </p>
                            )}
                          </AnimatePresence>

                          {/* Floating hearts generator */}
                          {hearts.map(heart => (
                            <motion.div
                              key={heart.id}
                              initial={{ opacity: 1, y: 0, scale: 0.8 }}
                              animate={{ opacity: 0, y: -160, scale: [0.8, 1.3, 0.6] }}
                              transition={{ duration: 1.3, ease: 'easeOut' }}
                              style={{ left: `calc(50% + ${heart.x}px)` }}
                              className="absolute pointer-events-none select-none text-red-500"
                            >
                              <Heart className="w-5 h-5 fill-red-500 filter drop-shadow-[0_2px_8px_rgba(239,68,68,0.5)]" />
                            </motion.div>
                          ))}
                        </div>

                        {/* Interactive Clicker Trigger */}
                        <button
                          onClick={triggerCompliment}
                          style={{ minHeight: '44px' }}
                          className="w-full sm:w-auto px-10 py-3 bg-[#E50914] hover:bg-[#ff1521] text-white font-sans font-black text-xs uppercase tracking-wider rounded select-none cursor-pointer border-none outline-none shadow-md hover:scale-102 active:scale-98 transition-all flex items-center justify-center space-x-2"
                        >
                          <Heart className="w-4 h-4 text-white fill-white" />
                          <span>Show Love ({complimentHits})</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* (D) FLIPPABLE INSIDE JOKES CARDS */}
                  {movie.playContentKey === 'inside_jokes' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans select-none pb-4">
                      {INSIDE_JOKES.map((joke) => {
                        const isFlipped = flippedJokes[joke.id] || false;
                        return (
                          <div 
                            key={joke.id} 
                            onClick={() => toggleJokeFlip(joke.id)}
                            className="h-44 [perspective:1000px] cursor-pointer group"
                          >
                            <div className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${
                              isFlipped ? '[transform:rotateY(180deg)]' : ''
                            }`}>
                              {/* JOKE FRONT */}
                              <div className="absolute inset-0 bg-neutral-900 border border-neutral-800 p-5 rounded-md [backface-visibility:hidden] flex flex-col justify-between shadow">
                                <div className="space-y-2">
                                  <span className="text-[10px] text-[#E50914] font-bold tracking-widest uppercase">
                                    COMEDY SPECIAL QUESTION
                                  </span>
                                  <p className="text-zinc-200 text-xs sm:text-sm font-semibold leading-relaxed">
                                    {joke.setup}
                                  </p>
                                </div>
                                <span className="text-[10px] text-gray-400 self-end uppercase tracking-widest flex items-center space-x-1">
                                  <span>Tap to flip</span>
                                  <span>🚀</span>
                                </span>
                              </div>

                              {/* JOKE BACK */}
                              <div className="absolute inset-0 bg-[#E50914] text-white p-5 rounded-md [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-between shadow">
                                <div className="space-y-1.5 overflow-y-auto">
                                  <span className="text-[9px] text-red-100 font-bold tracking-widest uppercase flex items-center gap-1">
                                    <Smile className="w-3 h-3 text-white" />
                                    <span>PUNCHLINE REVEALED!</span>
                                  </span>
                                  <p className="text-xs sm:text-sm font-light leading-relaxed">
                                    {joke.punchline}
                                  </p>
                                </div>
                                <div className="text-[11px] font-sans font-bold bg-white/25 rounded px-2.5 py-1 text-white self-start">
                                  Reaction: {joke.reaction}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* (E) RADIAL BOYFRIEND STATS REVIEW */}
                  {movie.playContentKey === 'boyfriend_stats' && (
                    <div className="space-y-6 max-w-xl mx-auto py-4 text-center font-sans">
                      <div className="bg-neutral-950 p-6 rounded-md border border-neutral-800 space-y-4 shadow-xl">
                        <Award className="w-10 h-10 text-amber-500 mx-auto" />
                        <h4 className="text-base font-bold text-white uppercase tracking-wider">
                          Official Rating Profile
                        </h4>
                        <p className="text-neutral-400 text-xs leading-relaxed font-light">
                          Evaluated by Lead Director "Best Boyfriend" under perfect verification guidelines. Checked on critical indexes and rated world-wide #1 girlfriend in 2026.
                        </p>
                        
                        <div className="grid grid-cols-2 gap-4 text-center py-4">
                          <div className="bg-neutral-900 p-3 rounded border border-neutral-800/40">
                            <span className="text-[10px] text-gray-500 uppercase tracking-widest block">Cuteness Rating</span>
                            <span className="text-lg sm:text-xl font-black text-[#E50914] block mt-1">100% Guaranteed</span>
                          </div>
                          <div className="bg-neutral-900 p-3 rounded border border-neutral-800/40">
                            <span className="text-[10px] text-gray-500 uppercase tracking-widest block">Smile Impact Factor</span>
                            <span className="text-lg sm:text-xl font-black text-amber-500 block mt-1">Stunning / Killer</span>
                          </div>
                          <div className="bg-neutral-900 p-3 rounded border border-neutral-800/40">
                            <span className="text-[10px] text-gray-500 uppercase tracking-widest block">Pillow Rating Index</span>
                            <span className="text-lg sm:text-xl font-black text-emerald-400 block mt-1">9.9 out of 10</span>
                          </div>
                          <div className="bg-neutral-900 p-3 rounded border border-neutral-800/40">
                            <span className="text-[10px] text-gray-500 uppercase tracking-widest block">Love Status Meter</span>
                            <span className="text-lg sm:text-xl font-black text-indigo-400 block mt-1">Infinite Match</span>
                          </div>
                        </div>

                        <div className="border-t border-dotted border-neutral-800 pt-4 text-xs font-mono text-gray-500 flex items-center justify-center space-x-1">
                          <CheckCircle className="w-4 h-4 text-emerald-500" />
                          <span>Certified Boyfriend Official Approval Stamp</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* (F) ROADMAP WISHLIST (DYNAMIC LOCAL STATE ADDITION) */}
                  {movie.playContentKey === 'future_together' && (
                    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-5 sm:p-8 w-full max-w-xl mx-auto font-sans">
                      <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-1.5">
                        <Plus className="w-5 h-5 text-red-500" />
                        <span>Our Future Roadmap</span>
                      </h3>
                      <p className="text-xs text-gray-400 uppercase tracking-widest mb-6 leading-relaxed">
                        Add vacation plans, dreams, or custom goals to our seasons roadmap
                      </p>

                      {/* Input Add form */}
                      <form onSubmit={handleAddWish} className="flex space-x-2 mb-6">
                        <input
                          type="text"
                          style={{ minHeight: '44px' }}
                          value={newWish}
                          onChange={(e) => setNewWish(e.target.value)}
                          placeholder="e.g. Scuba diving in Bali... 🐳"
                          maxLength={100}
                          className="flex-grow bg-[#141414] border border-neutral-800 hover:border-neutral-700 focus:border-red-600 rounded px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none transition-all"
                        />
                        <button
                          type="submit"
                          id="add-goal-btn"
                          style={{ minHeight: '44px' }}
                          className="px-5 bg-[#E50914] hover:bg-[#ff1521] text-white font-sans font-bold text-sm rounded flex items-center space-x-1.5 transition-colors cursor-pointer border-none outline-none"
                        >
                          <Plus className="w-4 h-4" />
                          <span className="sm:inline-block hidden">Add Item</span>
                        </button>
                      </form>

                      {/* List elements */}
                      <div className="space-y-2.5">
                        <AnimatePresence mode="popLayout">
                          {wishes.map((wish, index) => (
                            <motion.div
                              key={wish.id}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, scale: 0.9, x: 20 }}
                              className="bg-[#141414] border border-neutral-800/80 p-3.5 rounded text-xs sm:text-sm text-neutral-200 tracking-wide font-medium flex items-start justify-between shadow-inner"
                            >
                              <div className="flex items-start space-x-3.5 leading-relaxed pr-6 select-none font-sans">
                                <span className="text-xs bg-red-950/40 text-[#E50914] font-black rounded h-5 w-5 flex items-center justify-center border border-red-900/40 mt-0.5 shrink-0">
                                  {index + 1}
                                </span>
                                <div className="space-y-1 font-sans">
                                  <div className="font-bold text-white text-sm sm:text-base leading-snug">
                                    {wish.title}
                                  </div>
                                  {wish.description && (
                                    <div className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed whitespace-pre-wrap">
                                      {wish.description}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <button
                                onClick={() => handleRemoveWish(index)}
                                className="text-gray-500 hover:text-red-500 p-1.5 rounded-full hover:bg-[#1a1a1a] transition-all cursor-pointer border-none outline-none mt-0.5 shrink-0"
                                title="Remove dream"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    </div>
                  )}

                  {/* BOTTOM NOTE TRANSITION PANEL SUMMARY */}
                  <div className="mt-8 pt-6 border-t border-neutral-800 text-center">
                    <button
                      onClick={() => setActiveTab('overview')}
                      style={{ minHeight: '44px' }}
                      className="text-gray-500 hover:text-white text-xs uppercase tracking-widest font-sans font-bold hover:underline border-none bg-transparent cursor-pointer flex items-center space-x-1 mx-auto"
                    >
                      <ChevronDown className="w-4 h-4" />
                      <span>Back to overview details</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

interface SweetuVideoPlayerProps {
  autoPlay?: boolean;
}

const DB_NAME = 'LoveflixDB';
const STORE_NAME = 'media';
const KEY = 'sweetu_video';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function getVideoFromDB(): Promise<Blob | null> {
  return openDB().then(db => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(KEY);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  });
}

function saveVideoToDB(blob: Blob): Promise<void> {
  return openDB().then(db => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(blob, KEY);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  });
}

function removeVideoFromDB(): Promise<void> {
  return openDB().then(db => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(KEY);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  });
}

export function SweetuVideoPlayer({ autoPlay = false }: SweetuVideoPlayerProps) {
  const [videoUrl, setVideoUrl] = useState<string>('https://drive.google.com/file/d/1BA_DmC5NfSA81T3ksvjTjrq32Y9nJaeq/view?usp=sharing');
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const [isLocalFile, setIsLocalFile] = useState(false);
  const [loaderProgress, setLoaderProgress] = useState('CONNECTING THEATRE PROJECTOR...');
  const [showConfig, setShowConfig] = useState(false);
  const [customInputUrl, setCustomInputUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize and check video sources
  useEffect(() => {
    let active = true;

    async function checkVideoSources() {
      // 1. Try custom Link overrides
      const customUrl = localStorage.getItem('loveflix_sweetu_url');
      if (customUrl) {
        if (active) {
          setVideoUrl(customUrl);
          setIsLocalFile(false);
          setLoaderProgress('TUNING MOVIE STREAMING FEED...');
        }
        return;
      }

      // 2. Try browser physical media uploads
      try {
        const storedBlob = await getVideoFromDB();
        if (storedBlob && storedBlob.size > 0) {
          if (active) {
            const url = URL.createObjectURL(storedBlob);
            setVideoUrl(url);
            setIsLocalFile(true);
            setLoaderProgress('READYING LOCAL HIGHLIGHT REEL...');
          }
          return;
        }
      } catch (err) {
        console.warn('IndexedDB check skipped or failed:', err);
      }

      // 3. Static default Google Drive video link
      if (active) {
        setVideoUrl('https://drive.google.com/file/d/1BA_DmC5NfSA81T3ksvjTjrq32Y9nJaeq/view?usp=sharing');
        setIsLocalFile(false);
        setLoaderProgress('STREAMING ORIGINAL SURPRISE CLIPS...');
      }
    }

    checkVideoSources();

    return () => {
      active = false;
    };
  }, []);

  // Check if link is YouTube or Google Drive
  const isYouTube = videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be');
  const isGoogleDrive = videoUrl.includes('drive.google.com');
  const isIframeMedia = isYouTube || isGoogleDrive;

  // Parse embeddable URL for Google Drive, YouTube Shorts & standard YouTube videos
  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    
    // Google Drive embed format (view -> preview)
    if (url.includes('drive.google.com')) {
      const driveMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
      if (driveMatch && driveMatch[1]) {
        return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
      }
    }

    // Match YouTube Shorts ID
    const shortsMatch = url.match(/(?:\/shorts\/|video=)([a-zA-Z0-9_-]+)/);
    if (shortsMatch && shortsMatch[1]) {
      return `https://www.youtube.com/embed/${shortsMatch[1]}?autoplay=${autoPlay ? 1 : 0}&mute=0&playsinline=1&controls=1&rel=0&modestbranding=1&enablejsapi=1`;
    }
    
    // Match Standard YouTube Video ID
    const standardMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (standardMatch && standardMatch[1]) {
      return `https://www.youtube.com/embed/${standardMatch[1]}?autoplay=${autoPlay ? 1 : 0}&mute=0&playsinline=1&controls=1&rel=0&modestbranding=1&enablejsapi=1`;
    }
    
    return url;
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoaderProgress('LOADING VIDEO INTO SECURE DATABASE...');
      await saveVideoToDB(file);
      localStorage.removeItem('loveflix_sweetu_url'); // Clear text url override when manual file is selected
      
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      setIsLocalFile(true);
      setIsIframeLoaded(true);
      setLoaderProgress('LOADED!');
    } catch (err) {
      console.error('Failed to import custom video file:', err);
    }
  };

  const handleUpdateLink = (newUrl: string) => {
    const trimmed = newUrl.trim();
    if (trimmed) {
      localStorage.setItem('loveflix_sweetu_url', trimmed);
      setVideoUrl(trimmed);
      setIsLocalFile(false);
      setIsIframeLoaded(false);
      setShowConfig(false);
    }
  };

  const handleResetDefault = async () => {
    localStorage.removeItem('loveflix_sweetu_url');
    try {
      await removeVideoFromDB();
    } catch (e) {}
    
    setVideoUrl('https://drive.google.com/file/d/1BA_DmC5NfSA81T3ksvjTjrq32Y9nJaeq/view?usp=sharing');
    setIsLocalFile(false);
    setIsIframeLoaded(false);
    setShowConfig(false);
  };

  // YouTube Shorts standard aspect ratio is vertical (9:16)
  const isShortsRatio = videoUrl.includes('/shorts/') || videoUrl.includes('youtube.com/shorts');

  return (
    <div className="relative w-full h-full min-h-[240px] flex items-center justify-center bg-black rounded overflow-hidden group select-none">
      
      {/* 1. Cinematic Loading Overlay */}
      {isIframeMedia && !isIframeLoaded && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center space-y-3 bg-[#0a0a0a] p-6 text-center">
          <div className="w-10 h-10 border-4 border-t-red-600 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-1" />
          <span className="text-[10px] font-mono tracking-widest text-[#E50914] font-bold uppercase animate-pulse">
            {loaderProgress}
          </span>
          <span className="text-[9px] font-sans text-neutral-500 max-w-xs">
            Preparing beautiful high-fidelity stream frames. Thanks for your patience!
          </span>
        </div>
      )}

      {/* 2. Media Rendering Frame */}
      {isIframeMedia ? (
        <div className={`w-full h-full transition-opacity duration-700 flex items-center justify-center bg-zinc-950/40 ${isIframeLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-full h-full flex items-center justify-center">
            <iframe
              src={getEmbedUrl(videoUrl)}
              onLoad={() => setIsIframeLoaded(true)}
              className="w-full h-full rounded shadow-xl min-h-[300px]"
              title="Loveflix Private Streaming Screen"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ border: 'none', width: '100%', height: '100%' }}
            />
          </div>
        </div>
      ) : (
        <div className={`w-full h-full flex items-center justify-center ${isShortsRatio ? 'max-w-[300px] aspect-[9/16] h-auto' : 'w-full h-full'}`}>
          <video
            className="w-full h-full object-contain"
            controls
            autoPlay={autoPlay}
            playsInline
            preload="auto"
            src={videoUrl}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {/* 3. Invisible Config Panel / Overlay Actions */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20 flex space-x-2">
        <button
          onClick={() => {
            setCustomInputUrl(videoUrl);
            setShowConfig(!showConfig);
          }}
          className="px-2.5 py-1 bg-black/80 hover:bg-neutral-900 text-white text-[9px] font-sans font-bold rounded shadow border border-white/15 cursor-pointer outline-none transition-all flex items-center space-x-1"
        >
          <Sparkles className="w-3 h-3 text-red-500 fill-red-500" />
          <span>Stream Settings</span>
        </button>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="px-2 py-1 bg-neutral-800/90 hover:bg-neutral-700 text-white text-[9px] font-sans font-bold rounded shadow-sm border border-neutral-700 cursor-pointer outline-none transition-colors"
        >
          Upload Local Files
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Stream Settings Slider Dialog Panel */}
      {showConfig && (
        <div className="absolute inset-x-0 bottom-0 z-30 bg-[#121212]/95 border-t border-neutral-800 p-4 transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-sans font-black tracking-wider text-red-500 uppercase">
              Configure Stream Feed Link
            </span>
            <button
              onClick={() => setShowConfig(false)}
              className="text-neutral-500 hover:text-white border-none bg-transparent cursor-pointer outline-none p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-[9px] text-neutral-400 mb-2 leading-relaxed">
            Change the default YouTube Shorts link, paste standard YouTube url, or reset back to default easily.
          </p>
          <div className="flex space-x-2">
            <input
              type="text"
              value={customInputUrl}
              onChange={(e) => setCustomInputUrl(e.target.value)}
              placeholder="Paste YouTube Link or direct movie url here..."
              className="flex-1 bg-neutral-900 border border-neutral-800 text-neutral-200 text-[10px] px-2.5 py-1.5 rounded focus:border-red-600 focus:outline-none placeholder-neutral-600"
            />
            <button
              onClick={() => handleUpdateLink(customInputUrl)}
              className="px-3 bg-red-600 hover:bg-red-700 text-white text-[9px] font-sans font-bold rounded cursor-pointer border-none"
            >
              Update
            </button>
            <button
              onClick={handleResetDefault}
              className="px-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[9px] font-sans font-bold rounded cursor-pointer border border-neutral-700"
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
