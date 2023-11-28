/* eslint-disable @next/next/no-sync-scripts */
import React, { ReactNode, useEffect, useState } from "react";
import Head from "next/head";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "@/Layout/Header";
import Footer from "@/Layout/Footer";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children }: Props): JSX.Element => {

  useEffect(() => {
    document.body.classList.add("w-screen");
    document.body.classList.add("h-screen");
    document.body.classList.add("bg-gray-100");
    document.body.classList.add("dark:bg-gray-900");
  });



  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/img/favicon.ico" />
      </Head>
      <ToastContainer />
      <div className="w-full" >
        <Header />
        <div className="container mt-8 mx-auto px-2 min-h-[calc(100vh-138px)]">
          {children}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
