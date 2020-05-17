import { useState, useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { isAuth, getCookie } from '../../actions/auth';
import { listBlogs, removeBlog } from '../../actions/blogAuth';
import moment from 'moment';
import '../../style/style.css';

const BlogRead = ({ username }) => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState('');

  const token = getCookie('token');

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = () => {
    listBlogs(username).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setBlogs(data);
      }
    });
  };

  const deleteBlog = slug => {
    removeBlog(slug, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setMessage(data.message);
        loadBlogs();
      }
    });
  };

  const deleteConfirm = slug => {
    let answer = window.confirm('Are you want to delete this blog');
    if (answer) {
      deleteBlog(slug);
    }
  };

  const showUpdateButton = blog => {
    if (isAuth() && isAuth().role === 0) {
      return (
        <Link href={`/user/${blog.slug}`}>
          <a>
            <button className="btn btn-warning">Update</button>
          </a>
        </Link>
      );
    } else if (isAuth() && isAuth().role === 1) {
      return (
        <Link href={`/admin/crud/${blog.slug}`}>
          <a>
            <button className="btn btn-warning">Update</button>
          </a>
        </Link>
      );
    }
  };

  const showAllBlogs = () => {
    return blogs.map((blog, i) => (
      <div className="mt-5" key={i}>
        <h3>{blog.title}</h3>
        <p className="mark">
          Written by {blog.postedBy.name} | Published on{' '}
          {moment(blog.updatedAt).fromNow()}
        </p>
        <button
          className="btn btn-danger"
          onClick={() => deleteConfirm(blog.slug)}
          style={{ marginRight: '10px' }}
        >
          Delete
        </button>
        {showUpdateButton(blog)}
      </div>
    ));
  };

  return (
    <React.Fragment>
      <div className="row">
        {message && (
          <div className="alert alert-warning">{message}</div>
        )}
        <div className="col-md-12">{showAllBlogs()}</div>
      </div>
    </React.Fragment>
  );
};

export default BlogRead;
