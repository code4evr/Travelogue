import { useState, useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { isAuth, getCookie } from '../../actions/auth';
import { getCategories } from '../../actions/authCategory';
import { getTags } from '../../actions/authTag';
import { createBlog } from '../../actions/blogAuth';
import { quillModules, quillFormats } from '../../utils/quill';
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
});
import '../../node_modules/react-quill/dist/quill.snow.css';
import '../../style/style.css';

const CreateBlog = ({ router }) => {
  const blogFormLS = () => {
    if (typeof window === 'undefined') {
      return false;
    }

    if (localStorage.getItem('blog')) {
      return JSON.parse(localStorage.getItem('blog'));
    } else {
      return false;
    }
  };

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const [checkedCat, setCheckedCat] = useState([]);
  const [checkedTags, setCheckedTags] = useState([]);

  const [body, setBody] = useState(blogFormLS());

  const [values, setValues] = useState({
    error: '',
    sizeError: '',
    success: '',
    formData: '',
    title: '',
    hidePublishButton: false,
  });

  const {
    error,
    sizeError,
    success,
    formData,
    title,
    hidePublishButton,
  } = values;

  const token = getCookie('token');

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initCategories();
    initTags();
  }, [router]);

  const initCategories = () => {
    getCategories().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setCategories(data);
      }
    });
  };

  const initTags = () => {
    getTags().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setTags(data);
      }
    });
  };

  const publishBlog = e => {
    e.preventDefault();
    createBlog(formData, token).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
        console.log(data.error);
      } else {
        setValues({
          ...values,
          title: '',
          error: '',
          success: `A new blog titled ${data.title} created`,
        });
        setBody('');
        setCategories([]);
        setTags([]);
      }
    });
  };

  const handleChange = name => e => {
    //console.log(e.target.body);
    const value =
      name === 'photo' ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, formData, error: '' });
  };

  const handleBody = e => {
    //console.log(e);
    setBody(e);
    formData.set('body', e);
    if (typeof window !== 'undefined') {
      localStorage.setItem('blog', JSON.stringify(e));
    }
  };

  const handleCategoryToggle = c => () => {
    setValues({ ...values, error: '' });
    const clickedCategory = checkedCat.indexOf(c);
    const allChecked = [...checkedCat];
    if (clickedCategory === -1) {
      allChecked.push(c);
    } else {
      allChecked.splice(clickedCategory, 1);
    }
    console.log(allChecked);
    setCheckedCat(allChecked);
    formData.set('categories', allChecked);
  };

  const handleTagToggle = t => () => {
    setValues({ ...values, error: '' });
    const clickedTag = checkedTags.indexOf(t);
    const allChecked = [...checkedTags];
    if (clickedTag === -1) {
      allChecked.push(t);
    } else {
      allChecked.splice(clickedTag, 1);
    }
    console.log(allChecked);
    setCheckedTags(allChecked);
    formData.set('tags', allChecked);
  };

  const showCategories = () => {
    return (
      categories &&
      categories.map((c, i) => (
        <li key={i} className="list-unstyled">
          <input
            onChange={handleCategoryToggle(c._id)}
            type="checkbox"
            name="check"
            id="check"
            className="mr-2"
          />
          <label className="form-check-label label-style">
            {c.name}
          </label>
        </li>
      ))
    );
  };

  const showTags = () => {
    return (
      tags &&
      tags.map((t, i) => (
        <li key={i} className="list-unstyled">
          <input
            onChange={handleTagToggle(t._id)}
            type="checkbox"
            name="check"
            id="check"
            className="mr-2"
          />
          <label className="form-check-label label-style">
            {t.name}
          </label>
        </li>
      ))
    );
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-success"
      style={{ display: success ? '' : 'none' }}
    >
      {success}
    </div>
  );

  const blogForm = () => {
    return (
      <form onSubmit={publishBlog}>
        <div className="form-group">
          {/* <label htmlFor="">Title</label> */}
          <input
            type="text"
            className="form-control"
            name="title"
            id="title"
            onChange={handleChange('title')}
            value={title}
            placeholder="Title..."
          />
        </div>
        <div className="form-group">
          <ReactQuill
            modules={quillModules}
            formats={quillFormats}
            value={body}
            placeholder="Start typing"
            onChange={handleBody}
          />
        </div>
        <div className="float-right">
          <button type="submit" className="btn btn-primary">
            Post
          </button>
        </div>
      </form>
    );
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8">
          <div className="pt-2">
            {showError()}
            {showSuccess()}
          </div>
          <div>{blogForm()}</div>
        </div>
        <div className="col-md 4 box">
          <br />
          <div>
            <div className="form-group pb-2">
              <h5>Featured image</h5>
              <hr />

              <div>
                <small className="text-muted">Max size: 1MB</small>
              </div>
              <label className="btn btn-outline-info">
                Upload featured image
                <input
                  onChange={handleChange('photo')}
                  type="file"
                  accept="image/*"
                  hidden
                />
              </label>
            </div>
          </div>
          <h5>Categories</h5>
          <hr />
          <ul className="list-scroll">{showCategories()}</ul>
          <h5>Tags</h5>
          <hr />
          <ul className="list-scroll">{showTags()}</ul>
          <br />
        </div>
      </div>
    </div>
  );
};

export default withRouter(CreateBlog);
