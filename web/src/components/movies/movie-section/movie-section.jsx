import { useState } from "react";
import MoviesList from "../movies-list/movies-list";
import VideoPlayer from "../../video-player/video-player";
import "./movie-section.css";

function MoviesSection({ selectedGenre, title }) {
    const [showVideo, setShowVideo] = useState(false);

    const handlePlayVideo = () => {
        console.log("aqui desde moviesection");
        setShowVideo(!showVideo);
    };

    return (
        <div className="movieSection">
            {showVideo && (
                <div className="video-overlay" onClick={() => setShowVideo(false)}>
                    <div className="video-container" onClick={(e) => e.stopPropagation()}>
                        <VideoPlayer />
                    </div>
                </div>
            )}
            <MoviesList
                title={title}
                carouselType={"CenterModeCarousel"}
                handlePlayVideo={handlePlayVideo}
                filter={selectedGenre}
            />
        </div>
    );
}

export default MoviesSection;

