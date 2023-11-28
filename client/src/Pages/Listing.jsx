import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../Components/Loading';

// SWIPER IMPORTS

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';

const Listing = () => {

    SwiperCore.use([Navigation]);

    const [listingData, setListingData] = useState({}); console.log(listingData);
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
    };

    return (
        <div>
            {
                <Swiper navigation>
                    {
                        listingData?.imageUrls?.map((img, index) => (
                            <SwiperSlide key={index}>
                                <div
                                    className="h-[500px] bg-cover bg-center"
                                    style={{ backgroundImage: `url(${img})` }}
                                ></div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper >
            }
        </div>
    )
}

export default Listing;