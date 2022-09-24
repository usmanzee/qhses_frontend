import React, { useState, useEffect } from "react";
import { Row, Col, Card, Table, Button, Spin, Typography, Tag } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getCoshhAssessmentsAction } from "../../redux/actions";

const { Title } = Typography;

const CoshhAssessments = () => {
  const pageNumber = 1;
  const dateFormat = "YYYY-MM-DD";
  const history = useHistory();

  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const assessmentsLoading = useSelector(
    (state) => state.coshhAssessments.loading
  );
  const assessments = useSelector((state) => state.coshhAssessments.list);

  useEffect(() => {
    if (!assessments.length) {
      dispatch(getCoshhAssessmentsAction(history, pageNumber));
    }
  }, [assessments]);

  const columns = [
    {
      title: "Sr#",
      dataIndex: "id",
      fixed: "left",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.id - b.id,
      render: (value, row, index) => row.id,
    },
    {
      title: "Assessment Number",
      dataIndex: "assessment_number",
    },
    {
      title: "Company",
      dataIndex: "company_id",
      render: (value, row, index) => row.company && row.company.name,
    },
    {
      title: "Department",
      dataIndex: "department_id",
      render: (value, row, index) => row.department && row.department.name,
    },
    {
      title: "Product Name",
      dataIndex: "product_name",
    },
    {
      title: "Persons at Risk",
      dataIndex: "riskPersons",
      render: (value, row, index) => {
        return (
          <>
            {row.riskPersons.map((riskPerson) => (
              <Tag style={{ margin: "4px 4px" }}>{riskPerson.name}</Tag>
            ))}
          </>
        );
      },
    },
    {
      title: "Classification",
      dataIndex: "classifications",
      render: (value, row, index) => {
        return (
          <>
            {row.classifications.map((classification) => (
              <Tag style={{ margin: "4px 4px" }}>{classification.name}</Tag>
            ))}
          </>
        );
      },
    },
    {
      title: "Hazard Types",
      dataIndex: "hazardTypes",
      render: (value, row, index) => {
        return (
          <>
            {row.hazardTypes.map((hazardType) => (
              <Tag style={{ margin: "4px 4px" }}>
                {hazardType.id === 8
                  ? hazardType.CoshhAssessmentHazardType.other_description
                  : hazardType.name}
              </Tag>
            ))}
          </>
        );
      },
    },
    {
      title: "Route of Exposure",
      dataIndex: "exposureRoutes",
      render: (value, row, index) => {
        return (
          <>
            {row.exposureRoutes.map((exposureRoute) => (
              <Tag style={{ margin: "4px 4px" }}>
                {exposureRoute.id === 5
                  ? exposureRoute.CoshhAssessmentExposureRoute.other_description
                  : exposureRoute.name}
              </Tag>
            ))}
          </>
        );
      },
    },
    {
      title: "Health Surveillance Required",
      dataIndex: "health_surveillance_required",
      render: (value, row, index) =>
        row.health_surveillance_required ? "Yes" : "No",
    },
    {
      title: "Personal Protective Equipment",
      dataIndex: "protectiveEquipments",
      render: (value, row, index) => {
        return (
          <>
            {row.protectiveEquipments.map((protectiveEquipment) => (
              <Tag style={{ margin: "4px 4px" }}>
                {protectiveEquipment.id === 8
                  ? protectiveEquipment.CoshhAssessmentProtectiveEquipment
                      .other_description
                  : protectiveEquipment.name}
              </Tag>
            ))}
          </>
        );
      },
    },
    {
      title: "Disposal of Substances & Contaminated Containers",
      dataIndex: "protectiveEquipments",
      render: (value, row, index) => {
        return (
          <>
            {row.substancesDisposalTypes.map((substancesDisposalType) => (
              <Tag style={{ margin: "4px 4px" }}>
                {substancesDisposalType.id === 4
                  ? substancesDisposalType.CoshhAssessmentSubstanceDisposalType
                      .other_description
                  : substancesDisposalType.name}
              </Tag>
            ))}
          </>
        );
      },
    },
    {
      title: "Is exposure adequately controlled?",
      dataIndex: "exposure_controlled",
      render: (value, row, index) => (row.exposure_controlled ? "Yes" : "No"),
    },
    {
      title: "Document",
      dataIndex: "document_url",
      render: (text, row) => {
        return (
          row.document_url && (
            <a href={row.document_url} target="_blank" download>
              Click to Download
            </a>
          )
        );
      },
    },
    {
      title: "Created By",
      dataIndex: "user_id",
      render: (value, row, index) => row.user && row.user.name,
    },
    {
      title: "Created At",
      dataIndex: "date",
      render: (value, row, index) => moment(row.createdAt).format(dateFormat),
    },
    {
      title: "Residual Risk Rating",
      dataIndex: "riskRating",
      fixed: "right",
      render: (value, row, index) => {
        return <>{row.riskRating && row.riskRating.name}</>;
      },
    },
    {
      title: "Actions",
      dataIndex: "id",
      fixed: "right",
      render: (text, row) => {
        return (
          <Link to={`/coshh/assessments/${row.id}`}>
            <Button type="link" size="small">
              Details
            </Button>
          </Link>
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
            style={{ alignItems: "center" }}
          >
            <Col>
              <Title level={5}>Assessments</Title>
            </Col>
            <Col>
              <Link to={`/coshh/assessments/add`}>
                <Button type="primary" icon={<PlusOutlined />}>
                  Add New Assessment
                </Button>
              </Link>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Table
                columns={columns}
                dataSource={assessments ? assessments : []}
                bordered
                rowKey="id"
                size="middle"
                scroll={{ x: "calc(900px + 100%)" }}
                loading={{
                  indicator: (
                    <div>
                      <Spin />
                    </div>
                  ),
                  spinning: assessmentsLoading,
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

export default CoshhAssessments;
