import React from "react";
import { NavLink } from "react-router-dom";

function Navigation() {

  return (
    
    <div className="header">
        <div className="logo"> Ménes Kezelő </div>
          <div className="navbar">
                <NavLink to="/" id="navbar_text" class="main_page"> Főoldal </NavLink>
                <NavLink to="/horses" id="navbar_text" class="horses_page"> Lovak </NavLink>
                <NavLink to="/forage" id="navbar_text" class="forage_page"> Takarmányszámadás </NavLink>
          </div>
          <div className="line-1"></div>
    </div>
  );
}

export default Navigation;
