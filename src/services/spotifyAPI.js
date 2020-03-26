import axios from 'axios';
//import axios from 'axios';
const dotenv = require('dotenv');
//initialize dotenev
dotenv.config();

export const dashboard = () => {
  return {
    mail: 'suporte@internetlojas.com',
    senha: '12AnAm1',
    app_name: 'BusqueFilme',
    url_dashboard:
      'https://beta.developer.spotify.com/dashboard/applications/' +
      process.env.REACT_APP_DASHBOARD
  };
};

export const getURL = () => {
  const scope = 'streaming user-read-private user-read-email',
    client = `client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=token&`,
    redirect = `redirect_uri=http://localhost:${
      process.env.REACT_APP_HOST_PORT
    }/spotify/callback&scope=${encodeURI(scope)}`;
  return `https://accounts.spotify.com/authorize/?${client}${redirect}`;
};

export const getAccess = () => {
  let hash = window.location.hash,
    elem1 = hash.split('access_token='),
    elem2 = elem1[1].split('&token_type='),
    elem3 = elem2[1].split('&expires_in=');
  return {
    _token: elem2[0],
    _type: elem3[0]
  };
};

export const getUserSpotify = async _token => {
  let url = 'https://api.spotify.com/v1/me',
    bearer = {
      headers: {
        Authorization: 'Bearer ' + _token
      }
    };
  //search user spotify
  return await axios
    .get(url, bearer)
    .then(res => {
      if (res.status === 200) {
        return {
          error: false,
          user: res.data
        };
      } else {
        return {
          error: true,
          message: res.data.message
        };
      }
    })
    .then(value => {
      return value;
    })
    .catch(err => {
      return {
        error: true,
        message: {
          type: 'warning',
          value: err.message
        }
      };
    });
};

export const getAlbums = async (_token, movie) => {
  const searchs = {
    apiURL: 'https://api.spotify.com/v1/search?query=',
    offset: '&offset=0',
    limit: '&limit=20',
    type: '&type=album',
    market: '&market=US'
  };
  let urlTracks = searchs.apiURL.concat(
    encodeURI(movie),
    searchs.offset,
    searchs.limit,
    searchs.type,
    searchs.market
  );
  const bearer = {
    headers: {
      Authorization: 'Bearer ' + _token
    }
  };
  return await axios
    .get(urlTracks, bearer)
    .then(res => {
      if (res.status === 200) {
        let items = res.data.albums.items;
        //	https://api.spotify.com/v1/albums/{id}/tracks
        let albums = [];
        items.forEach(item => {
          if (
            item.name.search('(Original Motion Picture Soundtrack)' !== -1) &&
            (item.album_type === 'album' || item.type === 'album')
          ) {
            albums.push({
              id: item.id,
              name: item.name,
              uri: item.uri,
              artists: item.artists,
              total_tracks: item.total_tracks
            });
          }
        });
        return albums;
      } else {
        console.log('sem permissão');
      }
    })
    .then(albums => {
      return albums;
    })
    .catch(err => {
      console.log(err);
    });
};
export const getTracks = async (_token, album) => {
  const urlTracks = `https://api.spotify.com/v1/albums/${album[0].id}/tracks`,
    bearer = {
      headers: {
        Authorization: 'Bearer ' + _token
      }
    };
  try {
    return await axios.get(urlTracks, bearer).then(res => {
      if (res.status === 200 && res.data.items.length) {
        console.log(res.data);
        return {
          error: false,
          tracks: res.data
        };
      } else {
        return {
          error: true,
          message: {
            type: 'warning',
            value: 'Algo deu errado'
          }
        };
      }
    });
  } catch (error) {
    console.log(error);
  }
};
