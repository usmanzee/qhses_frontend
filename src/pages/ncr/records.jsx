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
  getDepartmentsAction,
  getAreasAction,
  getCategoriesAction,
  getSourcesAction,
  getNCTypesAction,
  getManagementSystemsAction,
  getStatusesAction,
  getFindingTypesAction,
  getProfileAction,
  getRecordsAction,
  updateRemarksAction,
} from "../../redux/actions";
import { ExportCSV } from "../../components";

const { Option } = Select;
const { Text } = Typography;

const NcrRecords = () => {
  const pageNumber = 1;
  const dateFormat = "YYYY-MM-DD";
  const history = useHistory();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [filterForm] = Form.useForm();
  const [editableRemarks, setEditableRemarks] = useState("");
  const [editableRemarksRecordId, setEditableRemarksRecordId] = useState("");
  const [remarksModalVisible, setRemarksModalVisible] = useState(false);

  const [ownerId, setOwnerId] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [sourceId, setSourceId] = useState("");
  const [statusId, setStatusId] = useState("");
  const [findingTypeId, setFindingTypeId] = useState("");
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

  const areasLoading = useSelector((state) => state.areas.loading);
  const areas = useSelector((state) => state.areas.list);

  const companiesLoading = useSelector((state) => state.companies.loading);
  const companies = useSelector((state) => state.companies.list);

  const departmentsLoading = useSelector((state) => state.departments.loading);
  const departments = useSelector((state) => state.departments.list);

  const categoriesLoading = useSelector((state) => state.categories.loading);
  const categories = useSelector((state) => state.categories.list);

  const sourcesLoading = useSelector((state) => state.sources.loading);
  const sources = useSelector((state) => state.sources.list);

  const ncTypesLoading = useSelector((state) => state.ncTypes.loading);
  const ncTypes = useSelector((state) => state.ncTypes.list);

  const managementSystemsLoading = useSelector(
    (state) => state.managementSystems.loading
  );
  const managementSystems = useSelector(
    (state) => state.managementSystems.list
  );

  const statusesLoading = useSelector((state) => state.statuses.loading);
  const statuses = useSelector((state) => state.statuses.list);

  const findingTypesLoading = useSelector(
    (state) => state.findingTypes.loading
  );
  const findingTypes = useSelector((state) => state.findingTypes.list);

  const profileLoading = useSelector((state) => state.profile.loading);
  const profile = useSelector((state) => state.profile.data);
  const recordsLoading = useSelector((state) => state.records.loading);
  const recordUpdateLoding = useSelector(
    (state) => state.records.updateRecordLoading
  );
  const records = useSelector((state) => state.records.list);

  useEffect(() => {
    dispatch(getUsersAction(history));
    dispatch(getCompaniesAction(history));
    dispatch(getDepartmentsAction(history));
    dispatch(getAreasAction(history));
    dispatch(getCategoriesAction(history));
    dispatch(getSourcesAction(history));
    dispatch(getNCTypesAction(history));
    dispatch(getManagementSystemsAction(history));
    dispatch(getStatusesAction(history));
    dispatch(getFindingTypesAction(history));
  }, []);

  useEffect(() => {
    if (!profile) {
      dispatch(getProfileAction(history));
    }
  }, [profile]);

  useEffect(() => {
    if (records.length) {
      var newData = [];
      records.forEach((record, index) => {
        newData.push({
          "sr#": index + 1,
          "NCR no": record.ncr_number,
          "NCR date": moment(record.ncr_date).format(dateFormat),
          description: record.description,
          "NCR Owner": record.owner ? record.owner.name : "",
          "NCR Owner Designation": record.owner ? record.owner.designation : "",
          "NCR Owner Department": record.owner ? record.owner.department : "",
          // Area: record.area.name,
          Supplier: record.supplier,
          Category: record.category.name,
          "Management System": record.management_system_id
            ? record.management_system_id
            : "",
          "NCR Source": record.source.name,
          "Verification Effectiveness": record.verification_effectiveness,
          Status: record.status.name,
        });
      });
      setExportableRecords(newData);
    }
  }, [records]);

  useEffect(() => {
    dispatch(getRecordsAction(pageNumber, history));
  }, []);

  const handleFilterClick = () => {
    dispatch(
      getRecordsAction(
        pageNumber,
        history,
        ownerId,
        departmentId,
        sourceId,
        statusId,
        findingTypeId
      )
    );
  };

  const handleResetClick = () => {
    setOwnerId("");
    setDepartmentId("");
    setSourceId("");
    setStatusId("");
    setFindingTypeId("");
    filterForm.resetFields();
    dispatch(getRecordsAction(pageNumber, history));
  };

  const handleRemarksFinish = (values) => {
    dispatch(updateRemarksAction(editableRemarksRecordId, values, history));
  };

  const handleRemarksModalSubmit = () => {
    form.submit();
    setRemarksModalVisible(false);
  };

  const handleRemarksModalCancel = () => {
    setRemarksModalVisible(false);
  };

  const columns = [
    {
      title: "Sr#",
      dataIndex: "id",
      width: 100,
      fixed: "left",
      sorter: (a, b) => a.id - b.id,
      defaultSortOrder: "descend",
    },
    {
      title: "NCR no",
      dataIndex: "ncr_number",
      width: 100,
    },
    {
      title: "Finding Type",
      dataIndex: "finding_type_id",
      width: 150,
      render: (text, row) => {
        return (
          <>
            {row.findingType ? (
              <>
                <span
                  style={{
                    backgroundColor:
                      row.findingType.code === "NCR" ? "#E74C3C" : "#F1C40F",
                    height: "10px",
                    width: "10px",
                    borderRadius: "50%",
                    display: "inline-block",
                  }}
                ></span>
                <Text style={{ marginLeft: "8px" }}>
                  {row.findingType.name}
                </Text>
              </>
            ) : (
              ""
            )}
          </>
        );
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      width: 300,
      defaultSortOrder: "descend",
    },
    {
      title: "NCR Owner",
      dataIndex: "ncr_owner",
      width: 150,
      defaultSortOrder: "descend",
      render: (text, row) => {
        return <>{row.owner ? row.owner.name : ""}</>;
      },
    },
    {
      title: "NCR Owner Designation",
      dataIndex: "ncr_owner_designation",
      width: 100,
      defaultSortOrder: "descend",
      render: (text, row) => {
        return <>{row.owner ? row.owner.designation : ""}</>;
      },
    },
    {
      title: "NCR Owner Department",
      dataIndex: "ncr_owner_department",
      width: 100,
      defaultSortOrder: "descend",
      render: (text, row) => {
        return <>{row.owner ? row.owner.department : ""}</>;
      },
    },
    // {
    //   title: "Area",
    //   dataIndex: "area",
    //   width: 150,
    //   defaultSortOrder: "descend",
    //   render: (text, row) => {
    //     return <>{row.area.name}</>;
    //   },
    // },
    {
      title: "Supplier",
      dataIndex: "supplier",
      width: 150,
    },
    {
      title: "Category",
      dataIndex: "category",
      width: 150,
      defaultSortOrder: "descend",
      render: (text, row) => {
        return <>{row.category.name}</>;
      },
    },
    {
      title: "NCR Date",
      dataIndex: "ncr_date",
      width: 150,
      defaultSortOrder: "descend",
      render: (ncr_date) => {
        return moment(ncr_date).format(dateFormat);
      },
    },
    {
      title: "NC Type",
      dataIndex: "nc_type_id",
      width: 100,
      defaultSortOrder: "descend",
      render: (text, row) => {
        return <>{row.ncType ? row.ncType.name : ""}</>;
      },
    },
    {
      title: "Management System",
      dataIndex: "management_system_id",
      width: 100,
      defaultSortOrder: "descend",
      render: (text, row) => {
        return <>{row.managementSystem ? row.managementSystem.name : ""}</>;
      },
    },
    {
      title: "NCR Source",
      dataIndex: "ncr_source",
      width: 100,
      defaultSortOrder: "descend",
      render: (text, row) => {
        return <>{row.source.name}</>;
      },
    },
    {
      title: "Verification of Effectiveness",
      dataIndex: "verification_effectiveness",
      width: 170,
      // fixed: "right",
      defaultSortOrder: "descend",
      render: (text, row) => {
        let displayText = "";
        if (row.verification_effectiveness == true) {
          displayText = "Satisfactory";
        } else if (row.verification_effectiveness == false) {
          displayText = "Not Satisfactory";
        } else {
          displayText = "N/A";
        }
        return (
          <>
            {/* {profile.id === row.user.id && row.status.id === 5 ? (
              <Select
                defaultValue={row.verification_effectiveness}
                onChange={(value) => handleVerificationChange(row.id, value)}
                style={{ width: "100%" }}
              >
                <Option key={`satisfactory_${row.id}`} value={true}>
                  Satisfactory
                </Option>
                <Option key={`not-satisfactory${row.id}`} value={false}>
                  Not Satisfactory
                </Option>
              </Select>
            ) : (
              displayText
            )} */}
            {displayText}
          </>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 180,
      fixed: "right",
      defaultSortOrder: "descend",
      render: (text, row) => {
        let color = "geekblue";
        return (
          <>
            <Tag color={color} key={row.id}>
              {row.status.name}
            </Tag>
          </>
        );
      },
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (text, row) => (
        <Link to={`/ncr/records/edit/${row.id}`}>Edit</Link>
      ),
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
                    <Form.Item name="owner_id" label="Owner">
                      <Select
                        value={ownerId}
                        onChange={(value) => {
                          setOwnerId(value);
                        }}
                      >
                        {users.map((user) => {
                          return (
                            <Select.Option value={user.id}>
                              {user.name}
                            </Select.Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item name="department_id" label="Department">
                      <Select
                        value={departmentId}
                        onChange={(value) => {
                          setDepartmentId(value);
                        }}
                      >
                        {departments.map((department) => {
                          return (
                            <Select.Option value={department.id}>
                              {department.name}
                            </Select.Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item name="source_id" label="Source">
                      <Select
                        value={sourceId}
                        onChange={(value) => {
                          setSourceId(value);
                        }}
                      >
                        {sources.map((source) => {
                          return (
                            <Select.Option value={source.id}>
                              {source.name}
                            </Select.Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item name="status_id" label="Status">
                      <Select
                        value={statusId}
                        onChange={(value) => {
                          setStatusId(value);
                        }}
                      >
                        {statuses.map((status) => {
                          return (
                            <Select.Option value={status.id}>
                              {status.name}
                            </Select.Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item name="finding_type_id" label="Finding Type">
                      <Select
                        onChange={(value) => {
                          setFindingTypeId(value);
                        }}
                      >
                        {findingTypes.map((findingType) => {
                          return (
                            <Select.Option value={findingType.id}>
                              {findingType.name}
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
                <Col>
                  <ExportCSV
                    csvData={exportableRecords}
                    fileName={"NCR_Records"}
                  />
                </Col>
                {userApplicationRole && (
                  <Col style={{ marginLeft: "8px" }}>
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={() => history.push("/ncr/records/add")}
                    >
                      Add New Record
                    </Button>
                  </Col>
                )}
              </Row>

              {/* <Row justify="end" style={{ marginBottom: "12px" }}></Row> */}

              <Row>
                <Col>
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
                      spinning:
                        profileLoading || recordsLoading || recordUpdateLoding,
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

        <Modal
          title="Update Remarks"
          visible={remarksModalVisible}
          onOk={handleRemarksModalSubmit}
          onCancel={handleRemarksModalCancel}
        >
          <Form
            layout="vertical"
            id="remarks_form"
            form={form}
            onFinish={handleRemarksFinish}
            fields={[
              {
                name: ["remarks"],
                value: editableRemarks,
              },
            ]}
          >
            <Form.Item
              name="remarks"
              label="Remarks"
              style={{ marginBottom: "8px" }}
            >
              <Input.TextArea
                autoFocus
                autoSize={{ minRows: 5, maxRows: 5 }}
                showCount
                // maxLength={500}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default NcrRecords;
