import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { Song } from "@/types";
import getSongs from "./getSongs";

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
      console.log("Search Error ignored:", error.message);
      return [];
    }

    return (data as any) || [];
  } catch (error) {
    console.log("Search build error bypassed:", error);
    return [];
  }
};

export default getSongsByTitle;