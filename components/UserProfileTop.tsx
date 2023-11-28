/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { ReactNode, SetStateAction, useEffect, useState } from "react";
import { baseUrl } from "@/config/config";
import { Avatar, Dropdown, Sidebar } from "flowbite-react";
import Link from "next/link";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FaChevronDown, FaRegUserCircle } from "react-icons/fa";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import { BsFillPersonFill } from "react-icons/bs";


type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  profile_avatar: string;
  userRole: string;
};

const UserProfileTop: React.FC = () => {

  const router = useRouter();
  const cookies = parseCookies();

  const [Loading, setLoading] = useState(true);
  const [open, setOpen] = useState(0);

  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [language, setLanguage] = useState("eng");
  const [user, setUser] = useState<any>();
  const handleOpen = (value: SetStateAction<number>) => {
    setOpen(open === value ? 0 : value);
  };

  useEffect(() => {
    let c_user = cookies?.user;
    if (c_user) {
      let l_user = JSON.parse(c_user);
      setUser(l_user);
    } else {
      setLoading(false);
    }
  }, [cookies?.user]);


  const logout = () => {
    cookie.remove("token");
    cookie.remove("user");
    toast.success("Successfully logged out");
    router.push("/login");
  };

  return (
    <>
      {user ? (
        <div className="mr-2 lg:mr-0 dropdown relative">
          <button
            type="button"
            className="dropdown-toggle flex items-center rounded-full text-sm focus:bg-none focus:ring-0 dark:focus:ring-0 md:mr-0"
            onClick={() => handleOpen(1)}
          >
            <img
              className="h-7 w-7 text-white rounded-full"
              src="/user.png"
              alt="user photo"
            />
            <span className="ml-2 hidden text-left md:block">
              <span className="-mt-1 block text-lg font-semibold text-gray-100">
                {user.full_name}
              </span>
            </span>
          </button>

          <div
            className={`${open ? `block` : `hidden`
              } w-[200px]  dropdown-menu dropdown-menu-right z-50 mt-2 -right-2 list-none divide-y divide-gray-100 rounded border-slate-700 md:border-white text-base shadow dark:divide-gray-600 bg-white dark:bg-slate-800 absolute`}
            onMouseLeave={() => handleOpen(0)}
          >
            <div className="py-3 px-4">
              <span className="block text-sm font-medium text-gray-900 dark:text-white">
                {user.full_name}
              </span>
              <span className="block truncate text-sm font-normal text-gray-500 dark:text-gray-400">
                {user?.email}
              </span>
            </div>
            <ul className="py-1" aria-labelledby="navUserdata">
              <li>
                <span
                  onClick={() => logout()}
                  className={`${language == "bng" ? `bangla text-xl` : "font-sans text-sm"
                    }  block py-2 px-4 text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-900/20 dark:hover:text-white cursor-pointer`}
                >
                  Logout
                </span>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <>
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
        </>
      )}
    </>
  );
};

export default UserProfileTop;
