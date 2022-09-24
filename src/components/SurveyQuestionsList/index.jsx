import React from "react";

import { Table, Spin, Popconfirm } from "antd";
export const SurveyQuestionList = (props) => {
  const { loading, data, handleRowDelete } = props;

  const columns = [
    {
      title: "#",
      render: (value, row, index) => {
        return index + 1;
      },
    },
    {
      title: "Question Desc.",
      dataIndex: "question_description",
      key: "question_description",
      width: 200,
    },
    {
      title: "Question Aspect",
      dataIndex: "aspect_title",
      key: "aspect_title",
      width: 200,
    },
    {
      title: "Rating Text 1",
      dataIndex: "rating_text_1",
      key: "rating_text_1",
    },
    {
      title: "Rating Text 2",
      dataIndex: "rating_text_2",
      key: "rating_text_2",
    },
    {
      title: "Rating Text 3",
      dataIndex: "rating_text_3",
      key: "rating_text_3",
    },
    {
      title: "Rating Text 4",
      dataIndex: "rating_text_4",
      key: "rating_text_4",
    },
    {
      title: "Rating Text 5",
      dataIndex: "rating_text_5",
      key: "rating_text_5",
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
