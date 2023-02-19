
import React from 'react';
import {useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MovieList from './components/MovieList.jsx';
import './App.css'
import MovieHeading from './components/MovieHeading.js';
import MovieListNumbered from './components/MovieListNumbered.jsx';
import InputSearch from './InputSearch.js';
import AddFav from './components/AddFav.js';
import RemoveFav from './components/RemoveFav.js';
import Pagintation from './components/Pagination.js';
import {MOVIES_PER_PAGE} from './components/utils/constants';

function App() {
 const [movies, setMovies] = useState([
  

 ]);

 const [searchValue, setSearchValue] = useState('');

 const [favs, setFavs] = useState ([]);
 //1. Creating a paginaton state
const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(0);

const getMovieRequest = async(searchValue) => {
  const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=3e5df880`;
  const response = await fetch(url);
  const responseJson = await response.json();
  if (responseJson.Search) {
    setMovies(responseJson.Search);
    setTotalPages(Math.ceil(responseJson.Search.length / MOVIES_PER_PAGE));
  } else {
    setMovies([]);
    setTotalPages(0);
  }
}

//Saving to Local Storage

const saveToLocalStorage = (items) => {
  localStorage.setItem('rect-movie-final', JSON.stringify(items))
}

const favMovies = (movie) => {
  const favMovies = [...favs, movie];
  const newFavMovies = [...new Set(favMovies)];
  setFavs(newFavMovies);
  saveToLocalStorage(newFavMovies);
}



useEffect(() => {
  const movieFavourites = JSON.parse(localStorage.getItem('rect-movie-final')
  )
  setFavs(movieFavourites);
}, []);



const series = movies.filter(movie => {
  return movie.Type  === "series"
})

const films = movies.filter(movie => {
  return movie.Type  === "movie"
})

const removeMovie = (movie) => {
   const newFav = favs.filter((fav) =>  (fav.imdbID !== movie.imdbID));  
   setFavs(newFav);
   saveToLocalStorage(newFav);
}


useEffect(() => {
  getMovieRequest(searchValue);
}, [searchValue]);


const handleClickButton = (num) => {
  setPage(num);
}



return (
    <div className = "container-fluid">
    <div className ="heading d-flex justify-content-between align-items-center">
    {movies.length> 0 ?  <MovieHeading heading = "Movies"></MovieHeading>:  <MovieHeading heading = "Search For Movies"></MovieHeading>}
    <InputSearch searchValue = {searchValue} setSearch = {setSearchValue}></InputSearch>
    </div>
    <div className = "d-flex align-items-stretch flex-nowrap mt-4 mb-4 ml-4 mr-4" >
      <MovieListNumbered  movies = {films}
      page = {page}
      favouriteComponent  = {AddFav}
      addToFav = {favMovies}></MovieListNumbered>
    </div>
 {films.length > 0 && (<Pagintation totalPages = {totalPages} handleClick = {handleClickButton}></Pagintation>)}
    
    {series.length > 0 && (
      <div>
      <MovieHeading  heading = "Series"></MovieHeading>
   
    <div className = "d-flex align-items-stretch flex-nowrap mt-4 mb-4 ml-4 mr-4">
      <MovieList movies = {series} favouriteComponent  = {AddFav}
      addToFav = {favMovies}></MovieList>
    </div>
    </div>
    )}
    {favs.length>0 && (
<div>
      <MovieHeading heading = "Favourites"></MovieHeading>

<div className = "d-flex align-items-stretch flex-nowrap mt-4 mb-4 ml-4 mr-4">
  <MovieList movies = {favs} favouriteComponent  = {RemoveFav}
  addToFav = {removeMovie}></MovieList>
</div>
</div>
      
    )}
 
   

    </div>
  );
}

export default App;
