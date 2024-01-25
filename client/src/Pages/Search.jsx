import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Filters from '../Components/Filters';
import { CiFilter } from 'react-icons/ci';
import { Button } from '@chakra-ui/react';

// COMPONENTS
import ListProperties from '../Components/ListProperties';
import Loading from '../Components/Loading';

const Search = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const [filterMenu, setFilterMenu] = useState(false);
    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);
    const [sideBar, setSideBar] = useState({
        searchTerm: '',
        type: 'all',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'createdAt',
        order: 'desc',
    });

    useEffect(() => {
        const search = localStorage.getItem('searchTerm');

        setSideBar({
            ...sideBar,
            searchTerm: search,
        })
    }, [localStorage.getItem("searchTerm")]);

    const fetchData = async () => {
        setLoading(true);

        const urlParams = new URLSearchParams(location.search);

        const res = await fetch(`/api/listing/get?${urlParams.toString()}`);
        const data = await res.json();

        setListings(data);

        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        fetchData();
    }, [location.search]);

    const handleSubmit = () => {
        setFilterMenu(false);

        const urlParams = new URLSearchParams();

        urlParams.set('searchTerm', sideBar.searchTerm);
        urlParams.set('type', sideBar.type);
        urlParams.set('parking', sideBar.parking);
        urlParams.set('furnished', sideBar.furnished);
        urlParams.set('offer', sideBar.offer);
        urlParams.set('sort', sideBar.sort);
        urlParams.set('order', sideBar.order);

        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

    if (loading) {
        return <Loading />;
    }

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

            {filterMenu && (
                <Filters
                    setState={setFilterMenu}
                    sideBar={sideBar}
                    setSideBar={setSideBar}
                    submitForm={handleSubmit}
                />
            )}

            <div className='flex flex-row flex-wrap gap-4 items-center justify-center'>
                {
                    listings.map((item, index) => {
                        return <ListProperties listing={item} key={index} />
                    })
                }
            </div>
        </div>
    );
};

export default Search;