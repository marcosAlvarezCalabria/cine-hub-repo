import PageLayout from "../../components/layouts/page-layout/page-layout";
import { Link } from "react-router-dom";
import "./home.css";
import backgroundHome from "../../assets/images/image.jpg";
import AutoPlay from "../../components/auto-play/auto-play";
import AskList from "../../components/ask-list/ask-list";

function Home() {
  return (
    <PageLayout background={backgroundHome}>
      <section className="home-page">
        <div className="home-page__hero container">
          <div className="home-page__copy">
            <span className="home-page__eyebrow">Curated Movie Discovery</span>
            <h1 className="home-page__title">Track favorites, explore genres and keep the conversation going after the credits.</h1>
            <p className="home-page__description">
              CineHub turns a simple movie catalog into a more cinematic experience, with trailers, personal picks and community comments in one flow.
            </p>
            <div className="home-page__actions">
              <Link to="/main" className="home-page__button home-page__button--primary">
                Explore movies
              </Link>
              <Link to="/register" className="home-page__button home-page__button--secondary">
                Create account
              </Link>
            </div>
            <div className="home-page__stats">
              <div>
                <strong>Trailers</strong>
                <span>Preview before you commit to a film night.</span>
              </div>
              <div>
                <strong>Favorites</strong>
                <span>Save the titles you want to revisit later.</span>
              </div>
              <div>
                <strong>Comments</strong>
                <span>Share opinions and discover what others noticed.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="home-page__section">
          <div className="container">
            <div className="home-page__section-heading">
              <span>Featured picks</span>
              <h2>Browse the catalog through a cleaner, more immersive carousel.</h2>
            </div>
            <div className="home-page__panel">
              <AutoPlay className="align-item-center" />
            </div>
          </div>
        </div>

        <div className="home-page__section home-page__section--faq">
          <div className="container">
            <div className="home-page__section-heading">
              <span>How it works</span>
              <h2>Everything needed to start using CineHub is visible at a glance.</h2>
            </div>
            <div className="home-page__panel">
              <AskList className="align-item-center" />
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

export default Home;
