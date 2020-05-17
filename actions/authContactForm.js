import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const contactForm = data => {
  let contactFormEndpoint;
  if (data.author) {
    contactFormEndpoint = `${API}/contact-author`;
  } else {
    contactFormEndpoint = `${API}/contact`;
  }
  return fetch(`${contactFormEndpoint}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(res => {
      return res.json();
    })
    .catch(err => console.log(err));
};
