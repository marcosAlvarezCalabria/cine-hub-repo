function CardMovieFavorite({ movie }){
    const formattedReleaseDate = movie?.releaseDate
      ? new Date(movie.releaseDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        })
      : "Release date unavailable";

    return(
        <div className="movie-card card mb-3" >
        <div className="row g-0 ">
          <div className=" ">
            <img src={movie.posterURL} className="img-fluid rounded-start" alt="..."/>
          </div>
          <div className="col-md-8 ">
            <div className="card-body ">
              <h5 className="">{movie.title}</h5>
              <p className="card-text"><small className="text-muted">Premier {formattedReleaseDate}</small></p>
            </div>
          </div>
        </div>
      </div>

    )
}
export default CardMovieFavorite
