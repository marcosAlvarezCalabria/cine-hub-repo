import Slider from "react-slick"
import("./center-model-carousel.css")
import MovieItem from "../../movies/movie-item/movie-item";






function CenterModeCarousel({title,selectedGenre, movies,handlePlayVideo }) {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          centerPadding: "50px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: "30px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerPadding: "00px",
        },
      },
    ],
  };
 console.log()
  return (
    <div className="container p-5">
     <h1>{title} : {selectedGenre}</h1>
      <div className="slider-container">
      <Slider {...settings}> 
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




