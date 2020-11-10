import React, { useEffect, useState } from 'react';
import './Row.css'
import axios from './axios';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer'


const base_url = "https://image.tmdb.org/t/p/original/"

function Row( {title, fetchUrl, isLargeRow } ) {
    const [ movies, setMovies ] = useState([]);
    const [ trailerUrl, setTrailerUrl ] = useState("")

    // Snippet of code which runs under certain conditions
    useEffect(() => {
        // Make a request to TMDB
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]) 

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
        
    }

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl("");
        } else {
            movieTrailer(movie?.name || movie?.title || movie?.original_title || "")
            .then((url) => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get('v'));
                console.log(urlParams.get('v'))
            })
            .catch( (error) => console.log(error))
        }
    }

    return (
        <div className="row">
            {/* Title */}
            <h2>{title}</h2>

            {/* Container -> Posters */}

            <div className="row__posters">
                {/* Posters */}
                {movies.map(movie => (
                    <img 
                    key={movie.id}
                    className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                    src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                    alt={movie.name}
                    onClick = { () => handleClick(movie)}/>
                ))}             
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}></YouTube>}
        </div>
    )
}

export default Row
