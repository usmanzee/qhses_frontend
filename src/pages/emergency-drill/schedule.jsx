import React, { useState, useEffect } from "react";
import { Card, Row, Col, Form, Select, Button, Table, Spin, Badge } from "antd";
import { CheckOutlined } from "@ant-design/icons";

import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
  getYearsAction,
  getCompaniesAction,
  getDepartmentsAction,
  getUsersAction,
  getMonthsAction,
  getEmergencyDrillTypesAction,
  getLocationsAction,
  getEmergencyDrillsAction,
  addEmergencyDrillAction,
  addEmergencyDrillNotificationAction,
} from "../../redux/actions";
import {
  CustomIcon,
  ScheduleEmergencyDrillFormDrawer,
  EmergencyDrillNotificationFormDrawer,
  EmergencyDrillsDetailModal,
} from "../../components";

import types from "../../redux/types";

import moment from "moment";

const styles = {
  columnContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  columnActionContent: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "8px",
  },
  actionButton: {
    height: "16px",
    fontSize: "10px",
  },
};

const EmergencyDrillSchedule = () => {
  const pageNumber = 1;
  const dateFormat = "YYYY-MM-DD";
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const search = location.search;
  let urlParams = new URLSearchParams(search);

  const [filterForm] = Form.useForm();
  const [scheduleDrillForm] = Form.useForm();
  const [drillNotificationForm] = Form.useForm();
  const currentYearName = moment().year();

  const [
    scheduleEmergencyDrawerVisible,
    setScheduleEmergencyDrillDrawerVisible,
  ] = useState(false);

  const [
    drillNotificationFormDrawerVisible,
    setDrillNotificationFormDrawerVisible,
  ] = useState(false);

  const [drillsDetailModalVisible, setDrillsDetailModalVisible] =
    useState(false);

  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const [filteredDrills, setFilteredDrills] = useState([]);
  const [scheduleEmergencyDrills, setScheduleEmergencyDrills] = useState([]);
  const [selectedToEmailsUserIds, setSelectedToEmailsUserIds] = useState([]);

  const profileLoading = useSelector((state) => state.profile.loading);
  const profile = useSelector((state) => state.profile.data);

  const yearsLoading = useSelector((state) => state.years.loading);
  const years = useSelector((state) => state.years.list);

  const monthsLoading = useSelector((state) => state.months.loading);
  const months = useSelector((state) => state.months.list);

  const companiesLoading = useSelector((state) => state.companies.loading);
  const companies = useSelector((state) => state.companies.list);

  const usersLoading = useSelector((state) => state.users.loading);
  const users = useSelector((state) => state.users.list);

  const emergencyDrillTypesLoading = useSelector(
    (state) => state.emergencyDrillTypes.loading
  );
  const emergencyDrillTypes = useSelector(
    (state) => state.emergencyDrillTypes.list
  );

  const locationsLoading = useSelector((state) => state.locations.loading);
  const locations = useSelector((state) => state.locations.list);

  const emergencyDrillsLoading = useSelector(
    (state) => state.emergencyDrills.loading
  );
  const emergencyDrills = useSelector((state) => state.emergencyDrills.list);

  const addDrillLoading = useSelector(
    (state) => state.emergencyDrills.addDrillLoading
  );
  const addDrillSuccess = useSelector(
    (state) => state.emergencyDrills.addDrillSuccess
  );

  const drillDetailLoading = useSelector(
    (state) => state.emergencyDrills.drillDetailLoading
  );
  const drillDetail = useSelector((state) => state.emergencyDrills.drillDetail);

  const addDrillNotificationLoading = useSelector(
    (state) => state.emergencyDrills.addDrillNotificationLoading
  );

  useEffect(() => {
    dispatch(getYearsAction(history));
    dispatch(getCompaniesAction(history));
    dispatch(getDepartmentsAction(history));
    dispatch(getUsersAction(history, true));
    dispatch(getMonthsAction(history));
    dispatch(getEmergencyDrillTypesAction(history));
    dispatch(getLocationsAction(history));
  }, []);
  useEffect(() => {
    if (addDrillSuccess) {
      scheduleDrillForm.resetFields();
    }
  }, [addDrillSuccess]);

  useEffect(() => {
    if (years && years.length) {
      const paramsYearId = urlParams.get("year_id");
      let setYear = years[0];
      if (paramsYearId) {
        setYear = years.find((year) => parseInt(year.id) == paramsYearId);
      } else {
        setYear = years.find((year) => parseInt(year.year) === currentYearName);
      }
      setYear ? setSelectedYear(setYear) : setSelectedYear(years[0]);
    }
  }, [years]);

  useEffect(() => {
    if (selectedYear) {
      dispatch(
        getEmergencyDrillsAction(
          history,
          pageNumber,
          selectedYear.id,
          selectedCompany && selectedCompany.id
        )
      );
    }
  }, [selectedYear, selectedCompany]);

  useEffect(() => {
    let data = [];
    emergencyDrills.forEach((emergencyDrill, index) => {
      const existingCompanyData = data.find(
        (item) =>
          item.company_id && item.company_id === emergencyDrill.company_id
      );
      if (existingCompanyData) {
        addDataAgainstMonth(existingCompanyData, emergencyDrill);
      }
      if (!existingCompanyData) {
        data.push({
          uId: index,
          locationAndArea: emergencyDrill.company.name,
          year_id: emergencyDrill.year_id,
          company_id: emergencyDrill.company_id,
          department_id: emergencyDrill.department_id,
          jan: emergencyDrill.month_id === 1 ? [emergencyDrill] : [],
          feb: emergencyDrill.month_id === 2 ? [emergencyDrill] : [],
          mar: emergencyDrill.month_id === 3 ? [emergencyDrill] : [],
          apr: emergencyDrill.month_id === 4 ? [emergencyDrill] : [],
          may: emergencyDrill.month_id === 5 ? [emergencyDrill] : [],
          jun: emergencyDrill.month_id === 6 ? [emergencyDrill] : [],
          jul: emergencyDrill.month_id === 7 ? [emergencyDrill] : [],
          aug: emergencyDrill.month_id === 8 ? [emergencyDrill] : [],
          sep: emergencyDrill.month_id === 9 ? [emergencyDrill] : [],
          oct: emergencyDrill.month_id === 10 ? [emergencyDrill] : [],
          nov: emergencyDrill.month_id === 11 ? [emergencyDrill] : [],
          dec: emergencyDrill.month_id === 12 ? [emergencyDrill] : [],
        });
      }
    });
    setScheduleEmergencyDrills(data);
  }, [emergencyDrills]);

  const addDataAgainstMonth = (existingdata, newData) => {
    switch (newData.month_id) {
      case 1:
        existingdata.jan.push(newData);
        break;
      case 2:
        existingdata.feb.push(newData);
        break;
      case 3:
        existingdata.mar.push(newData);
        break;
      case 4:
        existingdata.apr.push(newData);
        break;
      case 5:
        existingdata.may.push(newData);
        break;
      case 6:
        existingdata.jun.push(newData);
        break;
      case 7:
        existingdata.jul.push(newData);
        break;
      case 8:
        existingdata.aug.push(newData);
        break;
      case 9:
        existingdata.sep.push(newData);
        break;
      case 10:
        existingdata.oct.push(newData);
        break;
      case 11:
        existingdata.nov.push(newData);
        break;
      case 12:
        existingdata.dec.push(newData);
        break;
      default:
        break;
    }
  };

  const onScheduleEmergencyDrillFormSubmit = (values) => {
    // const drillExists = emergencyDrills.find(
    //   (emergencyDrill) =>
    //     emergencyDrill.year_id === values["year_id"] &&
    //     emergencyDrill.month_id === values["month_id"] &&
    //     emergencyDrill.company_id === values["company_id"]
    // );
    // if (drillExists)
    //   return message.error(
    //     "A drill already scheduled for the same month,year and company."
    //   );
    const selectedCompany = companies.find(
      (company) => company.id === values.company_id
    );
    if (selectedCompany) values["company_code"] = selectedCompany.code;

    dispatch(addEmergencyDrillAction(history, values, selectedYear.year));
  };

  const handleNotificationClick = (monthData) => {
    setDrillsDetailModalVisible(false);
    setSelectedToEmailsUserIds([]);
    drillNotificationForm.resetFields();
    dispatch({
      type: types.EMERGENCY_DRILL_DETAIL_DATA,
      payload: monthData,
    });
    let prefillData = {};
    if (monthData.notification) {
      const selectedToEmailsUserIdsData =
        monthData.notification.toEmailUsers.map((toEmailsUser) => {
          return toEmailsUser.to_email_user_id;
        });
      setSelectedToEmailsUserIds(selectedToEmailsUserIdsData);

      prefillData["to_email_user_ids"] = selectedToEmailsUserIdsData;
      drillNotificationForm.setFieldsValue(prefillData);
    }
    setDrillNotificationFormDrawerVisible(true);
  };

  const getUserById = (id) => {
    return users.find((user) => user.id === id);
  };

  const onAuditNotificationFormSubmit = (values) => {
    values["emergency_drill_id"] = drillDetail.id;
    let toEmailUsers = [];
    if (values.to_email_user_ids) {
      values.to_email_user_ids.forEach((toEmailUserId) => {
        const user = getUserById(toEmailUserId);
        toEmailUsers.push({
          emergency_drill_id: drillDetail.id,
          to_email_user_id: user.id,
          to_email_user_name: user.name,
          to_email_user_email: user.email,
        });
      });
    }

    values["toEmailUsers"] = toEmailUsers;
    dispatch(
      addEmergencyDrillNotificationAction(history, values, drillDetail.id)
    );
  };

  const findDrillsByYearMonthCompanyAndDepartment = (
    yearId,
    monthId,
    companyId
  ) => {
    const filteredDrills = emergencyDrills.filter((drill) => {
      return (
        drill.year_id === yearId &&
        drill.month_id === monthId &&
        drill.company_id === companyId
      );
    });
    setFilteredDrills(filteredDrills);
    setDrillsDetailModalVisible(true);
  };

  const renderColumnContent = (monthId, rowData, monthData) => {
    return (
      <>
        {monthData.length ? (
          <>
            <Badge count={monthData.length} size="default" />
            <Button
              type="link"
              onClick={() => {
                findDrillsByYearMonthCompanyAndDepartment(
                  selectedYear.id,
                  monthId,
                  rowData.company_id,
                  rowData.department_id
                );
              }}
              style={{ lineHeight: "0px", height: "0px", padding: "4px" }}
            >
              Schedule
            </Button>
          </>
        ) : (
          ""
        )}
      </>
    );
    // return (
    //   <>
    //     {Object.keys(monthData).length ? (
    //       <div style={styles.columnContent}>
    //         <Tooltip title={monthData.status.name}>
    //           <CustomIcon
    //             type={monthData.status.antd_icon_name}
    //             style={{ fontSize: "20px", color: monthData.status.color_code }}
    //           />
    //         </Tooltip>
    //         <div style={styles.columnActionContent}>
    //           <Button
    //             danger={monthData.notification ? false : true}
    //             type="primary"
    //             size="small"
    //             style={styles.actionButton}
    //             onClick={() => {
    //               handleNotificationClick(monthData);
    //             }}
    //           >
    //             Notification
    //           </Button>
    //           <Tooltip title={"Mark Attendence Once Notification is Created"}>
    //             <Button
    //               danger
    //               size="small"
    //               disabled={monthData && monthData.notification ? false : true}
    //               style={{ ...styles.actionButton, margin: "8px 0px" }}
    //               onClick={() => {
    //                 history.push(`/emergency-drill/${monthData.id}/attendence`);
    //               }}
    //             >
    //               Attendence
    //             </Button>
    //           </Tooltip>
    //           <Tooltip title={"Add Report Once Attendence is Submitted"}>
    //             <Button
    //               size="small"
    //               disabled={
    //                 monthData &&
    //                 monthData.notification &&
    //                 monthData.attendence_submitted
    //                   ? false
    //                   : true
    //               }
    //               style={{ ...styles.actionButton }}
    //               onClick={() => {
    //                 history.push(`/emergency-drill/${monthData.id}/report`);
    //               }}
    //             >
    //               Report
    //             </Button>
    //           </Tooltip>
    //         </div>
    //       </div>
    //     ) : (
    //       ""
    //     )}
    //   </>
    // );
  };

  const columns = [
    {
      title: "Location/Area",
      dataIndex: "locationAndArea",
      fixed: "left",
      width: 100,
    },
    {
      title: "Jan",
      dataIndex: "date",
      width: 120,
      render: (value, row, index) => {
        return <>{renderColumnContent(1, row, row.jan)}</>;
      },
    },
    {
      title: "Feb",
      dataIndex: "date",
      width: 120,
      render: (value, row, index) => {
        return <>{renderColumnContent(2, row, row.feb)}</>;
      },
    },
    {
      title: "Mar",
      dataIndex: "date",
      width: 120,
      render: (value, row, index) => {
        return <>{renderColumnContent(3, row, row.mar)}</>;
      },
    },
    {
      title: "Apr",
      dataIndex: "date",
      width: 120,
      render: (value, row, index) => {
        return <>{renderColumnContent(4, row, row.apr)}</>;
      },
    },
    {
      title: "May",
      dataIndex: "date",
      width: 120,
      render: (value, row, index) => {
        return <>{renderColumnContent(5, row, row.may)}</>;
      },
    },
    {
      title: "Jun",
      dataIndex: "date",
      width: 120,
      render: (value, row, index) => {
        return <>{renderColumnContent(6, row, row.jun)}</>;
      },
    },
    {
      title: "Jul",
      dataIndex: "date",
      width: 120,
      render: (value, row, index) => {
        return <>{renderColumnContent(7, row, row.jul)}</>;
      },
    },
    {
      title: "Aug",
      dataIndex: "date",
      width: 120,
      render: (value, row, index) => {
        return <>{renderColumnContent(8, row, row.aug)}</>;
      },
    },
    {
      title: "Sep",
      dataIndex: "date",
      width: 120,
      render: (value, row, index) => {
        return <>{renderColumnContent(9, row, row.sep)}</>;
      },
    },
    {
      title: "Oct",
      dataIndex: "date",
      width: 120,
      render: (value, row, index) => {
        return <>{renderColumnContent(10, row, row.oct)}</>;
      },
    },
    {
      title: "Nov",
      dataIndex: "date",
      width: 120,
      render: (value, row, index) => {
        return <>{renderColumnContent(11, row, row.nov)}</>;
      },
    },
    {
      title: "Dec",
      dataIndex: "date",
      width: 120,
      render: (value, row, index) => {
        return <>{renderColumnContent(12, row, row.dec)}</>;
      },
    },
  ];

  return (
    <>
      <div>
        <Card style={{ marginBottom: "8px" }}>
          <Row justify="space-between" style={{ alignItems: "center" }}>
            <Col span={18}>
              <Form
                form={filterForm}
                layout="vertical"
                autoComplete="off"
                fields={[
                  {
                    name: ["year_id"],
                    value: selectedYear && selectedYear.id,
                  },
                ]}
              >
                <Row gutter={16}>
                  <Col span={6}>
                    <Form.Item name="year_id" label="Year">
                      <Select
                        loading={yearsLoading}
                        onChange={(value) => {
                          const year = years.find((year) => year.id === value);
                          setSelectedYear(year);
                        }}
                      >
                        {years.map((year) => {
                          return (
                            <Select.Option value={year.id}>
                              {year.year}
                            </Select.Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item name="company_id" label="Company">
                      <Select
                        loading={companiesLoading}
                        onChange={(value) => {
                          const company = companies.find(
                            (company) => company.id === value
                          );
                          setSelectedCompany(company);
                        }}
                      >
                        <Select.Option value=""></Select.Option>
                        {companies.map((company) => {
                          return (
                            <Select.Option value={company.id}>
                              {company.name}
                            </Select.Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Col>
            <Col>
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => {
                  setScheduleEmergencyDrillDrawerVisible(true);
                }}
              >
                Schedule Emergency Drill
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Table
                columns={columns}
                dataSource={
                  scheduleEmergencyDrills ? scheduleEmergencyDrills : []
                }
                bordered
                rowKey="uId"
                size="middle"
                scroll={{ x: "calc(700px + 50%)" }}
                loading={{
                  indicator: (
                    <div>
                      <Spin />
                    </div>
                  ),
                  spinning: profileLoading || emergencyDrillsLoading,
                }}
                pagination={false}
              />
            </Col>
          </Row>
        </Card>
        <ScheduleEmergencyDrillFormDrawer
          drawerVisible={scheduleEmergencyDrawerVisible}
          setDrawerVisible={setScheduleEmergencyDrillDrawerVisible}
          form={scheduleDrillForm}
          addDataLoading={addDrillLoading}
          years={years}
          months={months}
          companies={companies}
          emergencyDrillTypes={emergencyDrillTypes}
          locations={locations}
          handleFormSubmit={onScheduleEmergencyDrillFormSubmit}
        />

        <EmergencyDrillNotificationFormDrawer
          drawerVisible={drillNotificationFormDrawerVisible}
          setDrawerVisible={setDrillNotificationFormDrawerVisible}
          form={drillNotificationForm}
          addDataLoading={addDrillNotificationLoading}
          profile={profile}
          selectedEmergencyDrill={drillDetail}
          selectedToEmailsUserIds={selectedToEmailsUserIds}
          users={users}
          handleFormSubmit={onAuditNotificationFormSubmit}
        />

        <EmergencyDrillsDetailModal
          visible={drillsDetailModalVisible}
          setVisible={setDrillsDetailModalVisible}
          drills={filteredDrills}
          handleNotificationClick={handleNotificationClick}
        />
      </div>
    </>
  );
};

export default EmergencyDrillSchedule;
