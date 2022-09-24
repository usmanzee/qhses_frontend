import React, { useState, useEffect } from "react";
import { Card, Row, Col, Modal, Table, Tag, Typography, Button } from "antd";
import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import moment from "moment";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import drilldown from "highcharts/modules/drilldown";
import * as alasql from "alasql";

import {
  getProfileAction,
  getAllNcrRecordsAction,
  getDepartmentsAction,
  getStatusesAction,
  getUserCompaniesAction,
  getNcrByMonthAction,
  getNcrByDepartmentAction,
  getNcrByStatusAction,
  getNcrByStatusAndMonthAction,
  getNcrByCompanyAction,
} from "../../redux/actions";

drilldown(Highcharts);

Highcharts.setOptions({
  colors: [
    "#1DA57A",
    "#50B432",
    "#ED561B",
    "#DDDF00",
    "#24CBE5",
    "#64E572",
    "#FF9655",
    "#FFF263",
    "#6AF9C4",
  ],
  title: {
    style: {
      color: "#000",
      font: 'bold 16px "Trebuchet MS", Verdana, sans-serif',
    },
  },
  subtitle: {
    style: {
      color: "#666666",
      font: 'bold 12px "Trebuchet MS", Verdana, sans-serif',
    },
  },
});

export const MyTable = styled(Table)`
  .ant-table-container {
    height: 318px;
  }
`;

const { Title } = Typography;

