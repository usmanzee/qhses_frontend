import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Layout } from "antd";

import "./App.less";

import { PrivateRoute } from "./components";

import types from "./redux/types";

import Login from "./pages/login";
import Home from "./pages/home";
import { NotFound } from "./pages/error";
import Main from "./components/layout/main";
import Auth from "./pages/auth";
import Unauthorized from "./pages/unauthorized";

import AddUser from "./pages/users/add_user";
import EditUser from "./pages/users/edit_user";

import Locations from "./pages/locations";

import NcrDashboard from "./pages/ncr/dashboard";
import NcrRecords from "./pages/ncr/records";
import AddNcrRecord from "./pages/ncr/add_record";
import EditNcrRecord from "./pages/ncr/edit_records";

import CalibrationDashboard from "./pages/equipment_calibration/dashboard";
import CalibrationRecords from "./pages/equipment_calibration/records";
import AddCalibrationRecord from "./pages/equipment_calibration/add_record";
import EditCalibrationRecord from "./pages/equipment_calibration/edit_record";

import CustomerSurveyDashboard from "./pages/customer_survey/dashboard";
import CustomerSurveys from "./pages/customer_survey/surveys";
import CustomerSurveyFeedbacks from "./pages/customer_survey/feedbacks";
import CustomerSurveyDetail from "./pages/customer_survey/survey_detail";
import AddCustomerSurvey from "./pages/customer_survey/add_survey";
import EditCustomerSurvey from "./pages/customer_survey/edit_survey";
import AddCustomerSurveyFeedback from "./pages/customer_survey/add_feedback";

import InternalAuditDashboard from "./pages/internal-audit/dashboard";
import InternalAuditSchedule from "./pages/internal-audit/schedule";
import AuditChecklist from "./pages/internal-audit/checklist";
import AuditReport from "./pages/internal-audit/report";

import EmergencyDrillDashboard from "./pages/emergency-drill/dashboard";
import EmergencyDrillSchedule from "./pages/emergency-drill/schedule";
import EmergencyDrillReport from "./pages/emergency-drill/report";
import EmergencyDrillAttendence from "./pages/emergency-drill/attendence";

import AddEnvironmentalActivity from "./pages/environmental_register/add_activity";
import EnvironmentalRecords from "./pages/environmental_register/records";
import AddEnvironmentalRecord from "./pages/environmental_register/add_record";
import EditEnvironmentalRecord from "./pages/environmental_register/edit_record";

import AddHiraHazard from "./pages/hazard_identification/add_hazard";
import HiraRecords from "./pages/hazard_identification/records";
import AddHiraRecord from "./pages/hazard_identification/add_record";
import EditHiraRecord from "./pages/hazard_identification/edit_record";

import EnterpriseRiskAssessments from "./pages/enterprise_risk/assessments";

import LegalRegisters from "./pages/legal_register/register";
import AddLegalRegister from "./pages/legal_register/add_register";

import CoshhAssessments from "./pages/coshh_register/assessments";
import AddCoshhAssessment from "./pages/coshh_register/add_assessment";
import UpdateCoshhAssessment from "./pages/coshh_register/edit_assessment";

import { CoshhAssessmentPdfReport } from "./components";

// import "./assets/styles/theme.less";
import "./assets/styles/main.less";
import { useLocation, useHistory } from "react-router-dom";

import { authAction, logoutAction } from "./redux/actions";
import { useDispatch, useSelector } from "react-redux";

const { Content } = Layout;

