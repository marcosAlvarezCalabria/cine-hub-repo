import Slider from "react-slick";
import "./carousel-main-section.css"; 
import AddIcon from '@mui/icons-material/Add';
import { NavLink } from "react-router-dom";


function CarouselMainSection({ movies }) {
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true
    };
    const limitedMovies = movies.slice(0, 5);
    return (
        <div className="container-fluid slider-container">
        <Slider {...settings}>
            {limitedMovies.map((movie) => (
                <div key={movie.id} className="carrousel-main position-relative">
                    <div className="position-absolute start-0 w-100 h-100 bg-dark opacity-50"></div>
                    <img src={movie.posterURL} className="img-fluid" alt={movie.title} />
                    <div className="position-absolute bottom-0 p-3 p-md-5 start-0 text-light movie-content">
                        <div className="row">
                            <div className="col-12 col-md-8 col-lg-6">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h1 className="movie-title mb-0 mt-5 me-2">{movie.title}</h1>
                                    <NavLink to={`/movies/${movie.id}`}>
                                        <button className="btn btn-dark rounded-circle movie-icon-btn mt-5">
                                            <AddIcon className="movie-icon" />
                                        </button>
                                    </NavLink>
                                </div>
                                <p className="movie-overview d-none d-md-block">{movie.overview}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </Slider>
    </div>
    
    );
}

export default CarouselMainSection;

