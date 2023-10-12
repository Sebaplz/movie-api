import { Movies } from "@/app/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
/* eslint-disable @next/next/no-img-element */

function Movie({ movies }: { movies: Movies[] }) {
  const router = useRouter();
  const [category, setCategory] = useState<string>("");

  const categories: string[] = Array.from(
    new Set(movies.map((movie) => movie.Type))
  );

  const matches = category
    ? movies.filter((movie) => {
        if (category && movie.Type !== category) {
          return false;
        }
        return true;
      })
    : movies;

  return (
    <>
      <div className="mb-4">
        <label htmlFor={category}>Category: </label>
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="">all</option>
          {categories.map((categorie) => (
            <option key={categorie} value={categorie}>
              {categorie}
            </option>
          ))}
        </select>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center max-w-screen-md">
        {matches.map((movie) => (
          <li
            onClick={() => {
              router.push(`/movie/${movie.imdbID}`);
            }}
            key={movie.imdbID}
            className="flex flex-col items-center cursor-pointer hover:opacity-50"
          >
            <h2 className="truncate max-w-[14rem]">{movie.Title}</h2>
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="w-[250px] h-[350px] rounded-lg"
            />
            <span>{movie.Year}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
export default Movie;
