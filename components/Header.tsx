"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Home, Search, User } from "lucide-react";
import useAuthModal from "@/hooks/useAuthModal";
import { supabase } from "@/libs/supabaseClient";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const router = useRouter();
  const authModal = useAuthModal();
  
  // User login hai ya nahi, ye check karne ke liye state
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check current user
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    // Listen for changes (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Logged out!');
      router.refresh();
    }
  }

  return (
    <div className={`
      h-fit 
      bg-gradient-to-b 
      from-emerald-800 
      p-6
      ${className}
    `}>
      <div className="w-full mb-4 flex items-center justify-between">
        
        {/* Navigation */}
        <div className="hidden md:flex gap-x-2 items-center">
          <button 
            onClick={() => router.back()} 
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
          >
            <ChevronLeft className="text-white" size={35} />
          </button>
          <button 
            onClick={() => router.forward()} 
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
          >
            <ChevronRight className="text-white" size={35} />
          </button>
        </div>

        {/* Mobile View */}
        <div className="flex md:hidden gap-x-2 items-center">
          <button 
            onClick={() => router.push('/')} 
            className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition"
          >
            <Home className="text-black" size={20} />
          </button>
          <button 
            onClick={() => router.push('/search')} 
            className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition"
          >
            <Search className="text-black" size={20} />
          </button>
        </div>

        {/* Auth Buttons */}
        <div className="flex justify-between items-center gap-x-4">
          {user ? (
            <div className="flex gap-x-4 items-center">
              <button 
                onClick={handleLogout} 
                className="bg-white px-6 py-2 rounded-full font-medium text-black hover:opacity-75 transition"
              >
                Logout
              </button>
              <button 
                className="bg-white rounded-full p-2 hover:opacity-75 transition"
                onClick={() => router.push('/account')}
              >
                <User size={20} className="text-black" />
              </button>
            </div>
          ) : (
            <>
              <button 
                onClick={authModal.onOpen} 
                className="bg-transparent text-neutral-300 font-medium hover:text-white transition"
              >
                Sign up
              </button>
              <button 
                onClick={authModal.onOpen} 
                className="bg-white px-6 py-2 rounded-full font-medium text-black hover:opacity-75 transition"
              >
                Log in
              </button>
            </>
          )}
        </div>

      </div>
      {children}
    </div>
  );
}

export default Header;