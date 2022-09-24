import React from "react";
import {
  Row,
  Col,
  Form,
  Button,
  Select,
  Drawer,
  Input,
  Space,
  Divider,
} from "antd";

export const EditHiraAssessmentFormDrawer = (props) => {
  const {
    visible,
    setVisible,
    form,
    addLoading,
    selectedAssessment,
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
        title="Edit Environmental Risk Assessment"
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
                <Select disabled placeholder="Hazard">
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
                <Input disabled placeholder="Hazard Risks" />
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
                  disabled
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
                <Select disabled placeholder="Probability">
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
                <Select disabled placeholder="Severity">
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
          <Divider>Residual Risk</Divider>
          <Row>
            <Col span={24}>
              <Form.Item
                label="Residual Probability"
                name="residual_probability_id"
                rules={[
                  {
                    required: true,
                    message: "Please Select Residual Probability",
                  },
                ]}
              >
                <Select placeholder="Residual Probability">
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
                label="Residual Severity"
                name="residual_severity_id"
                rules={[
                  {
                    required: true,
                    message: "Please Select Residual Severity",
                  },
                ]}
              >
                <Select placeholder="Residual Severity">
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
          <Row>
            <Col span={24}>
              <Form.Item
                label="Remarks"
                name="remarks"
                rules={[
                  {
                    required: true,
                    message: "Please Input Remarks",
                  },
                ]}
              >
                <Input.TextArea
                  placeholder="Remarks"
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
