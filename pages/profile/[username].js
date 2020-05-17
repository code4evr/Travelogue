import Head from 'next/head';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { userPublicProfile } from '../../actions/userAuth';
import { API, DOMAIN, APP_NAME } from '../../config';
import '../../style/style.css';
import moment from 'moment';

const userProfile = ({ user, blogs, query }) => {
  const head = () => (
    <Head>
      <title>
        {user.name} | {APP_NAME}
      </title>
      <meta
        name="description"
        content="Travelling blogs and experiences of the travel bloggers"
      />
      <link
        rel="canonical"
        href={`${DOMAIN}/profile/${query.username}`}
      />
      <meta
        property="og:title"
        content={`Latest travel blogs | ${APP_NAME}`}
      />
      <meta
        property="og:description"
        content="Travel blogs and experiences of some the best travel bloggers in the world"
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={`${DOMAIN}/profile/${query.username}`}
      />
      <meta property="og:site_name" content={`${APP_NAME}`} />
      <meta
        property="og:image"
        content={`${DOMAIN}/img/travelblog.jpg`}
      />
      <meta
        property="og:image:secure_url"
        content={`${DOMAIN}/img/travelblog.jpg`}
      />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="fb:app_id" content={`${APP_NAME}`} />
    </Head>
  );

  const showUserBlogs = () =>
    blogs.map((blog, i) => (
      <div key={i} className="mt-4 mb-4">
        <Link href={`/blogs/${blog.slug}`}>
          <a className="lead">{blog.title}</a>
        </Link>
      </div>
    ));

  return (
    <React.Fragment>
      {head()}
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="card mt-2">
                <div className="card-body">
                  <h5>{user.name}</h5>
                  {/* <Link>
                    <a>View Profile</a>
                  </Link> */}
                  <p className="text-muted">
                    Joined {moment(user.createdAt).fromNow()}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="container pb-5">
            <div className="row">
              <div className="col-md-6 pl-1 pr-1">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title bg-primary pt-4 pr-4 pb-4 pl-4 text-white rounded-top">
                      Recent blogs
                    </h5>
                    {showUserBlogs()}
                  </div>
                </div>
              </div>
              <div className="col-md-6 pl-1 pr-1">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title bg-primary pt-4 pr-4 pb-4 pl-4 text-white rounded-top">
                      Contact {user.name}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </React.Fragment>
  );
};

userProfile.getInitialProps = ({ query }) => {
  return userPublicProfile(query.username).then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { user: data.user, blogs: data.blogs, query };
    }
  });
};

export default userProfile;
