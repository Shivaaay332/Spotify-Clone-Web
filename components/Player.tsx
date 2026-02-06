"use client";

import usePlayerStore from "@/hooks/usePlayerStore";
import Slider from "./Slider"; // Slider import kiya
import { Play, Pause, SkipBack, SkipForward, X, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Player = () => {
  const { isPlaying, setIsPlaying, activeSong, setActiveSong } = usePlayerStore();
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Volume Control Logic
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Play/Pause Logic
  useEffect(() => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [isPlaying, activeSong]);

  const toggleMute = () => {
    if (volume === 0) setVolume(1);
    else setVolume(0);
  }

  if (!activeSong) return null;

  return (
    <div className="fixed bottom-0 w-full h-[80px] bg-black border-t border-neutral-800 px-4 flex items-center justify-between text-white z-50">
      
      {/* Hidden Audio Element */}
      <audio 
        ref={audioRef}
        src={activeSong.song_path}
        autoPlay 
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* 1. Song Info + Animation */}
      <div className="flex items-center gap-x-4 w-[30%]">
         <div className="relative h-14 w-14 rounded-md overflow-hidden bg-neutral-800">
             <img src={activeSong.image_path} className="object-cover w-full h-full" alt="Cover" />
         </div>
         <div className="flex flex-col overflow-hidden">
            <p className="truncate font-semibold text-sm flex items-center gap-2">
              {activeSong.title}
              {/* Animation Bars (Sirf tab dikhenge jab gana baj raha ho) */}
              {isPlaying && (
                <div className="flex items-end h-3 ml-2">
                   <span className="playing-bar h-3"></span>
                   <span className="playing-bar h-2"></span>
                   <span className="playing-bar h-3"></span>
                   <span className="playing-bar h-2"></span>
                </div>
              )}
            </p>
            <p className="truncate text-xs text-neutral-400">{activeSong.author}</p>
         </div>
      </div>

      {/* 2. Controls (Center) */}
      <div className="flex flex-col items-center justify-center w-[40%] gap-y-2">
        <div className="flex items-center gap-x-6">
            <SkipBack size={24} className="cursor-pointer text-neutral-400 hover:text-white" />
            
            <div 
            onClick={() => setIsPlaying(!isPlaying)}
            className="h-10 w-10 flex items-center justify-center rounded-full bg-white text-black cursor-pointer hover:scale-110 transition"
            >
            {isPlaying ? <Pause fill="black" /> : <Play fill="black" />}
            </div>
            
            <SkipForward size={24} className="cursor-pointer text-neutral-400 hover:text-white" />
        </div>
      </div>

      {/* 3. Volume Control (Right) */}
      <div className="flex items-center gap-x-2 w-[30%] justify-end">
         <div onClick={toggleMute} className="cursor-pointer hover:text-green-500 transition">
            {volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
         </div>
         <div className="w-[120px]">
            <Slider value={volume} onChange={(value) => setVolume(value)} />
         </div>
      </div>

    </div>
  );
}

export default Player;