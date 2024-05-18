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

    return (
        <div className="container-fluid slider-container">
            <Slider {...settings}>
                {movies.map((movie) => (
                    <div key={movie.id} className="carrousel-main position-relative">
                        <div className="position-absolute start-0 w-100 h-100 bg-dark opacity-50"></div>
                        <img src={movie.posterURL} className="img-fluid" alt={movie.title} />
                        <div className="position-absolute bottom-0 p-5 start-0   row-columns p-3 text-light">
                            <div className="d-flex ">
                           
                            <h1 className="col-md-4 ">{movie.title}</h1>
                            <NavLink to={`/movies/${movie?.id}`}>
                           <button className="btn btn-dark rounded-circle"><AddIcon fontSize="large" /></button>
                            </NavLink>

                            </div>
                             
                            <p className="col-6">{movie.overview}</p>
                           

                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default CarouselMainSection;

