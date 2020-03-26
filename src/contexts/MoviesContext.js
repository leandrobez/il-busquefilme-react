import React, { createContext, Component } from 'react';
import { requestAPI } from '../services/requestAPI';

export const MoviesContext = createContext();

class MoviesContextProvider extends Component {
  state = {
    load: false,
    movies: [],
    pagination: []
  };

  toggleLoad = () => {
    this.setState({
      load: !this.state.load
    });
  };

  getUrlRequestType = config => {
    let url = null,
      id = null,
      choices = null;
    //break config
    const type = config.type;
    switch (type) {
      case 'genres':
        id = config.id;
        url = requestAPI.urlGenres(id);
        break;
      case 'thebests':
        url = requestAPI.urlTheBests();
        break;
      case 'choices':
        choices = config.choices;
        url = requestAPI.urlChoices(choices);
        break;
      case 'search':
        const key = 'word-param',
          storage = window.localStorage,
          stfy = JSON.stringify,
          word = stfy(storage.getItem(key));
        url = requestAPI.urlSearchs(word);
        break;
      case 'details':
        id = config.id;
        url = requestAPI.urlDetails(id);
        break;
      case 'casts':
        id = config.id;
        url = requestAPI.urlCasts(id);
        break;
      case 'galleries':
        id = config.id;
        url = requestAPI.urlGalleries(id);
        break;
      default:
        id = config.id;
        url = requestAPI.urlGenres(id);
        break;
    }
    return url;
  };

  getMovies = url => {
    return requestAPI.getMovies(url).then(res => {
      this.setState({
        load: false
      });
      return res
    });
  };

  getBackground = path => {
    const urlBase = 'http://image.tmdb.org/t/p/w300';
    if (path) {
      return { backgroundImage: 'url(' + urlBase + path + ')' };
    } else {
      return { backgroundColor: '#defff1' };
    }
  };

  setStores = movies => {
    const storeKey = 'movies',
      storage = window.localStorage,
      stfy = JSON.stringify;
    storage.setItem(storeKey, stfy(movies));
  };

  getDetails = id => {
    const storeKey = 'movies',
      storage = window.localStorage,
      parse = JSON.parse,
      movies = parse(storage.getItem(storeKey));
    return movies.find(movie => movie.id === +id);
  };

  render() {
    return (
      <MoviesContext.Provider
        value={{
          ...this.state,
          loading: this.state.load,
          toggle: this.toggleLoad,
          requestUrlType: this.getUrlRequestType,
          getMovies: this.getMovies,
          getBack: this.getBackground,
          setStores: this.setStores,
          detail: this.getDetails
        }}
      >
        {this.props.children}
      </MoviesContext.Provider>
    );
  }
}

export default MoviesContextProvider;
