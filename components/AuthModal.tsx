"use client";

import { useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/libs/supabaseClient"; // Humara purana client
import { useRouter } from "next/navigation";

import useAuthModal from "@/hooks/useAuthModal";
import Modal from "./Modal";

const AuthModal = () => {
  const { isOpen, onClose } = useAuthModal();
  const router = useRouter();

  // Check karna ki user login ho gya kya?
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        router.refresh();
        onClose();
      }
    });

    return () => {
      subscription.unsubscribe();
    }
  }, [onClose, router]);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  }

  return (
    <Modal 
      title="Welcome back" 
      description="Login to your account" 
      isOpen={isOpen} 
      onChange={onChange} 
    >
      <Auth
        supabaseClient={supabase}
        providers={['github']} // GitHub login ka option (optional)
        magicLink={true}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#404040',
                brandAccent: '#22c55e'
              }
            }
          }
        }}
        theme="dark"
      />
    </Modal>
  );
}

export default AuthModal;