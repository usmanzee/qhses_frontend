import React, { useState, useEffect } from "react";
import moment from "moment";

import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Radio,
  Select,
  Divider,
  DatePicker,
  message,
  Spin,
  Card,
  Alert,
  Typography,
  Layout,
} from "antd";
import {
  SurveyQuestionList,
  SurveyQuestionFormDrawer,
  PageLoader,
} from "../../components";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getUsersAction,
  getCompaniesAction,
  addSurveyAction,
  getYearsAction,
  getQuatersAction,
  getSurveyDetailAction,
  updateSurveyAction,
  addSurveyFeedbackAction,
} from "../../redux/actions";

const { Content } = Layout;
const { Title } = Typography;

const AddCustomerSurveyFeedback = () => {
  const dateFormat = "YYYY-MM-DD";
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(true);
  const [haveAccess, setHaveAccess] = useState(true);
  const [userCompletedSurvey, setUserCompletedSurvey] = useState(false);

  const userProfileLoading = useSelector((state) => state.profile.loading);
  const userProfile = useSelector((state) => state.profile.data);

  const addSurveyFeedbackLoading = useSelector(
    (state) => state.surveys.addSurveyFeedbackLoading
  );

  const surveyDetailLoading = useSelector(
    (state) => state.surveys.surveyDetailLoading
  );
  const surveyDetail = useSelector((state) => state.surveys.surveyDetail);

  useEffect(() => {
    dispatch(getSurveyDetailAction(params.id, history));
  }, []);

  useEffect(() => {
    // dispatch(getUsersAction(history));
  }, []);

  useEffect(() => {
    if (userProfile && surveyDetail) {
      const userExists = surveyDetail.users.find(
        (user) => user.id === userProfile.id
      );
      if (!userExists) {
        setHaveAccess(false);
      }
      let surveyFeedBack = surveyDetail.feedbacks.find(
        (feedback) => feedback.user_id === userProfile.id
      );

      if (surveyFeedBack) {
        setUserCompletedSurvey(true);
        let feebackData = surveyFeedBack;
        surveyFeedBack.answers.forEach((answer) => {
          feebackData[`rating_${answer.survey_question_id}`] = answer.rating;
          feebackData[`remarks_${answer.survey_question_id}`] = answer.remarks;
        });
        form.setFieldsValue(feebackData);
      }
      setLoading(false);
    }
  }, [surveyDetail, userProfile]);

  const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  };

  const handleSurveyFeedbackFormClick = () => {
    form.submit();
  };

  const handleSurveyFeedbackFormSubmit = (values) => {
    let answersData = [];
    surveyDetail.questions.forEach((question) => {
      const questionRating = values[`rating_${question.id}`];
      const questionRemarks = values[`remarks_${question.id}`];
      answersData.push({
        survey_question_id: question.id,
        rating:
          questionRating && questionRating !== undefined ? questionRating : "",
        remarks: questionRemarks,
      });
    });
    values["answers"] = answersData;
    dispatch(addSurveyFeedbackAction(params.id, values, history));
  };

  return (
    <>
      <div>
        {userProfileLoading || surveyDetailLoading || loading ? (
          <PageLoader />
        ) : !haveAccess ? (
          <Content style={{ margin: "60px" }}>
            <Row>
              <Col
                xs={{ span: 24, offset: 0 }}
                lg={{ span: 6, offset: 9 }}
                md={{ span: 12 }}
              >
                <Title className="mb-15">Unauthorized</Title>
                <Title level={5}>You Don't have access to this survey.</Title>
              </Col>
            </Row>
          </Content>
        ) : (
          <div>
            <Card style={{ borderRadius: "8px" }}>
              {userCompletedSurvey && (
                <Row>
                  <Col
                    xs={{ span: 24, offset: 0 }}
                    sm={{ span: 18, offset: 3 }}
                    md={{ span: 12, offset: 6 }}
                    lg={{ span: 12, offset: 6 }}
                    xl={{ span: 12, offset: 6 }}
                  >
                    <Alert
                      message="Survey Completed"
                      description="You have completed the survey."
                      type="success"
                      showIcon
                    />
                  </Col>
                </Row>
              )}

              <Row>
                <Col
                  xs={{ span: 24, offset: 0 }}
                  sm={{ span: 18, offset: 3 }}
                  md={{ span: 12, offset: 6 }}
                  lg={{ span: 12, offset: 6 }}
                  xl={{ span: 12, offset: 6 }}
                >
                  <Divider>
                    <h1 style={{ fontSize: "24px", fontWeight: "600" }}>
                      {surveyDetail && surveyDetail.title}
                    </h1>
                  </Divider>
                </Col>
                <Col
                  xs={{ span: 24, offset: 0 }}
                  sm={{ span: 18, offset: 3 }}
                  md={{ span: 12, offset: 6 }}
                  lg={{ span: 12, offset: 6 }}
                  xl={{ span: 12, offset: 6 }}
                  style={{ marginBottom: "24px" }}
                >
                  <p>{surveyDetail && surveyDetail.description}</p>
                </Col>
                {/* <Col
                  xs={{ span: 24, offset: 0 }}
                  sm={{ span: 18, offset: 3 }}
                  md={{ span: 12, offset: 6 }}
                  lg={{ span: 12, offset: 6 }}
                  xl={{ span: 12, offset: 6 }}
                >
                  <p>
                    Your constructive feedback will enable us to improve the
                    quality of service provided to you.
                  </p>
                </Col> */}
              </Row>
              <Row justify="space-between">
                <Col
                  xs={{ span: 24, offset: 0 }}
                  sm={{ span: 18, offset: 3 }}
                  md={{ span: 12, offset: 6 }}
                  lg={{ span: 12, offset: 6 }}
                  xl={{ span: 12, offset: 6 }}
                >
                  <Form
                    layout="vertical"
                    form={form}
                    onFinish={handleSurveyFeedbackFormSubmit}
                    autoComplete="off"
                    hideRequiredMark
                  >
                    {surveyDetail &&
                      surveyDetail.questions &&
                      surveyDetail.questions.map((question, index) => {
                        return (
                          <>
                            <Row gutter={16}>
                              <Col span={24}>
                                <Form.Item
                                  name={`rating_${question.id}`}
                                  label={`${index + 1} - ${
                                    question.question_description
                                  }`}
                                  style={{ marginBottom: "0px" }}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please select any option first",
                                    },
                                  ]}
                                >
                                  <Radio.Group disabled={userCompletedSurvey}>
                                    <Radio value={6}>
                                      {question.rating_text_1}
                                    </Radio>
                                    <Radio value={7}>
                                      {question.rating_text_2}
                                    </Radio>
                                    <Radio value={8}>
                                      {question.rating_text_3}
                                    </Radio>
                                    <Radio value={9}>
                                      {question.rating_text_4}
                                    </Radio>
                                    <Radio value={10}>
                                      {question.rating_text_5}
                                    </Radio>
                                  </Radio.Group>
                                </Form.Item>
                                <Form.Item
                                  name={`remarks_${question.id}`}
                                  label=""
                                  rules={[
                                    {
                                      required: false,
                                      message: "Please input remarks",
                                    },
                                  ]}
                                >
                                  <Input.TextArea
                                    disabled={userCompletedSurvey}
                                    autoSize={{ minRows: 2, maxRows: 2 }}
                                    showCount
                                    maxLength={100}
                                    placeholder="Remarks, if any:"
                                  />
                                </Form.Item>
                              </Col>
                            </Row>
                          </>
                        );
                      })}
                    <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item
                          name="appreciation"
                          label="Appreciation / Concerns"
                          rules={[
                            {
                              required: false,
                              message: "Please input Appreciation / Concerns:",
                            },
                          ]}
                        >
                          <Input.TextArea
                            disabled={userCompletedSurvey}
                            autoSize={{ minRows: 5, maxRows: 5 }}
                            showCount
                            // maxLength={500}
                            placeholder="Appreciation / Concerns"
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item
                          name="suggestions"
                          label="Suggestions (if any)"
                          rules={[
                            {
                              required: false,
                              message: "Please input Suggestions (if any)",
                            },
                          ]}
                        >
                          <Input.TextArea
                            disabled={userCompletedSurvey}
                            autoSize={{ minRows: 5, maxRows: 5 }}
                            showCount
                            // maxLength={500}
                            placeholder="Suggestions (if any):"
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    {!userCompletedSurvey && (
                      <Row gutter={16}>
                        <Col span={24}>
                          <Form.Item label="">
                            <Button
                              type="primary"
                              htmlType="submit"
                              // block
                              loading={addSurveyFeedbackLoading}
                              // onClick={() => handleSurveyFeedbackFormClick()}
                            >
                              Submit
                            </Button>
                          </Form.Item>
                        </Col>
                      </Row>
                    )}
                  </Form>
                </Col>
              </Row>
            </Card>
          </div>
        )}
      </div>
    </>
  );
};

export default AddCustomerSurveyFeedback;
