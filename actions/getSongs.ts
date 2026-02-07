import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { Song } from "@/types";

const getSongs = async (): Promise<Song[]> => {
  try {
    const supabase = createServerComponentClient({
      cookies: cookies
    });

    const { data, error } = await supabase
      .from('songs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.log("Database error ignored during build:", error.message);
      return [];
    }

    return (data as any) || [];
  } catch (error) {
    console.log("Build error bypassed:", error);
    return [];
  }
};

export default getSongs;