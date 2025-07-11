
import axios from "axios";
import Register from "./register";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { Redirect } from "next";

export default function Header() {
  const router = useRouter();

  const [user, setUser] = useState({
    id: "",
    role: "",
  });

  const getUser = async () => {
    try {
      const res = await axios.get("/api/users/get-token-payload");
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const logOut = async () => {
    try {
      await axios.get("/api/users/sign-out");
      router.push("/sign-in");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="fixed w-full z-50 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20">
        <div className="flex justify-between items-center h-full">
          <div className="flex items-center">
            <img
              onClick={() => router.push("/")}
              src="/logo.png"
              alt="pharmacy"
              className="h-12 w-12 cursor-pointer transition-transform hover:scale-110"
            />
            <h1 className="ml-3 text-2xl font-bold text-gray-800 dark:text-white hidden sm:block">
              Pharmacists
            </h1>
          </div>
          <nav className="flex items-center">
            {user.id ? (
              <ul className="flex space-x-6 items-center">
                <li>
                  <a
                    href="/profile"
                    className="text-gray-600 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                  >
                    Profile
                  </a>
                </li>
                <li>
                  <button
                    onClick={logOut}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            ) : null}
          </nav>
        </div>
      </div>
    </header>
  );
}