import Link from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { API } from '../../config';

const Card = ({ blog }) => {
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

  return (
    <div className="col-md-8 offset-md-2">
      <div className="card pt-3 mb-4 card_shadow">
        <div className="col-md-12">
          <section className="img img-fluid">
            <img
              style={{
                height: '300px',
                width: '100%',
                borderRadius: '5px',
              }}
              src={`${API}/blogs/photo/${blog.slug}`}
              alt={blog.title}
            />
          </section>
        </div>
        <header>
          <Link href={`/blogs/${blog.slug}`}>
            <a style={{ textDecoration: 'none' }}>
              <h2 className="display-4 pt-3 pb-3 pl-3 pr-3 font-weight-bold">
                {blog.title}
              </h2>
            </a>
          </Link>
        </header>
        <section>
          <p className="mark ml-3 mr-3 pt-2 pb-2">
            Written by{' '}
            <Link href={`/profile/${blog.postedBy.username}`}>
              <a>{blog.postedBy.name}</a>
            </Link>{' '}
            | Published {moment(blog.updatedAt).fromNow()}
          </p>
        </section>
        {/* <section>
          {showBlogCategories()}
          {showBlogTags()}
        </section> */}
        <div className="card-body">
          <section>
            <div className="pb-3">
              {renderHTML(blog.excerpt)}
              <Link href={`/blogs/${blog.slug}`}>
                <a>Read more</a>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Card;
