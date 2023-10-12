"use client";
import SearchMovie from "@/components/SearchMovie";
import { Movies } from "./types";
import Movie from "@/components/Movie";
import { useEffect, useState } from "react";

export default function Home() {
  const [movies, setMovies] = useState<Movies[]>([]);
  const [nameMovie, setNameMovie] = useState<string>("avengers");
  const [error, setError] = useState<string | null>(null);

  async function searchMovie(searchName: string) {
    const url = `https://www.omdbapi.com/?s=${searchName}&apikey=${process.env.NEXT_PUBLIC_APIKEY}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        setError("Movie not found!");
        return;
      }
      const data = await response.json();
      if (data.Response === "False") {
        setError(data.Error);
        return;
      }
      if (data.Search) {
        setMovies(data.Search);
        setNameMovie(searchName);
        setError(null);
      } else {
        setMovies([]);
        setNameMovie("");
        setError("No results found.");
      }
    } catch (error) {
      setError("An error occurred.");
    }
  }

  useEffect(() => {
    searchMovie(nameMovie);
  }, [nameMovie]);

  return (
    <>
      <SearchMovie getMovie={searchMovie} error={error} />
      <Movie movies={movies} />
    </>
  );
}
