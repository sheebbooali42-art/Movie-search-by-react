import React, { useEffect, useState } from "react";
import MoviesCard from "./MovieCard";

const TOPAPIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?api_key=04c35731a5ee918f014970082a0088b1&query=";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

   
  const getMovies = async (url) => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await res.json();
      setMovies(data.results || []);
    } catch (err) {
      setError("Something went wrong or network issue 😢");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    getMovies(TOPAPIURL);
  }, []);

  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (search.trim() === "") {
        getMovies(TOPAPIURL);
      } else {
        getMovies(SEARCHAPI + search);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="container py-4">
   
      <input
        type="text"
        className="form-control form-control-lg mb-4"
        placeholder="Search movies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {error && <h4 className="text-danger">{error}</h4>}
      {loading && <h4>Loading...</h4>}
      <div className="row g-4">
        {!loading &&
          !error &&
          movies.map((movie) => (
            <MoviesCard
              key={movie.id}
              title={movie.title}
              poster_path={movie.poster_path}
              vote_average={movie.vote_average}
            />
          ))}
      </div>
    </div>
  );
}