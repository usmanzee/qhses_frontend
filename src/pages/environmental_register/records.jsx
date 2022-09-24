import React, { useState, useEffect } from "react";
import { Row, Col, Card, Form, Table, Button, Spin, Typography } from "antd";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import moment from "moment";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getProfileAction,
  getEnvironmentalRecordsAction,
} from "../../redux/actions";

const { Title } = Typography;

const EnvironmentalRecords = () => {
  const pageNumber = 1;
  const dateFormat = "YYYY-MM-DD";
  const history = useHistory();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const profileLoading = useSelector((state) => state.profile.loading);
  const profile = useSelector((state) => state.profile.data);

  const environmentalRecordsLoading = useSelector(
    (state) => state.environmentalRecords.loading
  );
  const environmentalRecords = useSelector(
    (state) => state.environmentalRecords.list
  );

  useEffect(() => {
    if (!profile) {
      dispatch(getProfileAction(history));
    }
  }, [profile]);

  useEffect(() => {
    dispatch(getEnvironmentalRecordsAction(history));
  }, []);

  const columns = [
    {
      title: "Sr#",
      dataIndex: "id",
      fixed: "left",
      defaultSortOrder: "descend",
      render: (value, row, index) => row.id,
    },
    {
      title: "EAIR No.",
      dataIndex: "eair_number",
    },
    {
      title: "Company",
      dataIndex: "company_id",
      render: (value, row, index) => row.company && row.company.name,
    },
    {
      title: "Rev. No.",
      dataIndex: "revision_number",
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (value, row, index) => moment(row.date).format(dateFormat),
    },
    {
      title: "Created By",
      dataIndex: "user_id",
      render: (value, row, index) => row.user && row.user.name,
    },
    {
      title: "Actions",
      key: "operation",
      fixed: "right",
      width: 200,
      render: (text, row) => {
        return (
          <Row style={{ justifyContent: "space-evenly" }}>
            <Link to={`/eair/records/edit/${row.id}`}>
              <Button type="link" icon={<EditOutlined />} size="small">
                Update
              </Button>
            </Link>
          </Row>
        );
      },
    },
  ];

  return (
    <>
      <div
        style={{
          display: "block",
        }}
      >
        <Card style={{ borderRadius: "8px" }}>
          <Row
            gutter={16}
            justify="space-between"
            style={{ marginBottom: "8px" }}
          >
            <Col>
              <Title level={5}>Records</Title>
            </Col>
            <Col>
              <Link to={`/eair/records/add`}>
                <Button type="primary" icon={<PlusOutlined />}>
                  Add New Record
                </Button>
              </Link>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Table
                columns={columns}
                dataSource={environmentalRecords ? environmentalRecords : []}
                bordered
                rowKey="id"
                size="middle"
                // scroll={{ x: "calc(700px + 50%)" }}
                loading={{
                  indicator: (
                    <div>
                      <Spin />
                    </div>
                  ),
                  spinning: profileLoading || environmentalRecordsLoading,
                }}
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
        </Card>
      </div>
    </>
  );
};

export default EnvironmentalRecords;
