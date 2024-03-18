import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './home/home';
import './App.css'

function App() {
  return (
    <>
    <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          {/* <Route path="/crowdfunding" exact element={<CrowdFunding />} /> */}
          <Route path="*" element={<h1>Error 404 Page not found !!</h1>} />
        </Routes>
      </Router>
    </>
  );
}

export default App
