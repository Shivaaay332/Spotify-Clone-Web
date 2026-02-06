import { create } from 'zustand';

// 1. Types Define करें (TypeScript का फायदा)
interface PlayerStore {
  isPlaying: boolean;
  activeSong: any; // अभी के लिए any, बाद में Song type बनाएंगे
  setIsPlaying: (value: boolean) => void;
  setActiveSong: (song: any) => void;
}

// 2. Store Create करें
const usePlayerStore = create<PlayerStore>((set) => ({
  isPlaying: false,
  activeSong: null,
  
  // Functions to update state
  setIsPlaying: (value) => set({ isPlaying: value }),
  setActiveSong: (song) => set({ activeSong: song, isPlaying: true }),
}));

export default usePlayerStore;
