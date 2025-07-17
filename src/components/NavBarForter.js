// src/components/NavBarForter.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  PeopleFill,
  Search,
  TelephoneFill,
  ChatDotsFill
} from 'react-bootstrap-icons';
import './NavBarForter.css';

const NavBarForter = () => {
  return (
    <nav className="nav-forter bg-primary text-white d-flex justify-content-around align-items-center py-2">
      <NavLink to="/clients" className="nav-icon text-white" title="Clients">
        <PeopleFill size={24} />
      </NavLink>
      <NavLink to="/recherche" className="nav-icon text-white" title="Recherche">
        <Search size={24} />
      </NavLink>
      <NavLink to="/appels" className="nav-icon text-white" title="Appels">
        <TelephoneFill size={24} />
      </NavLink>
      <NavLink to="/chat" className="nav-icon text-white" title="Chat">
        <ChatDotsFill size={24} />
      </NavLink>
    </nav>
  );
};

export default NavBarForter;
