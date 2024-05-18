import Slider from "react-slick";
import Button from '@mui/material/Button';
import "./buttons-carousel.css"



function ButtonsCarousel({ genres, handleGenreChangeButton}) {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 6,
    speed: 500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          centerPadding: "50px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          centerPadding: "30px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          centerPadding: "00px",
        },
      },
    ],
  };
const handleGenreSelected = (event)=>{
  const genreSelected = event.currentTarget.value;
  handleGenreChangeButton(genreSelected)
  console.log(genreSelected)
}

  return (
    <div className="slider-container1">
      <Slider {...settings}>
        
      
      {genres.map((genre, index) => (
            <Button key={index} onClick={handleGenreSelected}  value={genre} color="warning" className="btn btn-primary">{genre}</Button>
        ))
        }
                    
        
      </Slider>
    </div>
  );
}

export default ButtonsCarousel;