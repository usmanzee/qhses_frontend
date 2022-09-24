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

import {
  getUsersAction,
  getCompaniesAction,
  getYearsAction,
  getQuatersAction,
  getProfileAction,
  getSurveysAction,
  getUserCompaniesAction,
} from "../../redux/actions";
import { ExportCSV } from "../../components";

const { Option } = Select;
const { Text } = Typography;

const CustomerSurveys = () => {
  const pageNumber = 1;
  const dateFormat = "YYYY-MM-DD";
  const history = useHistory();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [filterForm] = Form.useForm();

  const [yearId, setYearId] = useState("");
  const [quaterId, setQuaterId] = useState("");
  const [companyId, setCompanyId] = useState("");

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [exportableRecords, setExportableRecords] = useState([]);

  const selectedUserApplication = useSelector(
    (state) => state.selectedUserApplication.data
  );
  const userApplicationRole = useSelector(
    (state) => state.userApplicationRole.data
  );

  const usersLoading = useSelector((state) => state.users.loading);
  const users = useSelector((state) => state.users.list);

  const yearsLoading = useSelector((state) => state.years.loading);
  const years = useSelector((state) => state.years.list);

  const quatersLoading = useSelector((state) => state.quaters.loading);
  const quaters = useSelector((state) => state.quaters.list);

  const companiesLoading = useSelector((state) => state.companies.loading);
  const companies = useSelector((state) => state.companies.list);

  const userCompaniesLoading = useSelector(
    (state) => state.userCompanies.loading
  );
  const userCompanies = useSelector((state) => state.userCompanies.list);

  const profileLoading = useSelector((state) => state.profile.loading);
  const profile = useSelector((state) => state.profile.data);

  const surveysLoading = useSelector((state) => state.surveys.loading);
  const surveys = useSelector((state) => state.surveys.list);

  useEffect(() => {
    dispatch(getUsersAction(history));
    dispatch(getCompaniesAction(history));
    dispatch(getUserCompaniesAction(history));
    dispatch(getYearsAction(history));
    dispatch(getQuatersAction(history));
  }, []);

  useEffect(() => {
    if (!profile) {
      dispatch(getProfileAction(history));
    }
  }, [profile]);

  useEffect(() => {
    dispatch(getSurveysAction(pageNumber, history));
  }, []);

  const handleFilterClick = () => {
    dispatch(
      getSurveysAction(pageNumber, history, yearId, quaterId, companyId)
    );
  };

  const handleResetClick = () => {
    setYearId("");
    setQuaterId("");
    setCompanyId("");
    filterForm.resetFields();
    dispatch(getSurveysAction(pageNumber, history));
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
            <Link
              to={`/customer-survey/surveys/edit/${row.id}`}
              style={{ marginRight: "8px" }}
            >
              Edit
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
        <Row>
          <Col>
            <Card style={{ borderRadius: "8px" }}>
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
                        value={quaterId}
                        onChange={(value) => {
                          setQuaterId(value);
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
              <Row justify="space-between" style={{ marginBottom: "12px" }}>
                {/* <Col>
                  <ExportCSV
                    csvData={exportableRecords}
                    fileName={"NCR_Records"}
                  />
                </Col> */}
                {userApplicationRole && userApplicationRole.name && (
                  <Col style={{ marginLeft: "8px" }}>
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={() =>
                        history.push("/customer-survey/surveys/add")
                      }
                    >
                      Add New Survey
                    </Button>
                  </Col>
                )}
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
          </Col>
        </Row>
      </div>
    </>
  );
};

export default CustomerSurveys;
