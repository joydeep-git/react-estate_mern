import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { FaEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";

import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import GoogleAuth from '../Components/GoogleAuth';

const SignIn = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const { loading, error } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
      } else {
        dispatch(signInSuccess(data));
        navigate('/');
      }

      setFormData({
        email: "",
        password: ""
      });

    } catch (err) {
      dispatch(signInFailure(err.message));
    }
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch(signInFailure(null))
    }, 3500);
  }, [error]);

  return (
    <div className='flex flex-col items-center justify-center my-6 p-3'>
      <h1 className='font-bold text-4xl mb-4 text-center'>Sign In</h1>

      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-4 items-center bg-slate-100 p-6 rounded-md max-w-md w-full'>

        <input
          type="email"
          name="email"
          id="email"
          placeholder='Enter email '
          className='border border-slate-500 p-2 rounded-md w-full focus:outline-none  placeholder:text-xl'
          value={formData.email}
          onChange={handleChange}
        />

        <div className='border border-slate-500 rounded-md w-full focus:outline-none flex flex-row gap-0 items-center pr-3'>
          <input
            type={showPassword ? "text" : "password"}
            name='password'
            id='password'
            placeholder='Enter Password'
            className='border-none p-2 rounded-md w-full focus:outline-none  placeholder:text-xl'
            value={formData.password}
            onChange={handleChange}
          />
          {
            formData.password
              ? showPassword
                ? <FaEyeSlash onClick={() => setShowPassword(false)} className="cursor-pointer text-2xl" />
                : <IoEyeOutline onClick={() => setShowPassword(true)} className="cursor-pointer text-2xl" />
              : null
          }
        </div>

        <button disabled={loading}
          className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full uppercase'>
          {loading ? "Loading..." : "Sign In"}
        </button>

        <GoogleAuth />

        <p className='text-lg'>
          Don't have an account? <Link to='/sign-up' className='text-blue-500 hover:underline font-semibold'>Sign Up</Link>
        </p>
      </form>

      {
        error && <p className='text-red-500 font-semibold  m-4'>{error}</p>
      }

    </div>
  )
}

export default SignIn;