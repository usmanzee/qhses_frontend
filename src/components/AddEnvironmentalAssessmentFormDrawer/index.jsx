import React from "react";
import { Row, Col, Form, Button, Select, Drawer, Input, Space } from "antd";

export const AddEnvironmentalAssessmentFormDrawer = (props) => {
  const {
    visible,
    setVisible,
    form,
    addLoading,
    activities,
    probabilities,
    severities,
    handleFormSubmit,
  } = props;

  return (
    <>
      <Drawer
        forceRender={true}
        title="Environmental Risk Assessment"
        width={"50%"}
        onClose={() => {
          setVisible(false);
        }}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button
              type="primary"
              loading={addLoading}
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
                label="Activity"
                name="activity_id"
                rules={[
                  {
                    required: true,
                    message: "Please Select Activity",
                  },
                ]}
              >
                <Select placeholder="Activity">
                  {activities.map((activity) => {
                    return (
                      <Select.Option value={activity.id}>
                        {activity.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                label="Environmental Aspect"
                name="aspect"
                rules={[
                  {
                    required: true,
                    message: "Environmental Aspect is required",
                  },
                ]}
              >
                <Input placeholder="Environmental Aspect" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                label="Environmental Impact"
                name="impact"
                rules={[
                  {
                    required: true,
                    message: "Environmental Impact is required",
                  },
                ]}
              >
                <Input placeholder="Environmental Impact" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                label="Probability"
                name="probability_id"
                rules={[
                  {
                    required: true,
                    message: "Please Select Probability",
                  },
                ]}
              >
                <Select placeholder="Probability">
                  {probabilities.map((probability) => {
                    return (
                      <Select.Option value={probability.id}>
                        {probability.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                label="Severity"
                name="severity_id"
                rules={[
                  {
                    required: true,
                    message: "Please Select Severity",
                  },
                ]}
              >
                <Select placeholder="Severity">
                  {severities.map((severity) => {
                    return (
                      <Select.Option value={severity.id}>
                        {severity.name}
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
