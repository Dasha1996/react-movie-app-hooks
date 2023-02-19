import React from 'react';
import {MOVIES_PER_PAGE} from "./utils/constants";
const MovieList = (props) => {
    const AddFav = props.favouriteComponent;
    //pagination
    const page = props.page;
    const startIndex = (page -1)*MOVIES_PER_PAGE
    const selectedMovies = props.movies.slice(startIndex, startIndex+MOVIES_PER_PAGE);
    //end of pagination


    return (
        <>
            {selectedMovies.map((movie, index)=> {
              
                return (
                <div className = "d-inline-flex flex-column justify-content-between movie-box  m-2">
                <img src = {movie.Poster} alt = {movie.Title}/> 
                <div 
                className = "box d-flex flex-column justify-content-end">
                <div
                onClick = {() => props.addToFav(movie) }>
                <AddFav ></AddFav>
                </div>
                <p>{movie.Title}</p>
                <p className = "mb-0">{movie.Year}</p>
                </div>
                </div>
                )
            })}
        </>
    )
}

export default MovieList;