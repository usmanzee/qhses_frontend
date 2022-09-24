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
  DatePicker,
} from "antd";

export const AddEraAssessmentFormDrawer = (props) => {
  const {
    visible,
    setVisible,
    form,
    addLoading,
    companies,
    likelihoods,
    consequences,
    handleFormSubmit,
  } = props;

  return (
    <>
      <Drawer
        forceRender={true}
        title="Risk Assessment"
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
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Company"
                name="company_id"
                rules={[
                  {
                    required: true,
                    message: "Please Select Company",
                  },
                ]}
              >
                <Select placeholder="Select Company">
                  {companies.map((company) => {
                    return (
                      <Select.Option value={company.id}>
                        {company.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Date Raised"
                name="date_raised"
                rules={[
                  {
                    required: true,
                    message: "Date Raised is required",
                  },
                ]}
              >
                <DatePicker
                  placeholder="Select Date Raised"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Risk Type"
                name="risk_type"
                rules={[
                  {
                    required: true,
                    message: "Risk Type is required",
                  },
                ]}
              >
                <Select placeholder="Select Risk Type">
                  <Select.Option value="THREAT">Threat</Select.Option>
                  <Select.Option value="OPPORTUNITY">Opportunity</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Risk Area"
                name="risk_area"
                rules={[
                  {
                    required: true,
                    message: "Risk Area is required",
                  },
                ]}
              >
                <Input placeholder="Input Risk Area" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Event"
                name="event"
                rules={[
                  {
                    required: true,
                    message: "Event is required",
                  },
                ]}
              >
                <Input placeholder="e.g: Change Management, Incident Management, Manpower / Staff Shortages" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Likelihood"
                name="likelihood_id"
                rules={[
                  {
                    required: true,
                    message: "Please Select Likelihood",
                  },
                ]}
              >
                <Select placeholder="Select Likelihood">
                  {likelihoods.map((likelihood) => {
                    return (
                      <Select.Option value={likelihood.id}>
                        {likelihood.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Consequence"
                name="consequence_id"
                rules={[
                  {
                    required: true,
                    message: "Please Select Consequence",
                  },
                ]}
              >
                <Select placeholder="Select Consequence">
                  {consequences.map((consequence) => {
                    return (
                      <Select.Option value={consequence.id}>
                        {consequence.name}
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
                label="Cause"
                name="cause"
                rules={[
                  {
                    required: true,
                    message: "Cause is required",
                  },
                ]}
              >
                <Input.TextArea
                  placeholder="Input Cause"
                  autoSize={{ minRows: 5, maxRows: 5 }}
                  showCount
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Consequence/Risks"
                name="consequences"
                rules={[
                  {
                    required: true,
                    message: "Consequence is required",
                  },
                ]}
              >
                <Input.TextArea
                  placeholder="Input Consequence"
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
