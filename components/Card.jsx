import React from "react";
import { Link } from "react-router-dom";

const Card = ({ data }) => {
  const { image, name, id, rating, premiered } = data.show;

  return (
    <>
      <div className="card">
        <Link to={`/summary/${id}`}>
          <div className="imgContainer">
            {image ? (
              <img src={image.original} alt={name} />
            ) : (
              <div>Image not found</div>
            )}
          </div>
          <div className="details">
            <h3>{name}</h3>
            <div className="overview">
              <span>Premiered : {premiered ? premiered : "null"}</span>
              <span>Rating : {rating.average ? rating.average : "null"}</span>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Card;
