import { useState, useEffect } from 'react';
import Link from 'next/link';
import { contactForm } from '../actions/authContactForm';

const ContactFormComponent = () => {
  const [values, setValues] = useState({
    message: '',
    name: '',
    email: '',
    sent: false,
    success: false,
    error: false,
    buttonText: 'Send Message',
  });

  const {
    message,
    name,
    email,
    sent,
    success,
    error,
    buttonText,
  } = values;

  const clickSubmit = e => {
    e.preventDefault();
    setValues({ ...values, buttonText: 'Sending...' });
    contactForm({ name, email, message }).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: '',
          email: '',
          message: '',
          buttonText: 'Sent',
          success: data.success,
        });
      }
    });
  };

  const handleChange = name => e => {
    setValues({
      ...values,
      [name]: e.target.value,
      error: false,
      success: false,
      buttonText: 'send message',
    });
  };

  const showSuccess = () =>
    success && (
      <div className="alert alert-info">
        Thank you for contacting us
      </div>
    );

  const showError = () => (
    <div
      className="alert alert-warning"
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  );

  const formContact = () => {
    return (
      <form onSubmit={clickSubmit}>
        <div className="form-group">
          <label className="lead">Name</label>
          <input
            type="text"
            className="form-control"
            onChange={handleChange('name')}
            value={name}
          />
        </div>
        <div className="form-group">
          <label className="lead">Email</label>
          <input
            type="email"
            className="form-control"
            onChange={handleChange('email')}
            value={email}
          />
        </div>
        <div className="form-group">
          <label className="lead">Message</label>
          <textarea
            onChange={handleChange('message')}
            type="text"
            className="form-control"
            value={message}
            rows="6"
            required
          />
        </div>
        <button className="btn btn-outline-primary btn-block">
          {buttonText}
        </button>
      </form>
    );
  };

  return (
    <React.Fragment>
      <div>
        {showSuccess()}
        {showError()}
        {formContact()}
      </div>
    </React.Fragment>
  );
};

export default ContactFormComponent;
