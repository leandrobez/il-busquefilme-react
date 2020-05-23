import React, { createContext, Component } from 'react';

import {
  getURL,
  getAccess,
  getUserSpotify,
  getAlbums
} from '../services/spotifyAPI';

export const SpotifyContext = createContext();

class SpotifyContextProvider extends Component {
  state = {
    isAuthenticatedSpotify: false,
    user: {},
    tracks: [],
    access: {
      _token: '',
      _type: ''
    }
  };

  getUrl = () => {
    return getURL();
  };

  getUser = token => {
    const dataUser = getUserSpotify(token);
    return dataUser.then(data => {
      if (data.error) {
        this.setState({
          isAuthenticatedSpotify: false,
          user: {},
          tracks: [],
          access: {
            _token: '',
            _type: ''
          }
        });
        return data;
        //this.redirectLoginSpotify();
      } else {
        this.setState({
          isAuthenticatedSpotify: true,
          user: data.user
        });

        return {
          error: false,
          user: data.user
        };
        //this.getTracks();
      }
    });
  };

  access = () => {
    const spotifyAccess = getAccess();
    const spotify = {
      isAuthenticatedSpotify: true,
      access: {
        _token: spotifyAccess._token,
        _type: spotifyAccess._type
      }
    };
    this.setState(spotify);
    return spotify.access;
  };

  getAlbums = token => {
    const key = 'details',
      storage = window.localStorage;
    let movie = JSON.parse(storage.getItem(key));
    const dataAlbums = getAlbums(token, movie);
    return dataAlbums.then(data => {
      if (data.error) {
        this.setState({});
        //this.redirectLoginSpotify();
      } else {
        this.setState({
          tracks: data
        });
        return data;
      }
    });
  };

  getTracks = () => {
    if (this.state.tracks.length) {
      return false;
    } else {
      return true;
    }
  };

  logoutSpotify = () => {
    let isAuthenticatedSpotify = this.state.isAuthenticatedSpotify;
    this.setState({ isAuthenticatedSpotify: !isAuthenticatedSpotify });
  };

  render() {
    return (
      <SpotifyContext.Provider
        value={{
          ...this.state,
          getUser: this.getUser,
          logout: this.logoutSpotify,
          getUrl: this.getUrl,
          access: this.access,
          albums: this.getAlbums,
          tracks: this.getTracks
        }}
      >
        {this.props.children}
      </SpotifyContext.Provider>
    );
  }
}

export default SpotifyContextProvider;
