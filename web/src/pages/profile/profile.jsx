import React, { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { getMovieDetails, getUserProfile } from "../../services/api.services";
import PageLayout from "../../components/layouts/page-layout/page-layout";
import UserAvatar from "../../components/ui/user-avatar/user-avatar";
import backgroundProfile from "../../assets/images/cine1.jpg";
import CakeIcon from '@mui/icons-material/Cake';
import EmailIcon from '@mui/icons-material/Email';
import "./profile.css";
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
        <PageLayout className="d-flex flex-column align-items-center" background={backgroundProfile}>
            <div className="stuffed mb-5"></div>
            <div className="container mt-5 col-lg-9 p-3 container-profile">
                <div className="text-center">
                    <h1 className="tittle-profile">Profile</h1>
                    <div className="line m"></div>
                </div>
        
                <div className="mt-5 d-flex flex-column flex-md-row align-items-start">
                    <div className="text-center mb-3 mb-md-0">
                        <UserAvatar width="120px" fontSize="4em" height="120px" />
                    </div>
                    <div className="ms-md-3">
                        <div className="name">{user.name}</div>
                        <div className="line"></div>
                        <div className="birthDate mt-3">
                            <h5>
                                <CakeIcon className="mb-2" /> Birthdate: {formattedDate}
                            </h5>
                        </div>
                        <div className="email">
                            <h5>
                                <EmailIcon /> Email: {user.email}
                            </h5>
                        </div>
                    </div>
                    <div className="ms-md-auto">
                        <NavLink to={"/profile/edit"}>
                            <button type="button" className="btn btn-primary">Edit</button>
                        </NavLink>
                    </div>
                </div>
            </div>
            <div className="container mt-5 col-lg-10">
                <h3 className="text-center">Your list of favorites</h3>
                <div className="row">
                    {movies.length === 0 ? (
                        <h5 className="text-center">No favorite movies found</h5>
                    ) : (
                        movies.map(movie => (
                            <div className="col-md-4 col-sm-6 mb-4" key={movie.id}>
                                <a className="text-decoration-none" role="button" href={`/movies/${movie.id}`}>
                                    <CardMovieFavorite movie={movie} />
                                </a>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <div className="container mt-5 col-lg-10">
                <h2 className="text-center">Cinemas near you:</h2>
                <Map />
            </div>
        </PageLayout>
    );
}

export default Profile;
