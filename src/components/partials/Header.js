import React, { Component } from 'react';
import { PanelMenuContext } from '../../contexts/PanelMenuContext';

/**components */
import Logo from '../includes/HeaderComponentsLogo';
import Search from '../includes/HeaderComponentSearch';
import Hamburguer from '../includes/HeaderComponentHamburguer';

class Header extends Component {
  static contextType = PanelMenuContext;
  constructor(props) {
    super(props);
    this.state = {
      toggleMenu: ''
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu = () => {
    const { toggle } = this.context;
    toggle();
  };

  render() {
    return (
      <header>
        <div className="il-container--wrapper">
          <div className="il-header--content">
            <Logo />
            <Search />
            <Hamburguer toggleMenu={this.toggleMenu} />
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
