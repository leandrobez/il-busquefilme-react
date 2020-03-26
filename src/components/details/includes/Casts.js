import React, { Component } from 'react';

/**Context */
import { MoviesContext } from '../../../contexts/MoviesContext';

class Casts extends Component {
  static contextType = MoviesContext;
  constructor(props) {
    super(props);
    this.state = {
      config: {
        id: '',
        type: ''
      },
      casts: null
    };
  }

  setCasts = config => {
    this.setState({
      config
    });
    let url = this.context.requestUrlType(config);
    const casts = this.context.getMovies(url);
    casts.then(data => {
      this.setState({
        casts: data.cast
      });
    });
  };

  componentDidMount = () => {
    let config = this.props.config;
    this.setCasts(config);
  };

  getCasts = () => {
    const casts = this.state.casts;
    if (casts && casts.length > 6) {
      let items = casts.slice(0, 6);
      return items.map(list => (
        <div className="il-card--item" key={'casts-' + list.cast_id}>
          <div
            className="il-card--poster"
            style={this.context.getBack(list.profile_path)}
          ></div>
          <div className="il-card--header">
            <h4>{list.name}</h4>
          </div>
          <div className="il-card--body">
            <ul className="il-casts">
              <li>Personagem: {list.character}</li>
            </ul>
          </div>
        </div>
      ));
    }
  };
  render() {
    return (
      <div className="il-detail--casts">
        <h5 className="il-text-color--salmon il-center">Elenco</h5>
        <div className="il-cards">{this.getCasts()}</div>
      </div>
    );
  }
}

export default Casts;
