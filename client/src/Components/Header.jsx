import React, { useEffect, useState } from 'react';

import { Link, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

import { BiSearchAlt2 } from "react-icons/bi";

const Header = () => {
    const navigate = useNavigate();
    const { currentUser } = useSelector(state => state.user);
    const [searchTerm, setSearchTerm] = useState('');
    const [emptySearch, setEmptySearch] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (searchTerm.trim() === '') {
            setEmptySearch(true);

            setTimeout(() => {
                setEmptySearch(false);
            }, 2500);
        } else {
            setEmptySearch(false);

            const urlParams = new URLSearchParams(window.location.search);
            urlParams.set("searchTerm", searchTerm);

            const searchQuery = urlParams.toString();
            navigate(`/search?${searchQuery}`);
        }
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const search = urlParams.get("searchTerm");
        setSearchTerm(search || ''); // Ensure setSearchTerm gets a string
    }, [location.search]);

    useEffect(() => {
        localStorage.setItem("searchTerm", searchTerm);
    }, [searchTerm]);

    return (
        <div className='bg-slate-100 shadow-md sticky transition duration-300'>
            <div className='flex w-full m-auto flex-row items-center justify-around p-3'>
                <Link to='/' className='hover:underline flex flex-wrap text-sm  md:text-2xl font-bold w-fit '>
                    <span className='text-slate-600'>FLEX</span>
                    &nbsp;
                    <span className='text-slate-800'>Properties</span>
                </Link>

                <form
                    onSubmit={handleSubmit}
                    className='flex flex-row transition duration-300 bg-white p-1 rounded-lg items-center 
                    justify-center gap-1 md:gap-4 md:p-3 border border-slate-100 hover:border-black hover:cursor-pointer '>

                    <input
                        type="text" placeholder={emptySearch ? "Hey, I'm EMPTY" : 'Search....'}
                        className={`outline-none bg-transparent w-28 md:w-60 
                        ${emptySearch
                                ? 'placeholder-red-500 font-semibold placeholder:text-center placeholder:text-sm md:placeholder:text-xl'
                                : null} `}
                        onChange={(e) => setSearchTerm(e.target.value.trimStart())}
                        value={searchTerm}
                    />

                    <button type="submit">
                        <BiSearchAlt2 className='text-lg md:text-2xl hover:text-orange-500' />
                    </button>
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
                                ? <img src={currentUser?.avatar} alt="Profile"
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
