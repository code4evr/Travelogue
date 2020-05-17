import Link from 'next/link';
import renderHTML from 'react-render-html';
import { useState, useEffect } from 'react';
import { listSearch } from '../../actions/blogAuth';
import '../../style/style.css';

const Search = () => {
  const [values, setValues] = useState({
    search: undefined,
    results: [],
    searched: false,
    message: '',
  });

  const { search, results, searched, message } = values;

  const searchSubmit = e => {
    e.preventDefault();
    listSearch({ search }).then(data => {
      setValues({
        ...values,
        results: data,
        searched: true,
        message: `${data.length} blogs found`,
      });
    });
  };

  const handleChange = e => {
    setValues({
      ...values,
      search: e.target.value,
      results: [],
      searched: false,
    });
  };

  const searchedBlogs = (result = []) => {
    return (
      <div className="jumbotron bg-white">
        {message && <p className="pt-4 text-muted">{message}</p>}

        {result.map((blog, i) => (
          <div key={i}>
            <Link href={`/blogs/${blog.slug}`}>
              <a className="text-primary">{blog.title}</a>
            </Link>
          </div>
        ))}
      </div>
    );
  };

  const searchForm = () => {
    return (
      <form
        onSubmit={searchSubmit}
        className="form-inline my-2 my-lg-0 formstyle"
      >
        <input
          type="search"
          className="form-control mr-sm-2"
          placeholder="Search travelogue"
          onChange={handleChange}
        />
        <button
          className="btn btn-outline-primary my-2 my-sm-0"
          type="submit"
        >
          Search
        </button>
      </form>
    );
  };
  return <div>{searchForm()}</div>;
};

export default Search;
