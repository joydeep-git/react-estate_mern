import React, { useEffect } from 'react';

import { Link} from 'react-router-dom';

const Error = () => {

  return (
    <div className='flex flex-col items-center justify-center w-full h-[90vh] text-center'>
      <img src="https://thumbs.dreamstime.com/b/website-page-not-found-error-robot-character-magnifying-glass-hand-site-crash-technical-work-web-design-template-249894503.jpg" alt="Error Image" className="mb-4 " />

      <h1 className="text-4xl font-bold mb-2">Oh! No!</h1>
      <p className="text-lg mb-4">WRONG URL!</p>

      <Link to={'/'} className=" font-bold mb-8 text-xl p-2 cursor-pointer border-2 border-black rounded-lg">Get back to the HOMEPAGE...</Link>
      </div>
      )
}

      export default Error;