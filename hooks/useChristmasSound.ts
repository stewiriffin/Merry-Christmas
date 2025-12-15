import { useCallback, useRef, useEffect } from "react";

export function useChristmasSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio element
    if (typeof window !== "undefined") {
      audioRef.current = new Audio("/sounds/jingle.mp3");
      audioRef.current.volume = 0.3; // Set volume to 30%

      // Check if file exists by trying to load it
      audioRef.current.addEventListener("error", () => {
        console.log(
          "🎵 Christmas Sound: /sounds/jingle.mp3 not found. Add the file to enable jingle bells!"
        );
      });

      audioRef.current.addEventListener("canplaythrough", () => {
        console.log("🎵 Christmas Sound: Jingle bells loaded successfully!");
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
      // Reset audio to start if already playing
      audioRef.current.currentTime = 0;

      // Play the sound, but catch any errors silently
      audioRef.current.play().catch((error) => {
        console.log("🎵 Christmas Sound: Unable to play audio", error.message);
      });
    }
  }, []);

  return { playSound };
}

// Hook for wrapping button clicks with sound
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
