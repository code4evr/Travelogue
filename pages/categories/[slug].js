import Head from 'next/head';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { getSingleCategory } from '../../actions/authCategory';
import { API, DOMAIN, APP_NAME } from '../../config';
import '../../style/style.css';
import renderHTML from 'react-render-html';
import moment from 'moment';
import Card from '../../components/blogCard/Card';

const Category = ({ category, blogs }) => {
  return (
    <React.Fragment>
      <Layout>
        <main>
          <div className="container-fluid text-center">
            <header>
              <div className="col-md-12 pt-3">
                <h1 className="display-4 font-weight-bold mb-4">
                  {category.name}
                </h1>
                {blogs.map((b, i) => (
                  <div key={i}>
                    <Card blog={b} />
                    <hr />
                  </div>
                ))}
              </div>
            </header>
          </div>
        </main>
      </Layout>
    </React.Fragment>
  );
};

Category.getInitialProps = ({ query }) => {
  return getSingleCategory(query.slug).then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { category: data.category, blogs: data.blogs };
    }
  });
};

export default Category;
