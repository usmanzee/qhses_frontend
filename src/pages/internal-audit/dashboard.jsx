import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import drilldown from "highcharts/modules/drilldown";
import { getProfileAction } from "../../redux/actions";

drilldown(Highcharts);

const InternalAuditDashboard = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const profileFetch = useSelector((state) => state.profile.loading);
  const profile = useSelector((state) => state.profile.data);

  useEffect(() => {
    if (!profile) {
      // dispatch(getProfileAction(history));
    }
  }, [profile]);

  return (
    <>
      <div className="dashboard-content">
        <Row>
          <Col span={12} style={{ padding: "0px 4px 8px 0px" }}>
            This is Internal Audit Dashboard
          </Col>
        </Row>
      </div>
    </>
  );
};

export default InternalAuditDashboard;
