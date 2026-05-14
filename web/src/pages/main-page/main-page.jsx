import { useContext, useState } from "react";
import PageLayout from "../../components/layouts/page-layout/page-layout";
import AuthContext from "../../contexts/auth.context";
import MoviesSection from "../../components/movies/movie-section/movie-section";
import FormFilter from "../../components/form-filter/form-filter";
import "./main-page.css";
import MoviesList from "../../components/movies/movies-list/movies-list";

function MainPage() {
  const { user } = useContext(AuthContext);
  const [selectedGenre, setSelectedGenre] = useState("");

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
  };

  return (
    <PageLayout className="main-page">
      <div className="main-page__spacer" />

      <section className="main-page__hero container">
        <div className="main-page__hero-copy">
          <span className="main-page__eyebrow">Now discovering</span>
          <h1>Choose a mood, explore a genre and jump straight into the next title.</h1>
          <p>
            The catalog view is now organized as a browsing experience instead of a plain list, keeping featured content, filters and personalized picks visually separate.
          </p>
        </div>
      </section>

      <section className="main-page__feature">
        <div className="container main-page__panel">
          <MoviesList carouselType={"carousel-main-section"} />
        </div>
      </section>

      <section className="main-page__section container">
        <div className="main-page__section-header">
          <span>Filter by genre</span>
          <h2>Start with something specific.</h2>
        </div>
        <div className="main-page__panel main-page__panel--compact">
          <FormFilter handleGenreChange={handleGenreChange} />
        </div>
      </section>

      <section className="main-page__section container">
        <div className="main-page__section-header">
          <span>Selected genre</span>
          <h2>{selectedGenre || "Choose a genre to populate this rail."}</h2>
        </div>
        <div className="main-page__panel">
          <MoviesSection title={"Genres selected"} selectedGenre={selectedGenre} />
        </div>
      </section>

      <section className="main-page__section container">
        <div className="main-page__section-header">
          <span>For you</span>
          <h2>{user?.genre ? `Because you like ${user.genre}` : "Sign in to unlock personalized picks."}</h2>
        </div>
        <div className="main-page__panel">
          <MoviesSection title={"for you"} selectedGenre={user?.genre} />
        </div>
      </section>
    </PageLayout>
  );
}

export default MainPage;
