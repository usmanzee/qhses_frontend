import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Table,
  Select,
  DatePicker,
  Modal,
  Button,
  Spin,
  Tag,
  Typography,
  Divider,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as alasql from "alasql";

import {
  getUsersAction,
  getCompaniesAction,
  getYearsAction,
  getQuatersAction,
  getProfileAction,
  getSurveysAction,
  getUserCompaniesAction,
  getAspectsAction,
  getAllSurveysDataAction,
} from "../../redux/actions";

import { ExportCSV } from "../../components";

const CustomerSurveyFeedbacks = () => {
  const pageNumber = 1;
  const dateFormat = "YYYY-MM-DD";
  const history = useHistory();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [filterForm] = Form.useForm();

  const [yearId, setYearId] = useState("");
  const [quarterId, setQuarterId] = useState("");
  const [companyId, setCompanyId] = useState("");

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [allsurveys, setAllSurveys] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [surveyUsers, setSurveyUsers] = useState([]);
  const [surveyFeedbacks, setSurveyFeedbacks] = useState([]);
  const [surveyFeedbackAnswers, setSurveyFeedbackAnswers] = useState([]);
  const [exportableFeedbacks, setExportableFeedbacks] = useState([]);

  const usersLoading = useSelector((state) => state.users.loading);
  const users = useSelector((state) => state.users.list);

  const yearsLoading = useSelector((state) => state.years.loading);
  const years = useSelector((state) => state.years.list);

  const quatersLoading = useSelector((state) => state.quaters.loading);
  const quaters = useSelector((state) => state.quaters.list);

  const companiesLoading = useSelector((state) => state.companies.loading);
  const companies = useSelector((state) => state.companies.list);

  const aspectsLoading = useSelector((state) => state.aspects.loading);
  const aspects = useSelector((state) => state.aspects.list);

  const userCompaniesLoading = useSelector(
    (state) => state.userCompanies.loading
  );
  const userCompanies = useSelector((state) => state.userCompanies.list);

  const profileLoading = useSelector((state) => state.profile.loading);
  const profile = useSelector((state) => state.profile.data);

  const surveysLoading = useSelector((state) => state.surveys.loading);
  const surveys = useSelector((state) => state.surveys.list);

  const allSurveysDataLoading = useSelector(
    (state) => state.allSurveysData.loading
  );
  const allSurveysData = useSelector((state) => state.allSurveysData.data);

  useEffect(() => {
    dispatch(getUsersAction(history, true));
    dispatch(getCompaniesAction(history));
    dispatch(getUserCompaniesAction(history));
    dispatch(getYearsAction(history));
    dispatch(getQuatersAction(history));
    dispatch(getAspectsAction(history));
    dispatch(getAllSurveysDataAction(history));
  }, []);

  useEffect(() => {
    if (!profile) {
      dispatch(getProfileAction(history));
    }
  }, [profile]);

  useEffect(() => {
    dispatch(getSurveysAction(pageNumber, history));
  }, []);

  useEffect(() => {
    if (allSurveysData && allSurveysData.surveys) {
      setAllSurveys(allSurveysData.surveys);
    }
  }, [allSurveysData]);

  useEffect(() => {
    if (allSurveysData && allSurveysData.questions) {
      setQuestions(allSurveysData.questions);
    }
  }, [allSurveysData]);

  useEffect(() => {
    if (allSurveysData && allSurveysData.surveyUsers) {
      setSurveyUsers(allSurveysData.surveyUsers);
    }
  }, [allSurveysData]);
  useEffect(() => {
    if (allSurveysData && allSurveysData.surveyFeedbacks) {
      setSurveyFeedbacks(allSurveysData.surveyFeedbacks);
    }
  }, [allSurveysData]);
  useEffect(() => {
    if (allSurveysData && allSurveysData.surveyFeedbackAnswers) {
      setSurveyFeedbackAnswers(allSurveysData.surveyFeedbackAnswers);
    }
  }, [allSurveysData]);

  useEffect(() => {
    if (
      surveys &&
      questions &&
      surveyUsers &&
      surveyFeedbacks &&
      surveyFeedbackAnswers &&
      companies
    ) {
      getSurveyFeedbacksForExport();
    }
  }, [
    surveys,
    questions,
    surveyUsers,
    surveyFeedbacks,
    surveyFeedbackAnswers,
    companies,
  ]);

  const handleFilterClick = () => {
    dispatch(
      getSurveysAction(pageNumber, history, yearId, quarterId, companyId)
    );
    getSurveyFeedbacksForExport();
  };

  const handleResetClick = () => {
    setYearId("");
    setQuarterId("");
    setCompanyId("");
    filterForm.resetFields();
    dispatch(getSurveysAction(pageNumber, history));
    getSurveyFeedbacksForExport();
  };

  const getSurveyFeedbacksForExport = () => {
    let where = "";
    if (yearId) {
      where += where
        ? ` AND s.year_id = ${yearId}`
        : `WHERE s.year_id = ${yearId}`;
    }
    if (companyId) {
      where += where
        ? ` AND s.company_id = ${companyId}`
        : `WHERE s.company_id = ${companyId}`;
    }
    if (quarterId) {
      where += where
        ? ` AND s.quater_id = ${quarterId}`
        : `WHERE s.quater_id = ${quarterId}`;
    }
    var results = alasql(
      `SELECT s.id as surveyId, s.title, s.description, u.name as feedbackBy, sfa.rating, sfa.remarks, q.question_description, c.name AS companyName, a.title AS aspect, c1.name as feedbackCompany  FROM ? AS sfa
      LEFT JOIN ? as sf ON sfa.survey_feedback_id = sf.id
      LEFT JOIN ? as q ON sfa.survey_question_id = q.id
      LEFT JOIN ? as s ON q.survey_id = s.id
      LEFT JOIN ? as su ON s.id = su.survey_id AND su.user_id = sf.user_id
      LEFT JOIN ? as c ON s.company_id = c.id
      LEFT JOIN ? c1 ON su.company_id = c1.id
      LEFT JOIN ? as a ON q.aspect_id = a.id
      LEFT JOIN ? as u ON sf.user_id = u.id ${where}`,
      [
        surveyFeedbackAnswers,
        surveyFeedbacks,
        questions,
        allsurveys,
        surveyUsers,
        companies,
        companies,
        aspects,
        users,
      ]
    );
    var newData = [];
    results.forEach((result, index) => {
      newData.push({
        "sr#": index + 1,
        "Survey ID": result.surveyId,
        "Survey Title": result.title,
        "Survey Description": result.description,
        "Survey Company": result.companyName,
        "Feedback By(User)": result.feedbackBy,
        "Feedback By(Company)": result.feedbackByCompany,
        Question: result.question_description,
        Aspect: result.aspect,
        Rating: result.rating,
        Remarks: result.remarks,
      });
    });
    setExportableFeedbacks(newData);
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
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Year",
      dataIndex: "year",
      render: (text, row) => {
        return <>{row.year.year}</>;
      },
    },
    {
      title: "Quarter",
      dataIndex: "quater",
      render: (text, row) => {
        return <>{row.quater.quater_name}</>;
      },
    },
    {
      title: "Company",
      dataIndex: "company_id",
      render: (text, row) => {
        return <>{row.company.name}</>;
      },
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      render: (text, row) => {
        return <>{moment(row.createdAt).format(dateFormat)}</>;
      },
    },
    {
      title: "UpdatedAt",
      dataIndex: "updatedAt",
      render: (text, row) => {
        return <>{moment(row.updatedAt).format(dateFormat)}</>;
      },
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 150,
      render: (text, row) => {
        return (
          <>
            <Link to={`/customer-survey/surveys/detail/${row.id}`}>
              View Detail
            </Link>
          </>
        );
      },
    },
  ];

  return (
    <>
      <div
        style={{
          display: "block",
        }}
      >
        <Card style={{ borderRadius: "8px" }}>
          <Row>
            <Col span={24}>
              <Form form={filterForm} layout="vertical" autoComplete="off">
                <Row gutter={16} style={{ alignItems: "center" }}>
                  <Col span={4}>
                    <Form.Item name="year_id" label="Year">
                      <Select
                        value={yearId}
                        onChange={(value) => {
                          setYearId(value);
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
                  <Col span={4}>
                    <Form.Item name="quater_id" label="Quater">
                      <Select
                        value={quarterId}
                        onChange={(value) => {
                          setQuarterId(value);
                        }}
                      >
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
                  <Col span={4}>
                    <Form.Item name="company_id" label="Company">
                      <Select
                        value={companyId}
                        onChange={(value) => {
                          setCompanyId(value);
                        }}
                      >
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
                  <Col>
                    <Button
                      type="primary"
                      onClick={() => {
                        handleFilterClick();
                      }}
                    >
                      Filter
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      onClick={() => {
                        handleResetClick();
                      }}
                    >
                      Reset
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
          <Row justify="end" style={{ marginBottom: "8px" }}>
            <Col>
              <ExportCSV
                csvData={exportableFeedbacks}
                fileName={"Customer Survey Feedbacks"}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Table
                columns={columns}
                dataSource={surveys ? surveys : []}
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
                  spinning: profileLoading || surveysLoading,
                }}
                pagination={{
                  current: page,
                  pageSize: pageSize,
                  onChange: (page, pageSize) => {
                    setPage(page);
                    setPageSize(pageSize);
                  },
                }}
              />
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
};

export default CustomerSurveyFeedbacks;
