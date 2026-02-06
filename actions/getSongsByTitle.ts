import { prisma } from "@/libs/prismadb";
import { Song } from "@prisma/client";

import getSongs from "./getSongs";

const getSongsByTitle = async (title: string): Promise<Song[]> => {
  if (!title) {
    // Agar user ne kuch type nahi kiya, to saare gaane dikhao
    return getSongs();
  }

  try {
    const songs = await prisma.song.findMany({
      where: {
        title: {
          contains: title,
          mode: 'insensitive' // 'insensitive' matlab 'Tum' aur 'tum' dono chalega
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    return songs;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default getSongsByTitle;