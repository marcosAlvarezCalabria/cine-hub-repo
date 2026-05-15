import Slider from "react-slick"
import("./center-model-carousel.css")
import MovieItem from "../../movies/movie-item/movie-item";






function CenterModeCarousel({title,selectedGenre, movies,handlePlayVideo,}) {
  const movieCount = movies.length;
  const sliderKey = `${selectedGenre || "all"}-${movies
    .slice(0, 6)
    .map((movie) => movie.id)
    .join("-")}`;
  const settings = {
    className: "center",
    centerMode: movieCount > 1,
    infinite: movieCount > 3,
    centerPadding: "60px",
    slidesToShow: Math.min(3, Math.max(movieCount, 1)),
    speed: 500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(3, Math.max(movieCount, 1)),
          centerPadding: "50px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: movieCount > 1 ? "30px" : "0px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerPadding: "0px",
        },
      },
    ],
  };

  if (movieCount === 0) {
    return (
      <div className="container p-5">
        <h1>{title} : {selectedGenre}</h1>
        <div className="slider-container">
          <p className="mb-0 text-white-50">No movies available for this genre right now.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container p-5">
     <h1>{title} : {selectedGenre}</h1>
      <div className="slider-container">
      <Slider key={sliderKey} {...settings}> 
        {movies.map((movie) => (
          <div key={movie.id}>
            <MovieItem handlePlayVideo={handlePlayVideo} movie={movie} />
          </div>
        ))}

      </Slider>
    </div>

    </div>
    
  );
}

export default CenterModeCarousel;




