import React, { Component } from 'react';

/**Context */
import { MoviesContext } from '../../contexts/MoviesContext';
export default class Overviews extends Component {
  static contextType = MoviesContext;
  constructor(props) {
    super(props);
    this.state = {
      config: {
        id: '',
        type: ''
      },
      details: {
        overview: '',
        genres: [],
        companies: [],
        external_ids: {},
        homepage: ''
      }
    };
  }

  toggle = () => {
    this.context.toggle();
  };

  setOverview = config => {
    this.setState({
      config
    });
    let url = this.context.requestUrlType(config);
    const movies = this.context.getMovies(url);
    movies.then(data => {
      if (data) {
        this.setState({
          details: {
            overview: data.overview,
            genres: data.genres,
            companies: data.production_companies,
            external_ids: data.external_ids,
            homepage: data.homepage
          }
        });
      }
    });
  };

  componentDidMount = () => {
    let config = this.props.config;
    this.toggle();
    this.setOverview(config);
  };

  render() {
    const getLogoCompany = path => {
        const url = 'http://image.tmdb.org/t/p/w92';
        if (path) {
          return <img src={url + path} alt="" />;
        }
        return <img src="/images/icons/no-company.png" alt="" />;
      },
      loading = this.context.loading,
      load = (
        <div className="il-loader">
          <h3>Carregando...</h3>
        </div>
      ),
      ExternalIDs = obj => {
        let keys = Object.keys(obj);
        return keys.map((key_, index) =>
          obj[key_] !== null ? (
            <li key={'external-' + index}>
              <span className="il-text-color--salmon">
                {key_.replace('_id', '')}:{' '}
              </span>
              <span>
                <a
                  href={
                    key_.replace('_id', '') === 'imdb'
                      ? 'https://' +
                        key_.replace('_id', '') +
                        '.com/title/' +
                        obj[key_]
                      : 'https://' +
                        key_.replace('_id', '') +
                        '.com/' +
                        obj[key_]
                  }
                  className="il-text-color--salmon"
                  title={'Visite em ' + key_.replace('_id', '')}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{obj[key_]}</span>
                </a>
              </span>
            </li>
          ) : (
            ''
          )
        );
      };
    return loading ? (
      load
    ) : (
      <div className="il-body--overview">
        <div className="il-detail--genre">
          <h5 className="il-text-color--salmon il-center">Genres</h5>
          <ul className="il-genres">
            {this.state.details.genres.map(genre => (
              <li key={'genre-' + genre.id}>
                <span>{genre.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="il-detail--company">
          <h5 className="il-text-color--salmon il-center">Companies</h5>
          <ul className="il-company">
            {this.state.details.companies.map(company => (
              <li key={'company-' + company.id}>
                <span key={'logo-' + company.id}>
                  {getLogoCompany(company.logo_path)}
                  <span>
                    {company.name} = {company.origin_country}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="il-detail--external__sites">
          <h5 className="il-text-color--salmon il-center">Sites</h5>
          <div>
            Visite o{' '}
            <a
              href={
                this.state.details.homepage ? this.state.details.homepage : '#/'
              }
              target="_blank"
              rel="noopener noreferrer"
              title="Visite o site oficial desse filme"
            >
              site oficial
            </a>
          </div>
        </div>
        <div className="il-detail--external__ids">
          <h5 className="il-text-color--salmon il-center">
            Outras referências
          </h5>
          <ul className="il-externals">
            {ExternalIDs(this.state.details.external_ids)}
          </ul>
        </div>
      </div>
    );
  }
}
