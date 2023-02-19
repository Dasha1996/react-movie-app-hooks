import React from 'react';
const MovieList = (props) => {
    const AddFav = props.favouriteComponent;

    return (
        <>
            {props.movies.map((movie, index)=> {
              
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