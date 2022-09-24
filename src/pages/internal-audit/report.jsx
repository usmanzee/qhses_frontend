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
  Input,
} from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams, Link } from "react-router-dom";
import {
  getAuditFindingsAction,
  getAuditDetailAction,
  updateAuditAction,
} from "../../redux/actions";
import { AuditChecklistPdfReport } from "../../components";
import { AuditPdfReport } from "../../components";

import moment from "moment";

const { Title, Text } = Typography;

const AuditReport = () => {
  const dateFormat = "YYYY-MM-DD";
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const [form] = Form.useForm();

  const profileLoading = useSelector((state) => state.profile.loading);
  const profile = useSelector((state) => state.profile.data);

  const auditFindingsLoading = useSelector(
    (state) => state.auditFindings.loading
  );
  const auditFindings = useSelector((state) => state.auditFindings.list);

  const auditDetailLoading = useSelector(
    (state) => state.audits.auditDetailLoading
  );
  const auditDetail = useSelector((state) => state.audits.auditDetail);

  const updateAuditLoading = useSelector(
    (state) => state.audits.updateAuditLoading
  );

  useEffect(() => {
    dispatch(getAuditFindingsAction(history));
    dispatch(getAuditDetailAction(history, params.id));
  }, []);

  useEffect(() => {
    if (auditDetail) {
      form.setFieldsValue(auditDetail);
    }
  }, [auditDetail]);

  const handleFormSubmit = (values) => {
    values["audit_id"] = params.id;
    dispatch(updateAuditAction(history, values, params.id));
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
              {/* <AuditChecklistPdfReport auditDetail={auditDetail} /> */}
              <AuditPdfReport auditDetail={auditDetail} />
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

          <Row
            style={{
              display: "grid",
              padding: "24px",
              border: "1px solid rgb(237, 237, 237)",
              marginBottom: "16px",
              borderRadius: "8px",
            }}
          >
            <Col span={24}>
              <Title level={5}>Checklist</Title>
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
                  spinning: profileLoading || auditDetailLoading,
                }}
                pagination={false}
              />
            </Col>
          </Row>
          <Row
            style={{
              marginTop: "16px",
              display: "grid",
              padding: "24px",
              border: "1px solid rgb(237, 237, 237)",
              marginBottom: "16px",
              borderRadius: "8px",
            }}
            gutter={16}
          >
            <Col span={24}>
              <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
                <Row justify="space-between" gutter={16}>
                  <Col span={8}>
                    <Form.Item
                      label="Follow-up on previous audit findings(Internal/External)"
                      name="previous_audit_follow_up"
                    >
                      <Input.TextArea
                        placeholder="Follow-up on previous audit findings"
                        autoSize={{ minRows: 5, maxRows: 5 }}
                        showCount
                        // maxLength={500}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Audit Evidence" name="audit_evidence">
                      <Input.TextArea
                        placeholder="Audit Evidence"
                        autoSize={{ minRows: 5, maxRows: 5 }}
                        showCount
                        // maxLength={500}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Other Facts and Incidents if any:"
                      name="other_facts_incidents"
                    >
                      <Input.TextArea
                        placeholder="Other Facts and Incidents"
                        autoSize={{ minRows: 5, maxRows: 5 }}
                        showCount
                        // maxLength={500}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify="end" gutter={16}>
                  <Col>
                    <Button
                      type="primary"
                      loading={updateAuditLoading}
                      onClick={() => {
                        form.submit();
                      }}
                    >
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
};

export default AuditReport;
