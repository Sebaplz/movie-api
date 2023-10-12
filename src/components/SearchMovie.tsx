import { useState } from "react";

interface Props {
  getMovie: (nameMovie: string) => Promise<void>;
  error: any;
}

function SearchMovie({ getMovie, error }: Props) {
  const [movie, setMovie] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    if (!movie) return;
    await getMovie(movie);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-[#4a515f] rounded-lg flex items-center justify-between p-2 my-4 mx-auto"
      >
        🔍
        <input
          onChange={(e) => setMovie(e.target.value)}
          name="movie"
          type="text"
          placeholder="Search Movie..."
          className="bg-inherit placeholder:text-white p-2 text-white w-full mx-2"
        />
        <button className="p-2 bg-[#2e3c4b] rounded-md text-white">
          Search
        </button>
      </form>
      <span className="text-red-600 flex justify-center pb-4">{error}</span>
    </>
  );
}
export default SearchMovie;
