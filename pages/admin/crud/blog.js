import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import Blog from '../../../components/crud/CreateBlog';
import Link from 'next/link';
import '../../../style/style.css';

const NewBlog = () => {
  return (
    <Layout>
      <Admin>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-3 pb-5"></div>
            <div className="col-md-12">
              <Blog />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default NewBlog;
