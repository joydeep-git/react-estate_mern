// import React from 'react';

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// // PAGES
// import SignIn from './Pages/SignIn';
// import SignUp from './Pages/SignUp';
// import Home from './Pages/Home';
// import Profile from './Pages/Profile';
// import About from './Pages/About';
// import Error from './Pages/Error';
// import Header from './Components/Header';
// import ProtectedRoutes from './Components/ProtectedRoutes';
// import CreateListing from './Pages/CreateListing';
// import UpdateListing from './Pages/UpdateListing';
// import Listing from './Pages/Listing';

// const App = () => {
//   return (
//     <Router>
//       <Header />
//       <Routes>
//         <Route path='/' element={<Home />} />
//         <Route path='/sign-in' element={<SignIn />} />
//         <Route path='/sign-up' element={<SignUp />} />
//         <Route path='/about' element={<About />} />
//         <Route path='*' element={<Error />} />
//         <Route path='/listing/:id' element={<Listing />} />
//         <Route element={<ProtectedRoutes />}>
//           <Route path='/profile' element={<Profile />} />
//           <Route path='/create-listing' element={<CreateListing />} />
//           <Route path='/update-listing/:id' element={<UpdateListing />} />
//         </Route>
//       </Routes>
//     </Router>
//   )
// }

// export default App;

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your components and pages
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import About from './Pages/About';
import Error from './Pages/Error';
import Header from './Components/Header';
import ProtectedRoutes from './Components/ProtectedRoutes';
import CreateListing from './Pages/CreateListing';
import UpdateListing from './Pages/UpdateListing';
import Listing from './Pages/Listing';

const App = () => {
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      const delta = e.deltaY;
      const target = document.documentElement.scrollTop + delta;

      window.scrollTo({
        top: target,
        behavior: "smooth",
      });
    };

    // Add { passive: false } to the event listener options
    window.addEventListener('wheel', handleWheel, { passive: false });

    // Remove the event listener with the same options
    return () => {
      window.removeEventListener('wheel', handleWheel, { passive: false });
    };

  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/about' element={<About />} />
        <Route path='*' element={<Error />} />
        <Route path='/listing/:id' element={<Listing />} />
        <Route element={<ProtectedRoutes />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/create-listing' element={<CreateListing />} />
          <Route path='/update-listing/:id' element={<UpdateListing />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
