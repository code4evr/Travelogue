import Layout from '../../components/Layout';
import Private from '../../components/auth/Private';
import Link from 'next/link';

const UserIndex = () => {
  return (
    <Layout>
      <Private>
        <div className="container-fluid container-margin-top">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>User Dashboard</h2>
            </div>
            <div className="col-md-4">
              <ul className="list-group">
                <li className="list-group-item">
                  <a href="/user/create_blog">Create Blog</a>
                </li>
                <li className="list-group-item">
                  <Link href="/user/manage-blog">
                    <a>Update/delete Blog</a>
                  </Link>
                </li>
                <li className="list-group-item">
                  <Link href="/user/update">
                    <a>Update profile</a>
                  </Link>
                </li>
                <li className="list-group-item">
                  <Link href="/settings/password">
                    <a>Change Password</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Private>
    </Layout>
  );
};

export default UserIndex;
