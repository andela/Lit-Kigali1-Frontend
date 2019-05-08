import store from '../redux/store';

const { API_URL } = process.env;

const { token = localStorage.getItem('token') } = store.getState().user;
const defaultOptions = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
    Authorization: `${token}`,
  },
};

const fetchAPI = (endpoint, config) => new Promise((resolve, reject) => {
  const options = {
    ...defaultOptions,
    ...config,
  };
  if (options.body) {
    options.body = JSON.stringify(options.body);
  }

  fetch(`${API_URL}${endpoint}`, options)
    .then(res => res.json() || {})
    .then((res) => {
      if (res.status === 200 || res.status === 201 || res.status === 304) {
        return resolve(res);
      }
      return reject(res);
    })
    .catch(err => reject(err));
});

export default fetchAPI;
