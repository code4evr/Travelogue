import { useState, useEffect } from 'react';
import { isAuth, getCookie } from '../../actions/auth';
import {
  createTag,
  getTags,
  getSingleTag,
  removeTag,
} from '../../actions/authTag';
import '../../style/style.css';

const TagComponent = () => {
  const [values, setValues] = useState({
    name: '',
    tags: [],
    error: false,
    success: false,
    removed: false,
    reload: false,
  });

  const { name, tags, error, success, removed, reload } = values;

  const token = getCookie('token');

  const loadTags = () => {
    getTags().then(data => {
      console.log(data.error);
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({ ...values, tags: data });
      }
    });
  };

  useEffect(() => {
    loadTags();
  }, [reload]);

  const showTags = () => {
    return tags.map((t, i) => {
      return (
        <button
          onDoubleClick={() => deleteConfirm(t.slug)}
          title="Double click to delete the tag"
          key={i}
          className="btn btn-outline-primary mr-1 ml-1 mt-3"
        >
          {t.name}
        </button>
      );
    });
  };

  const deleteConfirm = slug => {
    const answer = window.confirm(
      'Are you sure you want to delete this tag?',
    );
    if (answer) {
      deleteTag(slug);
    }
  };

  const deleteTag = slug => {
    removeTag(slug, token).then(data => {
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

  const clickSubmit = e => {
    e.preventDefault();
    createTag({ name }, token).then(data => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          success: false,
        });
      } else {
        setValues({
          ...values,
          error: false,
          success: true,
          name: '',
          removed: !removed,
          reload: !reload,
        });
      }
    });
  };

  const showSuccess = () => {
    if (success) {
      return <p className="alert alert-success">Category Created</p>;
    }
  };

  const resetAlert = e => {
    setValues({ ...values, error: false, success: false });
  };

  const TagForm = () => {
    return (
      <form onSubmit={clickSubmit}>
        <div className="form-group">
          <label className="text-muted">Tag Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="alert-container">
          <button type="submit" className="btn btn-primary">
            Create
          </button>
          {showSuccess()}
        </div>
      </form>
    );
  };
  return (
    <React.Fragment>
      <div onMouseMove={resetAlert}>
        {TagForm()}
        {showTags()}
      </div>
    </React.Fragment>
  );
};

export default TagComponent;
