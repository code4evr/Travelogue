import Head from 'next/head';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { useState } from 'react';
import { listAllBlogsCategoriesAndTags } from '../../actions/blogAuth';
import Card from '../../components/blogCard/Card';
import { API, DOMAIN, APP_NAME } from '../../config';

const Blogs = ({
  blogs,
  categories,
  tags,
  totalBlogs,
  blogLimit,
  blogSkip,
  router,
}) => {
  const head = () => (
    <Head>
      <title>Travelling Blogs | {APP_NAME}</title>
      <meta
        name="description"
        content="Travelling blogs and experiences of the travel bloggers"
      />
      <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
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
        content={`${DOMAIN}${router.pathname}`}
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

  console.log(categories);

  const [limit, setLimit] = useState(blogLimit);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(totalBlogs);
  const [loadedBlogs, setLoadedBlogs] = useState([]);

  const showAllCategories = () => {
    return categories.map((c, i) => (
      <Link href={`/categories/${c.slug}`} key={i}>
        <a>
          <button className="btn btn-primary mr-2 mb-2">
            {c.name}
          </button>
        </a>
      </Link>
    ));
  };

  const showAllTags = () => {
    return tags.map((t, i) => (
      <Link href={`/tags/${t.slug}`} key={i}>
        <a>
          <button className="btn btn-outline-primary mr-2 mb-2">
            {t.name}
          </button>
        </a>
      </Link>
    ));
  };

  const loadMore = () => {
    let toSkip = skip + limit;
    listAllBlogsCategoriesAndTags(toSkip, limit).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setLoadedBlogs([...loadedBlogs, ...data.blogs]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button
          onClick={loadMore}
          className="btn btn-outline-primary btn-lg"
        >
          Load more
        </button>
      )
    );
  };

  const showAllBlogs = () => {
    return blogs.map((blog, i) => (
      <article key={i}>
        <Card blog={blog} />
      </article>
    ));
  };

  const showLoadedBlogs = () =>
    loadedBlogs.map((blog, i) => (
      <article key={i}>
        <Card blog={blog} />
      </article>
    ));

  return (
    <React.Fragment>
      {head()}
      <Layout>
        <main>
          <div
            className="container-fluid container-margin"
            style={{ marginTop: '6rem', marginBottom: '3rem' }}
          >
            <div className="col-md-12">
              <header>
                <section>
                  {showAllCategories()}
                  {showAllTags()}
                </section>
              </header>
            </div>
          </div>
          <div className="container-fluid">
            <div className="container-fluid">{showAllBlogs()}</div>
            <div className="container-fluid">{showLoadedBlogs()}</div>
            <div className="text-center pt-5 pb-5">
              {loadMoreButton()}
            </div>
          </div>
        </main>
      </Layout>
    </React.Fragment>
  );
};

Blogs.getInitialProps = () => {
  let skip = 0;
  let limit = 2;
  return listAllBlogsCategoriesAndTags(skip, limit).then(data => {
    if (data.error) {
      console.log(data);
    } else {
      return {
        blogs: data.blogs,
        check: data,
        categories: data.categories,
        tags: data.tags,
        totalBlogs: data.size,
        blogLimit: limit,
        blogSkip: skip,
      };
    }
  });
};
export default withRouter(Blogs);
