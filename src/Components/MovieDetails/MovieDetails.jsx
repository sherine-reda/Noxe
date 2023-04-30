import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function MovieDetails() {
  const [movieDetails, setmovieDetails] = useState([]);
  const [type, settype] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  let params = useParams();

  async function getMovieDetails(id, type) {
    setisLoading(true)
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/${type}/${id}?api_key=643a1195f74a078cff8b3ed415464bed`
    );
    setmovieDetails(data);
    setisLoading(false)

  }
  useEffect(() => {
    settype(params?.type);
    getMovieDetails(params?.id, params?.type);
  }, []);

  return (
    <>
      {!isLoading?<div className="container-fluid">
        <div className="row gy-2">
          {type === "person" ? (
            <>
              <div className="col-md-3 text-center">
                <Link to={movieDetails.homepage} target="_blank">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movieDetails?.profile_path}`}
                    alt=""
                    className="w-100 actionMovie"
                  />
                </Link>
              </div>
              <div className="col-md-9">
                <h1 className="fw-bolder mb-3">{movieDetails?.name}</h1>
                <span className="me-3  rounded-2 fw-bolder p-2 text-dark bg-main ">
                  {movieDetails?.known_for_department}
                </span>
                {movieDetails.gender === 1 ? (
                  <p className="mb-4 mt-4">Gender : Female</p>
                ) : (
                  <p className="mb-4 mt-4">Gender : Male</p>
                )}
                <p className="mb-4   ">
                  Place Of Birth : {movieDetails?.place_of_birth}
                </p>
                <p className="mb-4 ">Birth Day : {movieDetails?.birthday}</p>
                {movieDetails.deathday ? (
                  <p className="mb-4 ">Death Day : {movieDetails?.deathday}</p>
                ) : null}
                <p className="mb-4 ">Popularity : {movieDetails?.popularity}</p>
                <p className="mb-4 ">Biography : {movieDetails?.biography}</p>
              </div>
            </>
          ) : (
            <>
              <div className="col-md-3 text-center">
                <Link to={movieDetails.homepage} target="_blank">
                {movieDetails.poster_path?<img
                        className="w-100 p-2 actionMovie"
                        src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                        alt=""
                      />:<img
                      className="w-100 p-2 actionMovie"
                      // height={450}
                      src={`https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`}
                      alt=""
                    />}
                </Link>
              </div>
              <div className="col-md-9">
                {type === "movie" ? (
                  <>
                    <h1 className="fw-bolder mb-3">{movieDetails?.title}</h1>
                    <div className="mb-3">
                      
                      <span className="fw-bolder  rounded-2 p-1 bg-danger">Movie</span>
                    </div>
                  </>
                ) : (
                 <>
                  <h1 className="fw-bolder mb-3">{movieDetails?.name}</h1>
                  <div className="mb-3">
                      
                      <span className="fw-bolder  rounded-2 p-1 bg-danger">Tv Show</span>
                    </div>
                 </>
                )}
                {movieDetails?.genres?.map((genre) => (
                  <span
                    key={genre.id}
                    className="me-3 rounded-2 fw-bolder p-2 text-dark bg-main "
                  >
                    {genre.name}
                  </span>
                ))}
                <div className="mt-4">
                  <span className="text-uppercase  rounded-2 bg-warning p-1 text-dark fw-bolder">
                    {movieDetails?.original_language}
                  </span>
                </div>
                <p className="mt-3">Vote : {movieDetails?.vote_average}</p>
                <p className="mt-3">Vote Count : {movieDetails?.vote_count}</p>
                <p className="mt-3">popularity : {movieDetails?.popularity}</p>
                {type === "movie" ? (
                  <>
                    <p className="mt-3">
                      release Date : {movieDetails?.release_date}
                    </p>
                    <p className="mt-3">
                      Duration : {movieDetails?.runtime} Min
                    </p>
                  </>
                ) : (
                  <>
                    <p className="mt-3">
                      first Air Date : {movieDetails?.first_air_date}
                    </p>{" "}
                    <p className="mt-3">
                      Number of Episodes : {movieDetails?.number_of_episodes}{" "}
                    </p>
                    <p className="mt-3">
                      Number of Seasons : {movieDetails?.number_of_seasons}{" "}
                    </p>
                  </>
                )}
                <p className="mt-3">Status : {movieDetails.status}</p>

                <p className="mt-3">overview : {movieDetails?.overview}</p>
                <p></p>
              </div>
            </>
          )}
        </div>
      </div>:<div>Loading...</div>}
    </>
  );
}
