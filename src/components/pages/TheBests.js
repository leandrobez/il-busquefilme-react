import React, { Component } from 'react';

import Cards from '../cards/Cards';

import MoviesContextProvider from '../../contexts/MoviesContext';

export default class TheBests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      pagination: []
    };
  }
  getConfig = () => {
    return {
      type: 'thebests',
      id: ''
    };
  };
  render() {
    return (
      <section className="il-section">
        <h2 className="il-section--title il-text-color--medium-dark">
          <i className="fas fa-trophy"></i>
         <span> Os melhores do ano</span>
        </h2>
        <MoviesContextProvider>
          <Cards config={this.getConfig()} />
        </MoviesContextProvider>
      </section>
    );
  }
}
