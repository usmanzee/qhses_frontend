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
  Typography,
} from "antd";
import {
  SurveyQuestionList,
  SurveyQuestionFormDrawer,
  SurveyUsersFormDrawer,
  SurveyUsersList,
  PageLoader,
} from "../../components";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getUsersAction,
  getCompaniesAction,
  addSurveyAction,
  getYearsAction,
  getQuatersAction,
  getAspectsAction,
  getUserCompaniesAction,
} from "../../redux/actions";

const { Title } = Typography;

const AddCustomerSurvey = () => {
  const dateFormat = "YYYY-MM-DD";
  const history = useHistory();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [usersForm] = Form.useForm();

  const [selectedCompanyId, setSelectedCompanyId] = useState("");

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [userFormDrawerVisible, setUserFormDrawerVisible] = useState(false);

  const [tableQuestionId, setTableQuestionId] = useState(1);
  const [questions, setQuestions] = useState([]);

  const [tableUsersId, setTableUsersId] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const usersLoading = useSelector((state) => state.users.loading);
  const users = useSelector((state) => state.users.list);

  const companiesLoading = useSelector((state) => state.companies.loading);
  const companies = useSelector((state) => state.companies.list);

  const userCompaniesLoading = useSelector(
    (state) => state.userCompanies.loading
  );
  const userCompanies = useSelector((state) => state.userCompanies.list);

  const yearsLoading = useSelector((state) => state.years.loading);
  const years = useSelector((state) => state.years.list);

  const quatersLoading = useSelector((state) => state.quaters.loading);
  const quaters = useSelector((state) => state.quaters.list);

  const aspectsLoading = useSelector((state) => state.aspects.loading);
  const aspects = useSelector((state) => state.aspects.list);

  const addSurveyLoading = useSelector(
    (state) => state.surveys.addSurveyLoading
  );

  useEffect(() => {
    dispatch(getUsersAction(history, true));
    dispatch(getCompaniesAction(history));
    dispatch(getUserCompaniesAction(history));

    dispatch(getYearsAction(history));
    dispatch(getQuatersAction(history));
    dispatch(getAspectsAction(history));
  }, []);

  useEffect(() => {
    if (userCompanies && userCompanies.length) {
      const sCompany = userCompanies.find(
        (userCompany) => userCompany.company.code === "ASH"
      );
      if (sCompany) {
        setSelectedCompanyId(sCompany.company_id);
      }
    }
  }, [userCompanies]);

  const onAddQuestionClick = () => {
    setDrawerVisible(true);
  };

  const handleQuestionsRowDelete = (id) => {
    const dataSource = [...questions];
    setQuestions(dataSource.filter((item) => item.id !== id));
  };

  const onQuestionFormSubmit = (values) => {
    const aspect = aspects.find((aspect) => aspect.id === values["aspect_id"]);
    values["id"] = tableQuestionId;
    values["allowDelete"] = true;
    values["aspect_title"] = aspect.title;
    setQuestions([...questions, values]);
    setTableQuestionId(tableQuestionId + 1);
    message.success("Question Added.");
  };

  const handleUsersRowDelete = (uId) => {
    const dataSource = [...selectedUsers];
    setSelectedUsers(dataSource.filter((item) => item.uId !== uId));
  };

  const onUsersFormSubmit = (values) => {
    if (selectedUsers.length) {
      const userAlreadySelected = selectedUsers.find(
        (selectedUser) => selectedUser.user_id === values["user_id"]
      );
      if (userAlreadySelected)
        return message.error("This User is already selected.");
    }
    const user = users.find((user) => user.id === values["user_id"]);
    const company = companies.find(
      (company) => company.id === values["company_id"]
    );
    values["uId"] = tableUsersId;
    values["user_name"] = user.name;
    values["user_email"] = user.email;
    values["company_id"] = company.id;
    values["company_name"] = company.name;
    values["allowDelete"] = true;
    setSelectedUsers([...selectedUsers, values]);
    setTableUsersId(tableUsersId + 1);
    message.success("User Added.");
  };

  const handleSurveyFormClick = () => {
    form.submit();
  };

  const handleSurveyFormSubmit = (values) => {
    if (!questions.length) {
      return message.error("Please Add Questions.");
    }
    if (!selectedUsers.length) {
      return message.error("Please Add Users.");
    }
    let usersList = [];
    // if (values.user_ids.length) {
    //   values.user_ids.forEach((userId) => {
    //     var user = users.find((user) => user.id === userId);
    //     usersList.push({
    //       user_id: user.id,
    //       user_name: user.name,
    //       user_email: user.email,
    //     });
    //   });
    // }

    let questionsList = [];
    if (questions.length) {
      questions.forEach((question) => {
        if (question.allowDelete) {
          questionsList.push({
            question_description: question.question_description,
            // question_aspect: question.question_aspect,
            aspect_id: question.aspect_id,
            rating_text_1: question.rating_text_1,
            rating_text_2: question.rating_text_2,
            rating_text_3: question.rating_text_3,
            rating_text_4: question.rating_text_4,
            rating_text_5: question.rating_text_5,
          });
        }
      });
    }
    values["questions"] = questionsList;
    values["users"] = selectedUsers;

    dispatch(addSurveyAction(values, history));
  };

  return (
    <>
      <div>
        {usersLoading &&
        companiesLoading &&
        userCompaniesLoading &&
        yearsLoading &&
        quatersLoading &&
        aspectsLoading ? (
          <PageLoader />
        ) : (
          <div>
            <Card style={{ borderRadius: "8px" }}>
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
                      Add New Customer Survey
                    </h1>
                  </Divider>
                </Col>
              </Row>
              <Row justify="space-between">
                <Col
                  xs={{ span: 24, offset: 0 }}
                  sm={{ span: 24, offset: 0 }}
                  md={{ span: 8, offset: 0 }}
                  lg={{ span: 8, offset: 0 }}
                  xl={{ span: 8, offset: 0 }}
                >
                  <Form
                    layout="vertical"
                    form={form}
                    onFinish={handleSurveyFormSubmit}
                    autoComplete="off"
                    fields={[
                      {
                        name: ["company_id"],
                        value: selectedCompanyId,
                      },
                    ]}
                  >
                    <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item
                          name="title"
                          label="Survey Title"
                          rules={[
                            {
                              required: true,
                              message: "Please input title",
                            },
                          ]}
                        >
                          <Input placeholder="Please input title" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item
                          name="year_id"
                          label="Year"
                          rules={[
                            {
                              required: true,
                              message: "Please select Year",
                            },
                          ]}
                        >
                          <Select
                            placeholder="Select Year"
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input, option) => {
                              return (
                                option.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              );
                            }}
                          >
                            {years.map((year) => {
                              return (
                                <Select.Option value={year.id}>
                                  {year.year}
                                </Select.Option>
                              );
                            })}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          name="quater_id"
                          label="Quarter"
                          rules={[
                            {
                              required: true,
                              message: "Please select Quarter",
                            },
                          ]}
                        >
                          <Select placeholder="Select Quarter">
                            {quaters.map((quater) => {
                              return (
                                <Select.Option value={quater.id}>
                                  {quater.quater_name}
                                </Select.Option>
                              );
                            })}
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item
                          name="company_id"
                          label="Company"
                          rules={[
                            {
                              required: true,
                              message: "Please select Company",
                            },
                          ]}
                        >
                          <Select placeholder="Select Company">
                            {userCompanies.map((userCompany) => {
                              return (
                                <Select.Option value={userCompany.company.id}>
                                  {userCompany.company.name}
                                </Select.Option>
                              );
                            })}
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                    {/* <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item
                          name="user_ids"
                          label="Users"
                          rules={[
                            {
                              required: true,
                              message: "Please select users",
                            },
                          ]}
                        >
                          <Select
                            mode="multiple"
                            style={{ width: "100%" }}
                            placeholder="Select Atleast One User"
                            optionLabelProp="label"
                          >
                            {users.map((user) => {
                              return (
                                <Select.Option
                                  value={user.id}
                                  label={user.name}
                                >
                                  {`${user.name} - ${user.department} `}
                                </Select.Option>
                              );
                            })}
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row> */}
                    <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item
                          name="description"
                          label="Survey Description"
                          rules={[
                            {
                              required: true,
                              message: "Please input description",
                            },
                          ]}
                        >
                          <Input.TextArea
                            autoSize={{ minRows: 5, maxRows: 5 }}
                            showCount
                            // maxLength={500}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                </Col>
                <Col
                  xs={{ span: 24, offset: 0 }}
                  sm={{ span: 18, offset: 0 }}
                  md={{ span: 15, offset: 0 }}
                  lg={{ span: 15, offset: 0 }}
                  xl={{ span: 15, offset: 0 }}
                >
                  <Row
                    justify="space-between"
                    style={{ marginBottom: "4px", alignItems: "center" }}
                  >
                    <Col>
                      <Title
                        level={5}
                        style={{ marginBottom: "4px", marginBottom: "0px" }}
                      >
                        Questions
                      </Title>
                    </Col>
                    <Col>
                      <Button
                        type="primary"
                        onClick={() => {
                          onAddQuestionClick();
                        }}
                      >
                        Add Question
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <SurveyQuestionList
                        loading={false}
                        handleRowDelete={handleQuestionsRowDelete}
                        data={questions}
                      />
                    </Col>
                  </Row>
                  <Row
                    justify="space-between"
                    style={{
                      marginTop: "8px",
                      marginBottom: "4px",
                      alignItems: "center",
                    }}
                  >
                    <Col>
                      <Title
                        level={5}
                        style={{ marginBottom: "4px", marginBottom: "0px" }}
                      >
                        Users
                      </Title>
                    </Col>
                    <Col>
                      <Button
                        type="primary"
                        onClick={() => {
                          setUserFormDrawerVisible(true);
                        }}
                      >
                        Add User
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <SurveyUsersList
                        loading={false}
                        handleRowDelete={handleUsersRowDelete}
                        data={selectedUsers}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row justify="start">
                <Col>
                  <Button
                    type="primary"
                    htmlType="submit"
                    // block
                    loading={addSurveyLoading}
                    onClick={() => handleSurveyFormClick()}
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
            </Card>
          </div>
        )}
      </div>
      <SurveyQuestionFormDrawer
        drawerVisible={drawerVisible}
        setDrawerVisible={setDrawerVisible}
        handleFormSubmit={onQuestionFormSubmit}
      />
      <SurveyUsersFormDrawer
        drawerVisible={userFormDrawerVisible}
        setDrawerVisible={setUserFormDrawerVisible}
        form={usersForm}
        handleFormSubmit={onUsersFormSubmit}
      />
    </>
  );
};

export default AddCustomerSurvey;
