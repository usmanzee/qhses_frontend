import React from "react";
import {
  Row,
  Col,
  Form,
  Button,
  Select,
  Drawer,
  Input,
  DatePicker,
} from "antd";

export const ScheduleEmergencyDrillFormDrawer = (props) => {
  const {
    drawerVisible,
    setDrawerVisible,
    form,
    addDataLoading,
    years,
    months,
    companies,
    emergencyDrillTypes,
    locations,
    handleFormSubmit,
  } = props;

  return (
    <>
      <Drawer
        title="Schedule New Drill"
        width={720}
        onClose={() => {
          setDrawerVisible(false);
        }}
        visible={drawerVisible}
        bodyStyle={{ paddingBottom: 80 }}
        extra={<Button />}
      >
        <Form form={form} onFinish={handleFormSubmit} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
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
            <Col span={12}>
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
            <Col span={12}>
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
            <Col span={12}>
              <Form.Item
                label="Emergency Type"
                name="type_id"
                rules={[
                  {
                    required: true,
                    message: "Please Select Emergency Type.",
                  },
                ]}
              >
                <Select
                  placeholder="Select Emergency Type"
                  onChange={(value) => {}}
                >
                  {emergencyDrillTypes.map((emergencyDrillType) => {
                    return (
                      <Select.Option value={emergencyDrillType.id}>
                        {emergencyDrillType.name}
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
                label="Location/Facility"
                name="location_ids"
                rules={[
                  {
                    required: true,
                    message: "Please Select Locations.",
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  placeholder="Select Locations"
                  optionFilterProp="children"
                  filterOption={(input, option) => {
                    return (
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    );
                  }}
                >
                  {locations.map((location) => {
                    return (
                      <Select.Option value={location.id}>
                        {location.name}
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
                label="Shift Date & time"
                name="shift_date_time"
                rules={[
                  {
                    required: true,
                    message: "Please Select Shift Date Time.",
                  },
                ]}
              >
                <DatePicker
                  placeholder="Select Shift Date Time"
                  showTime
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="purpose"
                label="Drill Purpose"
                rules={[
                  {
                    required: true,
                    message: "Please input drill purpose",
                  },
                ]}
              >
                <Input.TextArea
                  placeholder="Drill Purpose"
                  autoSize={{ minRows: 5, maxRows: 5 }}
                  showCount
                  // maxLength={500}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row justify="end" gutter={16}>
            <Col>
              <Button
                type="primary"
                loading={addDataLoading}
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
