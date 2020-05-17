import Layout from '../components/Layout';
import Link from 'next/link';
import '../style/style.css';

const Index = () => {
  return (
    <Layout>
      <div className="adjust">
        <div className="container-fluid">
          <div className="heading-text d-flex flex-column align-items-center justify-content-center">
            <q className="mb-4 text-center">
              <em>
                THE REAL VOYAGE OF DISCOVERY CONSISTS NOT IN SEEKING
                NEW LANDSCAPES, BUT IN HAVING NEW EYES.” ~ MARCEL
                PROUST
              </em>
            </q>
            <p className="text-center">
              Discover and experience the world through the eyes of
              travel bloggers around the world
            </p>
          </div>
          <div className="bg-img">
            <img src="bg-img.png" alt="" />
          </div>
          <div className="col-md-12">
            <h1 className="text-center mt-4 mb-4 p-2">
              <strong>What makes us different</strong>
            </h1>
            <div className="row ml-4 mr-4">
              <div className="col-md-4 mt-4 mb-4">
                <div className="mb-4">
                  <span>
                    <i className="fas fa-globe"></i>
                  </span>
                </div>
                <h5>
                  <strong>Get worldwide exposure</strong>
                </h5>
                <p>
                  Get immediate exposure with your first upload. Our
                  Pulse algorithm surfaces new photographs and
                  photographers, ensuring your photos are seen by the
                  community so you receive valuable feedback on day
                  one.
                </p>
              </div>
              <div className="col-md-4 mt-4 mb-4">
                <div className="mb-4">
                  <span>
                    <i className="fas fa-pencil-ruler"></i>
                  </span>
                </div>
                <h5>
                  <strong>
                    Build your career as a travel blogger
                  </strong>
                </h5>
                <p>
                  Present yourself as a professional. Get hired by
                  displaying your services, create a Directory
                  listing, showcase the workshops you're holding, and
                  create Galleries to highlight your work.
                </p>
              </div>
              <div className="col-md-4 mt-4 mb-4">
                <div className="mb-4">
                  <span>
                    <i className="fas fa-dollar-sign"></i>
                    <i className="fas fa-dollar-sign"></i>
                  </span>
                </div>
                <h5>
                  <strong>Get paid for your work</strong>
                </h5>
                <p>
                  With Statistics and Pulse you get valuable insights
                  into how your photos are performing and how you rank
                  in comparison to other photographers in the
                  community.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-12 bg-quest mb-4 d-flex flex-column align-items-center justify-content-center">
            <button className="btn text-center mt-4 mb-4">
              Travel Quests
            </button>
            <p className="display-4">coming soon...</p>
          </div>
          <div className="col-md-12 mt-4">
            <div className="row">
              <div className="col-md-2 d-flex flex-column">
                <h3>Company</h3>
                <Link href="/about_us">
                  <a>About Us</a>
                </Link>
                <Link href="/career">
                  <a>Career</a>
                </Link>
              </div>
              <div className="col-md-2 d-flex flex-column">
                <h3>Blogger's</h3>
                <Link href="/about_us">
                  <a>About Us</a>
                </Link>
                <Link href="/career">
                  <a>Career</a>
                </Link>
              </div>
              <div className="col-md-2 d-flex flex-column text-center">
                <h3>Social</h3>
                <Link href="/about_us">
                  <a>Facebook</a>
                </Link>
                <Link href="/career">
                  <a>Instagram</a>
                </Link>
                <Link href="/career">
                  <a>Twitter</a>
                </Link>
              </div>
              <div className="col-md-6">
                <form>
                  <div className="d-flex flex-row justify-content-center subscribe">
                    <div className="form-group col-md-8">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Email"
                      />
                    </div>
                    <div className="col-md-2">
                      <button className="btn btn-primary">
                        Subscribe
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <hr />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
