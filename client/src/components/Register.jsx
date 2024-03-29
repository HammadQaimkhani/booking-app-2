import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Header from "./Header";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const resgisterTest = async e => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/register", {
        name,
        email,
        password,
      });
      alert("Registration completed!!");
      setRedirect(true);
    } catch (error) {
      alert("Registration is falied please try again....");
    }
  };

  if (redirect) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <Header />
      <div className='mt-16 '>
        <h1 className='text-4xl text-center'>Register</h1>
        <form className='mt-8 flex flex-col gap-2 ' onSubmit={resgisterTest}>
          <input
            className='w-[30rem] border border-gray-500 rounded-md p-2 block mx-auto'
            type='text'
            placeholder='your name'
            value={name}
            onChange={e => setName(e.target.value)}
          />
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
            Register
          </button>
        </form>
        <p className='text-center mt-4'>
          Don't have account yet? <Link to={"/login"}>Login</Link>
        </p>
      </div>
    </>
  );
};

export default Register;
