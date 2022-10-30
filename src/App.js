import './App.css';
import { Routes, Route } from 'react-router-dom';



//PAGES and components

import Navbar from './componets/Navbar';
import Home from './pages/Home';
import Create from './pages/Create';
import Show from './pages/Show';
import Update from './pages/Update';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import ReqUser from './componets/ReqUser';
import LogOut from './componets/LogOut';
import Users from './pages/Users';
import Invite from './pages/Invite';
import CodeMode from './pages/CodeMode';





function App() {


  return (
    <>
      <div className="App">
        <Navbar />

        <div className='pages'>


          <Routes>
            {/*public routes */}
            <Route
              path="/login"
              element={<SignIn />}
            />
            <Route
              path="/register"
              element={<Register />}
            />

            <Route element={<ReqUser />}>
              {/* protect routes */}
              <Route
                path="/create"
                element={<Create />}
              />
              <Route
                path="/invite/:id"
                element={<Invite />}
              />
              <Route
                path="/users"
                element={<Users />}
              />
              <Route
                path="/"
                exact
                element={<Home />}
              />
              <Route
                path="/documents"
                element={<Show />}
              />
              <Route
                path="/update/:id"
                element={<Update />}
              />
              <Route
                path="/codemode/:id"
                element={<CodeMode />}
              />

              <Route
                path="/logout"
                element={<LogOut />}
              />
            </Route>
          </Routes>
        </div>

      </div >

      <div className='footer'>JS Ramverk Maria Bjuvsjö HT 2022</div>
    </>
  );
}

export default App;
