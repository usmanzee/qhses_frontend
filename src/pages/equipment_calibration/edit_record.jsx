import React, { useState, useEffect } from "react";

import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Select,
  Divider,
  DatePicker,
  Spin,
  Card,
  PageHeader,
  Descriptions,
  Tag,
  Typography,
  message,
  Upload,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import moment from "moment";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getCalibrationRecordDetailAction,
  getUsersAction,
  getFrequenciesAction,
  updateCalibrationRecordAction,
} from "../../redux/actions";

const { Text } = Typography;

const EditCalibrationRecord = () => {
  const dateFormat = "YYYY-MM-DD";
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const [form] = Form.useForm();
  const [certificationAttachment, setCertificationAttachment] = useState(null);
  const [fileList, setFileList] = useState([
    {
      // uid: "-1",
      // name: "image.png",
      // status: "done",
      // url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);
  const profileLoading = useSelector((state) => state.profile.loading);
  const profile = useSelector((state) => state.profile.data);
  const recordDetailLoading = useSelector(
    (state) => state.calibrationRecords.recordDetailLoading
  );
  const recordDetail = useSelector(
    (state) => state.calibrationRecords.recordDetail
  );

  const usersLoading = useSelector((state) => state.users.loading);
  const users = useSelector((state) => state.users.list);

  const frequenciesLoading = useSelector((state) => state.frequencies.loading);
  const frequencies = useSelector((state) => state.frequencies.list);

  const updateRecordLoading = useSelector(
    (state) => state.calibrationRecords.updateRecordLoading
  );

  useEffect(() => {
    if (recordDetail) {
      recordDetail.calibration_date = moment(recordDetail.calibration_date);
      recordDetail.calibration_due_date = moment(
        recordDetail.calibration_due_date
      );
      recordDetail.certification_attachment = null;
      // recordDetail.remarks =
      //   recordDetail.remarks && recordDetail.remarks !== "undefined"
      //     ? recordDetail.remarks
      //     : "";

      form.setFieldsValue(recordDetail);
    }
  }, [recordDetail]);

  useEffect(() => {
    dispatch(getCalibrationRecordDetailAction(params.id, history));
  }, []);

  useEffect(() => {
    dispatch(getUsersAction(history, true));
    dispatch(getFrequenciesAction(history));
  }, []);

  const handleRecordUpdate = () => {
    form.submit();
  };

  const onRecordFormSubmit = (values) => {
    const formData = new FormData();
    // values["remarks"] = values["remarks"] ? values["remarks"] : null;
    for (const name in values) {
      formData.append(name, values[name]);
    }
    dispatch(updateCalibrationRecordAction(params.id, formData, history));
  };

  return (
    <>
      <div>
        {usersLoading && frequenciesLoading && recordDetailLoading ? (
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
                      Update Calibration Record
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
                          <Input disabled placeholder="Equipment Asset No." />
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
                          <Select placeholder="Owner" disabled>
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
                          <Input
                            disabled
                            placeholder="Instrument Description"
                          />
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
                          <Input disabled placeholder="Manufacturer" />
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
                          <Input disabled placeholder="Instrument Serial No." />
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
                          <Input disabled placeholder="e.g: 20 to 20K Lux" />
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
                          <Input
                            disabled
                            placeholder="e.g: 3 % rgd + 0.5% FS"
                          />
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
                          <Select disabled>
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
                          <Input disabled placeholder="Referance Standard" />
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
                            // fileList={fileList}
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
                            loading={updateRecordLoading}
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

export default EditCalibrationRecord;
