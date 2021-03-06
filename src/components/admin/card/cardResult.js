import React, { Component } from 'react';
//import BtnDetail from '../includes/ButtonComponentDetail';

import { MoviesContext } from '../../../contexts/MoviesContext';

class CardResult extends Component {
  static contextType = MoviesContext;
  constructor(props) {
    super(props);
    this.state = {
      config: {
        id: '',
        type: '',
      },
      movies: [],
    };
  }

  toggle = () => {
    this.context.toggle();
  };

  setMovies = (config) => {
    this.setState({
      config: config,
    });
    ////let dataMovies = [];
    //let dataResults = [];
    const urlCollection = this.context.requestUrlType(config);
    if (urlCollection.length) {
      for (let i = 0; i < urlCollection.length; i++) {
        //let movies = this.context.getMovies(urlCollection[i]);
        console.log(config, urlCollection[i]);
        /**movies.then((movie) => {
          movie.results.forEach((element) => {
            if (!element.adult) {
              //dataMovies.push(element);
              //let  = [];
              dataResults.push(element);
            }
          });
          
          dataMovies.push({ index: i, data: dataResults });
          dataResults = []
        });
        //dataMovies.push(results) */
      }
    }
  };

  componentDidMount = () => {
    let config = this.props.config;
    this.toggle();
    this.setMovies(config);
  };

  setStores = () => {
    if (this.state.movies.length) {
      this.context.setStores(this.state.movies);
    }
  };

  render() {
    let loading = this.context.loading;
    const load = (
      <div className="il-loader">
        <h3>Carregando...</h3>
      </div>
    );
    const noResult = (
      <div className="il-no--result">
        <h4 className="il-color--light il-center">
          Infelizmente nada foi encontrado para sua busca.
        </h4>
      </div>
    );
    const cardItems = () => {
      return this.state.movies.map((movie) => (
        <div className="il-card--item" key={movie.id}>
          <div
            className="il-card--poster"
            style={this.context.getBack(movie.poster_path)}
          ></div>
          <div className="il-card--header">
            <h4>{movie.original_title}</h4>
          </div>
          <div className="il-card--body">
            <span className="il-release">
              {movie.popularity} | {movie.release_date}
            </span>
            <span className="il-overview">
              {movie.overview
                ? movie.overview.substring(170, 0) + '...'
                : `Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus voluptatum sit ex amet rerum optio.`}
            </span>
          </div>
        </div>
      ));
    };
    return loading ? (
      load
    ) : this.state.movies.length ? (
      <div className="il-cards">{cardItems()}</div>
    ) : (
      noResult
    );
  }
}

export default CardResult;
