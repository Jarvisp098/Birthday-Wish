import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Profile } from '../types';
import { PROFILES } from '../data';
import { Lock, Settings, Sparkles } from 'lucide-react';

interface ProfileSelectionProps {
  onProfileSelect: (profile: Profile) => void;
}

export default function ProfileSelection({ onProfileSelect }: ProfileSelectionProps) {
  const [loadingProfileId, setLoadingProfileId] = useState<string | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleProfileClick = (profile: Profile) => {
    if (profile.isGirlfriend) {
      setLoadingProfileId(profile.id);
      // Wait for a classic Netflix loading screen before unlocking
      setTimeout(() => {
        onProfileSelect(profile);
      }, 1800);
    } else {
      // Funny responsive block messages
      if (profile.id === 'bf') {
        setAlertMessage("❌ Access Denied! The Director cannot steal the spotlight today. This theater is exclusively reserved for the Queen!");
      } else if (profile.id === 'companion') {
        setAlertMessage("🐶 Woof! Doggy is currently chewing a slipper and has lost their screen-time privileges!");
      } else if (profile.id === 'future') {
        setAlertMessage("⏳ Locked! This season is scheduled for a future release date. Please enjoy your current relationship status!");
      } else {
        setAlertMessage("❌ Only room for you in my heart today!");
      }
      setTimeout(() => {
        setAlertMessage(null);
      }, 5000);
    }
  };

  return (
    <div id="netflix-profile-selection" className="relative min-h-screen bg-[#141414] text-white flex flex-col items-center justify-center p-6 select-none font-sans overflow-y-auto">
      {/* Dynamic Background Halo effect */}
      <div className="absolute inset-0 bg-radial from-red-950/20 via-transparent to-transparent pointer-events-none" />

      <AnimatePresence mode="wait">
        {loadingProfileId ? (
          // Netflix Loading Spinner View
          <motion.div
            key="spinner-loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center space-y-4"
          >
            {/* Spinning Circle */}
            <div className="w-16 h-16 border-4 border-t-[#E50914] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-gray-400 font-sans text-sm font-medium tracking-widest uppercase mt-4"
            >
              Setting up your custom theater...
            </motion.p>
          </motion.div>
        ) : (
          // Profiles List View
          <motion.div
            key="profiles-list"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-4xl text-center z-10 flex flex-col items-center py-8"
          >
            <h1 className="text-3xl sm:text-5xl font-sans font-medium tracking-wide mb-8 sm:mb-12">
              Who's watching?
            </h1>

            {/* Profiles Container Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 justify-center max-w-3xl w-full px-4 mb-16">
              {PROFILES.map((profile, idx) => (
                <motion.div
                  key={profile.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, type: 'spring', stiffness: 80 }}
                  onClick={() => handleProfileClick(profile)}
                  className="flex flex-col items-center group cursor-pointer"
                >
                  {/* Avatar Frame Wrapper */}
                  <div className="relative aspect-square w-24 h-24 sm:w-32 sm:h-32 mb-4 rounded border-2 border-transparent group-hover:border-white transition-all overflow-hidden duration-300">
                    <img
                      src={profile.avatarUrl}
                      alt={profile.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                    />
                    
                    {/* Visual hints */}
                    {!profile.isGirlfriend && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity">
                        <Lock className="w-5 h-5 text-gray-400 group-hover:text-white" />
                      </div>
                    )}
                    {profile.isGirlfriend && (
                      <div className="absolute top-1 right-1 bg-[#E50914] p-1 rounded-full shadow-lg animate-pulse">
                        <Sparkles className="w-3.5 h-3.5 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Profile Name Text */}
                  <span className="text-sm sm:text-base text-gray-400 font-sans tracking-wide group-hover:text-white transition-colors duration-200">
                    {profile.name}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Manage Profiles Sleek Netflix Outlined Button */}
            <button
              id="manage-profiles-btn"
              onClick={() => setAlertMessage("❤️ There is no management needed, you own 100% of my heart!")}
              style={{ minHeight: '44px' }}
              className="px-6 py-2 border border-gray-500 hover:border-white text-gray-500 hover:text-white font-sans text-xs tracking-widest uppercase transition-all duration-200 bg-transparent flex items-center space-x-2 mt-4 cursor-pointer outline-none"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Manage Profiles</span>
            </button>

            {/* Notification alert banner */}
            <AnimatePresence>
              {alertMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="mt-8 px-6 py-3 bg-neutral-900 border border-[#E50914] text-gray-200 rounded text-xs sm:text-sm font-sans max-w-md shadow-[0_10px_25px_rgba(0,0,0,0.5)] leading-relaxed tracking-wide"
                >
                  {alertMessage}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
