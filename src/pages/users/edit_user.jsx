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
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getUsersAction,
  getUserDetailAction,
  getRolesAction,
  getApplicationsAction,
  getApplicationMenuAction,
  getCompaniesAction,
  updateUserAction,
} from "../../redux/actions";
import {
  UserApplicationFormDrawer,
  UserApplicationsList,
  UserApplicationEditFormDrawer,
} from "../../components";

const EditUser = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const [form] = Form.useForm();
  const [applicationForm] = Form.useForm();
  const [applicationEditForm] = Form.useForm();

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [editDrawerVisible, setEditDrawerVisible] = useState(false);

  const [selectedCompanyIds, setSelectedCompanyIds] = useState([]);

  const [selectedApplications, setSelectedApplications] = useState([]);
  const [applicationsToDelete, setApplicationsToDelete] = useState([]);
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

  const userDetailLoading = useSelector(
    (state) => state.users.userDetailLoading
  );
  const userDetail = useSelector((state) => state.users.userDetail);
  const updateUserLoading = useSelector(
    (state) => state.users.updateUserLoading
  );

  useEffect(() => {
    dispatch(getUsersAction(history, true));
    dispatch(getApplicationsAction(history));
    dispatch(getCompaniesAction(history));
    dispatch(getRolesAction(history));
  }, []);

  useEffect(() => {
    dispatch(getUserDetailAction(history, params.id));
  }, []);

  useEffect(() => {
    if (userDetail) {
      /**
       * Set Existing Applications
       */

      const selectedApplicationsData = userDetail.userApplications.map(
        (userApplication, index) => {
          return {
            ...userApplication,
            uId: index + 1,
            allowEdit: false,
            allowDelete: true,
            id: userApplication.application.id,
            application_id: userApplication.application.id,
            title: userApplication.application.title,
            application_role_id: userApplication.userRole.id,
            application_role_name: userApplication.userRole.name,
            application_menu_ids: [],
            // application_menu_ids: values["application_menu_ids"],
          };
        }
      );
      setSelectedApplications(selectedApplicationsData);
      /**
       * Set Existing Applications End
       */

      const selectedCompanyIdsData = userDetail.companies.map((company) => {
        return company.id;
      });
      setSelectedCompanyIds(selectedCompanyIdsData);
      userDetail["company_ids"] = selectedCompanyIdsData;
      form.setFieldsValue(userDetail);
    }
  }, [userDetail]);

  const handleApplicationRowDelete = (applicationId) => {
    const dataSource = [...selectedApplications];
    const appToDelete = dataSource.find(
      (item) => item.application_id === applicationId
    );
    if (appToDelete.id) {
      setApplicationsToDelete([...applicationsToDelete, appToDelete]);
    }
    setSelectedApplications(
      dataSource.filter((item) => item.application_id !== applicationId)
    );
  };

  const onApplicationFormSubmit = (values) => {
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
    applicationForm.resetFields();
    // setDrawerVisible(false);
  };

  const onEditClick = (selectedApplication) => {
    // applicationEditForm.setFieldsValue({
    //   application_id: 1,
    // });
    console.log(selectedApplication);
  };

  const onApplicationEditFormSubmit = (values) => {};

  const handleSubmitClick = () => {
    form.submit();
  };

  const onFormSubmit = (values) => {
    // if (!applications && !applications.length)
    // return message.error("Please select application first.");
    const selectedUser = users.find((user) => user.emp_id == values.emp_id);
    if (selectedUser) return message.error("This user has already been added.");

    values["applications"] = selectedApplications;

    let companyIdsToAdd = [];
    let companyIdsToDelete = [];
    let applicationsToAdd = [];

    if (values.company_ids.length) {
      values.company_ids.forEach((companyId) => {
        if (!selectedCompanyIds.includes(companyId)) {
          companyIdsToAdd.push(companyId);
        }
      });
    }

    if (values.company_ids.length) {
      selectedCompanyIds.forEach((selectedCompanyId) => {
        if (!values.company_ids.includes(selectedCompanyId)) {
          companyIdsToDelete.push(selectedCompanyId);
        }
      });
    }

    if (values.applications.length) {
      values.applications.forEach((application) => {
        if (!application.id) {
          applicationsToAdd.push(application);
        }
      });
    }
    values["applications"] = applicationsToAdd;
    values["applicationsToDelete"] = applicationsToDelete;
    values["company_ids"] = companyIdsToAdd;
    values["companysToDelete"] = companyIdsToDelete;
    console.log(values);
    dispatch(updateUserAction(params.id, values, history));
    // setSelectedApplications([]);
    // form.resetFields();
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
    {
      title: "Role",
      dataIndex: "role_id",
      key: "role_id",
      render: (value, row, index) => {
        return row.role.title;
      },
    },
    // {
    //   title: "operation",
    //   dataIndex: "operation",
    //   fixed: "right",
    //   width: 100,
    //   render: (_, row) => (
    //     <Button
    //       type="link"
    //       onClick={() => {
    //         console.log("delete");
    //       }}
    //     >
    //       Edit
    //     </Button>
    //   ),
    // },
  ];

  return (
    <>
      <div>
        {usersLoading &&
        rolesLoading &&
        applicationsLoading &&
        companiesLoading ? (
          <div style={{ textAlign: "center", padding: "24px" }}>
            <Spin />
          </div>
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
                      Edit User
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
                    hideRequiredMark
                  >
                    <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item
                          name="id"
                          label="User"
                          rules={[
                            {
                              required: true,
                              message: "Please select user",
                            },
                          ]}
                        >
                          <Select
                            disabled
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
                      {/* <Col span={8}>
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
                      </Col> */}
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
                            style={{ width: "100%" }}
                            placeholder="Please Select Companies"
                            optionFilterProp="children"
                            filterOption={(input, option) => {
                              return (
                                option.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              );
                            }}
                            onChange={(value) => {
                              console.log(value);
                            }}
                          >
                            {companies.map((company) => {
                              return (
                                <Select.Option
                                  value={company.id}
                                  // disabled={
                                  //   selectedCompanyIds.includes(company.id)
                                  //     ? true
                                  //     : false
                                  // }
                                >
                                  {company.name}
                                </Select.Option>
                              );
                            })}
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row justify="space-between">
                      <Col span={4}>
                        <Button
                          danger
                          type="primary"
                          onClick={() => history.goBack()}
                        >
                          Cancel
                        </Button>
                      </Col>
                      <Col span={4}>
                        <Button
                          type="primary"
                          htmlType="submit"
                          //   block
                          loading={updateUserLoading}
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
                        onEditClick={onEditClick}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>

            <UserApplicationFormDrawer
              drawerVisible={drawerVisible}
              setDrawerVisible={setDrawerVisible}
              form={applicationForm}
              applications={applications}
              handleFormSubmit={onApplicationFormSubmit}
            />
            <UserApplicationEditFormDrawer
              drawerVisible={editDrawerVisible}
              setDrawerVisible={setEditDrawerVisible}
              form={applicationEditForm}
              applications={applications}
              handleFormSubmit={onApplicationEditFormSubmit}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default EditUser;
