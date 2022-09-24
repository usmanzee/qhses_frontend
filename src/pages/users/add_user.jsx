import React, { useState, useEffect } from "react";
import moment from "moment";

import {
  Row,
  Col,
  Form,
  Button,
  Select,
  Divider,
  Table,
  message,
  Spin,
  Card,
  Popconfirm,
} from "antd";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getUsersAction,
  getRolesAction,
  getApplicationsAction,
  getEmployeesAction,
  addUserAction,
  getApplicationMenuAction,
  getCompaniesAction,
} from "../../redux/actions";
import {
  PageLoader,
  UserApplicationFormDrawer,
  UserApplicationsList,
} from "../../components";

const AddUser = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [applicationForm] = Form.useForm();

  const [drawerVisible, setDrawerVisible] = useState(false);

  const [filteredEmployees, setFilteredEmployees] = useState([]);

  const [selectedApplications, setSelectedApplications] = useState([]);
  const usersLoading = useSelector((state) => state.users.loading);
  const users = useSelector((state) => state.users.list);

  const rolesLoading = useSelector((state) => state.roles.loading);
  const roles = useSelector((state) => state.roles.list);

  const applicationsLoading = useSelector(
    (state) => state.applications.loading
  );
  const applications = useSelector((state) => state.applications.list);

  const companiesLoading = useSelector((state) => state.companies.loading);
  const companies = useSelector((state) => state.companies.list);

  const employeesLoading = useSelector((state) => state.employees.loading);
  const employees = useSelector((state) => state.employees.list);

  const addUserLoading = useSelector((state) => state.users.addUserLoading);

  useEffect(() => {
    dispatch(getUsersAction(history, true));
    dispatch(getApplicationsAction(history));
    dispatch(getCompaniesAction(history));
    dispatch(getEmployeesAction(history));
    dispatch(getRolesAction(history));
  }, []);

  useEffect(() => {
    if (users.length && employees.length) {
      const userEmpIds = new Map(
        users.map((user) => {
          return [user.emp_id, user];
        })
      );
      var newList = employees.filter((employee) => {
        return !userEmpIds.has(employee.Emp_ID);
      });
      setFilteredEmployees(newList);
    }
  }, [users, employees]);

  const onApplicationChange = (appId) => {
    dispatch(getApplicationMenuAction(history, appId));
  };

  const handleApplicationRowDelete = (applicationId) => {
    const dataSource = [...selectedApplications];
    setSelectedApplications(
      dataSource.filter((item) => item.application_id !== applicationId)
    );
  };

  const onApplicationFormSubmit = (values) => {
    applicationForm.resetFields();
    const applicationExists = selectedApplications.find(
      (selectedApp) => selectedApp.application_id === values["application_id"]
    );
    if (applicationExists)
      return message.error("This application has already been selected.");
    const application = applications.find(
      (application) => application.id === values["application_id"]
    );
    const selectedRole = application.roles.find(
      (role) => role.id === values["application_role_id"]
    );
    const newApp = {
      allowDelete: true,
      uId: selectedApplications.length + 1,
      title: application.title,
      application_id: values["application_id"],
      application_role_name: selectedRole.name,
      application_role_id: values["application_role_id"],
      application_menu_ids: values["application_menu_ids"],
    };
    setSelectedApplications([...selectedApplications, newApp]);
    message.success("Application has been selected.");
    // setDrawerVisible(false);
  };

  const handleSubmitClick = () => {
    form.submit();
  };

  const onFormSubmit = (values) => {
    if (!selectedApplications.length)
      return message.error("Please select application first.");
    values["applications"] = selectedApplications;
    const selectedUser = users.find((user) => user.emp_id == values.emp_id);
    if (selectedUser) return message.error("This user has already been added.");

    dispatch(addUserAction(values, history));
    setSelectedApplications([]);
    form.resetFields();
  };

  const usersTableColumns = [
    {
      title: "#",
      dataIndex: "#",
      key: "#",
      render: (value, row, index) => {
        return index + 1;
      },
    },
    {
      title: "Employee Id",
      dataIndex: "emp_id",
      key: "emp_id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    // {
    //   title: "Role",
    //   dataIndex: "role_id",
    //   key: "role_id",
    //   render: (value, row, index) => {
    //     return row.role.title;
    //   },
    // },
    {
      title: "Actions",
      dataIndex: "actions",
      fixed: "right",
      width: 100,
      render: (_, row) => (
        <Button
          type="link"
          onClick={() => {
            history.push(`/users/edit/${row.id}`);
          }}
        >
          Edit
        </Button>
      ),
    },
  ];

  return (
    <>
      <div>
        {usersLoading &&
        rolesLoading &&
        employeesLoading &&
        applicationsLoading &&
        companiesLoading ? (
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
                      Add New User
                    </h1>
                  </Divider>
                </Col>
              </Row>
              <Row justify="space-between">
                <Col
                  xs={{ span: 24, offset: 0 }}
                  sm={{ span: 14, offset: 0 }}
                  md={{ span: 10, offset: 0 }}
                  lg={{ span: 10, offset: 0 }}
                  xl={{ span: 10, offset: 0 }}
                >
                  <Form
                    layout="vertical"
                    form={form}
                    onFinish={onFormSubmit}
                    autoComplete="off"
                  >
                    <Row gutter={16}>
                      <Col span={16}>
                        <Form.Item
                          name="emp_id"
                          label="Employee"
                          rules={[
                            {
                              required: true,
                              message: "Please select Employee",
                            },
                          ]}
                        >
                          <Select
                            placeholder="Select Employee"
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
                            {employees.map((employee) => {
                              return (
                                <Select.Option value={employee.Emp_ID}>
                                  {`${employee.Emp_ID} - ${employee.emp_name}`}
                                </Select.Option>
                              );
                            })}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          name="role_id"
                          label="Role"
                          rules={[
                            {
                              required: true,
                              message: "Please select Role",
                            },
                          ]}
                        >
                          <Select>
                            {roles.map((role) => {
                              return (
                                <Select.Option value={role.id}>
                                  {role.title}
                                </Select.Option>
                              );
                            })}
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <Form.Item
                          name="company_ids"
                          label="Companies"
                          rules={[
                            {
                              required: true,
                              message: "Please select Companies",
                            },
                          ]}
                        >
                          <Select
                            mode="multiple"
                            placeholder="Select Companies"
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input, option) => {
                              return (
                                option.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              );
                            }}
                            style={{ width: "100%" }}
                          >
                            {companies.map((company) => {
                              return (
                                <Select.Option
                                  key={company.id}
                                  // value={company.id}
                                >
                                  {company.name}
                                </Select.Option>
                              );
                            })}
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <Button
                          type="primary"
                          htmlType="submit"
                          //   block
                          loading={addUserLoading}
                          //   onClick={() => handleSubmitClick()}
                        >
                          Submit
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Col>
                <Col
                  xs={{ span: 24, offset: 0 }}
                  sm={{ span: 18, offset: 0 }}
                  md={{ span: 12, offset: 0 }}
                  lg={{ span: 12, offset: 0 }}
                  xl={{ span: 12, offset: 0 }}
                >
                  <Row justify="end" gutter={16}>
                    <Row justify="end" style={{ marginBottom: "12px" }}>
                      <Col>
                        <Button
                          type="primary"
                          onClick={() => {
                            setDrawerVisible(true);
                          }}
                        >
                          Add Application
                        </Button>
                      </Col>
                    </Row>
                    <Col span={24}>
                      <UserApplicationsList
                        loading={false}
                        handleRowDelete={handleApplicationRowDelete}
                        data={selectedApplications}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>

            <Card style={{ borderRadius: "8px" }}>
              <Row>
                <Col md={{ span: 24, offset: 0 }}>
                  <Table
                    bordered
                    dataSource={users}
                    columns={usersTableColumns}
                    pagination={false}
                    rowKey="user_id"
                    loading={{
                      indicator: (
                        <div>
                          <Spin />
                        </div>
                      ),
                      spinning: usersLoading,
                    }}
                  />
                </Col>
              </Row>
            </Card>

            <UserApplicationFormDrawer
              drawerVisible={drawerVisible}
              setDrawerVisible={setDrawerVisible}
              form={applicationForm}
              applications={applications}
              onApplicationChange={onApplicationChange}
              handleFormSubmit={onApplicationFormSubmit}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default AddUser;
