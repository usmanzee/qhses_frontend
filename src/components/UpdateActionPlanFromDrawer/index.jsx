import React from "react";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  DatePicker,
  Drawer,
  Upload,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import moment from "moment";
export const UpdateActionPlanFormDrawer = (props) => {
  const dateFormat = "YYYY-MM-DD";
  const {
    drawerVisible,
    setDrawerVisible,
    actionPlanDocuments,
    setActionPlanDocuments,
    ncrRecord,
    handleFormSubmit,
  } = props;

  return (
    <>
      <Drawer
        title="Update Action Plan"
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
                name="closing_date"
                label="Closing Date"
                rules={[
                  {
                    required: true,
                    message: "Please select closing date",
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
                name="closing_remarks"
                label="Closing Remarks"
                rules={[
                  {
                    required: true,
                    message: "Please input closing remarks",
                  },
                ]}
              >
                <Input.TextArea
                  autoSize={{ minRows: 5, maxRows: 5 }}
                  showCount
                  maxLength={500}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Supporting Documents(Max: 5)"
                // name="documents"
                getValueFromEvent={({ file }) => {}}
                rules={[
                  {
                    required: false,
                    message: "Please select any document",
                  },
                ]}
              >
                <Upload.Dragger
                  // disabled={
                  //   profile &&
                  //   recordDetail &&
                  //   (profile.id === recordDetail.user.id ||
                  //     profile.id === recordDetail.owner.id)
                  //     ? false
                  //     : true
                  // }
                  fileList={actionPlanDocuments}
                  multiple={true}
                  maxCount={5}
                  listType="picture"
                  beforeUpload={() => false}
                  onChange={(info) => {
                    if (info.file.status === "removed") {
                      var index = actionPlanDocuments.findIndex((document) => {
                        return document.uid == info.file.uid;
                      });
                      const newDocumentsList = actionPlanDocuments.slice();
                      newDocumentsList.splice(index, 1);
                      setActionPlanDocuments(newDocumentsList);
                    } else {
                      setActionPlanDocuments((prevDocuments) => [
                        ...prevDocuments,
                        info.file,
                      ]);
                    }
                  }}
                  onRemove={(file) => {}}
                  onPreview={(file) => {
                    // if (file.status && file.status === "done") {
                    //   window.open(file.url);
                    // }
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
          <Row justify="end" gutter={16}>
            <Col>
              <Form.Item label="">
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
