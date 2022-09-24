import React from "react";
import {
  Row,
  Col,
  Modal,
  Form,
  Select,
  Button,
  Divider,
  Typography,
} from "antd";

export const AuditChecklistCopyFormModal = (props) => {
  const { visible, setVisible, form, loading, audits, onFormSubmit } = props;

  return (
    <>
      <Modal
        title="Select Previous Audit"
        visible={visible}
        onOk={() => form.submit()}
        onCancel={() => setVisible(false)}
      >
        <Row>
          <Col span={24}>
            <Form
              layout="vertical"
              form={form}
              onFinish={onFormSubmit}
              autoComplete="off"
            >
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="copy_audit_id"
                    label="Select Audit"
                    rules={[
                      {
                        required: true,
                        message: "Please Select Audit",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select Audit"
                      showSearch
                      optionFilterProp="children"
                      filterOption={(input, option) => {
                        return (
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        );
                      }}
                    >
                      {audits.map((audit) => {
                        return (
                          <Select.Option value={audit.id}>
                            {`${audit.id} - ${audit.audit_number}`}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              {/* <Row>
                <Col span={24}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    //   block
                    loading={loading}
                    //   onClick={() => handleSubmitClick()}
                  >
                    Submit
                  </Button>
                </Col>
              </Row> */}
            </Form>
          </Col>
        </Row>
      </Modal>
    </>
  );
};
