import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import CategoryComponent from '../../../components/crud/Category';
import TagComponent from '../../../components/crud/Tag';
import Link from 'next/link';
import '../../../style/style.css';

const CategoryTag = () => {
  return (
    <React.Fragment>
      <Layout>
        <Admin>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12 pt-5 pb-5">
                <h2>Manage Category and Tags</h2>
              </div>
              <div className="col-md-6">
                <CategoryComponent />
              </div>
              <div className="col-md-6">
                <TagComponent />
              </div>
            </div>
          </div>
        </Admin>
      </Layout>
    </React.Fragment>
  );
};

export default CategoryTag;
