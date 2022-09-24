import React, { useState, useEffect } from "react";
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
    padding: "4px",
    fontSize: "10px",
  },

  option: {
    padding: "8px 0",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  optionCheckbox: {
    width: "15px",
    height: "15px",
    border: "1px solid black",
  },
  optionCheckboxActive: {
    width: "15px",
    height: "15px",
    border: "1px solid black",
    padding: "1px",
  },
  optionCheckboxActiveBg: {
    width: "11px",
    height: "11px",
    border: "1px solid black",
    backgroundColor: "black",
  },
  optionText: {
    marginLeft: "4px",
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

export const CoshhAssessmentPdfReport = (props) => {
  const {
    riskPersons,
    classifications,
    hazardTypes,
    exposureRoutes,
    protectiveEquipments,
    substanceDisposalTypes,
    riskRatings,
    assessmentDetail,
  } = props;

  const [otherHazardType, setOtherHazardType] = useState(null);
  const [otherExposureRoute, setOtherExposureRoute] = useState(null);
  const [otherProtectiveEquipment, setOtherProtectiveEquipment] =
    useState(null);
  const [otherSubstanceDisposalType, setOtherSubstanceDisposalType] =
    useState(null);

  useEffect(() => {
    if (assessmentDetail) {
      const otherHazardTypeExists = assessmentDetail.hazardTypes.find(
        (hazardType) => hazardType.id === 8
      );
      const otherExposureRouteExists = assessmentDetail.exposureRoutes.find(
        (exposureRoute) => exposureRoute.id === 5
      );
      const otherProtectiveEquipmentExists =
        assessmentDetail.protectiveEquipments.find(
          (protectiveEquipment) => protectiveEquipment.id === 8
        );
      const otherSubstancesDisposalTypeExists =
        assessmentDetail.substancesDisposalTypes.find(
          (substancesDisposalType) => substancesDisposalType.id === 4
        );
      setOtherHazardType(otherHazardTypeExists);
      setOtherExposureRoute(otherExposureRouteExists);
      setOtherProtectiveEquipment(otherProtectiveEquipmentExists);
      setOtherSubstanceDisposalType(otherSubstancesDisposalTypeExists);
    }
  }, [assessmentDetail]);

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
            {assessmentDetail && assessmentDetail.assessment_number}
          </Text>
        </View>
      </>
    );
  };

  const renderDivider = (text) => {
    return (
      <>
        <View
          style={{
            ...styles.row,
            minHeight: "15px",
            backgroundColor: "#EBEBEB",
          }}
        >
          <View style={{ ...styles.col, width: "100%" }}>
            <Text>{text}</Text>
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
            {/* {renderHeader()} */}
            <View style={{ ...styles.section }}>
              {renderDivider()}
              <View style={{ ...styles.row, minHeight: "60px" }}>
                <View style={{ ...styles.col, width: "15%" }}>
                  <View style={{ display: "flex", flexDirection: "column" }}>
                    <Text style={{ fontFamily: "Roboto", fontWeight: "bold" }}>
                      COSHH
                    </Text>
                  </View>
                </View>
                <View style={{ ...styles.col, width: "60%" }}>
                  <View style={{ display: "flex", flexDirection: "column" }}>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Roboto",
                          fontWeight: "bold",
                          fontSize: "18px",
                        }}
                      >
                        {`COSHH: `}
                      </Text>
                      <Text
                        style={{
                          fontFamily: "Roboto",
                          fontWeight: "bold",
                          fontSize: "14px",
                        }}
                      >
                        {/* {`Risk Assessment No: ${
                          assessmentDetail && assessmentDetail.assessment_number
                        }`} */}
                        {assessmentDetail && assessmentDetail.assessment_number}
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          fontFamily: "Roboto",
                          fontWeight: "bold",
                          fontSize: "12px",
                        }}
                      >
                        {`Product Name: ${
                          assessmentDetail && assessmentDetail.product_name
                        }`}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{ ...styles.col, width: "15%" }}>
                  <View style={{ display: "flex", flexDirection: "column" }}>
                    <Text style={{ fontFamily: "Roboto", fontWeight: "bold" }}>
                      COSHH
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ ...styles.row }}>
                <View style={{ ...styles.col, width: "50%" }}>
                  <Text>
                    Company Name:{" "}
                    {assessmentDetail &&
                      assessmentDetail.company &&
                      assessmentDetail.company.name}
                  </Text>
                </View>
                <View style={{ ...styles.col, width: "50%" }}>
                  <Text>
                    Department Name:{" "}
                    {assessmentDetail &&
                      assessmentDetail.department &&
                      assessmentDetail.department.name}
                  </Text>
                </View>
              </View>
              <View style={{ ...styles.row }}>
                <View style={{ ...styles.col, width: "25%" }}>
                  <Text>
                    Describe the activity or work process. (Inc. how long/ how
                    often this is carried out and quantity substance used)
                  </Text>
                </View>
                <View style={{ ...styles.col, width: "75%" }}>
                  <Text>{assessmentDetail && assessmentDetail.process}</Text>
                </View>
              </View>
              <View style={{ ...styles.row }}>
                <View style={{ ...styles.col, width: "25%" }}>
                  <Text>Location of process being carried out?</Text>
                </View>
                <View style={{ ...styles.col, width: "75%" }}>
                  <Text>
                    {assessmentDetail && assessmentDetail.process_location}
                  </Text>
                </View>
              </View>
              <View style={{ ...styles.row }}>
                <View style={{ ...styles.col, width: "35%" }}>
                  <Text>Identify the persons at risk:</Text>
                </View>
                <View style={{ ...styles.col, width: "65%" }}>
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    {riskPersons.map((riskPerson) => {
                      const isSelected =
                        assessmentDetail &&
                        assessmentDetail.riskPersons.find(
                          (item) => item.id === riskPerson.id
                        );
                      return (
                        <>
                          <View
                            style={{ ...styles.option, marginRight: "8px" }}
                          >
                            <View
                              style={
                                isSelected
                                  ? styles.optionCheckboxActive
                                  : styles.optionCheckbox
                              }
                            >
                              <View
                                style={
                                  isSelected
                                    ? styles.optionCheckboxActiveBg
                                    : {}
                                }
                              ></View>
                            </View>
                            <Text style={styles.optionText}>
                              {riskPerson.name}
                            </Text>
                          </View>
                        </>
                      );
                    })}
                  </View>
                </View>
              </View>
              <View style={{ ...styles.row }}>
                <View style={{ ...styles.col, width: "35%" }}>
                  <Text>
                    Name the substance involved in the process and its
                    manufacturer.(A copy of a current safety data sheet is
                    attached to this assessment)
                  </Text>
                </View>
                <View style={{ ...styles.col, width: "65%" }}>
                  <Text>
                    {assessmentDetail &&
                      assessmentDetail.process_substance_and_manufacturer}
                  </Text>
                </View>
              </View>
              {renderDivider("Classification (state the category of danger)")}
              <View style={{ ...styles.row }}>
                <View style={{ ...styles.col, width: "100%" }}>
                  <View style={{ ...styles.gridContainer }}>
                    {classifications.map((classification) => {
                      const isSelected =
                        assessmentDetail &&
                        assessmentDetail.classifications.find(
                          (item) => item.id === classification.id
                        );
                      return (
                        <>
                          <View style={{ ...styles.gridItem, width: "33.33%" }}>
                            <View style={styles.option}>
                              <View
                                style={
                                  isSelected
                                    ? styles.optionCheckboxActive
                                    : styles.optionCheckbox
                                }
                              >
                                <View
                                  style={
                                    isSelected
                                      ? styles.optionCheckboxActiveBg
                                      : {}
                                  }
                                ></View>
                              </View>
                              <Text style={styles.optionText}>
                                {classification.name}
                              </Text>
                            </View>
                          </View>
                        </>
                      );
                    })}
                  </View>
                </View>
              </View>
              {renderDivider("Hazard Type")}
              <View style={{ ...styles.row }}>
                <View
                  style={{
                    ...styles.col,
                    width: "100%",
                    flexDirection: "column",
                    alignItems: "normal",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    {hazardTypes.map((hazardType) => {
                      const isSelected =
                        assessmentDetail &&
                        assessmentDetail.hazardTypes.find(
                          (item) => item.id === hazardType.id
                        );
                      return (
                        <>
                          <View
                            style={{
                              ...styles.option,
                              flexDirection: "column",
                              marginRight: "8px",
                            }}
                          >
                            <View
                              style={
                                isSelected
                                  ? styles.optionCheckboxActive
                                  : styles.optionCheckbox
                              }
                            >
                              <View
                                style={
                                  isSelected
                                    ? styles.optionCheckboxActiveBg
                                    : {}
                                }
                              ></View>
                            </View>
                            <Text
                              style={{ ...styles.optionText, marginTop: "4px" }}
                            >
                              {hazardType.name}
                            </Text>
                          </View>
                        </>
                      );
                    })}
                  </View>
                  {otherHazardType ? (
                    <View>
                      <Text>{`Other State: ${otherHazardType.CoshhAssessmentHazardType.other_description}`}</Text>
                    </View>
                  ) : (
                    <View></View>
                  )}
                </View>
              </View>
              {renderDivider("Route of Exposure")}
              <View style={{ ...styles.row }}>
                <View
                  style={{
                    ...styles.col,
                    width: "100%",
                    flexDirection: "column",
                    alignItems: "normal",
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    {exposureRoutes.map((exposureRoute) => {
                      const isSelected =
                        assessmentDetail &&
                        assessmentDetail.exposureRoutes.find(
                          (item) => item.id === exposureRoute.id
                        );
                      return (
                        <>
                          <View
                            style={{
                              ...styles.option,
                              flexDirection: "column",
                              marginRight: "8px",
                            }}
                          >
                            <View
                              style={
                                isSelected
                                  ? styles.optionCheckboxActive
                                  : styles.optionCheckbox
                              }
                            >
                              <View
                                style={
                                  isSelected
                                    ? styles.optionCheckboxActiveBg
                                    : {}
                                }
                              ></View>
                            </View>
                            <Text
                              style={{ ...styles.optionText, marginTop: "4px" }}
                            >
                              {exposureRoute.name}
                            </Text>
                          </View>
                        </>
                      );
                    })}
                  </View>
                  {otherExposureRoute ? (
                    <View>
                      <Text>{`Other State: ${otherExposureRoute.CoshhAssessmentExposureRoute.other_description}`}</Text>
                    </View>
                  ) : (
                    <View></View>
                  )}
                </View>
              </View>
              {renderDivider(
                "Workplace Exposure Limits (WELs) please indicate n/a where not applicable"
              )}
              <View style={{ ...styles.row, minHeight: "30px" }}>
                <View style={{ ...styles.col, width: "100%" }}>
                  <Text>
                    {assessmentDetail &&
                      assessmentDetail.workplace_exposure_limits}
                  </Text>
                </View>
              </View>
              {renderDivider(
                "State the Risks to Health & Environment from Identified Hazards"
              )}
              <View style={{ ...styles.row, minHeight: "30px" }}>
                <View style={{ ...styles.col, width: "20%" }}>
                  <Text>Health Risk Rating</Text>
                </View>
                <View
                  style={{
                    ...styles.col,
                    width: "80%",
                    justifyContent: "space-evenly",
                  }}
                >
                  {riskRatings.map((riskRating) => {
                    const isSelected =
                      assessmentDetail &&
                      assessmentDetail.health_risk_rating_id === riskRating.id;
                    return (
                      <>
                        <View style={{ ...styles.option }}>
                          <View
                            style={
                              isSelected
                                ? styles.optionCheckboxActive
                                : styles.optionCheckbox
                            }
                          >
                            <View
                              style={
                                isSelected ? styles.optionCheckboxActiveBg : {}
                              }
                            ></View>
                          </View>
                          <Text style={styles.optionText}>
                            {riskRating.name}
                          </Text>
                        </View>
                      </>
                    );
                  })}
                </View>
              </View>
              <View style={{ ...styles.row, minHeight: "30px" }}>
                <View style={{ ...styles.col, width: "20%" }}>
                  <Text>Environment Risk Rating</Text>
                </View>
                <View
                  style={{
                    ...styles.col,
                    width: "80%",
                    justifyContent: "space-evenly",
                  }}
                >
                  {riskRatings.map((riskRating) => {
                    const isSelected =
                      assessmentDetail &&
                      assessmentDetail.environment_risk_rating_id ===
                        riskRating.id;
                    return (
                      <>
                        <View style={{ ...styles.option }}>
                          <View
                            style={
                              isSelected
                                ? styles.optionCheckboxActive
                                : styles.optionCheckbox
                            }
                          >
                            <View
                              style={
                                isSelected ? styles.optionCheckboxActiveBg : {}
                              }
                            ></View>
                          </View>
                          <Text style={styles.optionText}>
                            {riskRating.name}
                          </Text>
                        </View>
                      </>
                    );
                  })}
                </View>
              </View>
              {renderDivider("Control Measures:")}
              <View style={{ ...styles.row, minHeight: "30px" }}>
                <View
                  style={{
                    ...styles.col,
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <Text>Is health surveillance or monitoring required?</Text>
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <View style={styles.option}>
                      <View
                        style={
                          assessmentDetail &&
                          assessmentDetail.health_surveillance_required
                            ? styles.optionCheckboxActive
                            : styles.optionCheckbox
                        }
                      >
                        <View
                          style={
                            assessmentDetail &&
                            assessmentDetail.health_surveillance_required
                              ? styles.optionCheckboxActiveBg
                              : {}
                          }
                        ></View>
                      </View>
                      <Text style={styles.optionText}>Yes</Text>
                    </View>
                    <View style={{ ...styles.option, marginLeft: "8px" }}>
                      <View
                        style={
                          assessmentDetail &&
                          !assessmentDetail.health_surveillance_required
                            ? styles.optionCheckboxActive
                            : styles.optionCheckbox
                        }
                      >
                        <View
                          style={
                            assessmentDetail &&
                            !assessmentDetail.health_surveillance_required
                              ? styles.optionCheckboxActiveBg
                              : {}
                          }
                        ></View>
                      </View>
                      <Text style={styles.optionText}>No</Text>
                    </View>
                  </View>
                </View>
              </View>
              {renderDivider(
                "Personal Protective Equipment (state type and standard)"
              )}
              <View style={{ ...styles.row, minHeight: "60px" }}>
                <View
                  style={{
                    ...styles.col,
                    width: "100%",
                  }}
                >
                  <View style={{ ...styles.gridContainer }}>
                    {protectiveEquipments.map((protectiveEquipment) => {
                      const isSelected =
                        assessmentDetail &&
                        assessmentDetail.protectiveEquipments.find(
                          (item) => item.id === protectiveEquipment.id
                        );
                      return (
                        <>
                          <View style={{ ...styles.gridItem, width: "33.33%" }}>
                            <View style={styles.option}>
                              <View
                                style={
                                  isSelected
                                    ? styles.optionCheckboxActive
                                    : styles.optionCheckbox
                                }
                              >
                                <View
                                  style={
                                    isSelected
                                      ? styles.optionCheckboxActiveBg
                                      : {}
                                  }
                                ></View>
                              </View>
                              <Text style={styles.optionText}>
                                {protectiveEquipment.name}
                              </Text>
                            </View>
                          </View>
                        </>
                      );
                    })}
                    {otherProtectiveEquipment ? (
                      <View style={{ ...styles.gridItem, width: "33.33%" }}>
                        <Text>{`Other State: ${otherProtectiveEquipment.CoshhAssessmentProtectiveEquipment.other_description}`}</Text>
                      </View>
                    ) : (
                      <View></View>
                    )}
                  </View>
                </View>
              </View>
              {renderDivider("First Aid Measures")}
              <View style={{ ...styles.row, minHeight: "60px" }}>
                <View style={{ ...styles.col, width: "100%" }}>
                  <Text>
                    {assessmentDetail && assessmentDetail.first_aid_measures}
                  </Text>
                </View>
              </View>
              {renderDivider("Storage")}
              <View style={{ ...styles.row, minHeight: "60px" }}>
                <View style={{ ...styles.col, width: "100%" }}>
                  <Text>{assessmentDetail && assessmentDetail.storage}</Text>
                </View>
              </View>
              {renderDivider(
                "Disposal of Substances &amp; Contaminated Containers"
              )}
              <View style={{ ...styles.row }}>
                <View
                  style={{
                    ...styles.col,
                    width: "100%",
                    flexDirection: "column",
                    alignItems: "normal",
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    {substanceDisposalTypes.map((substanceDisposalType) => {
                      const isSelected =
                        assessmentDetail &&
                        assessmentDetail.substancesDisposalTypes.find(
                          (item) => item.id === substanceDisposalType.id
                        );
                      return (
                        <>
                          <View
                            style={{
                              ...styles.option,
                              flexDirection: "column",
                              marginRight: "8px",
                            }}
                          >
                            <View
                              style={
                                isSelected
                                  ? styles.optionCheckboxActive
                                  : styles.optionCheckbox
                              }
                            >
                              <View
                                style={
                                  isSelected
                                    ? styles.optionCheckboxActiveBg
                                    : {}
                                }
                              ></View>
                            </View>
                            <Text
                              style={{ ...styles.optionText, marginTop: "4px" }}
                            >
                              {substanceDisposalType.name}
                            </Text>
                          </View>
                        </>
                      );
                    })}
                  </View>
                  {otherSubstanceDisposalType ? (
                    <View>
                      <Text>{`Other State: ${otherSubstanceDisposalType.CoshhAssessmentSubstanceDisposalType.other_description}`}</Text>
                    </View>
                  ) : (
                    <View></View>
                  )}
                </View>
              </View>
              <View style={{ ...styles.row, minHeight: "30px" }}>
                <View
                  style={{
                    ...styles.col,
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <Text>Is exposure adequately controlled?</Text>
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <View style={styles.option}>
                      <View
                        style={
                          assessmentDetail &&
                          assessmentDetail.exposure_controlled
                            ? styles.optionCheckboxActive
                            : styles.optionCheckbox
                        }
                      >
                        <View
                          style={
                            assessmentDetail &&
                            assessmentDetail.exposure_controlled
                              ? styles.optionCheckboxActiveBg
                              : {}
                          }
                        ></View>
                      </View>
                      <Text style={styles.optionText}>Yes</Text>
                    </View>
                    <View style={{ ...styles.option, marginLeft: "8px" }}>
                      <View
                        style={
                          assessmentDetail &&
                          !assessmentDetail.exposure_controlled
                            ? styles.optionCheckboxActive
                            : styles.optionCheckbox
                        }
                      >
                        <View
                          style={
                            assessmentDetail &&
                            !assessmentDetail.exposure_controlled
                              ? styles.optionCheckboxActiveBg
                              : {}
                          }
                        ></View>
                      </View>
                      <Text style={styles.optionText}>No</Text>
                    </View>
                  </View>
                </View>
              </View>
              {renderDivider("Risk Rating Following Control Measures")}
              <View style={{ ...styles.row, minHeight: "30px" }}>
                <View
                  style={{
                    ...styles.col,
                    width: "100%",
                    justifyContent: "space-evenly",
                  }}
                >
                  {riskRatings.map((riskRating) => {
                    const isSelected =
                      assessmentDetail &&
                      assessmentDetail.risk_rating_id === riskRating.id;
                    return (
                      <>
                        <View style={{ ...styles.option }}>
                          <View
                            style={
                              isSelected
                                ? styles.optionCheckboxActive
                                : styles.optionCheckbox
                            }
                          >
                            <View
                              style={
                                isSelected ? styles.optionCheckboxActiveBg : {}
                              }
                            ></View>
                          </View>
                          <Text style={styles.optionText}>
                            {riskRating.name}
                          </Text>
                        </View>
                      </>
                    );
                  })}
                </View>
              </View>
              <View style={{ ...styles.row }}>
                <View style={{ ...styles.col, width: "33.33%" }}>
                  <Text>Assessed by</Text>
                </View>
                <View style={{ ...styles.col, width: "33.33%" }}>
                  <Text>Date</Text>
                </View>
                <View style={{ ...styles.col, width: "33.33%" }}>
                  <Text>Review Date</Text>
                </View>
              </View>
              <View style={{ ...styles.row, minHeight: "25px" }}>
                <View style={{ ...styles.col, width: "33.33%" }}>
                  <Text></Text>
                </View>
                <View style={{ ...styles.col, width: "33.33%" }}>
                  <Text></Text>
                </View>
                <View style={{ ...styles.col, width: "33.33%" }}>
                  <Text></Text>
                </View>
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
        fileName="Coshh-Assessment-Report.pdf"
      >
        {({ loading }) => (
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
