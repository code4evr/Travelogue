import Layout from '../components/Layout';
import SignupComponent from '../components/auth/SignUpComponent';
import Link from 'next/link';

const Signup = () => {
  return (
    <Layout>
      <div className="container-margin-top">
        <div className="col-md-4 offset-md-4">
          <h1 className="text-center pt-4 pb-4">
            Create Your Account
          </h1>
          <SignupComponent />
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
