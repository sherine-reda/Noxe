import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import errImage from "../../assets/images/img-not.jpg";
export default function Search() {
  const [resultSearch, setresultSearch] = useState([]);
  async function getSearch(text) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/search/multi?api_key=48d62e7452a1f1a5e6018217ac27c50a&language=en-US&query=${text}&page=1&include_adult=false `
    );
    setresultSearch(data.results);
  }
  function handelChange(x) {
    getSearch(x);
  }
  return (
    <>
      <div className="container text-center mt-5  pt-4">
        <input
          type="text"
          className="form-control"
          onChange={(e) => handelChange(e.target.value)}
          placeholder="Search..."
        />
      </div>
      <div className="container-fluid">
        <div className="row">
          {resultSearch?.map((result) => (
            <div className="col-md-3 mt-5">
              {result.media_type === "person" ? (
                <Link to={`/details/person/${result.id}`}>
                  <div className="card bg-light overflow-hidden">
                    <div className="card-img-top overflow-hidden position-relative">
                      {result?.profile_path ? (
                        <img
                          className="w-100 p-2 actionMovie"
                          src={`https://image.tmdb.org/t/p/w500${result?.profile_path}`}
                          alt=""
                        />
                      ) : (
                        <img
                          className="w-100 p-2 actionMovie"
                          src={errImage}
                          height={490}
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
                      <h2 className="h6 card-title fw-bold">{result?.name}</h2>
                    </div>
                    <div className="card-footer text-center fs-sm">
                      <p className="fs-6 mt-2 ">
                        MEDIA TYPE :{" "}
                        <span className="bg-warning rounded-2 p-1">
                          {result?.media_type}
                        </span>
                      </p>
                    </div>
                  </div>
                </Link>
              ) : (
                <>
                  {result.media_type === "movie" ? (
                    <Link to={`/details/movie/${result?.id}`}>
                      <div className="card bg-light overflow-hidden ">
                        <div className="card-img-top  overflow-hidden position-relative">
                        {result?.poster_path ? (
                        <img
                          className="w-100 p-2 actionMovie"
                          src={`https://image.tmdb.org/t/p/w500${result?.poster_path}`}
                          alt=""
                        />
                      ) : (
                        <img
                          className="w-100 p-2 actionMovie"
                          src={errImage}
                          height={490}
                          alt=""
                        />
                      )}
                          
                          <div className="layer2 d-flex justify-content-center align-items-center text-info">
                            <div>
                              <p>Click To See More Details</p>
                            </div>
                          </div>
                        </div>
                        <div className="card-body">
                          <h2 className="h6 card-title fw-bold">
                            {result?.title}
                          </h2>
                          <p class="card-text text-muted">
                            {result?.overview?.slice(0, 25)} ...
                          </p>
                        </div>
                        <div className="card-footer text-center fs-sm">
                          <p className="fs-6 mt-2 ">
                            MEDIA TYPE :{" "}
                            <span className="bg-warning rounded-2 p-1">
                              {result?.media_type}
                            </span>
                          </p>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <Link to={`/details/tv/${result?.id}`}>
                      <div className="card bg-light overflow-hidden ">
                        <div className="card-img-top overflow-hidden position-relative">
                        {result?.poster_path ? (
                        <img
                          className="w-100 p-2 actionMovie"
                          src={`https://image.tmdb.org/t/p/w500${result?.poster_path}`}
                          alt=""
                        />
                      ) : (
                        <img
                          className="w-100 p-2 actionMovie"
                          src={errImage}
                          height={490}
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
                          <h2 className="h6 card-title fw-bold">
                            {result?.name}
                          </h2>
                          <p class="card-text text-muted">
                            {result?.overview?.slice(0, 25)} ...
                          </p>
                        </div>
                        <div className="card-footer text-center fs-sm">
                          <p className="fs-6 mt-2 ">
                            MEDIA TYPE :{" "}
                            <span className="bg-warning rounded-2 p-1">
                              {result?.media_type}
                            </span>
                          </p>
                        </div>
                      </div>
                    </Link>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
