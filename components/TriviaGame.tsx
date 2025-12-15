"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { familyTriviaQuestions } from "../christmasData";
import { Trophy, X } from "lucide-react";

interface TriviaGameProps {
  onClose: () => void;
}

export default function TriviaGame({ onClose }: TriviaGameProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    if (isAnswerRevealed) return;

    setSelectedAnswer(answerIndex);
    setIsAnswerRevealed(true);

    if (answerIndex === familyTriviaQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < familyTriviaQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setIsAnswerRevealed(false);
      } else {
        setShowResult(true);
      }
    }, 1500);
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
        className="bg-gradient-to-br from-green-900 via-red-900 to-green-900 p-8 rounded-3xl shadow-2xl max-w-2xl w-full relative border-4 border-yellow-400"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-yellow-400 transition-colors"
        >
          <X size={32} />
        </button>

        {!showResult ? (
          <div className="text-white">
            <div className="mb-6">
              <h2 className="text-4xl font-bold text-yellow-300 mb-2 text-center">
                Family Trivia
              </h2>
              <p className="text-center text-yellow-200">
                Question {currentQuestion + 1} of {familyTriviaQuestions.length}
              </p>
            </div>

            <motion.div
              key={currentQuestion}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="mb-8"
            >
              <h3 className="text-2xl font-semibold mb-6 text-center">
                {familyTriviaQuestions[currentQuestion].question}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {familyTriviaQuestions[currentQuestion].options.map((option, index) => {
                  const isCorrect =
                    index === familyTriviaQuestions[currentQuestion].correctAnswer;
                  const isSelected = index === selectedAnswer;
                  const showCorrect = isAnswerRevealed && isCorrect;
                  const showWrong = isAnswerRevealed && isSelected && !isCorrect;

                  return (
                    <motion.button
                      key={index}
                      whileHover={{ scale: isAnswerRevealed ? 1 : 1.05 }}
                      whileTap={{ scale: isAnswerRevealed ? 1 : 0.95 }}
                      onClick={() => handleAnswer(index)}
                      disabled={isAnswerRevealed}
                      className={`p-4 rounded-xl font-semibold text-lg transition-all border-2 ${
                        showCorrect
                          ? "bg-green-500 border-green-300 text-white"
                          : showWrong
                          ? "bg-red-500 border-red-300 text-white"
                          : "bg-white/90 border-yellow-400 text-green-900 hover:bg-yellow-100"
                      }`}
                    >
                      {option}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            <div className="text-center text-yellow-200 text-xl">
              Score: {score}/{familyTriviaQuestions.length}
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-center text-white"
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 10, 0],
                scale: [1, 1.1, 1, 1.1, 1],
              }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Trophy size={100} className="mx-auto text-yellow-400 mb-4" />
            </motion.div>

            <h2 className="text-5xl font-bold text-yellow-300 mb-4">
              {score === familyTriviaQuestions.length
                ? "Perfect Score! 🎉"
                : score >= familyTriviaQuestions.length / 2
                ? "Great Job! 🎄"
                : "Nice Try! ⭐"}
            </h2>

            <p className="text-3xl mb-6">
              You scored {score} out of {familyTriviaQuestions.length}!
            </p>

            <p className="text-xl text-yellow-200 mb-8">
              {score === familyTriviaQuestions.length
                ? "You know this family inside and out! 🏆"
                : score >= familyTriviaQuestions.length / 2
                ? "You're a true family expert! 🌟"
                : "Every family moment is precious! ❤️"}
            </p>

            <button
              onClick={onClose}
              className="bg-yellow-400 text-green-900 px-8 py-4 rounded-xl font-bold text-xl hover:bg-yellow-300 transition-colors border-2 border-yellow-600"
            >
              Back to Dashboard
            </button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
