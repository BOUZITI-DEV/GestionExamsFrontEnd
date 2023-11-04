import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter } from "react-router-dom";
import LoginEtudiants from "./components/LoginEtudiants.jsx";
import "./components/CSS/custom-navbar.css";
import Etudiants from "./components/etudiant/Etudiants.js";
import { useState } from "react";
import { Outlet } from 'react-router-dom';

const LoginProvider = () => {
  const [loginResponse,setLoginResponse]=useState({})
  return <Outlet context={{ loginResponse ,setLoginResponse}} />;
};
function App() {
  return (
    <>
      <BrowserRouter>
          <div className="container mt-4">
            <Routes>
              <Route element={<LoginProvider />}>
                <Route exact path="/" element={<LoginEtudiants />} />
                <Route path="/LoginEtudiants" element={<LoginEtudiants />} />
                <Route path="/Etudiants" element={<Etudiants />} />
              </Route>
            </Routes>
          </div>
      </BrowserRouter>
    </>
  );
}

export default App;