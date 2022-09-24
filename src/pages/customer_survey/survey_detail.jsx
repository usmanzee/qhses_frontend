import React, { useState, useEffect } from "react";
import moment from "moment";

import {
  Row,
  Col,
  Spin,
  Card,
  Table,
  PageHeader,
  Descriptions,
  Tag,
  Typography,
  Modal,
  Button,
  Rate,
  Avatar,
  Divider,
  message,
} from "antd";
import { UserOutlined } from "@ant-design/icons";

import { useHistory, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { CustomerFeedbackPdfReport } from "../../components";

import {
  getUsersAction,
  getCompaniesAction,
  getYearsAction,
  getQuatersAction,
  getSurveyDetailAction,
  sendSurveyReminderToUserAction,
} from "../../redux/actions";

const { Title, Text } = Typography;

const CustomerSurveyDetail = () => {
  const dateFormat = "YYYY-MM-DD";
  const history = useHistory();
  const params = useParams();
  const location = useLocation();
  const search = location.search;
  let urlParams = new URLSearchParams(search);
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [averageRating, setAverageRating] = useState(false);
  const [surveyFeedbackDetail, setSurveyFeedbackDetail] = useState(false);

  const [surveyUsers, setSurveyUsers] = useState([]);

  const usersLoading = useSelector((state) => state.users.loading);
  const users = useSelector((state) => state.users.list);

  const companiesLoading = useSelector((state) => state.companies.loading);
  const companies = useSelector((state) => state.companies.list);

  const yearsLoading = useSelector((state) => state.years.loading);
  const years = useSelector((state) => state.years.list);

  const quatersLoading = useSelector((state) => state.quaters.loading);
  const quaters = useSelector((state) => state.quaters.list);

  const surveyDetailLoading = useSelector(
    (state) => state.surveys.surveyDetailLoading
  );
  const surveyDetail = useSelector((state) => state.surveys.surveyDetail);

  const surveyReminderLoading = useSelector(
    (state) => state.surveyReminder.loading
  );

  useEffect(() => {
    if (surveyDetail) {
      let usersData = surveyDetail.users;
      let feedbacksData = surveyDetail.feedbacks;
      const newUsersData = usersData.map((userDetail) => {
        const userExists = feedbacksData.find(
          (feedback) => feedback.user_id === userDetail.id
        );
        return {
          ...userDetail,
          submitted: userExists ? true : false,
        };
      });
      setSurveyUsers(newUsersData);
    }
  }, [surveyDetail]);

  useEffect(() => {
    dispatch(getSurveyDetailAction(params.id, history));
  }, []);

  useEffect(() => {
    dispatch(getUsersAction(history, true));
    dispatch(getCompaniesAction(history));
    dispatch(getYearsAction(history));
    dispatch(getQuatersAction(history));
  }, []);

  useEffect(() => {
    const feedbackUserId = urlParams.get("feedbackUserId");
    if (feedbackUserId && surveyDetail) {
      setUserSurveyFeedbackDetail(parseInt(feedbackUserId));
    }
  }, [surveyDetail]);

  const setUserSurveyFeedbackDetail = (userId) => {
    if (surveyDetail) {
      const userSurveyFeedback = surveyDetail.feedbacks.find(
        (feedback) => feedback.user_id === userId
      );
      let average = 0;
      let total = 0;
      let rating = 0;

      if (!userSurveyFeedback)
        return message.error("Error while getting user feedback details!");

      userSurveyFeedback.answers.forEach((answer) => {
        total = total + 5;
        rating = rating + answer.rating;
      });
      average = (rating / total) * 5;
      setAverageRating(average.toFixed(2));
      setSurveyFeedbackDetail(userSurveyFeedback);
      setVisible(true);
    }
  };

  const columns = [
    {
      title: "Sr#",
      dataIndex: "id",
      fixed: "left",
      render: (value, row, index) => {
        return index + 1;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text, row) => {
        return <>{row.name}</>;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (text, row) => {
        return <>{row.email}</>;
      },
    },
    {
      title: "Department",
      dataIndex: "department",
      render: (text, row) => {
        return <>{row.department}</>;
      },
    },
    {
      title: "Submitted",
      dataIndex: "submitted",
      render: (text, row) => {
        return (
          <>
            {row.submitted ? (
              <Tag color="green">Yes</Tag>
            ) : (
              <Tag color="red">No</Tag>
            )}
          </>
        );
      },
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 150,
      render: (text, row) =>
        row.submitted ? (
          <Button
            size="small"
            type="link"
            onClick={() => {
              setUserSurveyFeedbackDetail(row.id);
            }}
          >
            Summary
          </Button>
        ) : (
          <Button
            size="small"
            type="link"
            loading={surveyReminderLoading}
            onClick={() => {
              const userId = row.id;
              dispatch(
                sendSurveyReminderToUserAction(surveyDetail.id, userId, history)
              );
            }}
          >
            Send Reminder
          </Button>
        ),
    },
  ];

  return (
    <>
      <div>
        {usersLoading &&
        companiesLoading &&
        yearsLoading &&
        quatersLoading &&
        surveyDetailLoading &&
        surveyReminderLoading ? (
          <div style={{ textAlign: "center", padding: "24px" }}>
            <Spin />
          </div>
        ) : (
          <div>
            <Card style={{ borderRadius: "8px" }}>
              <Row
                style={{
                  border: "1px solid #ededed",
                  borderRadius: "8px",
                  padding: "4px",
                  marginBottom: "16px",
                }}
              >
                <Col>
                  <PageHeader
                    ghost={false}
                    title={surveyDetail && surveyDetail.title}
                  >
                    <Descriptions size="small" column={6}>
                      <Descriptions.Item label="Created By">
                        {surveyDetail && surveyDetail.user ? (
                          <Text strong>{surveyDetail.user.name}</Text>
                        ) : (
                          ""
                        )}
                      </Descriptions.Item>
                      <Descriptions.Item label="Year">
                        {surveyDetail && surveyDetail.year ? (
                          <Text strong>{surveyDetail.year.year}</Text>
                        ) : (
                          ""
                        )}
                      </Descriptions.Item>
                      <Descriptions.Item label="Company">
                        {surveyDetail && surveyDetail.company ? (
                          <Text strong>{surveyDetail.company.name}</Text>
                        ) : (
                          ""
                        )}
                      </Descriptions.Item>
                      <Descriptions.Item label="Created At">
                        <Text strong>
                          {surveyDetail &&
                            moment(surveyDetail.createdAt).format(dateFormat)}
                        </Text>
                      </Descriptions.Item>
                      <Descriptions.Item label="Sent To">
                        {surveyDetail && surveyDetail.users ? (
                          <Text
                            strong
                          >{`${surveyDetail.users.length} users`}</Text>
                        ) : (
                          ""
                        )}
                      </Descriptions.Item>
                      <Descriptions.Item label="Submitted By">
                        {surveyDetail && surveyDetail.feedbacks ? (
                          <Text
                            strong
                          >{`${surveyDetail.feedbacks.length} users`}</Text>
                        ) : (
                          ""
                        )}
                      </Descriptions.Item>
                    </Descriptions>
                  </PageHeader>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Table
                    columns={columns}
                    dataSource={surveyUsers ? surveyUsers : []}
                    bordered
                    rowKey="id"
                    size="middle"
                    scroll={{ x: "calc(700px + 50%)" }}
                    loading={{
                      indicator: (
                        <div>
                          <Spin />
                        </div>
                      ),
                      spinning: surveyDetailLoading,
                    }}
                    pagination={false}
                  />
                </Col>
              </Row>
            </Card>

            <Modal
              closable={false}
              title={
                <Row justify="space-between">
                  <Col>Feedback Summary</Col>
                  <Col>
                    <CustomerFeedbackPdfReport
                      surveyDetail={surveyDetail}
                      surveyFeedbackDetail={surveyFeedbackDetail}
                    />
                  </Col>
                </Row>
              }
              centered
              visible={visible}
              onOk={() => setVisible(false)}
              onCancel={() => setVisible(false)}
              width={1000}
            >
              <Row justify="space-between">
                <Col style={{ display: "flex", alignItems: "center" }}>
                  <Avatar size={40} icon={<UserOutlined />} />
                  <div style={{ paddingLeft: "10px" }}>
                    <Text ellipsis={true}>
                      {surveyFeedbackDetail &&
                        surveyFeedbackDetail.user &&
                        surveyFeedbackDetail.user.name}
                    </Text>
                    <Text
                      type="secondary"
                      ellipsis={true}
                      style={{ display: "block" }}
                    >
                      {surveyFeedbackDetail &&
                        surveyFeedbackDetail.user &&
                        surveyFeedbackDetail.user.email}
                    </Text>
                  </div>
                </Col>
                <Col>
                  <div style={{ paddingLeft: "10px" }}>
                    <Text type="secondary" ellipsis={true}>
                      Average Rating
                    </Text>
                    <div style={{ display: "flex" }}>
                      <Title level={2} style={{ paddingRight: "8px" }}>
                        {averageRating}
                      </Title>
                      <Rate disabled defaultValue={averageRating} />
                    </div>
                  </div>
                </Col>
              </Row>
              <Divider />
              {surveyFeedbackDetail &&
                surveyFeedbackDetail.answers.map((answer, index) => {
                  return (
                    <>
                      <Row
                        justify="space-between"
                        style={{ margin: "16px 0px" }}
                      >
                        <Col
                          span={18}
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <Text ellipsis={true}>
                            {`${index + 1} - ${
                              answer.question.question_description
                            }`}
                          </Text>
                          <div style={{ display: "flex" }}>
                            <Title level={5}>Remarks:</Title>
                            <Text ellipsis={true} style={{ marginLeft: "8px" }}>
                              {answer.remarks}
                            </Text>
                          </div>
                        </Col>
                        <Col>
                          <Text
                            type="secondary"
                            style={{ paddingRight: "8px" }}
                          >
                            {answer.rating}
                          </Text>
                          <Rate disabled defaultValue={answer.rating} />
                        </Col>
                      </Row>
                    </>
                  );
                })}

              <Row style={{ margin: "16px 0px" }}>
                <Col>
                  <Title level={5}>Appreciation / Concerns</Title>
                  <Text level={5}>
                    {surveyFeedbackDetail && surveyFeedbackDetail.appreciation}
                  </Text>
                </Col>
              </Row>
              <Row style={{ margin: "16px 0px" }}>
                <Col>
                  <Title level={5}>Suggestions</Title>
                  <Text level={5}>
                    {surveyFeedbackDetail && surveyFeedbackDetail.suggestions}
                  </Text>
                </Col>
              </Row>
            </Modal>
          </div>
        )}
      </div>
    </>
  );
};

export default CustomerSurveyDetail;
