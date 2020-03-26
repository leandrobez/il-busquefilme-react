import React, { Component } from 'react';
import SpotifyContextProvider from '../../contexts/SpotifyContext';

import User from '../includes/spotify/User';
import Tracks from '../includes/spotify/Tracks';

export default class Callback extends Component {
  state = {
    showTracks: false
  };
  toggleTracks = () => {
    this.setState({
      showTracks: true
    });
  };
  render() {
    return (
      <section className="il-section">
        <h2 className="il-section--title il-text-color--medium-dark">
          <i className="fab fa-spotify"></i>
          <span>Spotify</span>
        </h2>
        <SpotifyContextProvider>
          <User toggle={this.toggleTracks} />
          {this.state.showTracks ? <Tracks /> : ''}
        </SpotifyContextProvider>
      </section>
    );
  }
}
