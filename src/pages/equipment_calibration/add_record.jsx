import React, { useState, useEffect } from "react";
import moment from "moment";

import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Radio,
  Select,
  Divider,
  DatePicker,
  message,
  Spin,
  Card,
  Upload,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getUsersAction,
  getFrequenciesAction,
  addCalibrationRecordAction,
} from "../../redux/actions";

const AddCalibrationRecord = () => {
  const dateFormat = "YYYY-MM-DD";
  const history = useHistory();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [certificationAttachment, setCertificationAttachment] = useState(null);
  const usersLoading = useSelector((state) => state.users.loading);
  const users = useSelector((state) => state.users.list);

  const frequenciesLoading = useSelector((state) => state.frequencies.loading);
  const frequencies = useSelector((state) => state.frequencies.list);

  const addRecordLoading = useSelector(
    (state) => state.calibrationRecords.addRecordLoading
  );

  useEffect(() => {
    dispatch(getUsersAction(history));
    dispatch(getFrequenciesAction(history));
  }, []);

  const onRecordFormSubmit = (values) => {
    const formData = new FormData();
    values["remarks"] = values["remarks"] ? values["remarks"] : null;
    for (const name in values) {
      formData.append(name, values[name]);
    }
    dispatch(addCalibrationRecordAction(formData, history));
  };

  return (
    <>
      <div>
        {usersLoading && frequenciesLoading ? (
          <div style={{ textAlign: "center", padding: "24px" }}>
            <Spin />
          </div>
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
                      Add New Calibration Record
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
                    onFinish={onRecordFormSubmit}
                    autoComplete="off"
                    hideRequiredMark
                  >
                    <Row gutter={16}>
                      {/* <Col span={12}>
                        <Form.Item
                          label="Equipment ID"
                          name="equipment_id"
                          type="text"
                          rules={[
                            {
                              required: true,
                              message: "Please input Equipment ID!",
                            },
                          ]}
                        >
                          <Input placeholder="Equipment ID" />
                        </Form.Item>
                      </Col> */}
                      <Col span={24}>
                        <Form.Item
                          label="Equipment Asset No."
                          name="equipment_asset_number"
                          type="text"
                          rules={[
                            {
                              required: true,
                              message: "Please input Equipment Asset No.!",
                            },
                          ]}
                        >
                          <Input placeholder="Equipment Asset No." />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <Form.Item
                          label="Owner"
                          name="owner_id"
                          rules={[
                            {
                              required: true,
                              message: "Please Select Calibration Owner",
                            },
                          ]}
                        >
                          <Select placeholder="Owner">
                            {users.map((user) => {
                              return (
                                <Select.Option value={user.id}>
                                  {user.name}
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
                          label="Instrument Description"
                          name="instrument_description"
                          type="text"
                          rules={[
                            {
                              required: true,
                              message: "Please input Instrument Description!",
                            },
                          ]}
                        >
                          <Input placeholder="Instrument Description" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label="Manufacturer"
                          name="manufacturer"
                          type="text"
                          rules={[
                            {
                              required: true,
                              message: "Please input Manufacturer!",
                            },
                          ]}
                        >
                          <Input placeholder="Manufacturer" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item
                          label="Instrument Serial No."
                          name="instrument_serial_number"
                          type="text"
                          rules={[
                            {
                              required: true,
                              message: "Please input Instrument Serial Number",
                            },
                          ]}
                        >
                          <Input placeholder="Instrument Serial No." />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label="Range"
                          name="range"
                          type="text"
                          rules={[
                            {
                              required: true,
                              message: "Please input Instrument Range!",
                            },
                          ]}
                        >
                          <Input placeholder="e.g: 20 to 20K Lux" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item
                          label="Accuracy"
                          name="accuracy"
                          type="text"
                          rules={[
                            {
                              required: true,
                              message: "Please input Accuracy!",
                            },
                          ]}
                        >
                          <Input placeholder="e.g: 3 % rgd + 0.5% FS" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label="Frequency of Calib."
                          name="calibration_frequency_id"
                          rules={[
                            {
                              required: true,
                              message: "Please input Frequency of Calib.!",
                            },
                          ]}
                        >
                          <Select placeholder="Calibration Frequency">
                            {frequencies.map((frequency) => {
                              return (
                                <Select.Option value={frequency.id}>
                                  {frequency.name}
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
                          label="Referance Standard"
                          name="referance_standard"
                          type="text"
                          rules={[
                            {
                              required: true,
                              message: "Please input Referance Standard",
                            },
                          ]}
                        >
                          <Input placeholder="Referance Standard" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item
                          label="Calibration Date"
                          name="calibration_date"
                          type="text"
                          rules={[
                            {
                              required: true,
                              message: "Please input Calibration Date",
                            },
                          ]}
                        >
                          <DatePicker
                            format={dateFormat}
                            allowClear={false}
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label="Next Calibration Due Date"
                          name="calibration_due_date"
                          type="text"
                          rules={[
                            {
                              required: true,
                              message: "Please input Calibration Due Date",
                            },
                          ]}
                        >
                          <DatePicker
                            format={dateFormat}
                            allowClear={false}
                            disabledDate={(current) => {
                              let customDate = moment().format(dateFormat);
                              return (
                                current &&
                                current < moment(customDate, dateFormat)
                              );
                            }}
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item
                          label="Certificate Number"
                          name="certificate_number"
                          type="text"
                          rules={[
                            {
                              required: true,
                              message: "Please input Certificate Number",
                            },
                          ]}
                        >
                          <Input placeholder="Certificate Number" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item
                          label="Upload Equipment Certification(Max: 1)"
                          name="certification_attachment"
                          getValueFromEvent={({ file }) => {
                            if (file.status && file.status == "removed") {
                              return null;
                            }
                            return file;
                          }}
                          rules={[
                            {
                              required: true,
                              message: "Please select equipment certification",
                            },
                          ]}
                        >
                          <Upload.Dragger
                            value={certificationAttachment}
                            maxCount={1}
                            listType="picture"
                            beforeUpload={() => false}
                            onChange={(info) => {
                              setCertificationAttachment(
                                info.fileList.length ? info.fileList[0] : null
                              );
                            }}
                          >
                            <p className="ant-upload-drag-icon">
                              <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">
                              Click or drag file to this area to upload
                            </p>
                          </Upload.Dragger>
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
                              message: "Please input remarks",
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

                    <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item label="">
                          <Button
                            type="primary"
                            htmlType="submit"
                            // block
                            loading={addRecordLoading}
                          >
                            Submit
                          </Button>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </Card>
          </div>
        )}
      </div>
    </>
  );
};

export default AddCalibrationRecord;
