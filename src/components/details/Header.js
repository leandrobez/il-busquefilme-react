import React, { Component } from 'react';

/**Context */
import { MoviesContext } from '../../contexts/MoviesContext';
class Header extends Component {
  static contextType = MoviesContext;
  constructor(props) {
    super(props);
    this.state = {
      banner: {},
    };
  }

  componentDidMount = () => {
    let banner = this.context.detail(this.props.id);
    this.setState({
      banner,
    });
  };

  render() {
    const banner = (
      <>
        <div className="il-header--poster">
          <img
            src={
              'http://image.tmdb.org/t/p/w300' + this.state.banner.poster_path
            }
            alt="poster"
          />
        </div>
        <div className="il-header--info">
          <ul>
            <li className="il-text-color--salmon">
              popularity: <span>{this.state.banner.popularity}</span>
            </li>
            <li className="il-text-color--salmon">
              language: <span>{this.state.banner.original_language}</span>
            </li>
            <li className="il-text-color--salmon">
              date: <span>{this.state.banner.release_date}</span>
            </li>
            <li className="il-text-color--salmon">
              vote: <span>{this.state.banner.vote_average}</span>
            </li>
          </ul>
          <div className="il-detail--sinopse">
            <p className="il-text-color--light">{this.state.banner.overview}</p>
          </div>
        </div>
      </>
    );
    return banner;
  }
}

export default Header;
