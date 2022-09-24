import React, { useState } from "react";
import {
  Row,
  Col,
  Form,
  Button,
  Select,
  Drawer,
  Spin,
  Input,
  DatePicker,
  Radio,
  PageHeader,
  Descriptions,
  Typography,
  Space,
  Upload,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import moment from "moment";
import { AuditNotificationPdfReport } from "..";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

export const AuditNotificationFormDrawer = (props) => {
  const {
    drawerVisible,
    setDrawerVisible,
    form,
    addAuditNotificationLoading,
    profile,
    selectedAudit,
    selectedAuditeeIds,
    selectedAuditorIds,
    selectedToEmailsUserIds,
    documentsList,
    setDocumentsList,
    users,
    handleFormSubmit,
  } = props;

  const disabledDate = (current) => {
    return current.year() !== parseInt(selectedAudit.year.year);
    // return current.month() !== parseInt(selectedAudit.month.value);
  };

  return (
    <>
      <Drawer
        title="Audit Notification"
        width={720}
        onClose={() => {
          setDrawerVisible(false);
        }}
        visible={drawerVisible}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            {selectedAudit && !selectedAudit.notification && (
              <Button
                disabled={
                  selectedAudit &&
                  profile &&
                  profile.id == selectedAudit.user_id
                    ? false
                    : true
                }
                type="primary"
                loading={addAuditNotificationLoading}
                onClick={() => {
                  form.submit();
                }}
              >
                {selectedAudit && selectedAudit.notification
                  ? "Update"
                  : "Submit"}
              </Button>
            )}

            {selectedAudit && selectedAudit.notification && (
              <AuditNotificationPdfReport auditDetail={selectedAudit} />
            )}
          </Space>
        }
      >
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
              title={selectedAudit && selectedAudit.audit_number}
            >
              <Descriptions size="small" column={3}>
                <Descriptions.Item label="Year">
                  {selectedAudit &&
                    selectedAudit.year &&
                    selectedAudit.year.year}
                </Descriptions.Item>
                <Descriptions.Item label="Month">
                  {selectedAudit &&
                    selectedAudit.month &&
                    selectedAudit.month.name}
                </Descriptions.Item>
                <Descriptions.Item label="Location/Area">
                  <Text>
                    {selectedAudit &&
                      selectedAudit.company &&
                      selectedAudit.company.name}

                    {selectedAudit &&
                      selectedAudit.department &&
                      selectedAudit.department.name}
                  </Text>
                </Descriptions.Item>
              </Descriptions>
            </PageHeader>
          </Col>
        </Row>
        <Form form={form} onFinish={handleFormSubmit} layout="vertical">
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Auditee(s)"
                name="auditee_ids"
                rules={[
                  {
                    required: true,
                    message: "Please Select Min 1 Auditee.",
                  },
                ]}
              >
                <Select
                  disabled={selectedAudit && selectedAudit.notification}
                  mode="multiple"
                  placeholder="Select Auditee"
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
                      <Select.Option
                        disabled={
                          selectedAuditeeIds.includes(user.id) ? true : false
                        }
                        value={user.id}
                      >
                        {user.name}
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
                label="Auditor(s)"
                name="auditor_ids"
                rules={[
                  {
                    required: true,
                    message: "Please Select Min 1 Auditor.",
                  },
                ]}
              >
                <Select
                  disabled={selectedAudit && selectedAudit.notification}
                  mode="multiple"
                  placeholder="Select Auditor"
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
                      <Select.Option
                        disabled={
                          selectedAuditorIds.includes(user.id) ? true : false
                        }
                        value={user.id}
                      >
                        {user.name}
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
                label="CC Emails"
                name="to_email_user_ids"
                rules={[
                  {
                    required: false,
                    message: "Please Select CC Emails.",
                  },
                ]}
              >
                <Select
                  disabled={selectedAudit && selectedAudit.notification}
                  mode="multiple"
                  placeholder="Select CC Emails"
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
                      <Select.Option
                        disabled={
                          selectedToEmailsUserIds.includes(user.id)
                            ? true
                            : false
                        }
                        value={user.id}
                      >
                        {user.name}
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
                label="Audit Date"
                name="audit_date_range"
                rules={[
                  {
                    required: true,
                    message: "Please Select Date Range.",
                  },
                ]}
              >
                <RangePicker
                  disabled={selectedAudit && selectedAudit.notification}
                  // disabledDate={disabledDate}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Audit Reference"
                name="reference_documents"
                rules={[
                  {
                    required: true,
                    message: "Please Input Reference Documents.",
                  },
                ]}
              >
                <Input
                  disabled={selectedAudit && selectedAudit.notification}
                  placeholder="Reference Documents"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Reference Documents(Max: 5)"
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
                  disabled={selectedAudit && selectedAudit.notification}
                  fileList={documentsList}
                  multiple={true}
                  maxCount={5}
                  listType="picture"
                  beforeUpload={() => false}
                  onChange={(info) => {
                    if (info.file.status === "removed") {
                      var index = documentsList.findIndex((document) => {
                        return document.uid == info.file.uid;
                      });
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
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Scope of Audit"
                name="scope_of_audit"
                rules={[
                  {
                    required: true,
                    message: "Please Input Scope of Audit.",
                  },
                ]}
              >
                <Input.TextArea
                  disabled={selectedAudit && selectedAudit.notification}
                  placeholder="Socpe of Audit"
                  autoSize={{ minRows: 5, maxRows: 5 }}
                  showCount
                  // maxLength={500}
                />
              </Form.Item>
            </Col>
          </Row>
          {/* <Row justify="end" gutter={16}>
            <Col>
              <Button
                type="primary"
                onClick={() => {
                  form.submit();
                }}
              >
                Submit
              </Button>
            </Col>
          </Row> */}
        </Form>
      </Drawer>
    </>
  );
};
