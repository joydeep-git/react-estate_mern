import React from 'react';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// PAGES
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import About from './Pages/About';
import Error from './Pages/Error';
import Header from './Components/Header';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/about' element={<About />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </Router>
  )
}

export default App;