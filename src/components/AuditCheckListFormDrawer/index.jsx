import React, { useState, useEffect } from "react";
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
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

import { useSelector } from "react-redux";
import moment from "moment";

const { Title, Text } = Typography;

export const AuditCheckListFormDrawer = (props) => {
  const {
    drawerVisible,
    setDrawerVisible,
    form,
    addAuditChecklistLoading,
    selectedAudit,
    auditFindings,
    handleFormSubmit,
  } = props;

  return (
    <>
      <Drawer
        forceRender={true}
        title="Audit Checklist"
        width={"50%"}
        onClose={() => {
          setDrawerVisible(false);
        }}
        visible={drawerVisible}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button
              type="primary"
              loading={addAuditChecklistLoading}
              onClick={() => {
                form.submit();
              }}
            >
              Submit
            </Button>
          </Space>
        }
      >
        <Form form={form} onFinish={handleFormSubmit} layout="vertical">
          <Row>
            <Col span={24}>
              <Form.Item
                label="Process/Function"
                name={"process"}
                rules={[
                  {
                    required: true,
                    message: "Process/Function is required.",
                  },
                ]}
              >
                <Input placeholder="Process/Function" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                label="Reference"
                name={"reference"}
                rules={[
                  {
                    required: true,
                    message: "Reference is required",
                  },
                ]}
              >
                <Input placeholder="Reference" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                label="Question/Requirements"
                name={"requirements"}
                rules={[
                  {
                    required: true,
                    message: "Question/Requirements is required",
                  },
                ]}
              >
                <Input.TextArea
                  placeholder="Question/Requirements"
                  autoSize={{ minRows: 5, maxRows: 5 }}
                  showCount
                  // maxLength={500}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
