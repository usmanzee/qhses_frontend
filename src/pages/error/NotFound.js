import React from "react";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <>
      <div
        style={{
          height: "100%",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "24px" }}>404 | Not Found!</h1>
          <Link to="/">Go to Dashboard</Link>
        </div>
      </div>
    </>
  );
};
