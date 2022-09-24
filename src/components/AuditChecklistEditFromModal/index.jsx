import React, { useState } from "react";
import { Button, Modal, Drawer, Form, Input, Radio, Select, Space } from "antd";

export const AuditChecklistEditFormModal = (props) => {
  const {
    visible,
    setVisible,
    form,
    loadingForm,
    auditFindings,
    handleFormSubmit,
  } = props;
  return (
    <Drawer
      // visible={visible}
      // title="Update Checklist"
      // okText="Update"
      // cancelText="Cancel"
      // onCancel={() => setVisible(false)}
      // onOk={() => {
      //   form.submit();
      // }}
      // footer={[
      //   <Button key="back" onClick={() => setVisible(false)}>
      //     Cancel
      //   </Button>,
      //   <Button
      //     key="submit"
      //     type="primary"
      //     loading={loadingForm}
      //     onClick={() => {
      //       form.submit();
      //     }}
      //   >
      //     Update
      //   </Button>,
      // ]}

      forceRender={true}
      title="Update Checklist"
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
            loading={loadingForm}
            onClick={() => {
              form.submit();
            }}
          >
            Update
          </Button>
        </Space>
      }
    >
      <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
        <Form.Item
          label="Process/Function"
          name="process"
          rules={[
            {
              required: true,
              message: "Process/Function is required.",
            },
          ]}
        >
          <Input placeholder="Process/Function" />
        </Form.Item>
        <Form.Item
          label="Reference"
          name="reference"
          rules={[
            {
              required: true,
              message: "Reference is required",
            },
          ]}
        >
          <Input placeholder="Reference" />
        </Form.Item>
        <Form.Item
          label="Question/Requirements"
          name="requirements"
          rules={[
            {
              required: true,
              message: "Question/Requirements is required",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Question/Requirements"
            autoSize={{ minRows: 5, maxRows: 5 }}
            showCount
            // maxLength={500}
          />
        </Form.Item>
        <Form.Item
          label="Finding"
          name={"audit_finding_id"}
          rules={[
            {
              required: true,
              message: "Please Select Finding Type.",
            },
          ]}
        >
          <Select placeholder="Select Finding">
            {auditFindings.map((auditFinding) => {
              return (
                <Select.Option value={auditFinding.id}>
                  <Space>
                    <span
                      style={{
                        backgroundColor: `${auditFinding.color_code}`,
                        height: "10px",
                        width: "10px",
                        borderRadius: "50%",
                        display: "inline-block",
                      }}
                    ></span>
                    {auditFinding.name}
                  </Space>
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          name="observations"
          label="Observations"
          rules={[
            {
              required: true,
              message: "Observations is required",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Observations"
            autoSize={{ minRows: 5, maxRows: 5 }}
            showCount
            // maxLength={500}
          />
        </Form.Item>
      </Form>
    </Drawer>
  );
};
