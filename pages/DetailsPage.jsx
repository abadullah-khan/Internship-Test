import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const DetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialState, setInitialState] = useState({
    isLoading: false,
    show: {},
    error: false,
  });
  const [formState, setFormState] = useState({
    isVisible: false,
    data: {
      show: "",
      runtime: "",
      name: "",
      email: "",
    },
  });
  const [submit, setSubmit] = useState(true);
  const [counter, setCounter] = useState(3);
  useEffect(() => {
    setInitialState({ ...initialState, isLoading: true });
    axios
      .get(`https://api.tvmaze.com/shows/${id}`)
      .then((res) => {
        setInitialState({ ...initialState, isLoading: false, show: res.data });
        setFormState({
          ...formState,
          data: {
            ...formState.data,
            show: res.data.name,
            runtime: res.data.runtime ? res.data.runtime : "unknown",
          },
        });
      })
      .catch((error) =>
        setInitialState({ ...initialState, isLoading: false, error: error })
      );
  }, [id]);
  if (!initialState.show) {
    return <div>Loading...</div>;
  }
  const handleInput = (e) => {
    const { name, value } = e.target;

    setFormState({
      ...formState,
      data: { ...formState.data, [name]: value },
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("ticketData", JSON.stringify(formState.data));
    setSubmit(false);
    handleRedirect();
  };
  const handleRedirect = () => {
    const timer = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      navigate(`/`);
    }, 3000);
  };
  const {
    name,
    image,
    genres,
    language,
    premiered,
    rating,
    runtime,
    status,
    summary,
  } = initialState.show || {};
  return (
    <>
      <div className="detailsPage">
        {submit ? (
          <>
            <div className="wrapper">
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
                    Genre : <span>{genres?.join(", ")}</span>
                  </p>
                  <p>
                    Language : <span> {language} </span>{" "}
                  </p>
                  <p>
                    Premiered : <span> {premiered} </span>{" "}
                  </p>
                  <p>
                    Rating : <span> {rating ? rating.average : "null"} </span>{" "}
                  </p>
                  <p>
                    Status : <span> {status} </span>
                  </p>
                  <span>Summary : </span>
                  <div
                    className="summary"
                    dangerouslySetInnerHTML={{ __html: summary }}
                  />
                </div>

                <button
                  onClick={() =>
                    setFormState({
                      ...formState,
                      isVisible: !formState.isVisible,
                    })
                  }
                >
                  Book Movie
                </button>
              </div>
            </div>
            {formState.isVisible && (
              <form
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                <div>
                  <label htmlFor="">Show name :</label>
                  <input
                    type="text"
                    name="show"
                    value={formState.data.show}
                    readOnly
                  />
                </div>
                <div>
                  <label htmlFor="">Run time :</label>
                  <input
                    type="text"
                    name="runtime"
                    value={formState.data.runtime}
                    readOnly
                  />
                </div>
                <div>
                  <label htmlFor="name">Viewer's name :</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    required
                    autoComplete="off"
                    id="name"
                    name="name"
                    value={formState.data.name}
                    onChange={(e) => {
                      handleInput(e);
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="email">Email id :</label>
                  <input
                    type="email"
                    placeholder="Your email"
                    id="email"
                    required
                    autoComplete="off"
                    name="email"
                    value={formState.data.email}
                    onChange={(e) => {
                      handleInput(e);
                    }}
                  />
                </div>
                <div>
                  <button type="submit">Submit</button>
                </div>
              </form>
            )}
          </>
        ) : (
          <div className="submitMessage">
            <p>Booking Successful! </p>
            <p>you'll be redirected to the home page in {counter} seconds</p>
          </div>
        )}
      </div>
    </>
  );
};

export default DetailsPage;
