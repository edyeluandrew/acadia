// import React from 'react';
// import Navbar from './components/Layout/Navbar';
// import Footer from './components/Layout/Footer';
// import Home from './pages/Home';

// function App() {
//   return (
//     <div className="min-h-screen bg-beige overflow-x-hidden w-full">
//       <Navbar />
//       <Home />
//       <Footer />
//     </div>
//   );
// }

// export default App;




import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import CoffeeLandingPage from './pages/CoffeeLandingPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-beige overflow-x-hidden w-full">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coffee" element={<CoffeeLandingPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;