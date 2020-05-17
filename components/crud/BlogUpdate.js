import { useState, useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { isAuth, getCookie } from '../../actions/auth';
import { getCategories } from '../../actions/authCategory';
import { getTags } from '../../actions/authTag';
import { singleBlog, updateBlog } from '../../actions/blogAuth';
import { quillModules, quillFormats } from '../../utils/quill';
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
});
import '../../node_modules/react-quill/dist/quill.snow.css';
import '../../style/style.css';

const BlogUpdate = router => {
  const [body, setBody] = useState('');
  const [values, setValues] = useState({
    title: '',
    error: '',
    success: '',
    formData: '',
  });
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const [checkedCat, setCheckedCat] = useState([]);
  const [checkedTags, setCheckedTags] = useState([]);

  const { title, error, success, formData } = values;

  const token = getCookie('token');

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initBlog();
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

  const initBlog = () => {
    if (router.router.query.slug) {
      singleBlog(router.router.query.slug).then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          setValues({ ...values, title: data.title });
          setBody(data.body);
          setCategoryArray(data.categories);
          setTagArray(data.tags);
        }
      });
    }
  };

  const setCategoryArray = blogCategories => {
    let ca = [];
    blogCategories.map((c, i) => {
      ca.push(c._id);
    });
    setCheckedCat(ca);
  };

  const setTagArray = blogTags => {
    let ta = [];
    blogTags.map((t, i) => {
      ta.push(t._id);
    });
    setCheckedTags(ta);
  };

  const findCheckedCategories = c => {
    const result = checkedCat.indexOf(c);
    if (result !== -1) {
      return true;
    } else {
      return false;
    }
  };

  const findCheckedTags = t => {
    const result = checkedTags.indexOf(t);
    if (result !== -1) {
      return true;
    } else {
      return false;
    }
  };

  const handleChange = name => e => {
    //console.log(e.target.body);
    const value =
      name === 'photo' ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, formData, error: '' });
  };

  const handleBody = e => {
    setBody(e);
    formData.set('body', e);
  };

  const BlogUpdated = e => {
    e.preventDefault();
    updateBlog(formData, token, router.router.query.slug).then(
      data => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            title: '',
            success: `blog titled "${data.title}" is updated`,
          });
          if (isAuth() && isAuth().role === 1) {
            Router.replace(`/admin/crud/${router.router.query.slug}`);
          } else if (isAuth() && isAuth().role === 0) {
            Router.replace(`/user`);
          }
        }
      },
    );
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
            checked={findCheckedCategories(c._id)}
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
            checked={findCheckedTags(t._id)}
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

  const blogUpdateForm = () => {
    return (
      <form onSubmit={BlogUpdated}>
        <div className="form-group">
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
            Update
          </button>
        </div>
      </form>
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

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8">
          <div className="pt-2">
            {showSuccess()}
            {showError()}
          </div>
          {blogUpdateForm()}
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

export default withRouter(BlogUpdate);
