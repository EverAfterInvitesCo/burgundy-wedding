import React, { useState, useEffect, useRef } from "react";
import { 
  Heart, MapPin, Calendar, Clock, Image as ImageIcon, Sparkles, Upload, 
  Trash2, Shield, Eye, Download, LogIn, Lock, Instagram, Check, RefreshCw,
  ChevronRight, Sparkle, Volume2, VolumeX, Database
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { addRsvp, getRsvps, deleteRsvp, addPhoto, subscribeToPhotos, deletePhoto } from "./firebase";
import {
  isSupabaseConfigured, getSupabaseCredentials, saveSupabaseCredentials,
  clearSupabaseCredentials, testSupabaseConnection, syncRsvpToSupabase,
  syncPhotoToSupabase, deleteRsvpFromSupabase, deletePhotoFromSupabase,
  fetchSupabaseRsvps, fetchSupabasePhotos
} from "./supabase";

export default function App() {
  const [curtainEnded, setCurtainEnded] = useState(false);
  const [skipCurtain, setSkipCurtain] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlayAudio = () => {
    if (!audioRef.current) return;
    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current.play().then(() => setIsPlayingAudio(true)).catch(console.error);
    }
  };

  useEffect(() => {
    const showMain = curtainEnded || skipCurtain;
    if (showMain && audioRef.current) {
      const timer = setTimeout(() => {
        audioRef.current?.play().then(() => setIsPlayingAudio(true)).catch(() => setIsPlayingAudio(false));
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [curtainEnded, skipCurtain]);

  const [mediaErrors, setMediaErrors] = useState<Record<string, boolean>>({});
  const handleMediaError = (key: string) => setMediaErrors((prev) => ({ ...prev, [key]: true }));

  const showMainSite = curtainEnded || skipCurtain;

  return (
    <div className="min-h-screen bg-burgundy-950 text-burgundy-50 font-sans relative overflow-x-hidden">
      <audio
        ref={audioRef}
        src="media/sparks.mp3"
        loop
        preload="auto"
      />

      <AnimatePresence>
        {!showMainSite && (
          <motion.div 
            key="curtains-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            onClick={() => setSkipCurtain(true)}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-burgundy-950 overflow-hidden cursor-pointer"
          >
            <div className="absolute inset-0 w-full h-full object-cover">
              {!mediaErrors["curtains"] ? (
                <video 
                  src="media/curtains.mp4" 
                  autoPlay 
                  muted 
                  playsInline
                  onEnded={() => setCurtainEnded(true)}
                  onError={() => handleMediaError("curtains")}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-r from-burgundy-950 via-burgundy-800 to-burgundy-950" />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showMainSite && (
        <div className="relative">
           {/* Chandelier Video Element */}
           <div className="relative w-full h-64 overflow-hidden">
             <video 
                src="media/chandelier.mp4" 
                autoPlay 
                muted 
                loop 
                playsInline
                className="w-full h-full object-cover opacity-80"
             />
           </div>
           
           <h1 className="text-center pt-20">Welcome to Yara x Ahmed's Wedding</h1>
        </div>
      )}
    </div>
  );
}
