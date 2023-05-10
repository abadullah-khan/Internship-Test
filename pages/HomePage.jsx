import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";

const HomePage = () => {
  const [initialState, setInitialState] = useState({
    isLoading: false,
    shows: [],
    error: false,
  });
  useEffect(() => {
    setInitialState({ ...initialState, isLoading: true });
    axios
      .get(`https://api.tvmaze.com/search/shows?q=all`)
      .then((res) =>
        setInitialState({ ...initialState, isLoading: false, shows: res.data })
      )
      .catch((error) =>
        setInitialState({ ...initialState, isLoading: false, error: error })
      );
  }, []);
  console.log(initialState.shows);
  return (
    <>
      <div className="home">
        <div className="cardContainer">
          {!initialState.error &&
            initialState.shows.map((show) => {
              return <Card data={show} key={show.show.id} />;
            })}{" "}
        </div>
      </div>
    </>
  );
};

export default HomePage;
