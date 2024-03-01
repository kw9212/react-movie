import { useEffect, useState } from "react";
import Movie from "../components/Movie";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [searchResult, setSearchResults] = useState(
    new URL(document.location).searchParams.get("search") || ""
  );

  const navigate = useNavigate();

  const onChange = (event) => {
    setSearchResults(event.target.value);
    //    console.log(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(searchResult);
    // navigate(searchResult);
    // let params = new URL(document.location).searchParams;
    // console.log(params.get(search));
    const url = "/react-movie?search=" + searchResult;
    window.open(url, "_self");
    // navigate(url);
  };

  const getMovies = async () => {
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.5/sort_by=year`
      )
    ).json();

    let movies = json.data.movies;
    movies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchResult.toLowerCase())
    );

    setMovies(movies);
    setLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.loader}>
          <span>Loading...</span>
        </div>
      ) : (
        <div className={styles.movies}>
          <form action="" method="GET" name="movie" onSubmit={handleSubmit}>
            <input
              placeholder="Title..."
              type="text"
              value={searchResult}
              onChange={onChange}
            ></input>
            <button type="submit">submit</button>
          </form>
          {movies
            // .filter((movie) =>
            //   movie.title.toLowerCase().includes(searchResult.toLowerCase())
            // )
            .map((movie) => (
              <Movie
                key={movie.id}
                id={movie.id}
                year={movie.year}
                coverImg={movie.medium_cover_image}
                title={movie.title}
                summary={movie.summary}
                genres={movie.genres}
              />
            ))}
        </div>
      )}
    </div>
  );
}

export default Home;
