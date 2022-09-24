import React from "react";
import { Spin } from "antd";

export const PageLoader = () => {
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "55%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        <Spin />
      </div>
    </>
  );
};
