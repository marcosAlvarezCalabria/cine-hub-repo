import { useContext, useState } from "react";
import PageLayout from "../../components/layouts/page-layout/page-layout";
import AuthContext from "../../contexts/auth.context";
import MoviesSection from "../../components/movies/movie-section/movie-section";
import FormFilter from "../../components/form-filter/form-filter";
import "./main-page.css";
import MoviesList from "../../components/movies/movies-list/movies-list";

function MainPage() {
    const { user } = useContext(AuthContext);
    const [selectedGenre, setSelectedGenre] = useState("");
    
    const handleGenreChange = (genre) => {
        setSelectedGenre(genre);
    };

    return (
        <PageLayout className= "">

            <MoviesList carouselType={"carousel-main-section"} />
        
            <FormFilter handleGenreChange={handleGenreChange} />
            <div  ><MoviesSection title= {`Genres selected`} selectedGenre={selectedGenre} /></div>
            <div><MoviesSection  title= {"for you"} selectedGenre={user?.genre}/></div>
        </PageLayout>
    );
}

export default MainPage;




