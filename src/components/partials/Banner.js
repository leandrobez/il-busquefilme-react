import React, { Component } from 'react';

class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: null
    };
  }
  componentDidMount = () => {
    const storeKey = 'details',
      storage = window.localStorage,
      parse = JSON.parse,
      details = parse(storage.getItem(storeKey));
    this.setState({ details });
  };
  getBack = () => {
    const details = this.state.details,
      urlBase = 'http://image.tmdb.org/t/p/original';

    if (details && details.backdrop_path) {
      return {
        backgroundImage: 'url(' + urlBase + details.backdrop_path + ')'
      };
    } else {
      return {
        backgroundImage: "url('/images/banners/no-slider.jpg')"
      };
    }
  };

  getDetails = () => {
    if (this.state.details) {
      return this.state.details;
    } else {
      return <div className="il-banner">sem nada</div>;
    }
  };

  render() {
    const banner = (
      <div className="il-banner">
        <div className="il-big--img" style={this.getBack()}></div>
        <div className="il-banner--header">
          <h1>
            <span className="il-text-color--light">
              {this.getDetails().original_title}
            </span>
          </h1>
        </div>
      </div>
    );
    return banner;
  }
}

export default Banner;