const App = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const search = location.search;
  let history = useHistory();
  let urlParams = new URLSearchParams(search);
  const currentUrl = window.location.pathname;
  const isAuthenticated = localStorage.getItem("token") ? true : false;

  useEffect(() => {
    if (urlParams.get("token")) {
      const token = urlParams.get("token");
      //Do Authentication
      if (currentUrl != "/auth") {
        localStorage.setItem("redirectUrl", currentUrl);
        history.push("/auth?token=" + token);
      }
    }
  }, []);

  return (
    <>
      <div className="App">
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/unauthorized" component={Unauthorized} />
          <Route path="/login" component={Login} />
          <Main>
            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <PrivateRoute exact path="/home" component={Home} />
              <PrivateRoute exact path="/users" component={AddUser} />
              <PrivateRoute exact path="/users/edit/:id" component={EditUser} />

              <PrivateRoute exact path="/locations" component={Locations} />

              {/* NCR ROUTES */}
              <PrivateRoute exact path="/ncr" component={NcrDashboard} />
              <PrivateRoute
                exact
                path="/ncr/dashboard"
                component={NcrDashboard}
              />
              <PrivateRoute exact path="/ncr/records" component={NcrRecords} />
              <PrivateRoute
                exact
                path="/ncr/records/add"
                component={AddNcrRecord}
              />
              <PrivateRoute
                exact
                path="/ncr/records/edit/:id"
                component={EditNcrRecord}
              />
              {/* NCR ROUTES END */}

              {/* CALIBRATION ROUTES */}
              <PrivateRoute
                exact
                path="/equipment-calibration"
                component={CalibrationDashboard}
              />
              <PrivateRoute
                exact
                path="/equipment-calibration/dashboard"
                component={CalibrationDashboard}
              />
              <PrivateRoute
                exact
                path="/equipment-calibration/records"
                component={CalibrationRecords}
              />
              <PrivateRoute
                exact
                path="/equipment-calibration/records/add"
                component={AddCalibrationRecord}
              />
              <PrivateRoute
                exact
                path="/equipment-calibration/records/edit/:id"
                component={EditCalibrationRecord}
              />
              {/* CALIBRATION ROUTES END */}

              {/* CSR ROUTES */}
              <PrivateRoute
                exact
                path="/customer-survey"
                component={CustomerSurveyDashboard}
              />
              <PrivateRoute
                exact
                path="/customer-survey/dashboard"
                component={CustomerSurveyDashboard}
              />
              <PrivateRoute
                exact
                path="/customer-survey/surveys"
                component={CustomerSurveys}
              />
              <PrivateRoute
                exact
                path="/customer-survey/feedbacks"
                component={CustomerSurveyFeedbacks}
              />
              <PrivateRoute
                exact
                path="/customer-survey/surveys/detail/:id"
                component={CustomerSurveyDetail}
              />
              <PrivateRoute
                exact
                path="/customer-survey/surveys/add"
                component={AddCustomerSurvey}
              />
              <PrivateRoute
                exact
                path="/customer-survey/surveys/edit/:id"
                component={EditCustomerSurvey}
              />
              <PrivateRoute
                exact
                path="/customer-survey/surveys/:id/feedback"
                component={AddCustomerSurveyFeedback}
              />
              {/* CSR ROUTES END */}

              {/**
               * Internal Audit Routes
               */}

              <PrivateRoute
                exact
                path="/internal-audit"
                component={InternalAuditSchedule}
              />
              <PrivateRoute
                exact
                path="/internal-audit/dashboard"
                component={InternalAuditSchedule}
              />
              <PrivateRoute
                exact
                path="/internal-audit/schedule"
                component={InternalAuditSchedule}
              />
              <PrivateRoute
                exact
                path="/internal-audit/:id/checklist"
                component={AuditChecklist}
              />
              <PrivateRoute
                exact
                path="/internal-audit/:id/report"
                component={AuditReport}
              />

              {/**
               * Internal Audit Routes End
               */}

              {/**
               * Emergency Drill routes
               */}

              <PrivateRoute
                exact
                path="/emergency-drill"
                component={EmergencyDrillSchedule}
              />
              <PrivateRoute
                exact
                path="/emergency-drill/dashboard"
                component={EmergencyDrillSchedule}
              />
              <PrivateRoute
                exact
                path="/emergency-drill/schedule"
                component={EmergencyDrillSchedule}
              />
              <PrivateRoute
                exact
                path="/emergency-drill/:id/report"
                component={EmergencyDrillReport}
              />
              <PrivateRoute
                exact
                path="/emergency-drill/:id/attendence"
                component={EmergencyDrillAttendence}
              />

              {/**
               * Emergency Drill routes End
               */}

              {/**
               * Environmental Register routes
               */}
              <PrivateRoute
                exact
                path="/eair/activities"
                component={AddEnvironmentalActivity}
              />
              <PrivateRoute
                exact
                path="/eair"
                component={EnvironmentalRecords}
              />
              <PrivateRoute
                exact
                path="/eair/records"
                component={EnvironmentalRecords}
              />
              <PrivateRoute
                exact
                path="/eair/records/add"
                component={AddEnvironmentalRecord}
              />
              <PrivateRoute
                exact
                path="/eair/records/edit/:id"
                component={EditEnvironmentalRecord}
              />
              {/**
               * Environmental Register routes End
               */}

              {/**
               * Hazard Identification routes
               */}
              <PrivateRoute
                exact
                path="/hsera/hazards"
                component={AddHiraHazard}
              />
              <PrivateRoute exact path="/hsera" component={HiraRecords} />
              <PrivateRoute
                exact
                path="/hsera/records"
                component={HiraRecords}
              />
              <PrivateRoute
                exact
                path="/hsera/records/add"
                component={AddHiraRecord}
              />
              <PrivateRoute
                exact
                path="/hsera/records/edit/:id"
                component={EditHiraRecord}
              />
              {/**
               * Hazard Identification routes End
               */}

              {/**
               * Enterprise Risk routes
               */}
              <PrivateRoute
                exact
                path="/era"
                component={EnterpriseRiskAssessments}
              />
              <PrivateRoute
                exact
                path="/era/assessments"
                component={EnterpriseRiskAssessments}
              />
              {/**
               * Enterprise Risk routes End
               */}

              {/**
               * Legal Register routes
               */}
              <PrivateRoute
                exact
                path="/legal-register"
                component={LegalRegisters}
              />
              <PrivateRoute
                exact
                path="/legal-register/register"
                component={LegalRegisters}
              />
              <PrivateRoute
                exact
                path="/legal-register/register/add"
                component={AddLegalRegister}
              />
              {/**
               * Legal Register routes End
               */}

              {/**
               * Coshh Register Routes
               */}

              <PrivateRoute exact path="/coshh" component={CoshhAssessments} />
              <PrivateRoute
                exact
                path="/coshh/assessments"
                component={CoshhAssessments}
              />
              <PrivateRoute
                exact
                path="/coshh/assessments/add"
                component={AddCoshhAssessment}
              />
              <PrivateRoute
                exact
                path="/coshh/assessments/:id"
                component={UpdateCoshhAssessment}
              />
              <PrivateRoute
                exact
                path="/coshh/check-pdf"
                component={CoshhAssessmentPdfReport}
              />

              {/**
               * Coshh Register Routes End
               */}

              <PrivateRoute exact path="*" component={NotFound} />
            </Switch>
          </Main>
        </Switch>
      </div>
    </>
  );
};

export default App;
