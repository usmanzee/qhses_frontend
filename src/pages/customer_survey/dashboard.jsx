import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Table,
  Form,
  Input,
  Select,
  DatePicker,
  Modal,
  Button,
  Spin,
  Tag,
  Typography,
  Divider,
  Drawer,
} from "antd";
import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import drilldown from "highcharts/modules/drilldown";
import {
  getYearsAction,
  getSurveyRatingByAspectAndYearAction,
  getSurveyRatingByCompanyAndYearAction,
  getCompaniesAction,
  getAspectsAction,
  getAllSurveysDataAction,
  getUsersAction,
} from "../../redux/actions";
import * as alasql from "alasql";
import { PageLoader } from "../../components";

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
    height: 400px;
  }
`;

const CustomerSurveyDashboard = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [filterForm] = Form.useForm();

  const [selectedYearIds, setSelectedYearIds] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);

  const [surveys, setSurveys] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [surveyUsers, setSurveyUsers] = useState([]);
  const [surveyFeedbacks, setSurveyFeedbacks] = useState([]);
  const [surveyFeedbackAnswers, setSurveyFeedbackAnswers] = useState([]);

  const [aspectColumns, setAspectColumns] = useState([
    {
      title: "Functions / Aspects",
      dataIndex: "aspect",
      width: 200,
    },
  ]);
  const [companyColumns, setCompanyColumns] = useState([
    {
      title: "Company",
      dataIndex: "companyName",
      width: 200,
    },
  ]);

  const [surveyRatingByCompanyAndYear, setSurveyRatingByCompanyAndYear] =
    useState([]);

  const [surveyRatingByAspectAndYear, setSurveyRatingByAspectAndYear] =
    useState([]);

  const [
    surveyRatingByCompanyAndYearCategories,
    setSurveyRatingByCompanyAndYearCategories,
  ] = useState([]);

  const [
    surveyRatingByCompanyAndYearSeries,
    setSurveyRatingByCompanyAndYearSeries,
  ] = useState([]);

  const [
    surveyRatingByCompanyAndYearTableData,
    setSurveyRatingByCompanyAndYearTableData,
  ] = useState([]);

  const [
    surveyRatingByAspectAndYearCategories,
    setSurveyRatingByAspectAndYearCategories,
  ] = useState([]);

  const [
    surveyRatingByAspectAndYearSeries,
    setSurveyRatingByAspectAndYearSeries,
  ] = useState([]);

  const [
    surveyRatingByAspectAndYearTableData,
    setSurveyRatingByAspectAndYearTableData,
  ] = useState([]);

  const [drillDownDrawerVisible, setDrillDownDrawerVisible] = useState(false);

  const [selectedDrillDownYear, setSelectedDrillDownYear] = useState({});
  const [selectedDrillDownCompany, setSelectedDrillDownCompany] = useState({});
  const [selectedDrillDownAspect, setSelectedDrillDownAspect] = useState({});

  const [drillDownCategories, setDrillDownCategories] = useState([]);
  const [drillDownData, setDrillDownData] = useState([]);
  const [drillDownTitle, setDrillDownTitle] = useState("");
  const [drillDownSeriesTitle, setDrillDownSeriesTitle] = useState("");
  const [drillDownGraphType, setDrillDownGraphType] = useState("");
  const [surveyFeedbackModalVisible, setSurveyFeedbackModalVisible] =
    useState(false);
  const [surveyFeedbackModalData, setSurveyFeedbackModalData] = useState([]);
  const [surveyFeedbackModalTitle, setSurveyFeedbackModalTitle] = useState("");

  const profileLoading = useSelector((state) => state.profile.loading);
  const profile = useSelector((state) => state.profile.data);

  const usersLoading = useSelector((state) => state.users.loading);
  const users = useSelector((state) => state.users.list);

  const yearsLoading = useSelector((state) => state.years.loading);
  const years = useSelector((state) => state.years.list);

  // const surveyRatingByCompanyAndYearLoading = useSelector(
  //   (state) => state.surveyRatingByCompanyAndYear.loading
  // );
  // const surveyRatingByCompanyAndYear = useSelector(
  //   (state) => state.surveyRatingByCompanyAndYear.list
  // );

  // const surveyRatingByAspectAndYearLoading = useSelector(
  //   (state) => state.surveyRatingByAspectAndYear.loading
  // );

  // const surveyRatingByAspectAndYear = useSelector(
  //   (state) => state.surveyRatingByAspectAndYear.list
  // );

  const companiesLoading = useSelector((state) => state.companies.loading);
  const companies = useSelector((state) => state.companies.list);

  const aspectsLoading = useSelector((state) => state.aspects.loading);
  const aspects = useSelector((state) => state.aspects.list);

  const allSurveysDataLoading = useSelector(
    (state) => state.allSurveysData.loading
  );
  const allSurveysData = useSelector((state) => state.allSurveysData.data);

  useEffect(() => {
    dispatch(getUsersAction(history, true));
    dispatch(getYearsAction(history));
    dispatch(getCompaniesAction(history));
    dispatch(getAspectsAction(history));
    dispatch(getAllSurveysDataAction(history));
  }, []);

  useEffect(() => {
    if (years && years.length && selectedYearIds.length === 0) {
      setSelectedYearIds((prevIds) => [...prevIds, years[0].id, years[1].id]);
      setSelectedYears((prevYears) => [...prevYears, years[0], years[1]]);
    }
  }, [years]);

  useEffect(() => {
    if (allSurveysData && allSurveysData.surveys) {
      setSurveys(allSurveysData.surveys);
    }
  }, [allSurveysData]);

  useEffect(() => {
    if (allSurveysData && allSurveysData.questions) {
      setQuestions(allSurveysData.questions);
    }
  }, [allSurveysData]);

  useEffect(() => {
    if (allSurveysData && allSurveysData.surveyUsers) {
      setSurveyUsers(allSurveysData.surveyUsers);
    }
  }, [allSurveysData]);
  useEffect(() => {
    if (allSurveysData && allSurveysData.surveyFeedbacks) {
      setSurveyFeedbacks(allSurveysData.surveyFeedbacks);
    }
  }, [allSurveysData]);
  useEffect(() => {
    if (allSurveysData && allSurveysData.surveyFeedbackAnswers) {
      setSurveyFeedbackAnswers(allSurveysData.surveyFeedbackAnswers);
    }
  }, [allSurveysData]);

  // useEffect(() => {
  //   if (selectedYearIds) {
  //     dispatch(
  //       getSurveyRatingByAspectAndYearAction(
  //         { yearIds: selectedYearIds },
  //         history
  //       )
  //     );
  //     dispatch(
  //       getSurveyRatingByCompanyAndYearAction(
  //         { yearIds: selectedYearIds },
  //         history
  //       )
  //     );
  //   }
  // }, [selectedYearIds]);
  useEffect(() => {
    if (
      selectedYearIds &&
      selectedYearIds.length &&
      surveys &&
      questions &&
      surveyUsers &&
      surveyFeedbacks &&
      surveyFeedbackAnswers &&
      companies
    ) {
      getSurveyRatingByCompanyAndYear();
    }
  }, [
    selectedYearIds,
    surveys,
    questions,
    surveyUsers,
    surveyFeedbacks,
    surveyFeedbackAnswers,
    companies,
  ]);

  useEffect(() => {
    if (
      selectedYearIds &&
      selectedYearIds.length &&
      surveys &&
      questions &&
      surveyUsers &&
      surveyFeedbacks &&
      surveyFeedbackAnswers &&
      aspects
    ) {
      getSurveyRatingByAspectAndYear();
    }
  }, [
    selectedYearIds,
    surveys,
    questions,
    surveyUsers,
    surveyFeedbacks,
    surveyFeedbackAnswers,
    aspects,
  ]);

  const getSurveyRatingByCompanyAndYear = () => {
    const questionTotalRating = 10;
    let data = [];

    selectedYears.forEach((selectedYear) => {
      var results = alasql(
        `SELECT c.id as companyId, c.name as companyName, ROUND(AVG(fa.rating), 2) AS averageRating FROM ? as s
      RIGHT JOIN ? as q ON s.id = q.survey_id
      RIGHT JOIN ? as sf ON s.id = sf.survey_id
      RIGHT JOIN ? as fa ON q.id = fa.survey_question_id AND s.year_id = ${selectedYear.id}
      RIGHT JOIN ? as su ON s.id = su.survey_id AND su.user_id = sf.user_id
      RIGHT JOIN ? as c ON su.company_id = c.id
      GROUP BY c.id, c.name ORDER BY companyId ASC`,
        [
          surveys,
          questions,
          surveyFeedbacks,
          surveyFeedbackAnswers,
          surveyUsers,
          companies,
        ]
      );

      const newRes = results.map((item) => {
        return {
          ...item,
          averageRating: item.averageRating
            ? item.averageRating * questionTotalRating
            : 0,
        };
      });
      data.push({
        year: selectedYear,
        results: newRes,
      });
    });

    setSurveyRatingByCompanyAndYear(data);
  };

  const getSurveyRatingByAspectAndYear = () => {
    let data = [];

    selectedYears.forEach((selectedYear) => {
      var results = alasql(
        `SELECT a.id as aspectId, a.title as aspect, ROUND(AVG(fa.rating), 2) AS averageRating FROM ? as s
        RIGHT JOIN ? as q ON s.id = q.survey_id
        RIGHT JOIN ? as fa ON q.id = fa.survey_question_id AND s.year_id = ${selectedYear.id}
        RIGHT JOIN ? as a ON q.aspect_id = a.id
        GROUP BY a.id, a.title ORDER BY aspectId ASC`,
        [surveys, questions, surveyFeedbackAnswers, aspects]
      );

      const newRes = results.map((item) => {
        return {
          ...item,
          averageRating: item.averageRating ? item.averageRating : 0,
        };
      });
      data.push({
        year: selectedYear,
        results: newRes,
      });
    });
    setSurveyRatingByAspectAndYear(data);
  };

  const getSurveyRatingByCompanyYearAndAspect = (year, aspect) => {
    const questionTotalRating = 10;
    var results = alasql(
      `SELECT c.id as companyId, c.name as companyName, ROUND(AVG(fa.rating), 2) AS averageRating FROM ? as s
    RIGHT JOIN ? as q ON s.id = q.survey_id AND q.aspect_id = ${aspect.id}
    RIGHT JOIN ? as sf ON s.id = sf.survey_id
    RIGHT JOIN ? as fa ON q.id = fa.survey_question_id AND s.year_id = ${year.id}
    RIGHT JOIN ? as su ON s.id = su.survey_id AND su.user_id = sf.user_id
    RIGHT JOIN ? as c ON su.company_id = c.id
    GROUP BY c.id, c.name ORDER BY companyId ASC`,
      [
        surveys,
        questions,
        surveyFeedbacks,
        surveyFeedbackAnswers,
        surveyUsers,
        companies,
      ]
    );
    const newRes = results.map((item) => {
      return {
        ...item,
        averageRating: item.averageRating
          ? item.averageRating * questionTotalRating
          : 0,
      };
    });

    let categories = [];
    let data = [];
    newRes.forEach((item) => {
      categories.push(item.companyName);
      data.push(item.averageRating ? item.averageRating : 0);
    });
    setDrillDownTitle(
      `Overall Performance Rating (%) by Company And Aspect -${year.year}`
    );
    setDrillDownSeriesTitle(aspect.title);
    setDrillDownGraphType("company");
    setDrillDownCategories(categories);
    setDrillDownData(data);
    setDrillDownDrawerVisible(true);
  };

  const getSurveyRatingByAspectYearAndCompany = (year, company) => {
    var results = alasql(
      `SELECT a.id as aspectId, a.title as aspect, ROUND(AVG(fa.rating), 2) AS averageRating FROM ? as s
    RIGHT JOIN ? as q ON s.id = q.survey_id
    RIGHT JOIN ? as sf ON s.id = sf.survey_id
    RIGHT JOIN ? as fa ON q.id = fa.survey_question_id AND s.year_id = ${year.id}
    RIGHT JOIN ? as su ON s.id = su.survey_id AND su.user_id = sf.user_id AND su.company_id = ${company.id}
    RIGHT JOIN ? as a ON q.aspect_id = a.id
    GROUP BY a.id, a.title ORDER BY aspectId ASC`,
      [
        surveys,
        questions,
        surveyFeedbacks,
        surveyFeedbackAnswers,
        surveyUsers,
        aspects,
      ]
    );

    let categories = [];
    let data = [];
    results.forEach((item) => {
      categories.push(item.aspect);
      data.push(item.averageRating ? item.averageRating : 0);
    });
    setDrillDownTitle(
      `Overall Performance Rating (%) by Aspect And Company -${year.year}`
    );
    setDrillDownSeriesTitle(company.name);
    setDrillDownGraphType("aspect");
    setDrillDownCategories(categories);
    setDrillDownData(data);
    setDrillDownDrawerVisible(true);
  };

  useEffect(() => {
    if (selectedYears && selectedYears.length) {
      const newAspectColumns = aspectColumns.filter(
        (column) => column.dynamicColumn !== true
      );
      setAspectColumns(newAspectColumns);

      const newCompanyColumns = companyColumns.filter(
        (column) => column.dynamicColumn !== true
      );
      setCompanyColumns(newCompanyColumns);

      selectedYears.forEach((selectedYear) => {
        setAspectColumns((prevColumns) => [
          ...prevColumns,
          {
            title: selectedYear.year,
            dataIndex: selectedYear.year,
            width: 50,
            dynamicColumn: true,
            yearId: selectedYear.id,
          },
        ]);

        setCompanyColumns((prevColumns) => [
          ...prevColumns,
          {
            title: selectedYear.year,
            dataIndex: selectedYear.year,
            width: 50,
            dynamicColumn: true,
            yearId: selectedYear.id,
          },
        ]);
      });
    }
  }, [selectedYears]);

  useEffect(() => {
    let categories = [];
    let series = [];

    let tableData = [];

    if (surveyRatingByCompanyAndYear.length) {
      setSurveyRatingByCompanyAndYearCategories([]);
      setSurveyRatingByCompanyAndYearSeries([]);
      setSurveyRatingByCompanyAndYearTableData([]);
      surveyRatingByCompanyAndYear.forEach((element) => {
        let seriesData = [];
        element.results.forEach((item) => {
          const categoryExists = categories.find(
            (category) => category === item.companyName
          );
          if (!categoryExists) {
            categories.push(item.companyName);
          }
          seriesData.push(item.averageRating);
          const companyExists = tableData.find(
            (tableItem) => item.companyName === tableItem.companyName
          );
          if (!companyExists) {
            tableData.push({
              // ...(!companyExists && { companyName: item.companyName }),
              companyName: item.companyName,
              [element.year.year]: item.averageRating ? item.averageRating : 0,
            });
          } else {
            const newData = tableData.map((tableDataItem) => {
              return tableDataItem.companyName === companyExists.companyName
                ? {
                    ...tableDataItem,
                    [element.year.year]: item.averageRating
                      ? item.averageRating
                      : 0,
                  }
                : tableDataItem;
            });
            tableData = newData;
          }
        });
        series.push({
          name: element.year.year,
          data: seriesData,
        });
      });
    }

    setSurveyRatingByCompanyAndYearCategories(categories);
    setSurveyRatingByCompanyAndYearSeries(series);
    setSurveyRatingByCompanyAndYearTableData(tableData);
  }, [surveyRatingByCompanyAndYear]);

  useEffect(() => {
    let categories = [];
    let series = [];

    let tableData = [];

    if (surveyRatingByAspectAndYear.length) {
      setSurveyRatingByAspectAndYearCategories([]);
      setSurveyRatingByAspectAndYearSeries([]);
      setSurveyRatingByAspectAndYearTableData([]);
      surveyRatingByAspectAndYear.forEach((element) => {
        let seriesData = [];
        element.results.forEach((item) => {
          const categoryExists = categories.find(
            (category) => category === item.aspect
          );
          if (!categoryExists) {
            categories.push(item.aspect);
          }
          seriesData.push(item.averageRating);

          const aspectExists = tableData.find(
            (tableItem) => item.aspect === tableItem.aspect
          );

          if (!aspectExists) {
            tableData.push({
              // ...(!aspectExists && { aspect: item.aspect }),
              aspect: item.aspect,
              [element.year.year]: item.averageRating ? item.averageRating : 0,
            });
          } else {
            const newData = tableData.map((tableDataItem) => {
              return tableDataItem.aspect === aspectExists.aspect
                ? {
                    ...tableDataItem,
                    [element.year.year]: item.averageRating
                      ? item.averageRating
                      : 0,
                  }
                : tableDataItem;
            });

            tableData = newData;
          }
        });

        series.push({
          name: element.year.year,
          data: seriesData,
        });
      });
    }
    setSurveyRatingByAspectAndYearCategories(categories);
    setSurveyRatingByAspectAndYearSeries(series);
    setSurveyRatingByAspectAndYearTableData(tableData);
  }, [surveyRatingByAspectAndYear]);

  const handleFilterClick = () => {};

  const getSurveyDetailByAspectYearAndCompany = (year, company, aspect) => {
    var results = alasql(
      `SELECT s.id as surveyId, s.title, s.description, u.id AS feedbackByUserId, u.name as feedbackBy, sfa.rating, sfa.remarks, q.question_description, c.name AS companyName, a.title AS aspect, c1.name as feedbackCompany  FROM ? AS sfa
      LEFT JOIN ? as sf ON sfa.survey_feedback_id = sf.id
      LEFT JOIN ? as q ON sfa.survey_question_id = q.id
      LEFT JOIN ? as s ON q.survey_id = s.id
      LEFT JOIN ? as su ON s.id = su.survey_id AND su.user_id = sf.user_id
      LEFT JOIN ? as c ON s.company_id = c.id
      LEFT JOIN ? c1 ON su.company_id = c1.id
      LEFT JOIN ? as a ON q.aspect_id = a.id
      LEFT JOIN ? as u ON sf.user_id = u.id
      WHERE su.company_id = ${company.id} AND s.year_id = ${year.id} AND q.aspect_id = ${aspect.id}`,
      [
        surveyFeedbackAnswers,
        surveyFeedbacks,
        questions,
        surveys,
        surveyUsers,
        companies,
        companies,
        aspects,
        users,
      ]
    );
    setSurveyFeedbackModalTitle(
      `Survey Feedback Detail - ${company.name} - ${aspect.title} - ${year.year}`
    );
    setSurveyFeedbackModalData(results);
    setSurveyFeedbackModalVisible(true);
  };

  const barOptions = {
    chart: {
      type: "column",
    },
    title: {
      text: "Overall Performance Rating by Functions / Aspects",
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      categories: surveyRatingByAspectAndYearCategories,
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Rating",
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} rating</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
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
              const aspectName = e.point.category;
              const yearName = e.point.series.name;
              const year = years.find((year) => year.year === yearName);
              const aspect = aspects.find(
                (aspect) => aspect.title === aspectName
              );
              setSelectedDrillDownYear(year);
              setSelectedDrillDownAspect(aspect);
              getSurveyRatingByCompanyYearAndAspect(year, aspect);
            },
          },
        },
      },
    },
    series: surveyRatingByAspectAndYearSeries,
  };

  const companyBarOptions = {
    chart: {
      type: "column",
    },
    title: {
      text: "Overall Performance Rating (%) by Company",
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      categories: surveyRatingByCompanyAndYearCategories,
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Rating",
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} rating</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
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
              const yearName = e.point.series.name;
              const year = years.find((year) => year.year === yearName);
              const company = companies.find(
                (company) => company.name === companyName
              );
              setSelectedDrillDownYear(year);
              setSelectedDrillDownCompany(company);
              getSurveyRatingByAspectYearAndCompany(year, company);
            },
          },
        },
      },
    },
    series: surveyRatingByCompanyAndYearSeries,
  };

  const drillDownChart = {
    chart: {
      type: "bar",
      height:
        drillDownCategories.length * 35 < 350
          ? 350
          : drillDownCategories.length * 35,
    },
    title: {
      text: `${drillDownTitle}`,
    },
    options: {
      maintainAspectRatio: false,
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      categories: drillDownCategories,
      title: {
        text: null,
      },
      labels: {
        step: 1,
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: `Average`,
        align: "high",
      },
      labels: {
        overflow: "justify",
      },
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
        },
      },
      series: {
        cursor: "pointer",
        point: {
          events: {
            click: (e) => {
              let company = {};
              let aspect = {};
              const year = e.point.series.userOptions.year;
              if (e.point.series.userOptions.graphType === "company") {
                const companyName = e.point.category;
                const searchedCompany = companies.find(
                  (company) => company.name === companyName
                );
                company = searchedCompany;
                aspect = e.point.series.userOptions.aspect;
              } else {
                const aspectName = e.point.category;
                const searchedAspect = aspects.find(
                  (aspect) => aspect.title === aspectName
                );
                aspect = searchedAspect;
                company = e.point.series.userOptions.company;
              }
              getSurveyDetailByAspectYearAndCompany(year, company, aspect);
            },
          },
        },
      },
    },
    series: [
      {
        name: drillDownSeriesTitle,
        data: drillDownData,
        graphType: drillDownGraphType,
        aspect: selectedDrillDownAspect,
        company: selectedDrillDownCompany,
        year: selectedDrillDownYear,
      },
    ],
  };

  const surveyFeedbackModalColumn = [
    {
      title: "Sr#",
      dataIndex: "id",
      width: 100,
      fixed: "left",
      render: (text, row, index) => {
        return <>{index + 1}</>;
      },
    },
    {
      title: "Survey Title",
      dataIndex: "title",
      width: 100,
    },
    {
      title: "Survey Description",
      dataIndex: "title",
      width: 100,
    },
    {
      title: "Survey Company",
      dataIndex: "companyName",
      width: 100,
    },
    {
      title: "Feedback By(User)",
      dataIndex: "feedbackBy",
      width: 100,
      render: (text, row, index) => {
        return (
          <>
            <Link
              to={`/customer-survey/surveys/detail/${row.surveyId}?feedbackUserId=${row.feedbackByUserId}`}
            >
              {row.feedbackBy}
            </Link>
          </>
        );
      },
    },
    {
      title: "Feedback By(Company)",
      dataIndex: "feedbackCompany",
      width: 100,
    },
    {
      title: "Question",
      dataIndex: "question_description",
      width: 200,
    },

    {
      title: "Aspect",
      dataIndex: "aspect",
      width: 100,
    },
    {
      title: "Rating",
      dataIndex: "rating",
      width: 100,
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      width: 100,
    },
  ];

  return (
    <>
      <div>
        {allSurveysDataLoading ? (
          <PageLoader />
        ) : (
          <div className="dashboard-content">
            <Card style={{ marginBottom: "8px" }}>
              <Form
                form={filterForm}
                layout="vertical"
                autoComplete="off"
                fields={[
                  {
                    name: ["year_ids"],
                    value: selectedYearIds,
                  },
                ]}
              >
                <Row gutter={16} style={{ alignItems: "center" }}>
                  <Col span={6} offset={8}>
                    <Form.Item
                      name="year_ids"
                      label="Year"
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: "Please select year",
                      //   },
                      //   {
                      //     validator: (rule, value, callback) => {
                      //       if (value) {
                      //         if (value.length > 2) {
                      //           callback("No more than 2 tags");
                      //         } else if (value.length <= 2) {
                      //           callback();
                      //         }
                      //       }
                      //       return;
                      //     },
                      //   },
                      // ]}
                    >
                      <Select
                        mode="multiple"
                        onChange={(values) => {
                          let sYears = [];
                          values.forEach((value) => {
                            const year = years.find(
                              (year) => year.id === value
                            );
                            sYears.push(year);
                          });
                          setSelectedYearIds(values);
                          setSelectedYears(sYears);
                        }}
                      >
                        {years.map((year) => {
                          return (
                            <Select.Option
                              value={year.id}
                              disabled={
                                selectedYearIds.length >= 3
                                  ? selectedYearIds.includes(year.id)
                                    ? false
                                    : true
                                  : selectedYearIds.length <= 1
                                  ? selectedYearIds.includes(year.id)
                                    ? true
                                    : false
                                  : false
                              }
                            >
                              {year.year}
                            </Select.Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col>
                    <Button
                      type="primary"
                      onClick={() => {
                        handleFilterClick();
                      }}
                    >
                      Filter
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card>

            <Row>
              <Col span={16} style={{ padding: "0px 4px 8px 0px" }}>
                <HighchartsReact highcharts={Highcharts} options={barOptions} />
              </Col>
              <Col span={8} style={{ padding: "0px 0px 8px 4px" }}>
                <MyTable
                  columns={aspectColumns}
                  dataSource={surveyRatingByAspectAndYearTableData}
                  bordered
                  rowKey="id"
                  size="middle"
                  scroll={{ y: "calc(355px)" }}
                  loading={{
                    indicator: (
                      <div>
                        <Spin />
                      </div>
                    ),
                    spinning: profileLoading,
                    // || surveyRatingByAspectAndYearLoading,
                  }}
                  pagination={false}
                />
              </Col>
            </Row>
            <Row>
              <Col span={16} style={{ padding: "0px 4px 8px 0px" }}>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={companyBarOptions}
                />
              </Col>
              <Col span={8} style={{ padding: "0px 0px 8px 4px" }}>
                <MyTable
                  columns={companyColumns}
                  dataSource={surveyRatingByCompanyAndYearTableData}
                  bordered
                  rowKey="id"
                  size="middle"
                  scroll={{ y: "calc(355px)" }}
                  loading={{
                    indicator: (
                      <div>
                        <Spin />
                      </div>
                    ),
                    spinning: profileLoading,
                    // || surveyRatingByCompanyAndYearLoading,
                  }}
                  pagination={false}
                  style={{ height: "400px" }}
                />
              </Col>
            </Row>

            <Drawer
              title=""
              width={720}
              bodyStyle={{ paddingBottom: 80 }}
              placement="right"
              onClose={() => {
                setDrillDownDrawerVisible(false);
              }}
              visible={drillDownDrawerVisible}
            >
              <HighchartsReact
                highcharts={Highcharts}
                options={drillDownChart}
              />
            </Drawer>

            <Modal
              title={surveyFeedbackModalTitle}
              centered
              visible={surveyFeedbackModalVisible}
              onOk={() => setSurveyFeedbackModalVisible(false)}
              onCancel={() => setSurveyFeedbackModalVisible(false)}
              width={1000}
            >
              <Table
                columns={surveyFeedbackModalColumn}
                dataSource={
                  surveyFeedbackModalData ? surveyFeedbackModalData : []
                }
                bordered
                rowKey="id"
                size="middle"
                scroll={{ x: "calc(700px + 50%)" }}
                pagination={false}
              />
            </Modal>
          </div>
        )}
      </div>
    </>
  );
};

export default CustomerSurveyDashboard;
