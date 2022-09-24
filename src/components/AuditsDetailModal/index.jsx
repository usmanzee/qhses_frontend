import React from "react";
import { Row, Col, Modal, Table, Button, Divider, Typography } from "antd";
import { useHistory } from "react-router-dom";
import moment from "moment";

import { CustomIcon } from "..";

const { Text } = Typography;
export const AuditsDetailModal = (props) => {
  const dateFormat = "YYYY-MM-DD";
  const history = useHistory();
  const { visible, setVisible, audits, handleNotificationClick } = props;

  const columns = [
    {
      title: "Sr#",
      dataIndex: "id",
      defaultSortOrder: "descend",
      fixed: "left",
      render: (value, row, index) => index + 1,
    },
    {
      title: "Audit Number",
      dataIndex: "year",
      render: (value, row, index) => row.audit_number,
    },
    {
      title: "Year",
      dataIndex: "year",
      render: (value, row, index) => row.year && row.year.year,
    },
    {
      title: "Month",
      dataIndex: "month",
      render: (value, row, index) => row.month && row.month.name,
    },
    {
      title: "Company/Department",
      dataIndex: "company",
      width: 150,
      render: (value, row, index) =>
        (row.company && row.company.name) ||
        (row.department && row.department.name),
    },
    {
      title: "Audit Date",
      dataIndex: "date",
      width: 200,
      render: (text, row) => {
        return (
          <>
            {row &&
              row.notification &&
              `${moment(row.notification.audit_from_date).format(
                dateFormat
              )} to ${moment(row.notification.audit_to_date).format(
                dateFormat
              )}`}
          </>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 170,
      render: (value, row, index) => {
        return (
          <>
            <CustomIcon
              type={row.status.antd_icon_name}
              style={{
                fontSize: "14px",
                color: row.status.color_code,
                marginRight: "4px",
              }}
            />
            <Text>{row.status && row.status.name}</Text>
          </>
        );
      },
    },
    {
      title: "Actions",
      dataIndex: "id",
      width: 250,
      render: (value, row, index) => {
        return (
          <>
            <Button
              type="link"
              danger={row.notification ? false : true}
              style={{ padding: "4px 4px" }}
              onClick={() => {
                handleNotificationClick(row);
              }}
            >
              Notification
            </Button>
            <Divider type="vertical" />
            <Button
              type="link"
              disabled={row.notification ? false : true}
              style={{ padding: "4px 4px" }}
              onClick={() => {
                history.push(`/internal-audit/${row.id}/checklist`);
              }}
            >
              Checklist
            </Button>
            <Divider type="vertical" />
            <Button
              type="link"
              disabled={row.audit_status_id === 4 ? false : true}
              style={{ padding: "4px 4px" }}
              onClick={() => {
                history.push(`/internal-audit/${row.id}/report`);
              }}
            >
              Report
            </Button>
          </>
        );
      },
    },
  ];
  return (
    <>
      <Modal
        title="Audits"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={"80%"}
        footer={null}
      >
        <Row>
          <Col>
            <Table
              columns={columns}
              dataSource={audits ? audits : []}
              bordered
              rowKey="id"
              size="middle"
              scroll={{ x: "calc(100%)" }}
            />
          </Col>
        </Row>
      </Modal>
    </>
  );
};
