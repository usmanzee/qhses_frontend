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
    height: "100px",
  },
  headerCompanyTitle: {
    margin: 0,
    fontSize: "12px",
  },
  headerCompanyDesc: {
    margin: 0,
    fontSize: "8px",
  },
  surveyTitle: {
    fontSize: "14px",
    textAlign: "center",
  },
  documentBody: {
    padding: "20px 50px",
  },
  surveyDesc: {
    fontSize: "10px",
  },
  questionDesc: {
    paddingTop: "16px",
    fontSize: "10px",
  },
  wrapAlign: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  option: {
    padding: "8px 0",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  optionRadio: {
    width: "10px",
    height: "10px",
    border: "1px solid black",
    borderRadius: "50%",
  },
  optionRadioActive: {
    border: "1px solid black",
    borderRadius: "50%",
    padding: "1px",
  },
  optionRadioActiveBg: {
    width: "7px",
    height: "7px",
    border: "1px solid black",
    borderRadius: "50%",
    backgroundColor: "black",
  },
  optionText: {
    marginLeft: "4px",
    fontSize: "10px",
  },
  questionRemarks: {
    padding: "10px",
    height: "50px",
    border: "1px solid black",
    fontSize: "10px",
  },
  descriptionField: {
    margin: "8px 0px",
  },
  descriptionTitle: {
    fontSize: "10px",
    marginBottom: "8px",
  },
  descriptionBox: {
    padding: "10px",
    height: "50px",
    border: "1px solid black",
    fontSize: "10px",
  },
  wrapTable: {
    margin: "15px 0",
    border: "0.5px solid black",
  },
  wrapRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  tableCol: {
    width: "25%",
    border: "0.5px solid black",
    height: "30px",
    padding: "10px 5px 0px 5px",
    fontSize: "10px",
  },
});

