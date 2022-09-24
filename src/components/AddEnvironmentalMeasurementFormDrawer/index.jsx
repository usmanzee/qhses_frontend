import React from "react";
import { Row, Col, Form, Button, Drawer, Input, Space } from "antd";

export const AddEnvironmentalMeasurementFormDrawer = (props) => {
  const { visible, setVisible, form, addLoading, handleFormSubmit } = props;

  return (
    <>
      <Drawer
        forceRender={true}
        title="Assessment Control Measurement"
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
                label="Measurement"
                name="measurement"
                rules={[
                  {
                    required: true,
                    message: "Please Input Measurement",
                  },
                ]}
              >
                <Input.TextArea
                  placeholder="Measurement"
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
