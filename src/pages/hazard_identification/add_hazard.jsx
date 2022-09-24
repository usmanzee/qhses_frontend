import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Form,
  Table,
  Button,
  Spin,
  Typography,
  Input,
} from "antd";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getProfileAction,
  getHiraHazardsAction,
  addHiraHazardAction,
} from "../../redux/actions";

const { Title } = Typography;

const AddHiraHazard = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const profileLoading = useSelector((state) => state.profile.loading);
  const profile = useSelector((state) => state.profile.data);

  const hiraHazardsLoading = useSelector((state) => state.hiraHazards.loading);
  const hiraHazards = useSelector((state) => state.hiraHazards.list);
  const addLoading = useSelector((state) => state.hiraHazards.addLoading);

  useEffect(() => {
    if (!profile) {
      dispatch(getProfileAction(history));
    }
  }, [profile]);

  useEffect(() => {
    dispatch(getHiraHazardsAction(history));
  }, []);

  const onFormSubmit = (values) => {
    dispatch(addHiraHazardAction(history, values));
    form.resetFields();
  };

  const columns = [
    {
      title: "Sr#",
      dataIndex: "id",
      fixed: "left",
      defaultSortOrder: "descend",
      render: (value, row, index) => row.id,
    },
    {
      title: "Activity.",
      dataIndex: "name",
    },
    // {
    //   title: "Actions",
    //   key: "operation",
    //   fixed: "right",
    //   width: 200,
    //   render: (text, row) => {
    //     return (
    //       <Row style={{ justifyContent: "space-evenly" }}>
    //         <Link to={`activities/edit/${row.id}`}>
    //           <Button type="link" icon={<EditOutlined />} size="small">
    //             Update
    //           </Button>
    //         </Link>
    //       </Row>
    //     );
    //   },
    // },
  ];

  return (
    <>
      <div
        style={{
          display: "block",
        }}
      >
        <Card style={{ borderRadius: "8px" }}>
          <Row justify="space-between">
            <Col
              xs={{ span: 24, offset: 0 }}
              sm={{ span: 18, offset: 3 }}
              md={{ span: 12, offset: 6 }}
              lg={{ span: 12, offset: 6 }}
              xl={{ span: 12, offset: 6 }}
            >
              <Form
                layout="vertical"
                form={form}
                onFinish={onFormSubmit}
                autoComplete="off"
                hideRequiredMark
              >
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item
                      label="Activity"
                      name="name"
                      type="text"
                      rules={[
                        {
                          required: true,
                          message: "Please input activity",
                        },
                      ]}
                    >
                      <Input placeholder="Activity" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item label="">
                      <Button
                        type="primary"
                        htmlType="submit"
                        // block
                        loading={addLoading}
                      >
                        Submit
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
          <Row
            gutter={16}
            justify="space-between"
            style={{ marginBottom: "8px" }}
          >
            <Col>
              <Title level={5}>Hazards</Title>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Table
                columns={columns}
                dataSource={hiraHazards ? hiraHazards : []}
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
                  spinning: profileLoading || hiraHazardsLoading,
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

export default AddHiraHazard;
