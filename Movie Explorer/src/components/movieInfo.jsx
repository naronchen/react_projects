import { useState } from "react";
import './MovieInfo.css';

const MovieInfo = ({imageUrl, overView, title}) => {
    if (imageUrl == ''){ return null}
    return (
        <div className="movie-info-container">
            <img className="movie-poster" src={imageUrl} alt="Movie Poster" />
            <div className="movie-details">
                <h3>Title: {title.substring(1)}</h3>
                <p>Overview: {overView}</p>
            </div>
        </div>
    )
}

export default MovieInfo;