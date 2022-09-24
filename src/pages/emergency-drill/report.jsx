import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Form,
  Button,
  Select,
  Tag,
  PageHeader,
  Descriptions,
  Typography,
  Input,
  Divider,
  message,
  DatePicker,
  Tooltip,
  Upload,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams, Link } from "react-router-dom";
import {
  getEmergencyDrillTypesAction,
  getLocationsAction,
  getEmergencyDrillDetailAction,
  updateEmergencyDrill,
} from "../../redux/actions";

import {
  EmergencyDrillHighlightsList,
  EmergencyDrillHighlightFormDrawer,
  PageLoader,
  EmergencyDrillPdfReport,
} from "../../components";

import { v4 as uuid } from "uuid";
import moment from "moment";

const { Title, Text } = Typography;

const EmergencyDrillReport = () => {
  const dateFormat = "YYYY-MM-DD";
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const [form] = Form.useForm();

  const [highlightDrawerVisible, setHighlightDrawerVisible] = useState(false);
  const [highlightList, setHighlightList] = useState([]);
  const [attachmentsList, setAttachmentsList] = useState([]);

  const profileLoading = useSelector((state) => state.profile.loading);
  const profile = useSelector((state) => state.profile.data);

  const emergencyDrillTypesLoading = useSelector(
    (state) => state.emergencyDrillTypes.loading
  );
  const emergencyDrillTypes = useSelector(
    (state) => state.emergencyDrillTypes.list
  );

  const locationsLoading = useSelector((state) => state.locations.loading);
  const locations = useSelector((state) => state.locations.list);

  const drillDetailLoading = useSelector(
    (state) => state.emergencyDrills.drillDetailLoading
  );
  const drillDetail = useSelector((state) => state.emergencyDrills.drillDetail);

  const updateDrillLoading = useSelector(
    (state) => state.emergencyDrills.updateDrillLoading
  );

  useEffect(() => {
    dispatch(getEmergencyDrillTypesAction(history));
    dispatch(getLocationsAction(history));
    dispatch(getEmergencyDrillDetailAction(history, params.id));
  }, []);

  useEffect(() => {
    if (drillDetail) {
      const highlightsData = drillDetail.highlights.map((highlight) => {
        return {
          uId: uuid(),
          allowDelete: false,
          event: highlight.event,
          time: moment(highlight.time).format("hh:mm A"),
        };
      });
      setHighlightList(highlightsData);
      drillDetail.shift_date_time = moment(drillDetail.shift_date_time);
      const selectedLocationIds = drillDetail.locations.map((location) => {
        return location.id;
      });
      drillDetail.location_ids = selectedLocationIds;

      /**
       * Set Attachments
       */

      const attachmentsData = drillDetail.attachments.map((attachment) => {
        return {
          uid: `${attachment.id}_${attachment.attachment_name}`,
          name: attachment.attachment_name,
          status: "done",
          url: attachment.attachment_url,
        };
      });
      setAttachmentsList(attachmentsData);

      /**
       * Set Attachments End
       */

      form.setFieldsValue(drillDetail);
    }
  }, [drillDetail]);

  const handleHighlightsRowDelete = (uId) => {
    const dataSource = [...highlightList];
    setHighlightList(dataSource.filter((item) => item.uId !== uId));
  };

  const handleHighlightFormSubmit = (values) => {
    const uId = uuid();
    const newData = {
      uId: uId,
      allowDelete: true,
      event: values.event,
      time: values.time.format("hh:mm A"),
    };
    setHighlightList([...highlightList, newData]);
    message.info("Highlight added, Please do submit");
  };

  const onFormSubmit = (submitted, values) => {
    let newHightlights = [];
    highlightList.forEach((item) => {
      if (item.allowDelete) {
        newHightlights.push({
          ...item,
          emergency_drill_id: params.id,
        });
      }
    });
    const formData = new FormData();
    for (const name in values) {
      formData.append(name, values[name] ? values[name] : "");
    }
    formData.append("highlightList", JSON.stringify(newHightlights));
    formData.append("submitted", submitted);
    attachmentsList.forEach((attachment) => {
      if (!(attachment.status && attachment.status === "done")) {
        formData.append("attachments", attachment);
      }
    });
    console.log(Object.fromEntries(formData));
    dispatch(updateEmergencyDrill(history, params.id, formData));
  };

  return (
    <>
      <div>
        {drillDetailLoading ? (
          <PageLoader />
        ) : (
          <Card style={{ marginBottom: "8px" }}>
            <Row
              justify="end"
              style={{ alignItems: "center", marginBottom: "8px" }}
            >
              <Col>
                <Tooltip title="Once Submitted then it can't be changed.">
                  <Button
                    disabled={
                      drillDetail &&
                      profile &&
                      (profile.id !== drillDetail.user_id ||
                        drillDetail.submitted)
                    }
                    danger
                    name="submit"
                    loading={updateDrillLoading}
                    onClick={() => {
                      form.validateFields().then((values) => {
                        if (!values.corrective_action_points)
                          return message.error(
                            "Please Input Corrective Action Points"
                          );
                        onFormSubmit(true, values);
                      });
                    }}
                  >
                    {drillDetail && drillDetail.submitted
                      ? "Submitted"
                      : "Submit"}
                  </Button>
                </Tooltip>
              </Col>
              <Col style={{ marginLeft: "8px" }}>
                <EmergencyDrillPdfReport drillDetail={drillDetail} />
              </Col>
            </Row>
            <Row
              style={{
                border: "1px solid #ededed",
                borderRadius: "8px",
                marginBottom: "16px",
              }}
            >
              <Col>
                <PageHeader
                  ghost={false}
                  title={drillDetail && drillDetail.drill_number}
                >
                  <Descriptions size="small" column={5}>
                    <Descriptions.Item label="Year">
                      {drillDetail && drillDetail.year && drillDetail.year.year}
                    </Descriptions.Item>
                    <Descriptions.Item label="Month">
                      {drillDetail &&
                        drillDetail.month &&
                        drillDetail.month.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Shift Time">
                      {drillDetail &&
                        `${moment(drillDetail.shift_date_time).format(
                          "YYYY-MM-DD hh:mm A"
                        )}`}
                    </Descriptions.Item>
                    <Descriptions.Item label="Location/Area">
                      <Text>
                        {drillDetail &&
                          drillDetail.company &&
                          drillDetail.company.name}
                      </Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="Status">
                      {drillDetail && drillDetail.status && (
                        <Tag color={drillDetail.status.color_code}>
                          {drillDetail.status.name}
                        </Tag>
                      )}
                    </Descriptions.Item>
                  </Descriptions>
                </PageHeader>
              </Col>
            </Row>
            <Row
              className="hide-on-mobile"
              style={{
                marginBottom: "16px",
                padding: "24px",
                border: "1px solid rgb(237, 237, 237)",
                marginBottom: "16px",
                borderRadius: "8px",
              }}
            >
              <Col span={24}>
                <Title level={5}>To Email(s)</Title>
                {drillDetail &&
                  drillDetail.notification &&
                  drillDetail.notification.toEmailUsers &&
                  drillDetail.notification.toEmailUsers.map((toEmailUser) => {
                    return <Tag>{toEmailUser.user.name}</Tag>;
                  })}
              </Col>
            </Row>
            <Row
              className="hide-on-mobile"
              style={{
                marginBottom: "16px",
                padding: "24px",
                border: "1px solid rgb(237, 237, 237)",
                marginBottom: "16px",
                borderRadius: "8px",
              }}
            >
              <Col span={24}>
                <Title level={5}>Locations/Facilities</Title>
                {drillDetail &&
                  drillDetail.locations &&
                  drillDetail.locations.map((location) => {
                    return <Tag>{location.name}</Tag>;
                  })}
              </Col>
            </Row>
            <Row gutter={16} justify="space-between">
              <Col span={12}>
                <Form
                  layout="vertical"
                  form={form}
                  // onFinish={onFormSubmit}
                  autoComplete="off"
                >
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item
                        label="Emergency Type"
                        name="type_id"
                        rules={[
                          {
                            required: false,
                            message: "Please Select Emergency Type.",
                          },
                        ]}
                      >
                        <Select disabled placeholder="Select Emergency Type">
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
                            required: false,
                            message: "Please Select Locations.",
                          },
                        ]}
                      >
                        <Select
                          disabled
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
                            required: false,
                            message: "Please Select Shift Date Time.",
                          },
                        ]}
                      >
                        <DatePicker
                          disabled
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
                            required: false,
                            message: "Please input drill purpose",
                          },
                        ]}
                      >
                        <Input.TextArea
                          disabled
                          placeholder="Drill Purpose"
                          autoSize={{ minRows: 5, maxRows: 5 }}
                          showCount
                          // maxLength={500}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Divider />
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item
                        label="Emergency Commander"
                        name="drill_coordinator"
                        rules={[
                          {
                            required: false,
                            message: "Please input emergency commander",
                          },
                        ]}
                      >
                        <Input placeholder="Emergency Commander" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item
                        label="Emergency Response Team Leader"
                        name="response_team_leader"
                        rules={[
                          {
                            required: false,
                            message:
                              "Please input emergency response team leader",
                          },
                        ]}
                      >
                        <Input placeholder="Emergency Response Team Leader" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item
                        label="Emergency Response Team Members"
                        name="response_team_members"
                        rules={[
                          {
                            required: false,
                            message:
                              "Please input emergency response team members",
                          },
                        ]}
                      >
                        <Input placeholder="Emergency Response Team Members" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item
                        label="Traffic Controllers "
                        name="traffic_controllers"
                        rules={[
                          {
                            required: false,
                            message: "Please input traffic controllers ",
                          },
                        ]}
                      >
                        <Input placeholder="Traffic Controllers" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item
                        label="Drill Scenario"
                        name="drill_scenarios"
                        rules={[
                          {
                            required: false,
                            message: "Please input drill scenario",
                          },
                        ]}
                      >
                        <Input.TextArea
                          placeholder="Drill Scenario"
                          autoSize={{ minRows: 5, maxRows: 5 }}
                          showCount
                          // maxLength={500}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Divider />
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item
                        label="Total Staff Response Time"
                        name="staff_response_time"
                        rules={[
                          {
                            required: false,
                            message: "Please input staff response time ",
                          },
                        ]}
                      >
                        <Input placeholder="Total staff response time" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item
                        label="Emergency Equipment Used"
                        name="used_emergency_equipments"
                        rules={[
                          {
                            required: false,
                            message: "Please input emergency equipment used",
                          },
                        ]}
                      >
                        <Input placeholder="Emergency Equipment Used" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item
                        label="Positive Notes"
                        name="positive_notes"
                        rules={[
                          {
                            required: false,
                            message: "Please input positive notes",
                          },
                        ]}
                      >
                        <Input.TextArea
                          placeholder="Positive Notes"
                          autoSize={{ minRows: 5, maxRows: 5 }}
                          showCount
                          // maxLength={500}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item
                        label="Observation Points"
                        name="observation_points"
                        rules={[
                          {
                            required: false,
                            message: "Please input observation points",
                          },
                        ]}
                      >
                        <Input.TextArea
                          placeholder="Observation Point"
                          autoSize={{ minRows: 5, maxRows: 5 }}
                          showCount
                          // maxLength={500}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item
                        label="General Observations"
                        name="general_observations"
                        rules={[
                          {
                            required: false,
                            message: "Please input general observations",
                          },
                        ]}
                      >
                        <Input.TextArea
                          placeholder="General Observations"
                          autoSize={{ minRows: 5, maxRows: 5 }}
                          showCount
                          // maxLength={500}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item
                        label="Corrective Action Points"
                        name="corrective_action_points"
                        rules={[
                          {
                            required: false,
                            message: "Please input corrective action points",
                          },
                        ]}
                      >
                        <Input.TextArea
                          placeholder="Corrective Action Points"
                          autoSize={{ minRows: 5, maxRows: 5 }}
                          showCount
                          // maxLength={500}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item
                        label="Drill Images(Max: 5)"
                        name="attachments"
                        getValueFromEvent={({ file }) => {}}
                        rules={[
                          {
                            required: false,
                            message: "Please select any document",
                          },
                        ]}
                      >
                        <Upload.Dragger
                          accept="image/*"
                          fileList={attachmentsList}
                          multiple={true}
                          maxCount={5}
                          listType="picture"
                          beforeUpload={() => false}
                          onChange={(info) => {
                            console.log(info);
                            if (info.file.status === "removed") {
                              var index = attachmentsList.findIndex(
                                (document) => {
                                  return document.uid == info.file.uid;
                                }
                              );
                              const newDocumentsList = attachmentsList.slice();
                              newDocumentsList.splice(index, 1);
                              setAttachmentsList(newDocumentsList);
                            } else {
                              setAttachmentsList((prevDocuments) => [
                                info.file,
                                ...prevDocuments,
                              ]);
                            }
                          }}
                          onRemove={(file) => {}}
                          onPreview={(file) => {
                            if (file.status && file.status === "done") {
                              window.open(file.url);
                            }
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
                </Form>
              </Col>
              <Col span={12}>
                <Row
                  justify="space-between"
                  style={{ marginBottom: "4px", alignItems: "center" }}
                >
                  <Col>
                    <Title level={5} style={{ marginBottom: "0px" }}>
                      Drill Highlights
                    </Title>
                  </Col>
                  {drillDetail && !drillDetail.submitted && (
                    <Col>
                      <Button
                        disabled={
                          drillDetail &&
                          profile &&
                          profile.id !== drillDetail.user_id
                        }
                        type="primary"
                        onClick={() => {
                          setHighlightDrawerVisible(true);
                        }}
                      >
                        Add Drill Highlight
                      </Button>
                    </Col>
                  )}
                </Row>
                <EmergencyDrillHighlightsList
                  loading={false}
                  data={highlightList}
                  handleRowDelete={handleHighlightsRowDelete}
                />
              </Col>
            </Row>
            {drillDetail && !drillDetail.submitted && (
              <Row justify="start">
                <Col>
                  <Button
                    disabled={
                      drillDetail &&
                      profile &&
                      profile.id !== drillDetail.user_id
                    }
                    type="primary"
                    name="save"
                    loading={updateDrillLoading}
                    // onClick={() => form.submit()}
                    onClick={() => {
                      form.validateFields().then((values) => {
                        onFormSubmit(false, values);
                      });
                    }}
                  >
                    Save
                  </Button>
                </Col>
              </Row>
            )}

            <EmergencyDrillHighlightFormDrawer
              visible={highlightDrawerVisible}
              setVisible={setHighlightDrawerVisible}
              handleFormSubmit={handleHighlightFormSubmit}
            />
          </Card>
        )}
      </div>
    </>
  );
};

export default EmergencyDrillReport;
