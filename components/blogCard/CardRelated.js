import Link from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { API } from '../../config';

const CardRelated = ({ blog }) => {
  return (
    <div className="card">
      <section>
        <Link href={`/blogs/${blog.slug}`}>
          <a>
            <img
              style={{ height: '250px', width: '100%' }}
              src={`${API}/blogs/photo/${blog.slug}`}
              alt={blog.title}
            />
          </a>
        </Link>
      </section>

      <div className="card-body">
        <section>
          <Link href={`/blogs/${blog.slug}`}>
            <h5 className="card-title">{blog.title}</h5>
          </Link>
          <div>
            <p className="card-text">{renderHTML(blog.excerpt)}</p>
          </div>
        </section>
      </div>

      <div className="card-body">
        Written by{' '}
        <Link href={`/profile/${blog.postedBy.username}`}>
          <a>{blog.postedBy.username}</a>
        </Link>{' '}
        | Published {moment(blog.updatedAt).fromNow()}
      </div>
    </div>
  );
};

export default CardRelated;
