import React from "react";
import { Row, Col, Modal, Table, Button, Divider, Typography } from "antd";
import { useHistory } from "react-router-dom";
import moment from "moment";

import { CustomIcon } from "..";

const { Text } = Typography;
export const EmergencyDrillsDetailModal = (props) => {
  const history = useHistory();
  const { visible, setVisible, drills, handleNotificationClick } = props;

  const columns = [
    {
      title: "Sr#",
      dataIndex: "id",
      defaultSortOrder: "descend",
      fixed: "left",
      render: (value, row, index) => index + 1,
    },
    {
      title: "Drill Number",
      dataIndex: "year",
      render: (value, row, index) => row.drill_number,
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
      title: "Company",
      dataIndex: "company",
      width: 150,
      render: (value, row, index) => row.company && row.company.name,
    },
    {
      title: "Shift Time",
      dataIndex: "shift_time",
      width: 150,
      render: (text, row) => {
        return (
          <>
            {row &&
              `${moment(row.shift_date_time).format("YYYY-MM-DD hh:mm A")}`}
          </>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 150,
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
              disabled={row && row.notification ? false : true}
              style={{ padding: "4px 4px" }}
              onClick={() => {
                history.push(`/emergency-drill/${row.id}/attendence`);
              }}
            >
              Attendence
            </Button>
            <Divider type="vertical" />
            <Button
              type="link"
              disabled={
                row && row.notification && row.attendence_submitted
                  ? false
                  : true
              }
              style={{ padding: "4px 4px" }}
              onClick={() => {
                history.push(`/emergency-drill/${row.id}/report`);
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
        title="Emergency Drills"
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
              dataSource={drills ? drills : []}
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
