import React, { useState } from "react";
import { Row, Col, Form, Button, Input, Drawer, Select, Grid } from "antd";

const { useBreakpoint } = Grid;
export const EmergencyDrillAttedenceEmployeeFormDrawer = (props) => {
  const screens = useBreakpoint();
  const { visible, setVisible, form, types, employees, handleFormSubmit } =
    props;
  const [showEmployees, setShowEmployees] = useState(false);

  return (
    <>
      <Drawer
        title="Add Employee"
        width={screens.xs ? "100%" : "50%"}
        onClose={() => {
          setVisible(false);
        }}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form
          form={form}
          onFinish={handleFormSubmit}
          layout="vertical"
          hideRequiredMark
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Type"
                name="employee_type"
                rules={[
                  {
                    required: true,
                    message: "Please select type.",
                  },
                ]}
              >
                <Select
                  placeholder="Select Type"
                  onChange={(value) => {
                    setShowEmployees(value === "EMPLOYEE" ? true : false);
                  }}
                >
                  {types.map((type) => {
                    return <Select.Option value={type}>{type}</Select.Option>;
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          {showEmployees ? (
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label="Employee"
                  name="employee_id"
                  rules={[
                    {
                      required: true,
                      message: "Please select Employee.",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select Employee"
                    optionFilterProp="children"
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
                    {employees &&
                      employees.map((employee) => {
                        return (
                          <Select.Option value={employee.Emp_ID}>
                            {employee.emp_name}
                          </Select.Option>
                        );
                      })}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          ) : (
            <>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    label="Name"
                    name="employee_name"
                    rules={[
                      {
                        required: true,
                        message: "Name is required.",
                      },
                    ]}
                  >
                    <Input placeholder="Name" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    label="Company Name"
                    name="company_name"
                    rules={[
                      {
                        required: true,
                        message: "Company Name is required.",
                      },
                    ]}
                  >
                    <Input placeholder="Company Name" />
                  </Form.Item>
                </Col>
              </Row>
            </>
          )}
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
