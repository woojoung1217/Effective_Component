import React from "react";

import "./Card.scss";

interface CardProps {
  title: string;
  image: string;
  description: string;
  link?: string;
}

const Card: React.FC<CardProps> = ({ title, image, description, link }) => {
  return (
    <div className="card">
      <img src={image} alt={title} className="card__image" />
      <div className="card__content">
        <h3 className="card__title">{title}</h3>
        <p className="card__description">{description}</p>
        <a href={link} className="card__link">
          Learn More
        </a>
      </div>
    </div>
  );
};

export default Card;
