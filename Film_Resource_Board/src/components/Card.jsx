import React from "react";

const Card = ({name, tags, rating, imgUrl, link}) => {
    const renderStars = () => {
        const fullstar_cnt = Math.floor(rating/2)
        const halfStars_cnt = rating % 2 === 1 ? 1 : 0
        const stars = [];
        for (let i = 0; i < fullstar_cnt; i++){
            stars.push(<img key={`full-star-${i}`} src="./src/assets/fullstar.jpeg" alt="Full star" width="40" height="40"/> )
        }
        for (let i = 0; i < halfStars_cnt; i++){
            stars.push(<img key={`half-star-${i}`} src="./src/assets/halfstar.jpeg" alt="half star" width="40" height="40"/> )
        }
        return stars
    }
    return (
        <div className="Card">
            <img src={imgUrl} alt={name} className="card__image" />
            <div className="card__content">
                <h2 className="card__name">{name}</h2>
                <p className="card__tag">{tags}</p>
                <p className="card__rating">{renderStars()}</p>
                <a href={link} className="card__button">Learn More</a>
            </div>
        </div>
    )
}
export default Card;