import Slider from "react-slick";
import "./carousel-pause-on-hover.css"
import MovieItem from "../movies/movie-item/movie-item";


function CarouselPauseOnHover(movies) {
    var settings = {
      dots: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnHover: true
    };
    return (
      <div className="slider-container">
        <Slider {...settings}>
          {movies.movies.map((movie) => {
            return(
              <div key={movie.id}>
                <MovieItem/>
          </div>

            )

          })}
          
         
        </Slider>
      </div>
    );
  }
  
  export default CarouselPauseOnHover;