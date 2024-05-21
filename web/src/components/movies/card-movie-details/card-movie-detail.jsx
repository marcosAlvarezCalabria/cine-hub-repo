import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../contexts/auth.context";
import { deleteComment } from "../../../services/api.services";
import ItemListDetail from "../../../components/item-list-detail/item-list-detail";
import Rating  from '@mui/material/Rating';
import "./card-movie-detail.css";
import { Button } from "@mui/material";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';



function CardMovieDetail({ movie, error, handleComments,handlePlayVideo }) {
    const { user } = useContext(AuthContext);
    const [deleteUniqComment, setDeleteUniqComment] = useState(false);
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const commentsA = movie?.comments;
        const showButtonDelete = commentsA?.some(comment => comment.author.email === user.email);
        if (!showButtonDelete) {
            setShowButton(!showButton);
        }
    }, [deleteComment]);

    const handleDeleteComment = (id) => {
        deleteComment(id);
        setDeleteUniqComment(!deleteComment);
        handleComments();
    };
   const handleCallVideo = () => {
    handlePlayVideo()
   }
    

    return (
        error ? (
            <p>Error: {error}</p>
        ) : (
            <div className="container pt-4">
                {movie && (
                    <div className="row justify-content-around pt-5">
                        <div className="col-lg-4 col-md-8 mb-4">
                            <div className="card card-movie-detail">
                                <div className="position-relative">
                                    <img className="img-fluid w-100" src={movie.posterURL} alt="Movie Poster" />
                                    <div className="img-overlay"></div>
                                </div>
                                <div className="p-3 div-body">
                                    <h2>{movie?.title}</h2>
                                    <div className="d-flex flex-row div-genres">
                                        {movie.genres.map((genre, index) => (
                                            <p className="me-2" key={index}>{genre.toUpperCase()}</p>
                                        ))}
                                    </div>
                                    <div className="div-rating d-flex justify-content-between">
                                        <Rating name="read-only" value={movie.voteAverage/3} readOnly />
                                       <span className="" data-toggle="modal" data-target="#exampleModalCenter" role="button" onClick={handleCallVideo}>
                                       <PlayCircleIcon fontSize="large" color="warning"/>
                                        </span> 
                                    </div>
                                    <div className="div-overview">{movie.overview}</div>
                                
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-8 mb-4">
                            <div className="list-comments">
                                <h3>Comments:</h3>
                                <ul className="list-group">
                                    {movie.comments.map((comment, index) => (
                                        <ItemListDetail
                                            key={index}
                                            comment={comment}
                                            handleDeleteComment={handleDeleteComment}
                                        />
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    );
}

export default CardMovieDetail;
