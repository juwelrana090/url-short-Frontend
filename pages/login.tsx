import React, { FormEvent, ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import * as Yup from 'yup';
import { Formik, Form } from 'formik';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { useRouter, Router } from "next/router";
import cookie from "js-cookie";
import { baseUrl } from "@/config/config";
import Layout from '@/Layout/Layout'
import InputEmail from "@/components/common/InputEmail";
import InputPass from "@/components/common/InputPass";

export const signInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required')
});

const signIn = {
  email: "",
  password: "",
}


const Login = () => {
  const router = useRouter();
  const cookies = parseCookies();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cookies?.user) {
      router.push("/");
    }
  }, [cookies?.user, router]);

  const handleSubmit = async (values: typeof signIn) => {
    try {
      setLoading(true);
      const { email, password } = values;

      var raw = JSON.stringify({
        email: email,
        password: password
      });

      var requestOptions: any = {
        method: 'POST',
        body: raw,
        redirect: 'follow'
      };

      const userLogin = await fetch(`${baseUrl}/api/user/login`, requestOptions);
      const result = await userLogin.json();

      console.log('result', result);

      if (result.status == false) {
        toast.error(result.message);
        setLoading(false);
      }

      if (result.status == true) {
        toast.success(result.message);

        cookie.set("token", result?.token);
        cookie.set("user", JSON.stringify(result?.user));

        setTimeout(() => {
          router.push("/");
        }, 2500);
        setLoading(true);
      }
    } catch (err) {
      console.log('err', err);
    }finally{
      setLoading(false);
    }
  }

  return (<Layout>
    <div className="w-full">
      <ToastContainer />
      <Head>
        <title>Login - URL SHORT</title>
        <meta name="description" content="This ChahidaBD24 User Login Page" />
        <link rel="icon" href="/assets/img/favicon.ico" />
      </Head>

      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-full m-auto bg-white dark:bg-slate-800/60 rounded shadow-lg ring-2 ring-slate-300/50 dark:ring-slate-700/50 lg:max-w-md">
          <div className="text-center p-6 bg-slate-900 rounded-t">
            <Link
              href={`${baseUrl}`}
              className="flex items-center justify-center  space-x-3 rtl:space-x-reverse"
            >
              <span className="text-3xl font-bold text-gray-100 text-shadow-xl word-wrap ">
                URL SHORT
              </span>
            </Link>
            <h3 className="font-semibold text-white text-xl mb-1">
              {`Let's Get Started Login`}
            </h3>
            {/* <p className="text-xs text-slate-400">To continue to URL SHORT</p> */}
          </div>

          <Formik
            initialValues={signIn}
            validationSchema={signInSchema}
            onSubmit={(values) => handleSubmit(values)}
            enableReinitialize={true}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form className="p-6">
                <div className="flex flex-col gap-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="inline-block text-gray-800 dark:text-white text-sm sm:text-base mb-2"
                    >
                      Email
                    </label>
                    <InputEmail
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.email && errors.email ? errors.email : ''}
                      placeholder="Email"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="inline-block text-gray-800 dark:text-white text-sm sm:text-base mb-2"
                    >
                      Password
                    </label>
                    <InputPass
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.password && errors.password ? errors.password : ''}
                      placeholder="Password"
                    />

                    <p className="mt-2 mb-2 text-sm font-medium text-start text-blue-500 dark:text-white">
                      <Link
                        href="#"
                        className="font-medium text-blue-600 dark:text-white hover:underline"
                      >
                        Forget Password
                      </Link>
                    </p>
                  </div>

                  <button className="block bg-gray-800 dark:bg-gray-600 hover:bg-gray-700 active:bg-gray-600 focus-visible:ring ring-gray-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3">
                    {loading ? (
                      <>
                        <div
                          role="status"
                          className="w-full flex items-center justify-center"
                        >
                          <svg
                            aria-hidden="true"
                            className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                          <span className="sr-only">Loading...</span>
                        </div>
                      </>
                    ) : (
                      <>Log in</>
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          <p className="mb-5 text-sm font-medium text-center text-slate-500 dark:text-white">
            {`Don't have an account? `}
            <Link
              href={`${baseUrl}/register`}
              className="text-base font-semibold text-blue-600 dark:text-white hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  </Layout>)
}


export default Login;