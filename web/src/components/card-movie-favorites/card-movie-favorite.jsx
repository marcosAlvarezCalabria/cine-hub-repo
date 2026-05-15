function CardMovieFavorite({ movie }) {
  const formattedReleaseDate = movie?.releaseDate
    ? new Date(movie.releaseDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Release date unavailable";

  return (
    <article className="movie-card card">
      <img src={movie.posterURL || movie.backdropURL} className="img-fluid" alt={movie.title} />
      <div className="card-body">
        <p className="card-text text-uppercase text-muted small mb-2">
          {(movie.genres || []).slice(0, 2).join(" • ") || "Favorite"}
        </p>
        <h5 className="mb-2">{movie.title}</h5>
        <p className="card-text mb-0">
          <small className="text-muted">Premier {formattedReleaseDate}</small>
        </p>
      </div>
    </article>
  );
}

export default CardMovieFavorite;
