import axios from 'axios';

import { getToken } from './auth';

export const apiUrl = '/busquefilme/api/';

export const countID = process.env.REACT_APP_GN_ACCOUNT_ID;

export const getPayToken = () => {
  let s = document.createElement('script');
  s.type = 'text/javascript';
  let v = parseInt(Math.random() * 1000000);
  s.src = 'https://sandbox.gerencianet.com.br/v1/cdn/' + countID + '/' + v;
  s.async = false;
  s.id = countID;
  if (!document.getElementById(countID)) {
    document.getElementsByTagName('head')[0].appendChild(s);
  }
  let gn = {
    validForm: true,
    processed: false,
    done: {},
    ready: function(fn) {
      gn.done = fn;
    }
  };
  return gn;
};

const api = axios.create({
  baseURL: 'http://localhost:' + process.env.REACT_APP_HOST_PORT
});

api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;

/**<script type='text/javascript'>var s=document.createElement('script');s.type='text/javascript';var v=parseInt(Math.random()*1000000);s.src='https://sandbox.gerencianet.com.br/v1/cdn/b73a1b070c537a1010c3cca1d6df7092/'+v;s.async=false;s.id='b73a1b070c537a1010c3cca1d6df7092';if(!document.getElementById('b73a1b070c537a1010c3cca1d6df7092')){document.getElementsByTagName('head')[0].appendChild(s);};$gn={validForm:true,processed:false,done:{},ready:function(fn){$gn.done=fn;}};</script> */

/**<script type='text/javascript'>var s=document.createElement('script');s.type='text/javascript';var v=parseInt(Math.random()*1000000);s.src='https://api.gerencianet.com.br/v1/cdn/b73a1b070c537a1010c3cca1d6df7092/'+v;s.async=false;s.id='b73a1b070c537a1010c3cca1d6df7092';if(!document.getElementById('b73a1b070c537a1010c3cca1d6df7092')){document.getElementsByTagName('head')[0].appendChild(s);};$gn={validForm:true,processed:false,done:{},ready:function(fn){$gn.done=fn;}};</script> */
