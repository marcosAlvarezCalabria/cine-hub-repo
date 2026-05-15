import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import AddIcon from "@mui/icons-material/Add";
import { getMovies } from "../../services/api.services";
import "./auto-play.css";

function AutoPlay() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchFeaturedMovies() {
      try {
        const { data } = await getMovies();
        setMovies((data || []).slice(0, 8));
      } catch (error) {
        console.error("Unable to load featured movies", error);
        setMovies([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchFeaturedMovies();
  }, []);

  const settings = {
    className: "center",
    centerMode: movies.length > 1,
    infinite: movies.length > 3,
    centerPadding: "70px",
    slidesToShow: Math.min(4, Math.max(movies.length, 1)),
    speed: 500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(3, Math.max(movies.length, 1)),
          centerPadding: "40px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: movies.length > 1 ? "28px" : "0px",
        },
      },
    ],
  };

  if (isLoading) {
    return <p className="auto-play__status">Loading featured movies...</p>;
  }

  if (movies.length === 0) {
    return <p className="auto-play__status">Featured movies are unavailable right now.</p>;
  }

  return (
    <div className="auto-play">
      <Slider key={movies.map((movie) => movie.id).join("-")} {...settings}>
        {movies.map((movie) => (
          <div key={movie.id} className="auto-play__slide">
            <article className="auto-play__card">
              <img
                className="auto-play__image"
                src={movie.posterURL || movie.backdropURL}
                alt={movie.title}
              />
              <div className="auto-play__overlay" />
              <div className="auto-play__content">
                <div>
                  <p className="auto-play__meta">
                    {(movie.genres || []).slice(0, 2).join(" • ") || "Featured pick"}
                  </p>
                  <h3>{movie.title}</h3>
                </div>
                <Link to={`/movies/${movie.id}`} className="auto-play__link" aria-label={`Open ${movie.title}`}>
                  <AddIcon />
                </Link>
              </div>
            </article>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default AutoPlay;
