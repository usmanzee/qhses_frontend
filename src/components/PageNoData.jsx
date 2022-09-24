import React from "react";
import { Typography } from "antd";
import { Link } from "react-router-dom";

const { Title } = Typography;

export const PageNoData = (props) => {
  const { message, backLink, bankText } = props;
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
        <Title level={5} style={{ fontSize: "24px" }}>
          {message ? message : "No Data Found!"}
        </Title>
        {backLink && <Link to={backLink}>{bankText}</Link>}
      </div>
    </>
  );
};
