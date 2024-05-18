import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { getMovieDetails } from "../../services/api.services";
import CardMovieDetail from "../../components/movies/card-movie-details/card-movie-detail";
import CommentsForm from "../../components/comments-form/comments-form"; 
import AuthContext from "../../contexts/auth.context";
import "./movie-detail.css";
import BasicModal from "../../components/modal-youtuve/modal";

function MovieDetail() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);
    const [comments, setComments] = useState(true);
    const { user } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    

    useEffect(() => {
        async function fetchMovieDetails() {
            try {
                const { data } = await getMovieDetails(id);
                setMovie(data);
            } catch (error) {
                if (error.response && (error.response.status === 404 || error.response.status === 500)) {
                    setError(error.response.data.message);
                } else {
                    setError("An error occurred loading details.");
                }
            }
        }
        fetchMovieDetails();
    }, [id, comments]);

    const handleComments = () => {
        setComments(!comments);
    };

   const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const commentsA = movie?.comments;
    const showForm = commentsA?.some(comment => comment.author.email === user.email);

    return (
        <div className="container-fluid container-movie-detail">
            <h2>Movie Details</h2>
            <CardMovieDetail handlePlayVideo={handleOpen} handleComments={handleComments} movie={movie} error={error} />
            {!showForm && <CommentsForm handleComments={handleComments} movie={movie} />}
             <BasicModal open={open} handleClose={handleClose}/> 
        </div>
    );
}

export default MovieDetail;
