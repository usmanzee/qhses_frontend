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
} from "@react-pdf/renderer";
import { Button } from "antd";

import aliSonsLogo from "../../assets/images/ali_sons_logo.png";

const styles = StyleSheet.create({
  page: {
    fontSize: "12px",
    paddingBottom: "28px",
  },
  header: {
    padding: "20px",
    borderBottom: "1px dotted #333",
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
  documentBody: {
    margin: 0,
    padding: 10,
    flexGrow: 1,
  },
  row: {
    border: "0.5px solid black",
    minHeight: "30px",
    display: "flex",
    flexDirection: "row",
    alignContent: "stretch",
    flexWrap: "nowrap",
    alignItems: "stretch",
    minHeight: "100px",
  },
  col: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
    borderLeft: "0.5px solid black",
    padding: "0px 5px 0px 5px",
    fontSize: "8px",
  },
});

export const AuditNotificationPdfReport = (props) => {
  const { auditDetail } = props;
  const dateFormat = "YYYY-MM-DD";

  const MyDocument = () => {
    return (
      <>
        <Document>
          <Page
            size="A4"
            orientation="vertical"
            style={styles.page}
            wrap={false}
          >
            <View style={styles.header}>
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
              <Text style={styles.documentTitle}>
                Internal Audit Notification
              </Text>
            </View>

            <View style={styles.documentBody}>
              <View style={styles.row}>
                <View style={styles.col}>
                  <Text>
                    {"Auditee(s): \n\n"}
                    {auditDetail &&
                      auditDetail.notification &&
                      auditDetail.notification.auditees.map(
                        (auditee, index) => {
                          return `${index + 1}-${auditee.user.name} \n`;
                        }
                      )}
                  </Text>
                </View>
                <View style={styles.col}>
                  <Text>
                    {"Cc to: \n\n"}
                    {auditDetail &&
                      auditDetail.notification &&
                      auditDetail.notification.toEmailUsers.map(
                        (toEmailUser, index) => {
                          return `${index + 1}-${toEmailUser.user.name} \n`;
                        }
                      )}
                  </Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.col}>
                  <Text>
                    {"Audit Date: \n\n"}
                    {`${
                      auditDetail &&
                      auditDetail.notification &&
                      moment(auditDetail.notification.audit_from_date).format(
                        dateFormat
                      )
                    } to ${
                      auditDetail &&
                      auditDetail.notification &&
                      moment(auditDetail.notification.audit_to_date).format(
                        dateFormat
                      )
                    }`}
                  </Text>
                </View>
                <View style={styles.col}>
                  <Text>
                    {"Auditor(s): \n\n"}
                    {auditDetail &&
                      auditDetail.notification &&
                      auditDetail.notification.auditors.map(
                        (auditor, index) => {
                          return `${index + 1}-${auditor.user.name} \n`;
                        }
                      )}
                  </Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={{ ...styles.col, width: "100%" }}>
                  <Text>
                    {"Socpe of Audit: \n\n"}
                    {auditDetail &&
                      auditDetail.notification &&
                      auditDetail.notification.scope_of_audit}
                  </Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={{ ...styles.col, width: "100%" }}>
                  <Text>
                    {"Audit References: \n\n"}
                    {auditDetail &&
                      auditDetail.notification &&
                      auditDetail.notification.reference_documents}
                  </Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={{ ...styles.col, width: "33.33%" }}>
                  <Text>
                    {"Notification no. & Date: \n\n"}
                    {auditDetail && auditDetail.audit_number}
                  </Text>
                </View>
                <View style={{ ...styles.col, width: "33.33%" }}>
                  <Text>Audit Requested by:</Text>
                </View>
                <View style={{ ...styles.col, width: "33.33%" }}>
                  <Text>Signature:</Text>
                </View>
              </View>
            </View>
          </Page>
        </Document>
      </>
    );
  };

  return (
    <>
      <PDFDownloadLink
        document={<MyDocument />}
        fileName="Audit-Notification.pdf"
      >
        {({ blob, url, loading, error }) => (
          <Button htmlType="submit" loading={loading}>
            Preview Report
          </Button>
        )}
      </PDFDownloadLink>
      {/* <PDFViewer style={{ height: "100%", width: "100%" }}>
        <MyDocument />
      </PDFViewer> */}
    </>
  );
};
