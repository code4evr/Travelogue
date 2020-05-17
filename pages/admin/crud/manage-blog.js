import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import BlogRead from '../../../components/crud/BlogRead';
import Link from 'next/link';
import '../../../style/style.css';

const NewBlog = () => {
  return (
    <Layout>
      <Admin>
        <div className="container">
          <div className="row">
            <div className="col-md-12 pt-3 pb-5">
              <h1>Manage Blogs</h1>
            </div>
            <div className="col-md-12">
              <BlogRead />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default NewBlog;
