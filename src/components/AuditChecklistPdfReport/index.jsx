import React, { useEffect } from "react";
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
} from "@react-pdf/renderer";
import { Button } from "antd";

import aliSonsLogo from "../../assets/images/ali_sons_logo.png";

const styles = StyleSheet.create({
  page: {
    fontSize: "10px",
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
  },
  section: {
    margin: 0,
    padding: 10,
    flexGrow: 1,
    // height: "calc(100% - 100px)",
  },
  wrapRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  auditInfoRow: {
    border: "0.5px solid black",
    minHeight: "50px",
    display: "flex",
    flexDirection: "row",
    alignContent: "stretch",
    flexWrap: "nowrap",
    alignItems: "stretch",
  },
  auditInfoCol: {
    width: "25%",
    borderLeft: "0.5px solid black",
    height: "50px",
    padding: "10px 5px 0px 5px",
    fontSize: "8px",
  },
  notifyInfoRow: {
    border: "0.5px solid black",
    minHeight: "50px",
    display: "flex",
    flexDirection: "row",
    alignContent: "stretch",
    flexWrap: "nowrap",
    alignItems: "stretch",
  },
  notifyInfoCol: {
    width: "33.33%",
    borderLeft: "0.5px solid black",
    padding: "5px",
    fontSize: "8px",
  },
  checklistInfoColHeader: {
    width: "25%",
    border: "0.5px solid black",
    height: "30px",
    padding: "10px 5px 0px 5px",
    fontSize: "8px",
    fontWeight: "bold",
  },
  checklistInfoRow: {
    border: "0.5px solid black",
    minHeight: "30px",
    display: "flex",
    flexDirection: "row",
    alignContent: "stretch",
    flexWrap: "nowrap",
    alignItems: "stretch",
  },
  checklistInfoRowItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "25%",
    borderLeft: "0.5px solid black",
    padding: "0px 5px 0px 5px",
    fontSize: "8px",
  },
  signatureAlign: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export const AuditChecklistPdfReport = (props) => {
  const dateFormat = "YYYY-MM-DD";
  const { auditDetail } = props;

  const renderHeader = () => {
    return (
      <>
        <View
          style={{
            width: "100%",
            border: "0.5px solid black",
            height: "30px",
            padding: "10px 5px 0px 5px",
            fontWeight: "bold",
            fontSize: "8px",
          }}
        >
          <Text>{"AUDIT CHECKLIST"}</Text>
        </View>
        <View style={styles.auditInfoRow}>
          <Text style={{ ...styles.auditInfoCol, width: "33.33%" }}>
            {"Audit Date:\n"}
            {`${
              auditDetail &&
              auditDetail.notification &&
              moment(auditDetail.notification.audit_from_date).format(
                dateFormat
              )
            } to ${
              auditDetail &&
              auditDetail.notification &&
              moment(auditDetail.notification.audit_to_date).format(dateFormat)
            }`}
          </Text>
          <Text style={{ ...styles.auditInfoCol, width: "33.33%" }}>
            {"Location/Area:\n\n"}
            {auditDetail &&
              auditDetail.company &&
              `${auditDetail.company.name} (Business Unit)`}
            {auditDetail &&
              auditDetail.department &&
              `${auditDetail.department.name} (Department)`}
          </Text>
          <Text style={{ ...styles.auditInfoCol, width: "19%" }}>
            {"Checklist No.\n\n"}
            {auditDetail?.audit_number}
          </Text>
          <View style={{ ...styles.auditInfoCol, width: "14.34%" }}>
            {
              <Text
                render={({ pageNumber, totalPages }) =>
                  `Sheet No.: ${pageNumber}`
                }
              />
            }
          </View>
        </View>
        <View style={styles.notifyInfoRow}>
          <Text style={styles.notifyInfoCol}>
            {"Auditor: \n\n"}
            {auditDetail &&
              auditDetail.notification &&
              auditDetail.notification.auditors.map((auditor, index) => {
                return `${index + 1}-${auditor.user.name} \n`;
              })}
          </Text>
          <Text style={styles.notifyInfoCol}>
            {"Auditee(s): \n\n"}
            {auditDetail &&
              auditDetail.notification &&
              auditDetail.notification.auditees.map((auditee, index) => {
                return `${index + 1}-${auditee.user.name} \n`;
              })}
          </Text>
          <Text style={styles.notifyInfoCol}>
            {"Ref.Audit Report No.: \n\n"}
            {auditDetail?.audit_number}
          </Text>
        </View>
      </>
    );
  };

  const renderChecklistTableHeader = () => {
    return (
      <>
        <View
          style={{
            ...styles.checklistInfoRow,
            backgroundColor: "#EBEBEB",
          }}
        >
          <View
            style={{
              ...styles.checklistInfoRowItem,
              width: "16%",
            }}
          >
            <Text>{"Process/\nFunction"}</Text>
          </View>
          <View
            style={{
              ...styles.checklistInfoRowItem,
              width: "16%",
            }}
          >
            <Text>Reference</Text>
          </View>
          <View
            style={{
              ...styles.checklistInfoRowItem,
              width: "25%",
            }}
          >
            <Text>Question/Requirements</Text>
          </View>
          <View
            style={{
              ...styles.checklistInfoRowItem,
              width: "17.32%",
            }}
          >
            <Text>Finding</Text>
          </View>
          <View
            style={{
              ...styles.checklistInfoRowItem,
              width: "25%",
            }}
          >
            <Text>Observations</Text>
          </View>
        </View>
      </>
    );
  };

  const renderChecklist = (checklistDetail) => {
    return (
      <>
        <View style={styles.checklistInfoRow}>
          <View
            style={{
              ...styles.checklistInfoRowItem,
              width: "16%",
            }}
          >
            <Text>{checklistDetail.process}</Text>
          </View>
          <View
            style={{
              ...styles.checklistInfoRowItem,
              width: "16%",
            }}
          >
            <Text>{checklistDetail.reference}</Text>
          </View>
          <View
            style={{
              ...styles.checklistInfoRowItem,
              width: "25%",
            }}
          >
            <Text>{checklistDetail.requirements}</Text>
          </View>
          <View
            style={{
              ...styles.checklistInfoRowItem,
              width: "17.32%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {checklistDetail.finding && (
              <View
                style={{
                  backgroundColor: `${checklistDetail.finding.color_code}`,
                  height: "8px",
                  width: "8px",
                  borderRadius: "50%",
                  display: "inline-block",
                }}
              ></View>
            )}

            <Text style={{ marginLeft: "4px" }}>
              {checklistDetail.finding && checklistDetail.finding.name}
            </Text>
          </View>
          <View
            style={{
              ...styles.checklistInfoRowItem,
              width: "25%",
            }}
          >
            <Text>{checklistDetail.observations}</Text>
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
              <Text style={styles.documentTitle}>Internal Audit Checklist</Text>
            </View>
            <View style={{ ...styles.section }}>
              <View fixed>{renderHeader()}</View>
              <View style={{ marginTop: "16px" }} fixed>
                {renderChecklistTableHeader()}
              </View>
              {auditDetail &&
                auditDetail.checklist &&
                auditDetail.checklist.map((checklistDetail) => {
                  return <>{renderChecklist(checklistDetail)}</>;
                })}
              <View style={{ marginTop: "16px" }}>
                <View style={styles.signatureAlign}>
                  <Text style={{ width: "60%" }}>Signature(Auditor):</Text>
                  <Text style={{ width: "40%" }}>Date:</Text>
                </View>
                <View style={{ ...styles.signatureAlign, marginTop: "16px" }}>
                  <Text style={{ width: "60%" }}>Signature(Auditee):</Text>
                  <Text style={{ width: "40%" }}>Date:</Text>
                </View>
              </View>
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
      <PDFDownloadLink document={<MyDocument />} fileName="Audit-Checklist.pdf">
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
