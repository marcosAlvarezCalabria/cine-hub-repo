import "./movie-item.css";
import { NavLink } from "react-router-dom";
import AuthContext from "../../../contexts/auth.context";
import { useContext, useEffect, useState } from "react";
import { removeFavorites, updateUser } from "../../../services/api.services";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Rating from '@mui/material/Rating';

function MovieItem({ movie, handlePlayVideo }) {
  const { user, fetchProfile } = useContext(AuthContext);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(user.favorites.includes(movie?.id));
  }, [movie?.id, user.favorites]);

  async function handleFavorites() {
    try {
      if (isFavorite) {
        await removeFavorites(movie.id, user.id);
      } else {
        const updatedUserData = { ...user, favorites: [...user?.favorites, movie?.id] };
        await updateUser(updatedUserData);
      }
      await fetchProfile();
    } catch (error) {
      console.error("An error occurred while updating favorites:", error);
    }
  }

  console.log(movie.releaseDate)
  return (

    <div className="row">
      <div className="col-md-9 col-sm-10 col">

        <div className="card movie_card w-100 ">
          <div className="image-container ">
            <img src={movie?.posterURL} className="card-img-top" alt={movie?.title} />
            <i role="button" onClick={handleFavorites} aria-hidden="true" className="favorite-icon">
              {isFavorite ? <FavoriteIcon style={{ color: "red" }} /> : <FavoriteBorderIcon style={{ color: "red" }} />}
            </i>
          </div>
          <div className="card-body">
            <div className="play-video">
              <i
                onClick={handlePlayVideo}
                className="fa fa-play play_button"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Play Trailer"
              ></i>

            </div>
            <div className="title">
              <NavLink className="text-decoration-none" to={`/movies/${movie?.id}`}>
                <h5 className="card-title ">{movie?.title}</h5>
              </NavLink>

            </div>
            <div className="rating">
              <Rating readOnly="true" value={movie.voteAverage - 5}></Rating>
            </div>
            <div className="release-date">
              <h5> {new Date(movie?.releaseDate).toLocaleDateString({ year: 'numeric', month: 'long', day: 'numeric' })}</h5>
            </div>
          </div>
        </div>

      </div>
    </div>

  );
}

export default MovieItem;
