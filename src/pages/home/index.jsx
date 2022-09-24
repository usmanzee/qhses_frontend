import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserApplicationsAction } from "../../redux/actions";
import { ApplicationComponent } from "../../components";
import {
  Row,
  Col,
  Card,
  message,
  Spin,
  Typography,
  Skeleton,
  Space,
} from "antd";

const { Title } = Typography;
const { Meta } = Card;

const gridStyle = {
  width: "24%",
  cursor: "pointer",
  height: 110,
  margin: "4px 4px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userApplicationsLoading = useSelector(
    (state) => state.userApplications.loading
  );
  const userApplications = useSelector((state) => state.userApplications.list);

  useEffect(() => {
    if (!userApplications.length) {
      dispatch(getUserApplicationsAction(history));
    }
  }, []);

  const renderLoadingCard = () => {
    return (
      <>
        <Card.Grid style={gridStyle}>
          <Skeleton.Avatar active size="large" />
          <Skeleton
            active
            paragraph={{ rows: 1 }}
            style={{ marginLeft: "8px" }}
          />
        </Card.Grid>
      </>
    );
  };
  return (
    <>
      <div className="contennt">
        <Row gutter={12}>
          <Col span={24}>
            <Card
              title={<Title level={4}>Applications</Title>}
              // loading={userApplicationsLoading}
            >
              {userApplicationsLoading
                ? [1, 2, 3, 4].map(() => renderLoadingCard())
                : userApplications &&
                  userApplications.map((userApplication, index) => (
                    <ApplicationComponent
                      // application={userApplication.application}
                      application={userApplication}
                    />
                  ))}
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Home;
