import React, { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { getMovieDetails, getUserProfile } from "../../services/api.services";
import PageLayout from "../../components/layouts/page-layout/page-layout";
import UserAvatar from "../../components/ui/user-avatar/user-avatar";
import backgroundProfile from "../../assets/images/cine1.jpg";
import CakeIcon from '@mui/icons-material/Cake';
import EmailIcon from '@mui/icons-material/Email';
import "./profile.css";
import MovieItem from "../../components/movies/movie-item/movie-item";
import CardMovieFavorite from "../../components/card-movie-favorites/card-movie-favorite";
import Map from "../../components/map/map";

function Profile() {
    const { id } = useParams();
    const [user, setUser] = useState({});
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchUserAndMovies() {
            try {
                const userProfile = await getUserProfile(id);
                setUser(userProfile.data);

                const movieDetailsPromises = userProfile.data.favorites.map(movieId => getMovieDetails(movieId));
                const moviesResponses = await Promise.all(movieDetailsPromises);
                const moviesDetails = moviesResponses.map(response => response.data);
                setMovies(moviesDetails);
            } catch (error) {
                if (error.response?.status === 404) {
                    navigate("/");
                } else {
                    console.error(error);
                }
            }
        }

        fetchUserAndMovies();
    }, [id, navigate]);

    const formattedDate = user.birthDate ? new Date(user.birthDate).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '';

    return (
        <PageLayout className="d-flex  row align-items-start" background={backgroundProfile}>
            <div className="stuffed mb-5"></div>
            <div className="container-fluid mt-5 col-md-9 p-5 container-profile">
                <div className="div1">
                    <h1 className="tittle-profile">Profile</h1>
                    <div className="line m"></div>
                </div>
        
                <div className="mt-5 div2 d-flex">
                    <div className="div3 w-30">
                        <UserAvatar width="120px" fontSize="4em" height="120px" />
                    </div>
                    <div className="div4 w-50">
                        <div className="name ms-3">{user.name}</div>
                        <div className="line ms-3"></div>
                        <div className="birthDate ms-3 mt-3">
                            <h5>
                                <CakeIcon className="mb-2" /> Birthdate: {formattedDate}
                            </h5>
                        </div>
                        <div className="email ms-3">
                            <h5>
                                <EmailIcon /> Email: {user.email}
                            </h5>
                        </div>
                    </div>
                    <div className="edit d-flex align-items-end p-2">
                        <NavLink to={"/profile/edit"}>
                            <button type="button" className="btn btn-primary btn-m">Edit</button>
                        </NavLink>
                    </div>
                </div>
            </div>
            <div className="d-flex align-items-center justify-content-center p-5">
            <div className="favorites-movies col-md-10 p-5 container-profile ">
                <div className=""><h3>Your list of favorites</h3></div>
                <div className= "row">
                   
                {movies.length === 0 ? (
                            <h5>No favorite movies found</h5>
                        ) : (
                            movies.map(movie => (
                                <div className="col-md-4" key={movie.id}>
                                    <a className="text-decoration-none" role="button" href={`/movies/${movie.id}`}>
                                        <CardMovieFavorite movie={movie} />
                                    </a>
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </div>
            <div className="d-flex align-items-center justify-content-center p-5">
                
            <div className="favorites-movies col-md-10 p-5 container-profile">
            <h2 className="text-cinemas">Cinemas near you :</h2>
                <Map/>
            </div>
            </div>
            
        </PageLayout>
    );
}

export default Profile;