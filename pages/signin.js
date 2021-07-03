import Layout from '../components/Layout';
import { withRouter } from 'next/router';
import SigninComponent from '../components/auth/SigninComponent';

const Signin = ({ router }) => {
  const showTokenExpiredMessage = () => {
    if (router.query.message) {
      return (
        <div className="alert alert-danger">
          {router.query.message}
        </div>
      );
    } else {
      return;
    }
  };

  return (
    <Layout>
      <div className="container-margin-top">
        <div className="col-md-4 offset-md-4">
          <h3 className="text-center pt-4 pb-4">
            Log in to your account
          </h3>
          {showTokenExpiredMessage()}
          <SigninComponent />
        </div>
      </div>
    </Layout>
  );
};

export default withRouter(Signin);
