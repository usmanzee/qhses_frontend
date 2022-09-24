import React, { useState, useEffect } from "react";

import {
  Row,
  Col,
  Form,
  Button,
  Divider,
  Spin,
  Card,
  Typography,
  Table,
  Popover,
  Badge,
  Select,
} from "antd";
import {
  QuestionCircleOutlined,
  EditOutlined,
  IssuesCloseOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getUsersAction,
  getCompaniesAction,
  getEraLikelihoodsAction,
  getEraConsequencesAction,
  getEraActionsAction,
  getEraStatusesAction,
  getEraAssessmentsAction,
  getEraAssessmentDetailAction,
  addEraAssessmentsAction,
  updateEraAssessmentsAction,
  closeEraAssessmentsAction,
} from "../../redux/actions";
import {
  PageLoader,
  AddEraAssessmentFormDrawer,
  EditEraAssessmentFormDrawer,
  ExportCSV,
} from "../../components";

const { Title, Text } = Typography;

const EnterpriseRiskAssessments = () => {
  const dateFormat = "YYYY-MM-DD";
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();

  const [addAssessmentForm] = Form.useForm();
  const [editAssessmentForm] = Form.useForm();

  const [addAssessmentDrawerVisible, setAddAssessmentDrawerVisible] =
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

  const likelihoodsLoading = useSelector(
    (state) => state.eraLikelihoods.loading
  );
  const likelihoods = useSelector((state) => state.eraLikelihoods.list);

  const consequencesLoading = useSelector(
    (state) => state.eraConsequences.loading
  );
  const consequences = useSelector((state) => state.eraConsequences.list);

  const actionsLoading = useSelector((state) => state.eraActions.loading);
  const actions = useSelector((state) => state.eraActions.list);

  const statusesLoading = useSelector((state) => state.eraStatuses.loading);
  const statuses = useSelector((state) => state.eraStatuses.list);

  const assessmentsLoading = useSelector(
    (state) => state.eraAssessments.loading
  );
  const assessments = useSelector((state) => state.eraAssessments.list);

  const addLoading = useSelector((state) => state.eraAssessments.addLoading);
  const addSuccess = useSelector((state) => state.eraAssessments.addSuccess);

  const updateLoading = useSelector(
    (state) => state.eraAssessments.updateLoading
  );
  const updateSuccess = useSelector(
    (state) => state.eraAssessments.updateSuccess
  );

  useEffect(() => {
    dispatch(getUsersAction(history, true));
    dispatch(getCompaniesAction(history));
    dispatch(getEraLikelihoodsAction(history));
    dispatch(getEraConsequencesAction(history));
    dispatch(getEraActionsAction(history));
    dispatch(getEraStatusesAction(history));
    dispatch(getEraAssessmentsAction(history));
  }, []);

  useEffect(() => {
    if (addSuccess) {
      setAddAssessmentDrawerVisible(false);
      addAssessmentForm.resetFields();
    }
  }, [addSuccess]);

  useEffect(() => {
    if (updateSuccess) {
      setEditAssessmentDrawerVisible(false);
    }
  }, [updateSuccess]);

  //   useEffect(() => {
  //     if (recordDetail && recordDetail.assessments) {
  //       // var data = [];
  //       // var activityIds = [];
  //       // recordDetail.assessments.forEach((assessment) => {
  //       //   if (!activityIds.includes(assessment.activity_id)) {
  //       //     activityIds.push(assessment.activity_id);
  //       //     data.push({
  //       //       activity_id: assessment.activity_id,
  //       //       activity: assessment.activity,
  //       //       assessments: [assessment],
  //       //     });
  //       //   } else {
  //       //     const existingData = data.find(
  //       //       (item) => item.activity_id === assessment.activity_id
  //       //     );
  //       //     existingData.assessments.push(assessment);
  //       //   }
  //       // });
  //       // setExcelData(data);

  //       const newData = recordDetail.assessments.map((assessment) => {
  //         let assessmentEntities = "";
  //         assessment.entities.forEach((entity, itemIndex) => {
  //           assessmentEntities += `${entity.code} ${
  //             itemIndex + 1 != assessment.entities.length ? "/ " : ""
  //           }`;
  //         });

  //         const severityIdex =
  //           assessment.probability && assessment.severity
  //             ? assessment.probability.value * assessment.severity.value
  //             : "";
  //         const riskCategory = severityIdex
  //           ? getRiskCategory(severityIdex)
  //           : null;

  //         let assessmentMeasurements = "";
  //         assessment.measurements.forEach((measurementItem, index) => {
  //           assessmentMeasurements += `${index + 1} - ${
  //             measurementItem.measurement
  //           }\n`;
  //         });

  //         const residualSeverityIdex =
  //           assessment.residualProbability && assessment.residualSeverity
  //             ? assessment.residualProbability.value *
  //               assessment.residualSeverity.value
  //             : "";
  //         const residualRiskCategory = residualSeverityIdex
  //           ? getRiskCategory(residualSeverityIdex)
  //           : null;
  //         return {
  //             "Sr#": assessment.id,
  //             Hazard: assessment.hazard.name,
  //             risks: assessment.risks,
  //             "Who or What might be Harmed": assessmentEntities,
  //             Probability: assessment.probability
  //               ? assessment.probability.name
  //               : "",
  //             Severity: assessment.severity ? assessment.severity.name : "",
  //             "Security Index": severityIdex,
  //             "Security Label": riskCategory ? riskCategory.label : "",
  //             "Risk Control Measures/Opportunities": assessmentMeasurements,
  //             "Residual Probability": assessment.residualProbability
  //               ? assessment.residualProbability.name
  //               : "",
  //             "Residual Severity": assessment.residualSeverity
  //               ? assessment.residualSeverity.name
  //               : "",
  //             "Residual Security Index": residualSeverityIdex,
  //             "Residual Security Label": residualRiskCategory
  //               ? residualRiskCategory.label
  //               : "",
  //             Remarks: assessment.remarks,
  //         };
  //       });
  //       setExcelData(newData);
  //     }
  //   }, [recordDetail]);

  const handleAssessmentFormSubmit = (values) => {
    dispatch(addEraAssessmentsAction(history, values));
  };

  const handleEditAssessmentFormSubmit = (values) => {
    values.assessment_id = selectedAssessment.id;
    dispatch(updateEraAssessmentsAction(history, values));
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
      title: "Company",
      dataIndex: "company",
      width: 100,
      render: (value, row, index) => row.company && row.company.name,
    },
    {
      title: "Date Raised",
      dataIndex: "date_raised",
      width: 100,
      render: (value, row, index) => {
        return moment(row.date_raised).format(dateFormat);
      },
    },
    {
      title: "Threat/Opportunity",
      dataIndex: "risk_type",
      width: 100,
    },
    {
      title: "Risk Area",
      dataIndex: "risk_area",
      width: 100,
    },
    {
      title: "Event",
      dataIndex: "event",
      width: 100,
    },
    {
      title: "Cause",
      dataIndex: "cause",
      width: 300,
    },
    {
      title: "Consequence",
      dataIndex: "consequence",
    },
    {
      title: "Initial Risk Level",
      children: [
        {
          title: "Likelihood",
          dataIndex: "likelihood",
          width: 100,
          render: (value, row, index) => row.likelihood && row.likelihood.name,
        },
        {
          title: "Consequence",
          dataIndex: "consequence",
          width: 110,
          render: (value, row, index) =>
            row.consequence && row.consequence.name,
        },
        {
          title: "Risk Rating",
          dataIndex: "severity",
          width: 100,
          render: (value, row, index) => {
            return row.likelihood && row.consequence
              ? row.likelihood.value * row.consequence.value
              : "";
          },
        },
        {
          title: "Risk Category",
          dataIndex: "consequence",
          width: 120,
          render: (value, row, index) => {
            if (row.likelihood && row.consequence) {
              const calculatedValue =
                row.likelihood.value * row.consequence.value;
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
      title: "Action",
      dataIndex: "action",
      width: 100,
      render: (value, row, index) => row.action && row.action.name,
    },
    {
      title: "Plan",
      dataIndex: "plan",
      width: 300,
    },
    {
      title: "Residual Risk Level",
      children: [
        {
          title: "Likelihood",
          dataIndex: "residualLikelihood",
          width: 100,
          render: (value, row, index) =>
            row.residualLikelihood && row.residualLikelihood.name,
        },
        {
          title: "Consequence",
          dataIndex: "residualConsequence",
          width: 110,
          render: (value, row, index) =>
            row.residualConsequence && row.residualConsequence.name,
        },
        {
          title: "Risk Rating",
          dataIndex: "severity",
          width: 100,
          render: (value, row, index) => {
            return row.residualLikelihood && row.residualConsequence
              ? row.residualLikelihood.value * row.residualConsequence.value
              : "";
          },
        },
        {
          title: "Risk Category",
          dataIndex: "severity",
          width: 120,
          render: (value, row, index) => {
            if (row.residualLikelihood && row.residualConsequence) {
              const calculatedValue =
                row.residualLikelihood.value * row.residualConsequence.value;
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
      title: "Method",
      dataIndex: "methods",
      width: 200,
    },
    {
      title: "Progress and Compliance Reporting",
      dataIndex: "progress_reporting",
      width: 200,
    },
    {
      title: "Responsible",
      dataIndex: "responsible",
      width: 100,
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
      title: "Status",
      dataIndex: "status",
      fixed: "right",
      width: 100,
      render: (value, row, index) => {
        if (row.status_id !== 2) {
          return row.status && row.status.name;
        } else {
          return row.status && row.status.name;
          //   return (
          //     <>
          //       <Select defaultValue={row.status_id}>
          //         {statuses.map((status) => {
          //           return (
          //             <Select.Option value={status.id}>
          //               {status.name}
          //             </Select.Option>
          //           );
          //         })}
          //       </Select>
          //     </>
          //   );
        }
      },
    },
    {
      title: "Actions",
      key: "operation",
      fixed: "right",
      width: 150,
      render: (text, row) => {
        return (
          <Row justify="center">
            {row.status_id === 2 && (
              <>
                <Button
                  danger
                  type="link"
                  icon={<IssuesCloseOutlined />}
                  size="small"
                  onClick={() => {
                    const data = {
                      assessment_id: row.id,
                    };
                    dispatch(closeEraAssessmentsAction(history, data));
                  }}
                >
                  Close Assessment
                </Button>
                <Divider style={{ margin: "4px 0" }} />
              </>
            )}
            <Button
              type="link"
              icon={<EditOutlined />}
              size="small"
              onClick={() => {
                setSelectedAssessment(row);
                setEditAssessmentDrawerVisible(true);
                row.date_raised = moment(row.date_raised);
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
        likelihoodsLoading &&
        consequencesLoading &&
        actionsLoading &&
        statusesLoading &&
        assessmentsLoading ? (
          <div style={{ textAlign: "center", padding: "24px" }}>
            <PageLoader />
          </div>
        ) : (
          <div>
            <Card style={{ borderRadius: "8px" }}>
              {/* <Row justify="end" style={{ marginBottom: "8px" }}>
                <Col>
                  <ExportCSV
                    csvData={excelData}
                    fileName={"ENVIRONMENTAL ASPECTS & IMPACT REGISTER"}
                  />
                </Col>
              </Row> */}
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
                    dataSource={assessments}
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
                        profileLoading ||
                        assessmentsLoading ||
                        addLoading ||
                        updateLoading,
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
            <AddEraAssessmentFormDrawer
              visible={addAssessmentDrawerVisible}
              setVisible={setAddAssessmentDrawerVisible}
              form={addAssessmentForm}
              addLoading={addLoading}
              companies={companies}
              likelihoods={likelihoods}
              consequences={consequences}
              handleFormSubmit={handleAssessmentFormSubmit}
            />
            <EditEraAssessmentFormDrawer
              visible={editAssessmentDrawerVisible}
              setVisible={setEditAssessmentDrawerVisible}
              form={editAssessmentForm}
              addLoading={updateLoading}
              companies={companies}
              likelihoods={likelihoods}
              consequences={consequences}
              actions={actions}
              handleFormSubmit={handleEditAssessmentFormSubmit}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default EnterpriseRiskAssessments;
