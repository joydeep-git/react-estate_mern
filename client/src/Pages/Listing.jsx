import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../Components/Loading';

// SWIPER IMPORTS

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';

// REACT ICONS
import { FaBath, FaBed, FaParking } from "react-icons/fa";
import { GiSofa } from "react-icons/gi";

const Listing = () => {

    SwiperCore.use([Navigation]);

    const [listingData, setListingData] = useState({});
    const [loading, setLoading] = useState(true);

    const listingId = useParams().id;

    useEffect(() => {

        setLoading(true);
        const fetchData = async () => {

            const res = await fetch(`/api/listing/get/${listingId}`);

            const data = await res.json();

            if (data.success === false) {
                alert(data.message);
                setLoading(false);
                return;
            }

            setListingData(data);
        };

        fetchData();
        setLoading(false);
    }, [listingId]);

    if (loading) {
        return (
            <Loading />
        );
    }; console.log(listingData);

    return (
        <div className=' m-2 md:m-7'>
            <div>
                {
                    <Swiper navigation>
                        {
                            listingData?.imageUrls?.map((img, index) => (
                                <SwiperSlide key={index}>
                                    <div
                                        className="h-[500px] bg-contain bg-no-repeat bg-center"
                                        style={{ backgroundImage: `url(${img})` }}
                                    ></div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper >
                }
            </div>

            <div className='flex w-full flex-col my-8 gap-5'>
                <p className='md:text-4xl text-2xl font-bold uppercase'>{listingData.name}</p>

                <p>Address:  {listingData.address}</p>

                <p>Description:  {listingData.description}</p>
            </div>

            <div className='flex flex-row flex-wrap gap-6 items-center my-4'>
                <p className='p-3 bg-blue-500 rounded-lg border-2 text-white font-semibold text-xl '>{listingData.type === 'sale' ? "FOR SALE" : "FOR RENT"}</p>
                {
                    listingData.offer
                        ? <p className='flex flex-row gap-4'>
                            <span className=' text-xl font-bold text-green-600'> Price : &nbsp;     $ {listingData.discountPrice}</span>
                            <span className=' text-xl font-semibold line-through text-red-600'> $ {listingData.regularPrice}</span>
                        </p>
                        : <p className=' text-xl font-bold text-green-600'> Price : &nbsp;     ${listingData.regularPrice}</p>
                }
            </div>

            <div className='flex flex-row flex-wrap my-6 mx-4 w-full justify-between md:justify-normal items-center gap-8 '>
                <p className=' text-base flex flex-row items-center gap-3 md:text-xl  font-semibold text-blue-600'>
                    <FaBed /> {listingData.bedrooms} {listingData.bedrooms > 1 ? "Beds" : "Bed"}
                </p>

                <p className=' text-lg flex flex-row items-center gap-3 md:text-xl  font-semibold text-blue-600'>
                    <FaBath /> {listingData.bathrooms} {listingData.bathrooms > 1
                        ? "Baths" : "Bath"}
                </p>

                {
                    listingData.parking
                        ? <p className=' text-lg flex flex-row items-center gap-3 md:text-xl  font-semibold text-blue-600'> <FaParking /> PARKING </p>
                        : <p>NO PARKING </p>
                }

                {
                    listingData.furnished
                        ? <p className=' text-lg flex flex-row items-center gap-3 md:text-xl  font-semibold text-blue-600'> <GiSofa />  FURNISHED</p>
                        : <p>NOT FURNISHED</p>
                }
            </div>

            <button
                className='p-3 bg-blue-600 hover:bg-blue-700 rounded-xl border-white hover:border-slate-500 border-2 font-bold text-white cursor-pointer'
                type="button">CONTACT LANDLORD</button>
        </div>
    )
}

export default Listing;