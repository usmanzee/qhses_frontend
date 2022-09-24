import React from "react";

import { Table, Spin, Popconfirm } from "antd";
export const DistrubutorList = (props) => {
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
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, row) => {
        return <>{row.user.name}</>;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text, row) => {
        return <>{row.user.email}</>;
      },
    },
    {
      title: "Email Type",
      dataIndex: "email_type",
      key: "email_type",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, row) =>
        row.allowDelete >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleRowDelete(row.id)}
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
        rowKey="id"
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
