import './App.css';
import { Routes, Route } from 'react-router-dom';
import docModel from './models/docs';
import { useEffect, useState } from 'react';

//PAGES and components

import Navbar from './componets/Navbar';
import Home from './pages/Home';
import Create from './pages/Create';
import Show from './pages/Show';
import Update from './pages/Update';

function App() {


  return (
    <>
      <div className="App">
        <Navbar />

        <div className='pages'>
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/create"
              element={<Create />}
            />
            <Route
              path="/Show"
              element={<Show />}
            />
            <Route
              path="/update"
              element={<Update />}

            />
          </Routes>



        </div>

      </div >

      <div className='footer'>JS Ramverk Maria Bjuvsjö HT 2022</div>
    </>
  );
}

export default App;
