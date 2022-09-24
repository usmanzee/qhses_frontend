import React from "react";
import { Row, Col, Form, Button, Select, Drawer, Input, Space } from "antd";

export const AddHiraAssessmentFormDrawer = (props) => {
  const {
    visible,
    setVisible,
    form,
    addLoading,
    hazards,
    entities,
    probabilities,
    severities,
    handleFormSubmit,
  } = props;

  return (
    <>
      <Drawer
        forceRender={true}
        title="Hazard Risk Assessment"
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
                label="Hazard"
                name="hazard_id"
                rules={[
                  {
                    required: true,
                    message: "Please Select Hazard",
                  },
                ]}
              >
                <Select placeholder="Hazard">
                  {hazards.map((hazard) => {
                    return (
                      <Select.Option value={hazard.id}>
                        {hazard.name}
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
                label="Hazard Risks"
                name="risks"
                rules={[
                  {
                    required: true,
                    message: "Hazard Risks is required",
                  },
                ]}
              >
                <Input placeholder="Hazard Risks" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                label="Who or What might be Harmed"
                name="entity_ids"
                rules={[
                  {
                    required: true,
                    message: "Please Select Options",
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  placeholder="Who or What might be Harmed"
                  optionFilterProp="children"
                  filterOption={(input, option) => {
                    return (
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    );
                  }}
                >
                  {entities.map((entity) => {
                    return (
                      <Select.Option value={entity.id}>
                        {entity.name}
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
