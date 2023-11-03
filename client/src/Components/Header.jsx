import React from 'react';

import { BiSearchAlt2 } from "react-icons/bi";

const Header = () => {
    return (
        <div className='bg-slate-100 shadow-md'>

            <div className='flex w-full m-auto flex-row items-center justify-between p-3'>

                <h1 className='flex flex-wrap text-2xl font-bold'>
                    <span className='text-slate-600'>React</span>
                    &nbsp;
                    <span className='text-slate-800'>Estates</span>
                </h1>

                <form className='flex flex-row bg-white p-2 rounded-lg items-center justify-center'>
                    <input type="text" placeholder='Search Property....' className='outline-none bg-transparent ' />
                    <BiSearchAlt2 />
                </form>

                <ul className='flex flex-row'>
                    <li>Home</li>
                    <li>About</li>
                    <li>Sign In</li>
                </ul>

            </div>

        </div>
    )
}

export default Header;