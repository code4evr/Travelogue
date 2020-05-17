import fetch from 'isomorphic-fetch';
import { API } from '../config';
import queryString from 'query-string';
import { isAuth, handleResponse } from '../actions/auth';

export const createBlog = (blog, token) => {
  let authRole;
  if (isAuth() && isAuth().role === 0) {
    authRole = `${API}/user/blog`;
  } else if (isAuth() && isAuth().role === 1) {
    authRole = `${API}/blog`;
  }
  return fetch(`${authRole}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: blog,
  })
    .then(res => {
      return res.json();
    })
    .catch(err => console.log(err));
};

export const listAllBlogsCategoriesAndTags = (skip, limit) => {
  let data = {
    limit,
    skip,
  };
  return fetch(`${API}/blogs-categories-tags`, {
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

export const singleBlog = slug => {
  return fetch(`${API}/blog/${slug}`, {
    method: 'GET',
  })
    .then(res => {
      return res.json();
    })
    .catch(err => console.log(err));
};

export const listRelatedBlogs = blog => {
  return fetch(`${API}/blog/related`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(blog),
  })
    .then(res => {
      return res.json();
    })
    .catch(err => console.log(err));
};

export const listBlogs = username => {
  let authListBlog;
  if (username) {
    authListBlog = `${API}/${username}/blogs`;
  } else {
    authListBlog = `${API}/blogs`;
  }
  return fetch(`${authListBlog}`, {
    method: 'GET',
  })
    .then(res => {
      return res.json();
    })
    .catch(err => console.log(err));
};

export const removeBlog = (slug, token) => {
  let authRemoveBlog;
  if (isAuth() && isAuth().role === 0) {
    authRemoveBlog = `${API}/user/blog/${slug}`;
  } else if (isAuth() && isAuth().role === 1) {
    authRemoveBlog = `${API}/blog/${slug}`;
  }

  return fetch(`${authRemoveBlog}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => {
      handleResponse(res);
      return res.json();
    })
    .catch(err => console.log(err));
};

export const updateBlog = (blog, token, slug) => {
  let authUpdateBlog;
  if (isAuth() && isAuth().role === 0) {
    authUpdateBlog = `${API}/user/blog/${slug}`;
  } else if (isAuth() && isAuth().role === 1) {
    authUpdateBlog = `${API}/blog/${slug}`;
  }

  return fetch(`${authUpdateBlog}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: blog,
  })
    .then(res => {
      handleResponse(res);
      return res.json();
    })
    .catch(err => console.log(err));
};

export const listSearch = params => {
  const query = queryString.stringify(params);
  return fetch(`${API}/blogs/search?${query}`, {
    method: 'GET',
  })
    .then(res => {
      return res.json();
    })
    .catch(err => console.log(err));
};
