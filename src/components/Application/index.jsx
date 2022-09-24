import React from "react";
import { Card, message, Typography } from "antd";
import { useHistory } from "react-router-dom";
import { CustomIcon } from "..";
import { useDispatch } from "react-redux";

import types from "../../redux/types";

import { getAuthToken } from "../../utils/common";

const gridStyle = {
  width: "24%",
  cursor: "pointer",
  height: 110,
  margin: "4px 4px",
  display: "flex",
  // justifyContent: "center",
  alignItems: "center",
};

const { Title, Text } = Typography;

export const ApplicationComponent = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { application } = props;
  return (
    <>
      <Card.Grid
        style={gridStyle}
        onClick={() => {
          if (application.users_table_name) {
            window.open(
              `${application.app_auth_url}/${getAuthToken()}`,
              "_blank"
            );
          } else {
            dispatch({
              type: types.SELECTED_USER_APPLICATIONS_DATA,
              payload: application,
            });
            history.push(application.route);
          }
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <CustomIcon
            type={application.antd_icon_name}
            style={{ fontSize: "40px", color: "#1DA57A" }}
          />
          <Text style={{ marginLeft: "6px" }}>{application.title}</Text>
        </div>
      </Card.Grid>
    </>
  );
};
