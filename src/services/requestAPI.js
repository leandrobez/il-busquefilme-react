import theMovieDB from '../config/theMovieDB';
import axios from 'axios';

export const requestAPI = {
  urlGenres: (id) => {
    return theMovieDB.url.genres.concat(
      id,
      '/movies',
      '?api_key=',
      theMovieDB.appKey,
      '&language=',
      theMovieDB.language,
      '&page=1&sort_by=created_at.asc&include_adult=false',
      '&append_to_response=external_ids'
    );
  },
  urlTheBests: () => {
    let today = new Date();
    let year = 1900 + today.getYear();
    return theMovieDB.url.discoverUrl.concat(
      '?api_key=',
      theMovieDB.appKey,
      theMovieDB.url.discover.arguments.release + year,
      theMovieDB.url.discover.arguments.average,
      '&language=',
      theMovieDB.language,
      '&page=1&sort_by=created_at.asc&include_adult=false',
      '&append_to_response=external_ids'
    );
  },
  urlChoices: (ids) => {
    let urlCollection = [];
    ids.forEach((id) => {
      urlCollection.push(
        theMovieDB.url.details.concat(
          id,
          '?api_key=',
          theMovieDB.appKey,
          '&language=',
          theMovieDB.language,
          '&page=1&sort_by=created_at.asc&include_adult=false',
          '&append_to_response=external_ids'
        )
      );
    });
    return urlCollection;
  },
  urlSearchs: (word) => {
    return theMovieDB.url.search.concat(
      '?api_key=',
      theMovieDB.appKey,
      '&query=',
      word,
      '&language=',
      theMovieDB.language,
      '&page=1&sort_by=created_at.asc&include_adult=false',
      '&append_to_response=external_ids'
    );
  },
  urlDetails: (id) => {
    return theMovieDB.url.details.concat(
      id,
      '?api_key=',
      theMovieDB.appKey,
      '&language=',
      theMovieDB.language,
      '&page=1&sort_by=created_at.asc&include_adult=false',
      '&append_to_response=external_ids'
    );
  },
  urlCasts: (id) => {
    return theMovieDB.url.details.concat(
      id,
      '/credits',
      '?api_key=',
      theMovieDB.appKey
    );
  },
  urlGalleries: (id) => {
    return theMovieDB.url.details.concat(
      id,
      '/images',
      '?api_key=',
      theMovieDB.appKey
    );
  },
  getMovies: async (url) => {
    if (!url) return;
    return await axios
      .get(url)
      .then((res) => {
        //filters
        if (
          (res.status === 200 && res.statusText === 'OK') ||
          res.statusText === ''
        ) {
          return res.data;
        }
      })
      .then((data) => {
        return data;
      });
  },
};
