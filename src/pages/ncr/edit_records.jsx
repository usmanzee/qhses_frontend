import React, { useState, useEffect } from "react";

import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Select,
  Divider,
  DatePicker,
  Spin,
  Card,
  PageHeader,
  Descriptions,
  Tag,
  Typography,
  message,
  Upload,
  Space,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import moment from "moment";
import {
  DistrubutorList,
  DistributorFormDrawer,
  ActionPlansList,
  ActionPlanFormDrawer,
  UpdateActionPlanFormDrawer,
  PageLoader,
  PageNoData,
} from "../../components";
import { useHistory, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getProfileAction,
  getRecordDetailAction,
  getUsersAction,
  getCompaniesAction,
  getUserCompaniesAction,
  getDepartmentsAction,
  getAreasAction,
  getCategoriesAction,
  getSourcesAction,
  getNCTypesAction,
  getManagementSystemsAction,
  getFindingTypesAction,
  updateRecordAction,
  updateCorrectiveActionPlanAction,
} from "../../redux/actions";

const { Title, Text } = Typography;

const EditNcrRecord = () => {
  const dateFormat = "YYYY-MM-DD";
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const [form] = Form.useForm();
  const [distributorDrawerVisible, setDistributorDrawerVisible] =
    useState(false);
  const [actionPlanDrawerVisible, setActionPlanDrawerVisible] = useState(false);
  const [selectedActionPlanId, setSelectedActionPlanId] = useState(0);
  const [updateActionPlanDrawerVisible, setUpdateActionPlanDrawerVisible] =
    useState(false);
  const [distrubutionUsers, setDistrubutionUsers] = useState([]);
  const [actionPlansUsers, setActionPlansUsers] = useState([]);
  const [distributorsList, setDistributorsList] = useState([]);
  const [actionPlansList, setActionPlansList] = useState([]);

  const [verification, setVerification] = useState(true);
  const [documentsList, setDocumentsList] = useState([]);
  const [actionPlanDocumentsList, setActionPlanDocumentsList] = useState([]);

  const profileLoading = useSelector((state) => state.profile.loading);
  const profile = useSelector((state) => state.profile.data);
  const recordDetailLoading = useSelector(
    (state) => state.records.recordDetailLoading
  );
  const recordDetail = useSelector((state) => state.records.recordDetail);

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
  const findingTypesLoading = useSelector(
    (state) => state.findingTypes.loading
  );
  const findingTypes = useSelector((state) => state.findingTypes.list);

  const updateRecordLoading = useSelector(
    (state) => state.records.updateRecordLoading
  );

  useEffect(() => {
    if (users.length) {
      setDistrubutionUsers(users);
      setActionPlansUsers(users);
    }
  }, [users]);

  useEffect(() => {
    if (recordDetail) {
      recordDetail.ncr_date = moment(recordDetail.ncr_date);
      form.setFieldsValue(recordDetail);

      /**
       * Set Documents
       */

      const documentData = recordDetail.documents.map((document) => {
        return {
          uid: `${document.id}_${document.document_name}`,
          name: document.document_name,
          status: "done",
          url: document.document_url,
        };
      });
      setDocumentsList(documentData);

      /**
       * Set Documents End
       */

      /**
       * Set Selected Distributors
       */
      const distributorsData = recordDetail.distributors.map((distributor) => {
        return {
          id: distributor.user.id,
          allowDelete: false,
          user: distributor.user,
          email_type: distributor.email_type,
        };
      });
      setDistributorsList(distributorsData);
      /**
       * End Set Selected Distributors
       */

      /**
       * Set Selected Actions Plans
       */
      const correctiveActionPlansData = recordDetail.correctiveActionPlans.map(
        (correctiveActionPlan, index) => {
          return {
            ...correctiveActionPlan,
            uId: index + 1,
            target_date: moment(correctiveActionPlan.target_date).format(
              dateFormat
            ),
            closing_date: correctiveActionPlan.closing_date
              ? moment(correctiveActionPlan.closing_date).format(dateFormat)
              : "",
            user_id: correctiveActionPlan.user.id,
            allowDelete: false,
            user: correctiveActionPlan.user,
          };
        }
      );
      setActionPlansList(correctiveActionPlansData);
      /**
       * End Set Selected Action Plans
       */
    }
  }, [recordDetail]);

  useEffect(() => {
    dispatch(getRecordDetailAction(params.id, history));
  }, []);

  useEffect(() => {
    dispatch(getUsersAction(history, true));
    dispatch(getCompaniesAction(history));
    dispatch(getUserCompaniesAction(history));
    dispatch(getDepartmentsAction(history));
    dispatch(getAreasAction(history));
    dispatch(getCategoriesAction(history));
    dispatch(getSourcesAction(history));
    dispatch(getNCTypesAction(history));
    dispatch(getManagementSystemsAction(history));
    dispatch(getFindingTypesAction(history));
  }, []);

  const onAddNewDistributorClick = () => {
    setDistributorDrawerVisible(true);
  };

  const handleDistributorRowDelete = (id) => {
    const dataSource = [...distributorsList];
    setDistributorsList(dataSource.filter((item) => item.id !== id));
  };

  const handleDistributorFormSubmit = (values) => {
    const selectedUser = distrubutionUsers.find((user) => {
      return user.id === values.distribution_user_id;
    });
    if (!selectedUser)
      return message.error("Unable to select this Distributor");
    if (distributorsList.length) {
      const userAlreadySelected = distributorsList.find(
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
    setDistributorsList([...distributorsList, newData]);
    message.success("Distributor Selected, Please do submit");
    // setDistributorDrawerVisible(false);
  };

  const handleAddActionPlanClick = () => {
    setActionPlanDrawerVisible(true);
  };

  const handleActionPlanRowDelete = (uId) => {
    const dataSource = [...actionPlansList];
    setActionPlansList(dataSource.filter((item) => item.uId !== uId));
  };

  const handleActionPlanFormSubmit = (values) => {
    const selectedUser = actionPlansUsers.find((user) => {
      return user.id === values.responsible_user_id;
    });
    if (!selectedUser)
      return message.error("Unable to add action plan against this user.");
    // if (actionPlansList.length) {
    //   const userAlreadySelected = actionPlansList.find(
    //     (actionPlan) => actionPlan.user.email === selectedUser.email
    //   );
    //   if (userAlreadySelected)
    //     return message.error("An action Plan already assigned to this person.");
    // }
    const date1 = new Date(recordDetail.ncr_date);
    const date2 = new Date(values.target_date);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const newData = {
      uId: actionPlansList.length + 1,
      user_id: selectedUser.id,
      allowDelete: true,
      user: selectedUser,
      description: values.description,
      days: diffDays,
      status: "OPEN",
      target_date: values.target_date.format(dateFormat),
    };
    setActionPlansList([...actionPlansList, newData]);
    message.success("Action Plan Selected, Please do submit");
    // setActionPlanDrawerVisible(false);
  };

  const handleUpdateActionPlanClick = (actionPlanId) => {
    setSelectedActionPlanId(actionPlanId);
    setUpdateActionPlanDrawerVisible(true);
  };

  const handleUpdateActionPlanFormSubmit = (values) => {
    // const reqData = {
    //   ncr_record_id: params.id,
    //   action_plan_id: selectedActionPlanId,
    //   closing_date: values.closing_date,
    //   closing_remarks: values.closing_remarks,
    // };
    const formData = new FormData();
    formData.append("ncr_record_id", params.id);
    formData.append("action_plan_id", selectedActionPlanId);
    formData.append("closing_date", values.closing_date);
    formData.append("closing_remarks", values.closing_remarks);
    actionPlanDocumentsList.forEach((document) => {
      formData.append("documents", document);
    });
    dispatch(
      updateCorrectiveActionPlanAction(
        params.id,
        selectedActionPlanId,
        formData,
        history
      )
    );
    setUpdateActionPlanDrawerVisible(false);
  };

  const handleRecordUpdate = () => {
    form.submit();
  };

  const onRecordFormSubmit = (values) => {
    const formData = new FormData();
    formData.append("ncr_record_id", params.id);

    formData.append("company_id", values.company_id);
    formData.append("department_id", values.department_id);
    formData.append("owner_id", values.owner_id);
    formData.append("supplier", values.supplier);
    formData.append("category_id", values.category_id);
    formData.append("nc_type_id", values.nc_type_id);
    formData.append("management_system_id", values.management_system_id);
    formData.append("source_id", values.source_id);
    formData.append("description", values.description);

    if (values.root_cause != null && profile.id === recordDetail.owner_id) {
      formData.append("root_cause", values.root_cause);
    }
    if (
      values.correction_action != null &&
      profile.id === recordDetail.owner_id
    ) {
      formData.append("correction_action", values.correction_action);
    }
    if (
      values.verification_effectiveness != null &&
      recordDetail.user_id === profile.id
    ) {
      formData.append(
        "verification_effectiveness",
        values.verification_effectiveness
      );
    }
    if (values.closing_remarks) {
      formData.append("closing_remarks", values.closing_remarks);
    }

    if (distributorsList.length) {
      const distributorsData = distributorsList
        .filter((distributor) => {
          return distributor.allowDelete === true;
        })
        .map((distributor) => {
          return {
            user_id: distributor.user.id,
            user_name: distributor.user.name,
            user_email: distributor.user.email,
            email_type: distributor.email_type,
          };
        });
      if (distributorsData && distributorsData.length) {
        formData.append("distributors", JSON.stringify(distributorsData));
      }
    }
    if (actionPlansList.length) {
      const actionPlansData = actionPlansList
        .filter((actionPlan) => {
          return actionPlan.allowDelete === true;
        })
        .map((actionPlan) => {
          return {
            responsible_user_id: actionPlan.user.id,
            responsible_user_name: actionPlan.user.name,
            responsible_user_email: actionPlan.user.email,
            target_date: actionPlan.target_date,
            description: actionPlan.description,
          };
        });
      if (actionPlansData && actionPlansData.length) {
        formData.append("correctivePlans", JSON.stringify(actionPlansData));
      }
    }
    documentsList.forEach((document) => {
      if (!(document.status && document.status === "done")) {
        formData.append("documents", document);
      }
    });
    dispatch(updateRecordAction(params.id, formData, history));
  };

  return (
    <>
      <div>
        {profileLoading &&
        recordDetailLoading &&
        usersLoading &&
        companiesLoading &&
        userCompaniesLoading &&
        departmentsLoading &&
        areasLoading &&
        categoriesLoading &&
        sourcesLoading &&
        ncTypesLoading &&
        managementSystemsLoading &&
        findingTypesLoading ? (
          <PageLoader />
        ) : !profile && !recordDetail ? (
          <PageNoData
            message="NCR Record Not Found"
            backLink="/ncr/records"
            bankText="Go Back"
          />
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
                      Update NCR
                    </h1>
                  </Divider>
                </Col>
              </Row>
              <Row
                style={{
                  border: "1px solid #ededed",
                  borderRadius: "8px",
                  padding: "4px",
                  marginBottom: "16px",
                }}
              >
                <Col>
                  <PageHeader
                    ghost={false}
                    title={recordDetail && recordDetail.ncr_number}
                  >
                    <Descriptions size="small" column={5}>
                      <Descriptions.Item label="Created By">
                        {recordDetail && recordDetail.user && (
                          <Text strong>{recordDetail.user.name}</Text>
                        )}
                      </Descriptions.Item>
                      <Descriptions.Item label="NCR Owner">
                        {recordDetail && recordDetail.owner && (
                          <Text strong>{recordDetail.owner.name}</Text>
                        )}
                      </Descriptions.Item>
                      <Descriptions.Item label="Created at">
                        <Text strong>
                          {recordDetail &&
                            moment(recordDetail.createdAt).format(dateFormat)}
                        </Text>
                      </Descriptions.Item>
                      <Descriptions.Item label="NCR Date">
                        <Text strong>
                          {recordDetail &&
                            moment(recordDetail.ncr_date).format(dateFormat)}
                        </Text>
                      </Descriptions.Item>
                      <Descriptions.Item label="NCR Status">
                        {recordDetail && recordDetail.status && (
                          <Tag color="geekblue">{recordDetail.status.name}</Tag>
                        )}
                      </Descriptions.Item>
                    </Descriptions>
                  </PageHeader>
                </Col>
              </Row>
              <Row gutter={16} justify="space-between">
                <Col span={12}>
                  <Form
                    layout="vertical"
                    form={form}
                    onFinish={onRecordFormSubmit}
                    autoComplete="off"
                  >
                    <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item
                          name="finding_type_id"
                          label="Finding Type"
                          rules={[
                            {
                              required: true,
                              message: "Please Select Finding Type",
                            },
                          ]}
                        >
                          <Select disabled>
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
                    </Row>
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
                          <Select
                            disabled={
                              recordDetail &&
                              profile &&
                              profile.id === recordDetail.user_id &&
                              recordDetail.status_id === 8
                                ? false
                                : true
                            }
                          >
                            {companies.map((company) => {
                              return (
                                <Select.Option value={company.id}>
                                  {company.name}
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
                          <Select
                            disabled={
                              recordDetail &&
                              profile &&
                              profile.id === recordDetail.user_id &&
                              recordDetail.status_id === 8
                                ? false
                                : true
                            }
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
                            disabled={
                              recordDetail &&
                              profile &&
                              profile.id === recordDetail.user_id &&
                              recordDetail.status_id === 8
                                ? false
                                : true
                            }
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
                          <Select disabled>
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
                          <Input
                            disabled={
                              recordDetail &&
                              profile &&
                              profile.id === recordDetail.user_id &&
                              recordDetail.status_id === 8
                                ? false
                                : true
                            }
                            placeholder="supplier"
                          />
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
                          <Select
                            disabled={
                              recordDetail &&
                              profile &&
                              profile.id === recordDetail.user_id &&
                              recordDetail.status_id === 8
                                ? false
                                : true
                            }
                          >
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
                            disabled={
                              recordDetail &&
                              profile &&
                              profile.id === recordDetail.user_id &&
                              recordDetail.status_id === 8
                                ? false
                                : true
                            }
                            format={dateFormat}
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
                          <Select
                            disabled={
                              recordDetail &&
                              profile &&
                              profile.id === recordDetail.user_id &&
                              recordDetail.status_id === 8
                                ? false
                                : true
                            }
                          >
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
                          <Select
                            disabled={
                              recordDetail &&
                              profile &&
                              profile.id === recordDetail.user_id &&
                              recordDetail.status_id === 8
                                ? false
                                : true
                            }
                          >
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
                          <Select
                            disabled={
                              recordDetail &&
                              profile &&
                              profile.id === recordDetail.user_id &&
                              recordDetail.status_id === 8
                                ? false
                                : true
                            }
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
                            disabled={
                              recordDetail &&
                              profile &&
                              profile.id === recordDetail.user_id &&
                              recordDetail.status_id === 8
                                ? false
                                : true
                            }
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
                          name="root_cause"
                          label="Root Cause"
                          rules={[
                            {
                              required: false,
                              message: "Please input Root Cause",
                            },
                          ]}
                        >
                          <Input.TextArea
                            disabled={
                              recordDetail &&
                              profile &&
                              (recordDetail.status_id === 8 ||
                                recordDetail.owner_id === profile.id)
                                ? false
                                : true
                            }
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
                          name="correction_action"
                          label="Correction"
                          rules={[
                            {
                              required: false,
                              message: "Please input Correction",
                            },
                          ]}
                        >
                          <Input.TextArea
                            disabled={
                              profile &&
                              recordDetail &&
                              (recordDetail.status_id === 8 ||
                                recordDetail.owner_id === profile.id)
                                ? false
                                : true
                            }
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
                            disabled={
                              profile &&
                              recordDetail &&
                              (profile.id === recordDetail.user_id ||
                                profile.id === recordDetail.owner_id)
                                ? false
                                : true
                            }
                            // value={documentsList}
                            // showUploadList={false}
                            fileList={documentsList}
                            multiple={true}
                            maxCount={5}
                            listType="picture"
                            beforeUpload={() => false}
                            onChange={(info) => {
                              if (info.file.status === "removed") {
                                var index = documentsList.findIndex(
                                  (document) => {
                                    return document.uid == info.file.uid;
                                  }
                                );
                                const newDocumentsList = documentsList.slice();
                                newDocumentsList.splice(index, 1);
                                setDocumentsList(newDocumentsList);
                              } else {
                                setDocumentsList((prevDocuments) => [
                                  info.file,
                                  ...prevDocuments,
                                ]);
                              }
                            }}
                            onRemove={(file) => {}}
                            onPreview={(file) => {
                              if (file.status && file.status === "done") {
                                window.open(file.url);
                              }
                            }}
                            itemRender={(originNode, file, currFileList) => {
                              const uploadedFile = recordDetail.documents.find(
                                (document) =>
                                  document.document_name === file.name
                              );
                              return (
                                <>
                                  {uploadedFile && file.status === "done" ? (
                                    <div style={{ marginTop: "12px" }}>
                                      <Space>
                                        <Text strong>Uploaded By:</Text>
                                        <Text>{` ${uploadedFile.uploadedBy.name}`}</Text>
                                        <Text strong>On</Text>
                                        <Text>{` ${moment(
                                          uploadedFile.createdAt
                                        ).format("YYYY-MM-DD")}`}</Text>
                                      </Space>
                                      {originNode}
                                    </div>
                                  ) : (
                                    originNode
                                  )}
                                  {/* {originNode} */}
                                </>
                              );
                            }}
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

                    <div>
                      <Row gutter={16}>
                        <Col span={24}>
                          <Divider>
                            <h3
                              style={{
                                fontSize: "16px",
                                fontWeight: "600",
                              }}
                            >
                              Close NCR
                            </h3>
                          </Divider>
                        </Col>
                      </Row>
                      <Row gutter={16}>
                        <Col span={24}>
                          <Form.Item
                            name="verification_effectiveness"
                            label="Verification of Effectiveness"
                            rules={[
                              {
                                required:
                                  profile &&
                                  recordDetail &&
                                  recordDetail.user_id === profile.id &&
                                  recordDetail.status_id === 5
                                    ? true
                                    : false,
                                message: "Please select verification option",
                              },
                            ]}
                          >
                            <Select
                              disabled={
                                profile &&
                                recordDetail &&
                                recordDetail.user_id === profile.id &&
                                recordDetail.status_id === 5
                                  ? false
                                  : true
                              }
                              style={{ width: "100%" }}
                              onChange={(value) => {
                                setVerification(value);
                              }}
                            >
                              <Select.Option value={true}>
                                Satisfactory
                              </Select.Option>
                              <Select.Option value={false}>
                                Not Satisfactory
                              </Select.Option>
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={16}>
                        <Col span={24}>
                          <Form.Item
                            name="closing_remarks"
                            label="Remarks"
                            // rules={[
                            //   {
                            //     required: true,
                            //     message: "Please input your closing remarks",
                            //   },
                            // ]}
                          >
                            <Input.TextArea
                              disabled={
                                profile &&
                                recordDetail &&
                                recordDetail.user.id == profile.id &&
                                recordDetail.status_id == 5
                                  ? false
                                  : true
                              }
                              autoSize={{ minRows: 5, maxRows: 5 }}
                              showCount
                              // maxLength={500}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    </div>
                  </Form>
                </Col>
                <Col span={12}>
                  <Row
                    justify="space-between"
                    style={{ marginBottom: "4px", alignItems: "center" }}
                  >
                    <Col>
                      <Title level={5} style={{ marginBottom: "0px" }}>
                        Distribution List
                      </Title>
                    </Col>
                    {profile &&
                      recordDetail &&
                      (profile.id === recordDetail.user_id ||
                        profile.id === recordDetail.owner_id) &&
                      recordDetail.status_id != 5 &&
                      recordDetail.status_id != 6 && (
                        <Col>
                          <Button
                            type="primary"
                            onClick={() => {
                              onAddNewDistributorClick();
                            }}
                          >
                            Add Distributor
                          </Button>
                        </Col>
                      )}
                  </Row>
                  <Row>
                    <Col span={24}>
                      <DistrubutorList
                        loading={recordDetailLoading}
                        handleRowDelete={handleDistributorRowDelete}
                        data={distributorsList}
                      />
                    </Col>
                  </Row>
                  <Row
                    justify="space-between"
                    gutter={16}
                    style={{
                      marginTop: "16px",
                      marginBottom: "4px",
                      alignItems: "center",
                    }}
                  >
                    <Col>
                      <Title level={5} style={{ marginBottom: "0px" }}>
                        Corrective Actions
                      </Title>
                    </Col>
                    {profile &&
                      recordDetail &&
                      profile.id === recordDetail.owner_id &&
                      recordDetail.status_id != 5 &&
                      recordDetail.status_id != 6 && (
                        <Col>
                          <Button
                            type="primary"
                            onClick={() => {
                              handleAddActionPlanClick();
                            }}
                          >
                            Add Corrective Action Plan
                          </Button>
                        </Col>
                      )}
                  </Row>
                  <Row>
                    <Col span={24}>
                      <ActionPlansList
                        loading={recordDetailLoading}
                        profileLoading={profileLoading}
                        profile={profile}
                        handleRowDelete={handleActionPlanRowDelete}
                        handleEditClick={handleUpdateActionPlanClick}
                        data={actionPlansList}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>

              {profile &&
                recordDetail &&
                (profile.id === recordDetail.user_id ||
                  profile.id === recordDetail.owner_id) &&
                recordDetail.status_id != 6 && (
                  <Row justify="start">
                    <Col>
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={updateRecordLoading}
                        onClick={() => handleRecordUpdate()}
                      >
                        {verification ? "Submit" : "Revise & Resubmit"}
                      </Button>
                    </Col>
                  </Row>
                )}
            </Card>
          </div>
        )}
      </div>
      <DistributorFormDrawer
        drawerVisible={distributorDrawerVisible}
        setDrawerVisible={setDistributorDrawerVisible}
        distrubutionUsers={distrubutionUsers}
        handleFormSubmit={handleDistributorFormSubmit}
      />
      <ActionPlanFormDrawer
        drawerVisible={actionPlanDrawerVisible}
        setDrawerVisible={setActionPlanDrawerVisible}
        ncrRecord={recordDetail}
        users={actionPlansUsers}
        departments={departments}
        handleFormSubmit={handleActionPlanFormSubmit}
      />
      <UpdateActionPlanFormDrawer
        drawerVisible={updateActionPlanDrawerVisible}
        setDrawerVisible={setUpdateActionPlanDrawerVisible}
        actionPlanDocuments={actionPlanDocumentsList}
        setActionPlanDocuments={setActionPlanDocumentsList}
        ncrRecord={recordDetail}
        handleFormSubmit={handleUpdateActionPlanFormSubmit}
      />
    </>
  );
};

export default EditNcrRecord;
