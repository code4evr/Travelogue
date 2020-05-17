import { useState, useEffect } from 'react';
import { signup, isAuth } from '../../actions/auth';
import Router from 'next/router';

const SignupComponent = () => {
  let mock = 'Bidit Upadhyay';
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    //confirmPass: '',
    error: '',
    loading: false,
    message: '',
    showForm: true,
    classNameName: '',
    classNameEmail: '',
    classNamePassword: '',
    disabled: false,
  });

  const {
    name,
    email,
    password,
    error,
    loading,
    message,
    showForm,
    classNameName,
    classNameEmail,
    classNamePassword,
    disabled,
  } = values;

  const handleSubmit = e => {
    e.preventDefault();
    //console.table({name, email, password, confirmPass, error, loading, message, showForm})
    setValues({
      ...values,
      loading: true,
      error: false,
    });
    const user = {
      name,
      email,
      password,
    };
    signup(user).then(data => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          loading: false,
        });
      } else {
        setValues({
          ...values,
          name: '',
          email: '',
          password: '',
          //confirmPass: '',
          error: '',
          loading: false,
          message: data.message,
          showForm: false,
        });
      }
    });
  };

  // redirecting user if logged in
  useEffect(() => {
    isAuth() && Router.push(`/`);
  }, []);

  const handleChange = name => e => {
    if (e.target.value === mock) {
      console.log(values.name);
      setValues({
        ...values,
        error: false,
        [name]: e.target.value,
        disabled: true,
      });
    } else {
      setValues({
        ...values,
        [name]: e.target.value,
        disabled: false,
      });
    }
  };

  const handleFocus = e => {
    if (e.target.name === 'name') {
      //console.log('input focus password');
      setValues({ ...values, classNameName: 'focused' });
    } else if (e.target.name === 'email') {
      //console.log('input focus email');
      setValues({ ...values, classNameEmail: 'focused' });
    } else if (e.target.name === 'password') {
      //console.log('input focus password');
      setValues({ ...values, classNamePassword: 'focused' });
    }
  };

  const handleBlur = e => {
    if (e.target.value) {
      if (e.target.name === 'name') {
        //console.log('input focus password');
        setValues({ ...values, classNameName: 'focused' });
      } else if (e.target.name === 'email') {
        setValues({ ...values, classNameEmail: 'focused' });
      } else if (e.target.name === 'password') {
        setValues({ ...values, classNamePassword: 'focused' });
      }
    } else if (!e.target.value) {
      if (e.target.name === 'name') {
        setValues({ ...values, classNameName: '' });
      } else if (e.target.name === 'email') {
        setValues({ ...values, classNameEmail: '' });
      } else if (e.target.name === 'password') {
        setValues({ ...values, classNamePassword: '' });
      }
    }
  };

  const showLoading = () =>
    loading ? <div className="alert alert-info">Loading...</div> : '';

  const showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : '';

  const showMessage = () =>
    message ? (
      <div className="alert alert-success">{message}</div>
    ) : (
      ''
    );

  const signupForm = () => {
    return (
      <div className="container container_box signup">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="form-elements">
              <label
                htmlFor="name"
                className={`form-label ${classNameName}`}
              >
                Name
              </label>
              <input
                value={name}
                onChange={handleChange('name')}
                onFocus={handleFocus}
                onBlur={handleBlur}
                type="text"
                name="name"
                id="name"
                className="form-control"
              />
            </div>
          </div>
          <div className="form-group">
            <div className="form-elements">
              <label
                htmlFor="email"
                className={`form-label ${classNameEmail}`}
              >
                Email
              </label>
              <input
                value={email}
                onChange={handleChange('email')}
                onFocus={handleFocus}
                onBlur={handleBlur}
                type="email"
                name="email"
                id="email"
                className="form-control"
                disabled={disabled}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="form-elements">
              <label
                htmlFor="email"
                className={`form-label ${classNamePassword}`}
              >
                Password
              </label>
              <input
                value={password}
                onChange={handleChange('password')}
                onFocus={handleFocus}
                onBlur={handleBlur}
                type="password"
                name="password"
                id="password1"
                className="form-control"
                disabled={disabled}
              />
            </div>
          </div>
          {/* <div className="form-group">
            <div>
              <label htmlFor="confirm_pass">Confirm Password</label>
            </div>
            <div>
              <input value={confirmPass} onChange={handleChange('confirmPass')} type="password" name="passwconfirm_passord" id="password2" className="form-control" />
            </div>
          </div> */}
          <button className="btn btn-primary btn-block">
            Sign Up
          </button>
        </form>
      </div>
    );
  };
  return (
    <React.Fragment>
      {showLoading()}
      {showError()}
      {showMessage()}
      {showForm && signupForm()}
    </React.Fragment>
  );
};

export default SignupComponent;
