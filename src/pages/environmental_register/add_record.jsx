import React, { useState, useEffect } from "react";
import moment from "moment";

import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Select,
  Divider,
  DatePicker,
  Card,
} from "antd";

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getCompaniesAction,
  addEnvironmentalRecordAction,
} from "../../redux/actions";
import { PageLoader } from "../../components";

const AddEnvironmentalRecord = () => {
  const dateFormat = "YYYY-MM-DD";
  const history = useHistory();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const companiesLoading = useSelector((state) => state.companies.loading);
  const companies = useSelector((state) => state.companies.list);

  const addLoading = useSelector(
    (state) => state.environmentalRecords.addLoading
  );

  useEffect(() => {
    dispatch(getCompaniesAction(history));
  }, []);

  const onRecordFormSubmit = (values) => {
    const selectedCompany = companies.find(
      (company) => company.id === values.company_id
    );
    values.company_code = selectedCompany.code;
    dispatch(addEnvironmentalRecordAction(history, values));
  };

  return (
    <>
      <div>
        {companiesLoading ? (
          <div style={{ textAlign: "center", padding: "24px" }}>
            <PageLoader />
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
                      Add New Activity
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
                    <Row>
                      <Col span={24}>
                        <Form.Item
                          label="Company"
                          name="company_id"
                          rules={[
                            {
                              required: true,
                              message: "Please Select Company",
                            },
                          ]}
                        >
                          <Select placeholder="Company">
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
                    <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item
                          label="Rev. Number"
                          name="revision_number"
                          type="text"
                          rules={[
                            {
                              required: true,
                              message: "Please input revision number",
                            },
                          ]}
                        >
                          <Input placeholder="Revision Number" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item
                          label="Date"
                          name="date"
                          type="text"
                          rules={[
                            {
                              required: true,
                              message: "Please select date",
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
                    </Row>
                    <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item label="">
                          <Button
                            type="primary"
                            htmlType="submit"
                            // block
                            loading={addLoading}
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

export default AddEnvironmentalRecord;
