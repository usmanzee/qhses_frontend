import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Select,
  Divider,
  DatePicker,
  message,
  Spin,
  Card,
  Upload,
  Typography,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { DistrubutorList, DistributorFormDrawer } from "../../components";
import { useHistory } from "react-router-dom";
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
  addRecordAction,
  getUserCompaniesAction,
} from "../../redux/actions";

const { Title } = Typography;

const AddNcrRecord = () => {
  const dateFormat = "YYYY-MM-DD";
  const history = useHistory();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [distrubutionUsers, setDistrubutionUsers] = useState([]);
  const [selectedDistrubationUsers, setSelectedDistrubationUsers] = useState(
    []
  );
  let tempFilesList = [];
  const [documentsList, setDocumentsList] = useState([]);

  const usersLoading = useSelector((state) => state.users.loading);
  const users = useSelector((state) => state.users.list);

  const areasLoading = useSelector((state) => state.areas.loading);
  const areas = useSelector((state) => state.areas.list);

  const companiesLoading = useSelector((state) => state.companies.loading);
  const companies = useSelector((state) => state.companies.list);

  const userCompaniesLoading = useSelector(
    (state) => state.userCompanies.loading
  );
  const userCompanies = useSelector((state) => state.userCompanies.list);

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

  const addRecordLoading = useSelector(
    (state) => state.records.addRecordLoading
  );

  useEffect(() => {
    if (users.length) {
      setDistrubutionUsers(users);
    }
  }, [users]);

  useEffect(() => {
    dispatch(getUsersAction(history));
    dispatch(getCompaniesAction(history));
    dispatch(getDepartmentsAction(history));
    dispatch(getAreasAction(history));
    dispatch(getCategoriesAction(history));
    dispatch(getSourcesAction(history));
    dispatch(getNCTypesAction(history));
    dispatch(getManagementSystemsAction(history));
    dispatch(getUserCompaniesAction(history));
  }, []);

  const onAddNewdistributorClick = () => {
    setDrawerVisible(true);
  };

  const handleDistributorRowDelete = (id) => {
    const dataSource = [...selectedDistrubationUsers];
    setSelectedDistrubationUsers(dataSource.filter((item) => item.id !== id));
  };

  const onDistributorFormSubmit = (values) => {
    const selectedUser = distrubutionUsers.find((user) => {
      return user.id === values.distribution_user_id;
    });
    if (!selectedUser)
      return message.error("Unable to select this Distributor");
    if (selectedDistrubationUsers.length) {
      const userAlreadySelected = selectedDistrubationUsers.find(
        (distributor) => distributor.user.email === selectedUser.email
      );
      if (userAlreadySelected)
        return message.error("This Distributor is already selected.");
    }
    const newData = {
      id: selectedUser.id,
      allowDelete: true,
      user: selectedUser,
      email_type: values.email_type,
    };
    setSelectedDistrubationUsers([...selectedDistrubationUsers, newData]);
    // setDrawerVisible(false);
    message.success("Distributor Selected, Please do submit");
  };

  const handleRecordFormClick = () => {
    form.submit();
  };

  const onRecordFormSubmit = (values) => {
    if (selectedDistrubationUsers.length) {
      var distributorsData = selectedDistrubationUsers.map((distributor) => {
        return {
          user_id: distributor.user.id,
          user_name: distributor.user.name,
          user_email: distributor.user.email,
          email_type: distributor.email_type,
        };
      });
      values["distributors"] = JSON.stringify(distributorsData);
    }
    const selectedCompany = companies.find(
      (company) => company.id === values.company_id
    );
    const selectedDepartment = departments.find(
      (department) => department.id === values.department_id
    );
    const selectedCategory = categories.find(
      (category) => category.id === values.category_id
    );
    const selectedSource = sources.find(
      (source) => source.id === values.source_id
    );
    if (selectedCompany) {
      values["company_code"] = selectedCompany.code;
    }
    if (selectedDepartment) {
      values["department_code"] = selectedDepartment.code;
    }
    if (selectedCategory) {
      values["category_code"] = selectedCategory.code;
    }
    if (selectedSource) {
      values["source_code"] = selectedSource.code;
    }
    values["ncr_date"] = moment(values["ncr_date"]).format(dateFormat);
    const formData = new FormData();
    for (const name in values) {
      formData.append(name, values[name]);
    }
    documentsList.forEach((document) => {
      formData.append("documents", document);
    });
    dispatch(addRecordAction(formData, history));
  };

  return (
    <>
      <div>
        {usersLoading &&
        companiesLoading &&
        userCompaniesLoading &&
        departmentsLoading &&
        areasLoading &&
        categoriesLoading &&
        sourcesLoading &&
        ncTypesLoading &&
        managementSystemsLoading ? (
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
                      Register New NCR
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
                    onFinish={onRecordFormSubmit}
                    autoComplete="off"
                    hideRequiredMark
                  >
                    <Row gutter={16}>
                      <Col span={12}>
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
                          <Select placeholder="Select Business Unit/Company">
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
                      <Col span={12}>
                        <Form.Item
                          name="department_id"
                          label="Department"
                          rules={[
                            {
                              required: true,
                              message: "Please select Department",
                            },
                          ]}
                        >
                          <Select placeholder="Select Department">
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
                    </Row>
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item
                          name="owner_id"
                          label="NCR Owner"
                          rules={[
                            {
                              required: true,
                              message: "Please select NCR Owner",
                            },
                          ]}
                        >
                          <Select
                            placeholder="Select NCR Owner"
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
                      <Col span={12}>
                        {/* <Form.Item
                          name="area_id"
                          label="Area"
                          rules={[
                            { required: true, message: "Please select Area" },
                          ]}
                        >
                          <Select>
                            {areas.map((area) => {
                              return (
                                <Select.Option value={area.id}>
                                  {area.name}
                                </Select.Option>
                              );
                            })}
                          </Select>
                        </Form.Item> */}
                        <Form.Item
                          name="supplier"
                          label="Supplier"
                          rules={[
                            {
                              required: false,
                              message: "Please input supplier",
                            },
                          ]}
                        >
                          <Input placeholder="supplier" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item
                          name="category_id"
                          label="Category"
                          rules={[
                            {
                              required: true,
                              message: "Please select Category",
                            },
                          ]}
                        >
                          <Select placeholder="Select Category">
                            {categories.map((category) => {
                              return (
                                <Select.Option value={category.id}>
                                  {category.name}
                                </Select.Option>
                              );
                            })}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          name="ncr_date"
                          label="Date of NCR"
                          rules={[
                            {
                              required: true,
                              message: "Please select NCR Date",
                            },
                          ]}
                        >
                          <DatePicker
                            allowClear={false}
                            // disabledDate={(current) => {
                            //   let customDate = moment().format(dateFormat);
                            //   return (
                            //     current &&
                            //     current < moment(customDate, dateFormat)
                            //   );
                            // }}
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item
                          name="nc_type_id"
                          label="NC Type"
                          rules={[
                            {
                              required: true,
                              message: "Please select NC Type",
                            },
                          ]}
                        >
                          <Select placeholder="Select NC Type">
                            {ncTypes.map((ncType) => {
                              return (
                                <Select.Option value={ncType.id}>
                                  {ncType.name}
                                </Select.Option>
                              );
                            })}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          name="management_system_id"
                          label="Management System"
                          rules={[
                            {
                              required: true,
                              message: "Please select Management System",
                            },
                          ]}
                        >
                          <Select placeholder="Select Management System">
                            {managementSystems.map((managementSystem) => {
                              return (
                                <Select.Option value={managementSystem.id}>
                                  {managementSystem.name}
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
                          name="source_id"
                          label="NCR Source"
                          rules={[
                            {
                              required: true,
                              message: "Please select NCR Source",
                            },
                          ]}
                        >
                          <Select placeholder="Select NCR Source">
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
                    </Row>
                    <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item
                          name="description"
                          label="Description"
                          rules={[
                            {
                              required: true,
                              message: "Please input description",
                            },
                          ]}
                        >
                          <Input.TextArea
                            placeholder="Description"
                            autoSize={{ minRows: 5, maxRows: 5 }}
                            showCount
                            // maxLength={500}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item
                          label="Upload Documents(Max: 5)"
                          // name="documents"
                          getValueFromEvent={({ file }) => {}}
                          rules={[
                            {
                              required: false,
                              message: "Please select any document",
                            },
                          ]}
                        >
                          <Upload.Dragger
                            // value={documentsList}
                            fileList={documentsList}
                            multiple={true}
                            maxCount={5}
                            listType="picture"
                            beforeUpload={() => false}
                            onChange={(info) => {
                              if (info.file.status === "removed") {
                                const index = documentsList.indexOf(info.file);
                                const newDocumentsList = documentsList.slice();
                                newDocumentsList.splice(index, 1);
                                setDocumentsList(newDocumentsList);
                              } else {
                                setDocumentsList((prevDocuments) => [
                                  ...prevDocuments,
                                  info.file,
                                ]);
                              }
                            }}
                            onRemove={(file) => {}}
                            onPreview={(file) => {}}
                          >
                            <p className="ant-upload-drag-icon">
                              <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">
                              Click or drag file to this area to upload
                            </p>
                          </Upload.Dragger>
                        </Form.Item>
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
                  <Row
                    justify="space-between"
                    style={{ marginBottom: "4px", alignItems: "center" }}
                  >
                    <Col>
                      <Title
                        level={5}
                        style={{ marginBottom: "4px", marginBottom: "0px" }}
                      >
                        Distribution List
                      </Title>
                    </Col>
                    <Col>
                      <Button
                        type="primary"
                        onClick={() => {
                          onAddNewdistributorClick();
                        }}
                      >
                        Add Distributor
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <DistrubutorList
                        loading={false}
                        handleRowDelete={handleDistributorRowDelete}
                        data={selectedDistrubationUsers}
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
                    loading={addRecordLoading}
                    onClick={() => handleRecordFormClick()}
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
            </Card>
          </div>
        )}
      </div>
      <DistributorFormDrawer
        drawerVisible={drawerVisible}
        setDrawerVisible={setDrawerVisible}
        distrubutionUsers={distrubutionUsers}
        handleFormSubmit={onDistributorFormSubmit}
      />
    </>
  );
};

export default AddNcrRecord;
