import React, { Component } from 'react';
import { SpotifyContext } from '../../../contexts/SpotifyContext';

class Tracks extends Component {
  static contextType = SpotifyContext;
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          label: 'Id',

          width: '5%'
        },

        {
          label: 'Nome',

          width: '25%'
        },

        {
          label: 'Artistas',

          width: '25%'
        },

        {
          label: 'Trilha',

          width: '30%'
        }
      ],
      albums: []
    };
  }

  componentDidMount = () => {
    //if logged busca as trilhas
    if (this.context.isAuthenticatedSpotify) {
      const access = this.context.access();
      const dataAlbums = this.context.albums(access._token);

      dataAlbums.then(albums => {
        this.setState(
          {
            albums: albums
          },
          cb => {
            this.getTracks(access._token, albums);
          }
        );
      });
    }
  };

  getTracks = (_token, albums) => {
    this.context.tracks(_token, albums);
  };

  render() {
    const thead = () => {
      return this.state.columns.map((column, index) => (
        <th
          key={'th-' + index}
          width={column.width}
          className="il-text-color--dark"
        >
          {column.label}
        </th>
      ));
    };

    const trTracks = () => {
      const artists = list => {
        return list.map(artist => <li key={artist.id}>{artist.name}</li>);
      };
      return this.state.albums.map((track, index) => (
        <tr key={'row-' + index}>
          <td width="5%" className="il-color-texture--third">
            {index + 1}
          </td>

          <td width="25%" className="il-color-texture--third">
            {track.name}
          </td>

          <td width="25%" className="il-color-texture--third">
            <ul> {artists(track.artists)}</ul>
          </td>

          <td width="35%" className="il-color-texture--third">
            <audio controls>
              <source
                src="https://p.scdn.co/mp3-preview/3245f73297bdbbf55808e2fa3e1132464075c062?cid=774b29d4f13844c495f206cafdad9c86"
                type="audio/mp3"
              />
              seu navegador não suporta HTML5
            </audio>
          </td>
        </tr>
      ));
    };

    return (
      <div>
        <table>
          <thead>
            <tr>{thead()}</tr>
          </thead>
        </table>
        <table>
          <tbody>
            {this.state.albums.length ? (
              trTracks()
            ) : (
              <tr>
                <td colSpan="3">Sem resultado</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Tracks;
