import axios from "axios";
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Header from "./Header";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [redirect, setRedirect] = useState(false);

  const loginSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/login", {
        email,
        password,
      });
      setRedirect(true);
    } catch (error) {
      alert("please enter the correct email/password");
      console.log(error);
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <>
      <Header />
      <div className='mt-16 '>
        <h1 className='text-4xl text-center'>Login</h1>
        <form className='mt-8 flex flex-col gap-2 ' onSubmit={loginSubmit}>
          <input
            className='w-[30rem] border border-gray-500 rounded-md p-2 block mx-auto'
            type='email'
            placeholder='your@email.com'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            className='w-[30rem] border border-gray-500 rounded-md p-2 block mx-auto'
            type='password'
            placeholder='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
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
