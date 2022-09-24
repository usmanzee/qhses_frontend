import React from "react";
import { Row, Col, Form, Button, Select, Drawer, Input } from "antd";
import { useSelector } from "react-redux";

export const SurveyQuestionFormDrawer = (props) => {
  const profileLoading = useSelector((state) => state.profile.loading);
  const profile = useSelector((state) => state.profile.data);
  const aspectsLoading = useSelector((state) => state.aspects.loading);
  const aspects = useSelector((state) => state.aspects.list);
  const { drawerVisible, setDrawerVisible, handleFormSubmit } = props;

  return (
    <>
      <Drawer
        title="Add New Question"
        width={720}
        onClose={() => {
          setDrawerVisible(false);
        }}
        visible={drawerVisible}
        bodyStyle={{ paddingBottom: 80 }}
        extra={<Button />}
      >
        <Form
          onFinish={handleFormSubmit}
          layout="vertical"
          initialValues={{
            ["email_type"]: "to",
          }}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Question Description"
                name="question_description"
                type="text"
                rules={[
                  {
                    required: true,
                    message: "Please input question description.",
                  },
                ]}
              >
                <Input placeholder="Question Description" />
              </Form.Item>
            </Col>
          </Row>
          {/* <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Question Aspect"
                name="question_aspect"
                type="text"
                rules={[
                  {
                    required: true,
                    message: "Please input question aspect.",
                  },
                ]}
              >
                <Input placeholder="Question Aspect" />
              </Form.Item>
            </Col>
          </Row> */}
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="aspect_id"
                label="Aspect"
                rules={[
                  {
                    required: true,
                    message: "Please select Aspect",
                  },
                ]}
              >
                <Select placeholder="Select Aspect">
                  {aspects.map((aspect) => {
                    return (
                      <Select.Option value={aspect.id}>
                        {aspect.title}
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
                label="Rating Text 1"
                name="rating_text_1"
                type="text"
                rules={[
                  {
                    required: true,
                    message: "Please input rating test.",
                  },
                ]}
              >
                <Input placeholder="e.g; Poor" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Rating Text 2"
                name="rating_text_2"
                type="text"
                rules={[
                  {
                    required: true,
                    message: "Please input rating test.",
                  },
                ]}
              >
                <Input placeholder="e.g; Fair" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Rating Text 3"
                name="rating_text_3"
                type="text"
                rules={[
                  {
                    required: true,
                    message: "Please input rating test.",
                  },
                ]}
              >
                <Input placeholder="e.g; Good" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Rating Text 4"
                name="rating_text_4"
                type="text"
                rules={[
                  {
                    required: true,
                    message: "Please input rating test.",
                  },
                ]}
              >
                <Input placeholder="e.g; Very Good" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Rating Text 5"
                name="rating_text_5"
                type="text"
                rules={[
                  {
                    required: true,
                    message: "Please input rating test.",
                  },
                ]}
              >
                <Input placeholder="e.g; Excellent" />
              </Form.Item>
            </Col>
          </Row>
          <Row justify="end" gutter={16}>
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
