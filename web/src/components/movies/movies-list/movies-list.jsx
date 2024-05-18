import { useContext, useEffect, useState } from "react";
import CenterModeCarousel from "../../ui/carousel/center-mode-carousel";
import AuthContext from "../../../contexts/auth.context";
import { getMovies, getUserProfile } from "../../../services/api.services";
import CarouselPauseOnHover from "../../carousel-pause-on-hover/carousel-pause-on-hover";
import CarouselMainSection from "../../carousel -main-section/carusel-main-section";





function MoviesList({ title, genre, filter, handlePlayVideo, carouselType }) {
    const [movies, setMovies] = useState([]);
    const { user } = useContext(AuthContext);
    const [searchedGenre, setSearchedGenre] = useState("")
    useEffect(() => {
        async function fetchMovies() {
            try {

                const query = {};
                if (filter) {
                    query.genres = filter;
                } 
                
                //setSearchedGenre(query.genres || "")
                const { data: movies } = await getMovies(query)
                setMovies(movies)
                await getUserProfile(user)

            }

            catch (error) {
                console.log(error);
            }
        }
        fetchMovies();
    }, [genre, filter])

  
   

   
    if (carouselType === "CenterModeCarousel") {
        return (
            
                <CenterModeCarousel title={title} selectedGenre={filter}  handlePlayVideo={handlePlayVideo} movies={movies} />
            
        );
    } else if (carouselType === "CarouselPauseOnHover") {
        return (
            
                <CarouselPauseOnHover movies={movies} />
        
        );
    } else if("carousel-main-section"){
        return(
            <CarouselMainSection movies={movies}/> 
        )
    }
    
    
    else {
        return null; 
    }
        

     }



export default MoviesList;



/*const userModified = { ...user };

// Modificar la propiedad que se pasa como genre en la copia
if (user) {
    const genreString = user?.genre;
    const foundKey = Object.keys(genreData).find(function (clave) {
        return genreData[clave] === genreString;
    });

    if (foundKey) {
        console.info(`found key ${foundKey}`);
       

        userModified.genre = [foundKey]; // Modificar genre en la copia
        console.info(`user modified ${userModified.genre}`);
    } else {
        console.info(`no found key`);
    }

    return (
        <PageLayout>
            <h1>Main Page</h1>
            <h2>slider por genero {user.genre}</h2>
            <MoviesList typeQuery={} />
            <h2>slider por popularidad </h2>
        </PageLayout>
    );

} else if(!user){
    return (
        <PageLayout>
            <h1>Main Page</h1>
            
            <MoviesList />
        </PageLayout>
    )
}*/