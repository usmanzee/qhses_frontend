import React, { useState } from "react";
import { Row, Col, Modal, Table, Button } from "antd";
import moment from "moment";
export const HistroyModal = (props) => {
  const dateFormat = "YYYY-MM-DD";
  const { modalVisible, setModalVisible, histroyRecords } = props;
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const columns = [
    {
      title: "Sr#",
      dataIndex: "id",
      defaultSortOrder: "descend",
      width: 100,
      fixed: "left",
      render: (value, row, index) => index + 1,
    },
    {
      title: "Equipment Id",
      dataIndex: "record_id",
      width: 100,
    },
    {
      title: "Calib. On",
      dataIndex: "calibration_date",
      width: 100,
      render: (text, row) => {
        return <>{moment(row.calibration_date).format(dateFormat)}</>;
      },
    },
    {
      title: "Calib. Due",
      dataIndex: "calibration_due_date",
      width: 100,
      render: (text, row) => {
        return <>{moment(row.calibration_due_date).format(dateFormat)}</>;
      },
    },
    {
      title: "Certificate No.",
      dataIndex: "certificate_number",
      width: 100,
      defaultSortOrder: "descend",
    },
    {
      title: "Entered By",
      dataIndex: "user",
      width: 100,
      render: (text, row) => {
        return <>{row.user.name}</>;
      },
    },
    {
      title: "Entered On",
      dataIndex: "calibration_due_date",
      width: 100,
      render: (text, row) => {
        return <>{moment(row.createdAt).format(dateFormat)}</>;
      },
    },
    {
      title: "Attachment",
      dataIndex: "certification_attachment",
      width: 100,
      defaultSortOrder: "descend",
      render: (text, row) => {
        return (
          <a href={row.certification_attachment} target="_blank" download>
            Click to Download
          </a>
        );
      },
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      width: 170,
      defaultSortOrder: "descend",
      render: (text, row) => {
        return (
          <>
            {row.remarks && row.remarks !== "undefined" ? row.remarks : "N/A"}
          </>
        );
      },
    },
  ];
  return (
    <>
      <Modal
        title="Equipment Calibration Histroy"
        centered
        visible={modalVisible}
        onOk={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}
        width={1000}
      >
        <Row>
          <Col>
            <Table
              columns={columns}
              dataSource={histroyRecords ? histroyRecords : []}
              bordered
              rowKey="id"
              size="middle"
              scroll={{ x: "calc(100%)" }}
              pagination={{
                current: page,
                pageSize: pageSize,
                onChange: (page, pageSize) => {
                  setPage(page);
                  setPageSize(pageSize);
                },
              }}
            />
          </Col>
        </Row>
      </Modal>
    </>
  );
};
