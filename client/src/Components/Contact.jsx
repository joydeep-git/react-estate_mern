import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Contact = ({ state, listingData }) => {

    const [landlord, setLandlord] = useState();

    const [message, setMessage] = useState("I am interested in your property.");

    useEffect(() => {

        const fetchData = async () => {
            const res = await fetch(`/api/user/${listingData.userRef}`);

            const userData = await res.json();

            setLandlord(userData);
        };

        fetchData();
    }, [listingData.userRef]);

    return (
        <>
            {landlord && (
                <form className='flex flex-col gap-3 w-max m-auto '>

                    <p
                        className='text-black text-lg font-medium'>
                        Ask &nbsp;
                        <span className='font-extrabold'>{landlord.email}</span>
                        &nbsp;
                        about &nbsp;
                        <span className='font-extrabold'>{listingData.name}</span>
                    </p>

                    <textarea
                        onChange={(e) => setMessage(e.target.value)}
                        defaultValue={message}
                        // value={message}
                        rows="5" cols="5"
                        className='border resize-none p-2 placeholder:text-xl placeholder:text-slate-600 border-black rounded-sm w-auto font-REM'
                        placeholder='Enter your message!' />

                    <div className='flex flex-row gap-2 m-auto p-2 w-full justify-around '>

                        <Link
                            to={`mailto:${landlord.email}?subject=${encodeURIComponent(`Regarding ${listingData.name}`)}&body=${encodeURIComponent(message)}`}
                            className='border-none p-2 rounded-sm text-white font-semibold bg-green-700 hover:bg-green-600 uppercase'
                            type='submit'
                        >
                            SUBMIT
                        </Link>

                        <button type="button"
                            className='border-none p-2 rounded-sm text-white font-semibold bg-red-700 hover:bg-red-600 uppercase'
                            onClick={() => state(false)}>
                            Cancel
                        </button>

                    </div>
                </form>
            )}
        </>
    )
}

export default Contact