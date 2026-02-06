import { prisma } from "@/libs/prismadb";
import { Song } from "@prisma/client";

const getSongs = async (): Promise<Song[]> => {
  try {
    const songs = await prisma.song.findMany({
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

export default getSongs;