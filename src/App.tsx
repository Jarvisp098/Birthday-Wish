import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Bell, MessageCircleHeart, Info, LogOut, Heart, 
  Menu, X, Sparkles, Smile, RefreshCw
} from 'lucide-react';
import { Profile, Movie } from './types';
import { HERO_MOVIE, MOVIE_ROWS } from './data';
import NetflixIntro from './components/NetflixIntro';
import ProfileSelection from './components/ProfileSelection';
import HomeBillboard from './components/HomeBillboard';
import MovieRow from './components/MovieRow';
import MovieDetailModal from './components/MovieDetailModal';
import MusicPlayer from './components/MusicPlayer';

export default function App() {
  const [currentStage, setCurrentStage] = useState<'intro' | 'profile' | 'home'>('intro');
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  
  // Navbar states
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Set page title for website in new tab
  useEffect(() => {
    document.title = "Happy Birthday Sweetu ❤️";
  }, []);

  // Monitor screen scrolls to add dark overlay style to Netflix header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleIntroComplete = () => {
    setCurrentStage('profile');
  };

  const handleProfileSelect = (profile: Profile) => {
    setSelectedProfile(profile);
    setCurrentStage('home');
  };

  const handleMovieOpen = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleMovieClose = () => {
    setSelectedMovie(null);
  };

  const handleSwitchProfile = () => {
    setSelectedProfile(null);
    setCurrentStage('profile');
    setShowProfileMenu(false);
  };

  const notifications = [
    { id: 'n1', text: "🍿 Loveflix Special Released: 'Our Beautiful Love Story'", date: "Just Now" },
    { id: 'n2', text: "💌 New Message: 'Your boyfriend expects a giant cuddle celebration on June 15th'", date: "2m ago" },
    { id: 'n3', text: "❤️ Compliment System Online: Trigger 'The Compliment Shower' card details!", date: "1h ago" }
  ];

  return (
    <div id="loveflix-app-wrapper" className="min-h-screen bg-[#141414] text-white overflow-x-hidden relative font-sans">
      <AnimatePresence mode="wait">
        {/* STAGE 1: Cinematic Netflix Sound Intro */}
        {currentStage === 'intro' && (
          <NetflixIntro onComplete={handleIntroComplete} />
        )}

        {/* STAGE 2: "Who's watching?" Profile selector */}
        {currentStage === 'profile' && (
          <ProfileSelection onProfileSelect={handleProfileSelect} />
        )}

        {/* STAGE 3: Main Netflix Home Page Dashboard */}
        {currentStage === 'home' && selectedProfile && (
          <motion.div
            key="home-dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="pb-16"
          >
            {/* Ambient Music Synthesizer Player */}
            <MusicPlayer />

            {/* Premium Sticky Netflix Header Navbar */}
            <header 
              id="loveflix-navbar"
              className={`fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 sm:px-12 md:px-16 py-3 transition-colors duration-300 ${
                scrolled ? 'bg-[#141414]/95 shadow-[0_2px_15px_rgba(0,0,0,0.8)]' : 'bg-gradient-to-b from-black/80 to-transparent'
              }`}
            >
              {/* Left Column: branding and basic categories */}
              <div className="flex items-center space-x-6 sm:space-x-10">
                <h1 
                  id="navbar-brand-logo"
                  onClick={handleSwitchProfile}
                  className="text-[#E50914] text-xl sm:text-2xl font-black tracking-tighter cursor-pointer drop-shadow select-none hover:scale-102 transition-transform"
                >
                  LOVEFLIX
                </h1>
                
                {/* Desktop links */}
                <nav className="hidden md:flex items-center space-x-5 text-sm font-sans font-medium text-gray-300">
                  <span className="text-white font-bold cursor-default">Home</span>
                  <span className="hover:text-gray-400 cursor-pointer transition-colors" onClick={() => handleMovieOpen(HERO_MOVIE)}>Series</span>
                  <span className="hover:text-gray-400 cursor-pointer transition-colors" onClick={() => handleMovieOpen(HERO_MOVIE)}>My List</span>
                  <span className="text-[#E50914] font-black tracking-wide flex items-center space-x-1 animate-pulse select-none">
                    <Sparkles className="w-3.5 h-3.5 fill-red-600" />
                    <span>Birthday Edition</span>
                  </span>
                </nav>
              </div>

              {/* Right Column: interactive notification bell and profile quick select */}
              <div className="flex items-center space-x-4 sm:space-x-6 relative">
                {/* Search overlay placeholder icon */}
                <button
                  id="search-overlay-trigger"
                  className="text-gray-300 hover:text-white transition-colors border-none bg-transparent cursor-pointer p-1"
                  title="Search Memories"
                  onClick={() => alert("🔍 Searching in your heart... Match found: Your Boyfriend! 💖")}
                >
                  <Search className="w-5 h-5" />
                </button>

                {/* Notifications Bell Dropdown */}
                <div className="relative">
                  <button
                    id="notification-bell-btn"
                    onClick={() => {
                      setShowNotifications(!showNotifications);
                      setShowProfileMenu(false);
                    }}
                    style={{ minHeight: '38px', minWidth: '38px' }}
                    className="relative text-gray-300 hover:text-white transition-colors border-none bg-transparent cursor-pointer p-1.5 flex items-center justify-center rounded-full hover:bg-zinc-900/45"
                    title="See Special Love Notifications"
                  >
                    <Bell className="w-5 h-5" />
                    {/* Glowing active red notification pill */}
                    <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E50914] rounded-full animate-ping" />
                    <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E50914] rounded-full" />
                  </button>

                  <AnimatePresence>
                    {showNotifications && (
                      <motion.div
                        id="notifications-drawer"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute right-0 mt-3 bg-[#181818]/95 border border-neutral-800 rounded shadow-2xl w-72 sm:w-80 overflow-hidden text-sm"
                      >
                        <div className="p-3 border-b border-neutral-800 bg-neutral-900 font-semibold tracking-wide text-xs text-gray-400 uppercase flex justify-between items-center">
                          <span>Inside Love Notifications</span>
                          <span className="text-red-500 font-bold">● Active</span>
                        </div>
                        <div className="divide-y divide-neutral-800/60 font-sans max-h-72 overflow-y-auto">
                          {notifications.map((notif) => (
                            <div key={notif.id} className="p-4 hover:bg-neutral-900 transition-colors space-y-1">
                              <p className="text-xs text-gray-200 leading-relaxed font-semibold">
                                {notif.text}
                              </p>
                              <span className="text-[10px] text-gray-500 block">{notif.date}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Profile Avatar Dropper */}
                <div className="relative">
                  <div
                    id="profile-dropdown-trigger"
                    onClick={() => {
                      setShowProfileMenu(!showProfileMenu);
                      setShowNotifications(false);
                    }}
                    className="flex items-center space-x-1.5 cursor-pointer group"
                  >
                    <img
                      src={selectedProfile.avatarUrl}
                      alt={selectedProfile.name}
                      referrerPolicy="no-referrer"
                      className="w-7.5 h-7.5 rounded object-cover border border-transparent group-hover:border-white transition-all"
                    />
                    <div className="w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-t-[4px] border-t-white opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <AnimatePresence>
                    {showProfileMenu && (
                      <motion.div
                        id="profile-actions-menu"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute right-0 mt-3 bg-[#181818] border border-neutral-800 rounded shadow-2xl w-52 overflow-hidden text-sm font-sans"
                      >
                        <div className="p-3.5 border-b border-neutral-800 select-none bg-neutral-900 text-center">
                          <p className="text-xs text-[#E50914] font-black uppercase tracking-wider mb-0.5">Watching Profile</p>
                          <p className="text-sm text-gray-200 font-bold truncate">{selectedProfile.name}</p>
                        </div>
                        
                        <div className="p-1.5">
                          <button
                            id="profile-switch-btn"
                            onClick={handleSwitchProfile}
                            style={{ minHeight: '38px' }}
                            className="w-full text-left px-3 py-2 text-zinc-300 hover:text-white hover:bg-zinc-800 text-xs rounded transition-colors flex items-center space-x-2.5 border-none outline-none cursor-pointer bg-transparent"
                          >
                            <RefreshCw className="w-3.5 h-3.5 text-zinc-400" />
                            <span>Switch Profile</span>
                          </button>
                          
                          <div className="border-t border-neutral-800/80 my-1" />
                          
                          <p className="text-[10px] text-gray-500 font-mono text-center py-2 px-3 italic leading-relaxed select-none bg-neutral-900/30 rounded">
                            "Always 100% matched in everything we watch."
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </header>

            {/* Stage Hero/Billboard Banner Area */}
            <HomeBillboard 
              onPlayClick={handleMovieOpen} 
              onInfoClick={handleMovieOpen} 
              profileName={selectedProfile.name}
            />

            {/* Row collection layouts */}
            <main id="movie-catalog-categories" className="relative z-20 space-y-6 sm:space-y-12 bg-[#141414] pt-4 -mt-1 sm:-mt-2 md:-mt-3">
              {MOVIE_ROWS.map((category) => (
                <MovieRow
                  key={category.categoryTitle}
                  categoryTitle={category.categoryTitle}
                  movies={category.movies}
                  onMovieClick={handleMovieOpen}
                  onPlayClick={handleMovieOpen}
                />
              ))}
            </main>

            {/* Custom styled Netflix footer */}
            <footer id="loveflix-footer" className="max-w-4xl mx-auto px-6 sm:px-12 md:px-16 mt-16 text-center sm:text-left text-neutral-500 font-sans text-xs space-y-6 select-none border-t border-neutral-800/40 pt-10">
              <div className="flex items-center justify-center sm:justify-start space-x-2 text-neutral-400 text-lg mb-6">
                <Heart className="w-5 h-5 text-[#E50914] fill-[#E50914]" />
                <span className="font-extrabold tracking-tight">LOVEFLIX SERVICES</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 leading-relaxed font-light">
                <div className="space-y-2">
                  <p className="hover:underline cursor-pointer">Official Guidelines</p>
                  <p className="hover:underline cursor-pointer">Unlimited Hugs Terms</p>
                  <p className="hover:underline cursor-pointer">Cuddle Diagnostics</p>
                </div>
                <div className="space-y-2">
                  <p className="hover:underline cursor-pointer">Cookie Settings</p>
                  <p className="hover:underline cursor-pointer">Boyfriend Service Desk</p>
                  <p className="hover:underline cursor-pointer">Special Memories</p>
                </div>
                <div className="space-y-2">
                  <p className="hover:underline cursor-pointer">Media Center</p>
                  <p className="hover:underline cursor-pointer">Loyalty Index</p>
                  <p className="hover:underline cursor-pointer">Future Subscriptions</p>
                </div>
                <div className="space-y-2">
                  <p className="hover:underline cursor-pointer">Terms of Use</p>
                  <p className="hover:underline cursor-pointer">Corporate Sovereignty</p>
                  <p className="hover:underline cursor-pointer">Destiny Registry</p>
                </div>
              </div>

              <div className="pt-8 text-neutral-600 flex flex-col sm:flex-row sm:justify-between items-center text-[10px] sm:text-xs">
                <span>© 2026 Loveflix Entertainment India, Inc. Created with pure heart for your special day.</span>
                <span className="text-[#E50914] font-bold mt-2 sm:mt-0 tracking-wide uppercase border border-[#E50914]/40 px-2 py-0.5 rounded">
                  Maturity: Lovable 100%
                </span>
              </div>
            </footer>

            {/* POP-UP DETAIL MODAL OVERVIEW FRAME CONTAINER */}
            <AnimatePresence>
              {selectedMovie && (
                <MovieDetailModal
                  movie={selectedMovie}
                  onClose={handleMovieClose}
                  onPlayClick={handleMovieOpen}
                />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
