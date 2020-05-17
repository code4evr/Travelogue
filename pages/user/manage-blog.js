import Layout from '../../components/Layout';
import Private from '../../components/auth/Private';
import BlogRead from '../../components/crud/BlogRead';
import Link from 'next/link';
import '../../style/style.css';
import { isAuth } from '../../actions/auth';

const ManageBlog = () => {
  let username = isAuth() && isAuth().username;
  return (
    <Layout>
      <Private>
        <div className="container">
          <div className="row">
            <div className="col-md-12 pt-3 pb-5">
              <h1>Manage Blogs</h1>
            </div>
            <div className="col-md-12">
              <BlogRead username={username} />
            </div>
          </div>
        </div>
      </Private>
    </Layout>
  );
};

export default ManageBlog;
