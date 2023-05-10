import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SummeryPage from "./pages/SummeryPage";

import "./styles/global.css";
import "./styles/card.css";
import "./styles/home.css";
import "./styles/summary.css";

const QuadB_App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<HomePage />} />
          <Route path={"/summary/:id"} element={<SummeryPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default QuadB_App;
