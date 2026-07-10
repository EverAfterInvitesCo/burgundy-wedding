import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Volume2, VolumeX, ChevronDown } from "lucide-react";

export default function App() {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Audio Handler
  const togglePlayAudio = () => {
    if (!audioRef.current) return;
    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current.play().then(() => setIsPlayingAudio(true)).catch(console.error);
    }
  };

  // Countdown Logic
  useEffect(() => {
    const targetDate = new Date("2026-09-09T18:00:00+02:00").getTime();
    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-rose-950 text-gold-100 font-serif overflow-x-hidden">
      <audio ref={audioRef} src="media/sparks.mp3" loop preload="auto" />
      
      {/* Hero Section */}
      <div className="h-screen flex flex-col items-center justify-center relative border-b border-gold-800/30">
        <button onClick={togglePlayAudio} className="absolute top-6 right-6 text-gold-500">
          {isPlayingAudio ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </button>

        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="text-center"
        >
          <p className="text-gold-500 uppercase tracking-widest text-sm mb-4">The Celebration of Love</p>
          <h1 className="text-6xl md:text-8xl mb-6">Yara & Ahmed</h1>
          <p className="text-2xl italic font-serif">Are Getting Married</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10"
        >
          <p className="text-sm uppercase tracking-widest text-gold-700">Scroll to discover</p>
          <ChevronDown className="mx-auto mt-2 text-gold-500 animate-bounce" />
        </motion.div>
      </div>

      {/* Countdown Section */}
      <section className="py-20 flex flex-col items-center justify-center border-b border-gold-800/30">
        <h2 className="text-3xl text-gold-500 mb-12 uppercase tracking-[0.2em]">Counting down the days</h2>
        
        <div className="flex gap-8 md:gap-16">
          {[
            { label: "Days", value: countdown.days },
            { label: "Hours", value: countdown.hours },
            { label: "Minutes", value: countdown.minutes },
            { label: "Seconds", value: countdown.seconds },
          ].map((item, idx) => (
            <div key={idx} className="text-center">
              <div className="text-4xl md:text-5xl font-serif text-white mb-2">{item.value}</div>
              <div className="text-[10px] uppercase tracking-widest text-gold-600">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Placeholder for the next section */}
      <div className="p-10 text-center text-gold-500">
        [Add next section here]
      </div>
    </div>
  );
}
