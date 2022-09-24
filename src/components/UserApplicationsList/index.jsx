import React from "react";

import { Table, Spin, Popconfirm, Divider, Button } from "antd";

export const UserApplicationsList = (props) => {
  const { loading, data, handleRowDelete, onEditClick } = props;

  const columns = [
    {
      title: "sNo",
      dataIndex: "sNo",
      key: "sNo",
      render: (value, row, index) => {
        return index + 1;
      },
    },
    {
      title: "Application",
      dataIndex: "title",
      key: "title",
      render: (text, row) => {
        return <>{row.title}</>;
      },
    },
    {
      title: "Role",
      dataIndex: "application_role_name",
      key: "application_role_name",
      render: (text, row) => {
        return <>{row.application_role_name}</>;
      },
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (_, row) => {
        return (
          <>
            {row.allowEdit ? (
              <>
                <Button
                  style={{ padding: "0px" }}
                  type="link"
                  onClick={() => {
                    // setEditDrawerVisible(true);
                    onEditClick(row);
                  }}
                >
                  Edit
                </Button>
                <Divider type="vertical" />
              </>
            ) : (
              ""
            )}
            {row.allowDelete ? (
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => handleRowDelete(row.application_id)}
              >
                <a>Delete</a>
              </Popconfirm>
            ) : null}
          </>
        );
      },
    },
  ];
  return (
    <>
      <Table
        bordered
        dataSource={data}
        columns={columns}
        pagination={false}
        rowKey="application_id"
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
