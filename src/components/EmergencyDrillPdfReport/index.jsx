import React from "react";
import moment from "moment";
import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  Image,
  StyleSheet,
  PDFViewer,
  Font,
} from "@react-pdf/renderer";
import { Button } from "antd";

import aliSonsLogo from "../../assets/images/ali_sons_logo.png";
import robotoBoldFont from "../../assets/fonts/Roboto-Bold.ttf";

Font.register({
  family: "Roboto",
  fonts: [
    {
      src: robotoBoldFont,
      fontWeight: "bold",
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    fontSize: "12px",
    paddingBottom: "28px",
  },
  header: {
    padding: "20px",
    // bordeBottom: "1px solid #333",
  },
  headerAlign: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerImg: {
    height: "50px",
  },
  headerCompanyTitle: {
    margin: 0,
    fontSize: "12px",
  },
  headerCompanyDesc: {
    margin: 0,
    fontSize: "8px",
  },
  documentTitle: {
    fontSize: "14px",
    textAlign: "center",
    fontFamily: "Roboto",
    fontWeight: "bold",
  },
  section: {
    margin: 0,
    padding: "0px 10px",
    flexGrow: 1,
    // height: "calc(100% - 100px)",
  },
  row: {
    border: "0.5px solid black",
    minHeight: "30px",
    display: "flex",
    flexDirection: "row",
    alignContent: "stretch",
    flexWrap: "nowrap",
    alignItems: "stretch",
  },
  col: {
    display: "flex",
    flexDirection: "row",
    // alignItems: "center",
    width: "25%",
    borderLeft: "0.5px solid black",
    padding: "0px 4px 0px 4px",
    fontSize: "10px",
  },

  gridContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  gridItem: {
    width: "50%",
    border: "0.5px solid black",
    padding: "20px",
  },
});

export const EmergencyDrillPdfReport = (props) => {
  const dateFormat = "YYYY-MM-DD";
  const { drillDetail } = props;

  const renderHeader = () => {
    return (
      <>
        <View fixed style={styles.header}>
          <View style={styles.headerAlign}>
            <View>
              <Text style={styles.headerCompanyTitle}>
                Ali & Sons Holding LLC
              </Text>
              <Text style={styles.headerCompanyDesc}>
                Zayed the 1st Street, PO Box 915, Abu Dhabi, U.A.E.
              </Text>
              <Text style={styles.headerCompanyDesc}>
                Tel: +971 2 6723900. Fax: +971 2 6723901. www.ali-sons.com
              </Text>
            </View>
            <View>
              <Image src={aliSonsLogo} style={styles.headerImg} />
            </View>
          </View>
          <Text style={styles.documentTitle}>EMERGENCY DRILL REPORT</Text>
        </View>
      </>
    );
  };

  const renderFooter = () => {
    return (
      <>
        <View
          fixed
          style={{
            marginTop: "100px",
            borderTop: "1px solid #333",
            left: 0,
            right: 0,
            position: "absolute",
            bottom: 10,
            width: "100%",
            padding: "5px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: "6px" }}>
            {drillDetail && drillDetail.audit_number}
          </Text>
        </View>
      </>
    );
  };

  const renderDivider = () => {
    return (
      <>
        <View
          style={{
            ...styles.row,
            minHeight: "15px",
            backgroundColor: "#EBEBEB",
          }}
        >
          <View style={{ ...styles.col, width: "100%" }}></View>
        </View>
      </>
    );
  };

  const renderDrillHighlights = (highlight) => {
    return (
      <>
        <View style={{ ...styles.row, minHeight: "15px" }}>
          <View
            style={{
              ...styles.col,
              width: "70%",
              borderLeft: "none",
            }}
          >
            <Text>{highlight.event}</Text>
          </View>
          <View style={{ ...styles.col, width: "30%" }}>
            <Text>{moment(highlight.time).format("hh:mm A")}</Text>
          </View>
        </View>
      </>
    );
  };

  const MyDocument = () => {
    return (
      <>
        <Document>
          <Page
            size="A4"
            orientation="vertical"
            style={{ ...styles.page }}
            wrap={false}
          >
            {renderHeader()}
            <View style={{ ...styles.section }}>
              {renderDivider()}
              <View style={{ ...styles.row, minHeight: "30px" }}>
                <View style={{ ...styles.col, width: "25%" }}>
                  <View style={{ display: "flex", flexDirection: "column" }}>
                    <Text style={{ fontFamily: "Roboto", fontWeight: "bold" }}>
                      Drill No:
                    </Text>
                    <Text>{drillDetail && drillDetail.drill_number}</Text>
                  </View>
                </View>
                <View style={{ ...styles.col, width: "25%" }}>
                  <View style={{ display: "flex", flexDirection: "column" }}>
                    <Text style={{ fontFamily: "Roboto", fontWeight: "bold" }}>
                      Facility / Location:
                    </Text>
                    <Text>
                      {drillDetail &&
                        drillDetail.locations &&
                        drillDetail.locations.map(
                          (location) => `${location.name}\n`
                        )}
                    </Text>
                  </View>
                </View>
                <View style={{ ...styles.col, width: "25%" }}>
                  <View style={{ display: "flex", flexDirection: "column" }}>
                    <Text style={{ fontFamily: "Roboto", fontWeight: "bold" }}>
                      Drill Type:
                    </Text>
                    <Text>
                      {drillDetail &&
                        drillDetail.type &&
                        `${drillDetail.type.name}`}
                    </Text>
                  </View>
                </View>
                <View style={{ ...styles.col, width: "25%" }}>
                  <View style={{ display: "flex", flexDirection: "column" }}>
                    <Text style={{ fontFamily: "Roboto", fontWeight: "bold" }}>
                      Date & Time:
                    </Text>
                    <Text>
                      {drillDetail &&
                        `${moment(drillDetail.shift_date_time).format(
                          "YYYY-MM-DD hh:mm A"
                        )}`}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ ...styles.row, minHeight: "15px" }}>
                <View style={{ ...styles.col, width: "50%" }}>
                  <Text>
                    Total Shift Employees Respond:{" "}
                    {drillDetail &&
                      drillDetail.attendenceEmployees &&
                      drillDetail.attendenceEmployees.reduce(
                        (val, itm) => val + 1,
                        0
                      )}
                  </Text>
                </View>
                <View style={{ ...styles.col, width: "50%" }}>
                  <Text>
                    Persons Out of Office:{" "}
                    {drillDetail &&
                      drillDetail.attendenceEmployees &&
                      drillDetail.attendenceEmployees.reduce(
                        (val, itm) => (itm.out_of_office ? val + 1 : val + 0),
                        0
                      )}
                  </Text>
                </View>
              </View>
              <View style={{ ...styles.row, minHeight: "50px" }}>
                <View
                  style={{
                    ...styles.col,
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      padding: "4px 0px",
                    }}
                  >
                    <Text style={{ fontFamily: "Roboto", fontWeight: "bold" }}>
                      Drill Purpose:
                      {`\n`}
                    </Text>
                    <Text>
                      {drillDetail && drillDetail.purpose
                        ? drillDetail.purpose
                        : "N/A"}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      padding: "4px 0px",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Roboto",
                        fontWeight: "bold",
                      }}
                    >
                      Drill Scenario:
                      {`\n`}
                    </Text>
                    <Text>
                      {drillDetail && drillDetail.drill_scenarios
                        ? drillDetail.drill_scenarios
                        : "N/A"}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={{ ...styles.row, minHeight: "15px" }}>
                <View style={{ ...styles.col, width: "100%" }}>
                  <Text>
                    Emergency commander:{" "}
                    {drillDetail && drillDetail.drill_coordinator
                      ? drillDetail.drill_coordinator
                      : "N/A"}
                  </Text>
                </View>
              </View>
              <View style={{ ...styles.row, minHeight: "15px" }}>
                <View style={{ ...styles.col, width: "40%" }}>
                  <Text>Emergency Team Taking Part:</Text>
                </View>
                <View style={{ ...styles.col, width: "60%" }}>
                  <Text>
                    Response Performance: Excellent / Good / Satisfactory / Poor
                  </Text>
                </View>
              </View>
              <View style={{ ...styles.row, minHeight: "15px" }}>
                <View
                  style={{
                    ...styles.col,
                    width: "100%",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      padding: "4px 0px",
                    }}
                  >
                    <Text>
                      Emergency Response Team Leader -{" "}
                      {drillDetail && drillDetail.response_team_leader
                        ? drillDetail.response_team_leader
                        : "N/A"}
                    </Text>
                    <Text>
                      Emergency Response Team Members -{" "}
                      {drillDetail && drillDetail.response_team_members
                        ? drillDetail.response_team_members
                        : "N/A"}
                    </Text>
                    <Text>
                      Traffic controllers -{" "}
                      {drillDetail && drillDetail.traffic_controllers
                        ? drillDetail.traffic_controllers
                        : "N/A"}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={{ ...styles.row, minHeight: "15px" }}>
                <View
                  style={{
                    ...styles.col,
                    width: "50%",
                    display: "flex",
                    flexDirection: "column",
                    padding: "0px",
                  }}
                >
                  <Text
                    style={{
                      padding: "0px 4px 0px 4px",
                      fontFamily: "Roboto",
                      fontWeight: "bold",
                    }}
                  >
                    Highlights of Drill:
                  </Text>
                  {drillDetail &&
                    drillDetail.highlights &&
                    drillDetail.highlights.map((highlight) =>
                      renderDrillHighlights(highlight)
                    )}
                </View>
                <View
                  style={{
                    ...styles.col,
                    width: "50%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Text style={{ fontFamily: "Roboto", fontWeight: "bold" }}>
                    Team Performance and Observations:
                  </Text>
                  <Text>
                    Total staff response time:{" "}
                    {drillDetail && drillDetail.staff_response_time
                      ? drillDetail.staff_response_time
                      : "N/A"}
                  </Text>

                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      padding: "4px 0px",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Roboto",
                        fontWeight: "bold",
                      }}
                    >
                      Positive note:
                      {`\n`}
                    </Text>
                    <Text>
                      {drillDetail && drillDetail.positive_notes
                        ? drillDetail.positive_notes
                        : "N/A"}
                    </Text>
                  </View>

                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      padding: "4px 0px",
                    }}
                  >
                    <Text style={{ fontFamily: "Roboto", fontWeight: "bold" }}>
                      Observation Point:
                      {`\n`}
                    </Text>
                    <Text>
                      {drillDetail && drillDetail.observation_points
                        ? drillDetail.observation_points
                        : "N/A"}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={{ ...styles.row, minHeight: "30px" }}>
                <View style={{ ...styles.col, width: "100%" }}>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      padding: "4px 0px",
                    }}
                  >
                    <Text style={{ fontFamily: "Roboto", fontWeight: "bold" }}>
                      General Observations:
                      {`\n`}
                    </Text>
                    <Text>
                      {drillDetail && drillDetail.general_observations
                        ? drillDetail.general_observations
                        : "N/A"}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={{ ...styles.row, minHeight: "30px" }}>
                <View style={{ ...styles.col, width: "100%" }}>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      padding: "4px 0px",
                    }}
                  >
                    <Text style={{ fontFamily: "Roboto", fontWeight: "bold" }}>
                      Corrective Action Points:
                      {`\n`}
                    </Text>
                    <Text>
                      {drillDetail && drillDetail.corrective_action_points
                        ? drillDetail.corrective_action_points
                        : "N/A"}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={{ ...styles.row, minHeight: "20px" }}>
                <View style={{ ...styles.col, width: "100%" }}>
                  <Text>
                    Emergency Equipment Used:{" "}
                    {drillDetail && drillDetail.used_emergency_equipments
                      ? drillDetail.used_emergency_equipments
                      : "N/A"}
                  </Text>
                </View>
              </View>
              <View style={{ ...styles.row, minHeight: "15px" }}>
                <View style={{ ...styles.col, width: "25%" }}>
                  <Text>Report Prepared by</Text>
                </View>
                <View style={{ ...styles.col, width: "25%" }}>
                  <Text>Sign</Text>
                </View>
                <View style={{ ...styles.col, width: "25%" }}>
                  <Text>Report Reviewed by</Text>
                </View>
                <View style={{ ...styles.col, width: "25%" }}>
                  <Text>Sign</Text>
                </View>
              </View>
              <View style={{ ...styles.row, minHeight: "25px" }}>
                <View style={{ ...styles.col, width: "25%" }}>
                  <Text></Text>
                </View>
                <View style={{ ...styles.col, width: "25%" }}>
                  <Text></Text>
                </View>
                <View style={{ ...styles.col, width: "25%" }}>
                  <Text></Text>
                </View>
                <View style={{ ...styles.col, width: "25%" }}>
                  <Text></Text>
                </View>
              </View>
            </View>
            {renderFooter()}
          </Page>
          <Page
            size="A4"
            orientation="vertical"
            style={{ ...styles.page }}
            wrap={false}
          >
            {renderHeader()}
            <View style={{ ...styles.section }}>
              {renderDivider()}
              <Text
                style={{
                  fontFamily: "Roboto",
                  fontWeight: "bold",
                  padding: "4px 0px",
                }}
              >
                {`Mock Drill Images:\n`}
              </Text>
              <View style={{ ...styles.gridContainer, height: "100px" }}>
                {drillDetail &&
                  drillDetail.attachments &&
                  drillDetail.attachments.map((attachment) => {
                    return (
                      <>
                        <View style={{ ...styles.gridItem, width: "50%" }}>
                          <Image src={attachment.attachment_url} />
                        </View>
                      </>
                    );
                  })}
              </View>
            </View>
            {renderFooter()}
          </Page>
        </Document>
      </>
    );
  };

  return (
    <>
      <PDFDownloadLink
        document={<MyDocument />}
        fileName="Emergency-Drill-Report.pdf"
      >
        {({ blob, url, loading, error }) => (
          <Button htmlType="submit" loading={loading}>
            Print PDF
          </Button>
        )}
      </PDFDownloadLink>
      {/* <PDFViewer style={{ height: "100%", width: "100%" }}>
        <MyDocument />
      </PDFViewer> */}
    </>
  );
};
