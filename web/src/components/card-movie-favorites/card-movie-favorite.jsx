function CardMovieFavorite({ movie }){
    return(
        <div className="movie-card card mb-3" >
        <div className="row g-0 ">
          <div className=" ">
            <img src={movie.posterURL} className="img-fluid rounded-start" alt="..."/>
          </div>
          <div className="col-md-8 ">
            <div className="card-body ">
              <h5 className="">{movie.title}</h5>
              <p className="card-text"><small className="text-muted">Premier {new Date (movie?.releaseDate).toLocaleDateString({year:"numeric", mouth:"numeric", day: "numeric"})}</small></p>
            </div>
          </div>
        </div>
      </div>

    )
}
export default CardMovieFavorite