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
import {
  DistrubutorList,
  DistributorFormDrawer,
  PageLoader,
  LegalRegisterRecordAddFormDrawer,
} from "../../components";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getUsersAction,
  getYearsAction,
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

const AddLegalRegister = () => {
  const dateFormat = "YYYY-MM-DD";
  const history = useHistory();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [distrubutionUsers, setDistrubutionUsers] = useState([]);
  const [selectedDistrubationUsers, setSelectedDistrubationUsers] = useState(
    []
  );

  const [documentsList, setDocumentsList] = useState([]);

  const usersLoading = useSelector((state) => state.users.loading);
  const users = useSelector((state) => state.users.list);

  const yearsLoading = useSelector((state) => state.years.loading);
  const years = useSelector((state) => state.years.list);

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
    dispatch(getYearsAction(history));
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
            <PageLoader />
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
                      Add New Register
                    </h1>
                  </Divider>
                </Col>
              </Row>

              <Form
                layout="vertical"
                form={form}
                onFinish={onRecordFormSubmit}
                autoComplete="off"
                style={{ marginBottom: "8px" }}
              >
                <Row gutter={16}>
                  <Col span={4}>
                    <Form.Item
                      label="Year"
                      name="year_id"
                      rules={[
                        {
                          required: true,
                          message: "Year is required",
                        },
                      ]}
                    >
                      <Select placeholder="Select Year">
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

              <Row
                justify="space-between"
                style={{ marginBottom: "4px", alignItems: "center" }}
              >
                <Col>
                  <Title
                    level={5}
                    style={{ marginBottom: "4px", marginBottom: "0px" }}
                  >
                    Records
                  </Title>
                </Col>
                <Col>
                  <Button
                    type="primary"
                    onClick={() => {
                      onAddNewdistributorClick();
                    }}
                  >
                    Add Record
                  </Button>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={24}>
                  <DistrubutorList
                    loading={false}
                    handleRowDelete={handleDistributorRowDelete}
                    data={selectedDistrubationUsers}
                  />
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
      <LegalRegisterRecordAddFormDrawer
        visible={drawerVisible}
        setVisible={setDrawerVisible}
        handleFormSubmit={onDistributorFormSubmit}
      />
    </>
  );
};

export default AddLegalRegister;
