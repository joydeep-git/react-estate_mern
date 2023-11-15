import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

const Error = () => {

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/');
    }, 1500);
  }, []);

  return (
    <div className='flex flex-col items-center justify-center w-full h-full text-center'>
      <img src="https://thumbs.dreamstime.com/b/website-page-not-found-error-robot-character-magnifying-glass-hand-site-crash-technical-work-web-design-template-249894503.jpg" alt="Error Image" className="mb-4 " />

      <h1 className="text-4xl font-bold mb-2">Oh! No!</h1>
      <p className="text-lg mb-4">WRONG URL!</p>

      <p className=" font-bold mb-8 text-xl">Redirecting to the HOMEPAGE...</p>
      </div>
      )
}

      export default Error;