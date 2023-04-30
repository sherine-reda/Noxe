import Axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import errimg from "../../assets/images/img-not.jpg";
export default function Tvshow() {
  const [Movies, setMovies] = useState([]);
  const [numPage, setnumPage] = useState(1);
  const [isLoading, setisLoading] = useState(false);
  async function getMovies(page) {
    setisLoading(true);
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=643a1195f74a078cff8b3ed415464bed&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=${page}`
    );
    setMovies(data.results);
    setisLoading(false);
  }
  function pageNumber(num) {
    if (num >= 1 && num <= 500) {
      setnumPage(num);
      getMovies(num);

      console.log(numPage);
    } else {
      setnumPage(1);
      getMovies(1);
    }
  }
  useEffect(() => {
    getMovies(numPage);
  }, []);

  return (
    <>
      <div className="container-fluid">
        {!isLoading ? (
          <div className="row gy-4  align-items-center justify-content-center">
            {Movies?.map((movie) => (
              <div className="col-md-3" key={movie.id}>
                <Link to={`/details/tv/${movie.id}`}>
                  <div className="card bg-light overflow-hidden ">
                    <div className="card-img-top overflow-hidden position-relative">
                      {movie.poster_path ? (
                        <img
                          className="w-100 p-2 actionMovie"
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt=""
                        />
                      ) : (
                        <img
                          className="w-100 p-2 actionMovie"
                          height={450}
                          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                          alt=""
                        />
                      )}
                      <div className="layer2 d-flex justify-content-center align-items-center text-info">
                        <div>
                          <p>Click To See More Details</p>
                        </div>
                      </div>{" "}
                    </div>
                    <div className="card-body">
                      <h2 className="h6 card-title fw-bold">{movie.name}</h2>
                      <p class="card-text text-muted">
                        {movie.overview.slice(0, 25)} ...
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
            <nav aria-label="..">
              <ul className="pagination ">
                <li className="page-item bg-light  ">
                  <Link
                    onClick={(e) => pageNumber(numPage - 1)}
                    className="page-link bg-light "
                    aria-label="Previous"
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </Link>
                </li>
                <li className="page-item " aria-current="page">
                  <Link
                    onClick={(e) => pageNumber(1)}
                    className="page-link bg-light  "
                  >
                    1
                  </Link>
                </li>
                <li className="page-item">
                  <Link
                    onClick={(e) => pageNumber(2)}
                    className="page-link bg-light "
                  >
                    2
                  </Link>
                </li>
                <li className="page-item">
                  <Link
                    onClick={() => pageNumber(3)}
                    className="page-link bg-light "
                  >
                    3
                  </Link>
                </li>
                <li className="page-item">
                  <Link className="page-link bg-light ">...</Link>
                </li>
                <li className="page-item">
                  <Link
                    onClick={() => pageNumber(500)}
                    className="page-link bg-light "
                  >
                    500
                  </Link>
                </li>
                <li className="page-item">
                  <Link
                    onClick={() => pageNumber(numPage + 1)}
                    className="page-link bg-light "
                    aria-label="Next"
                  >
                    <span aria-hidden="true">&raquo;</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        ) : (
          <div>Loading ... </div>
        )}
      </div>
    </>
  );
}
