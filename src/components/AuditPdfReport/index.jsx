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
    alignItems: "center",
    width: "25%",
    borderLeft: "0.5px solid black",
    padding: "0px 4px 0px 4px",
    fontSize: "10px",
  },
});

export const AuditPdfReport = (props) => {
  const dateFormat = "YYYY-MM-DD";
  const { auditDetail } = props;

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
              <Text style={styles.documentTitle}>INTERNAL AUDIT REPORT</Text>
            </View>
            <View style={{ ...styles.section }}>
              {renderDivider()}
              <View style={{ ...styles.row, minHeight: "15px" }}>
                <View style={{ ...styles.col, width: "33.33%" }}>
                  <Text>Audit Reference</Text>
                </View>
                <View style={{ ...styles.col, width: "66.66%" }}>
                  <Text>
                    {auditDetail &&
                      auditDetail.notification &&
                      auditDetail.notification.reference_documents}
                  </Text>
                </View>
              </View>
              <View style={{ ...styles.row, minHeight: "15px" }}>
                <View style={{ ...styles.col, width: "33.33%" }}>
                  <Text>Department/ Area Audited</Text>
                </View>
                <View style={{ ...styles.col, width: "66.66%" }}>
                  <Text>
                    {auditDetail &&
                      auditDetail.company &&
                      auditDetail.company.name}

                    {auditDetail &&
                      auditDetail.department &&
                      auditDetail.department.name}
                  </Text>
                </View>
              </View>
              <View style={{ ...styles.row, minHeight: "15px" }}>
                <View style={{ ...styles.col, width: "33.33%" }}>
                  <Text>Date of Audit</Text>
                </View>
                <View style={{ ...styles.col, width: "66.66%" }}>
                  <Text>
                    {" "}
                    {auditDetail &&
                      auditDetail.notification &&
                      `${moment(
                        auditDetail.notification.audit_from_date
                      ).format(dateFormat)} to ${moment(
                        auditDetail.notification.audit_to_date
                      ).format(dateFormat)}`}
                  </Text>
                </View>
              </View>
              <View style={{ ...styles.row, minHeight: "15px" }}>
                <View style={{ ...styles.col, width: "33.33%" }}>
                  <Text>Auditor(s)</Text>
                </View>
                <View style={{ ...styles.col, width: "66.66%" }}>
                  <Text>
                    {auditDetail &&
                      auditDetail.notification &&
                      auditDetail.notification.auditors &&
                      auditDetail.notification.auditors.map((auditor) => {
                        return `${auditor.user.name}, `;
                      })}
                  </Text>
                </View>
              </View>
              <View style={{ ...styles.row, minHeight: "15px" }}>
                <View style={{ ...styles.col, width: "33.33%" }}>
                  <Text>Scope of Audit</Text>
                </View>
                <View style={{ ...styles.col, width: "66.66%" }}>
                  <Text>
                    {auditDetail &&
                      auditDetail.notification &&
                      auditDetail.notification.scope_of_audit}
                  </Text>
                </View>
              </View>
              {renderDivider()}
              <View
                style={{
                  ...styles.row,
                  minHeight: "20px",
                }}
              >
                <View
                  style={{
                    ...styles.col,
                    width: "5%",
                    fontFamily: "Roboto",
                    fontWeight: "bold",
                  }}
                >
                  <Text>1</Text>
                </View>
                <View
                  style={{
                    ...styles.col,
                    width: "95%",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    padding: "0px",
                    alignItems: "stretch",
                  }}
                >
                  <View
                    style={{
                      minHeight: "15px",
                      borderBottom: "0.5px solid black",
                      padding: "4px",
                      fontFamily: "Roboto",
                      fontWeight: "bold",
                    }}
                  >
                    <Text>
                      Follow-up on previous audit findings (Internal and
                      External) to assess compliance:
                    </Text>
                  </View>
                  <View style={{ minHeight: "25px", padding: "5px" }}>
                    <Text>
                      {auditDetail && auditDetail.previous_audit_follow_up}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  ...styles.row,
                  minHeight: "20px",
                }}
              >
                <View
                  style={{
                    ...styles.col,
                    width: "5%",
                    fontFamily: "Roboto",
                    fontWeight: "bold",
                  }}
                >
                  <Text>2</Text>
                </View>
                <View
                  style={{
                    ...styles.col,
                    width: "95%",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    padding: "0px",
                    alignItems: "stretch",
                    borderLeft: "0.5px dotted black",
                  }}
                >
                  <View
                    style={{
                      minHeight: "15px",
                      borderBottom: "0.5px solid black",
                      padding: "4px",
                      fontFamily: "Roboto",
                      fontWeight: "bold",
                    }}
                  >
                    <Text>Audit Evidences:</Text>
                  </View>
                  <View style={{ minHeight: "25px", padding: "5px" }}>
                    <Text>{auditDetail && auditDetail.audit_evidence}</Text>
                  </View>
                </View>
              </View>
              <View style={{ ...styles.row, minHeight: "20px" }}>
                <View
                  style={{
                    ...styles.col,
                    width: "5%",
                    fontFamily: "Roboto",
                    fontWeight: "bold",
                  }}
                >
                  <Text>3</Text>
                </View>
                <View
                  style={{
                    ...styles.col,
                    width: "95%",
                    fontFamily: "Roboto",
                    fontWeight: "bold",
                  }}
                >
                  <Text>Audit Findings:</Text>
                </View>
              </View>

              <View
                style={{
                  ...styles.row,
                  minHeight: "20px",
                }}
              >
                <View style={{ ...styles.col, width: "5%" }}>
                  <Text>3a</Text>
                </View>
                <View
                  style={{
                    ...styles.col,
                    width: "95%",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    padding: "0px",
                    alignItems: "stretch",
                    borderLeft: "0.5px dotted black",
                  }}
                >
                  <View
                    style={{
                      minHeight: "15px",
                      borderBottom: "0.5px solid black",
                      padding: "4px",
                      fontFamily: "Roboto",
                      fontWeight: "bold",
                    }}
                  >
                    <Text>Noteworthy Efforts:</Text>
                  </View>
                  <View style={{ minHeight: "25px", padding: "5px" }}>
                    <Text>
                      {auditDetail &&
                        auditDetail.checklist &&
                        auditDetail.checklist.map(
                          (checklistItem, positiveIndex) => {
                            return (
                              <>
                                {checklistItem.audit_finding_id == 1 &&
                                  checklistItem.observations &&
                                  `-${checklistItem.observations}\n`}
                              </>
                            );
                          }
                        )}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  ...styles.row,
                  minHeight: "20px",
                }}
              >
                <View style={{ ...styles.col, width: "5%" }}>
                  <Text>3b</Text>
                </View>
                <View
                  style={{
                    ...styles.col,
                    width: "95%",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    padding: "0px",
                    alignItems: "stretch",
                    borderLeft: "0.5px dotted black",
                  }}
                >
                  <View
                    style={{
                      minHeight: "15px",
                      borderBottom: "0.5px solid black",
                      padding: "4px",
                      fontFamily: "Roboto",
                      fontWeight: "bold",
                    }}
                  >
                    <Text>Opportunities for Improvement:</Text>
                  </View>
                  <View style={{ minHeight: "25px", padding: "5px" }}>
                    <Text>
                      {auditDetail &&
                        auditDetail.checklist &&
                        auditDetail.checklist.map(
                          (checklistItem, improvementIndex) => {
                            return (
                              <>
                                {checklistItem.audit_finding_id == 2 &&
                                  checklistItem.observations &&
                                  `-${checklistItem.observations}\n`}
                              </>
                            );
                          }
                        )}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  ...styles.row,
                  minHeight: "20px",
                }}
              >
                <View style={{ ...styles.col, width: "5%" }}>
                  <Text>3c</Text>
                </View>
                <View
                  style={{
                    ...styles.col,
                    width: "95%",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    padding: "0px",
                    alignItems: "stretch",
                    borderLeft: "0.5px dotted black",
                  }}
                >
                  <View
                    style={{
                      minHeight: "15px",
                      borderBottom: "0.5px solid black",
                      padding: "4px",
                      fontFamily: "Roboto",
                      fontWeight: "bold",
                    }}
                  >
                    <Text>Observations:</Text>
                  </View>
                  <View style={{ minHeight: "25px", padding: "5px" }}>
                    <Text>
                      {auditDetail &&
                        auditDetail.checklist &&
                        auditDetail.checklist.map((checklistItem, index) => {
                          // let count = 1;
                          // checklistItem.audit_finding_id == 3
                          //   ? count + 1
                          //   : count + 0;
                          return (
                            <>
                              {checklistItem.audit_finding_id == 3 &&
                                checklistItem.observations &&
                                `-${checklistItem.observations}\n`}
                            </>
                          );
                        })}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  ...styles.row,
                  minHeight: "20px",
                }}
              >
                <View style={{ ...styles.col, width: "5%" }}>
                  <Text>3d</Text>
                </View>
                <View
                  style={{
                    ...styles.col,
                    width: "95%",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    padding: "0px",
                    alignItems: "stretch",
                    borderLeft: "0.5px dotted black",
                  }}
                >
                  <View
                    style={{
                      minHeight: "15px",
                      borderBottom: "0.5px solid black",
                      padding: "4px",
                      fontFamily: "Roboto",
                      fontWeight: "bold",
                    }}
                  >
                    <Text>Nonconformities:</Text>
                  </View>
                  <View style={{ minHeight: "25px", padding: "5px" }}>
                    <Text>
                      {auditDetail &&
                        auditDetail.checklist &&
                        auditDetail.checklist.map(
                          (checklistItem, nonconformityIndex) => {
                            return (
                              <>
                                {checklistItem.audit_finding_id == 4 &&
                                  checklistItem.observations &&
                                  `-${checklistItem.observations}\n`}
                              </>
                            );
                          }
                        )}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  ...styles.row,
                  minHeight: "20px",
                }}
              >
                <View
                  style={{
                    ...styles.col,
                    width: "5%",
                    fontFamily: "Roboto",
                    fontWeight: "bold",
                  }}
                >
                  <Text>4</Text>
                </View>
                <View
                  style={{
                    ...styles.col,
                    width: "95%",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    padding: "0px",
                    alignItems: "stretch",
                    borderLeft: "0.5px dotted black",
                  }}
                >
                  <View
                    style={{
                      minHeight: "15px",
                      borderBottom: "0.5px solid black",
                      padding: "4px",
                      fontFamily: "Roboto",
                      fontWeight: "bold",
                    }}
                  >
                    <Text>Other Facts and Incidents if any:</Text>
                  </View>
                  <View style={{ minHeight: "25px", padding: "5px" }}>
                    <Text>
                      <Text>
                        {auditDetail && auditDetail.other_facts_incidents}
                      </Text>
                    </Text>
                  </View>
                </View>
              </View>
              {renderDivider()}
              <View style={{ ...styles.row, minHeight: "20px" }}>
                <View
                  style={{
                    ...styles.col,
                    width: "5%",
                    fontFamily: "Roboto",
                    fontWeight: "bold",
                  }}
                >
                  <Text>5</Text>
                </View>
                <View
                  style={{
                    ...styles.col,
                    width: "95%",
                    fontFamily: "Roboto",
                    fontWeight: "bold",
                  }}
                >
                  <Text>Summary of Audit Findings:</Text>
                </View>
              </View>
              <View style={{ ...styles.row, minHeight: "20px" }}>
                <View style={{ ...styles.col, width: "5%" }}>
                  <Text></Text>
                </View>
                <View
                  style={{
                    ...styles.col,
                    width: "65%",
                    fontFamily: "Roboto",
                    fontWeight: "bold",
                  }}
                >
                  <Text>Findings</Text>
                </View>
                <View
                  style={{
                    ...styles.col,
                    width: "30%",
                    fontFamily: "Roboto",
                    fontWeight: "bold",
                  }}
                >
                  <Text>Total</Text>
                </View>
              </View>
              <View style={{ ...styles.row, minHeight: "20px" }}>
                <View style={{ ...styles.col, width: "5%" }}>
                  <Text>1</Text>
                </View>
                <View style={{ ...styles.col, width: "65%" }}>
                  <Text>Opportunities for Improvement</Text>
                </View>
                <View style={{ ...styles.col, width: "30%" }}>
                  <Text>
                    {auditDetail &&
                      auditDetail.checklist &&
                      auditDetail.checklist.reduce(
                        (val, itm) =>
                          itm.audit_finding_id == 2 ? val + 1 : val + 0,
                        0
                      )}
                  </Text>
                </View>
              </View>
              <View style={{ ...styles.row, minHeight: "20px" }}>
                <View style={{ ...styles.col, width: "5%" }}>
                  <Text>2</Text>
                </View>
                <View style={{ ...styles.col, width: "65%" }}>
                  <Text>Observations</Text>
                </View>
                <View style={{ ...styles.col, width: "30%" }}>
                  <Text>
                    {auditDetail &&
                      auditDetail.checklist &&
                      auditDetail.checklist.reduce(
                        (val, itm) =>
                          itm.audit_finding_id == 3 ? val + 1 : val + 0,
                        0
                      )}
                  </Text>
                </View>
              </View>
              <View style={{ ...styles.row, minHeight: "20px" }}>
                <View style={{ ...styles.col, width: "5%" }}>
                  <Text>3</Text>
                </View>
                <View style={{ ...styles.col, width: "65%" }}>
                  <Text>Nonconformities</Text>
                </View>
                <View style={{ ...styles.col, width: "30%" }}>
                  <Text>
                    {auditDetail &&
                      auditDetail.checklist &&
                      auditDetail.checklist.reduce(
                        (val, itm) =>
                          itm.audit_finding_id == 4 ? val + 1 : val + 0,
                        0
                      )}
                  </Text>
                </View>
              </View>
              {renderDivider()}
              <View style={{ ...styles.row, minHeight: "20px" }}>
                <View style={{ ...styles.col, width: "10%" }}>
                  <Text></Text>
                </View>
                <View
                  style={{
                    ...styles.col,
                    width: "30%",
                    fontFamily: "Roboto",
                    fontWeight: "bold",
                  }}
                >
                  <Text>Auditee</Text>
                </View>
                <View
                  style={{
                    ...styles.col,
                    width: "30%",
                    fontFamily: "Roboto",
                    fontWeight: "bold",
                  }}
                >
                  <Text>Auditor</Text>
                </View>
                <View
                  style={{
                    ...styles.col,
                    width: "30%",
                    fontFamily: "Roboto",
                    fontWeight: "bold",
                  }}
                >
                  <Text>Management Representative</Text>
                </View>
              </View>
              <View style={{ ...styles.row, minHeight: "20px" }}>
                <View
                  style={{
                    ...styles.col,
                    width: "10%",
                    fontFamily: "Roboto",
                    fontWeight: "bold",
                  }}
                >
                  <Text>Signature:</Text>
                </View>
                <View style={{ ...styles.col, width: "30%" }}>
                  <Text></Text>
                </View>
                <View style={{ ...styles.col, width: "30%" }}>
                  <Text></Text>
                </View>
                <View style={{ ...styles.col, width: "30%" }}>
                  <Text></Text>
                </View>
              </View>
              <View style={{ ...styles.row, minHeight: "20px" }}>
                <View
                  style={{
                    ...styles.col,
                    width: "10%",
                    fontFamily: "Roboto",
                    fontWeight: "bold",
                  }}
                >
                  <Text>Name:</Text>
                </View>
                <View style={{ ...styles.col, width: "30%" }}>
                  <Text></Text>
                </View>
                <View style={{ ...styles.col, width: "30%" }}>
                  <Text></Text>
                </View>
                <View style={{ ...styles.col, width: "30%" }}>
                  <Text></Text>
                </View>
              </View>
              <View style={{ ...styles.row, minHeight: "20px" }}>
                <View
                  style={{
                    ...styles.col,
                    width: "10%",
                    fontFamily: "Roboto",
                    fontWeight: "bold",
                  }}
                >
                  <Text>Date:</Text>
                </View>
                <View style={{ ...styles.col, width: "30%" }}>
                  <Text></Text>
                </View>
                <View style={{ ...styles.col, width: "30%" }}>
                  <Text></Text>
                </View>
                <View style={{ ...styles.col, width: "30%" }}>
                  <Text></Text>
                </View>
              </View>

              {renderDivider()}
            </View>
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
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: "8px" }}>
                {auditDetail && auditDetail.audit_number} Issue 01 Rev: 00
              </Text>
              <Text
                render={({ pageNumber, totalPages }) =>
                  `${pageNumber} / ${totalPages}`
                }
                style={{ fontSize: "8px" }}
              />
            </View>
          </Page>
        </Document>
      </>
    );
  };

  return (
    <>
      <PDFDownloadLink document={<MyDocument />} fileName="Audit-Report.pdf">
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
