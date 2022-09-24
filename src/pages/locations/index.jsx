import React, { useState, useEffect } from "react";
import moment from "moment";

import {
  Row,
  Col,
  Form,
  Button,
  Select,
  Divider,
  Table,
  message,
  Spin,
  Card,
  Input,
  Popconfirm,
  Tag,
} from "antd";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getLocationsAction,
  getFaceTerminalsAction,
  addLocationAction,
} from "../../redux/actions";
import { PageLoader } from "../../components";

const Locations = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const locationsLoading = useSelector((state) => state.locations.loading);
  const locations = useSelector((state) => state.locations.list);

  const faceTerminalsLoading = useSelector(
    (state) => state.faceTerminals.loading
  );
  const faceTerminals = useSelector((state) => state.faceTerminals.list);

  const addLocationLoading = useSelector(
    (state) => state.faceTerminals.addLoading
  );
  const addLocationSuccess = useSelector(
    (state) => state.faceTerminals.addSuccess
  );

  useEffect(() => {
    dispatch(getLocationsAction(history, true));
    dispatch(getFaceTerminalsAction(history, true));
  }, []);

  useEffect(() => {
    if (addLocationSuccess) {
      //   form.resetFields();
    }
  }, [addLocationSuccess]);

  const onFormSubmit = (values) => {
    dispatch(addLocationAction(history, values));
    form.resetFields();
  };

  const columns = [
    {
      title: "#",
      dataIndex: "#",
      render: (value, row, index) => {
        return index + 1;
      },
    },
    {
      title: "Code",
      dataIndex: "code",
    },
    {
      title: "Description",
      dataIndex: "name",
    },
    {
      title: "Device Face",
      dataIndex: "name",
      render: (value, row, index) => {
        return (
          <>
            {row.faceIds &&
              row.faceIds.map((faceId) => {
                return <Tag>{faceId.terminal_desc}</Tag>;
              })}
          </>
        );
      },
    },
  ];

  return (
    <>
      <div>
        {locationsLoading && faceTerminalsLoading ? (
          <PageLoader />
        ) : (
          <div>
            <Card style={{ borderRadius: "8px" }}>
              <Row>
                <Col
                  xs={{ span: 24, offset: 0 }}
                  sm={{ span: 18, offset: 3 }}
                  md={{ span: 12, offset: 6 }}
                  lg={{ span: 12, offset: 6 }}
                  xl={{ span: 12, offset: 6 }}
                >
                  <Divider>
                    <h1 style={{ fontSize: "24px", fontWeight: "600" }}>
                      Add New Location
                    </h1>
                  </Divider>
                </Col>
              </Row>
              <Row justify="space-between">
                <Col
                  xs={{ span: 24, offset: 0 }}
                  sm={{ span: 18, offset: 3 }}
                  md={{ span: 12, offset: 6 }}
                  lg={{ span: 12, offset: 6 }}
                  xl={{ span: 12, offset: 6 }}
                >
                  <Form
                    layout="vertical"
                    form={form}
                    onFinish={onFormSubmit}
                    autoComplete="off"
                  >
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item
                          label="Code"
                          name="code"
                          rules={[
                            {
                              required: true,
                              message: "Please Input Code",
                            },
                          ]}
                        >
                          <Input placeholder="Location Code" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label="Description"
                          name="name"
                          rules={[
                            {
                              required: true,
                              message: "Please Input Description",
                            },
                          ]}
                        >
                          <Input placeholder="Location Description" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <Form.Item
                          label="Device Face Ids"
                          name="device_face_ids"
                          rules={[
                            {
                              required: true,
                              message: "Please Select Device Face Ids",
                            },
                          ]}
                        >
                          <Select
                            mode="multiple"
                            allowClear
                            style={{ width: "100%" }}
                            placeholder="Select Device Face Ids"
                            optionFilterProp="children"
                            filterOption={(input, option) => {
                              return (
                                option.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              );
                            }}
                          >
                            {faceTerminals.map((faceTerminal) => {
                              return (
                                <Select.Option value={faceTerminal.terminal_id}>
                                  {faceTerminal.terminal_desc}
                                </Select.Option>
                              );
                            })}
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <Button
                          type="primary"
                          loading={addLocationLoading}
                          onClick={() => form.submit()}
                        >
                          Submit
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
              <Row gutter={16} style={{ marginTop: "16px" }}>
                <Col span={24}>
                  <Table
                    bordered
                    columns={columns}
                    dataSource={locations ? locations : []}
                    pagination={false}
                    rowKey="id"
                    loading={{
                      indicator: (
                        <div>
                          <Spin />
                        </div>
                      ),
                      spinning: locationsLoading,
                    }}
                  />
                </Col>
              </Row>
            </Card>
          </div>
        )}
      </div>
    </>
  );
};

export default Locations;
