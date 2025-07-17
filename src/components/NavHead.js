// src/components/NavHead.js
import React from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { ArrowRepeat, Robot } from 'react-bootstrap-icons';

const NavHead = () => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="d-flex justify-content-between align-items-center bg-primary text-white px-3 py-2">
      <h4 className="m-0">
        <img
          src="/logo192.png"
          alt="DREC"
          style={{ width: 30, marginRight: 10 }}
        />
        DREC
      </h4>

      <div className="d-flex align-items-center gap-3">
        <Button variant="light" onClick={handleReload}>
          <ArrowRepeat size={20} />
        </Button>

        <Dropdown>
          <Dropdown.Toggle variant="light" id="dropdown-basic">
            <Robot size={20} /> IA
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="/ia-fiscale">IA Fiscale</Dropdown.Item>
            <Dropdown.Item href="/ia-comptable">IA Comptable</Dropdown.Item>
            <Dropdown.Item href="/ia-recouvrement">IA Recouvrement</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default NavHead;