export const CustomerFeedbackPdfReport = (props) => {
  const { surveyDetail, surveyFeedbackDetail } = props;

  const MyDocument = () => {
    const dateFormat = "YYYY-MM-DD";
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
              <Text style={styles.surveyTitle}>
                {surveyDetail && surveyDetail.title}
              </Text>
            </View>

            <View style={styles.documentBody}>
              <Text style={styles.surveyDesc}>
                {surveyDetail && surveyDetail.description}
              </Text>
              <View>
                {surveyFeedbackDetail &&
                  surveyFeedbackDetail.answers.map((answer, index) => {
                    return (
                      <>
                        <Text style={styles.questionDesc}>
                          {`${index + 1} - ${
                            answer.question.question_description
                          }`}
                        </Text>
                        <View style={styles.wrapAlign}>
                          <View style={styles.option}>
                            <View
                              style={
                                answer.rating === 6
                                  ? styles.optionRadioActive
                                  : styles.optionRadio
                              }
                            >
                              {answer.rating === 6 ? (
                                <View style={styles.optionRadioActiveBg}></View>
                              ) : (
                                <View></View>
                              )}
                            </View>
                            <Text style={styles.optionText}>
                              {answer.question.rating_text_1}
                            </Text>
                          </View>
                          <View style={styles.option}>
                            <View
                              style={
                                answer.rating === 7
                                  ? styles.optionRadioActive
                                  : styles.optionRadio
                              }
                            >
                              {answer.rating === 7 ? (
                                <View style={styles.optionRadioActiveBg}></View>
                              ) : (
                                <View></View>
                              )}
                            </View>
                            <Text style={styles.optionText}>
                              {answer.question.rating_text_2}
                            </Text>
                          </View>
                          <View style={styles.option}>
                            <View
                              style={
                                answer.rating === 8
                                  ? styles.optionRadioActive
                                  : styles.optionRadio
                              }
                            >
                              {answer.rating === 8 ? (
                                <View style={styles.optionRadioActiveBg}></View>
                              ) : (
                                <View></View>
                              )}
                            </View>
                            <Text style={styles.optionText}>
                              {answer.question.rating_text_3}
                            </Text>
                          </View>
                          <View style={styles.option}>
                            <View
                              style={
                                answer.rating === 9
                                  ? styles.optionRadioActive
                                  : styles.optionRadio
                              }
                            >
                              {answer.rating === 9 ? (
                                <View style={styles.optionRadioActiveBg}></View>
                              ) : (
                                <View></View>
                              )}
                            </View>
                            <Text style={styles.optionText}>
                              {answer.question.rating_text_4}
                            </Text>
                          </View>
                          <View style={styles.option}>
                            <View
                              style={
                                answer.rating === 10
                                  ? styles.optionRadioActive
                                  : styles.optionRadio
                              }
                            >
                              {answer.rating === 10 ? (
                                <View style={styles.optionRadioActiveBg}></View>
                              ) : (
                                <View></View>
                              )}
                            </View>
                            <Text style={styles.optionText}>
                              {answer.question.rating_text_5}
                            </Text>
                          </View>
                        </View>
                        <Text style={styles.questionRemarks}>
                          {answer.remarks}
                        </Text>
                      </>
                    );
                  })}
                <View style={styles.descriptionField}>
                  <Text style={styles.descriptionTitle}>
                    Appreciation / Concerns
                  </Text>
                  <Text style={styles.descriptionBox}>
                    {surveyFeedbackDetail.appreciation}
                  </Text>
                </View>
                <View style={styles.descriptionField}>
                  <Text style={styles.descriptionTitle}>Suggestions</Text>
                  <Text style={styles.descriptionBox}>
                    {surveyFeedbackDetail.suggestions}
                  </Text>
                </View>
              </View>
              <View style={styles.wrapTable}>
                <View style={styles.wrapRow}>
                  <Text style={styles.tableCol}>Completed by:</Text>
                  <Text style={styles.tableCol}>
                    {surveyFeedbackDetail &&
                      surveyFeedbackDetail.user &&
                      surveyFeedbackDetail.user.name}
                  </Text>
                  <Text style={styles.tableCol}>Reviewed by:</Text>
                  <Text style={styles.tableCol}></Text>
                </View>
                <View style={styles.wrapRow}>
                  <Text style={styles.tableCol}>Designation:</Text>
                  <Text style={styles.tableCol}>
                    {surveyFeedbackDetail &&
                      surveyFeedbackDetail.user.designation}
                  </Text>
                  <Text style={styles.tableCol}>Designation:</Text>
                  <Text style={styles.tableCol}></Text>
                </View>
                <View style={styles.wrapRow}>
                  <Text style={styles.tableCol}>Company / Entity:</Text>
                  <Text style={styles.tableCol}>
                    {surveyFeedbackDetail &&
                      surveyFeedbackDetail.user.department}
                  </Text>
                  <Text style={styles.tableCol}>Company / Entity:</Text>
                  <Text style={styles.tableCol}></Text>
                </View>
                <View style={styles.wrapRow}>
                  <Text style={styles.tableCol}>Date:</Text>
                  <Text style={styles.tableCol}>
                    {surveyFeedbackDetail &&
                      moment(surveyFeedbackDetail.createdAt).format(dateFormat)}
                  </Text>
                  <Text style={styles.tableCol}>Date:</Text>
                  <Text style={styles.tableCol}></Text>
                </View>
                <View style={styles.wrapRow}>
                  <Text style={styles.tableCol}>Sign:</Text>
                  <Text style={styles.tableCol}></Text>
                  <Text style={styles.tableCol}>Sign:</Text>
                  <Text style={styles.tableCol}></Text>
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
        fileName="customer-feedback.pdf"
      >
        {({ blob, url, loading, error }) => (
          <Button type="primary" htmlType="submit" loading={loading}>
            Download Report as PDF
          </Button>
        )}
      </PDFDownloadLink>
      {/* <PDFViewer>
        <MyDocument />
      </PDFViewer> */}
    </>
  );
};
