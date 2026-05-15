import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CakeIcon from "@mui/icons-material/Cake";
import EmailIcon from "@mui/icons-material/Email";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import TuneIcon from "@mui/icons-material/Tune";
import PageLayout from "../../components/layouts/page-layout/page-layout";
import UserAvatar from "../../components/ui/user-avatar/user-avatar";
import backgroundProfile from "../../assets/images/cine1.jpg";
import { getMovieDetails, getUserProfile } from "../../services/api.services";
import CardMovieFavorite from "../../components/card-movie-favorites/card-movie-favorite";
import Map from "../../components/map/map";
import "./profile.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserAndMovies() {
      try {
        const userProfile = await getUserProfile();
        setUser(userProfile.data);

        const favorites = Array.isArray(userProfile.data.favorites) ? userProfile.data.favorites : [];
        const movieDetailsPromises = favorites.map((movieId) => getMovieDetails(movieId));
        const moviesResponses = await Promise.all(movieDetailsPromises);
        setMovies(moviesResponses.map((response) => response.data));
      } catch (error) {
        if (error.response?.status === 404) {
          navigate("/");
          return;
        }

        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserAndMovies();
  }, [navigate]);

  const formattedDate = user?.birthDate
    ? new Date(user.birthDate).toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "Unavailable";

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("es-ES", {
        month: "short",
        year: "numeric",
      })
    : "Recently";

  const stats = [
    { label: "Favorite picks", value: movies.length, icon: <FavoriteIcon fontSize="small" /> },
    { label: "Preferred genre", value: user?.genre || "Unset", icon: <LocalMoviesIcon fontSize="small" /> },
    { label: "Member since", value: memberSince, icon: <TuneIcon fontSize="small" /> },
  ];

  return (
    <PageLayout className="profile-page" background={backgroundProfile}>
      <section className="profile-page__shell container">
        <div className="profile-page__hero">
          <div className="profile-page__hero-main">
            <div className="profile-page__avatar-wrap">
              <UserAvatar width="132px" fontSize="4rem" height="132px" />
            </div>
            <div className="profile-page__identity">
              <span className="profile-page__eyebrow">Your CineHub space</span>
              <h1>{user?.name || "Profile"}</h1>
              <p>
                Keep track of your favorite titles, your movie taste and the account details that power your recommendations.
              </p>
              <div className="profile-page__meta">
                <span><CakeIcon fontSize="small" /> {formattedDate}</span>
                <span><EmailIcon fontSize="small" /> {user?.email || "Unavailable"}</span>
              </div>
            </div>
          </div>

          <div className="profile-page__actions">
            <Link to="/profile/edit" className="profile-page__button">
              Edit profile
            </Link>
          </div>
        </div>

        <div className="profile-page__stats">
          {stats.map((stat) => (
            <article key={stat.label} className="profile-page__stat-card">
              <span className="profile-page__stat-icon">{stat.icon}</span>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </article>
          ))}
        </div>

        <section className="profile-page__section">
          <div className="profile-page__section-heading">
            <span>Favorites</span>
            <h2>Your saved watchlist.</h2>
          </div>

          {isLoading ? (
            <div className="profile-page__empty">
              <p>Loading your movie picks...</p>
            </div>
          ) : movies.length === 0 ? (
            <div className="profile-page__empty">
              <p>No favorite movies yet. Start exploring and save a few titles first.</p>
            </div>
          ) : (
            <div className="profile-page__favorites-grid">
              {movies.map((movie) => (
                <Link key={movie.id} className="profile-page__favorite-link" to={`/movies/${movie.id}`}>
                  <CardMovieFavorite movie={movie} />
                </Link>
              ))}
            </div>
          )}
        </section>

        <section className="profile-page__section">
          <div className="profile-page__section-heading">
            <span>Nearby</span>
            <h2>Cinemas around you.</h2>
          </div>
          <div className="profile-page__map-card">
            <Map />
          </div>
        </section>
      </section>
    </PageLayout>
  );
}

export default Profile;
