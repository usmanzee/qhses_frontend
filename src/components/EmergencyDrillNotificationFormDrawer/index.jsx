import React, { useState } from "react";
import {
  Row,
  Col,
  Form,
  Button,
  Select,
  Drawer,
  DatePicker,
  Tag,
  PageHeader,
  Descriptions,
  Typography,
  Space,
} from "antd";
import { useSelector } from "react-redux";
import moment from "moment";
import { AuditNotificationPdfReport } from "..";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

export const EmergencyDrillNotificationFormDrawer = (props) => {
  const {
    drawerVisible,
    setDrawerVisible,
    form,
    addDataLoading,
    profile,
    selectedEmergencyDrill,
    selectedToEmailsUserIds,
    users,
    handleFormSubmit,
  } = props;

  return (
    <>
      <Drawer
        title="Emergency Drill Notification"
        width={720}
        onClose={() => {
          setDrawerVisible(false);
        }}
        visible={drawerVisible}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            {selectedEmergencyDrill && !selectedEmergencyDrill.notification && (
              <Button
                disabled={
                  selectedEmergencyDrill &&
                  profile &&
                  selectedEmergencyDrill.user_id === profile.id
                    ? false
                    : true
                }
                type="primary"
                loading={addDataLoading}
                onClick={() => {
                  form.submit();
                }}
              >
                {selectedEmergencyDrill && selectedEmergencyDrill.notification
                  ? "Update"
                  : "Submit"}
              </Button>
            )}

            {/* {selectedEmergencyDrill && selectedEmergencyDrill.notification && (
              <AuditNotificationPdfReport
                auditDetail={selectedEmergencyDrill}
              />
            )} */}
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
              title={
                selectedEmergencyDrill && selectedEmergencyDrill.audit_number
              }
            >
              <Descriptions size="small" column={4}>
                <Descriptions.Item label="Year">
                  {selectedEmergencyDrill &&
                    selectedEmergencyDrill.year &&
                    selectedEmergencyDrill.year.year}
                </Descriptions.Item>
                <Descriptions.Item label="Month">
                  {selectedEmergencyDrill &&
                    selectedEmergencyDrill.month &&
                    selectedEmergencyDrill.month.name}
                </Descriptions.Item>
                <Descriptions.Item label="Shift Time">
                  <Text strong>
                    {selectedEmergencyDrill &&
                      `${moment(selectedEmergencyDrill.shift_date_time).format(
                        "YYYY-MM-DD hh:mm A"
                      )}`}
                  </Text>
                </Descriptions.Item>
                <Descriptions.Item label="Company">
                  <Text>
                    {selectedEmergencyDrill &&
                      selectedEmergencyDrill.company &&
                      selectedEmergencyDrill.company.name}

                    {selectedEmergencyDrill &&
                      selectedEmergencyDrill.department &&
                      selectedEmergencyDrill.department.name}
                  </Text>
                </Descriptions.Item>
              </Descriptions>
            </PageHeader>
          </Col>
        </Row>
        <Row
          style={{
            marginBottom: "16px",
            padding: "24px",
            border: "1px solid rgb(237, 237, 237)",
            marginBottom: "16px",
            borderRadius: "8px",
          }}
        >
          <Col span={24}>
            <Title level={5}>Locations/Facilities</Title>
            {selectedEmergencyDrill &&
              selectedEmergencyDrill.locations &&
              selectedEmergencyDrill.locations.map((location) => {
                return <Tag>{location.name}</Tag>;
              })}
          </Col>
        </Row>
        <Form form={form} onFinish={handleFormSubmit} layout="vertical">
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
        </Form>
      </Drawer>
    </>
  );
};
