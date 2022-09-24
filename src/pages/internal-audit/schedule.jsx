import React, { useState, useEffect } from "react";
import { Card, Row, Col, Form, Select, Button, Table, Spin, Badge } from "antd";

import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
  getYearsAction,
  getCompaniesAction,
  getDepartmentsAction,
  getUsersAction,
  getMonthsAction,
  getAuditFindingsAction,
  getAuditStatusesAction,
  getAuditsAction,
  addAuditAction,
  addAuditNotificationAction,
  addAuditChecklistAction,
} from "../../redux/actions";
import {
  CustomIcon,
  ScheduleAuditFormDrawer,
  AuditNotificationFormDrawer,
  AuditCheckListFormDrawer,
  AuditsDetailModal,
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

const InternalAuditSchedule = () => {
  const pageNumber = 1;
  const dateFormat = "YYYY-MM-DD";
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const search = location.search;
  let urlParams = new URLSearchParams(search);

  const [filterForm] = Form.useForm();
  const [scheduleAuditForm] = Form.useForm();
  const [auditNotificationForm] = Form.useForm();
  const [auditChecklistForm] = Form.useForm();
  const currentYearName = moment().year();

  const [scheduleAuditDrawerVisible, setScheduleAuditDrawerVisible] =
    useState(false);

  const [
    auditNotificationFormDrawerVisible,
    setAuditNotificationFormDrawerVisible,
  ] = useState(false);

  const [auditsDetailModalVisible, setAuditsDetailModalVisible] =
    useState(false);
  // const [auditChecklistFormDrawerVisible, setAuditChecklistFormDrawerVisible] =
  //   useState(false);

  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const [scheduleAudits, setScheduleAudits] = useState([]);
  const [filteredAudits, setFilteredAudits] = useState([]);
  // const [selectedAudit, setSelectedAudit] = useState({});
  const [selectedAuditeeIds, setSelectedAuditeeIds] = useState([]);
  const [selectedAuditorIds, setSelectedAuditorIds] = useState([]);
  const [selectedToEmailsUserIds, setSelectedToEmailsUserIds] = useState([]);
  const [documentsList, setDocumentsList] = useState([]);

  const profileLoading = useSelector((state) => state.profile.loading);
  const profile = useSelector((state) => state.profile.data);

  const yearsLoading = useSelector((state) => state.years.loading);
  const years = useSelector((state) => state.years.list);

  const monthsLoading = useSelector((state) => state.months.loading);
  const months = useSelector((state) => state.months.list);

  const companiesLoading = useSelector((state) => state.companies.loading);
  const companies = useSelector((state) => state.companies.list);

  const departmentsLoading = useSelector((state) => state.departments.loading);
  const departments = useSelector((state) => state.departments.list);

  const usersLoading = useSelector((state) => state.users.loading);
  const users = useSelector((state) => state.users.list);

  const auditStatusesLoading = useSelector(
    (state) => state.auditStatuses.loading
  );
  const auditStatuses = useSelector((state) => state.auditStatuses.list);

  const auditFindingsLoading = useSelector(
    (state) => state.auditFindings.loading
  );
  const auditFindings = useSelector((state) => state.auditFindings.list);

  const auditsLoading = useSelector((state) => state.audits.loading);
  const audits = useSelector((state) => state.audits.list);

  const addAuditLoading = useSelector((state) => state.audits.addAuditLoading);
  const auditDetailLoading = useSelector(
    (state) => state.audits.auditDetailLoading
  );
  const auditDetail = useSelector((state) => state.audits.auditDetail);

  const addAuditNotificationLoading = useSelector(
    (state) => state.audits.addAuditNotificationLoading
  );
  const addAuditNotificationChecklist = useSelector(
    (state) => state.audits.addAuditNotificationChecklist
  );

  useEffect(() => {
    dispatch(getYearsAction(history));
    dispatch(getCompaniesAction(history));
    dispatch(getDepartmentsAction(history));
    dispatch(getUsersAction(history, true));
    dispatch(getMonthsAction(history));
    dispatch(getAuditFindingsAction(history));
    dispatch(getAuditStatusesAction(history));
  }, []);

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
      dispatch(getAuditsAction(pageNumber, history, selectedYear.id));
    }
  }, [selectedYear]);

  useEffect(() => {
    let data = [];
    audits.forEach((audit, index) => {
      const existingCompanyData = data.find(
        (item) => item.company_id && item.company_id === audit.company_id
      );
      const existingDepartmentData = data.find(
        (item) =>
          item.department_id && item.department_id === audit.department_id
      );
      if (existingCompanyData) {
        addDataAgainstMonth(existingCompanyData, audit);
      }
      if (existingDepartmentData) {
        addDataAgainstMonth(existingDepartmentData, audit);
      }

      if (!existingCompanyData && !existingDepartmentData) {
        data.push({
          uId: index,
          locationAndArea: audit.company
            ? audit.company.name
            : audit.department.name,
          year_id: audit.year_id,
          company_id: audit.company_id,
          department_id: audit.department_id,
          jan: audit.month_id === 1 ? [audit] : [],
          feb: audit.month_id === 2 ? [audit] : [],
          mar: audit.month_id === 3 ? [audit] : [],
          apr: audit.month_id === 4 ? [audit] : [],
          may: audit.month_id === 5 ? [audit] : [],
          jun: audit.month_id === 6 ? [audit] : [],
          jul: audit.month_id === 7 ? [audit] : [],
          aug: audit.month_id === 8 ? [audit] : [],
          sep: audit.month_id === 9 ? [audit] : [],
          oct: audit.month_id === 10 ? [audit] : [],
          nov: audit.month_id === 11 ? [audit] : [],
          dec: audit.month_id === 12 ? [audit] : [],
          // ...audit,
        });
      }
    });
    setScheduleAudits(data);
  }, [audits]);

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

  const onScheduleAuditFormSubmit = (values) => {
    // if (values["audit_for"] === "company") {
    //   const auditExists = audits.find(
    //     (audit) =>
    //       audit.year_id === values["year_id"] &&
    //       audit.month_id === values["month_id"] &&
    //       audit.company_id === values["company_id"]
    //   );
    //   if (auditExists)
    //     return message.error("One audit already scheduled for this company.");
    // } else {
    //   const auditExists = audits.find(
    //     (audit) =>
    //       audit.year_id === values["year_id"] &&
    //       audit.month_id === values["month_id"] &&
    //       audit.department_id === values["department_id"]
    //   );
    //   if (auditExists)
    //     return message.error(
    //       "One audit already scheduled for this department."
    //     );
    // }

    const selectedCompany = companies.find(
      (company) => company.id === values.company_id
    );
    const selectedDepartment = departments.find(
      (department) => department.id === values.department_id
    );
    if (selectedCompany) values["company_code"] = selectedCompany.code;
    if (selectedDepartment) values["company_code"] = selectedDepartment.code;
    dispatch(addAuditAction(history, values, selectedYear.year));
  };

  const handleNotificationClick = (monthData) => {
    setAuditsDetailModalVisible(false);
    setSelectedAuditeeIds([]);
    setSelectedAuditorIds([]);
    setSelectedToEmailsUserIds([]);
    setDocumentsList([]);

    auditNotificationForm.resetFields();
    // setSelectedAudit(monthData);
    dispatch({
      type: types.AUDIT_DETAIL_DATA,
      payload: monthData,
    });
    let prefillData = {};
    if (monthData.notification) {
      const selectedAuditorIdsData = monthData.notification.auditors.map(
        (auditor) => {
          return auditor.auditor_user_id;
        }
      );
      const selectedAuditeeIdsData = monthData.notification.auditees.map(
        (auditee) => {
          return auditee.auditee_user_id;
        }
      );
      const selectedToEmailsUserIdsData =
        monthData.notification.toEmailUsers.map((toEmailsUser) => {
          return toEmailsUser.to_email_user_id;
        });
      setSelectedAuditeeIds(selectedAuditeeIdsData);
      setSelectedAuditorIds(selectedAuditorIdsData);
      setSelectedToEmailsUserIds(selectedToEmailsUserIdsData);

      const documentsData = monthData.notification.referenceDocuments.map(
        (document) => {
          return {
            uid: `${document.id}_${document.document_name}`,
            name: document.document_name,
            status: "done",
            url: document.document_url,
          };
        }
      );
      setDocumentsList(documentsData);

      prefillData["auditee_ids"] = selectedAuditeeIdsData;
      prefillData["auditor_ids"] = selectedAuditorIdsData;
      prefillData["to_email_user_ids"] = selectedToEmailsUserIdsData;
      prefillData["audit_date_range"] = [
        moment(monthData.notification.audit_from_date),
        moment(monthData.notification.audit_to_date),
      ];
      prefillData["reference_documents"] =
        monthData.notification.reference_documents;
      prefillData["scope_of_audit"] = monthData.notification.scope_of_audit;

      auditNotificationForm.setFieldsValue(prefillData);
    }
    setAuditNotificationFormDrawerVisible(true);
  };

  // const handleChecklistClick = (monthData) => {
  //   // setSelectedAudit(monthData);
  //   dispatch({
  //     type: types.AUDIT_DETAIL_DATA,
  //     payload: monthData,
  //   });
  //   setAuditChecklistFormDrawerVisible(true);
  // };

  const getUserById = (id) => {
    return users.find((user) => user.id === id);
  };

  const onAuditNotificationFormSubmit = (values) => {
    values["audit_id"] = auditDetail.id;
    let auditees = [];
    let auditors = [];
    let toEmailUsers = [];
    if (values.auditor_ids) {
      values.auditor_ids.forEach((auditorId) => {
        const user = getUserById(auditorId);
        auditors.push({
          audit_id: auditDetail.id,
          auditor_user_id: user.id,
          auditor_user_name: user.name,
          auditor_user_email: user.email,
        });
      });
    }
    if (values.auditee_ids) {
      values.auditee_ids.forEach((auditeeId) => {
        const user = getUserById(auditeeId);
        auditees.push({
          audit_id: auditDetail.id,
          auditee_user_id: user.id,
          auditee_user_name: user.name,
          auditee_user_email: user.email,
        });
      });
    }
    if (values.to_email_user_ids) {
      values.to_email_user_ids.forEach((toEmailUserId) => {
        const user = getUserById(toEmailUserId);
        toEmailUsers.push({
          audit_id: auditDetail.id,
          to_email_user_id: user.id,
          to_email_user_name: user.name,
          to_email_user_email: user.email,
        });
      });
    }

    values["auditors"] = auditors;
    values["auditees"] = auditees;
    values["toEmailUsers"] = toEmailUsers;
    values["audit_from_date"] = moment(values["audit_date_range"][0]).format(
      dateFormat
    );
    values["audit_to_date"] = moment(values["audit_date_range"][1]).format(
      dateFormat
    );

    const formData = new FormData();
    formData.append("audit_id", auditDetail.id);

    formData.append("auditors", JSON.stringify(auditors));
    formData.append("auditees", JSON.stringify(auditees));
    formData.append("toEmailUsers", JSON.stringify(toEmailUsers));
    formData.append(
      "audit_from_date",
      moment(values["audit_date_range"][0]).format(dateFormat)
    );
    formData.append(
      "audit_to_date",
      moment(values["audit_date_range"][1]).format(dateFormat)
    );

    formData.append("reference_documents", values.reference_documents);
    documentsList.forEach((document) => {
      formData.append("documents", document);
    });
    formData.append("scope_of_audit", values.scope_of_audit);
    dispatch(addAuditNotificationAction(history, formData, auditDetail.id));
  };

  const onChecklistFromSubmit = (values) => {
    values["audit_id"] = auditDetail.id;
    dispatch(addAuditChecklistAction(history, values, auditDetail.id));
  };

  const findAuditsByYearMonthCompanyAndDepartment = (
    yearId,
    monthId,
    companyId,
    departmentId
  ) => {
    if (companyId) {
      const filteredAudits = audits.filter((audit) => {
        return (
          audit.year_id === yearId &&
          audit.month_id === monthId &&
          audit.company_id === companyId
        );
      });
      setFilteredAudits(filteredAudits);
    } else {
      const filteredAudits = audits.filter((audit) => {
        return (
          audit.year_id === yearId &&
          audit.month_id === monthId &&
          audit.department_id === departmentId
        );
      });
      setFilteredAudits(filteredAudits);
    }
    setAuditsDetailModalVisible(true);
  };

  const renderColumnContent = (monthId, rowData, monthData) => {
    return (
      <>
        {monthData.length ? (
          <>
            <Badge count={monthData.length} size={"default"} />
            <Button
              type="link"
              onClick={() => {
                findAuditsByYearMonthCompanyAndDepartment(
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
    //           <Button
    //             size="small"
    //             disabled={monthData && monthData.notification ? false : true}
    //             style={{ ...styles.actionButton, margin: "8px 0px" }}
    //             onClick={() => {
    //               history.push(`/internal-audit/${monthData.id}/checklist`);
    //             }}
    //           >
    //             Checklist
    //           </Button>
    //           <Button
    //             size="small"
    //             disabled={
    //               monthData && monthData.audit_status_id === 4 ? false : true
    //             }
    //             type="dashed"
    //             danger
    //             style={{ ...styles.actionButton }}
    //             onClick={() => {
    //               history.push(`/internal-audit/${monthData.id}/report`);
    //             }}
    //           >
    //             Report
    //           </Button>
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
            <Col span={20}>
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
                <Row>
                  <Col span={4}>
                    <Form.Item name="year_id" label="Year">
                      <Select
                        loading={yearsLoading}
                        onChange={(value) => {
                          const year = years.find((year) => year.id === value);
                          setSelectedYear(year);
                          scheduleAuditForm.resetFields(["date"]);
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
                  {/* <Col span={5} style={{ marginLeft: "8px" }}>
                    <Form.Item name="status_id" label="Status">
                      <Select
                        loading={auditStatusesLoading}
                        onChange={(value) => {
                          const auditStatus = auditStatuses.find(
                            (auditStatus) => auditStatus.id === value
                          );
                          setSelectedStatus(auditStatus);
                        }}
                      >
                        {auditStatuses.map((auditStatus) => {
                          return (
                            <Select.Option value={auditStatus.id}>
                              {auditStatus.name}
                            </Select.Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                  </Col> */}
                </Row>
              </Form>
            </Col>
            <Col>
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => {
                  setScheduleAuditDrawerVisible(true);
                }}
              >
                Schedule New Audit
              </Button>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Table
                columns={columns}
                dataSource={scheduleAudits ? scheduleAudits : []}
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
                  spinning: profileLoading || auditsLoading,
                }}
                pagination={false}
              />
            </Col>
          </Row>
        </Card>
        <ScheduleAuditFormDrawer
          drawerVisible={scheduleAuditDrawerVisible}
          setDrawerVisible={setScheduleAuditDrawerVisible}
          form={scheduleAuditForm}
          addAuditLoading={addAuditLoading}
          years={years}
          months={months}
          users={users}
          companies={companies}
          departments={departments}
          handleFormSubmit={onScheduleAuditFormSubmit}
        />

        <AuditNotificationFormDrawer
          drawerVisible={auditNotificationFormDrawerVisible}
          setDrawerVisible={setAuditNotificationFormDrawerVisible}
          form={auditNotificationForm}
          addAuditNotificationLoading={addAuditNotificationLoading}
          profile={profile}
          selectedAudit={auditDetail}
          selectedAuditeeIds={selectedAuditeeIds}
          selectedAuditorIds={selectedAuditorIds}
          selectedToEmailsUserIds={selectedToEmailsUserIds}
          documentsList={documentsList}
          setDocumentsList={setDocumentsList}
          users={users}
          handleFormSubmit={onAuditNotificationFormSubmit}
        />

        <AuditsDetailModal
          visible={auditsDetailModalVisible}
          setVisible={setAuditsDetailModalVisible}
          audits={filteredAudits}
          handleNotificationClick={handleNotificationClick}
        />

        {/* <AuditCheckListFormDrawer
          drawerVisible={auditChecklistFormDrawerVisible}
          setDrawerVisible={setAuditChecklistFormDrawerVisible}
          form={auditChecklistForm}
          addAuditNotificationChecklist={addAuditNotificationChecklist}
          selectedAudit={auditDetail}
          auditFindings={auditFindings}
          handleFormSubmit={onChecklistFromSubmit}
        /> */}
      </div>
    </>
  );
};

export default InternalAuditSchedule;
