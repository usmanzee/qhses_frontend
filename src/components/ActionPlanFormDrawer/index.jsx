import React from "react";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Drawer,
} from "antd";
import moment from "moment";
import { useSelector } from "react-redux";
export const ActionPlanFormDrawer = (props) => {
  const profileLoading = useSelector((state) => state.profile.loading);
  const profile = useSelector((state) => state.profile.data);
  const dateFormat = "YYYY-MM-DD";
  const {
    drawerVisible,
    setDrawerVisible,
    ncrRecord,
    users,
    departments,
    handleFormSubmit,
  } = props;

  return (
    <>
      <Drawer
        title="Add New Action Plan"
        width={720}
        onClose={() => {
          setDrawerVisible(false);
        }}
        visible={drawerVisible}
        bodyStyle={{ paddingBottom: 80 }}
        extra={<Button />}
      >
        <Form onFinish={handleFormSubmit} layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="responsible_user_id"
                label="Responsible Person"
                rules={[
                  {
                    required: true,
                    message: "Please select responsible person",
                  },
                ]}
              >
                <Select
                  showSearch
                  filterOption={(input, option) => {
                    return (
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    );
                  }}
                >
                  {users.map((user) => {
                    return profile && profile.id != user.id ? (
                      <Select.Option value={user.id}>{user.name}</Select.Option>
                    ) : (
                      ""
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            {/* <Col span={12}>
              <Form.Item
                name="responsible_department"
                label="Responsible Department"
                rules={[
                  {
                    required: true,
                    message: "Please select responsible department",
                  },
                ]}
              >
                <Select>
                  {departments.map((department) => {
                    return (
                      <Select.Option value={department.id}>
                        {department.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col> */}
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="target_date"
                label="Target Date"
                rules={[
                  {
                    required: true,
                    message: "Please select target date",
                  },
                ]}
              >
                <DatePicker
                  format={dateFormat}
                  allowClear={false}
                  disabledDate={(current) => {
                    // let customDate = moment().format(dateFormat);
                    let customDate = moment(ncrRecord.ncr_date).format(
                      dateFormat
                    );
                    return current && current < moment(customDate, dateFormat);
                  }}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Plan Description"
                rules={[
                  {
                    required: true,
                    message: "Please input description",
                  },
                ]}
              >
                <Input.TextArea
                  autoSize={{ minRows: 5, maxRows: 5 }}
                  showCount
                  // maxLength={500}
                />
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
