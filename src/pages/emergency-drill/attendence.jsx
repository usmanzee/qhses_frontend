import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Form,
  Button,
  Table,
  Spin,
  Tag,
  PageHeader,
  Descriptions,
  Typography,
  Space,
  Checkbox,
  Tooltip,
  Popconfirm,
  Grid,
  Divider,
  message,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams, Link } from "react-router-dom";
import {
  getEmployeesAction,
  getEmergencyDrillDetailAction,
  getDrillEmployeesAttendenceActions,
  saveEmployeesAttendenceAction,
  submitEmployeesAttendenceAction,
} from "../../redux/actions";

import moment from "moment";
import {
  PageLoader,
  EmergencyDrillAttedenceEmployeeFormDrawer,
} from "../../components";
import { v4 as uuid } from "uuid";

const { useBreakpoint } = Grid;
const { Title, Text } = Typography;

const EmergencyDrillAttendence = () => {
  const screens = useBreakpoint();
  const dateFormat = "YYYY-MM-DD";
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const [addEmployeeForm] = Form.useForm();

  const types = ["VENDOR", "CLIENT", "VISITOR", "EMPLOYEE"];

  const [rerender, setRerender] = useState(false);
  const [addEmployeeDrawer, setAddEmployeeDrawer] = useState(false);
  const [attendenceEmployeesList, setAttendenceEmployeesList] = useState([]);
  const [deleteAttendenceEmployeesList, setDeleteAttendenceEmployeesList] =
    useState([]);

  const profileLoading = useSelector((state) => state.profile.loading);
  const profile = useSelector((state) => state.profile.data);

  const employeesLoading = useSelector((state) => state.employees.loading);
  const employees = useSelector((state) => state.employees.list);

  const drillDetailLoading = useSelector(
    (state) => state.emergencyDrills.drillDetailLoading
  );
  const drillDetail = useSelector((state) => state.emergencyDrills.drillDetail);

  const updateDrillLoading = useSelector(
    (state) => state.emergencyDrills.updateDrillLoading
  );

  const drillAttendenceEmployeesLoading = useSelector(
    (state) => state.drillAttendenceEmployees.loading
  );
  const drillAttendenceEmployees = useSelector(
    (state) => state.drillAttendenceEmployees.list
  );

  const saveAttendenceLoading = useSelector(
    (state) => state.drillAttendenceEmployees.saveAttendenceLoading
  );

  useEffect(() => {
    dispatch(getEmployeesAction(history));
    dispatch(getEmergencyDrillDetailAction(history, params.id));
    dispatch(getDrillEmployeesAttendenceActions(history, params.id));
  }, []);

  useEffect(() => {
    const newData = drillAttendenceEmployees.map((item) => {
      return {
        uId: `${uuid()}${item.id}`,
        ...item,
      };
    });
    setAttendenceEmployeesList(newData);
  }, [drillAttendenceEmployees]);

  const handleEmployeeRowDelete = (uId) => {
    const dataSource = [...attendenceEmployeesList];
    setAttendenceEmployeesList(dataSource.filter((item) => item.uId !== uId));
    const deleteEmployee = attendenceEmployeesList.find(
      (employee) => employee.uId === uId
    );
    if (deleteEmployee && deleteEmployee.id) {
      setDeleteAttendenceEmployeesList([
        ...deleteAttendenceEmployeesList,
        deleteEmployee,
      ]);
    }
  };

  const handleEmployeeAddSubmit = (values) => {
    const newData = {
      uId: uuid(),
      employee_type: values.employee_type,
      employee_name: values.employee_name,
      company_name: values.company_name,
      present: false,
      out_of_office: false,
    };
    if (values.employee_type === "EMPLOYEE" && values.employee_id) {
      const selectedEmployee = employees.find(
        (employee) => employee.Emp_ID === values.employee_id
      );
      newData["employee_id"] = selectedEmployee.Emp_ID;
      newData["employee_name"] = selectedEmployee.emp_name;
      newData["company_name"] = selectedEmployee.company_name;
      newData["company_code"] = selectedEmployee.comp_code;
      newData["department_name"] = selectedEmployee.department;
      newData["department_code"] = selectedEmployee.dept_code;
    }
    setAttendenceEmployeesList([...attendenceEmployeesList, newData]);
    addEmployeeForm.resetFields();
    message.info("Employee Added!");
  };

  const handleSaveClick = () => {
    const data = attendenceEmployeesList.map((emp) => {
      return {
        emergency_drill_id: params.id,
        ...emp,
      };
    });
    const reqData = {
      emergency_drill_id: params.id,
      attendence: data,
      deleteAttedence: deleteAttendenceEmployeesList,
    };
    dispatch(saveEmployeesAttendenceAction(history, params.id, reqData));
  };

  const handleSubmitClick = () => {
    const data = attendenceEmployeesList.map((emp) => {
      return {
        emergency_drill_id: params.id,
        ...emp,
      };
    });
    const reqData = {
      emergency_drill_id: params.id,
      attendence: data,
      deleteAttedence: deleteAttendenceEmployeesList,
    };
    console.log(reqData);
    dispatch(submitEmployeesAttendenceAction(history, params.id, reqData));
  };

  const columns = [
    {
      title: "Emp Type",
      dataIndex: "employee_type",
      responsive: ["lg"],
      render: (value, row, index) =>
        row.employee_type ? row.employee_type : "N/A",
    },
    {
      title: "Emp Id",
      dataIndex: "employee_id",
      responsive: ["lg"],
      render: (value, row, index) =>
        row.employee_id ? row.employee_id : "N/A",
    },
    {
      title: "Emp Name",
      dataIndex: "employee_name",
      render: (value, row, index) =>
        row.employee_name ? row.employee_name : "N/A",
    },
    {
      title: "Company/Department",
      dataIndex: "department_name",
      responsive: ["lg"],
      render: (value, row, index) => {
        return `${row.company_name ? row.company_name : ""}${
          row.department_name ? ` / ${row.department_name}` : ""
        }`;
      },
    },
    {
      title: "Present",
      render: (text, row, index) => {
        return (
          <>
            <Checkbox
              checked={row.present}
              disabled={drillDetail && drillDetail.attendence_submitted}
              onChange={(e) => {
                if (e.target.checked) {
                  row.out_of_office = false;
                }
                row.present = e.target.checked;
                setRerender(!rerender);
              }}
            />
          </>
        );
      },
    },
    {
      title: "Out Of Office",
      render: (text, row) => {
        return (
          <>
            <Checkbox
              checked={row.out_of_office}
              disabled={drillDetail && drillDetail.attendence_submitted}
              onChange={(e) => {
                if (e.target.checked) {
                  row.present = false;
                }
                row.out_of_office = e.target.checked;
                setRerender(!rerender);
              }}
            />
          </>
        );
      },
    },
    {
      title: "Actions",
      key: "operation",
      fixed: "right",
      width: 200,
      render: (text, row) => {
        return (
          <Popconfirm
            disabled={drillDetail && drillDetail.attendence_submitted}
            title="Sure to delete?"
            onConfirm={() => handleEmployeeRowDelete(row.uId)}
          >
            <Button
              disabled={drillDetail && drillDetail.attendence_submitted}
              type="link"
              size="small"
            >
              Delete
            </Button>
          </Popconfirm>
        );
      },
    },
  ];

  return (
    <>
      <div>
        {drillDetailLoading || employeesLoading || profileLoading ? (
          <PageLoader />
        ) : (
          <Card style={{ marginBottom: "8px" }}>
            <Row
              style={{
                border: "1px solid #ededed",
                borderRadius: "8px",
                marginBottom: "16px",
              }}
            >
              <Col
                //   xs={{ span: 12, offset: 12 }}
                lg={{ span: 24, offset: 0 }}
                md={{ span: 24 }}
              >
                <PageHeader
                  ghost={false}
                  title={drillDetail && drillDetail.drill_number}
                >
                  <Descriptions
                    size="small"
                    column={screens.xs ? 1 : 5}
                    // className="hide-on-mobile"
                  >
                    <Descriptions.Item
                      label="Year"
                      style={{ display: screens.xs ? "none" : "flex" }}
                    >
                      <Text strong>
                        {drillDetail &&
                          drillDetail.year &&
                          drillDetail.year.year}
                      </Text>
                    </Descriptions.Item>
                    <Descriptions.Item
                      label="Month"
                      style={{ display: screens.xs ? "none" : "flex" }}
                    >
                      <Text strong>
                        {drillDetail &&
                          drillDetail.month &&
                          drillDetail.month.name}
                      </Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="Shift Time">
                      <Text strong>
                        {drillDetail &&
                          `${moment(drillDetail.shift_date_time).format(
                            "YYYY-MM-DD hh:mm A"
                          )}`}
                      </Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="Company">
                      <Text strong>
                        {drillDetail &&
                          drillDetail.company &&
                          drillDetail.company.name}
                      </Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="Status">
                      {drillDetail && drillDetail.status && (
                        <Tag color={drillDetail.status.color_code}>
                          {drillDetail.status.name}
                        </Tag>
                      )}
                    </Descriptions.Item>
                  </Descriptions>
                </PageHeader>
              </Col>
            </Row>
            <Row
              className="hide-on-mobile"
              style={{
                marginBottom: "16px",
                padding: "24px",
                border: "1px solid rgb(237, 237, 237)",
                marginBottom: "16px",
                borderRadius: "8px",
              }}
            >
              <Col span={24}>
                <Title level={5}>To Email(s)</Title>
                {drillDetail &&
                  drillDetail.notification &&
                  drillDetail.notification.toEmailUsers &&
                  drillDetail.notification.toEmailUsers.map((toEmailUser) => {
                    return <Tag>{toEmailUser.user.name}</Tag>;
                  })}
              </Col>
            </Row>
            <Row
              style={{
                marginBottom: "16px",
                padding: "24px",
                border: "1px solid rgb(237, 237, 237)",
                marginBottom: "16px",
                borderRadius: "8px",
              }}
            >
              <Col span={24}>
                <Title level={5}>Locations/Facilities</Title>
                {drillDetail &&
                  drillDetail.locations &&
                  drillDetail.locations.map((location) => {
                    return <Tag>{location.name}</Tag>;
                  })}
              </Col>
            </Row>
            <Row
              className="hide-on-mobile"
              style={{
                marginBottom: "16px",
                padding: "24px",
                border: "1px solid rgb(237, 237, 237)",
                marginBottom: "16px",
                borderRadius: "8px",
              }}
            >
              <Col span={24}>
                <Title level={5}>Drill Purpose</Title>
                {drillDetail && <Text>{drillDetail.purpose}</Text>}
              </Col>
            </Row>
            <Space
              style={{
                display: "grid",
                padding: "24px",
                border: "1px solid rgb(237, 237, 237)",
                marginBottom: "16px",
                borderRadius: "8px",
              }}
            >
              <Row justify="space-between">
                <Col>
                  <Title level={5}>Attendence</Title>
                </Col>

                <Space>
                  {drillDetail && !drillDetail.attendence_submitted && (
                    <>
                      <Col>
                        <Button
                          disabled={
                            drillDetail &&
                            profile &&
                            drillDetail.user_id === profile.id
                              ? false
                              : true
                          }
                          // type="primary"
                          onClick={() => {
                            setAddEmployeeDrawer(true);
                          }}
                        >
                          Add Employee
                        </Button>
                      </Col>
                      <Divider type="vertical" />
                      <Col>
                        <Tooltip
                          placement="bottom"
                          title="Save, can be change later"
                        >
                          <Button
                            disabled={
                              drillDetail &&
                              profile &&
                              !saveAttendenceLoading &&
                              drillDetail.user_id === profile.id
                                ? false
                                : true
                            }
                            type="primary"
                            htmlType="submit"
                            onClick={() => {
                              handleSaveClick();
                            }}
                          >
                            Save
                          </Button>
                        </Tooltip>
                      </Col>
                    </>
                  )}

                  <Col>
                    <Tooltip
                      placement="bottom"
                      title="Once Submitted, can not be changed later"
                    >
                      <Popconfirm
                        disabled={
                          drillDetail &&
                          profile &&
                          (profile.id !== drillDetail.user_id ||
                            drillDetail.attendence_submitted)
                        }
                        title="Sure to Submit?"
                        onConfirm={() => handleSubmitClick()}
                      >
                        <Button
                          disabled={
                            drillDetail &&
                            profile &&
                            (profile.id !== drillDetail.user_id ||
                              drillDetail.attendence_submitted)
                          }
                          danger
                          type="primary"
                          htmlType="submit"
                          // onClick={() => {
                          //   handleSubmitClick();
                          // }}
                        >
                          {drillDetail && drillDetail.attendence_submitted
                            ? "Submited"
                            : "Submit"}
                        </Button>
                      </Popconfirm>
                    </Tooltip>
                  </Col>
                </Space>
              </Row>
              <Row>
                <Col span={24}>
                  <Table
                    columns={columns}
                    dataSource={attendenceEmployeesList}
                    bordered
                    rowKey="uId"
                    size="middle"
                    loading={{
                      indicator: (
                        <div>
                          <Spin />
                        </div>
                      ),
                      spinning:
                        profileLoading ||
                        drillAttendenceEmployeesLoading ||
                        saveAttendenceLoading ||
                        updateDrillLoading,
                    }}
                    pagination={false}
                  />
                </Col>
              </Row>
            </Space>
            <EmergencyDrillAttedenceEmployeeFormDrawer
              visible={addEmployeeDrawer}
              setVisible={setAddEmployeeDrawer}
              form={addEmployeeForm}
              types={types}
              employees={employees}
              handleFormSubmit={handleEmployeeAddSubmit}
            />
          </Card>
        )}
      </div>
    </>
  );
};

export default EmergencyDrillAttendence;
