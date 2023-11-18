import React, { useState } from "react";

import { FaEyeSlash, FaPen } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";

import { useSelector } from "react-redux";

const Profile = () => {

  const { currentUser } = useSelector(state => state.user);

  const [userData, setUserData] = useState(currentUser);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {

    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });

  };

  return (
    <div className="flex flex-col items-center justify-between my-6 p-3 ">

      <h1 className="uppercase text-2xl font-bold m-5">profile</h1>

      <form
        className='flex flex-col gap-4 items-center bg-slate-100 p-6 rounded-md max-w-md w-full'>

        <img
          className="rounded-full w-full"
          src={currentUser.avatar}
          alt="Image" />

        <input
          type="text"
          name="username"
          id="username"
          placeholder='Username '
          className='border border-slate-500 p-2 rounded-md w-full focus:outline-none  placeholder:text-xl'
          value={userData.username}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          id="email"
          placeholder='Email'
          className='border border-slate-500 p-2 rounded-md w-full focus:outline-none  placeholder:text-xl'
          value={userData.email}
          onChange={handleChange}
        />

        <div className="border border-slate-500 rounded-md w-full focus:outline-none flex flex-row gap-0 items-center pr-3">

          <input
            type={showPassword ? "text" : "password"}
            name='password'
            id='password'
            placeholder='Password'
            className='border-none p-2 rounded-md w-full focus:outline-none  placeholder:text-xl'
            onChange={handleChange}
          />

          {
            userData.password
              ? showPassword
                ? <FaEyeSlash onClick={() => setShowPassword(false)} className="cursor-pointer text-2xl" />
                : <IoEyeOutline onClick={() => setShowPassword(true)} className="cursor-pointer text-2xl" />
              : null
          }

        </div>

        <button
          className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full uppercase'>
          update
        </button>

        <button
          className='bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 w-full uppercase'>
          create listing
        </button>

        <div className="flex flex-row list-none justify-between w-full uppercase font-semibold">
          <li className="text-red-600 cursor-pointer hover:text-red-400">Delete Account</li>
          <li className="text-blue-600 cursor-pointer hover:text-blue-400">Sign Out</li>
        </div>

        <p>Show listings</p>
      </form>
    </div>
  );
};

export default Profile;