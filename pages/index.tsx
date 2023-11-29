import React, { FormEvent, ReactNode, useEffect, useState } from 'react'
import Link from "next/link";
import Head from "next/head";
import * as Yup from 'yup';
import { Formik, Form } from 'formik';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { useRouter, Router } from "next/router";
import cookie from "js-cookie";
import { baseUrl } from "@/config/config";

import { Table } from 'flowbite-react';
import Layout from '@/Layout/Layout'
import { FaCopy } from 'react-icons/fa';


const regMatch = /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;

export const shortenSchema = Yup.object().shape({
  url: Yup.string().matches(regMatch, 'URL is not valid').required('URL is required')
});

const Shorten = {
  url: "",
}


const Home = () => {
  const router = useRouter();
  const cookies = parseCookies();
  const token = cookies?.token;

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>();
  const [shorterList, setShorterList] = useState<any>([]);

  const getShorten = async () => {
    try {
      setLoading(true);

      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      var requestOptions: any = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      const shortsList = await fetch(`${baseUrl}/api/url-short/get-list`, requestOptions);
      const result = await shortsList.json();

      console.log('shortsList', result);

      if (result.status == true) {
        setShorterList(result?.shortsList?.data);
      } else {
        setShorterList([]);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    let c_user = cookies?.user;
    if (c_user) {
      let l_user = JSON.parse(c_user);
      setUser(l_user);
      getShorten();
    } else {
      setUser([]);
      setLoading(false);
    }
  }, [cookies?.user]);

  const handleSubmit = async (values: typeof Shorten, resetForm: any) => {
    try {
      setLoading(true);
      const { url } = values;

      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      var raw = JSON.stringify({
        url: url,
      });

      var requestOptions: any = {
        method: 'POST',
        body: raw,
        headers: myHeaders,
        redirect: 'follow'
      };

      const shortsCreate = await fetch(`${baseUrl}/api/url-short/create`, requestOptions);
      const result = await shortsCreate.json();

      console.log('result', result);

      if (result.status == false) {
        toast.error(result.message);
        setLoading(false);
      }

      if (result.status == true) {
        toast.success(result.message);
        resetForm({ values: '' })
        getShorten();
        setLoading(false);
      }
    } catch (err) {
      console.log('err', err);
    } finally {
      setLoading(false);
    }
  }

  return (<Layout>
    <div className='w-full'>
      <ToastContainer />
      <Head>
        <title>URL SHORT</title>
        <meta name="description" content="This ChahidaBD24 User Login Page" />
        <link rel="icon" href="/assets/img/favicon.ico" />
      </Head>

      <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="space-y-6" >
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            Paste the URL to be shortened
          </h5>
          <div className='w-full'>
            <Formik
              initialValues={Shorten}
              validationSchema={shortenSchema}
              onSubmit={
                (values, { resetForm }) => {
                  token && user ? handleSubmit(values, resetForm) : toast.error("Please login first")
                }
              }
              enableReinitialize={false}
            >
              {({ values, errors, touched, handleChange, handleBlur }) => (
                <Form>
                  <label
                    htmlFor="default-search"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                  >
                    Search
                  </label>
                  <div className='w-full'>
                    <div className="relative">
                      <input
                        type="text"
                        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Paste long url and shorten it"

                        name="url"
                        value={values.url}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                      <button
                        type="submit"
                        className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Shorten
                      </button>
                    </div>
                    <div className='w-full'>
                      {touched.url && errors.url && (
                        <span className="w-full text-red-500 text-sm font-normal">{errors.url}</span>
                      )}
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>

    {
      token && user ? <>
        {
          shorterList && shorterList.length > 0 &&
          <div className='w-full mt-5'>
            <div className="overflow-x-auto">
              <Table>
                <Table.Head>
                  <Table.HeadCell>URL</Table.HeadCell>
                  <Table.HeadCell>Action</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {
                    shorterList.map((item: any, index: number) => (
                      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={index}>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {item.url}
                        </Table.Cell>
                        <Table.Cell>
                          <CopyToClipboard text={`${baseUrl}/${item.uniqid}`}>
                            <button
                              className="w-[110px] h-[39px] text-white flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 rounded px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 cursor-pointer"
                              onClick={() => toast.success("Copied to clipboard")}
                            >
                              <FaCopy className="text-white text-[16px] font-semibold mt-1" />
                              <span className='text-white text-[16px] font-semibold'>Copy</span>
                            </button>
                          </CopyToClipboard>
                        </Table.Cell>
                      </Table.Row>
                    ))
                  }
                </Table.Body>
              </Table>
            </div>
          </div>
        }
      </> : null
    }
  </Layout>)
}


export default Home;