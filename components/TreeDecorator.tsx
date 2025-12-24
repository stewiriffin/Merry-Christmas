"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, RotateCcw, Sparkles } from "lucide-react";

interface TreeDecoratorProps {
  onClose: () => void;
}

interface Decoration {
  id: string;
  emoji: string;
  x: number;
  y: number;
}

const ornamentEmojis = ["🎄", "⭐", "🎅", "🎁", "🔴", "🔵", "🎀", "🔔", "❄️", "🕯️"];

export default function TreeDecorator({ onClose }: TreeDecoratorProps) {
  const [decorations, setDecorations] = useState<Decoration[]>([]);

  const handleDragEnd = (emoji: string, event: any, info: any) => {
    const newDecoration: Decoration = {
      id: `${Date.now()}-${Math.random()}`,
      emoji,
      x: info.point.x,
      y: info.point.y,
    };

    setDecorations([...decorations, newDecoration]);
  };

  const handleReset = () => {
    setDecorations([]);
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
        className="bg-gradient-to-br from-green-900 via-red-900 to-green-900 p-6 md:p-8 rounded-3xl shadow-2xl max-w-5xl w-full relative border-4 border-yellow-400 max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-yellow-400 transition-colors z-50"
        >
          <X size={32} />
        </button>

        <div className="text-center text-white mb-6">
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-300 mb-2 flex items-center justify-center gap-3">
            <Sparkles className="text-yellow-400" />
            Decorate the Tree
            <Sparkles className="text-yellow-400" />
          </h2>
          <p className="text-xl text-yellow-200">
            Drag ornaments from the toy box onto the tree!
          </p>
        </div>

        <div className="relative bg-gradient-to-b from-blue-900/30 to-blue-950/30 rounded-2xl p-8 mb-6 min-h-[400px] md:min-h-[500px] overflow-hidden border-2 border-yellow-400/30">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg
              viewBox="0 0 200 240"
              className="w-64 md:w-80 h-auto drop-shadow-2xl"
            >
              <polygon
                points="100,20 60,80 140,80"
                fill="#2d5016"
                stroke="#1e3a1e"
                strokeWidth="2"
              />
              <polygon
                points="100,60 50,130 150,130"
                fill="#2d5016"
                stroke="#1e3a1e"
                strokeWidth="2"
              />
              <polygon
                points="100,100 40,180 160,180"
                fill="#2d5016"
                stroke="#1e3a1e"
                strokeWidth="2"
              />
              <rect
                x="85"
                y="180"
                width="30"
                height="40"
                fill="#8B4513"
                stroke="#654321"
                strokeWidth="2"
              />
              <polygon
                points="100,5 105,18 118,18 108,26 112,38 100,30 88,38 92,26 82,18 95,18"
                fill="#FFD700"
                stroke="#FFA500"
                strokeWidth="1"
              />
            </svg>
          </div>

          <AnimatePresence>
            {decorations.map((decoration) => (
              <motion.div
                key={decoration.id}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                className="absolute text-4xl pointer-events-none"
                style={{
                  left: decoration.x - 24,
                  top: decoration.y - 24,
                }}
              >
                {decoration.emoji}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="bg-gradient-to-br from-yellow-700 to-yellow-900 rounded-2xl p-4 border-4 border-yellow-400">
          <div className="flex items-center justify-center gap-2 mb-3">
            <h3 className="text-2xl font-bold text-white">🎁 Toy Box 🎁</h3>
          </div>

          <div className="grid grid-cols-5 md:grid-cols-10 gap-3 mb-4">
            {ornamentEmojis.map((emoji, index) => (
              <motion.div
                key={`${emoji}-${index}`}
                drag
                dragSnapToOrigin
                dragElastic={0.7}
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                onDragEnd={(event, info) => handleDragEnd(emoji, event, info)}
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileDrag={{ scale: 1.3, cursor: "grabbing" }}
                className="text-5xl cursor-grab active:cursor-grabbing bg-white/20 rounded-xl p-2 flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                {emoji}
              </motion.div>
            ))}
          </div>

          <p className="text-center text-yellow-200 text-sm">
            💡 Tip: Drag and drop ornaments onto the tree above!
          </p>
        </div>

        <div className="flex gap-4 justify-center mt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold text-lg hover:bg-red-500 transition-colors border-2 border-red-400 flex items-center gap-2"
          >
            <RotateCcw size={20} />
            Reset Tree
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="bg-yellow-400 text-green-900 px-6 py-3 rounded-xl font-bold text-lg hover:bg-yellow-300 transition-colors border-2 border-yellow-600"
          >
            Done
          </motion.button>
        </div>

        {decorations.length > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-center mt-4"
          >
            <p className="text-yellow-300 text-lg font-semibold">
              🎨 {decorations.length} ornament{decorations.length !== 1 ? "s" : ""} placed!
            </p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
