import Axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import Slider from "react-slick";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [trendingAll, settrendingAll] = useState([]);
  const [trendingMovies, settrendingMovies] = useState([]);
  const [trendingTv, settrendingTv] = useState([]);
  const [trendingPeople, settrendingPeople] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  async function getTrendingAll(type) {
    setisLoading(true);
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/${type}/day?api_key=643a1195f74a078cff8b3ed415464bed`
    );
    settrendingAll(data.results);
    setisLoading(false);
  }
  async function getTrendingMovies(type) {
    setisLoading(true);
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/${type}/day?api_key=643a1195f74a078cff8b3ed415464bed`
    );
    settrendingMovies(data.results);
    setisLoading(false);
  }
  async function getTrendingTv(type) {
    setisLoading(true);
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/${type}/day?api_key=643a1195f74a078cff8b3ed415464bed`
    );
    settrendingTv(data.results);
    setisLoading(false);
  }
  async function getTrendingPeople(type) {
    setisLoading(true);
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/${type}/day?api_key=643a1195f74a078cff8b3ed415464bed`
    );

    settrendingPeople(data?.results);
    setisLoading(false);
  }
  useEffect(() => {
    getTrendingAll("all");
    getTrendingMovies("movie");
    getTrendingTv("tv");
    getTrendingPeople("person");
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 10,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 3000,
    cssEase: "linear",
    arrows: false,
  };
  return (
    <>
      {!isLoading ? (
        <>
          <div className={styles.home}>
            <div className={styles.slider}>
              <Slider {...settings}>
                {trendingAll.map((movie) => (
                  <div className="w-100 m-0 p-0" key={movie.id}>
                    <img
                      className="w-100 "
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt=""
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
          <div className={styles.layer}> </div>
          <div className="container-fluid">
            <div className="row gy-4 mt-5 pt-5 align-items-center justify-content-center">
              <div className="col-md-3">
                <h1>Trending Movies To Watch Now</h1>
                <p className="text-muted">Most Watched Movies By Days</p>
              </div>
              {trendingMovies?.slice(0, 11).map((movie) => (
                <div className="col-md-3">
                  <Link to={`./details/movie/${movie.id}`}>
                    <div className="card bg-light overflow-hidden  ">
                      <div className="card-img-top  overflow-hidden position-relative">
                        <img
                          className="w-100  actionMovie"
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt=""
                        />
                        <div className="layer2 d-flex justify-content-center align-items-center text-info">
                          <div>
                            <p>Click To See More Details</p>
                          </div>
                        </div>{" "}
                      </div>
                      <div className="card-body">
                        <h2 className="h6 card-title fw-bold">{movie.title}</h2>
                        <p class="card-text text-muted">
                          {movie.overview.slice(0, 25)} ...
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
              <div className="col-md-3">
                <h1>Trending Tv To Watch Now</h1>
                <p className="text-muted">Most Watched Tv By Days</p>
              </div>
              {trendingTv?.slice(0, 11).map((tv) => (
                <div className="col-md-3">
                  <Link to={`./details/tv/${tv.id}`}>
                    <div className="card bg-light overflow-hidden ">
                      <div className="card-img-top overflow-hidden position-relative">
                        <img
                          className="w-100 p-2 actionMovie"
                          src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
                          alt=""
                        />
                        <div className="layer2 d-flex justify-content-center align-items-center text-info">
                          <div>
                            <p>Click To See More Details</p>
                          </div>
                        </div>{" "}
                      </div>
                      <div className="card-body">
                        <h2 className="h6 card-title fw-bold">{tv.name}</h2>
                        <p class="card-text text-muted">
                          {tv.overview.slice(0, 25)} ...
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
              <div className="col-md-3">
                <h1>Trending People </h1>
                <p className="text-muted">Most Watched People By Days</p>
              </div>
              {trendingPeople?.slice(0, 11).map((people) => (
                <div className="col-md-3">
                  <Link to={`./details/person/${people.id}`}>
                    <div className="card bg-light overflow-hidden">
                      <div className="card-img-top overflow-hidden position-relative">
                        <img
                          className="w-100 p-2 actionMovie"
                          src={`https://image.tmdb.org/t/p/w500${people?.profile_path}`}
                          alt=""
                        />
                        <div className="layer2 d-flex justify-content-center align-items-center text-info">
                          <div>
                            <p>Click To See More Details</p>
                          </div>
                        </div>{" "}
                      </div>
                      <div className="card-body">
                        <h2 className="h6 card-title fw-bold">
                          {people?.name}
                        </h2>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
