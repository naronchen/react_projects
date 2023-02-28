import React from "react";

const Card = (name, description, rating, imageUrl, link) => {
    return (
        <div className="Card">
            <img src={imageUrl} alt={name} className="film-card__image" />
            <div className="film-card__content">
                <h2 className="film-card__name">{name}</h2>
                <p className="film-card__description">{description}</p>
                <p className="film-card__rating">{rating}</p>
                <a href={link} className="film-card__button button">Learn More</a>
            </div>
        </div>
    )
}
export default Card;