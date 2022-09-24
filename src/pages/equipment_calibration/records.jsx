import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Table,
  Select,
  DatePicker,
  Modal,
  Button,
  Spin,
  Tag,
  Checkbox,
  Divider,
  Radio,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  HistoryOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { HistroyModal } from "../../components";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getProfileAction,
  getCalibrationRecordsAction,
} from "../../redux/actions";
import { ExportCSV } from "../../components";

const { Option } = Select;

const CalibrationRecords = () => {
  const pageNumber = 1;
  const dateFormat = "YYYY-MM-DD";
  const history = useHistory();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [historyModalVisible, setHistoryModalVisible] = useState(false);
  const [selectedRecordHistroy, setSelectedRecordHistory] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [filter, setFilter] = useState("ALL");

  const [exportableRecords, setExportableRecords] = useState([]);

  const selectedUserApplication = useSelector(
    (state) => state.selectedUserApplication.data
  );
  const userApplicationRole = useSelector(
    (state) => state.userApplicationRole.data
  );
  const profileLoading = useSelector((state) => state.profile.loading);
  const profile = useSelector((state) => state.profile.data);
  const recordsLoading = useSelector(
    (state) => state.calibrationRecords.loading
  );
  const recordUpdateLoding = useSelector(
    (state) => state.calibrationRecords.updateRecordLoading
  );
  const records = useSelector((state) => state.calibrationRecords.list);

  useEffect(() => {
    if (!profile) {
      dispatch(getProfileAction(history));
    }
  }, [profile]);

  useEffect(() => {
    if (records.length) {
      var newData = [];
      records.forEach((record, index) => {
        // newData.push({
        //   "sr#": index + 1,
        //   "NCR no": record.ncr_number,
        //   "NCR date": moment(record.ncr_date).format(dateFormat),
        //   description: record.description,
        //   "NCR Owner": record.owner.name,
        //   "NCR Owner Designation": record.owner.designation,
        //   "NCR Owner Department": record.owner.department,
        //   Area: record.area.name,
        //   Category: record.category.name,
        //   "Management System": record.management_system_id,
        //   "NCR Source": record.source.name,
        //   "Verification Effectiveness": record.verification_effectiveness,
        //   Status: record.status.name,
        // });
      });
      setExportableRecords(newData);
    }
  }, [records]);

  useEffect(() => {
    dispatch(getCalibrationRecordsAction(pageNumber, history));
  }, []);

  const filterRecords = () => {
    dispatch(
      getCalibrationRecordsAction(pageNumber, history, searchValue, filter)
    );
  };

  const columns = [
    // {
    //   title: "Sr#",
    //   dataIndex: "id",
    //   width: 100,
    //   fixed: "left",
    //   defaultSortOrder: "descend",
    //   render: (value, row, index) => index + 1,
    // },
    {
      title: "Equipment ID",
      dataIndex: "id",
      width: 100,
      fixed: "left",
      sorter: (a, b) => a.id - b.id,
      defaultSortOrder: "descend",
    },
    {
      title: "Equipment Asset No.",
      dataIndex: "equipment_asset_number",
      width: 100,
    },
    {
      title: "Owner",
      dataIndex: "owner_id",
      width: 100,
      render: (text, row) => {
        return <>{row.owner.name}</>;
      },
    },
    {
      title: "Instrument Description",
      dataIndex: "instrument_description",
      width: 100,
    },
    {
      title: "Referance Standard",
      dataIndex: "referance_standard",
      width: 100,
    },
    {
      title: "Manufacturer",
      dataIndex: "manufacturer",
      width: 100,
    },
    {
      title: "Inst. Sl No.",
      dataIndex: "instrument_serial_number",
      width: 100,
    },
    {
      title: "Range",
      dataIndex: "range",
      width: 100,
    },
    {
      title: "Accuracy",
      dataIndex: "accuracy",
      width: 100,
    },
    {
      title: "Frequency of Calibration",
      dataIndex: "calibration_frequency",
      width: 100,
      render: (text, row) => {
        return <>{row.calibrationFrequency.name}</>;
      },
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
    },
    {
      title: "Attachment",
      dataIndex: "certification_attachment",
      width: 100,
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
      render: (text, row) => {
        return (
          <>
            {row.remarks && row.remarks !== "undefined" ? row.remarks : "N/A"}
          </>
        );
      },
    },
    {
      title: "Actions",
      key: "operation",
      fixed: "right",
      width: 200,
      render: (text, row) => {
        return (
          <Row style={{ justifyContent: "space-evenly" }}>
            <Button
              type="primary"
              icon={<HistoryOutlined />}
              size="small"
              onClick={() => {
                setSelectedRecordHistory(row.history);
                setHistoryModalVisible(true);
              }}
            >
              History
            </Button>

            <Link to={`records/edit/${row.id}`}>
              <Button type="primary" icon={<EditOutlined />} size="small">
                update
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
        <Row>
          <Col>
            <Card style={{ borderRadius: "8px" }}>
              <Row
                justify="space-between"
                style={{ alignItems: "center", marginBottom: "8px" }}
              >
                {/* <Col>
                  <ExportCSV
                    csvData={exportableRecords}
                    fileName={"NCR_Records"}
                  />
                </Col> */}

                <Col>
                  <Row
                    gutter={16}
                    justify="space-between"
                    style={{ alignItems: "center" }}
                  >
                    <Col>
                      <Input
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Equipment ID/Asset No"
                      />
                    </Col>
                    <Col>
                      <Radio.Group
                        onChange={(e) => {
                          setFilter(e.target.value);
                        }}
                        value={filter}
                      >
                        <Radio value={"ALL"}>All</Radio>
                        <Radio value={"MONTH"}>Due in Month</Radio>
                        <Radio value={"WEEK"}>Due in Week</Radio>
                        <Radio value={"OVERDUE"}>Overdue</Radio>
                      </Radio.Group>
                    </Col>
                    <Col>
                      <Button
                        htmlType="submit"
                        // block
                        // loading={recordsLoading}
                        disabled={recordsLoading}
                        onClick={() => filterRecords()}
                      >
                        Filter
                      </Button>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Divider type="vertical" />
                </Col>
                {userApplicationRole && userApplicationRole.name === "Admin" && (
                  <Col style={{ marginLeft: "8px" }}>
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={() =>
                        history.push("/equipment-calibration/records/add")
                      }
                    >
                      Add New Record
                    </Button>
                  </Col>
                )}
              </Row>

              <Row>
                <Col>
                  <Table
                    columns={columns}
                    dataSource={records ? records : []}
                    bordered
                    rowKey="id"
                    size="middle"
                    scroll={{ x: "calc(700px + 50%)" }}
                    loading={{
                      indicator: (
                        <div>
                          <Spin />
                        </div>
                      ),
                      spinning:
                        profileLoading || recordsLoading || recordUpdateLoding,
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
          </Col>
        </Row>
      </div>

      <HistroyModal
        modalVisible={historyModalVisible}
        setModalVisible={setHistoryModalVisible}
        histroyRecords={selectedRecordHistroy}
      />
    </>
  );
};

export default CalibrationRecords;
