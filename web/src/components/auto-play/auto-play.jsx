
import Slider from "react-slick";
import "./auto-play.css"

function AutoPlay() {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 5,
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
  return (
    <div className="container-slider-home slider-container ">
      <Slider {...settings}>
        <div className="card-movie-home ">
        <span className="hidden-content">Placeholder</span>
          <img className="img-card-home" src="https://art-gallery-emea.api.hbo.com/images/GXdu2TwR968PCwwEAADWb/tileburnedin?v=8a2c2b6598cdc67f1f61dac4e17a756f&size=240x360&compression=medium&protection=false&scaleDownToFit=false&productCode=hboMax&overlayImage=urn:warnermedia:brand:not-in-a-hub:territory:adria&language=es-es"/>
        </div>
        <div>
        <span className="hidden-content">Placeholder</span>
          <img className="img-card-home" src="https://art-gallery-emea.api.hbo.com/images/GZaU1ew6et7qspgEAACJa/tileburnedin?v=1b5ce2bf5f49d1aa447519b19472f1a4&size=240x360&compression=medium&protection=false&scaleDownToFit=false&productCode=hboMax&overlayImage=urn:warnermedia:brand:not-in-a-hub&language=es-es" />
        </div>
        <div>
        <span className="hidden-content">Placeholder</span>
          <img className="img-card-home" src="https://art-gallery-emea.api.hbo.com/images/GYBmsKA4FaUnDdQEAAAAj/tileburnedin?v=ec07c6279d82ab85f988595c6b9a80a9&size=240x360&compression=medium&protection=false&scaleDownToFit=false&productCode=hboMax&overlayImage=urn:warnermedia:brand:bhm2021&language=es-es" alt="" />
        </div>
        <div>
        <span className="hidden-content">Placeholder</span>
          <img className="img-card-home" src="https://art-gallery-emea.api.hbo.com/images/GYmFp9ATv1JSBmwEAAACW/tileburnedin?v=752aa56fb90517d836ca21a5a811e27d&size=240x360&compression=medium&protection=false&scaleDownToFit=false&productCode=hboMax&overlayImage=urn:warnermedia:brand:cnn&language=es-es"/>
        </div>
        <div>
        <span className="hidden-content">Placeholder</span>
          <img className="img-card-home" src="https://art-gallery-emea.api.hbo.com/images/GYGJAwgdTR0zCwwEAAABM/tileburnedin?v=0c19bfcc7ebc28904812164a38ef1f79&size=240x360&compression=medium&protection=false&scaleDownToFit=false&productCode=hboMax&overlayImage=urn:warnermedia:brand:dc-comics&language=es-es" alt="" />
        </div>
        <div>
        <span className="hidden-content">Placeholder</span>
          <img className="img-card-home" src="https://art-gallery-emea.api.hbo.com/images/GYA79hQZbUsI3gQEAAAB0/tileburnedin?v=a390c6a448c07b4f03797e8cf53ad289&size=240x360&compression=medium&protection=false&scaleDownToFit=false&productCode=hboMax&overlayImage=urn:warnermedia:brand:hbo:territory:adria&language=es-es" alt="" />
        </div>
      </Slider>
    </div>
  );
}

export default AutoPlay;