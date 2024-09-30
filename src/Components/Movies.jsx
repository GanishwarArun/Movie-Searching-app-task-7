import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDebouncedCallback } from "use-debounce";
import Search from "./Search";
import Details from "./Details";
import { CardBody, CardContainer, CardItem } from "../utils/3dCard";
import PlaceHolder from "/watching.png";
import toast from "react-hot-toast";

const Movies = () => {
  const [movies, setMovies] = useState({
    results: [],
    selected: {},
  });
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const apiurl = "http://www.omdbapi.com/";
  const apiKey = "84411acf";

  const fetchMovies = async (searchTerm) => {
    if (searchTerm.trim() === "") return;

    setIsLoading(true);
    const fullUrl = `${apiurl}?apikey=${apiKey}&s=${encodeURIComponent(
      searchTerm
    )}`;
    console.log("API URL:", fullUrl);

    try {
      const response = await axios.get(fullUrl);
      const data = response.data;

      if (data.Response === "True") {
        setMovies((prevState) => ({
          ...prevState,
          results: data.Search,
        }));
      } else {
        toast.error(data.Error || "An error occurred", {
          position: "bottom-center",
        });
        setMovies((prevState) => ({
          ...prevState,
          results: [],
          selected: {},
        }));
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      console.error(
        "Error details:",
        error.response ? error.response.data : "No response data"
      );
      toast.error("Failed to fetch movies. Please try again.", {
        position: "bottom-center",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies("avengers"); 
  }, []);

  const handleChange = (value) => {
    setSearch(value);
    searchHandler(value.trim());
  };

  const searchHandler = useDebouncedCallback((search) => {
    fetchMovies(search);
  }, 800);

  const openDetail = async (id) => {
    const fullUrl = `${apiurl}?apikey=${apiKey}&i=${id}&plot=full`;
    console.log("Detail API URL:", fullUrl);

    try {
      const response = await axios.get(fullUrl);
      const data = response.data;
      setMovies((prevState) => ({
        ...prevState,
        selected: data,
      }));
    } catch (error) {
      console.error("Error fetching movie details:", error);
      console.error(
        "Error details:",
        error.response ? error.response.data : "No response data"
      );
      toast.error("Failed to fetch movie details. Please try again.", {
        position: "bottom-center",
      });
    }
  };

  const closeDetail = () => {
    setMovies((prevState) => ({
      ...prevState,
      selected: {},
    }));
  };

  return (
    <>
      <Search search={search} handleChange={handleChange} />
      <div className="flex flex-row flex-wrap justify-center gap-6">
        {isLoading ? (
          <div>Loading...</div>
        ) : movies.results.length > 0 ? (
          <>
            {movies.results.map((movie) => (
              <div
                key={movie.imdbID}
                className="flex flex-col items-center gap-2 text-left cursor-pointer"
                onClick={() => openDetail(movie.imdbID)}
              >
                <CardContainer className="inter-var">
                  <CardBody className="bg-slate-50 dark:bg-[#1c1722] relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:border-white/[0.2] border-slate-900/[0.2] border-2 rounded-xl p-4 max-w-sm w-full mx-auto">
                    <CardItem
                      translateZ="50"
                      className="text-lg sm:text-xl font-bold text-neutral-800 dark:text-slate-100 truncate w-full"
                    >
                      {movie.Title}
                    </CardItem>
                    <CardItem translateZ="100" className="w-full mt-4">
                      <img
                        src={
                          movie.Poster !== "N/A" ? movie.Poster : PlaceHolder
                        }
                        width={200}
                        style={{ height: "250px", objectFit: "cover" }}
                        className="w-full rounded-xl group-hover/card:shadow-xl border border-slate-100 dark:border-[#120e16]"
                        alt="Movie Poster"
                      />
                    </CardItem>
                  </CardBody>
                </CardContainer>
              </div>
            ))}
          </>
        ) : (
          <img src={PlaceHolder} alt="Placeholder" width={500} />
        )}
      </div>
      {typeof movies.selected.Title !== "undefined" && (
        <Details selected={movies.selected} closeDetail={closeDetail} />
      )}
    </>
  );
};

export default Movies;
