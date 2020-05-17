import { useState, useEffect } from 'react';
import { signin, authenticate, isAuth } from '../../actions/auth';
import Router from 'next/router';
import '../../style/style.css';
import Link from 'next/link';
import LoginGoogle from '../../components/auth/GoogleLogin';

const LoginComponent = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    //confirmPass: '',
    error: '',
    loading: false,
    message: '',
    showForm: true,
    classNameEmail: '',
    classNamePassword: '',
  });

  const {
    email,
    password,
    error,
    loading,
    message,
    showForm,
    classNameEmail,
    classNamePassword,
  } = values;

  const handleSubmit = e => {
    e.preventDefault();
    //console.table({name, email, password, confirmPass, error, loading, message, showForm})
    setValues({ ...values, loading: true, error: false });
    const user = { email, password };
    signin(user).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        // authenticate user
        authenticate(data, () => {
          if (isAuth() && isAuth().role === 1) {
            Router.push(`/admin`);
          } else {
            Router.push(`/user`);
          }
        });
      }
    });
  };

  // redirecting user if logged in
  useEffect(() => {
    isAuth() && Router.push(`/`);
  }, []);

  const handleChange = name => e => {
    setValues({
      ...values,
      error: false,
      [name]: e.target.value,
    });
  };

  const handleFocus = e => {
    if (e.target.name === 'email') {
      //console.log('input focus email');
      setValues({ ...values, classNameEmail: 'focused-email' });
    } else if (e.target.name === 'password') {
      //console.log('input focus password');
      setValues({ ...values, classNamePassword: 'focused' });
    }
  };

  const handleBlur = e => {
    if (e.target.value) {
      if (e.target.name === 'email') {
        setValues({ ...values, classNameEmail: 'focused-email' });
      } else if (e.target.name === 'password') {
        setValues({ ...values, classNamePassword: 'focused' });
      }
    } else if (!e.target.value) {
      if (e.target.name === 'email') {
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

  const loginForm = () => {
    return (
      <div className="container container_box">
        <form onSubmit={handleSubmit}>
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
                id="password"
                className="form-control"
              />
            </div>
          </div>
          <button className="btn btn-primary btn-block mt-4 p-2">
            Login
          </button>
          <div className="d-flex flex-row justify-content-between mt-2">
            <Link href="/forgot_password">
              <a>Forgot Password?</a>
            </Link>
            <Link href="/signup">
              <a>Register</a>
            </Link>
          </div>
          <div>
            <LoginGoogle />
          </div>
        </form>
      </div>
    );
  };
  return (
    <React.Fragment>
      {showLoading()}
      {showError()}
      {showMessage()}
      {showForm && loginForm()}
    </React.Fragment>
  );
};

export default LoginComponent;
