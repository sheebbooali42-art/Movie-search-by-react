import React from "react";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
export default function MoviesCard({ title, poster_path, vote_average }) {
  return (
    <div className="col-md-3">
      <div className="card shadow-sm h-100">
        <img
          src={
            poster_path
              ? IMGPATH + poster_path
              : "https://via.placeholder.com/300x450"
          }
          alt={title}
          className="card-img-top"
        />
               <div className="card-body d-flex justify-content-between">
          <h6 className="card-title">{title}</h6>
          <span className="badge bg-success">{vote_average}</span>
        </div>
      </div>
    </div>
  );
}