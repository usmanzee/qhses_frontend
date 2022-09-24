import React from "react";
import { Row, Col, Form, Button, Drawer, Input, Select } from "antd";

export const LegalRegisterRecordAddFormDrawer = (props) => {
  const { visible, setVisible, form, loading, years, handleFormSubmit } = props;

  return (
    <>
      <Drawer
        title="Add Register Record"
        width={720}
        onClose={() => {
          setVisible(false);
        }}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Button
            type="primary"
            loading={loading}
            onClick={() => {
              form.submit();
            }}
          >
            Add Record
          </Button>
        }
      >
        <Form form={form} onFinish={handleFormSubmit} layout="vertical">
          <Row gutter={16}>
            <Col span={24}>
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
                      <Select.Option value={year.id}>{year.year}</Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Legal & other References"
                name="legal_other_references"
                rules={[
                  {
                    required: true,
                    message: "Legal & other References is required.",
                  },
                ]}
              >
                <Input placeholder="e.g: Federal Law No. 2 of 2015" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Activity"
                name="activity"
                rules={[
                  {
                    required: true,
                    message: "Activity is required",
                  },
                ]}
              >
                <Input.TextArea
                  placeholder="e.g: Commercial License"
                  autoSize={{ minRows: 5, maxRows: 5 }}
                  showCount
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Legal & other Requirements"
                name="legal_other_requirements"
                rules={[
                  {
                    required: true,
                    message: "Legal & other Requirements is required",
                  },
                ]}
              >
                <Input placeholder="e.g: Article 11" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Reference Documents"
                name="reference_documents"
                rules={[
                  {
                    required: true,
                    message: "Reference Documents is required.",
                  },
                ]}
              >
                <Input placeholder="e.g: Commercial License No. CN-1869580" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Responsible"
                name="responsible"
                rules={[
                  {
                    required: true,
                    message: "Responsible is required.",
                  },
                ]}
              >
                <Input placeholder="e.g: Management & PRO, QHSSE Manager" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Remarks"
                name="remarks"
                rules={[
                  {
                    required: false,
                    message: "Remarks is required.",
                  },
                ]}
              >
                <Input.TextArea
                  placeholder="Enter Remarks"
                  autoSize={{ minRows: 5, maxRows: 5 }}
                  showCount
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
