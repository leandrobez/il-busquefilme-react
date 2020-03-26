import React, { Component } from 'react';

import Cards from '../cards/Cards';

import MoviesContextProvider from '../../contexts/MoviesContext';

export default class Choices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choices: ['686', '70160', '329865'],
      movies: []
    };
  }
  getConfig = () => {
    return {
      type: 'choices',
      choices: this.state.choices
    };
  };
  render() {
    return (
      <section className="il-section">
        <h2 className="il-section--title il-text-color--medium-dark">
          <i className="fas fa-filter"></i>
          <span>Preferidos do Editor</span>{' '}
        </h2>
        <MoviesContextProvider>
          <Cards config={this.getConfig()} />
        </MoviesContextProvider>
      </section>
    );
  }
}
