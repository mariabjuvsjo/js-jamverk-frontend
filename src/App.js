import './App.css';
import { Routes, Route } from 'react-router-dom';



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
              exact
              element={<Home />}
            />
            <Route
              path="/create"
              element={<Create />}
            />
            <Route
              path="/documents"
              element={<Show />}
            />
            <Route
              path="/update/:id"
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
