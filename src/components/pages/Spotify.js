import React, { Component } from 'react';

/**Provider from Spotify */
import SpotifyContextProvider from '../../contexts/SpotifyContext';
import Authorization from '../includes/spotify/Authorization';

export default class Spotify extends Component {
  render() {
    return (
      <section className="il-section">
        <h2 className="il-section--title il-text-color--medium-dark">
          <i className="fab fa-spotify"></i>
          <span>Spotify</span>
        </h2>
        <SpotifyContextProvider>
          <div className="il-spotify--authorization">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Consectetur quaerat tenetur inventore exercitationem incidunt
              eveniet labore recusandae minus ab iusto. Sapiente nostrum ab
              voluptates libero necessitatibus ut nemo et deleniti, commodi
              recusandae ad eaque.
            </p>
            <Authorization />
          </div>
        </SpotifyContextProvider>
      </section>
    );
  }
}
