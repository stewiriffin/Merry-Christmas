"use client";

import { motion } from "framer-motion";
import { yearInReviewMessage } from "../christmasData";
import { X, Heart } from "lucide-react";

interface PhotoWallProps {
  onClose: () => void;
}

export default function PhotoWall({ onClose }: PhotoWallProps) {
  // Generate photo IDs for variety
  const photoIds = [100, 200, 300, 400, 500, 600, 700, 800, 900];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 overflow-y-auto"
      onClick={onClose}
    >
      <div className="min-h-screen p-4 md:p-8">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="max-w-6xl mx-auto bg-gradient-to-br from-red-900 via-green-900 to-red-900 rounded-3xl shadow-2xl border-4 border-yellow-400 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative p-6 md:p-10">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:text-yellow-400 transition-colors z-10"
            >
              <X size={32} />
            </button>

            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-6xl font-bold text-yellow-300 mb-4">
                2025 Memories
              </h2>
              <Heart className="mx-auto text-red-400" size={40} />
            </div>

            {/* Year in Review Message */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 mb-8 border-2 border-yellow-400/30"
            >
              <div className="text-white whitespace-pre-line text-center text-base md:text-lg leading-relaxed">
                {yearInReviewMessage}
              </div>
            </motion.div>

            {/* Photo Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {photoIds.map((id, index) => (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  className="relative group"
                >
                  <div className="aspect-square rounded-xl overflow-hidden border-4 border-white/20 shadow-xl">
                    <img
                      src={`https://picsum.photos/400/400?random=${id}`}
                      alt={`Family memory ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-end justify-center pb-4">
                    <span className="text-white font-semibold text-lg">
                      Memory #{index + 1}
                    </span>
                  </div>

                  {/* Decorative corner ribbon */}
                  <div className="absolute -top-2 -right-2 bg-yellow-400 text-red-900 rounded-full w-10 h-10 flex items-center justify-center font-bold shadow-lg">
                    {index + 1}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Close Button at Bottom */}
            <div className="text-center mt-8">
              <button
                onClick={onClose}
                className="bg-yellow-400 text-red-900 px-8 py-4 rounded-xl font-bold text-xl hover:bg-yellow-300 transition-colors border-2 border-yellow-600 shadow-lg"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
