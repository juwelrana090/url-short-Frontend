import React, { useEffect, useState, Fragment, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";

import { baseUrl } from "@/config/config";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import cookie from "js-cookie";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BsFillSunFill, BsMoonStarsFill } from "react-icons/bs";

const Header = (): JSX.Element => {
  const router = useRouter();
  const currentPath = router.asPath;
  const cookies = parseCookies();

  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);


  const renderThemeMode = () => {
    if (!mounted) return null;

    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return (
        <button className="flex items-center w-8 h-8 focus:outline-none">
          <BsFillSunFill
            className="w-6 h-6 ml-1 text-yellow-400"
            role="button"
            onClick={() => setTheme("light")}
          />
        </button>
      );
    } else {
      return (
        <button className="flex items-center w-8 h-8 focus:outline-none">
          <BsMoonStarsFill
            className="w-6 h-6 ml-1 text-white"
            role="button"
            onClick={() => setTheme("dark")}
          />
        </button>
      );
    }
  };




  return (<nav className="bg-sky-500 border-gray-200">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <Link
        href={`${baseUrl}`}
        className="flex items-center space-x-3 rtl:space-x-reverse"
      >
        <span className="text-3xl font-bold text-gray-100 text-shadow-xl word-wrap ">
          URL SHORT
        </span>
      </Link>
      <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-2">
        <Link
          href={`${baseUrl}/login`}
          className="w-[80px] h-[35px] p-1 text-base font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
        >
          Login
        </Link>
        <Link
          href={`${baseUrl}/register`}
          className="w-[80px] h-[35px] p-1 font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Sign up
        </Link>
      </div>
    </div>
  </nav>);
};

export default Header;
