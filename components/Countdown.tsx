"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  sleeps: number;
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    sleeps: 0,
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const calculateTimeLeft = () => {
      const christmas = new Date("2025-12-25T00:00:00");
      const now = new Date();
      const difference = christmas.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        const sleeps = days + 1;

        setTimeLeft({
          days,
          hours,
          minutes,
          seconds,
          sleeps,
        });
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          sleeps: 0,
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="w-full py-6 bg-gradient-to-r from-red-800 via-green-800 to-red-800">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center text-yellow-300 text-2xl font-bold">
            Loading countdown...
          </div>
        </div>
      </div>
    );
  }

  const formatNumber = (num: number) => {
    return num.toString().padStart(2, "0");
  };

  return (
    <div className="w-full py-6 bg-gradient-to-r from-red-800 via-green-800 to-red-800 border-b-4 border-yellow-400">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-yellow-300 mb-4 drop-shadow-lg">
            🎄 Christmas Countdown 🎄
          </h3>

          {/* Flip Clock Display */}
          <div className="flex justify-center gap-2 md:gap-4 mb-4">
            {/* Days */}
            <div className="flex flex-col items-center">
              <div className="bg-gray-900 rounded-lg p-3 md:p-4 border-4 border-yellow-400 shadow-2xl min-w-[60px] md:min-w-[80px]">
                <motion.div
                  key={timeLeft.days}
                  initial={{ rotateX: -90, opacity: 0 }}
                  animate={{ rotateX: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-3xl md:text-5xl font-mono font-bold text-white"
                >
                  {formatNumber(timeLeft.days)}
                </motion.div>
              </div>
              <span className="text-yellow-200 text-sm md:text-base font-semibold mt-2">
                DAYS
              </span>
            </div>

            <div className="text-4xl md:text-6xl font-bold text-yellow-400 self-start pt-2">
              :
            </div>

            {/* Hours */}
            <div className="flex flex-col items-center">
              <div className="bg-gray-900 rounded-lg p-3 md:p-4 border-4 border-yellow-400 shadow-2xl min-w-[60px] md:min-w-[80px]">
                <motion.div
                  key={timeLeft.hours}
                  initial={{ rotateX: -90, opacity: 0 }}
                  animate={{ rotateX: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-3xl md:text-5xl font-mono font-bold text-white"
                >
                  {formatNumber(timeLeft.hours)}
                </motion.div>
              </div>
              <span className="text-yellow-200 text-sm md:text-base font-semibold mt-2">
                HRS
              </span>
            </div>

            <div className="text-4xl md:text-6xl font-bold text-yellow-400 self-start pt-2">
              :
            </div>

            {/* Minutes */}
            <div className="flex flex-col items-center">
              <div className="bg-gray-900 rounded-lg p-3 md:p-4 border-4 border-yellow-400 shadow-2xl min-w-[60px] md:min-w-[80px]">
                <motion.div
                  key={timeLeft.minutes}
                  initial={{ rotateX: -90, opacity: 0 }}
                  animate={{ rotateX: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-3xl md:text-5xl font-mono font-bold text-white"
                >
                  {formatNumber(timeLeft.minutes)}
                </motion.div>
              </div>
              <span className="text-yellow-200 text-sm md:text-base font-semibold mt-2">
                MINS
              </span>
            </div>

            <div className="text-4xl md:text-6xl font-bold text-yellow-400 self-start pt-2">
              :
            </div>

            {/* Seconds */}
            <div className="flex flex-col items-center">
              <div className="bg-gray-900 rounded-lg p-3 md:p-4 border-4 border-yellow-400 shadow-2xl min-w-[60px] md:min-w-[80px]">
                <motion.div
                  key={timeLeft.seconds}
                  initial={{ rotateX: -90, opacity: 0 }}
                  animate={{ rotateX: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-3xl md:text-5xl font-mono font-bold text-white"
                >
                  {formatNumber(timeLeft.seconds)}
                </motion.div>
              </div>
              <span className="text-yellow-200 text-sm md:text-base font-semibold mt-2">
                SECS
              </span>
            </div>
          </div>

          {/* Sleeps Left */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 border-2 border-yellow-400/50 inline-block"
          >
            <p className="text-xl md:text-2xl font-bold text-yellow-300">
              ⭐ Only <span className="text-3xl md:text-4xl text-white">{timeLeft.sleeps}</span> sleeps left! ⭐
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
