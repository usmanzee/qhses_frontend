import React from "react";
import {
  Row,
  Col,
  Form,
  Button,
  Drawer,
  Input,
  DatePicker,
  Checkbox,
} from "antd";

export const LegalRegisterRecordAddReviewFormDrawer = (props) => {
  const { visible, setVisible, form, loading, handleFormSubmit } = props;

  return (
    <>
      <Drawer
        title="Add Register Record Review"
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
            Add Review
          </Button>
        }
      >
        <Form
          form={form}
          onFinish={handleFormSubmit}
          layout="vertical"
          initialValues={{ review_done: true }}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Review Done"
                name="review_done"
                valuePropName="checked"
                rules={[
                  {
                    required: true,
                    message: "Checkbox field is required.",
                  },
                ]}
              >
                <Checkbox disabled>Yes</Checkbox>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Expiry Date"
                name="expiry_date"
                rules={[
                  {
                    required: false,
                    message: "Expiry Date is required.",
                  },
                ]}
              >
                <DatePicker
                  placeholder="Select Date"
                  style={{ width: "100%" }}
                />
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
