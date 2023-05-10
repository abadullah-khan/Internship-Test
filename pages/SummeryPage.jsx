import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SummeryPage = () => {
  const { id } = useParams();
  const [initialState, setInitialState] = useState({
    isLoading: false,
    show: {},
    error: false,
  });
  useEffect(() => {
    setInitialState({ ...initialState, isLoading: true });
    axios
      .get(`https://api.tvmaze.com/shows/${id}`)
      .then((res) =>
        setInitialState({ ...initialState, isLoading: false, show: res.data })
      )
      .catch((error) =>
        setInitialState({ ...initialState, isLoading: false, error: error })
      );
  }, [id]);
  if (!initialState.show) {
    return <div>Loading...</div>;
    // return;
  }
  const { name, image, genres, language, premiered, rating } =
    initialState.show || {};
  console.log(initialState);
  return (
    <>
      <div className="detailsPage">
        {/* <div className="container"> */}

        <div className="poster">
          {image ? (
            <img src={image.original} alt={name} />
          ) : (
            <h2>image not found</h2>
          )}
        </div>
        <div className="details">
          <h2>{name}</h2>
          <div className="subDetails">
            <p>
              Genre :{" "}
              {genres.map((genre) => (
                <span>{genre},</span>
              ))}
            </p>
            <p>Language : {language}</p>
            <p>Premiered : {premiered}</p>
            <p>Rating : {rating.average}</p>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default SummeryPage;
// import React, { useEffect, useState } from "react";

// const SummeryPage = () => {
//   const [initialState, setInitialState] = useState({
//     isLoading: false,
//     show: {},
//     error: false,
//   });
//   const { id } = useParams();
//   useEffect(() => {
//     axios
//       .get(`https://api.tvmaze.com/shows/${id}`)
//       .then((res) =>
//         setInitialState({ ...initialState, isLoading: false, show: res })
//       )
//       .catch((error) =>
//         setInitialState({ ...initialState, isLoading: false, error: error })
//       );
//     console.log(initialState.show);
//   }, [id]);
//   return <div>SummeryPage</div>;
// };

// export default SummeryPage;
