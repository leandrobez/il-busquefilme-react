import React, { Component } from 'react';

/**provider */
import MoviesContextProvider from '../../contexts/MoviesContext';

/**components */
import Overviews from '../details/Overviews';
import Modals from '../details/Modals';
import Header from '../details/Header';

export default class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: {}
    };
  }
  getDetail = id => {
    const key = 'movies',
      storage = window.localStorage,
      parse = JSON.parse;
    const movies = parse(storage.getItem(key));
    const detail = movies.find(id => movie => {
      return movie.id === id;
    });
    const storeKey = 'details',
      stfy = JSON.stringify;
    storage.setItem(storeKey, stfy(detail));
    this.setState({
      detail: detail
    });
  };
  componentDidMount = () => {
    const id = this.props.match.params.id;
    this.getDetail(id);
  };
  getConfig = () => {
    return {
      type: 'details',
      id: this.props.match.params.id
    };
  };
  render() {
    return (
      <section className="il-section">
        <h2 className="il-section--title il-text-color--salmon">
          <i className="fas fa-film"></i>
          <span>Details</span>
        </h2>
        <div className="il-detail--wrapper">
          <div className="il-detail--header">
            <MoviesContextProvider>
              <Header
                name={this.props.match.params.name}
                id={this.props.match.params.id}
              />
            </MoviesContextProvider>
          </div>
          <div className="il-detail--body">
            <MoviesContextProvider>
              <Overviews config={this.getConfig()} />
            </MoviesContextProvider>
            <MoviesContextProvider>
              <Modals id={this.props.match.params.id} />
            </MoviesContextProvider>
          </div>
        </div>
      </section>
    );
  }
}
