import { useContext , useState} from "react";
import MoviesList from "../movies-list/movies-list";
import VideoPlayer from "../../video-player/video-player"
import "./movie-section.css";



function MoviesSection({selectedGenre , title}) {
    const [showVideo, setShowVideo] = useState(false)

    const handlePlayVideo = () => {
        console.log("aqui desde moviesection")
        setShowVideo(!showVideo)

    }

    return (
        <div className="movieSection"  >

            {showVideo? <div className="d-flex justify-content-center"><VideoPlayer></VideoPlayer></div> : ""}

            <MoviesList  title={title} carouselType={"CenterModeCarousel"} handlePlayVideo={handlePlayVideo}  filter={selectedGenre} />
        </div>
    );
}

export default MoviesSection;
