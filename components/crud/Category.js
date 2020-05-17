import { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { isAuth, getCookie } from '../../actions/auth';
import {
  create,
  getCategories,
  getSingleCategory,
  removeCategory,
} from '../../actions/authCategory';

const Category = () => {
  const [values, setValues] = useState({
    name: '',
    error: false,
    success: false,
    categories: [],
    removed: false,
    reload: false,
  });

  const {
    name,
    error,
    success,
    categories,
    removed,
    reload,
  } = values;
  const token = getCookie('token');

  const loadCategories = () => {
    getCategories().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({ ...values, categories: data });
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, [reload]);

  const showCategories = () => {
    return categories.map((c, i) => (
      <button
        onDoubleClick={() => deleteConfirm(c.slug)}
        title="Double click to delete"
        key={i}
        className="btn btn-outline-primary mr-1 ml-1 mt-3"
      >
        {c.name}
      </button>
    ));
  };

  const deleteConfirm = slug => {
    let answer = window.confirm(
      'Are you sure you want to delete this category',
    );
    if (answer) {
      deleteCategory(slug);
    }
  };

  const deleteCategory = slug => {
    removeCategory(slug, token).then(data => {
      if (data.error) {
        console.log(error);
      } else {
        setValues({
          ...values,
          error: false,
          success: false,
          name: '',
          removed: !removed,
          reload: !reload,
        });
      }
    });
  };

  const clickSubmit = e => {
    e.preventDefault();
    console.log(`category name is ${name}`);
    create({ name }, token).then(data => {
      console.log(res.body.error);
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({
          ...values,
          error: false,
          success: false,
          name: '',
          removed: !removed,
          reload: !reload,
        });
      }
    });
  };

  const handleChange = e => {
    setValues({
      ...values,
      name: e.target.value,
      error: false,
      success: false,
      removed: '',
    });
  };

  const showSuccess = () => {
    if (success) {
      return <p className="alert alert-success">Tag Created</p>;
    }
  };

  const resetAlert = e => {
    setValues({ ...values, error: false, success: false });
  };

  const categoryForm = () => {
    return (
      <form onSubmit={clickSubmit}>
        <div className="form-group">
          <label className="text-muted">Category Name</label>
          <input
            type="text"
            className="form-control"
            onChange={handleChange}
            value={name}
            required
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary">
            Create
          </button>
        </div>
      </form>
    );
  };
  return (
    <React.Fragment>
      {showSuccess()}
      <div onMouseMove={resetAlert}>
        {categoryForm()}
        {showCategories()}
      </div>
    </React.Fragment>
  );
};

export default Category;
