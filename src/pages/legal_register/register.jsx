import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Form,
  Table,
  Button,
  Spin,
  Typography,
  Select,
  message,
} from "antd";
import { PlusOutlined, CheckOutlined } from "@ant-design/icons";
import moment from "moment";
import { useHistory, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  LegalRegisterRecordAddFormDrawer,
  LegalRegisterRecordAddReviewFormDrawer,
} from "../../components";

import {
  getProfileAction,
  getYearsAction,
  getLegalRegisterRecordsAction,
  addLegalRegisterRecordAction,
  addLegalRegisterRecordQuarterReviewAction,
} from "../../redux/actions";

const { Title } = Typography;

const LegalRegisters = () => {
  const pageNumber = 1;
  const dateFormat = "YYYY-MM-DD";
  const history = useHistory();

  const location = useLocation();
  const search = location.search;
  let urlParams = new URLSearchParams(search);

  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [filterForm] = Form.useForm();
  const [addRecordform] = Form.useForm();
  const [addRecordReviewform] = Form.useForm();

  const currentYearName = moment().year();

  const [selectedYear, setSelectedYear] = useState(null);
  const [addRecordDrawerVisible, setAddRecordDrawerVisible] = useState(false);
  const [addRecordReviewDrawerVisible, setAddRecordReviewDrawerVisible] =
    useState(false);

  const [selectedQuarterId, setSelectedQuarterId] = useState("");
  const [selectedRecord, setSelectedRecord] = useState(null);

  const profileLoading = useSelector((state) => state.profile.loading);
  const profile = useSelector((state) => state.profile.data);

  const yearsLoading = useSelector((state) => state.years.loading);
  const years = useSelector((state) => state.years.list);

  const recordsLoading = useSelector(
    (state) => state.legalRegisterRecords.loading
  );
  const records = useSelector((state) => state.legalRegisterRecords.list);

  const addRecordLoading = useSelector(
    (state) => state.legalRegisterRecords.addLoading
  );
  const addRecordSuccess = useSelector(
    (state) => state.legalRegisterRecords.addSuccess
  );

  const updateRecordLoading = useSelector(
    (state) => state.legalRegisterRecords.updateLoading
  );
  const updateRecordSuccess = useSelector(
    (state) => state.legalRegisterRecords.updateSuccess
  );

  useEffect(() => {
    if (!profile) {
      dispatch(getProfileAction(history));
    }
  }, [profile]);

  useEffect(() => {
    dispatch(getYearsAction(history));
  }, []);

  useEffect(() => {
    if (selectedYear) {
      dispatch(
        getLegalRegisterRecordsAction(history, pageNumber, selectedYear.id)
      );
    }
  }, [selectedYear]);

  useEffect(() => {
    if (years && years.length) {
      const paramsYearId = urlParams.get("year_id");
      let setYear = years[0];
      if (paramsYearId) {
        setYear = years.find((year) => parseInt(year.id) == paramsYearId);
      } else {
        setYear = years.find((year) => parseInt(year.year) === currentYearName);
      }
      setYear ? setSelectedYear(setYear) : setSelectedYear(years[0]);
    }
  }, [years]);

  useEffect(() => {
    if (addRecordSuccess) {
      addRecordform.resetFields();
      setAddRecordDrawerVisible(false);
    }
  }, [addRecordSuccess]);

  useEffect(() => {
    if (updateRecordSuccess) {
      addRecordReviewform.resetFields();
      setAddRecordReviewDrawerVisible(false);
    }
  }, [updateRecordSuccess]);

  const onRecordFormSubmit = (values) => {
    dispatch(addLegalRegisterRecordAction(history, values, selectedYear.year));
  };

  const onRecordReviewFormSubmit = (values) => {
    if (!selectedQuarterId) return message.error("Unable to process request.");
    values.expiry_date = moment(values.expiry_date).format(dateFormat);
    values.register_record_id = selectedRecord.id;
    values.quarter_id = selectedQuarterId;
    dispatch(
      addLegalRegisterRecordQuarterReviewAction(
        history,
        selectedRecord.id,
        values
      )
    );
  };

  const renderReviewContent = (item, quarterId) => {
    const review =
      item.reviews &&
      item.reviews.find((review) => review.quarter_id === quarterId);
    return review ? (
      <CheckOutlined />
    ) : (
      <>
        <Button
          type="link"
          size="small"
          onClick={() => {
            setSelectedQuarterId(quarterId);
            setSelectedRecord(item);
            setAddRecordReviewDrawerVisible(true);
          }}
        >
          Add Review
        </Button>
      </>
    );
  };

  const columns = [
    {
      title: "Sr#",
      dataIndex: "id",
      fixed: "left",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.id - b.id,
      render: (value, row, index) => row.id,
    },
    {
      title: "Year",
      dataIndex: "year",
      render: (value, row, index) => row.year && row.year.year,
    },
    {
      title: "Legal & other REF.",
      dataIndex: "legal_other_references",
    },
    {
      title: "Activity",
      dataIndex: "activity",
    },
    {
      title: "Legal & other Requirements",
      dataIndex: "legal_other_requirements",
    },
    {
      title: "Reference Documents",
      dataIndex: "reference_documents",
    },
    {
      title: "Responsibility",
      dataIndex: "responsible",
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
    },
    {
      title: "Created By",
      dataIndex: "user_id",
      render: (value, row, index) => row.user && row.user.name,
    },
    {
      title: "Created At",
      dataIndex: "date",
      render: (value, row, index) => moment(row.createdAt).format(dateFormat),
    },
    {
      title: "Quarterly Review",
      dataIndex: "reviews",
      key: "reviews",
      fixed: "right",
      children: [
        {
          title: "Q1",
          dataIndex: "reviews",
          fixed: "right",
          width: 110,
          align: "center",
          render: (value, row, index) => renderReviewContent(row, 1),
        },
        {
          title: "Q2",
          dataIndex: "reviews",
          fixed: "right",
          width: 110,
          render: (value, row, index) => renderReviewContent(row, 2),
        },
        {
          title: "Q3",
          dataIndex: "reviews",
          fixed: "right",
          width: 110,
          render: (value, row, index) => renderReviewContent(row, 3),
        },
        {
          title: "Q4",
          dataIndex: "reviews",
          fixed: "right",
          width: 110,
          render: (value, row, index) => renderReviewContent(row, 4),
        },
      ],
    },
    // {
    //   title: "Actions",
    //   key: "operation",
    //   fixed: "right",
    //   width: 200,
    //   render: (text, row) => {
    //     return (
    //       <Row style={{ justifyContent: "space-evenly" }}>
    //         <Link to={`/eair/records/edit/${row.id}`}>
    //           <Button type="link" icon={<EditOutlined />} size="small">
    //             Update
    //           </Button>
    //         </Link>
    //       </Row>
    //     );
    //   },
    // },
  ];

  return (
    <>
      <div
        style={{
          display: "block",
        }}
      >
        <Card style={{ borderRadius: "8px" }}>
          <Row
            gutter={16}
            justify="space-between"
            style={{ alignItems: "center" }}
          >
            <Col span={16}>
              <Form
                form={filterForm}
                layout="vertical"
                autoComplete="off"
                fields={[
                  {
                    name: ["year_id"],
                    value: selectedYear && selectedYear.id,
                  },
                ]}
              >
                <Row>
                  <Col span={4}>
                    <Form.Item
                      name="year_id"
                      label="Year"
                      style={{ marginBottom: "8px" }}
                    >
                      <Select
                        loading={yearsLoading}
                        onChange={(value) => {
                          const year = years.find((year) => year.id === value);
                          setSelectedYear(year);
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
                </Row>
              </Form>
            </Col>
            <Col>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                  setAddRecordDrawerVisible(true);
                }}
              >
                Add Register Record
              </Button>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Table
                columns={columns}
                dataSource={records ? records : []}
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
                  spinning: profileLoading || recordsLoading,
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
        <LegalRegisterRecordAddFormDrawer
          visible={addRecordDrawerVisible}
          setVisible={setAddRecordDrawerVisible}
          form={addRecordform}
          loading={addRecordLoading}
          years={years}
          handleFormSubmit={onRecordFormSubmit}
        />

        <LegalRegisterRecordAddReviewFormDrawer
          visible={addRecordReviewDrawerVisible}
          setVisible={setAddRecordReviewDrawerVisible}
          form={addRecordReviewform}
          loading={updateRecordLoading}
          handleFormSubmit={onRecordReviewFormSubmit}
        />
      </div>
    </>
  );
};

export default LegalRegisters;
