import { useState } from 'react';
import Layout from '../components/Layout';
import { resetPassword } from '../actions/auth';
import '../style/style.css';

const ResetPassword = () => {
  const [values, setValues] = useState({
    email: '',
    message: '',
    error: '',
    showForm: true,
  });

  const { email, message, error, showForm } = values;

  const handleChange = name => e => {
    setValues({
      ...values,
      [name]: e.target.value,
      message: '',
      error: '',
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    forgotPassword({ email }).then(data => {
      console.log(JSON.stringify({ email }));
      if (data.error) {
        console.log(data);
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          message: data.message,
          email: '',
          showForm: false,
        });
      }
    });
  };

  const showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : '';

  const showMessage = () =>
    message ? (
      <div className="alert alert-success">{message}</div>
    ) : (
      ''
    );

  const ResetPasswordForm = () => {
    return (
      <div className="container container_box">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label style={{ fontSize: '0.9rem' }}>
              A password reset link will be sent to the following
              email address
            </label>
            <input
              type="email"
              onChange={handleChange('email')}
              className="form-control"
              value={email}
              placeholder="enter registered email"
            />
          </div>
          <button className="btn btn-primary btn-block">
            Send Password Reset Link
          </button>
        </form>
      </div>
    );
  };

  return (
    <Layout>
      <div className="container-margin-top">
        <div className="col-md-4 offset-md-4">
          <h2 className="mb-4 text-center">Reset Password</h2>
          {showError()}
          {showMessage()}
          {showForm && forgotPasswordForm()}
        </div>
      </div>
    </Layout>
  );
};

export default ResetPassword;
