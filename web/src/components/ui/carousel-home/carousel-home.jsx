import Slider from "react-slick";
import img1 from "../../../assets/images/img1.jpg";
import img2 from "../../../assets/images/img2.jpg"
import ("./carousel.css")






function CenterMode() {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <img src={img1} alt="" srcSet="" />
        <img src={img1} alt="" srcSet="" />
        <img src={img1} alt="" srcSet="" />
        <img src={img1} alt="" srcSet="" />
        <img src={img1} alt="" srcSet="" />

      </Slider>
    </div>
  );
}

export default CenterMode;




