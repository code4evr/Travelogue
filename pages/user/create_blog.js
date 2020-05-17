import Layout from '../../components/Layout';
import Private from '../../components/auth/Private';
import Blog from '../../components/crud/CreateBlog';
import Link from 'next/link';
import '../../style/style.css';

const CreateBlog = () => {
  return (
    <Layout>
      <Private>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-3 pb-5"></div>
            <div className="col-md-12">
              <Blog />
            </div>
          </div>
        </div>
      </Private>
    </Layout>
  );
};

export default CreateBlog;
