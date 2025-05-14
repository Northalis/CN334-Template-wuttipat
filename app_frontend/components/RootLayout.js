import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { getBaseUrl } from "@/baseURLS";

export default function RootLayout({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("access_token");

        if (token) {
          const response = await axios.get(`${getBaseUrl()}/api/auth/check`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.data.authenticated) {
            setUser(response.data);
          }
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        // Don't redirect here, just show login option
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
    router.push("/login");
  };

  return (
    <div className="flex h-screen w-screen">
      {/* Left Menu Section */}
      <aside className="w-1/6 bg-[#F4EBD0] p-4 flex flex-col items-center">
        <div className="text-2xl font-bold mb-6">
          {/* Use Next.js Image component for better image optimization */}
          <Image src="/Logo.png" alt="Logo" width={150} height={150} priority />
        </div>
        <nav className="space-y-4 w-full">
          <Link
            href="/"
            replace
            className="block px-4 py-2 rounded hover:bg-[#E07B50] hover:text-white"
          >
            Home
          </Link>
          <Link
            href="/recipe"
            replace
            className="block px-4 py-2 rounded hover:bg-[#E07B50] hover:text-white"
          >
            Recipes
          </Link>
          <Link
            href="/tutorial"
            replace
            className="block px-4 py-2 rounded hover:bg-[#E07B50] hover:text-white"
          >
            Learn
          </Link>
          <Link
            href="/community"
            replace
            className="block px-4 py-2 rounded hover:bg-[#E07B50] hover:text-white"
          >
            Community
          </Link>
          <Link
            href="/about"
            replace
            className="block px-4 py-2 rounded hover:bg-[#E07B50] hover:text-white"
          >
            About
          </Link>
        </nav>
      </aside>

      {/* Main Content Section */}
      <main className="w-4/6 p-6 overflow-y-auto">
        {children} {/* This renders the current page's content */}
      </main>

      {/* Right User Info Section */}
      <aside className="w-1/6 bg-[#F4EBD0] p-4 flex flex-col items-center">
        {loading ? (
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-gray-300"></div>
            <div className="h-4 w-20 bg-gray-300 mt-2 rounded"></div>
          </div>
        ) : user ? (
          <div className="flex flex-col items-center">
            <Link href="/profile" className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#6B8E23] text-white flex items-center justify-center font-bold">
                {user.username ? user.username.charAt(0).toUpperCase() : "U"}
              </div>
              <div className="text-sm mt-2">{user.username || "User"}</div>
            </Link>
            <div className="mt-4 space-y-2">
              <Link
                href="/profile"
                className="block text-sm text-center px-4 py-1 rounded hover:bg-[#E07B50] hover:text-white"
              >
                My Profile
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-sm text-center px-4 py-1 rounded hover:bg-red-500 hover:text-white"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Link href="/login" className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-gray-400 text-white flex items-center justify-center font-bold">
                ?
              </div>
              <div className="text-sm mt-2">Sign In</div>
            </Link>
            <div className="mt-4">
              <Link
                href="/register"
                className="block text-sm text-center px-4 py-1 rounded hover:bg-[#E07B50] hover:text-white"
              >
                Register
              </Link>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
