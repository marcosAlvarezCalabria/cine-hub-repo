import ReactPlayer from "react-player";

function VideoPlayer({url, width, height}){
    console.log("videoPLAYER ")
    return(
        
            
  <ReactPlayer className="col-md-10 " url="www.youtube.com/watch?v=XdKzUbAiswE" width={width} height={height}/>
    )
}

export default VideoPlayer;