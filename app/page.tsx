import getSongsByTitle from "@/actions/getSongsByTitle";
import SearchInput from "@/components/SearchInput";
import SongItem from "@/components/SongItem";
import Header from "@/components/Header";

interface SearchProps {
  searchParams: {
    title: string;
  }
}

export const revalidate = 0;

const Search = async ({ searchParams }: SearchProps) => {
  const songs = await getSongsByTitle(searchParams.title);

  return (
    <div className="
      bg-neutral-100 
      dark:bg-neutral-900 
      rounded-lg 
      h-full 
      w-full 
      overflow-hidden 
      overflow-y-auto
    ">
      {/* Header ke andar Search Input lagayenge */}
      <Header className="from-bg-neutral-900">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-black dark:text-white text-3xl font-semibold">
            Search
          </h1>
          <SearchInput />
        </div>
      </Header>
      
      <div className="px-6 mb-7">
        {songs.length === 0 ? (
          <div className="text-neutral-500 dark:text-neutral-400">
            No songs found.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4">
            {songs.map((song) => (
              <SongItem 
                key={song.id} 
                data={song} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;