import React, { useState } from 'react';
import genreData from "../../../../data/genre.data.json"
import ButtonsCarousel from '../buttons-carousel/buttons-carousel';

function FormFilter({ handleGenreChange }) {
    const [selectedGenre, setSelectedGenre] = useState('');

   const handleGenreChangeButton = (genreSelected)=>{
    setSelectedGenre(genreSelected)
    handleGenreChange(genreSelected)

   }
   const genres = Object.values(genreData)
   console.log(genres)

    return (
        <>
         <ButtonsCarousel genres= {genres} handleGenreChangeButton={handleGenreChangeButton}></ButtonsCarousel>
        </>
          
           
       
    );
}

export default FormFilter;



/*function FormFilter({ handleSubmit }) {
    const [genre, setGenre] = useState('');

    const handleOnSubmit = (e) => {
        e.preventDefault();
        handleSubmit(genre);
    };

    const handleSelectChange = (e) => {
        setGenre(e.target.value);
    };

    return (
        <div>
            <form onSubmit={handleOnSubmit}>
                <label htmlFor="genre" className="form-label">Genre</label>
                <select id="genre" value={genre} onChange={handleSelectChange}>
                    <option value="">Select Genre</option>
                    <option value="action">Action</option>
                    <option value="adventure">Adventure</option>
                    {/* Otros options aquí }
                </select>
                <button type="submit">Search</button>
            </form>
        </div>
    );
}

export default FormFilter;*/