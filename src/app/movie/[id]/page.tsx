/* eslint-disable @next/next/no-img-element */
import { MovieInfo } from "@/app/types";
import Link from "next/link";

async function getMovieInfo(id: string) {
  const url = `https://www.omdbapi.com/?i=${id}&apikey=31838464`;
  const options = { method: "GET" };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function InfoMovie({ params }: { params: { id: string } }) {
  const infoMovie: MovieInfo = await getMovieInfo(params.id);

  return (
    <div className="p-4 rounded-lg lg:flex gap-8 items-center">
      <article className="flex flex-col">
        <Link
          href={"/"}
          replace={true}
          className="p-2 hover:bg-slate-900 rounded w-20 absolute top-28"
        >
          ⬅️ Back
        </Link>
        <h1 className="text-2xl font-bold mb-2 text-center mt-12">
          {infoMovie.Title}
        </h1>
        <img
          src={infoMovie.Poster}
          alt={infoMovie.Title}
          className="w-[400] mx-auto rounded-lg"
        />
      </article>
      <article className="max-w-screen-sm">
        <p className="text-sm ">Director: {infoMovie.Director}</p>
        <h2 className="text-lg mt-4">Ratings:</h2>
        <ul className="list-disc pl-4">
          {infoMovie.Ratings.map((rating, index) => (
            <li key={index}>
              <strong>{rating.Source}:</strong> {rating.Value}
            </li>
          ))}
        </ul>
        <h2 className="text-lg mt-4">Details:</h2>
        <ul className="list-disc pl-4">
          <li>
            <strong>Year:</strong> {infoMovie.Year}
          </li>
          <li>
            <strong>Rated:</strong> {infoMovie.Rated}
          </li>
          <li>
            <strong>Released:</strong> {infoMovie.Released}
          </li>
          <li>
            <strong>Runtime:</strong> {infoMovie.Runtime}
          </li>
          <li>
            <strong>Genre:</strong> {infoMovie.Genre}
          </li>
          <li>
            <strong>Actors:</strong> {infoMovie.Actors}
          </li>
          <li>
            <strong>Awards:</strong> {infoMovie.Awards}
          </li>
        </ul>
        <h2 className="text-lg mt-4">Plot:</h2>
        <p>{infoMovie.Plot}</p>
      </article>
    </div>
  );
}

export default InfoMovie;
