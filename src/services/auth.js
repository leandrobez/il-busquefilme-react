export const TOKEN_KEY = '@busquefilme-Token';
export const USER_KEY = '@busquefilme-User';
export const END_POINT_LOGIN = 'authenticate/login';
export const END_POINT_REGISTER = 'user/register';

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const storeLogin = token => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const storeProfile = user => {
  const store = window.localStorage,
    stfy = JSON.stringify;
  store.setItem(
    USER_KEY,
    stfy({ id: user.id, name: user.name, email: user.email })
  );
};

export const storeLogout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  isAuthenticated();
};

export const getUserAuthenticated = () => {
  const store = window.localStorage,
    parse = JSON.parse;

  return isAuthenticated() ? parse(store.getItem(USER_KEY)) : null;
};

export const getUser = () => {
  const store = window.localStorage,
    parse = JSON.parse;
  return parse(store.getItem(USER_KEY));
};
