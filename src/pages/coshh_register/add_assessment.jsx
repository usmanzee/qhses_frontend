import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Radio,
  Select,
  Divider,
  Card,
  Upload,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getUsersAction,
  getCompaniesAction,
  getDepartmentsAction,
  getCoshhRiskPersonsAction,
  getCoshhClassificationsAction,
  getCoshhHazardTypesAction,
  getCoshhExposureRoutesAction,
  getCoshhProtectiveEquipmentsAction,
  getCoshhSubstancesDisposalTypesAction,
  getCoshhRiskRatingsAction,
  addCoshhAssessmentAction,
} from "../../redux/actions";
import { PageLoader } from "../../components";

const AddCoshhAssessment = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [showOtherHazardType, setShowOtherHazardType] = useState(false);
  const [showOtherExposureRoute, setShowOtherExposureRoute] = useState(false);
  const [showOtherProtectiveEquipment, setShowOtherProtectiveEquipment] =
    useState(false);
  const [showOtherSubstanceDisposalType, setShowOtherSubstanceDisposalType] =
    useState(false);

  const companiesLoading = useSelector((state) => state.companies.loading);
  const companies = useSelector((state) => state.companies.list);

  const departmentsLoading = useSelector((state) => state.departments.loading);
  const departments = useSelector((state) => state.departments.list);

  const riskPersonsLoading = useSelector(
    (state) => state.coshhRiskPersons.loading
  );
  const riskPersons = useSelector((state) => state.coshhRiskPersons.list);

  const classificationsLoading = useSelector(
    (state) => state.coshhClassifications.loading
  );
  const classifications = useSelector(
    (state) => state.coshhClassifications.list
  );

  const hazardTypesLoading = useSelector(
    (state) => state.coshhHazardTypes.loading
  );
  const hazardTypes = useSelector((state) => state.coshhHazardTypes.list);

  const exposureRoutesLoading = useSelector(
    (state) => state.coshhExposureRoutes.loading
  );
  const exposureRoutes = useSelector((state) => state.coshhExposureRoutes.list);

  const protectiveEquipmentsLoading = useSelector(
    (state) => state.coshhProtectiveEquipments.loading
  );
  const protectiveEquipments = useSelector(
    (state) => state.coshhProtectiveEquipments.list
  );

  const substanceDisposalTypesLoading = useSelector(
    (state) => state.coshhSubstanceDisposalTypes.loading
  );
  const substanceDisposalTypes = useSelector(
    (state) => state.coshhSubstanceDisposalTypes.list
  );

  const riskRatingsLoading = useSelector(
    (state) => state.coshhRiskRatings.loading
  );
  const riskRatings = useSelector((state) => state.coshhRiskRatings.list);

  const addAssessmentLoading = useSelector(
    (state) => state.coshhAssessments.addLoading
  );

  useEffect(() => {
    dispatch(getUsersAction(history));
    dispatch(getCompaniesAction(history));
    dispatch(getDepartmentsAction(history));
    dispatch(getCoshhRiskPersonsAction(history));
    dispatch(getCoshhClassificationsAction(history));
    dispatch(getCoshhHazardTypesAction(history));
    dispatch(getCoshhExposureRoutesAction(history));
    dispatch(getCoshhProtectiveEquipmentsAction(history));
    dispatch(getCoshhSubstancesDisposalTypesAction(history));
    dispatch(getCoshhRiskRatingsAction(history));
  }, []);

  const handleHazardTypesChange = (values) => {
    var otherId = 8;
    if (values.length && values.includes(otherId)) {
      setShowOtherHazardType(true);
    } else {
      setShowOtherHazardType(false);
    }
  };
  const handleExposureRoutesChange = (values) => {
    var otherId = 5;
    if (values.length && values.includes(otherId)) {
      setShowOtherExposureRoute(true);
    } else {
      setShowOtherExposureRoute(false);
    }
  };
  const handleProtectiveEquipmentsChange = (values) => {
    var otherId = 8;
    if (values.length && values.includes(otherId)) {
      setShowOtherProtectiveEquipment(true);
    } else {
      setShowOtherProtectiveEquipment(false);
    }
  };
  const handleSubstanceDisposalTypesChange = (values) => {
    var otherId = 4;
    if (values.length && values.includes(otherId)) {
      setShowOtherSubstanceDisposalType(true);
    } else {
      setShowOtherSubstanceDisposalType(false);
    }
  };

  const onRecordFormSubmit = (values) => {
    const company = companies.find(
      (company) => company.id === values.company_id
    );
    values.company_code = company.code;

    values.risk_person_ids = JSON.stringify(values.risk_person_ids);
    values.classification_ids = JSON.stringify(values.classification_ids);
    values.hazard_type_ids = JSON.stringify(values.hazard_type_ids);
    values.exposure_route_ids = JSON.stringify(values.exposure_route_ids);
    if (values.protective_equipment_ids) {
      values.protective_equipment_ids = JSON.stringify(
        values.protective_equipment_ids
      );
    }
    if (values.substance_disposal_type_ids) {
      values.substance_disposal_type_ids = JSON.stringify(
        values.substance_disposal_type_ids
      );
    }

    const formData = new FormData();
    for (const name in values) {
      if (values[name]) {
        formData.append(name, values[name]);
      }
      // formData.append(
      //   name,
      //   Array.isArray(values[name])
      //     ? JSON.stringify(values[name])
      //     : values[name]
      // );
    }
    dispatch(addCoshhAssessmentAction(history, formData));
  };

  return (
    <>
      <div>
        {companiesLoading &&
        departmentsLoading &&
        riskPersonsLoading &&
        classificationsLoading &&
        hazardTypesLoading &&
        exposureRoutesLoading &&
        protectiveEquipmentsLoading &&
        substanceDisposalTypesLoading &&
        riskRatingsLoading ? (
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
                      Add New COSHH Assessment
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
                  >
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item
                          label="Company"
                          name="company_id"
                          rules={[
                            {
                              required: true,
                              message: "Company is required.",
                            },
                          ]}
                        >
                          <Select
                            placeholder="Select Company/Business Unit"
                            showSearch={true}
                            optionFilterProp="children"
                            filterOption={(input, option) => {
                              return (
                                option.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              );
                            }}
                          >
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
                          label="Department"
                          name="department_id"
                          rules={[
                            {
                              required: false,
                              message: "Department is required.",
                            },
                          ]}
                        >
                          <Select
                            placeholder="Select Department"
                            showSearch={true}
                            optionFilterProp="children"
                            filterOption={(input, option) => {
                              return (
                                option.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              );
                            }}
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
                    <Row>
                      <Col span={24}>
                        <Form.Item
                          label="Product Name"
                          name="product_name"
                          rules={[
                            {
                              required: true,
                              message: "Product Name is required.",
                            },
                          ]}
                        >
                          <Input placeholder="Input Product Name" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item
                          label="Describe the activity or work process."
                          name="process"
                          rules={[
                            {
                              required: true,
                              message: "Activity/Process is required.",
                            },
                          ]}
                        >
                          <Input.TextArea
                            placeholder="Inc. how long/ how often this is carried out and quantity substance used"
                            autoSize={{ minRows: 3, maxRows: 3 }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item
                          label="Location of process being carried out?"
                          name="process_location"
                          rules={[
                            {
                              required: true,
                              message: "Process Location is required.",
                            },
                          ]}
                        >
                          <Input.TextArea
                            placeholder="Process Location"
                            autoSize={{ minRows: 3, maxRows: 3 }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item
                          label="Name the substance involved in the process and its manufacturer."
                          name="process_substance_and_manufacturer"
                          rules={[
                            {
                              required: true,
                              message:
                                "Process Substance and Manufacturer is required.",
                            },
                          ]}
                        >
                          <Input.TextArea
                            placeholder="A copy of a current safety data sheet is attaches to this assessment"
                            autoSize={{ minRows: 3, maxRows: 3 }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item
                          label="Identify the persons at risk"
                          name="risk_person_ids"
                          rules={[
                            {
                              required: true,
                              message: "Persons are required.",
                            },
                          ]}
                        >
                          <Select
                            mode="multiple"
                            placeholder="Select Persons"
                            optionFilterProp="children"
                            filterOption={(input, option) => {
                              return (
                                option.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              );
                            }}
                          >
                            {riskPersons.map((riskPerson) => {
                              return (
                                <Select.Option value={riskPerson.id}>
                                  {riskPerson.name}
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
                          label="Classification (state the category of danger)"
                          name="classification_ids"
                          rules={[
                            {
                              required: true,
                              message: "Classifications are required.",
                            },
                          ]}
                        >
                          <Select
                            mode="multiple"
                            placeholder="Select Classifications"
                            optionFilterProp="children"
                            filterOption={(input, option) => {
                              return (
                                option.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              );
                            }}
                          >
                            {classifications.map((classification) => {
                              return (
                                <Select.Option value={classification.id}>
                                  {classification.name}
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
                          label="Hazard Types"
                          name="hazard_type_ids"
                          rules={[
                            {
                              required: true,
                              message: "Hazard Types are required.",
                            },
                          ]}
                        >
                          <Select
                            mode="multiple"
                            placeholder="Select Hazard Types"
                            optionFilterProp="children"
                            filterOption={(input, option) => {
                              return (
                                option.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              );
                            }}
                            onChange={handleHazardTypesChange}
                          >
                            {hazardTypes.map((hazardType) => {
                              return (
                                <Select.Option value={hazardType.id}>
                                  {hazardType.name}
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
                          hidden={!showOtherHazardType}
                          label="Other Hazard Type"
                          name="other_hazard_type"
                          rules={[
                            {
                              required: showOtherHazardType,
                              message: "This field is required.",
                            },
                          ]}
                        >
                          <Input placeholder="Other Hazard Type" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item
                          label="Routes of Exposure"
                          name="exposure_route_ids"
                          rules={[
                            {
                              required: true,
                              message: "Exposure Routes are required.",
                            },
                          ]}
                        >
                          <Select
                            mode="multiple"
                            placeholder="Select Exposure Routes"
                            optionFilterProp="children"
                            filterOption={(input, option) => {
                              return (
                                option.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              );
                            }}
                            onChange={handleExposureRoutesChange}
                          >
                            {exposureRoutes.map((exposureRoute) => {
                              return (
                                <Select.Option value={exposureRoute.id}>
                                  {exposureRoute.name}
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
                          hidden={!showOtherExposureRoute}
                          label="Other Route of Exposure"
                          name="other_exposure_route"
                          rules={[
                            {
                              required: showOtherExposureRoute,
                              message: "This field is required.",
                            },
                          ]}
                        >
                          <Input placeholder="Other Route of Exposure" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item
                          label="Workplace Exposure Limits(WELs)"
                          name="workplace_exposure_limits"
                          rules={[
                            {
                              required: true,
                              message: "Workplace Exposure Limits is required.",
                            },
                          ]}
                        >
                          <Input.TextArea
                            placeholder="Please indicate n/a where not applicable"
                            autoSize={{ minRows: 3, maxRows: 3 }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item
                          label="Health Risk Rating"
                          name="health_risk_rating_id"
                          rules={[
                            {
                              required: true,
                              message: "Health Risk Rating are required.",
                            },
                          ]}
                        >
                          <Select
                            placeholder="Select Risk Rating"
                            showSearch={true}
                            optionFilterProp="children"
                            filterOption={(input, option) => {
                              return (
                                option.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              );
                            }}
                          >
                            {riskRatings.map((riskRating) => {
                              return (
                                <Select.Option value={riskRating.id}>
                                  {riskRating.name}
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
                          label="Environment Risk Rating"
                          name="environment_risk_rating_id"
                          rules={[
                            {
                              required: true,
                              message: "Environment Risk Rating are required.",
                            },
                          ]}
                        >
                          <Select
                            placeholder="Select Risk Rating"
                            showSearch={true}
                            optionFilterProp="children"
                            filterOption={(input, option) => {
                              return (
                                option.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              );
                            }}
                          >
                            {riskRatings.map((riskRating) => {
                              return (
                                <Select.Option value={riskRating.id}>
                                  {riskRating.name}
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
                          label="Is health surveillance or monitoring required?"
                          name="health_surveillance_required"
                          rules={[
                            {
                              required: true,
                              message: "This Field is required.",
                            },
                          ]}
                        >
                          <Radio.Group>
                            <Radio value={true}>Yes</Radio>
                            <Radio value={false}>No</Radio>
                          </Radio.Group>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item
                          label="Personal Protective Equipment (state type and standard)"
                          name="protective_equipment_ids"
                          rules={[
                            {
                              required: false,
                              message: "Protective equipments are required.",
                            },
                          ]}
                        >
                          <Select
                            mode="multiple"
                            placeholder="Select Protective Equipments"
                            optionFilterProp="children"
                            filterOption={(input, option) => {
                              return (
                                option.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              );
                            }}
                            onChange={handleProtectiveEquipmentsChange}
                          >
                            {protectiveEquipments.map((protectiveEquipment) => {
                              return (
                                <Select.Option value={protectiveEquipment.id}>
                                  {protectiveEquipment.name}
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
                          hidden={!showOtherProtectiveEquipment}
                          label="Other Personal Protective Equipment"
                          name="other_personal_protective_equipment"
                          rules={[
                            {
                              required: showOtherProtectiveEquipment,
                              message: "This field is required.",
                            },
                          ]}
                        >
                          <Input placeholder="Other Personal Protective Equipment" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item
                          label="First Aid Measures"
                          name="first_aid_measures"
                          rules={[
                            {
                              required: false,
                              message: "First Aid Measures is required.",
                            },
                          ]}
                        >
                          <Input.TextArea
                            placeholder="Input First Aid Measures"
                            autoSize={{ minRows: 3, maxRows: 3 }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item
                          label="Storage"
                          name="storage"
                          rules={[
                            {
                              required: false,
                              message: "Storage is required.",
                            },
                          ]}
                        >
                          <Input.TextArea
                            placeholder="Input Storage"
                            autoSize={{ minRows: 3, maxRows: 3 }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item
                          label="Disposal of Substances & Contaminated Containers"
                          name="substance_disposal_type_ids"
                          rules={[
                            {
                              required: false,
                              message: "Substances Disposal are required.",
                            },
                          ]}
                        >
                          <Select
                            mode="multiple"
                            placeholder="Select Substances Disposal"
                            optionFilterProp="children"
                            filterOption={(input, option) => {
                              return (
                                option.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              );
                            }}
                            onChange={handleSubstanceDisposalTypesChange}
                          >
                            {substanceDisposalTypes.map(
                              (substanceDisposalType) => {
                                return (
                                  <Select.Option
                                    value={substanceDisposalType.id}
                                  >
                                    {substanceDisposalType.name}
                                  </Select.Option>
                                );
                              }
                            )}
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item
                          hidden={!showOtherSubstanceDisposalType}
                          label="Other Substances Disposal"
                          name="other_substance_disposal_type"
                          rules={[
                            {
                              required: showOtherSubstanceDisposalType,
                              message: "This field is required.",
                            },
                          ]}
                        >
                          <Input placeholder="Other Substances Disposal" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item
                          label="Any Document(Max: 1)"
                          name="document"
                          getValueFromEvent={({ file }) => {
                            if (file.status && file.status == "removed") {
                              return null;
                            }
                            return file;
                          }}
                          rules={[
                            {
                              required: false,
                              message: "Please select document",
                            },
                          ]}
                        >
                          <Upload.Dragger
                            maxCount={1}
                            listType="picture"
                            beforeUpload={() => false}
                            onChange={(info) => {}}
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
                          label="Is exposure adequately controlled?"
                          name="exposure_controlled"
                          rules={[
                            {
                              required: false,
                              message: "This Field is required.",
                            },
                          ]}
                        >
                          <Radio.Group>
                            <Radio value={true}>Yes</Radio>
                            <Radio value={false}>No</Radio>
                          </Radio.Group>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item
                          label="Residual Risk Rating"
                          name="risk_rating_id"
                          rules={[
                            {
                              required: false,
                              message: "Risk Rating are required.",
                            },
                          ]}
                        >
                          <Select
                            placeholder="Select Risk Rating"
                            showSearch={true}
                            optionFilterProp="children"
                            filterOption={(input, option) => {
                              return (
                                option.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              );
                            }}
                          >
                            {riskRatings.map((riskRating) => {
                              return (
                                <Select.Option value={riskRating.id}>
                                  {riskRating.name}
                                </Select.Option>
                              );
                            })}
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item label="">
                          <Button
                            type="primary"
                            htmlType="submit"
                            loading={addAssessmentLoading}
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

export default AddCoshhAssessment;
