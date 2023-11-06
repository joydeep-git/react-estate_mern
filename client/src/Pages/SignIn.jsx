import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignIn = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({
      email: "",
      password: ""
    });
  };

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

        <input
          type="password"
          name='password'
          id='password'
          placeholder='Enter Password'
          className='border border-slate-500 p-2 rounded-md w-full focus:outline-none  placeholder:text-xl'
          value={formData.password}
          onChange={handleChange}
        />

        <button className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full uppercase'>Sign In</button>
        <button className='bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 w-full uppercase'>Continue with Google</button>

        <p className='text-lg'>
          Don't have an account? <Link to='/sign-up' className='text-blue-500 hover:underline font-semibold'>Sign Up</Link>
        </p>
      </form>
    </div>
  )
}

export default SignIn;
