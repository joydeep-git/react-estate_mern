import React from 'react';

import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

import { BiSearchAlt2 } from "react-icons/bi";

const Header = () => {

    const { currentUser } = useSelector(state => state.user);

    return (
        <div className='bg-slate-100 shadow-md sticky transition duration-300'>

            <div className='flex w-full m-auto flex-row items-center justify-around p-3'>

                <Link to='/' className='hover:underline flex flex-wrap text-base md:text-2xl font-bold w-fit text-center'>
                    <span className='text-slate-600'>Home</span>
                    &nbsp;
                    <span className='text-slate-800'>Estates</span>
                </Link>

                <form className='flex flex-row transition duration-300 bg-white p-1 rounded-lg items-center justify-center gap-1 md:gap-4 md:p-3 border border-slate-100 hover:border-black hover:cursor-pointer '>

                    <input type="text" placeholder='Search....'
                        className='outline-none bg-transparent w-28 md:w-60 ' />

                    <BiSearchAlt2 className='text-2xl hover:text-orange-500' />
                </form>

                <ul className='flex flex-row items-center text-[1rem] md:text-xl font-semibold transition duration-300'>
                    <Link to='/' className=' hover:underline transition duration-300 hidden md:inline cursor-pointer hover:text-orange-600 mx-4'>
                        Home
                    </Link>

                    <Link to='/about' className='hover:underline transition duration-300 hidden md:inline cursor-pointer hover:text-orange-600 mx-4'>
                        About
                    </Link>

                    <Link to="/profile">
                        {
                            currentUser
                                ? <img src={currentUser.rest.avatar} alt="Profile"
                                    className='rounded-full overflow-hidden object-cover h-7 w-7 md:h-9 md:w-9 mx-4' />
                                : <li className='hover:underline transition duration-300 cursor-pointer inline hover:text-green-600 mx-4 text-center'>
                                    Sign In
                                </li>
                        }
                    </Link>
                </ul>

            </div>

        </div>
    )
}

export default Header;