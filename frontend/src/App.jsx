import React from 'react';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';

function App() {
  return (
    <div className="min-h-screen bg-beige overflow-x-hidden w-full">
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
}

export default App;