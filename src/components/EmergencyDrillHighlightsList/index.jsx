import React from "react";

import { Table, Spin, Popconfirm } from "antd";
export const EmergencyDrillHighlightsList = (props) => {
  const { loading, data, handleRowDelete } = props;

  const columns = [
    {
      title: "Sr#",
      dataIndex: "sNo",
      key: "sNo",
      render: (value, row, index) => {
        return index + 1;
      },
    },
    {
      title: "Event",
      dataIndex: "event",
      key: "event",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, row) =>
        row.allowDelete >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleRowDelete(row.uId)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];
  return (
    <>
      <Table
        bordered
        dataSource={data}
        columns={columns}
        pagination={false}
        rowKey="uId"
        loading={{
          indicator: (
            <div>
              <Spin />
            </div>
          ),
          spinning: loading,
        }}
      />
    </>
  );
};
