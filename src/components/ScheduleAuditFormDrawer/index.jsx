import React, { useState } from "react";
import {
  Row,
  Col,
  Form,
  Button,
  Select,
  Drawer,
  Spin,
  Input,
  DatePicker,
  Radio,
} from "antd";
import { useSelector } from "react-redux";
import moment from "moment";

export const ScheduleAuditFormDrawer = (props) => {
  const {
    drawerVisible,
    setDrawerVisible,
    form,
    addAuditLoading,
    years,
    months,
    users,
    companies,
    departments,
    handleFormSubmit,
  } = props;

  const [selectedAuditFor, setSelectedAuditFor] = useState("company");

  // const disabledDate = (current) => {
  //   return current.year() !== parseInt(selectedYear.year);
  // };

  return (
    <>
      <Drawer
        title="Schedule New Audit"
        width={720}
        onClose={() => {
          setDrawerVisible(false);
        }}
        visible={drawerVisible}
        bodyStyle={{ paddingBottom: 80 }}
        extra={<Button />}
      >
        <Form
          form={form}
          onFinish={handleFormSubmit}
          layout="vertical"
          fields={[
            {
              name: ["audit_for"],
              value: selectedAuditFor,
            },
          ]}
        >
          {/* <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Audit Title"
                name="title"
                type="text"
                rules={[
                  {
                    required: true,
                    message: "Please input title.",
                  },
                ]}
              >
                <Input placeholder="Audit Title" />
              </Form.Item>
            </Col>
          </Row> */}
          {/* <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Audit Date"
                name="date"
                rules={[
                  {
                    required: true,
                    message: "Please Select Date.",
                  },
                ]}
              >
                <DatePicker
                  disabledDate={disabledDate}
                  placeholder="Select Date"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row> */}
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Year"
                name="year_id"
                rules={[
                  {
                    required: true,
                    message: "Please Select Year.",
                  },
                ]}
              >
                <Select placeholder="Select Year" onChange={(value) => {}}>
                  {years.map((year) => {
                    return (
                      <Select.Option value={year.id}>{year.year}</Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Month"
                name="month_id"
                rules={[
                  {
                    required: true,
                    message: "Please Select Month.",
                  },
                ]}
              >
                <Select placeholder="Select Month" onChange={(value) => {}}>
                  {months.map((month) => {
                    return (
                      <Select.Option value={month.id}>
                        {month.name}
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
                label="Audit For"
                name="audit_for"
                rules={[
                  {
                    required: true,
                    message: "Please Select Audit For.",
                  },
                ]}
              >
                <Radio.Group
                  onChange={(event) => {
                    // console.log(event.target.value);
                    setSelectedAuditFor(event.target.value);
                  }}
                >
                  <Radio value="company">Business Unit/Company</Radio>
                  <Radio value="department">Department</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          {selectedAuditFor === "company" && (
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label="Company"
                  name="company_id"
                  rules={[
                    {
                      required: true,
                      message: "Please Select Company.",
                    },
                  ]}
                >
                  <Select placeholder="Select Company" onChange={(value) => {}}>
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
          )}

          {selectedAuditFor === "department" && (
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label="Department"
                  name="department_id"
                  rules={[
                    {
                      required: true,
                      message: "Please select department.",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select Department"
                    onChange={(value) => {}}
                  >
                    {departments.map((department) => {
                      return (
                        <Select.Option value={department.id}>
                          {department.name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          )}
          <Row justify="end" gutter={16}>
            <Col>
              <Button
                type="primary"
                loading={addAuditLoading}
                onClick={() => {
                  form.submit();
                }}
              >
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
