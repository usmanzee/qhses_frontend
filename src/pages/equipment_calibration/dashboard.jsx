import React, { useState, useEffect } from "react";
import { Card, Row, Col, Modal, Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import drilldown from "highcharts/modules/drilldown";
import * as alasql from "alasql";
import moment from "moment";

import {
  getProfileAction,
  getDueCalibrationsByMonthAction,
  getCalibrationsByFrequencyAction,
  getFrequenciesAction,
  getCalibrationsAllRecordsAction,
} from "../../redux/actions";
import { responsiveArray } from "antd/lib/_util/responsiveObserve";

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

const CalibrationDashboard = () => {
  const dateFormat = "YYYY-MM-DD";
  const dispatch = useDispatch();
  const history = useHistory();

  const [dueCalibrationByMonth, setDueCalibrationByMonth] = useState([]);
  const [dueCalibrationByMonthCategories, setdueCalibrationByMonthCategories] =
    useState([]);
  const [dueCalibrationByMonthData, setdueCalibrationByMonthData] = useState(
    []
  );

  const [calibrationByFrequency, setCalibrationByFrequency] = useState([]);
  const [
    calibrationByFrequencyCategories,
    setCalibrationByFrequencyCategories,
  ] = useState([]);
  const [calibrationByFrequencyData, setCalibrationByFrequencyData] = useState(
    []
  );

  const [recordsModalVisible, setRecordsModalVisible] = useState(false);
  const [drillDownModalName, setDrillDownModalName] = useState(
    "Calibration Records"
  );
  const [drillDownRecords, setDrillDownRecords] = useState([]);

  const profileFetch = useSelector((state) => state.profile.loading);
  const profile = useSelector((state) => state.profile.data);

  const frequenciesLoading = useSelector((state) => state.frequencies.loading);
  const frequencies = useSelector((state) => state.frequencies.list);

  const calibrationAllRecordsLoading = useSelector(
    (state) => state.calibrationAllRecords.loading
  );
  const calibrationAllRecords = useSelector(
    (state) => state.calibrationAllRecords.list
  );

  // const dueCalibrationByMonthFetching = useSelector(
  //   (state) => state.dueCalibrationByMonth.loading
  // );
  // const dueCalibrationByMonth = useSelector(
  //   (state) => state.dueCalibrationByMonth.list
  // );

  // const calibrationByFrequencyFetching = useSelector(
  //   (state) => state.calibrationByFrequency.loading
  // );
  // const calibrationByFrequency = useSelector(
  //   (state) => state.calibrationByFrequency.list
  // );

  useEffect(() => {
    if (!profile) {
      dispatch(getProfileAction(history));
    }
  }, [profile]);

  useEffect(() => {
    dispatch(getFrequenciesAction(history));
    dispatch(getCalibrationsAllRecordsAction(history));
  }, []);

  useEffect(() => {
    if (calibrationAllRecords.length) {
      alasql.fn.monthNumber = function (date) {
        return moment(date).format("M");
      };
      var response = alasql(
        `SELECT 
        SUM(CASE monthNumber(calibration_due_date) WHEN 1 THEN 1 ELSE 0 END) AS Jan,
        SUM(CASE monthNumber(calibration_due_date) WHEN 2 THEN 1 ELSE 0 END) AS Feb,
        SUM(CASE monthNumber(calibration_due_date) WHEN 3 THEN 1 ELSE 0 END) AS Mar,
        SUM(CASE monthNumber(calibration_due_date) WHEN 4 THEN 1 ELSE 0 END) AS Apr,
        SUM(CASE monthNumber(calibration_due_date) WHEN 5 THEN 1 ELSE 0 END) AS May,
        SUM(CASE monthNumber(calibration_due_date) WHEN 6 THEN 1 ELSE 0 END) AS Jun,
        SUM(CASE monthNumber(calibration_due_date) WHEN 7 THEN 1 ELSE 0 END) AS Jul,
        SUM(CASE monthNumber(calibration_due_date) WHEN 8 THEN 1 ELSE 0 END) AS Aug,
        SUM(CASE monthNumber(calibration_due_date) WHEN 9 THEN 1 ELSE 0 END) AS Sep,
        SUM(CASE monthNumber(calibration_due_date) WHEN 10 THEN 1 ELSE 0 END) AS Oct,
        SUM(CASE monthNumber(calibration_due_date) WHEN 11 THEN 1 ELSE 0 END) AS Nov,
        SUM(CASE monthNumber(calibration_due_date) WHEN 12 THEN 1 ELSE 0 END) AS Dec
      FROM ? allRecords ORDER BY monthNumber(calibration_due_date)`,
        [calibrationAllRecords]
      );
      if (response && response.length) {
        let data = [];
        const results = response[0];
        Object.keys(results).forEach((key) => {
          data.push({
            month: key,
            calibrations: results[key],
          });
        });
        setDueCalibrationByMonth(data);
      }
    }
  }, [calibrationAllRecords]);

  useEffect(() => {
    if (calibrationAllRecords.length && frequencies.length) {
      var results = alasql(
        `SELECT b.id, b.name, count(a.id) as calibrations
        FROM ? AS a
        RIGHT JOIN ? AS b on a.calibration_frequency_id=b.id
        Group by calibration_frequency_id, b.name, b.id ORDER BY b.id`,
        [calibrationAllRecords, frequencies]
      );
      setCalibrationByFrequency(results);
    }
  }, [calibrationAllRecords, frequencies]);

  useEffect(() => {
    if (dueCalibrationByMonth.length) {
      let categories = [];
      let data = [];
      dueCalibrationByMonth.forEach((element) => {
        categories.push(element["month"]);
        data.push(element["calibrations"]);
      });
      setdueCalibrationByMonthCategories(categories);
      setdueCalibrationByMonthData(data);
    }
  }, [dueCalibrationByMonth]);

  useEffect(() => {
    if (calibrationByFrequency.length) {
      let categories = [];
      let data = [];
      calibrationByFrequency.forEach((element) => {
        categories.push(element["name"]);
        data.push({
          name: element["name"],
          y: element["calibrations"],
        });
      });
      setCalibrationByFrequencyCategories(categories);
      setCalibrationByFrequencyData(data);
    }
  }, [calibrationByFrequency]);

  const barOptions = {
    chart: {
      type: "column",
    },
    title: {
      text: "Calibrations Due By Month",
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      categories: dueCalibrationByMonthCategories,
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Calibrations",
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} calibrations</b></td></tr>',
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
              const monthName = e.point.category;
              const results = calibrationAllRecords.filter((record) => {
                return (
                  moment(record.calibration_due_date).format("MMM") ===
                  monthName
                );
              });
              setDrillDownModalName(
                `Calibration Records By Month(${monthName})`
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
        name: "Months",
        data: dueCalibrationByMonthData,
      },
    ],
  };

  const pieOption = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
    },
    title: {
      text: "Calibrations By Frequencies",
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
              const frequencyName = e.point.name;
              const frequency = frequencies.find(
                (frequency) => frequency.name === frequencyName
              );
              var results = alasql(
                `SELECT * FROM ? AS c WHERE c.calibration_frequency_id === ${frequency.id}`,
                [calibrationAllRecords]
              );
              setDrillDownModalName(
                `Calibration Records By Frequency(${frequencyName})`
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
        name: "Calibrations",
        colorByPoint: true,
        data: calibrationByFrequencyData,
      },
    ],
  };

  const drillDowncolumns = [
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
  ];
  return (
    <>
      <div className="dashboard-content">
        <Row>
          <Col span={12} style={{ padding: "0px 4px 8px 0px" }}>
            <HighchartsReact highcharts={Highcharts} options={barOptions} />
          </Col>
          <Col span={12} style={{ padding: "0px 0px 8px 4px" }}>
            <HighchartsReact highcharts={Highcharts} options={pieOption} />
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
            columns={drillDowncolumns}
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

export default CalibrationDashboard;
