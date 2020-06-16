import React, { Component } from 'react';

/**Context */
import { MoviesContext } from '../../../contexts/MoviesContext';

class Gallery extends Component {
  static contextType = MoviesContext;
  constructor(props) {
    super(props);
    this.state = {
      config: {
        id: '',
        type: '',
      },
      galleries: null,
    };
  }
  setGalleries = (config) => {
    this.setState({
      config,
    });
    let url = this.context.requestUrlType(config);
    const galleries = this.context.getMovies(url);
    galleries.then((data) => {
      this.setState({
        galleries: data,
      });
    });
  };
  componentDidMount = () => {
    let config = this.props.config;
    this.setGalleries(config);
  };

  getWallpapers = (type) => {
    let portfolio = '';
    if (this.state.galleries) {
      const { backdrops } = this.state.galleries;

      if (backdrops && backdrops.length > 6) {
        let items = backdrops.slice(0, 6);
        portfolio = items.map((list, index) => (
          <div className="il-card--item" key={'backdrops-' + index}>
            <div
              className="il-card--poster"
              style={this.context.getBack(list.file_path)}
            >
              <div className="il-card--header">
                <h4>{list.file_path}</h4>
              </div>
              <div className="il-card--body">body</div>
            </div>
          </div>
        ));
      }
    }
    return portfolio;
  };
  getPosters = (type) => {
    let portfolio = '';

    if (this.state.galleries) {
      const { posters } = this.state.galleries;

      if (posters && posters.length > 6) {
        let items = posters.slice(0, 6);
        portfolio = items.map((list, index) => (
          <div className="il-card--item" key={'posters-' + index}>
            <div
              className="il-card--poster"
              style={this.context.getBack(list.file_path)}
            ></div>
            <div className="il-card--header">
              <h4>{list.file_path}</h4>
            </div>
            <div className="il-card--body">body</div>
          </div>
        ));
      }
    }

    return portfolio;
  };
  render() {
    return (
      <div>
        <div className="il-detail--gallery">
          <h5 className="il-text-color--salmon il-center">Posters</h5>
          <div className="il-cards il-posters">{this.getPosters()}</div>
        </div>
        <div className="il-detail--gallery">
          <h5 className="il-text-color--salmon il-center">Papéis de parede</h5>
          <div className="il-cards il-wallpapers">{this.getWallpapers()}</div>
        </div>
      </div>
    );
  }
}

export default Gallery;
