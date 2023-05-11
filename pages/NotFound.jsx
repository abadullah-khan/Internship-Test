import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const Navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      Navigate("/");
    }, 1500);
  }, []);
  return (
    <div>
      <h1>This page doesn't exist!</h1>
      <p>you'll be redirected to the home page in 1.5seconds</p>
    </div>
  );
};
