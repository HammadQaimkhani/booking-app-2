import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

const Login = () => {
  return (
    <>
      <Header />
      <div className='mt-16 '>
        <h1 className='text-4xl text-center'>Login</h1>
        <form className='mt-8 flex flex-col gap-2 '>
          <input
            className='w-[30rem] border border-gray-500 rounded-md p-2 block mx-auto'
            type='email'
            placeholder='your@email.com'
          />
          <input
            className='w-[30rem] border border-gray-500 rounded-md p-2 block mx-auto'
            type='password'
            placeholder='password'
          />
          <button className='border border-primary bg-primary text-white block mx-auto w-[30rem] rounded-md p-2 '>
            Login
          </button>
        </form>
        <p className='text-center mt-4'>
          Don't have account yet? <Link to={"/register"}>Register now</Link>
        </p>
      </div>
    </>
  );
};

export default Login;
