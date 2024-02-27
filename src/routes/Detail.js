import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import Movie from "../components/Movie";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState([]);
  // console.log({ id });
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    // console.log(json);
    setInfo(json.data.movie);
    // console.log(json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.loader}>
          <h1>Loading...</h1>
        </div>
      ) : (
        <div className={styles.movies}>
          <Movie
            id={info.id}
            year={info.year}
            coverImg={info.medium_cover_image}
            title={info.title}
            summary={info.description_full}
            genres={info.genres || []}
          />
        </div>
      )}
    </div>
  );
}

export default Detail;
