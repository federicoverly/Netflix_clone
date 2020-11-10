import React, { useEffect, useState } from 'react';
import './Banner.css';
import axios from './axios';
import requests from './requests';

function Banner() {
    const [ movie, setMovie ] = useState([])

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchTrending);
            setMovie(request.data.results[Math.floor(Math.random() * request.data.results.length-1)])
        }
        fetchData()
    }, [])

    console.log(movie)

    function truncated ( str, n) {
        return str?.length > n ? str.substr(0, n-1) + "..." : str;
    }

    return (
        <header className="banner" style={{
            backgroundSize: "cover",
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
            backgroundPosition: "center center"
        }}> {/* Background Image */}
           
            <div className="banner__contents">
                {/* Title */}
                <h1 className="banner__title">{movie?.title || movie?.name || movie?.original_name}</h1>

                {/* Div -> 2 buttons */}
                <div className="banner__buttons">
                    <button className="banner__button">Play</button>
                    <button className="banner__button">My List</button>
                </div>
                {/* Description */}
                <h1 className="banner__description">
                    {truncated(movie?.overview, 150)}
                </h1>

            </div>

           <div className="banner__fadeButton"></div>
            
        </header>
    )
}

export default Banner
