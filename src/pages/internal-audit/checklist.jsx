import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Form,
  Select,
  Button,
  Table,
  Modal,
  Spin,
  Tag,
  message,
  PageHeader,
  Descriptions,
  Typography,
  Space,
  Popconfirm,
  Divider,
} from "antd";
import { FileTextOutlined } from "@ant-design/icons";

import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams, Link } from "react-router-dom";
import {
  getAuditsAction,
  getAuditFindingsAction,
  addAuditChecklistAction,
  getAuditDetailAction,
  deleteAuditChecklistAction,
  updateAuditChecklistAction,
  submitAuditChecklistAction,
  completeAuditAction,
  copyAuditChecklistAction,
} from "../../redux/actions";
import {
  CustomIcon,
  ScheduleAuditFormDrawer,
  AuditNotificationFormDrawer,
  AuditCheckListFormDrawer,
  AuditChecklistEditFormModal,
  AuditChecklistPdfReport,
  AuditChecklistCopyFormModal,
} from "../../components";

import moment from "moment";

const { Title, Text } = Typography;

const AuditChecklist = () => {
  const dateFormat = "YYYY-MM-DD";
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const [addform] = Form.useForm();
  const [editForm] = Form.useForm();
  const [copyChecklistForm] = Form.useForm();

  const [auditChecklistFormDrawerVisible, setAuditChecklistFormDrawerVisible] =
    useState(false);

  const [
    auditChecklistEditFormDrawerVisible,
    setAuditChecklistEditFormDrawerVisible,
  ] = useState(false);

  const [auditChecklistCopyModalVisible, setAuditChecklistCopyModalVisible] =
    useState(false);

  const [filteredAudits, setFilteredAudits] = useState([]);

  const [selectedChecklist, setSelectedChecklist] = useState(null);

  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const [showCompleteButton, setShowCompleteButton] = useState(false);

  const profileLoading = useSelector((state) => state.profile.loading);
  const profile = useSelector((state) => state.profile.data);

  const auditFindingsLoading = useSelector(
    (state) => state.auditFindings.loading
  );
  const auditFindings = useSelector((state) => state.auditFindings.list);

  const allAuditsLoading = useSelector((state) => state.audits.loading);
  const allAudits = useSelector((state) => state.audits.list);

  const auditDetailLoading = useSelector(
    (state) => state.audits.auditDetailLoading
  );
  const auditDetail = useSelector((state) => state.audits.auditDetail);

  const addAuditChecklistLoading = useSelector(
    (state) => state.audits.addAuditChecklistLoading
  );
  const addAuditChecklistSuccess = useSelector(
    (state) => state.audits.addAuditChecklistSuccess
  );

  const updateAuditChecklistLoading = useSelector(
    (state) => state.audits.updateAuditChecklistLoading
  );
  const updateAuditChecklistSuccess = useSelector(
    (state) => state.audits.updateAuditChecklistSuccess
  );
  const deleteAuditChecklistLoading = useSelector(
    (state) => state.audits.deleteAuditChecklistLoading
  );
  const deleteAuditChecklistSuccess = useSelector(
    (state) => state.audits.deleteAuditChecklistSuccess
  );

  useEffect(() => {
    dispatch(getAuditsAction(1, history));
    dispatch(getAuditFindingsAction(history));
    dispatch(getAuditDetailAction(history, params.id));
  }, []);

  useEffect(() => {
    if (allAudits && auditDetail) {
      const filteredAudits = allAudits.filter(
        (audit) => audit.id !== auditDetail.id && audit.checklist.length
      );
      setFilteredAudits(filteredAudits);
    }
  }, [allAudits, auditDetail]);

  useEffect(() => {
    if (addAuditChecklistSuccess) {
      addform.resetFields();
      setAuditChecklistFormDrawerVisible(false);
    }
  }, [addAuditChecklistSuccess]);

  useEffect(() => {
    if (auditDetail) {
      if (auditDetail.checklist) {
        const unsubmittedChecklistWithFinding = auditDetail.checklist.find(
          (checklistItem) => checklistItem.finding && !checklistItem.submitted
        );
        setShowSubmitButton(unsubmittedChecklistWithFinding ? true : false);

        const unsubmittedChecklist = auditDetail.checklist.find(
          (checklistItem) => !checklistItem.submitted
        );
        setShowCompleteButton(
          auditDetail.audit_status_id === 3 && !unsubmittedChecklist
            ? true
            : false
        );
      }
    }
  }, [auditDetail]);

  useEffect(() => {
    if (updateAuditChecklistSuccess) {
      editForm.resetFields();
      setAuditChecklistEditFormDrawerVisible(false);
      if (auditChecklistCopyModalVisible) {
        setAuditChecklistCopyModalVisible(false);
      }
    }
  }, [updateAuditChecklistSuccess]);

  const onChecklistFromSubmit = (values) => {
    values["audit_id"] = auditDetail.id;
    dispatch(addAuditChecklistAction(history, values, auditDetail.id));
  };

  const onChecklistDelete = (checklistId) => {
    dispatch(deleteAuditChecklistAction(history, auditDetail.id, checklistId));
  };

  const handleChecklistEditClick = (checklist) => {
    setSelectedChecklist(checklist);
    editForm.setFieldsValue(checklist);
    setAuditChecklistEditFormDrawerVisible(true);
  };

  const onChecklistEditFromSubmit = (values) => {
    values["audit_id"] = auditDetail.id;
    console.log(values);
    dispatch(
      updateAuditChecklistAction(
        history,
        values,
        auditDetail.id,
        selectedChecklist.id
      )
    );
  };

  const handleAuditChecklistCopyFormSubmit = (values) => {
    const auditId = auditDetail.id;
    values.audit_id = auditId;
    dispatch(copyAuditChecklistAction(history, values, auditId));
  };

  const columns = [
    {
      title: "Process/Function",
      dataIndex: "process",
      fixed: "left",
      width: 100,
    },
    {
      title: "Reference",
      dataIndex: "reference",
      width: 120,
    },
    {
      title: "Question/Requirement",
      dataIndex: "requirements",
      width: 120,
    },

    {
      title: "Finding",
      dataIndex: "audit_finding_id",
      width: 120,
      render: (value, row, index) => {
        return (
          <>
            {row.finding && (
              <>
                <span
                  style={{
                    backgroundColor: `${row.finding.color_code}`,
                    height: "10px",
                    width: "10px",
                    borderRadius: "50%",
                    display: "inline-block",
                  }}
                ></span>
                <Text style={{ marginLeft: "8px" }}>{row.finding.name}</Text>
              </>
            )}
          </>
        );
      },
    },
    {
      title: "Observations",
      dataIndex: "observations",
      width: 120,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      width: 120,
      render: (value, row, index) => {
        return (
          <>
            {profile &&
              auditDetail &&
              profile.id === auditDetail.user_id &&
              !row.submitted && (
                <>
                  <Button
                    type="link"
                    onClick={() => {
                      handleChecklistEditClick(row);
                    }}
                    style={{ padding: "0px" }}
                  >
                    Edit
                  </Button>
                  <Divider type="vertical" />
                  <Popconfirm
                    title="Sure to delete?"
                    onConfirm={() => {
                      onChecklistDelete(row.id);
                    }}
                  >
                    <a>Delete</a>
                  </Popconfirm>
                </>
              )}
          </>
        );
      },
    },
  ];

  return (
    <>
      <div>
        <Card style={{ marginBottom: "8px" }}>
          <Row
            justify="end"
            style={{ alignItems: "center", marginBottom: "8px" }}
          >
            <Col style={{ marginLeft: "8px" }}>
              <AuditChecklistPdfReport auditDetail={auditDetail} />
            </Col>
          </Row>
          <Row
            style={{
              border: "1px solid #ededed",
              borderRadius: "8px",
              marginBottom: "16px",
            }}
          >
            <Col>
              <PageHeader
                ghost={false}
                title={auditDetail && auditDetail.audit_number}
              >
                <Descriptions size="small" column={5}>
                  <Descriptions.Item label="Year">
                    {auditDetail && auditDetail.year && auditDetail.year.year}
                  </Descriptions.Item>
                  <Descriptions.Item label="Month">
                    {auditDetail && auditDetail.month && auditDetail.month.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Date">
                    {auditDetail &&
                      auditDetail.notification &&
                      `${moment(
                        auditDetail.notification.audit_from_date
                      ).format(dateFormat)} to ${moment(
                        auditDetail.notification.audit_to_date
                      ).format(dateFormat)}`}
                  </Descriptions.Item>
                  <Descriptions.Item label="Location/Area">
                    <Text>
                      {auditDetail &&
                        auditDetail.company &&
                        auditDetail.company.name}

                      {auditDetail &&
                        auditDetail.department &&
                        auditDetail.department.name}
                    </Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="Status">
                    {auditDetail && auditDetail.status && (
                      <Tag color={auditDetail.status.color_code}>
                        {auditDetail.status.name}
                      </Tag>
                    )}
                  </Descriptions.Item>
                </Descriptions>
              </PageHeader>
            </Col>
          </Row>

          <Space
            size={24}
            style={{
              display: "grid",
              padding: "24px",
              border: "1px solid rgb(237, 237, 237)",
              marginBottom: "16px",
              borderRadius: "8px",
            }}
          >
            <Row gutter={[16, 24]}>
              <Col span={8}>
                <Title level={5}>Auditee(s)</Title>
                {auditDetail &&
                  auditDetail.notification &&
                  auditDetail.notification.auditees &&
                  auditDetail.notification.auditees.map((auditee) => {
                    return <Tag>{auditee.user.name}</Tag>;
                  })}
              </Col>
              <Col span={8}>
                <Title level={5}>Auditor(s)</Title>
                {auditDetail &&
                  auditDetail.notification &&
                  auditDetail.notification.auditors &&
                  auditDetail.notification.auditors.map((auditor) => {
                    return <Tag>{auditor.user.name}</Tag>;
                  })}
              </Col>
              <Col span={8}>
                <Title level={5}>CC Email(s)</Title>
                {auditDetail &&
                  auditDetail.notification &&
                  auditDetail.notification.toEmailUsers &&
                  auditDetail.notification.toEmailUsers.map((toEmailUser) => {
                    return <Tag>{toEmailUser.user.name}</Tag>;
                  })}
              </Col>
            </Row>
            <Row gutter={[16, 24]}>
              <Col span={8}>
                <Title level={5}>Audit Date</Title>
                <Text>
                  {auditDetail &&
                    auditDetail.notification &&
                    `${moment(auditDetail.notification.audit_from_date).format(
                      dateFormat
                    )} to ${moment(
                      auditDetail.notification.audit_to_date
                    ).format(dateFormat)}`}
                </Text>
              </Col>
              <Col span={8}>
                <Title level={5}>Reference Documents</Title>
                <Text>
                  {auditDetail &&
                    auditDetail.notification &&
                    auditDetail.notification.reference_documents}
                </Text>
              </Col>
              <Col span={8}>
                <Title level={5}>Scope of Audit</Title>
                <Text>
                  {auditDetail &&
                    auditDetail.notification &&
                    auditDetail.notification.scope_of_audit}
                </Text>
              </Col>
            </Row>
            <Row gutter={[16, 24]}>
              <Col span={24}>
                <Title level={5}>Document Attachments</Title>
                <Row gutter={8}>
                  {auditDetail &&
                  auditDetail.notification &&
                  auditDetail.notification.referenceDocuments
                    ? auditDetail.notification.referenceDocuments.map(
                        (document, index) => {
                          const imagesTypes = ["jpg", "jpeg", "png", "gif"];
                          const docMimeType =
                            document.document_name.split(".")[1];
                          return (
                            <>
                              <Col span={8}>
                                <Link
                                  to={{ pathname: document.document_url }}
                                  target="_blank"
                                  style={{
                                    display: "flex",
                                    border: "1px solid #f0f0f0",
                                    padding: "4px 8px",
                                    cursor: "pointer",
                                  }}
                                >
                                  <Space>
                                    {imagesTypes.includes(docMimeType) ? (
                                      <img
                                        width={40}
                                        height={40}
                                        src={`${document.document_url}`}
                                      />
                                    ) : (
                                      <FileTextOutlined
                                        style={{ fontSize: "40px" }}
                                      />
                                    )}
                                    <a>{document.document_name}</a>
                                  </Space>
                                </Link>
                              </Col>
                            </>
                          );
                        }
                      )
                    : "N/A"}
                </Row>
              </Col>
            </Row>
          </Space>
          <Row gutter={16} justify="space-between">
            <Col>
              <Title level={5}>Checklist</Title>
            </Col>
            <Col style={{ marginBottom: "4px" }}>
              {profile &&
                auditDetail &&
                profile.id === auditDetail.user_id &&
                auditDetail.audit_status_id !== 4 &&
                !auditDetail.checklist.length && (
                  <>
                    <Button
                      type="dashed"
                      onClick={() => {
                        setAuditChecklistCopyModalVisible(true);
                      }}
                    >
                      Copy Checklist
                    </Button>
                    <Divider type="vertical" />
                  </>
                )}
              {profile &&
                auditDetail &&
                profile.id === auditDetail.user_id &&
                auditDetail.audit_status_id !== 4 && (
                  <Button
                    type="primary"
                    onClick={() => {
                      setAuditChecklistFormDrawerVisible(true);
                    }}
                  >
                    Add Checklist
                  </Button>
                )}
              {profile &&
                auditDetail &&
                profile.id === auditDetail.user_id &&
                showSubmitButton && (
                  <Button
                    danger
                    type="primary"
                    style={{ marginLeft: "4px" }}
                    onClick={() => {
                      dispatch(
                        submitAuditChecklistAction(
                          history,
                          { audit_id: params.id },
                          auditDetail.id
                        )
                      );
                    }}
                  >
                    Submit Checklist
                  </Button>
                )}
              {profile &&
                auditDetail &&
                profile.id === auditDetail.user_id &&
                showCompleteButton && (
                  <Button
                    danger
                    style={{ marginLeft: "4px" }}
                    onClick={() => {
                      dispatch(
                        completeAuditAction(
                          history,
                          { audit_id: params.id },
                          auditDetail.id
                        )
                      );
                    }}
                  >
                    Mark as Completed
                  </Button>
                )}
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Table
                columns={columns}
                dataSource={auditDetail ? auditDetail.checklist : []}
                bordered
                rowKey="id"
                size="middle"
                loading={{
                  indicator: (
                    <div>
                      <Spin />
                    </div>
                  ),
                  spinning:
                    profileLoading ||
                    auditDetailLoading ||
                    deleteAuditChecklistLoading ||
                    updateAuditChecklistLoading,
                }}
                pagination={false}
              />
            </Col>
          </Row>
        </Card>

        <AuditCheckListFormDrawer
          drawerVisible={auditChecklistFormDrawerVisible}
          setDrawerVisible={setAuditChecklistFormDrawerVisible}
          form={addform}
          addAuditChecklistLoading={addAuditChecklistLoading}
          selectedAudit={auditDetail}
          auditFindings={auditFindings}
          handleFormSubmit={onChecklistFromSubmit}
        />
        <AuditChecklistEditFormModal
          visible={auditChecklistEditFormDrawerVisible}
          setVisible={setAuditChecklistEditFormDrawerVisible}
          form={editForm}
          loadingForm={updateAuditChecklistLoading}
          selectedChecklist={selectedChecklist}
          auditFindings={auditFindings}
          handleFormSubmit={onChecklistEditFromSubmit}
        />
        <AuditChecklistCopyFormModal
          visible={auditChecklistCopyModalVisible}
          setVisible={setAuditChecklistCopyModalVisible}
          form={copyChecklistForm}
          loading={updateAuditChecklistLoading}
          audits={filteredAudits}
          onFormSubmit={handleAuditChecklistCopyFormSubmit}
        />
      </div>
    </>
  );
};

export default AuditChecklist;
