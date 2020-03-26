import React from 'react';

const Hamburguer = props => {
  return (
    <div className="il-menu" onClick={props.toggleMenu}>
      <ul className="il-menu--list">
        <li>
          <span className="top"></span>
          <span className="center"></span>
          <span className="bottom"></span>
        </li>
      </ul>
    </div>
  );
};

export default Hamburguer;
