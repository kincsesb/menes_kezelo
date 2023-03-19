import React from "react";
import { NavLink } from "react-router-dom";

function Navigation() {

  return (
    
    <div className="header">
        <div className="logo"> Ménes Kezelő </div>
          <div className="navbar">
                <NavLink to="/" id="navbar_text"> Home </NavLink>
                <NavLink to="/horses" id="navbar_text"> Horses </NavLink>
          </div>
    </div>
  );
}

export default Navigation;
