
const urlBase = 'https://api.themoviedb.org/3/';
const config = {
  appKey: process.env.REACT_APP_MOVIEDB_KEY,
  language: 'pt-BR',
  url: {
    find: urlBase + 'find/',
    details: urlBase + 'movie/',
    videos: urlBase + 'movie/',
    castProfile: urlBase + 'person/',
    search: urlBase + 'search/movie',
    genres: urlBase + 'genre/',
    discoverUrl: urlBase + 'discover/movie',
    discover: {
      arguments: {
        popular: '&sort_by=popularity.desc',
        average: '&sort_by=vote_average.desc',
        release: '&primary_release_year='
      },
      sorts: [
        'popularity.asc',
        'popularity.desc',
        'release_date.asc',
        'release_date.desc',
        'revenue.asc',
        'revenue.desc',
        'primary_release_date.asc',
        'primary_release_date.desc',
        'original_title.asc',
        'original_title.desc',
        'vote_average.asc',
        'vote_average.desc',
        'vote_count.asc',
        'vote_count.desc'
      ]
    }
  }
};

export default config;
