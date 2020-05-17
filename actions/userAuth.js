import fetch from 'isomorphic-fetch';
import { API } from '../config';
import queryString from 'query-string';
import { handleResponse } from '../actions/auth';

export const userPublicProfile = username => {
  return fetch(`${API}/user/${username}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })
    .then(res => {
      handleResponse(res);
      return res.json();
    })
    .catch(err => console.log(err));
};

export const getProfile = token => {
  return fetch(`${API}/user/profile`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => {
      return res.json();
    })
    .catch(err => console.log(err));
};

export const update = (token, user) => {
  return fetch(`${API}/user/update_profile`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: user,
  })
    .then(res => {
      handleResponse(res);
      return res.json();
    })
    .catch(err => console.log(err));
};
