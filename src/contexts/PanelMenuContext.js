import React, { createContext, Component } from 'react';

export const PanelMenuContext = createContext();

class PanelMenuContextProvider extends Component {
  state = {
    showPanel: false
  };

  toggleMenu = () => {
    this.setState({
      showPanel: !this.state.showPanel
    });
  };

  render() {
    return (
      <PanelMenuContext.Provider
        value={{
          ...this.state,
          showPanel: this.state.showPanel,
          toggle: this.toggleMenu
        }}
      >
        {this.props.children}
      </PanelMenuContext.Provider>
    );
  }
}

export default PanelMenuContextProvider;
