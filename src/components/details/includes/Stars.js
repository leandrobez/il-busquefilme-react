import React, { Component } from 'react';

class Stars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      votes: props.vote_average,
    };
  }

  average = {
    perc: 0,
    steps: [1, 2, 3, 4, 5],
    stars: {
      active: 0,
      trunc: 0,
    },
  };

  createStars = () => {
    let perc, stars, starsActive, starsTrunc;
    perc = 10 * +this.state.votes;
    stars = (this.average.steps.length * perc) / 100;
    starsActive = Math.trunc(stars);
    starsTrunc = stars - starsActive;
    this.average.stars.active = +starsActive;
    this.average.stars.trunc = +starsTrunc;
    this.average.perc = perc;
  };

  render() {
    const starActives = () => {
      return this.average.steps.map((step) => (
        <span className="il-actives" key={'actives-' + step}>
          <i className="fas fa-star"></i>
        </span>
      ));
    };

    const starInactives = () => {
      return this.average.steps.map((step) => (
        <span className="il-inactives" key={'inactives-' + step}>
          <i
            className="fas fa-star"
            style={{ backgroundColor: 'rgba(0,0,0,.5)' }}
          ></i>
        </span>
      ));
    };

    return (
      <div className="il-detail--stars">
        <div className="il-stars">
          <div className="il-stars--main">{starActives()}</div>
          <div className="il-stars--inner">{starInactives()}</div>
        </div>
        <span>{this.vote}</span>
      </div>
    );
  }
}

export default Stars;
