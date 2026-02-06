"use client";

import usePlayerStore from "@/hooks/usePlayerStore";

interface SongItemProps {
  data: any;
}

const SongItem: React.FC<SongItemProps> = ({ data }) => {
  const player = usePlayerStore(); 

  return (
    <div
      onClick={() => player.setActiveSong(data)} 
      className="
        relative 
        group 
        flex 
        flex-col 
        items-center 
        justify-center 
        rounded-md 
        overflow-hidden 
        gap-x-4 
        bg-neutral-200/50 
        dark:bg-neutral-400/5 
        cursor-pointer 
        hover:bg-neutral-300/50 
        dark:hover:bg-neutral-400/10 
        transition 
        p-3
      "
    >
      <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
        <img
          className="object-cover w-full h-full"
          src={data.image_path || "/images/liked.png"}
          alt="Image"
        />
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="font-semibold truncate w-full text-black dark:text-white">
          {data.title}
        </p>
        <p className="text-neutral-500 dark:text-neutral-400 text-sm pb-4 w-full truncate">
          By {data.author}
        </p>
      </div>
    </div>
  );
};

export default SongItem;