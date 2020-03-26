import React, { Component } from 'react';
import BtnDetail from '../includes/ButtonComponentDetail';

import { MoviesContext } from '../../contexts/MoviesContext';

class Cards extends Component {
  static contextType = MoviesContext;
  constructor(props) {
    super(props);
    this.state = {
      config: {
        id: '',
        type: ''
      },
      movies: []
    };
  }

  toggle = () => {
    this.context.toggle();
  };

  setMovies = config => {
    this.setState({
      config
    });
    if (config.type !== 'choices') {
      let url = this.context.requestUrlType(config),
        movies = this.context.getMovies(url);
      movies.then(data => {
        if (data) {
          let movies = data.results.filter(res => res !== null);
          this.setState({ movies: movies });
          this.setStores(movies);
        }
      });
    } else {
      let dataMovies = [];
      //return variables url in array
      const urlCollection = this.context.requestUrlType(config);

      for (let i = 0; i < config.choices.length; i++) {
        let movies = this.context.getMovies(urlCollection[i]);
        movies.then(data => {
          if (!data.adult) {
            dataMovies.push(data);
            this.setState({ movies: dataMovies });
            this.setStores(dataMovies);
          }
        });
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
      return this.state.movies.map(movie => (
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
          <BtnDetail key={'btndetail-' + movie.id} currentMovie={movie} />
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

export default Cards;
