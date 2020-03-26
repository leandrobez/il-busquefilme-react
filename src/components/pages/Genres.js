import React, { Component } from 'react';

import Cards from '../cards/Cards';

import MoviesContextProvider from '../../contexts/MoviesContext';

export default class Genres extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      pagination: [],
      config: { type: 'genres', id: '' }
    };
  }

  getTitle = () => {
    return JSON.parse(window.localStorage.getItem('currentGenre'));
  };

  getConfig = () => {
    let config = this.state.config;
    if (this.state.config.id === '') {
      config = { type: 'genres', id: this.props.match.params.id };
    }
    return config;
  };

  componentDidMount = () => {
    this.setState({
      config: { type: 'genres', id: this.props.match.params.id }
    });
  };
  c;

  render() {
    return (
      <section className="il-section">
        <h2 className="il-section--title il-text-color--medium-dark">
          <i className="fas fa-venus-mars"></i>
          <span>
            Gênero <span>{this.getTitle()}</span>
          </span>
        </h2>
        <MoviesContextProvider>
          <Cards config={this.getConfig()} />
        </MoviesContextProvider>
      </section>
    );
  }
}
