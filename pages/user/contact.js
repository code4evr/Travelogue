import Layout from '../../components/Layout';
import ContactFormComponent from '../../components/contactForm';
import Link from 'next/link';
import { useState } from 'react';

const Contact = () => {
  return (
    <Layout>
      <div className="container-fluid container-margin">
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <h1 className="text-center pt-4 pb-4">Contact Form</h1>
            <hr />
            <ContactFormComponent />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
