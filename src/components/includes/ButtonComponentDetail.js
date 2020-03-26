import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { SliderContext } from '../../contexts/SliderContext';
class ButtonComponentDetail extends Component {
  static contextType = SliderContext;
  constructor(props) {
    super(props);
    this.movie = props.currentMovie;
  }

  render() {
    return (
      <div className="il-card--button il-background--color__gradient">
        <Link
          id={'detail-' + this.movie.id}
          className="il-btn il-btn--card"
          to={'/' + this.movie.id + '/' + this.movie.title + '/details'}
          title="Saiba mais sobre esse filme"
        >
          Details
        </Link>
        <Link
          id={'spotify-' + this.movie.id}
          className="il-btn il-btn--card"
          to={'/spotify/' + this.movie.id + '/' + this.movie.title}
          title="Encontre a playlist desse filme no Spotify."
        >
          Spotify
        </Link>
      </div>
    );
  }
}

export default ButtonComponentDetail;
