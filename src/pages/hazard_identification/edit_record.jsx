import React, { useState, useEffect } from "react";

import {
  Row,
  Col,
  Form,
  Button,
  Divider,
  Spin,
  Card,
  PageHeader,
  Descriptions,
  Typography,
  Table,
  Popover,
  Badge,
  List,
} from "antd";
import { QuestionCircleOutlined, EditOutlined } from "@ant-design/icons";
import moment from "moment";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as alasql from "alasql";

import {
  getUsersAction,
  getCompaniesAction,
  getHiraProbabilitiesAction,
  getHiraSeveritiesAction,
  getHiraEntitiesAction,
  getHiraHazardsAction,
  getHiraRecordDetailAction,
  addHiraRecordAssessmentAction,
  addHiraRecordAssessmentMeasurementAction,
  updateHiraRecordAssessmentAction,
} from "../../redux/actions";
import {
  PageLoader,
  AddHiraAssessmentFormDrawer,
  AddHiraMeasurementFormDrawer,
  EditHiraAssessmentFormDrawer,
  ExportCSV,
} from "../../components";

const { Title, Text } = Typography;

const EditHiraRecord = () => {
  const dateFormat = "YYYY-MM-DD";
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();

  const [addAssessmentForm] = Form.useForm();
  const [addMeasurementForm] = Form.useForm();
  const [editAssessmentForm] = Form.useForm();

  const [addAssessmentDrawerVisible, setAddAssessmentDrawerVisible] =
    useState(false);
  const [addMeasurementDrawerVisible, setAddMeasurementDrawerVisible] =
    useState(false);
  const [editAssessmentDrawerVisible, setEditAssessmentDrawerVisible] =
    useState(false);

  const [selectedAssessment, setSelectedAssessment] = useState(null);

  const [excelData, setExcelData] = useState([]);

  const profileLoading = useSelector((state) => state.profile.loading);
  const profile = useSelector((state) => state.profile.data);

  const usersLoading = useSelector((state) => state.users.loading);
  const users = useSelector((state) => state.users.list);

  const companiesLoading = useSelector((state) => state.companies.loading);
  const companies = useSelector((state) => state.companies.list);

  const hiraProbabilitiesLoading = useSelector(
    (state) => state.hiraProbabilities.loading
  );
  const hiraProbabilities = useSelector(
    (state) => state.hiraProbabilities.list
  );

  const hiraSeveritiesLoading = useSelector(
    (state) => state.hiraSeverities.loading
  );
  const hiraSeverities = useSelector((state) => state.hiraSeverities.list);

  const hiraEntitiesLoading = useSelector(
    (state) => state.hiraEntities.loading
  );
  const hiraEntities = useSelector((state) => state.hiraEntities.list);

  const hiraHazardsLoading = useSelector((state) => state.hiraHazards.loading);
  const hiraHazards = useSelector((state) => state.hiraHazards.list);

  const recordDetailLoading = useSelector(
    (state) => state.hiraRecords.detailLoading
  );
  const recordDetail = useSelector((state) => state.hiraRecords.detail);

  const updateLoading = useSelector((state) => state.hiraRecords.updateLoading);
  const updateSuccess = useSelector((state) => state.hiraRecords.updateSuccess);

  useEffect(() => {
    dispatch(getHiraRecordDetailAction(history, params.id));
  }, []);

  useEffect(() => {
    dispatch(getUsersAction(history, true));
    dispatch(getCompaniesAction, history);
    dispatch(getHiraProbabilitiesAction(history));
    dispatch(getHiraSeveritiesAction(history));
    dispatch(getHiraEntitiesAction(history));
    dispatch(getHiraHazardsAction(history));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      setAddAssessmentDrawerVisible(false);
      setAddMeasurementDrawerVisible(false);
      addAssessmentForm.resetFields();
      addMeasurementForm.resetFields();
    }
  }, [updateSuccess]);

  useEffect(() => {
    if (recordDetail && recordDetail.assessments) {
      // var data = [];
      // var activityIds = [];
      // recordDetail.assessments.forEach((assessment) => {
      //   if (!activityIds.includes(assessment.activity_id)) {
      //     activityIds.push(assessment.activity_id);
      //     data.push({
      //       activity_id: assessment.activity_id,
      //       activity: assessment.activity,
      //       assessments: [assessment],
      //     });
      //   } else {
      //     const existingData = data.find(
      //       (item) => item.activity_id === assessment.activity_id
      //     );
      //     existingData.assessments.push(assessment);
      //   }
      // });
      // setExcelData(data);

      const newData = recordDetail.assessments.map((assessment) => {
        let assessmentEntities = "";
        assessment.entities.forEach((entity, itemIndex) => {
          assessmentEntities += `${entity.code} ${
            itemIndex + 1 != assessment.entities.length ? "/ " : ""
          }`;
        });

        const severityIdex =
          assessment.probability && assessment.severity
            ? assessment.probability.value * assessment.severity.value
            : "";
        const riskCategory = severityIdex
          ? getRiskCategory(severityIdex)
          : null;

        let assessmentMeasurements = "";
        assessment.measurements.forEach((measurementItem, index) => {
          assessmentMeasurements += `${index + 1} - ${
            measurementItem.measurement
          }\n`;
        });

        const residualSeverityIdex =
          assessment.residualProbability && assessment.residualSeverity
            ? assessment.residualProbability.value *
              assessment.residualSeverity.value
            : "";
        const residualRiskCategory = residualSeverityIdex
          ? getRiskCategory(residualSeverityIdex)
          : null;
        return {
          "Sr#": assessment.id,
          Hazard: assessment.hazard.name,
          risks: assessment.risks,
          "Who or What might be Harmed": assessmentEntities,
          Probability: assessment.probability
            ? assessment.probability.name
            : "",
          Severity: assessment.severity ? assessment.severity.name : "",
          "Security Index": severityIdex,
          "Security Label": riskCategory ? riskCategory.label : "",
          "Risk Control Measures/Opportunities": assessmentMeasurements,
          "Residual Probability": assessment.residualProbability
            ? assessment.residualProbability.name
            : "",
          "Residual Severity": assessment.residualSeverity
            ? assessment.residualSeverity.name
            : "",
          "Residual Security Index": residualSeverityIdex,
          "Residual Security Label": residualRiskCategory
            ? residualRiskCategory.label
            : "",
          Remarks: assessment.remarks,
        };
      });
      setExcelData(newData);
    }
  }, [recordDetail]);

  const handleAssessmentFormSubmit = (values) => {
    const id = params.id;
    values.record_id = id;
    dispatch(addHiraRecordAssessmentAction(history, id, values));
  };
  const handleMeasurementFormSubmit = (values) => {
    const id = params.id;
    values.record_id = id;
    values.record_assessment_id = selectedAssessment.id;
    dispatch(
      addHiraRecordAssessmentMeasurementAction(
        history,
        id,
        selectedAssessment.id,
        values
      )
    );
  };

  const handleEditAssessmentFormSubmit = (values) => {
    const id = params.id;
    values.record_id = id;
    dispatch(
      updateHiraRecordAssessmentAction(
        history,
        id,
        selectedAssessment.id,
        values
      )
    );
  };

  const getRiskCategory = (value) => {
    let riskCategory = {
      label: "Low Risk",
      colorCode: "#00b050",
      description: "No action required, unless escalation of risk is possible.",
    };
    if (value <= 3) {
      riskCategory = {
        label: "Low Risk",
        colorCode: "#00b050",
        description:
          "No action required, unless escalation of risk is possible.",
      };
    } else if (value <= 6) {
      riskCategory = {
        label: "Moderate Risk",
        colorCode: "#feff00",
        description:
          "Activity or industry can operate subject to management and /or modification.",
      };
    } else if (value <= 12) {
      riskCategory = {
        label: "High Risk",
        colorCode: "#ffc000",
        description:
          "Activity or industry should be modified to include remedial planning and action and be subject to detailed HSE assessment.",
      };
    } else {
      riskCategory = {
        label: "Extreme Risk",
        colorCode: "#ff0000",
        description: "Activity or industry should not proceed in current form.",
      };
    }
    return riskCategory;
  };

  const columns = [
    {
      title: "Sr#",
      dataIndex: "id",
      key: "id",
      fixed: "left",
      defaultSortOrder: "descend",
      width: 50,
      render: (value, row, index) => row.id,
    },
    {
      title: "Hazard",
      dataIndex: "activity",
      width: 100,
      render: (value, row, index) => row.hazard && row.hazard.name,
    },
    {
      title: "Risks",
      dataIndex: "risks",
      //   width: 150,
      children: [
        {
          title: "Risks Related to Hazard",
          dataIndex: "risks",
          width: 100,
        },
        {
          title:
            "Who or What might be Harmed\n\n\nP- People \nA- Assets \nE- Environment \nR- Reputation",
          dataIndex: "risks",
          width: 100,
          render: (value, row, index) => {
            return (
              <>
                {row.entities &&
                  row.entities.map(
                    (entity, itemIndex) =>
                      `${entity.code} ${
                        itemIndex + 1 != row.entities.length ? "/ " : ""
                      }`
                  )}
              </>
            );
          },
        },
      ],
    },
    {
      title: "Initial Risk Level",
      children: [
        {
          title: "Probability",
          dataIndex: "probability",
          width: 100,
          render: (value, row, index) =>
            row.probability && row.probability.name,
        },
        {
          title: "Severity",
          dataIndex: "severity",
          width: 100,
          render: (value, row, index) => row.severity && row.severity.name,
        },
        {
          title: "Risk Rating",
          dataIndex: "severity",
          width: 100,
          render: (value, row, index) => {
            return row.probability && row.severity
              ? row.probability.value * row.severity.value
              : "";
          },
        },
        {
          title: "Risk Category",
          dataIndex: "severity",
          width: 150,
          render: (value, row, index) => {
            if (row.probability && row.severity) {
              const calculatedValue =
                row.probability.value * row.severity.value;
              const riskCategory = getRiskCategory(calculatedValue);
              return (
                <>
                  <span
                    style={{
                      backgroundColor: `${riskCategory.colorCode}`,
                      height: "10px",
                      width: "10px",
                      borderRadius: "50%",
                      display: "inline-block",
                    }}
                  ></span>

                  <Text style={{ margin: "0px 8px" }}>
                    {riskCategory.label}
                  </Text>
                  <Popover
                    content={riskCategory.description}
                    title={
                      <Badge
                        size="large"
                        color={riskCategory.colorCode}
                        text={riskCategory.label}
                      />
                    }
                  >
                    <QuestionCircleOutlined style={{ fontSize: "12px" }} />
                  </Popover>
                </>
              );
            } else {
              return "";
            }
          },
        },
      ],
    },
    {
      title: "Risk Control Measures/Opportunities",
      dataIndex: "measurements",
      width: 300,
      render: (value, row, index) => {
        return (
          <>
            <List
              dataSource={row.measurements}
              renderItem={(item, index) => (
                <List.Item>
                  <Typography.Text mark>{index + 1}</Typography.Text>
                  {"-"}
                  {item.measurement}
                </List.Item>
              )}
            />
            {/* {row.measurements &&
                row.measurements.map((measurementItem) => {
                  return (
                    <>
                      <li>
                        <Text>{measurementItem.measurement}</Text>
                      </li>
                      <Divider style={{ margin: "4px 0px" }} />
                    </>
                  );
                })} */}
          </>
        );
      },
    },
    {
      title: "Residual Risk Level",
      children: [
        {
          title: "Probability",
          dataIndex: "residualProbability",
          width: 100,
          render: (value, row, index) =>
            row.residualProbability && row.residualProbability.name,
        },
        {
          title: "Severity",
          dataIndex: "residualSeverity",
          width: 100,
          render: (value, row, index) =>
            row.residualSeverity && row.residualSeverity.name,
        },
        {
          title: "Risk Rating",
          dataIndex: "severity",
          width: 100,
          render: (value, row, index) => {
            return row.residualProbability && row.residualSeverity
              ? row.residualProbability.value * row.residualSeverity.value
              : "";
          },
        },
        {
          title: "Risk Category",
          dataIndex: "severity",
          width: 150,
          render: (value, row, index) => {
            if (row.residualProbability && row.residualSeverity) {
              const calculatedValue =
                row.residualProbability.value * row.residualSeverity.value;
              const riskCategory = getRiskCategory(calculatedValue);
              return (
                <>
                  <span
                    style={{
                      backgroundColor: `${riskCategory.colorCode}`,
                      height: "10px",
                      width: "10px",
                      borderRadius: "50%",
                      display: "inline-block",
                    }}
                  ></span>

                  <Text style={{ margin: "0px 8px" }}>
                    {riskCategory.label}
                  </Text>
                </>
              );
            } else {
              return "";
            }
          },
        },
      ],
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      width: 150,
    },
    {
      title: "Created by",
      dataIndex: "user",
      width: 100,
      render: (value, row, index) => row.user && row.user.name,
    },
    {
      title: "Last Updated By",
      dataIndex: "user",
      width: 100,
      render: (value, row, index) => row.lastUpdateBy && row.lastUpdateBy.name,
    },
    {
      title: "Created on",
      dataIndex: "createdAt",
      width: 100,
      render: (value, row, index) => moment(row.createdAt).format(dateFormat),
    },
    {
      title: "Actions",
      key: "operation",
      fixed: "right",
      width: 250,
      render: (text, row) => {
        return (
          <Row style={{ justifyContent: "space-evenly" }}>
            <Button
              type="link"
              icon={<EditOutlined />}
              size="small"
              onClick={() => {
                setSelectedAssessment(row);
                setAddMeasurementDrawerVisible(true);
              }}
            >
              Measurements
            </Button>
            <Button
              type="link"
              icon={<EditOutlined />}
              size="small"
              onClick={() => {
                setSelectedAssessment(row);
                setEditAssessmentDrawerVisible(true);
                const selectedEntityIds = row.entities.map((entity) => {
                  return entity.id;
                });
                row["entity_ids"] = selectedEntityIds;
                editAssessmentForm.setFieldsValue(row);
              }}
            >
              Update
            </Button>
          </Row>
        );
      },
    },
  ];

  return (
    <>
      <div>
        {profileLoading &&
        usersLoading &&
        companiesLoading &&
        hiraProbabilitiesLoading &&
        hiraSeveritiesLoading &&
        recordDetailLoading ? (
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
                      Update Record
                    </h1>
                  </Divider>
                </Col>
              </Row>
              <Row justify="end" style={{ marginBottom: "8px" }}>
                <Col>
                  <ExportCSV
                    csvData={excelData}
                    fileName={"ENVIRONMENTAL ASPECTS & IMPACT REGISTER"}
                  />
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
                    title={recordDetail && recordDetail.eair_number}
                  >
                    <Descriptions size="small" column={5}>
                      <Descriptions.Item label="Created By">
                        {recordDetail && recordDetail.user && (
                          <Text strong>{recordDetail.user.name}</Text>
                        )}
                      </Descriptions.Item>
                      <Descriptions.Item label="Company">
                        {recordDetail && recordDetail.company && (
                          <Text strong>{recordDetail.company.name}</Text>
                        )}
                      </Descriptions.Item>
                      <Descriptions.Item label="Date">
                        <Text strong>
                          {recordDetail &&
                            moment(recordDetail.date).format(dateFormat)}
                        </Text>
                      </Descriptions.Item>
                      <Descriptions.Item label="Created at">
                        <Text strong>
                          {recordDetail &&
                            moment(recordDetail.createdAt).format(dateFormat)}
                        </Text>
                      </Descriptions.Item>

                      <Descriptions.Item label="Last Update BY">
                        {recordDetail && recordDetail.lastUpdateBy && (
                          <Text strong>{recordDetail.lastUpdateBy.name}</Text>
                        )}
                      </Descriptions.Item>
                    </Descriptions>
                  </PageHeader>
                </Col>
              </Row>

              <Row justify="end" style={{ marginBottom: "8px" }}>
                <Col>
                  <Button
                    type="primary"
                    onClick={() => {
                      setAddAssessmentDrawerVisible(true);
                    }}
                  >
                    Add Assessment
                  </Button>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={24}>
                  <Table
                    columns={columns}
                    dataSource={recordDetail && recordDetail.assessments}
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
                        profileLoading || recordDetailLoading || updateLoading,
                    }}

                    // pagination={{
                    //   current: page,
                    //   pageSize: pageSize,
                    //   onChange: (page, pageSize) => {
                    //     setPage(page);
                    //     setPageSize(pageSize);
                    //   },
                    // }}
                  />
                </Col>
              </Row>
            </Card>
            <AddHiraAssessmentFormDrawer
              visible={addAssessmentDrawerVisible}
              setVisible={setAddAssessmentDrawerVisible}
              form={addAssessmentForm}
              addLoading={updateLoading}
              hazards={hiraHazards}
              entities={hiraEntities}
              probabilities={hiraProbabilities}
              severities={hiraSeverities}
              handleFormSubmit={handleAssessmentFormSubmit}
            />
            <AddHiraMeasurementFormDrawer
              visible={addMeasurementDrawerVisible}
              setVisible={setAddMeasurementDrawerVisible}
              form={addMeasurementForm}
              addLoading={updateLoading}
              handleFormSubmit={handleMeasurementFormSubmit}
            />
            <EditHiraAssessmentFormDrawer
              visible={editAssessmentDrawerVisible}
              setVisible={setEditAssessmentDrawerVisible}
              form={editAssessmentForm}
              addLoading={updateLoading}
              selectedAssessment={selectedAssessment}
              hazards={hiraHazards}
              entities={hiraEntities}
              probabilities={hiraProbabilities}
              severities={hiraSeverities}
              handleFormSubmit={handleEditAssessmentFormSubmit}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default EditHiraRecord;
