import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaSlackHash, FaAngleRight } from "react-icons/fa";

const Footer = (props: any) => {
  const router = useRouter();
  const todaysDate = new Date();
  const currentYear = todaysDate.getFullYear();

  return (
    <>
      <footer className="w-full bottom-0 static z-50 border-t border-gray-100">
        <div className="bg-gray-300 border-t border-gray-200">
          <div className="container md:mx-auto">
            <div className="grid grid-cols-1 text-black text-sm text-center p-3">
              Copyright © {currentYear} URL SHORT - All rights
              reserved.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
