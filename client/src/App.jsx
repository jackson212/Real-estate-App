import React from 'react'
import Home from './pages/Home'
import About from './pages/About'
import Signin from './pages/Signin'
import Signout from './pages/Signout'
import Profile from './pages/Profile'
import Header from './components/Header'
import { Link } from 'react-router-dom'

import PrivateRoute from './components/PrivateRoute'

import {

  Routes,
  Route,
  BrowserRouter,
 } from 'react-router-dom';
import Signup from './pages/Signup'
import CreateListing from './pages/CreateListing'


const App = () => {
  return <BrowserRouter>
       <Header/>
      <Routes>
        
      <Route path='/' element={<Home />} />
      <Route path='/signup' element={<Signup />} />
 
      <Route path='/about' element={<About/>} />
      <Route path='/signin' element={<Signin />} />
      {/* <Route path='/signout' element={<Signout />} /> */}
      
      <Route element={<PrivateRoute/>}>
      
            <Route path='/profile' element={<Profile />} />
            <Route path='/create-listing' element={<CreateListing />} />
      
      
      </Route>
    
      
      
       </Routes>
  </BrowserRouter>;
  
}

export default App