import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
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
            {/* routing homepage */}
            <Route exact path='/' element={<Home />}></Route>
          
            
            {/* to match any unmatched route, which is essentially a "catch-all" route for 404 errors. */}
            <Route path="*" element={<Page404 />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
