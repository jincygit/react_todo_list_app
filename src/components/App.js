import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes , Route, useNavigate, Navigate } from 'react-router-dom';

//import { Home,Login,Signup,UserProfile,Settings } from '../pages';
import { Home } from '../pages';

import Navbar from './Navbar';


const Page404 = () => {
  return <h1>404</h1>;
};


function App() {
  

  return (
    <div className="App">      
      <Router>
          {/* wrap all elements inside router */}
          <Navbar />
          <Routes>
          
            <Route exact path='/' element={<Home />}></Route>
            {/* <Route exact path="/login" element={<Login />} />
            <Route exact path='/register' element={< Signup />}></Route> */}
          {/* <Route
            path="/user/:userId"
            element={auth.user ? <UserProfile /> : <Navigate to="/login" />}
          />
          <Route
            path="/settings"
            element={auth.user ? <Settings /> : <Navigate to="/login" />}
          /> */}
            
            {/* to match any unmatched route, which is essentially a "catch-all" route for 404 errors. */}
            <Route path="*" element={<Page404 />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
