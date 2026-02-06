"use client";

import { Home, Search, Library, Plus } from "lucide-react"; 
import useUploadModal from "@/hooks/useUploadModal"; 
import Link from "next/link"; 
import ThemeToggle from "./ThemeToggle"; 

const Sidebar = () => {
  const uploadModal = useUploadModal();

  return (
    <div className="
      hidden 
      md:flex 
      flex-col 
      w-[250px] 
      h-full 
      bg-white 
      dark:bg-black 
      p-4 
      text-black 
      dark:text-white 
      gap-4
      border-r 
      border-neutral-200 
      dark:border-transparent
      transition-colors 
      duration-500
    ">
      
      <div className="flex justify-between items-center px-2 mb-4">
        <h1 className="text-2xl font-bold">Spotify Clone</h1>
      </div>
      
      <div className="flex flex-col gap-y-4 bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg">
        <Link href="/" className="flex items-center gap-x-4 cursor-pointer hover:opacity-75 transition text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white">
          <Home size={24} />
          <p className="font-medium">Home</p>
        </Link>
        <Link href="/search" className="flex items-center gap-x-4 cursor-pointer hover:opacity-75 transition text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white">
          <Search size={24} />
          <p className="font-medium">Search</p>
        </Link>
      </div>

      <div className="flex flex-col gap-y-4 bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg h-full overflow-y-auto relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-4 text-neutral-600 dark:text-neutral-400">
            <Library size={24} />
            <p className="font-medium">Your Library</p>
          </div>
          <Plus 
            onClick={uploadModal.onOpen} 
            className="text-neutral-600 dark:text-neutral-400 cursor-pointer hover:text-black dark:hover:text-white transition" 
            size={20}
          />
        </div>
        
        <div className="mt-auto pt-4 flex justify-center">
            <ThemeToggle />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;