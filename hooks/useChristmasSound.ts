import { useCallback, useRef, useEffect } from "react";

export function useChristmasSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio("/sounds/jingle.mp3");
      audioRef.current.volume = 0.3;

      audioRef.current.addEventListener("error", () => {
        console.log(
          "Christmas Sound: /sounds/jingle.mp3 not found. Add the file to enable jingle bells!"
        );
      });

      audioRef.current.addEventListener("canplaythrough", () => {
        console.log("Christmas Sound: Jingle bells loaded successfully!");
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playSound = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;

      audioRef.current.play().catch((error) => {
        console.log("Christmas Sound: Unable to play audio", error.message);
      });
    }
  }, []);

  return { playSound };
}
export function useChristmasButton(onClick?: () => void) {
  const { playSound } = useChristmasSound();

  const handleClick = useCallback(() => {
    playSound();
    if (onClick) {
      onClick();
    }
  }, [playSound, onClick]);

  return handleClick;
}
