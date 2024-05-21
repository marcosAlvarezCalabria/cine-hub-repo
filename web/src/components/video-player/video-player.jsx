import ReactPlayer from "react-player";

function VideoPlayer({ trailerId, width, height }) {
  console.log("videoPLAYER ", trailerId);
  return (
    <ReactPlayer
      className="col-md-10"
      url={`https://www.youtube.com/watch?v=${trailerId}`}
      width={width}
      height={height}
    />
  );
}

export default VideoPlayer;