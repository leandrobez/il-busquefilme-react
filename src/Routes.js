import React, { Component } from 'react';

import { Route } from 'react-router-dom';

import Home from './components/pages/Home';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Genres from './components/pages/Genres';
import Choices from './components/pages/Choices';
import Agreement from './components/pages/Agreement';
import TheBests from './components/pages/TheBests';
import Details from './components/pages/Details';
import Spotify from './components/pages/Spotify';
import Callback from './components/pages/Callback';
import SearchResult from './components/pages/SearchResult';
import Login from './components/pages/Login';
import Plans from './components/pages/Plans';
import Error from './components/pages/Error';

//ADMIN
import HomeAdmin from './components/admin/HomeAdmin';
import SliderAdmin from './components/admin/SliderAdmin';

const routes = [
  {
    path: '/',
    exact: true,
    page: Home,
  },
  {
    path: '/about',
    exact: true,
    page: About,
  },
  {
    path: '/contact',
    exact: true,
    page: Contact,
  },
  {
    path: '/login',
    exact: true,
    page: Login,
  },
  {
    path: '/result',
    exact: true,
    page: SearchResult,
  },
  {
    path: '/genres/:id',
    exact: true,
    page: Genres,
  },
  {
    path: '/choices',
    exact: true,
    page: Choices,
  },
  {
    path: '/thebests',
    exact: true,
    page: TheBests,
  },
  {
    path: '/agreement/:plan',
    exact: true,
    page: Agreement,
  },
  {
    path: '/plans',
    exact: true,
    page: Plans,
  },
  {
    path: '/:id/:name/details',
    exact: true,
    page: Details,
  },
  {
    path: '/spotify/:id/:movie',
    exact: true,
    page: Spotify,
  },
  {
    path: '/spotify/callback',
    exact: true,
    page: Callback,
  },
  {
    path: '/admin/home',
    exact: true,
    page: HomeAdmin,
  },
  {
    path: '/admin/slider',
    exact: true,
    page: SliderAdmin,
  },
  {
    path: '/*',
    exact: false,
    page: Error,
  },
];

class Routes extends Component {
  isExact = (flag) => {
    if (flag) {
      return true;
    }
    return false;
  };
  render() {
    const routeList = routes.map((route, index) => (
      <Route
        key={route.page + '-' + index}
        path={route.path}
        exact={route.exact}
        component={route.page}
      />
    ));
    return routeList;
  }
}

export default Routes;
