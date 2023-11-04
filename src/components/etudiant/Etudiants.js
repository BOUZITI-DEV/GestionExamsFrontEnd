import React from 'react';
import GenerateConvocation from './GenerateConvocationn';
import SchedulerComponent from './Schedulers';
import { Link } from 'react-router-dom';

function Etudiants() {
  return (
    <>
      <nav className="navbar navbar-expand-lg custom-navbar">
            <ul className="navbar-nav mx-auto" >
              <li className="nav-item">
                <Link to="/LoginEtudiants" className="nav-link" >
                  Déconnexion
                </Link>
              </li>
            </ul>
          </nav>
          <br></br>
     <div className="flex flex-row">
      
      <div className="calendar">
        <SchedulerComponent/>
      </div>
      
      <div className="convocation">
        <GenerateConvocation/>
      </div>
    </div>
    </>
  );
}

export default Etudiants;
