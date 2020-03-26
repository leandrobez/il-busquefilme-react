import React, { Component } from 'react';

import Cards from '../cards/Cards';

import MoviesContextProvider from '../../contexts/MoviesContext';

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      pagination: []
    };
  }
  getConfig = () => {
    return {
      type: 'search',
      id: ''
    };
  };


  render() {
    return (
      <section className="il-section">
        <h2 className="il-section--title il-text-color--medium-dark">
          <i className="fas fa-search"></i>
          <span>Resultado para sua busca.</span>
        </h2>
        <MoviesContextProvider>
          <Cards config={this.getConfig()} />
        </MoviesContextProvider>
      </section>
    );   
   
  }
}

export default SearchResult;
