import React from "react";
import { Row, Col, Form, Button, Input, Drawer, TimePicker } from "antd";

export const EmergencyDrillHighlightFormDrawer = (props) => {
  const { visible, setVisible, handleFormSubmit } = props;

  return (
    <>
      <Drawer
        title="Add New Highlight"
        width={720}
        onClose={() => {
          setVisible(false);
        }}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        extra={<Button />}
      >
        <Form onFinish={handleFormSubmit} layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Event"
                name="event"
                rules={[
                  {
                    required: true,
                    message: "Please input event",
                  },
                ]}
              >
                <Input placeholder="e.g: Drill start time at" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                label="Time"
                name="time"
                rules={[
                  {
                    required: true,
                    message: "Please select highlight time ",
                  },
                ]}
              >
                <TimePicker
                  allowClear={false}
                  placeholder="Select time"
                  onChange={() => {}}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col>
              <Form.Item label="">
                <Button type="primary" htmlType="submit">
                  Add
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
