import Sidebar from "@/components/Sidebar";
import Player from "@/components/Player";
import ToasterProvider from "@/components/ToasterProvider";
import UploadModal from "@/components/UploadModal";
import AuthModal from "@/components/AuthModal"; // <--- Ye wali line nayi hai
import ThemeProvider from "@/components/ThemeProvider";
import "./globals.css";

export const metadata = {
  title: "Spotify Clone",
  description: "Music Streaming App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="h-screen overflow-hidden bg-white dark:bg-black text-black dark:text-white">
        
        <ThemeProvider>
            <ToasterProvider />
            <UploadModal />
            <AuthModal /> {/* <--- Ye login box humne yahan add kiya */}
            
            <div className="flex h-full">
              <Sidebar />
              
              <main className="
                flex-1 
                h-full 
                overflow-y-auto 
                bg-white 
                dark:bg-neutral-900 
                rounded-lg 
                m-2 
                p-4
                transition-colors 
                duration-500
              ">
                {children}
              </main>

            </div>
            
            <Player />
        </ThemeProvider>

      </body>
    </html>
  );
}