const NcrDashboard = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const dateFormat = "YYYY-MM-DD";

  const [ncrByMonth, setNcrByMonth] = useState({});
  const [ncrByMonthCategories, setNcrByMonthCategories] = useState([]);
  const [ncrByMonthData, setNcrByMonthData] = useState([]);

  const [ncrByDepartment, setNcrByDepartment] = useState([]);
  const [ncrByDepartmentCategories, setNcrByDepartmentCategories] = useState(
    []
  );
  const [ncrByDepartmentData, setNcrByDepartmentData] = useState([]);

  const [ncrByStatus, setNcrByStatus] = useState([]);
  const [ncrByStatusCategories, setNcrByStatusCategories] = useState([]);
  const [ncrByStatusData, setNcrByStatusData] = useState([]);

  const [ncrByStatusAndMonth, setNcrByStatusAndMonth] = useState([]);
  const [ncrByStatusAndMonthCategories, setNcrByStatusAndMonthCategories] =
    useState([]);
  const [ncrByClosedStatusAndMonthData, setNcrByClosedStatusAndMonthData] =
    useState([]);
  const [
    ncrByNotClosedStatusAndMonthData,
    setNcrByNotClosedStatusAndMonthData,
  ] = useState([]);

  const [ncrByCompany, setNcrByCompany] = useState([]);
  const [ncrByCompanyCategories, setNcrByCompanyCategories] = useState([]);
  const [ncrByCompanyData, setNcrByCompanyData] = useState([]);

  const [recordsModalVisible, setRecordsModalVisible] = useState(false);
  const [drillDownModalName, setDrillDownModalName] = useState("NCR Records");
  const [drillDownRecords, setDrillDownRecords] = useState([]);

  const [allActionPlans, setAllActionPlans] = useState([]);
  const [pendingActionRecordsNumbers, setPendingActionRecordsNumbers] =
    useState([]);

  const profile = useSelector((state) => state.profile.data);

  const allRecordsLoading = useSelector(
    (state) => state.records.allListloading
  );
  const allRecords = useSelector((state) => state.records.allList);

  const departmentsLoading = useSelector((state) => state.departments.loading);
  const departments = useSelector((state) => state.departments.list);

  const statusesLoading = useSelector((state) => state.statuses.loading);
  const statuses = useSelector((state) => state.statuses.list);

  const userCompaniesLoading = useSelector(
    (state) => state.userCompanies.loading
  );
  const userCompanies = useSelector((state) => state.userCompanies.list);

  // const ncrByMonthFetching = useSelector((state) => state.ncrByMonth.loading);
  // const ncrByMonth = useSelector((state) => state.ncrByMonth.data);

  // const ncrByDepartmentFetching = useSelector(
  //   (state) => state.ncrByDepartment.loading
  // );
  // const ncrByDepartment = useSelector((state) => state.ncrByDepartment.list);

  // const ncrByStatusFetching = useSelector((state) => state.ncrByStatus.loading);
  // const ncrByStatus = useSelector((state) => state.ncrByStatus.list);

  // const ncrByCompanyFetching = useSelector(
  //   (state) => state.ncrByCompany.loading
  // );
  // const ncrByCompany = useSelector((state) => state.ncrByCompany.list);

  // const ncrByStatusAndMonthFetching = useSelector(
  //   (state) => state.ncrByStatusAndMonth.loading
  // );
  // const ncrByStatusAndMonth = useSelector(
  //   (state) => state.ncrByStatusAndMonth.list
  // );

  useEffect(() => {
    if (!profile) {
      dispatch(getProfileAction(history));
    }
  }, [profile]);

  useEffect(() => {
    dispatch(getAllNcrRecordsAction(history));
    dispatch(getDepartmentsAction(history));
    dispatch(getStatusesAction(history));
    dispatch(getUserCompaniesAction(history));
  }, []);

  useEffect(() => {
    if (allRecords.length) {
      let actionPlans = [];
      allRecords.forEach((record) => {
        if (record.correctiveActionPlans) {
          record.correctiveActionPlans.forEach((actionPlan) => {
            actionPlans.push(actionPlan);
          });
        }
      });
      setAllActionPlans(actionPlans);
    }
  }, [allRecords]);

  useEffect(() => {
    if (allRecords.length) {
      alasql.fn.monthNumber = function (date) {
        return moment(date).format("M");
      };
      var results = alasql(
        `SELECT 
        SUM(CASE monthNumber(ncr_date) WHEN 1 THEN 1 ELSE 0 END) AS Jan,
        SUM(CASE monthNumber(ncr_date) WHEN 2 THEN 1 ELSE 0 END) AS Feb,
        SUM(CASE monthNumber(ncr_date) WHEN 3 THEN 1 ELSE 0 END) AS Mar,
        SUM(CASE monthNumber(ncr_date) WHEN 4 THEN 1 ELSE 0 END) AS Apr,
        SUM(CASE monthNumber(ncr_date) WHEN 5 THEN 1 ELSE 0 END) AS May,
        SUM(CASE monthNumber(ncr_date) WHEN 6 THEN 1 ELSE 0 END) AS Jun,
        SUM(CASE monthNumber(ncr_date) WHEN 7 THEN 1 ELSE 0 END) AS Jul,
        SUM(CASE monthNumber(ncr_date) WHEN 8 THEN 1 ELSE 0 END) AS Aug,
        SUM(CASE monthNumber(ncr_date) WHEN 9 THEN 1 ELSE 0 END) AS Sep,
        SUM(CASE monthNumber(ncr_date) WHEN 10 THEN 1 ELSE 0 END) AS Oct,
        SUM(CASE monthNumber(ncr_date) WHEN 11 THEN 1 ELSE 0 END) AS Nov,
        SUM(CASE monthNumber(ncr_date) WHEN 12 THEN 1 ELSE 0 END) AS Dec
      FROM ? allRecords ORDER BY monthNumber(ncr_date)`,
        [allRecords]
      );
      setNcrByMonth(results[0]);
    }
  }, [allRecords]);

  useEffect(() => {
    if (allRecords.length && departments.length) {
      var results = alasql(
        `SELECT departments.name, count(allRecords.id) as ncrs
      FROM ? allRecords
      RIGHT JOIN ? departments on allRecords.department_id=departments.id
      Group by departments.id, departments.name`,
        [allRecords, departments]
      );
      setNcrByDepartment(results);
    }
  }, [allRecords, departments]);

  useEffect(() => {
    if (allRecords.length && statuses.length) {
      var results = alasql(
        `SELECT statuses.name, count(allRecords.id) as ncrs
      FROM ? allRecords
      RIGHT JOIN ? statuses on allRecords.status_id=statuses.id
      Group by statuses.id, statuses.name`,
        [allRecords, statuses]
      );
      setNcrByStatus(results);
    }
  }, [allRecords, statuses]);

  useEffect(() => {
    if (allRecords.length) {
      alasql.fn.monthNumber = function (date) {
        return moment(date).format("M");
      };
      var closedResults = alasql(
        `SELECT 
        SUM(CASE monthNumber(ncr_date) WHEN 1 THEN 1 ELSE 0 END) AS Jan,
        SUM(CASE monthNumber(ncr_date) WHEN 2 THEN 1 ELSE 0 END) AS Feb,
        SUM(CASE monthNumber(ncr_date) WHEN 3 THEN 1 ELSE 0 END) AS Mar,
        SUM(CASE monthNumber(ncr_date) WHEN 4 THEN 1 ELSE 0 END) AS Apr,
        SUM(CASE monthNumber(ncr_date) WHEN 5 THEN 1 ELSE 0 END) AS May,
        SUM(CASE monthNumber(ncr_date) WHEN 6 THEN 1 ELSE 0 END) AS Jun,
        SUM(CASE monthNumber(ncr_date) WHEN 7 THEN 1 ELSE 0 END) AS Jul,
        SUM(CASE monthNumber(ncr_date) WHEN 8 THEN 1 ELSE 0 END) AS Aug,
        SUM(CASE monthNumber(ncr_date) WHEN 9 THEN 1 ELSE 0 END) AS Sep,
        SUM(CASE monthNumber(ncr_date) WHEN 10 THEN 1 ELSE 0 END) AS Oct,
        SUM(CASE monthNumber(ncr_date) WHEN 11 THEN 1 ELSE 0 END) AS Nov,
        SUM(CASE monthNumber(ncr_date) WHEN 12 THEN 1 ELSE 0 END) AS Dec
      FROM ? allRecords WHERE status_id = 6 ORDER BY monthNumber(ncr_date)`,
        [allRecords]
      );

      closedResults = closedResults[0];
      var notClosedResults = alasql(
        `SELECT 
        SUM(CASE monthNumber(ncr_date) WHEN 1 THEN 1 ELSE 0 END) AS Jan,
        SUM(CASE monthNumber(ncr_date) WHEN 2 THEN 1 ELSE 0 END) AS Feb,
        SUM(CASE monthNumber(ncr_date) WHEN 3 THEN 1 ELSE 0 END) AS Mar,
        SUM(CASE monthNumber(ncr_date) WHEN 4 THEN 1 ELSE 0 END) AS Apr,
        SUM(CASE monthNumber(ncr_date) WHEN 5 THEN 1 ELSE 0 END) AS May,
        SUM(CASE monthNumber(ncr_date) WHEN 6 THEN 1 ELSE 0 END) AS Jun,
        SUM(CASE monthNumber(ncr_date) WHEN 7 THEN 1 ELSE 0 END) AS Jul,
        SUM(CASE monthNumber(ncr_date) WHEN 8 THEN 1 ELSE 0 END) AS Aug,
        SUM(CASE monthNumber(ncr_date) WHEN 9 THEN 1 ELSE 0 END) AS Sep,
        SUM(CASE monthNumber(ncr_date) WHEN 10 THEN 1 ELSE 0 END) AS Oct,
        SUM(CASE monthNumber(ncr_date) WHEN 11 THEN 1 ELSE 0 END) AS Nov,
        SUM(CASE monthNumber(ncr_date) WHEN 12 THEN 1 ELSE 0 END) AS Dec
      FROM ? allRecords WHERE status_id != 6 ORDER BY monthNumber(ncr_date)`,
        [allRecords]
      );
      notClosedResults = notClosedResults[0];
      let data = [];
      Object.keys(closedResults).forEach((key) => {
        data.push({
          month: key,
          closedNcrs: closedResults[key],
          notClosedNcrs: notClosedResults[key],
        });
      });
      setNcrByStatusAndMonth(data);
    }
  }, [allRecords]);

  useEffect(() => {
    if (allRecords.length && userCompanies.length) {
      var results = alasql(
        `SELECT userCompanies.company.name AS name, count(allRecords.id) as ncrs
      FROM ? allRecords
      RIGHT JOIN ? userCompanies on allRecords.company_id=userCompanies.company_id
      Group by userCompanies.company.name`,
        [allRecords, userCompanies]
      );
      setNcrByCompany(results);
    }
  }, [allRecords, userCompanies]);

  useEffect(() => {
    if (allRecords.length && allActionPlans.length && profile) {
      var pendingCreatorResults = alasql(
        `SELECT COUNT(r.id) AS ncrs FROM ? AS r
        WHERE status_id = 5 AND r.user_id = ${profile.id}
        GROUP BY r.id`,
        [allRecords]
      );

      var pendingOwnerResults = alasql(
        `SELECT COUNT(r.id) AS ncrs FROM ? AS r
        WHERE status_id IN (1, 4, 7) AND r.owner_id =  ${profile.id}
        GROUP BY r.id
        `,
        [allRecords]
      );
      var pendingActionPlanResults = alasql(
        `SELECT COUNT(r.id) AS ncrs FROM ? AS r
        JOIN ? AS p ON r.id = p.ncr_record_id
        WHERE p.responsible_user_id = ${profile.id} AND p.status = 'OPEN'
        GROUP BY r.id`,
        [allRecords, allActionPlans]
      );

      let pendingRecords = [];

      let pendingOwner = {
        title: "Pending As NCR Creator",
        ncrs:
          pendingCreatorResults && pendingCreatorResults.length
            ? pendingCreatorResults[0].ncrs
            : 0,
        type: "CREATOR",
      };

      pendingRecords.push(pendingOwner);

      let pendingResponsiblePerson = {
        title: "Pending As NCR Owner",
        ncrs:
          pendingOwnerResults && pendingOwnerResults.length
            ? pendingOwnerResults[0].ncrs
            : 0,
        type: "OWNER",
      };

      pendingRecords.push(pendingResponsiblePerson);

      let pendingCreator = {
        title: "Pending As Action Responsible person",
        ncrs:
          pendingActionPlanResults && pendingActionPlanResults.length
            ? pendingActionPlanResults[0].ncrs
            : 0,
        type: "RESPONSIBLE_PERSON",
      };

      pendingRecords.push(pendingCreator);
      setPendingActionRecordsNumbers(pendingRecords);
    }
  }, [allRecords, allActionPlans, profile]);

  useEffect(() => {
    if (ncrByMonth) {
      let categories = [];
      let data = [];
      Object.keys(ncrByMonth).forEach((key) => {
        categories.push(key);
        data.push(ncrByMonth[key]);
      });
      setNcrByMonthCategories(categories);
      setNcrByMonthData(data);
    }
  }, [ncrByMonth]);

  useEffect(() => {
    if (ncrByDepartment.length) {
      let categories = [];
      let data = [];
      ncrByDepartment.forEach((element) => {
        categories.push(element["name"]);
        data.push(element["ncrs"]);
      });
      setNcrByDepartmentCategories(categories);
      setNcrByDepartmentData(data);
    }
  }, [ncrByDepartment]);

  useEffect(() => {
    if (ncrByStatus.length) {
      let categories = [];
      let data = [];
      ncrByStatus.forEach((element) => {
        categories.push(element["name"]);
        data.push({
          name: element["name"],
          y: element["ncrs"],
          // sliced: true,
          // selected: true,
        });
      });
      setNcrByStatusCategories(categories);
      setNcrByStatusData(data);
    }
  }, [ncrByStatus]);

  useEffect(() => {
    if (ncrByStatusAndMonth.length) {
      let categories = [];
      let closedData = [];
      let notClosedData = [];
      ncrByStatusAndMonth.forEach((element) => {
        categories.push(element["month"]);
        closedData.push(element["closedNcrs"]);
        notClosedData.push(element["notClosedNcrs"]);
      });
      setNcrByStatusAndMonthCategories(categories);
      setNcrByClosedStatusAndMonthData(closedData);
      setNcrByNotClosedStatusAndMonthData(notClosedData);
    }
  }, [ncrByStatusAndMonth]);

  useEffect(() => {
    if (ncrByCompany.length) {
      let categories = [];
      let data = [];
      ncrByCompany.forEach((element) => {
        categories.push(element["name"]);
        data.push(element["ncrs"]);
      });
      setNcrByCompanyCategories(categories);
      setNcrByCompanyData(data);
    }
  }, [ncrByCompany]);

  const getPendingDrillDownRecords = (pendingType) => {
    let results = [];
    switch (pendingType) {
      case "CREATOR":
        results = alasql(
          `SELECT * FROM ? AS r
          WHERE r.status_id = 5 AND r.user_id = ${profile.id}`,
          [allRecords]
        );
        break;
      case "OWNER":
        results = alasql(
          `SELECT * FROM ? AS r
          WHERE r.status_id IN (1, 4, 7) AND r.owner_id =  ${profile.id}
          `,
          [allRecords]
        );
        break;
      case "RESPONSIBLE_PERSON":
        results = alasql(
          `SELECT r.* FROM ? AS r
          JOIN ? AS p ON r.id = p.ncr_record_id
          WHERE p.responsible_user_id = ${profile.id} AND p.status = 'OPEN'`,
          [allRecords, allActionPlans]
        );
        break;
      default:
        break;
    }
    setDrillDownModalName(
      `NCRs Which Required Your Action As (${pendingType})`
    );
    setDrillDownRecords(results);
    setRecordsModalVisible(true);
  };

  const ncrByMonthsOptions = {
    chart: {
      type: "column",
      height: 500,
    },
    title: {
      text: `NCRs created by month (${moment().year()})`,
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      categories: ncrByMonthCategories,
      title: {
        text: null,
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Number of Ncrs",
        align: "high",
      },
      labels: {
        overflow: "justify",
      },
    },
    tooltip: {
      valueSuffix: " NCR",
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
        },
      },
      series: {
        cursor: "pointer",
        dataLabels: {
          enabled: true,
        },
        point: {
          events: {
            click: function (e) {
              const monthName = e.point.category;
              const results = allRecords.filter((record) => {
                return moment(record.ncr_date).format("MMM") === monthName;
              });
              setDrillDownModalName(`NCR Records By Month(${monthName})`);
              setDrillDownRecords(results);
              setRecordsModalVisible(true);
              // alasql.fn.alasqlMonthName = function (date) {
              //   console.log(moment(date).format("MMM"));
              //   return moment(date).format("MMM");
              //   // return moment(date).format(dateFormat);
              // };
              // var results = alasql(
              //   // `SELECT * FROM ? allRecords WHERE alasqlMonthName(allRecords.ncr_date) = Mar`,
              //   `SELECT alasqlMonthName(allRecords.ncr_date) AS mName FROM ? allRecords`,
              //   [allRecords]
              // );
              // console.log(results);
              // setRecordsModalVisible(true);
            },
          },
        },
      },
    },
    series: [
      {
        name: "Months",
        data: ncrByMonthData,
      },
    ],
  };

  const ncrByDeptsOptions = {
    chart: {
      type: "bar",
      height: 500,
    },
    title: {
      text: "NCRs by Department",
    },
    credits: {
      enabled: false,
    },
    colors: ["#f15c80"],
    xAxis: {
      categories: ncrByDepartmentCategories,
      title: {
        text: null,
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Departments",
        align: "high",
      },
      labels: {
        overflow: "justify",
      },
    },
    tooltip: {
      valueSuffix: " NCR",
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
        },
      },
      series: {
        cursor: "pointer",
        dataLabels: {
          enabled: true,
        },
        point: {
          events: {
            click: function (e) {
              const departmentName = e.point.category;
              const department = departments.find(
                (department) => department.name === departmentName
              );
              var results = alasql(
                `SELECT * FROM ? allRecords WHERE allRecords.department_id === ${department.id}`,
                [allRecords]
              );
              setDrillDownModalName(
                `NCR Records By Department(${departmentName})`
              );
              setDrillDownRecords(results);
              setRecordsModalVisible(true);
            },
          },
        },
      },
    },
    series: [
      {
        name: "Department",
        data: ncrByDepartmentData,
      },
    ],
  };

  const ncrByStatusOptions = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
    },
    title: {
      text: "NCR By Status",
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
        },
      },
      series: {
        cursor: "pointer",
        point: {
          events: {
            click: function (e) {
              const statusName = e.point.name;
              const status = statuses.find(
                (status) => status.name === statusName
              );
              var results = alasql(
                `SELECT * FROM ? allRecords WHERE allRecords.status_id = ${status.id}`,
                [allRecords]
              );
              setDrillDownModalName(`NCR Records By Status(${statusName})`);
              setDrillDownRecords(results);
              setRecordsModalVisible(true);
            },
          },
        },
      },
    },
    series: [
      {
        name: "NCR",
        colorByPoint: true,
        data: ncrByStatusData,
      },
    ],
  };

  const numberOfNcrsForMonth = {
    chart: {
      type: "column",
    },
    title: {
      text: "No. of NCRs Due For close by month",
    },
    credits: {
      enabled: false,
    },
    colors: ["#fc8462", "#21a366"],
    xAxis: {
      categories: ncrByStatusAndMonthCategories,
      title: {
        text: null,
      },
    },
    yAxis: {
      allowDecimals: false,
      min: 0,
      title: {
        text: "Number of NCRs",
      },
    },
    tooltip: {
      formatter: function () {
        return (
          "<b>" +
          this.x +
          "</b><br/>" +
          this.series.name +
          ": " +
          this.y +
          "<br/>" +
          "Total: " +
          this.point.stackTotal
        );
      },
    },
    plotOptions: {
      column: {
        stacking: "normal",
      },
      series: {
        cursor: "pointer",
        dataLabels: {
          enabled: true,
        },
        point: {
          events: {
            click: function (e) {
              const monthName = e.point.category;
              const barStatusName = e.point.series.name;
              const results = allRecords.filter((record) => {
                return barStatusName === "Closed"
                  ? record.status_id === 6
                  : record.status_id !== 6 &&
                      moment(record.ncr_date).format("MMM") === monthName;
              });
              setDrillDownModalName(
                `NCR Records By Month & Status(${monthName} - ${barStatusName})`
              );
              setDrillDownRecords(results);
              setRecordsModalVisible(true);
            },
          },
        },
      },
    },
    series: [
      {
        name: "Not Closed",
        data: ncrByNotClosedStatusAndMonthData,
        stack: "NCRS",
      },
      {
        name: "Closed",
        data: ncrByClosedStatusAndMonthData,
        stack: "NCRS",
      },
    ],
  };

  const ncrByBusiness = {
    chart: {
      type: "column",
    },
    title: {
      text: "NCRs created by Business Unit",
    },
    credits: {
      enabled: false,
    },
    colors: ["#674a98"],
    xAxis: {
      categories: ncrByCompanyCategories,
      title: {
        text: null,
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Number of Ncrs Created",
        align: "high",
      },
      labels: {
        overflow: "justify",
      },
    },
    tooltip: {
      valueSuffix: " NCR",
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
        },
      },
      series: {
        cursor: "pointer",
        dataLabels: {
          enabled: true,
        },
        point: {
          events: {
            click: function (e) {
              const companyName = e.point.category;
              const userCompany = userCompanies.find(
                (userCompany) => userCompany.company.name === companyName
              );
              var results = alasql(
                `SELECT * FROM ? allRecords WHERE allRecords.company_id === ${userCompany.company_id}`,
                [allRecords]
              );
              setDrillDownModalName(`NCR Records By Company(${companyName})`);
              setDrillDownRecords(results);
              setRecordsModalVisible(true);
            },
          },
        },
      },
    },
    series: [
      {
        name: "Business Unit",
        data: ncrByCompanyData,
      },
    ],
  };

  const pendingActionsColumns = [
    {
      title: "Title",
      dataIndex: "title",
      render: (text, row) => {
        return (
          <>
            <Button
              type="link"
              onClick={() => {
                getPendingDrillDownRecords(row.type);
              }}
            >
              {row.title}
            </Button>
          </>
        );
      },
    },
    {
      title: "No. of NCRs",
      dataIndex: "ncrs",
    },
  ];

  const columns = [
    {
      title: "Sr#",
      dataIndex: "id",
      width: 100,
      fixed: "left",
      // sorter: (a, b) => a.id - b.id,
      // defaultSortOrder: "descend",
    },
    {
      title: "NCR no",
      dataIndex: "ncr_number",
      width: 100,
    },
    {
      title: "Description",
      dataIndex: "description",
      width: 300,
      defaultSortOrder: "descend",
    },
    {
      title: "NCR Owner",
      dataIndex: "ncr_owner",
      width: 150,
      defaultSortOrder: "descend",
      render: (text, row) => {
        return <>{row.owner ? row.owner.name : ""}</>;
      },
    },
    {
      title: "NCR Owner Designation",
      dataIndex: "ncr_owner_designation",
      width: 100,
      defaultSortOrder: "descend",
      render: (text, row) => {
        return <>{row.owner ? row.owner.designation : ""}</>;
      },
    },
    {
      title: "NCR Owner Department",
      dataIndex: "ncr_owner_department",
      width: 100,
      defaultSortOrder: "descend",
      render: (text, row) => {
        return <>{row.owner ? row.owner.department : ""}</>;
      },
    },
    {
      title: "Supplier",
      dataIndex: "supplier",
      width: 150,
    },
    {
      title: "Category",
      dataIndex: "category",
      width: 150,
      defaultSortOrder: "descend",
      render: (text, row) => {
        return <>{row.category.name}</>;
      },
    },
    {
      title: "NCR Date",
      dataIndex: "ncr_date",
      width: 150,
      defaultSortOrder: "descend",
      render: (ncr_date) => {
        return moment(ncr_date).format(dateFormat);
      },
    },
    {
      title: "NC Type",
      dataIndex: "nc_type_id",
      width: 100,
      defaultSortOrder: "descend",
      render: (text, row) => {
        return <>{row.ncType ? row.ncType.name : ""}</>;
      },
    },
    {
      title: "Management System",
      dataIndex: "management_system_id",
      width: 100,
      defaultSortOrder: "descend",
      render: (text, row) => {
        return <>{row.managementSystem ? row.managementSystem.name : ""}</>;
      },
    },
    {
      title: "NCR Source",
      dataIndex: "ncr_source",
      width: 100,
      defaultSortOrder: "descend",
      render: (text, row) => {
        return <>{row.source.name}</>;
      },
    },
    {
      title: "Verification of Effectiveness",
      dataIndex: "verification_effectiveness",
      width: 170,
      defaultSortOrder: "descend",
      render: (text, row) => {
        let displayText = "";
        if (row.verification_effectiveness == true) {
          displayText = "Satisfactory";
        } else if (row.verification_effectiveness == false) {
          displayText = "Not Satisfactory";
        } else {
          displayText = "N/A";
        }
        return <>{displayText}</>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 180,
      fixed: "right",
      defaultSortOrder: "descend",
      render: (text, row) => {
        let color = "geekblue";
        return (
          <>
            <Tag color={color} key={row.id}>
              {row.status.name}
            </Tag>
          </>
        );
      },
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (text, row) => (
        <Link to={`/ncr/records/edit/${row.id}`} target="_blank">
          Details
        </Link>
      ),
    },
  ];

  return (
    <>
      <div className="dashboard-content">
        <Row>
          <Col span={12} style={{ padding: "0px 4px 8px 0px" }}>
            <HighchartsReact
              highcharts={Highcharts}
              options={ncrByMonthsOptions}
            />
          </Col>
          <Col span={12} style={{ padding: "0px 0px 8px 4px" }}>
            <HighchartsReact
              highcharts={Highcharts}
              options={ncrByDeptsOptions}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12} style={{ padding: "0px 4px 8px 0px" }}>
            <HighchartsReact
              highcharts={Highcharts}
              options={ncrByStatusOptions}
            />
          </Col>
          <Col span={12} style={{ padding: "0px 0px 8px 4px" }}>
            <HighchartsReact
              highcharts={Highcharts}
              options={numberOfNcrsForMonth}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12} style={{ padding: "0px 4px 8px 0px" }}>
            <HighchartsReact highcharts={Highcharts} options={ncrByBusiness} />
          </Col>
          <Col span={12} style={{ padding: "0px 0px 8px 4px" }}>
            <Card>
              <Title level={5}>Pending Action NCRs</Title>
              <MyTable
                columns={pendingActionsColumns}
                dataSource={pendingActionRecordsNumbers}
                bordered
                rowKey="id"
                size="middle"
                scroll={{ y: "calc(355px)" }}
                // loading={{
                //   indicator: (
                //     <div>
                //       <Spin />
                //     </div>
                //   ),
                //   spinning: profileLoading,
                //   // || surveyRatingByAspectAndYearLoading,
                // }}
                pagination={false}
              />
            </Card>
          </Col>
        </Row>

        <Modal
          title={drillDownModalName}
          centered
          visible={recordsModalVisible}
          onOk={() => setRecordsModalVisible(false)}
          onCancel={() => setRecordsModalVisible(false)}
          width={1300}
        >
          <Table
            columns={columns}
            dataSource={drillDownRecords ? drillDownRecords : []}
            bordered
            rowKey="id"
            size="middle"
            scroll={{ x: "calc(700px + 50%)" }}
            pagination={false}
          />
        </Modal>
      </div>
    </>
  );
};

export default NcrDashboard;
