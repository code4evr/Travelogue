import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import {
  getCookie,
  isAuth,
  updateProfileLocal,
} from '../../actions/auth';
import { getProfile, update } from '../../actions/userAuth';
import { updateBlog } from '../../actions/blogAuth';

const ProfileUpdate = () => {
  const [values, setValues] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    about: '',
    error: false,
    success: false,
    loading: false,
    photo: '',
    userData: '',
  });

  const token = getCookie('token');

  const {
    username,
    name,
    email,
    about,
    password,
    error,
    success,
    loading,
    photo,
    userData,
  } = values;

  const init = () => {
    return getProfile(token).then(data => {
      if (data.error) {
        console.log(data.error);
      }
      setValues({
        ...values,
        username: data.username,
        name: data.name,
        email: data.email,
        about: data.about,
      });
    });
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange = name => e => {
    const value =
      name === 'photo' ? e.target.files[0] : e.target.value;
    let userFormData = new FormData();
    userFormData.set(name, value);
    setValues({
      ...values,
      [name]: value,
      userData: userFormData,
      error: false,
      success: false,
    });
  };

  const updateForm = e => {
    e.preventDefault();
    setValues({ ...values, loading: true });
    update(token, userData).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        updateProfileLocal(data, () => {
          setValues({
            ...values,
            name: data.name,
            username: data.username,
            email: data.email,
            about: data.about,
            success: true,
            loading: false,
          });
        });
      }
    });
  };

  const profileUpdateForm = () => {
    return (
      <form onSubmit={updateForm}>
        <div className="form-group mt-5">
          <div className="d-flex flex-column justify-content-center">
            <div className="col-md-6 offset-md-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleChange('photo')}
                className="form-control rounded-circle mb-2"
                style={{ width: '150px', height: '150px' }}
              />
            </div>
            <label className="text-muted text-center">
              Change Profile Photo
            </label>
          </div>
        </div>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            type="text"
            value={name}
            onChange={handleChange('name')}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Username</label>
          <input
            type="text"
            value={username}
            onChange={handleChange('username')}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Email</label>
          <input
            type="email"
            value={email}
            onChange={handleChange('email')}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label className="text-muted">About</label>
          <div>
            <textarea
              cols="36"
              rows="6"
              onChange={handleChange('about')}
              placeholder="Tell about yourself..."
              className="form-control"
              value={about}
            />
          </div>
        </div>
        <button className="btn btn-outline-primary">Save</button>
      </form>
    );
  };

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-4">image</div>
          <div className="col-md-4">{profileUpdateForm()}</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProfileUpdate;
