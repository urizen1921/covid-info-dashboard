import React, { useState } from 'react';
import {Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import view from '../../utils/views.js';

function Navbar({ options, select }) {

  const [activeTab, setActiveTab] = useState('0');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  function navBarOnClick(index) {
    toggle(index);
    select(index);
  } 


  return (
    <div>
      <Nav className="nav nav-tabs h-100 border-0 d-flex bg-light" tabs>
        {options.map((option, index) => (
        <NavItem className="nav-item h-100 flex-fill m-0" key={option}>
          <NavLink
            className={classnames({ active: activeTab === index })}
            onClick={() => navBarOnClick(index)}
            style={{color: `${view[index].colorHex}`}}
          >
            {option}
          </NavLink>
        </NavItem>
        ))}
      </Nav>
  </div>
  );
}

export default Navbar;