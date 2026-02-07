import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import getSongs from "./fetchSongs";

// Song type yahin bhi daal diya safety ke liye
interface Song {
  id: string;
  user_id: string;
  author: string;
  title: string;
  song_path: string;
  image_path: string;
}

const getSongsByTitle = async (title: string): Promise<Song[]> => {
  try {
    const supabase = createServerComponentClient({
      cookies: cookies
    });

    if (!title) {
      const allSongs = await getSongs();
      return allSongs;
    }

    const { data, error } = await supabase
      .from('songs')
      .select('*')
      .ilike('title', `%${title}%`)
      .order('created_at', { ascending: false });

    if (error) {
      console.log("Search error ignored:", error.message);
      return [];
    }

    return (data as any) || [];
  } catch (error) {
    console.log("Search build error bypassed:", error);
    return [];
  }
};

export default getSongsByTitle;
