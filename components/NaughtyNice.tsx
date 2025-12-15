"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { naughtyReasons } from "../christmasData";
import { X, Scan, CheckCircle, AlertTriangle } from "lucide-react";

interface NaughtyNiceProps {
  onClose: () => void;
}

type Result = "nice" | "naughty" | null;

export default function NaughtyNice({ onClose }: NaughtyNiceProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<Result>(null);
  const [naughtyReason, setNaughtyReason] = useState("");

  const handleMouseDown = () => {
    if (result) return; // Don't scan again if already have result

    setIsScanning(true);
    setProgress(0);

    // Animate progress bar over 3 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          determineResult();
          return 100;
        }
        return prev + 2; // Increment by 2% every 60ms = ~3 seconds
      });
    }, 60);
  };

  const handleMouseUp = () => {
    if (progress < 100) {
      setIsScanning(false);
      setProgress(0);
    }
  };

  const determineResult = () => {
    setIsScanning(false);

    // 50/50 chance
    const isNice = Math.random() > 0.5;

    if (isNice) {
      setResult("nice");
    } else {
      setResult("naughty");
      const randomReason = naughtyReasons[Math.floor(Math.random() * naughtyReasons.length)];
      setNaughtyReason(randomReason);
    }
  };

  const handleReset = () => {
    setResult(null);
    setProgress(0);
    setNaughtyReason("");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-gradient-to-br from-red-900 via-green-900 to-red-900 p-8 rounded-3xl shadow-2xl max-w-2xl w-full relative border-4 border-yellow-400"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-yellow-400 transition-colors"
        >
          <X size={32} />
        </button>

        <div className="text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-300 mb-2">
            Naughty or Nice?
          </h2>
          <p className="text-xl text-yellow-200 mb-8">
            Santa's Official Detector 🎅
          </p>

          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                key="scanner"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="relative">
                  <motion.button
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onTouchStart={handleMouseDown}
                    onTouchEnd={handleMouseUp}
                    whileHover={{ scale: isScanning ? 1 : 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-64 h-64 mx-auto rounded-full border-8 flex items-center justify-center text-2xl font-bold transition-all ${
                      isScanning
                        ? "bg-yellow-400 border-yellow-300 text-red-900 shadow-2xl shadow-yellow-400/50"
                        : "bg-white/90 border-yellow-400 text-green-900 hover:bg-yellow-100"
                    }`}
                  >
                    {isScanning ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <Scan size={80} />
                      </motion.div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <div className="text-6xl mb-2">👍</div>
                        <div>Place Thumb Here</div>
                      </div>
                    )}
                  </motion.button>

                  {isScanning && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-yellow-300 text-xl mt-4 font-semibold"
                    >
                      Scanning... Hold still!
                    </motion.p>
                  )}
                </div>

                {/* Progress Bar */}
                {isScanning && (
                  <div className="w-full max-w-md mx-auto">
                    <div className="bg-white/20 rounded-full h-6 overflow-hidden border-2 border-yellow-400">
                      <motion.div
                        className="bg-gradient-to-r from-yellow-400 to-yellow-300 h-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.1 }}
                      />
                    </div>
                    <p className="text-yellow-200 mt-2">{Math.round(progress)}%</p>
                  </div>
                )}

                <p className="text-yellow-200 text-lg">
                  Press and hold the button for 3 seconds...
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", duration: 0.8 }}
                className="py-8"
              >
                {result === "nice" ? (
                  <div className="space-y-6">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <CheckCircle size={120} className="mx-auto text-green-400" />
                    </motion.div>
                    <h3 className="text-5xl font-bold text-green-400">
                      NICE! ✨
                    </h3>
                    <p className="text-2xl text-white">
                      You're approved for gifts!
                    </p>
                    <p className="text-xl text-green-300">
                      Santa says: "Well done! Keep up the good work!" 🎁
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <motion.div
                      animate={{
                        rotate: [0, -10, 10, -10, 10, 0],
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      <AlertTriangle size={120} className="mx-auto text-red-400" />
                    </motion.div>
                    <h3 className="text-5xl font-bold text-red-400">
                      NAUGHTY! 🎅
                    </h3>
                    <div className="bg-red-900/50 border-2 border-red-400 rounded-xl p-6">
                      <p className="text-xl text-red-300 font-semibold mb-2">
                        Coal Detected!
                      </p>
                      <p className="text-2xl text-white">
                        Reason: {naughtyReason}
                      </p>
                    </div>
                    <p className="text-lg text-red-300">
                      Better luck next year! 🎄
                    </p>
                  </div>
                )}

                <div className="flex gap-4 justify-center mt-8">
                  <button
                    onClick={handleReset}
                    className="bg-yellow-400 text-red-900 px-8 py-3 rounded-xl font-bold text-lg hover:bg-yellow-300 transition-colors border-2 border-yellow-600"
                  >
                    Scan Again
                  </button>
                  <button
                    onClick={onClose}
                    className="bg-white/20 text-white px-8 py-3 rounded-xl font-bold text-lg hover:bg-white/30 transition-colors border-2 border-white/30"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
