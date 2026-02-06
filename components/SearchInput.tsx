"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useDebounce from "@/hooks/useDebounce";

const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    // URL banana (Native tarike se)
    const params = new URLSearchParams();
    
    if (debouncedValue) {
        params.set('title', debouncedValue);
    }

    // URL update karna
    const queryString = params.toString();
    const url = queryString ? `/search?${queryString}` : '/search';

    router.push(url);
  }, [debouncedValue, router]);

  return (
    <input 
      placeholder="What do you want to listen to?"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="
        bg-white 
        dark:bg-neutral-700 
        border 
        border-neutral-200 
        dark:border-transparent 
        p-3 
        rounded-md 
        text-sm 
        text-black 
        dark:text-white 
        focus:outline-none 
        focus:border-black 
        dark:focus:border-neutral-500 
        w-full 
        max-w-[500px]
      "
    />
  );
}

export default SearchInput;