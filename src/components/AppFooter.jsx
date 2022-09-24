import React from "react";
import { Layout } from "antd";

const { Footer } = Layout;

export const AppFooter = () => {
  return (
    <>
      <Footer
        style={{
          textAlign: "center",
          bottom: "0",
          width: "100%",
        }}
      >
        Copyright © 2022
      </Footer>
    </>
  );
};
