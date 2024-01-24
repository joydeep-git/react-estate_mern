import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Filters from '../Components/Filters';

// ICONS
import { CiFilter } from "react-icons/ci";

// CHAKRA UI
import {
    Button
} from '@chakra-ui/react';

const Search = () => {

    const navigate = useNavigate();

    const [filterMenu, setFilterMenu] = useState(false);

    const [loading, setLoading] = useState(false);

    const [listings, setListings] = useState([]);

    const [sideBar, setSideBar] = useState({
        searchTerm: "",
        type: "all",
        parking: false,
        furnished: false,
        offer: false,
        sort: "createdAt",
        order: "desc"
    });

    const search = localStorage.getItem("searchTerm");

    useEffect(() => {
        setSideBar({
            ...sideBar,
            searchTerm: search,
        })
    }, [search]);

    const handleSubmit = () => {
        setFilterMenu(false);

        const urlParams = new URLSearchParams();

        urlParams.set("searchTerm", sideBar.searchTerm);

        urlParams.set("type", sideBar.type);

        urlParams.set("parking", sideBar.parking);

        urlParams.set("furnished", sideBar.furnished);

        urlParams.set("offer", sideBar.offer);

        urlParams.set("sort", sideBar.sort);

        urlParams.set("order", sideBar.order);

        const searchQuery = urlParams.toString();

        navigate(`/search?${searchQuery}`);


        const fetchListings = async () => {

            setLoading(true);
            
            const res = await fetch(`/api/listing/get?${urlParams.toString()}`);

            const data = await res.json();

            setListings(data);
            
            setLoading(false);
        };

        fetchListings();

    };

    return (
        <div className='relative flex flex-col'>

            <div className='flex flex-row items-center p-4 w-full justify-around z-1'>

                <Button
                    className='self-center m-2'
                    onClick={() => setFilterMenu(!filterMenu)}
                    colorScheme='grey'
                    variant='outline'>
                    <CiFilter className='text-2xl font-bold' />
                </Button>

            </div>

            {filterMenu && <Filters
                setState={setFilterMenu}
                sideBar={sideBar}
                setSideBar={setSideBar}
                submitForm={handleSubmit}
            />}

            <div className=''>

            </div>
        </div>
    );
}

export default Search;