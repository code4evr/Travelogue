import Head from 'next/head';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { singleBlog, listRelatedBlogs } from '../../actions/blogAuth';
import { API, DOMAIN, APP_NAME } from '../../config';
import '../../style/style.css';
import renderHTML from 'react-render-html';
import moment from 'moment';
import CardRelated from '../../components/blogCard/CardRelated';
import DisqusThread from '../../components/DisqusThread';

const SingleBlog = ({ blog }) => {
  const head = () => (
    <Head>
      <title>
        {blog.title} | {APP_NAME}
      </title>
      <meta
        name="description"
        content="Travelling blogs and experiences of the travel bloggers"
      />
      <link rel="canonical" href={`${DOMAIN}/blogs/${blog.title}`} />
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
        content={`${DOMAIN}/blogs/${blog.title}`}
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

  const [related, setRelated] = useState([]);

  const loadRelated = () => {
    listRelatedBlogs({ blog }).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setRelated(data);
      }
    });
  };

  useEffect(() => {
    loadRelated();
  }, []);

  const showBlogCategories = () => {
    return blog.categories.map((c, i) => (
      <Link key={i} href={`/categories/${c.slug}`}>
        <a className="btn btn-outline-primary mr-1 ml-1 mt-3">
          {c.name}
        </a>
      </Link>
    ));
  };

  const showBlogTags = () => {
    return blog.tags.map((t, i) => (
      <Link key={i} href={`/tags/${t.slug}`}>
        <a className="btn btn-outline-primary mr-1 ml-1 mt-3">
          {t.name}
        </a>
      </Link>
    ));
  };

  const showRelatedBlogs = () => {
    return related.map((b, i) => (
      <div className="col-md-4" key={i}>
        <article>
          <CardRelated blog={b} />
        </article>
      </div>
    ));
  };

  const wordToMinute = () => {
    let words = [];
    let time;
    words = blog.body.split(' ');
    time = words.length / 130;
    return Math.ceil(time);
  };

  const showComments = () => {
    return (
      <div>
        <DisqusThread
          id={blog._id}
          title={blog.slug}
          path={`/blogs/${blog.slug}`}
        />
      </div>
    );
  };

  return (
    <React.Fragment>
      {head()}
      <Layout>
        <main>
          <article>
            <div className="container-fluid container-margin-top">
              <section>
                <div className="row" style={{ marginTop: '10px' }}>
                  <img
                    src={`${API}/blogs/photo/${blog.slug}`}
                    alt="blog.title"
                    className="img img-fluid featured-image sb-img"
                  />
                </div>
              </section>
              <div className="container">
                <h1 className="display-3 text-center pb-3 pt-3 font-weight-bold">
                  {blog.title}
                </h1>
                <section>
                  <p className="lead mt-3 mark">
                    Written by{' '}
                    <Link href={`/profile/${blog.postedBy.username}`}>
                      <a>{blog.postedBy.username}</a>
                    </Link>{' '}
                    | Published {moment(blog.updatedAt).fromNow()}
                  </p>
                  <p className="lead mt-3 mark">
                    {wordToMinute()} min read
                  </p>
                  <div>
                    {showBlogCategories()}
                    {showBlogTags()}
                    <br />
                    <br />
                  </div>
                </section>
              </div>
            </div>
            <div className="container sb-container">
              <section>
                <div className="col-md-12 pt-4">
                  {renderHTML(blog.body)}
                </div>
              </section>
            </div>
            <div className="container sb-container pb-5">
              <p className="text-center pt-5 h2">Related Blogs</p>
              <hr />
              <div className="row">{showRelatedBlogs()}</div>
            </div>
            <div className="container">{showComments()}</div>
          </article>
        </main>
      </Layout>
    </React.Fragment>
  );
};

SingleBlog.getInitialProps = ({ query }) => {
  return singleBlog(query.slug).then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { blog: data };
    }
  });
};

export default SingleBlog;
