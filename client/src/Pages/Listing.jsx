import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../Components/Loading';

const Listing = () => {

    const [formData, setFormData] = useState({});
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

            setFormData(data);
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
            {listingId}
        </div>
    )
}

export default Listing;