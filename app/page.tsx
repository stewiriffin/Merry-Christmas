"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SnowEffect from "../components/SnowEffect";
import TriviaGame from "../components/TriviaGame";
import PhotoWall from "../components/PhotoWall";
import NaughtyNice from "../components/NaughtyNice";
import TreeDecorator from "../components/TreeDecorator";
import Countdown from "../components/Countdown";
import { useChristmasSound } from "../hooks/useChristmasSound";
import YouTube from "react-youtube";
import { Gift, Music, Images, PartyPopper, Scan, TreePine } from "lucide-react";

type View = "landing" | "dashboard";
type Modal = "trivia" | "song" | "photos" | "naughty" | "tree" | null;

export default function ChristmasCard() {
  const [view, setView] = useState<View>("landing");
  const [activeModal, setActiveModal] = useState<Modal>(null);
  const { playSound } = useChristmasSound();

  const handleOpenPresent = () => {
    playSound();
    setView("dashboard");
  };

  const ornaments = [
    {
      id: "trivia",
      icon: PartyPopper,
      color: "from-green-600 to-green-800",
      title: "Family Trivia",
      description: "Test your family knowledge!",
      delay: 0.3,
    },
    {
      id: "tree",
      icon: TreePine,
      color: "from-emerald-600 to-emerald-800",
      title: "Decorate Tree",
      description: "Drag ornaments to decorate!",
      delay: 0.35,
    },
    {
      id: "naughty",
      icon: Scan,
      color: "from-yellow-500 to-yellow-700",
      title: "Naughty or Nice",
      description: "Scan your thumbprint!",
      delay: 0.4,
    },
    {
      id: "song",
      icon: Music,
      color: "from-red-600 to-red-800",
      title: "Our Song",
      description: "Listen to Christmas classics!",
      delay: 0.45,
    },
    {
      id: "photos",
      icon: Images,
      color: "from-green-600 to-green-800",
      title: "2025 Memories",
      description: "Relive our amazing year!",
      delay: 0.5,
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <SnowEffect />

      <AnimatePresence mode="wait">
        {view === "landing" ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="min-h-screen bg-gradient-to-br from-green-700 via-red-700 to-green-800 flex flex-col relative z-10"
          >
            <Countdown />

            <div className="flex-1 flex items-center justify-center p-4">
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 drop-shadow-2xl">
                Merry Christmas
              </h1>
              <h2 className="text-3xl md:text-5xl text-yellow-300 mb-12 drop-shadow-lg">
                Mbae's Family 2025
              </h2>

              <motion.div
                animate={{
                  rotate: [0, -5, 5, -5, 0],
                  scale: [1, 1.05, 1, 1.05, 1],
                }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <Gift size={100} className="mx-auto text-yellow-400 mb-8 drop-shadow-lg" />
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleOpenPresent}
                className="bg-yellow-400 text-red-900 px-12 py-6 rounded-2xl font-bold text-2xl md:text-3xl shadow-2xl border-4 border-white hover:bg-yellow-300 transition-colors"
              >
                Open Present 🎁
              </motion.button>
            </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            className="min-h-screen bg-gradient-to-br from-red-950 via-red-900 to-red-950 relative z-10 pb-12"
          >
            <div className="relative">
              <svg
                className="w-full h-24 md:h-32"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0,60 Q300,80 600,60 T1200,60 L1200,0 L0,0 Z"
                  fill="#1e3a1e"
                  className="drop-shadow-2xl"
                />
                <path
                  d="M0,60 Q300,80 600,60 T1200,60"
                  fill="none"
                  stroke="#2d5016"
                  strokeWidth="8"
                />
              </svg>
            </div>

            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-8 md:mb-16 px-4"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-yellow-300 mb-2 drop-shadow-lg">
                The Living Room
              </h1>
              <p className="text-xl md:text-2xl text-yellow-200">
                Click an ornament to begin!
              </p>
            </motion.div>

            <div className="max-w-6xl mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
                {ornaments.map((ornament) => {
                  const Icon = ornament.icon;
                  return (
                    <motion.div
                      key={ornament.id}
                      initial={{ y: -100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        delay: ornament.delay,
                        type: "spring",
                        stiffness: 100,
                      }}
                      className="flex flex-col items-center"
                    >
                      <motion.div
                        className="w-0.5 bg-yellow-200/60 mb-2"
                        initial={{ height: 0 }}
                        animate={{ height: 60 }}
                        transition={{ delay: ornament.delay, duration: 0.5 }}
                      />

                      <motion.div
                        whileHover={{
                          rotate: [0, -8, 8, -8, 8, 0],
                          scale: 1.1,
                        }}
                        transition={{
                          rotate: {
                            duration: 1,
                            ease: "easeInOut",
                          },
                          scale: {
                            duration: 0.2,
                          },
                        }}
                        onClick={() => {
                          playSound();
                          setActiveModal(ornament.id as Modal);
                        }}
                        className="cursor-pointer relative group"
                        style={{
                          transformOrigin: "top center",
                        }}
                      >
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-6 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-t-lg z-10" />

                        <div
                          className={`w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br ${ornament.color} shadow-2xl border-4 border-yellow-400/50 flex items-center justify-center transform transition-all group-hover:border-yellow-300 group-hover:shadow-yellow-400/50`}
                        >
                          <div className="text-center">
                            <Icon className="mx-auto text-white mb-2" size={48} />
                            <p className="text-white font-bold text-sm md:text-base px-2">
                              {ornament.title}
                            </p>
                          </div>
                        </div>

                        <div className="absolute top-6 left-6 w-12 h-12 bg-white/30 rounded-full blur-md" />
                      </motion.div>

                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: ornament.delay + 0.3 }}
                        className="text-yellow-200 text-sm md:text-base mt-4 text-center px-2"
                      >
                        {ornament.description}
                      </motion.p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeModal === "trivia" && (
          <TriviaGame onClose={() => setActiveModal(null)} />
        )}

        {activeModal === "tree" && (
          <TreeDecorator onClose={() => setActiveModal(null)} />
        )}

        {activeModal === "naughty" && (
          <NaughtyNice onClose={() => setActiveModal(null)} />
        )}

        {activeModal === "song" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gradient-to-br from-red-900 to-green-900 p-6 md:p-8 rounded-3xl shadow-2xl max-w-3xl w-full border-4 border-yellow-400"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-yellow-300 mb-6 text-center">
                🎵 All I Want for Christmas Is You 🎵
              </h2>
              <div className="aspect-video rounded-xl overflow-hidden shadow-xl">
                <YouTube
                  videoId="aAkMkVFwAoo"
                  opts={{
                    width: "100%",
                    height: "100%",
                    playerVars: {
                      autoplay: 1,
                    },
                  }}
                  className="w-full h-full"
                />
              </div>
              <button
                onClick={() => {
                  playSound();
                  setActiveModal(null);
                }}
                className="mt-6 w-full bg-yellow-400 text-red-900 px-6 py-4 rounded-xl font-bold text-xl hover:bg-yellow-300 transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}

        {activeModal === "photos" && (
          <PhotoWall onClose={() => setActiveModal(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
