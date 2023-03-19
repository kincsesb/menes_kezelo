import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./client/Home/Home";
import Navigation from "./client/Navigation/Navigation";
import HorseList from "./client/Horses/HorsesComponent";
import Footer from "./client/Footer/Footer"
import UpdateHorse from "./client/Update/UpdateHorse";
import AddHorse from "./client/AddHorse/AddHorse";

function App() {

  return (
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/horses" element={<HorseList />} />
          <Route path="/addhorse" element={<AddHorse />} />
          <Route path="/update/:id" element={<UpdateHorse/>} />
        </Routes>
        <Footer />
      </Router>
  );
}

export default App;