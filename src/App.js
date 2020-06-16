import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

/**Provider form Slider or Banner */
import SliderContextProvider from './contexts/SliderContext';

/**Provider for control panel Menu */
import PanelMenuContextProvider from './contexts/PanelMenuContext';

/**partials components */
import Header from './components/partials/Header';
import Nav from './components/partials/Nav';
import Footer from './components/partials/Footer';

/**includes banner or slider */
import SliderBanner from './components/includes/SliderBanner';

/**main components */
import Pages from './components/Pages';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleMenu: false,
    };
    this.setToggleMenu = this.setToggleMenu.bind(this);
  }

  setToggleMenu = () => {
    const toggle = this.state.toggle;
    this.setState({
      toggleMenu: !toggle,
    });
  };

  getToggleMenu = () => {
    return this.state.toggleMenu;
  };

  render() {
    return (
      <div className="il-app">
        <div className="il-container il-background--color__gradient">
          <PanelMenuContextProvider>
            <Router>
              <Header toggleMenu={this.setToggleMenu} />
              <SliderContextProvider>
                <Switch>
                  <SliderBanner />
                </Switch>
              </SliderContextProvider>
              <main className="il-main">
                <Switch>
                  <Nav />
                </Switch>
                <Switch>
                  <Pages />
                </Switch>
              </main>
            </Router>
          </PanelMenuContextProvider>
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
