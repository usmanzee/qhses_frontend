import React, { useState } from "react";
import {
  Row,
  Col,
  Table,
  Spin,
  Popconfirm,
  Tag,
  Button,
  Divider,
  Modal,
  PageHeader,
  Descriptions,
  Typography,
  Space,
} from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import moment from "moment";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;
export const ActionPlansList = (props) => {
  const dateFormat = "YYYY-MM-DD";
  const [visible, setVisible] = useState(false);
  const [selectedActionPlan, setSelectedActionPlan] = useState(false);

  const {
    loading,
    profileLoading,
    profile,
    data,
    handleEditClick,
    handleRowDelete,
  } = props;

  const columns = [
    {
      title: "Sr#",
      dataIndex: "sNo",
      key: "sNo",
      width: 70,
      render: (value, row, index) => {
        return index + 1;
      },
    },
    {
      title: "Action Plan",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Responsible Person",
      dataIndex: "responsible_person",
      key: "responsible_person",
      render: (value, row, index) => {
        return row.user.name;
      },
    },
    {
      title: "Responsible Department",
      dataIndex: "responsible_department",
      key: "responsible_department",
      render: (value, row, index) => {
        return row.user.department;
      },
    },
    {
      title: "Target Date",
      dataIndex: "target_date",
      key: "target_date",
      width: 100,
    },
    {
      title: "Days",
      dataIndex: "days",
      key: "days",
      width: 50,
    },
    {
      title: "Closing Date",
      dataIndex: "closing_date",
      key: "closing_date",
    },
    {
      title: "Closing Remarks",
      dataIndex: "closing_remarks",
      key: "closing_remarks",
      width: 100,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      fixed: "right",
      width: 100,
      render: (text, row) => {
        let color = row.status.toLowerCase() === "closed" ? "red" : "geekblue";
        return (
          <>
            <Tag color={color} key={row.id}>
              {row.status}
            </Tag>
          </>
        );
      },
    },
    {
      title: "Actions",
      dataIndex: "Actions",
      fixed: "right",
      width: 130,
      render: (_, row) =>
        row.allowDelete ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleRowDelete(row.uId)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : row.status.toLowerCase() === "open" &&
          row.user.id === profile.id ? (
          <>
            <Button
              type="link"
              onClick={() => handleEditClick(row.id)}
              style={{ padding: "0px" }}
            >
              Edit
            </Button>
            <Divider type="vertical" />
            <Button
              type="link"
              onClick={() => {
                setSelectedActionPlan(row);
                setVisible(true);
              }}
              style={{ padding: "0px" }}
            >
              Details
            </Button>
          </>
        ) : (
          <Button
            type="link"
            onClick={() => {
              setSelectedActionPlan(row);
              setVisible(true);
            }}
            style={{ padding: "0px" }}
          >
            Details
          </Button>
        ),
    },
  ];
  return (
    <>
      <Table
        bordered
        dataSource={data}
        columns={columns}
        pagination={false}
        rowKey="user_id"
        // scroll={{ x: 1300 }}
        scroll={{ x: "calc(700px + 50%)" }}
        loading={{
          indicator: (
            <div>
              <Spin />
            </div>
          ),
          spinning: loading && profileLoading,
        }}
      />
      <Modal
        title="Action Plan Detail"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1100}
        bodyStyle={{ padding: "0px" }}
      >
        <Row>
          <Col>
            {" "}
            <PageHeader
              ghost={false}
              title={selectedActionPlan && selectedActionPlan.user.name}
              tags={
                <Tag
                  color={
                    selectedActionPlan &&
                    selectedActionPlan.status.toLowerCase() === "closed"
                      ? "red"
                      : "geekblue"
                  }
                >
                  {" "}
                  {selectedActionPlan && selectedActionPlan.status}
                </Tag>
              }
            >
              <Descriptions size="small" column={5}>
                <Descriptions.Item label="Action Plan">
                  <Text strong>
                    {selectedActionPlan && selectedActionPlan.description}
                  </Text>
                </Descriptions.Item>
                <Descriptions.Item label="Target Date">
                  <Text strong>
                    {" "}
                    {selectedActionPlan &&
                      moment(selectedActionPlan.target_date).format(dateFormat)}
                  </Text>
                </Descriptions.Item>
                <Descriptions.Item label="Days">
                  <Text strong>
                    {" "}
                    {selectedActionPlan && selectedActionPlan.days}
                  </Text>
                </Descriptions.Item>
                <Descriptions.Item label="Closing Date">
                  <Text strong>
                    {selectedActionPlan.closing_date
                      ? moment(selectedActionPlan.closing_date).format(
                          dateFormat
                        )
                      : "N/A"}
                  </Text>
                </Descriptions.Item>
                <Descriptions.Item label="Closing Remakrs">
                  <Text strong>
                    {selectedActionPlan.closing_remarks
                      ? selectedActionPlan.closing_remarks
                      : "N/A"}
                  </Text>
                </Descriptions.Item>
              </Descriptions>
            </PageHeader>
            <Divider />
            <div style={{ padding: "0px 24px 16px" }}>
              <Title level={5}>Attachments:</Title>
              {selectedActionPlan.documents
                ? selectedActionPlan.documents.map((document, index) => {
                    const imagesTypes = ["jpg", "jpeg", "png", "gif"];
                    const docMimeType = document.document_name.split(".")[1];
                    return (
                      <>
                        {/* <div style={{ margin: "8px 0px" }}>
                          <Text
                            strong
                            style={{
                              padding: "8px",
                              border: "1px solid, #dbd9d9",
                              borderRadius: "2px",
                            }}
                          >
                            {`${index + 1} - `}
                            <a href={document.document_url} target="_blank">
                              {document.document_name}
                            </a>
                          </Text>
                        </div> */}

                        <Link
                          to={{ pathname: document.document_url }}
                          target="_blank"
                          style={{
                            display: "flex",
                            height: "60px",
                            width: "100%",
                            border: "1px solid #f0f0f0",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "0px 8px",
                            cursor: "pointer",
                            margin: "8px 0px",
                          }}
                        >
                          <Space>
                            {imagesTypes.includes(docMimeType) ? (
                              <img
                                width={50}
                                height={50}
                                src={`${document.document_url}`}
                              />
                            ) : (
                              <FileTextOutlined style={{ fontSize: "40px" }} />
                            )}
                            <Text>{document.document_name}</Text>
                          </Space>

                          <Space>
                            <Text strong style={{ color: "gray" }}>
                              Uploaded By:
                            </Text>
                            <Text>{` ${document.uploadedBy.name}`}</Text>
                            <Text strong style={{ color: "gray" }}>
                              On
                            </Text>
                            <Text>{` ${moment(document.createdAt).format(
                              "YYYY-MM-DD"
                            )}`}</Text>
                          </Space>
                        </Link>
                      </>
                    );
                  })
                : "N/A"}
            </div>
          </Col>
        </Row>
      </Modal>
    </>
  );
};
