import { combineReducers } from "redux";
import types from "./types";

import { initialState } from "./initial_state";

const authReducer = (state = initialState.auth, action) => {
  switch (action.type) {
    case types.AUTH_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case types.AUTH_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

const loginReducer = (state = initialState.login, action) => {
  switch (action.type) {
    case types.USER_LOGIN_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case types.USER_LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

const logoutReducer = (state = initialState.login, action) => {
  switch (action.type) {
    case types.USER_LOGOUT_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.USER_LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: false,
      };
    case types.USER_LOGOUT_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

const applicationsReducer = (state = initialState.applications, action) => {
  switch (action.type) {
    case types.APPLICATIONS_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.APPLICATIONS_DATA:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case types.APPLICATIONS_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const userApplicationsReducer = (
  state = initialState.userApplications,
  action
) => {
  switch (action.type) {
    case types.USER_APPLICATIONS_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.USER_APPLICATIONS_DATA:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case types.USER_APPLICATIONS_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const selectedUserApplicationReducer = (
  state = initialState.selectedUserApplication,
  action
) => {
  switch (action.type) {
    case types.SELECTED_USER_APPLICATIONS_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.SELECTED_USER_APPLICATIONS_DATA:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case types.SELECTED_USER_APPLICATIONS_ERROR:
      return {
        ...state,
        loading: false,
      };
    case types.SELECTED_USER_APPLICATIONS_RESET:
      return {
        ...state,
        data: null,
      };
    default:
      return state;
  }
};

const applicationMenuReducer = (
  state = initialState.applicationMenu,
  action
) => {
  switch (action.type) {
    case types.APPLICATION_MENU_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.APPLICATION_MENU_DATA:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case types.APPLICATION_MENU_ERROR:
      return {
        ...state,
        loading: false,
      };
    case types.APPLICATION_MENU_RESET:
      return {
        ...state,
        list: [],
      };
    default:
      return state;
  }
};

const userApplicationMenuReducer = (
  state = initialState.userApplicationMenu,
  action
) => {
  switch (action.type) {
    case types.USER_APPLICATION_MENU_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.USER_APPLICATION_MENU_DATA:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case types.USER_APPLICATION_MENU_ERROR:
      return {
        ...state,
        loading: false,
      };
    case types.USER_APPLICATION_MENU_RESET:
      return {
        ...state,
        list: [],
      };
    default:
      return state;
  }
};

const userApplicationRoleReducer = (
  state = initialState.userApplicationRole,
  action
) => {
  switch (action.type) {
    case types.USER_APPLICATION_ROLE_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.USER_APPLICATION_ROLE_DATA:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case types.USER_APPLICATION_ROLE_ERROR:
      return {
        ...state,
        loading: false,
      };
    case types.USER_APPLICATION_ROLE_RESET:
      return {
        ...state,
        data: null,
      };
    default:
      return state;
  }
};

const profileReducer = (state = initialState.profile, action) => {
  switch (action.type) {
    case types.USER_PROFILE_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.USER_PROFILE_DATA:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case types.USER_PROFILE_ERROR:
      return {
        ...state,
        loading: false,
      };
    case types.USER_PROFILE_RESET:
      return {
        ...state,
        data: null,
      };
    default:
      return state;
  }
};

const recordReducer = (state = initialState.records, action) => {
  switch (action.type) {
    case types.NCR_RECORD_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.NCR_RECORD_DATA:
      return {
        ...state,
        loading: false,
        // rowsCount: action.payload.count,
        // list: action.payload.rows,
        list: action.payload,
      };
    case types.NCR_RECORD_ERROR:
      return {
        ...state,
        loading: false,
      };
    case types.NCR_RECORD_RESET:
      return {
        ...state,
        loading: false,
        list: [],
      };
    case types.NCR_RECORD_DETAIL_FETCH:
      return {
        ...state,
        recordDetailLoading: true,
      };
    case types.NCR_RECORD_DETAIL_DATA:
      return {
        ...state,
        recordDetailLoading: false,
        recordDetail: action.payload,
      };
    case types.NCR_RECORD_DETAIL_ERROR:
      return {
        ...state,
        recordDetailLoading: false,
      };
    case types.NCR_RECORD_DETAIL_RESET:
      return {
        ...state,
        recordDetailLoading: false,
        recordDetail: null,
      };
    case types.NCR_ADD_RECORD_FETCH:
      return {
        ...state,
        addRecordLoading: true,
      };
    case types.NCR_ADD_RECORD_SUCCESS:
      return {
        ...state,
        addRecordLoading: false,
        addRecordSuccess: true,
        list: [action.payload, ...state.list],
      };
    case types.NCR_ADD_RECORD_ERROR:
      return {
        ...state,
        addRecordLoading: false,
      };
    case types.NCR_UPDATE_RECORD_FETCH:
      return {
        ...state,
        updateRecordLoading: true,
      };
    case types.NCR_UPDATE_RECORD_SUCCESS:
      const index = state.list.findIndex(
        (item) => item.id === action.payload.id
      );
      let records = [...state.list];
      records[index] = action.payload;

      return {
        ...state,
        updateRecordLoading: false,
        updateRecordSuccess: true,
        list: records,
        recordDetail: action.payload,
      };
    case types.NCR_UPDATE_RECORD_ERROR:
      return {
        ...state,
        updateRecordLoading: false,
      };
    case types.NCR_ALL_RECORDS_FETCH:
      return {
        ...state,
        allListloading: true,
      };
    case types.NCR_ALL_RECORDS_DATA:
      return {
        ...state,
        allListloading: false,
        allList: action.payload,
      };
    case types.NCR_ALL_RECORDS_ERROR:
      return {
        ...state,
        allListloading: false,
      };
    case types.NCR_ALL_RECORDS_RESET:
      return {
        ...state,
        allListloading: false,
        allList: [],
      };
    default:
      return state;
  }
};

const usersReducer = (state = initialState.users, action) => {
  switch (action.type) {
    case types.USERS_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.USERS_DATA:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case types.USERS_ERROR:
      return {
        ...state,
        loading: false,
      };
    case types.ADD_USER_FETCH:
      return {
        ...state,
        addUserLoading: true,
      };
    case types.ADD_USER_SUCCESS:
      return {
        ...state,
        addUserLoading: false,
        addUserSuccess: true,
        list: [...state.list, action.payload],
      };
    case types.ADD_USER_ERROR:
      return {
        ...state,
        addUserLoading: false,
        addUserError: false,
      };
    case types.UPDATE_USER_FETCH:
      return {
        ...state,
        updateUserLoading: true,
      };
    case types.UPDATE_USER_SUCCESS:
      return {
        ...state,
        updateUserLoading: false,
        updateUserSuccess: true,
        userDetail: action.payload,
        // list: [...state.list, action.payload],
      };
    case types.UPDATE_USER_ERROR:
      return {
        ...state,
        updateUserLoading: false,
        updateUserError: false,
      };
    case types.USER_DETAIL_FETCH:
      return {
        ...state,
        userDetailLoading: true,
      };
    case types.USER_DETAIL_DATA:
      return {
        ...state,
        userDetailLoading: false,
        userDetail: action.payload,
      };
    case types.USER_DETAIL_ERROR:
      return {
        ...state,
        userDetailLoading: false,
      };
    default:
      return state;
  }
};

const rolesReducer = (state = initialState.roles, action) => {
  switch (action.type) {
    case types.ROLES_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.ROLES_DATA:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case types.ROLES_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
const employeesReducer = (state = initialState.employees, action) => {
  switch (action.type) {
    case types.EMPLOYEES_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.EMPLOYEES_DATA:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case types.EMPLOYEES_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const componiesReducer = (state = initialState.companies, action) => {
  switch (action.type) {
    case types.COMPANIES_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.COMPANIES_DATA:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case types.COMPANIES_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const userComponiesReducer = (state = initialState.userCompanies, action) => {
  switch (action.type) {
    case types.USER_COMPANIES_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.USER_COMPANIES_DATA:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case types.USER_COMPANIES_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const departmentsReducer = (state = initialState.deprtments, action) => {
  switch (action.type) {
    case types.DEPARTMENTS_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.DEPARTMENTS_DATA:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case types.DEPARTMENTS_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const categoriesReducer = (state = initialState.categories, action) => {
  switch (action.type) {
    case types.CATEGORIES_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.CATEGORIES_DATA:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case types.CATEGORIES_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const areasReducer = (state = initialState.areas, action) => {
  switch (action.type) {
    case types.AREAS_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.AREAS_DATA:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case types.AREAS_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const sourcesReducer = (state = initialState.sources, action) => {
  switch (action.type) {
    case types.SOURCES_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.SOURCES_DATA:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case types.SOURCES_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const ncTypesReducer = (state = initialState.ncTypes, action) => {
  switch (action.type) {
    case types.NC_TYPES_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.NC_TYPES_DATA:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case types.NC_TYPES_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const managementSystemsReducer = (
  state = initialState.managementSystems,
  action
) => {
  switch (action.type) {
    case types.MANAGEMENT_SYSTEMS_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.MANAGEMENT_SYSTEMS_DATA:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case types.MANAGEMENT_SYSTEMS_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const statusesReducer = (state = initialState.statuses, action) => {
  switch (action.type) {
    case types.STATUSES_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.STATUSES_DATA:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case types.STATUSES_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const monthsReducer = (state = initialState.months, action) => {
  switch (action.type) {
    case types.MONTHS_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.MONTHS_DATA:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case types.MONTHS_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const auditFindingsReducer = (state = initialState.auditFindings, action) => {
  switch (action.type) {
    case types.AUDIT_FINDINGS_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.AUDIT_FINDINGS_DATA:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case types.AUDIT_FINDINGS_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const addRecordReducer = (state = initialState.records, action) => {
  switch (action.type) {
    case types.NCR_ADD_RECORD_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.NCR_ADD_RECORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case types.NCR_ADD_RECORD_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const ncrByMonthReducer = (state = initialState.ncrByMonth, action) => {
  switch (action.type) {
    case types.NCR_BY_MONTH_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.NCR_BY_MONTH_DATA:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case types.NCR_BY_MONTH_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const ncrByDepartmentReducer = (
  state = initialState.ncrByDepartment,
  action
) => {
  switch (action.type) {
    case types.NCR_BY_DEPARTMENT_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.NCR_BY_DEPARTMENT_DATA:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case types.NCR_BY_DEPARTMENT_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
const ncrByStatusReducer = (state = initialState.ncrByStatus, action) => {
  switch (action.type) {
    case types.NCR_BY_STATUS_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.NCR_BY_STATUS_DATA:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case types.NCR_BY_STATUS_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
const ncrByStatusAndMonthReducer = (
  state = initialState.ncrByStatusAndMonth,
  action
) => {
  switch (action.type) {
    case types.NCR_BY_STATUS_AND_MONTH_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.NCR_BY_STATUS_AND_MONTH_DATA:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case types.NCR_BY_STATUS_AND_MONTH_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
const ncrByCompanyReducer = (state = initialState.ncrByCompany, action) => {
  switch (action.type) {
    case types.NCR_BY_COMPANY_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.NCR_BY_COMPANY_DATA:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case types.NCR_BY_COMPANY_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const calibrationRecordReducer = (state = initialState.records, action) => {
  switch (action.type) {
    case types.CALIBRATION_RECORD_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.CALIBRATION_RECORD_DATA:
      return {
        ...state,
        loading: false,
        // rowsCount: action.payload.count,
        // list: action.payload.rows,
        list: action.payload,
      };
    case types.CALIBRATION_RECORD_ERROR:
      return {
        ...state,
        loading: false,
      };
    case types.CALIBRATION_RECORD_RESET:
      return {
        ...state,
        loading: false,
        list: [],
      };
    case types.CALIBRATION_RECORD_DETAIL_FETCH:
      return {
        ...state,
        recordDetailLoading: true,
      };
    case types.CALIBRATION_RECORD_DETAIL_DATA:
      return {
        ...state,
        recordDetailLoading: false,
        recordDetail: action.payload,
      };
    case types.CALIBRATION_RECORD_DETAI_ERROR:
      return {
        ...state,
        recordDetailLoading: false,
      };
    case types.CALIBRATION_RECORD_DETAIL_RESET:
      return {
        ...state,
        recordDetailLoading: false,
        recordDetail: null,
      };
    case types.CALIBRATION_ADD_RECORD_FETCH:
      return {
        ...state,
        addRecordLoading: true,
      };
    case types.CALIBRATION_ADD_RECORD_SUCCESS:
      return {
        ...state,
        addRecordLoading: false,
        addRecordSuccess: true,
        list: [action.payload, ...state.list],
      };
    case types.CALIBRATION_ADD_RECORD_ERROR:
      return {
        ...state,
        addRecordLoading: false,
      };
    case types.CALIBRATION_UPDATE_RECORD_FETCH:
      return {
        ...state,
        updateRecordLoading: true,
      };
    case types.CALIBRATION_UPDATE_RECORD_SUCCESS:
      const index = state.list.findIndex(
        (item) => item.id === action.payload.id
      );
      let records = [...state.list];
      records[index] = action.payload;

      return {
        ...state,
        updateRecordLoading: false,
        updateRecordSuccess: true,
        list: records,
        recordDetail: action.payload,
      };
    case types.CALIBRATION_UPDATE_RECORD_ERROR:
      return {
        ...state,
        updateRecordLoading: false,
      };
    default:
      return state;
  }
};

const frequenciesReducer = (state = initialState.frequencies, action) => {
  switch (action.type) {
    case types.FREQUENCIES_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.FREQUENCIES_DATA:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case types.FREQUENCIES_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const dueCalibrationByMonthReducer = (
  state = initialState.dueCalibrationByMonth,
  action
) => {
  switch (action.type) {
    case types.DUE_CALIBRATION_BY_MONTH_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.DUE_CALIBRATION_BY_MONTH_DATA:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case types.DUE_CALIBRATION_BY_MONTH_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const calibrationByFrequencyReducer = (
  state = initialState.calibrationByFrequency,
  action
) => {
  switch (action.type) {
    case types.CALIBRATION_BY_FREQUENCY_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.CALIBRATION_BY_FREQUENCY_DATA:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case types.CALIBRATION_BY_FREQUENCY_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const calibrationAllRecordsReducer = (
  state = initialState.calibrationAllRecords,
  action
) => {
  switch (action.type) {
    case types.CALIBRATION_ALL_RECORDS_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.CALIBRATION_ALL_RECORDS_DATA:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case types.CALIBRATION_ALL_RECORDS_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const yearsReducer = (state = initialState.years, action) => {
  switch (action.type) {
    case types.YEARS_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.YEARS_DATA:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case types.YEARS_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
const quatersReducer = (state = initialState.quaters, action) => {
  switch (action.type) {
    case types.QUATERS_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.QUATERS_DATA:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case types.QUATERS_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
const aspectReducer = (state = initialState.aspects, action) => {
  switch (action.type) {
    case types.ASPECTS_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.ASPECTS_DATA:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case types.ASPECTS_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const surveysReducer = (state = initialState.surveys, action) => {
  switch (action.type) {
    case types.SURVEYS_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.SURVEYS_DATA:
      return {
        ...state,
        loading: false,
        // rowsCount: action.payload.count,
        // list: action.payload.rows,
        list: action.payload,
      };
    case types.SURVEYS_ERROR:
      return {
        ...state,
        loading: false,
      };
    case types.SURVEYS_RESET:
      return {
        ...state,
        loading: false,
        list: [],
      };
    case types.SURVEY_DETAIL_FETCH:
      return {
        ...state,
        surveyDetailLoading: true,
      };
    case types.SURVEY_DETAIL_DATA:
      return {
        ...state,
        surveyDetailLoading: false,
        surveyDetail: action.payload,
      };
    case types.SURVEY_DETAIL_ERROR:
      return {
        ...state,
        surveyDetailLoading: false,
      };
    case types.SURVEY_DETAIL_RESET:
      return {
        ...state,
        surveyDetailLoading: false,
        surveyDetail: null,
      };
    case types.ADD_SURVEY_FETCH:
      return {
        ...state,
        addSurveyLoading: true,
      };
    case types.ADD_SURVEY_SUCCESS:
      return {
        ...state,
        addSurveyLoading: false,
        addSurveySuccess: true,
        list: [action.payload, ...state.list],
      };
    case types.ADD_SURVEY_ERROR:
      return {
        ...state,
        addSurveyLoading: false,
      };
    case types.UPDATE_SURVEY_FETCH:
      return {
        ...state,
        updateSurveyLoading: true,
      };
    case types.UPDATE_SURVEY_SUCCESS:
      const index = state.list.findIndex(
        (item) => item.id === action.payload.id
      );
      let records = [...state.list];
      records[index] = action.payload;

      return {
        ...state,
        updateSurveyLoading: false,
        updateSurveySuccess: true,
        list: records,
        surveyDetail: action.payload,
      };
    case types.UPDATE_SURVEY_ERROR:
      return {
        ...state,
        updateSurveyLoading: false,
      };
    case types.ADD_SURVEY_FEEDBACK_FETCH:
      return {
        ...state,
        addSurveyFeedbackLoading: true,
      };
    case types.ADD_SURVEY_FEEDBACK_SUCCESS:
      // const surveyIndex = state.list.findIndex(
      //   (item) => item.id === action.payload.id
      // );
      // let surveysRecords = [...state.list];
      // surveysRecords[surveyIndex] = action.payload;

      return {
        ...state,
        addSurveyFeedbackLoading: false,
        addSurveyFeedbackSuccess: true,
        // list: surveysRecords,
        surveyDetail: action.payload,
      };
    case types.ADD_SURVEY_FEEDBACK_ERROR:
      return {
        ...state,
        addSurveyFeedbackLoading: false,
      };
    default:
      return state;
  }
};

const auditStatusesReducer = (state = initialState.auditStatuses, action) => {
  switch (action.type) {
    case types.AUDIT_STATUSES_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.AUDIT_STATUSES_DATA:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case types.AUDIT_STATUSES_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const findingTypesReducer = (state = initialState.findingTypes, action) => {
  switch (action.type) {
    case types.FINDING_TYPES_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.FINDING_TYPES_DATA:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case types.FINDING_TYPES_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const auditsReducer = (state = initialState.audits, action) => {
  switch (action.type) {
    case types.AUDITS_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.AUDITS_DATA:
      return {
        ...state,
        loading: false,
        // rowsCount: action.payload.count,
        // list: action.payload.rows,
        list: action.payload,
      };
    case types.AUDITS_ERROR:
      return {
        ...state,
        loading: false,
      };
    case types.AUDITS_RESET:
      return {
        ...state,
        loading: false,
        list: [],
      };
    case types.AUDIT_DETAIL_FETCH:
      return {
        ...state,
        auditDetailLoading: true,
      };
    case types.AUDIT_DETAIL_DATA:
      return {
        ...state,
        auditDetailLoading: false,
        auditDetail: action.payload,
      };
    case types.AUDIT_DETAIL_ERROR:
      return {
        ...state,
        auditDetailLoading: false,
      };
    case types.AUDIT_DETAIL_RESET:
      return {
        ...state,
        auditDetailLoading: false,
        auditDetail: null,
      };
    case types.ADD_AUDIT_FETCH:
      return {
        ...state,
        addAuditLoading: true,
      };
    case types.ADD_AUDIT_SUCCESS:
      return {
        ...state,
        addAuditLoading: false,
        addAuditSuccess: true,
        list: [...state.list, action.payload],
      };
    case types.ADD_AUDIT_ERROR:
      return {
        ...state,
        addAuditLoading: false,
      };
    case types.UPDATE_AUDIT_FETCH:
      return {
        ...state,
        updateAuditLoading: true,
      };
    case types.UPDATE_AUDIT_SUCCESS:
      const updateAuditIndex = state.list.findIndex(
        (item) => item.id === action.payload.id
      );
      let updateAuditRecords = [...state.list];
      updateAuditRecords[updateAuditIndex] = action.payload;

      return {
        ...state,
        updateAuditLoading: false,
        updateAuditSuccess: true,
        list: updateAuditRecords,
        auditDetail: action.payload,
      };
    case types.UPDATE_AUDIT_ERROR:
      return {
        ...state,
        updateAuditLoading: false,
      };
    case types.ADD_AUDIT_NOTIFICATION_FETCH:
      return {
        ...state,
        addAuditNotificationLoading: true,
      };
    case types.ADD_AUDIT_NOTIFICATION_SUCCESS:
      const index = state.list.findIndex(
        (item) => item.id === action.payload.id
      );
      let records = [...state.list];
      records[index] = action.payload;

      return {
        ...state,
        addAuditNotificationLoading: false,
        addAuditNotificationSuccess: true,
        list: records,
        auditDetail: action.payload,
      };
    case types.ADD_AUDIT_NOTIFICATION_ERROR:
      return {
        ...state,
        addAuditNotificationLoading: false,
      };
    case types.ADD_AUDIT_CHECKLIST_FETCH:
      return {
        ...state,
        addAuditChecklistLoading: true,
        addAuditChecklistSuccess: false,
      };
    case types.ADD_AUDIT_CHECKLIST_SUCCESS:
      const changedIndex = state.list.findIndex(
        (item) => item.id === action.payload.id
      );
      let updatedRecords = [...state.list];
      updatedRecords[changedIndex] = action.payload;

      return {
        ...state,
        addAuditChecklistLoading: false,
        addAuditChecklistSuccess: true,
        list: updatedRecords,
        auditDetail: action.payload,
      };
    case types.ADD_AUDIT_CHECKLIST_ERROR:
      return {
        ...state,
        addAuditChecklistLoading: false,
      };
    case types.UPDATE_AUDIT_CHECKLIST_FETCH:
      return {
        ...state,
        updateAuditChecklistLoading: true,
        updateAuditChecklistSuccess: false,
      };
    case types.UPDATE_AUDIT_CHECKLIST_SUCCESS:
      const updateIndex = state.list.findIndex(
        (item) => item.id === action.payload.id
      );
      let recordsAfterUpdate = [...state.list];
      recordsAfterUpdate[updateIndex] = action.payload;

      return {
        ...state,
        updateAuditChecklistLoading: false,
        updateAuditChecklistSuccess: true,
        list: recordsAfterUpdate,
        auditDetail: action.payload,
      };
    case types.UPDATE_AUDIT_CHECKLIST_ERROR:
      return {
        ...state,
        updateAuditChecklistLoading: false,
      };
    case types.DELETE_AUDIT_CHECKLIST_FETCH:
      return {
        ...state,
        deleteAuditChecklistLoading: true,
        deleteAuditChecklistSuccess: false,
      };
    case types.DELETE_AUDIT_CHECKLIST_SUCCESS:
      const deleteIndex = state.list.findIndex(
        (item) => item.id === action.payload.id
      );
      let recordsAfterDelete = [...state.list];
      recordsAfterDelete[deleteIndex] = action.payload;

      return {
        ...state,
        deleteAuditChecklistLoading: false,
        deleteAuditChecklistSuccess: true,
        list: recordsAfterDelete,
        auditDetail: action.payload,
      };
    case types.DELETE_AUDIT_CHECKLIST_ERROR:
      return {
        ...state,
        deleteAuditChecklistLoading: false,
      };
    default:
      return state;
  }
};

const surveyReminderReducer = (state = initialState.surveyReminder, action) => {
  switch (action.type) {
    case types.SEND_SURVEY_REMINDER_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.SEND_SURVEY_REMINDER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case types.SEND_SURVEY_REMINDER_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

const surveyRatingByAspectAndYearReducer = (
  state = initialState.surveyRatingByAspectAndYear,
  action
) => {
  switch (action.type) {
    case types.SURVEY_RATING_BY_ASPECT_YEAR_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.SURVEY_RATING_BY_ASPECT_YEAR_DATA:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case types.SURVEY_RATING_BY_ASPECT_YEAR_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
const surveyRatingByCompanyAndYearReducer = (
  state = initialState.surveyRatingByCompanyAndYear,
  action
) => {
  switch (action.type) {
    case types.SURVEY_RATING_BY_COMPANY_YEAR_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.SURVEY_RATING_BY_COMPANY_YEAR_DATA:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case types.SURVEY_RATING_BY_COMPANY_YEAR_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
const allSurveysDataReducer = (state = initialState.allSurveysData, action) => {
  switch (action.type) {
    case types.ALL_SURVEYS_DATA_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.ALL_SURVEYS_DATA_DATA:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case types.ALL_SURVEYS_DATA_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const locationsReducer = (state = initialState.locations, action) => {
  switch (action.type) {
    case types.LOCATIONS_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.LOCATIONS_DATA:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case types.LOCATIONS_ERROR:
      return {
        ...state,
        loading: false,
      };
    case types.ADD_LOCATION_FETCH:
      return {
        ...state,
        addLoading: true,
      };
    case types.ADD_LOCATION_SUCCESS:
      return {
        ...state,
        addLoading: false,
        addSuccess: true,
        list: [...state.list, action.payload],
      };
    case types.ADD_LOCATION_ERROR:
      return {
        ...state,
        addLoading: false,
        addSuccess: false,
        addError: true,
      };
    default:
      return state;
  }
};

const emergencyDrillTypesReducer = (
  state = initialState.emergencyDrillTypes,
  action
) => {
  switch (action.type) {
    case types.EMERGENCY_DRILL_TYPES_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.EMERGENCY_DRILL_TYPES_DATA:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case types.EMERGENCY_DRILL_TYPES_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
const drillAttendenceEmployeesReducer = (
  state = initialState.drillAttendenceEmployees,
  action
) => {
  switch (action.type) {
    case types.DRILL_ATTENDENCE_EMPLOYEES_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.DRILL_ATTENDENCE_EMPLOYEES_DATA:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case types.DRILL_ATTENDENCE_EMPLOYEES_ERROR:
      return {
        ...state,
        loading: false,
      };
    case types.SAVE_EMPLOYEE_ATTENDENCE_FETCH:
      return {
        ...state,
        saveAttendenceLoading: true,
      };
    case types.SAVE_EMPLOYEE_ATTENDENCE_SUCCESS:
      return {
        ...state,
        saveAttendenceLoading: false,
        saveAttendenceSuccess: true,
        list: action.payload,
      };
    case types.SAVE_EMPLOYEE_ATTENDENCE_ERROR:
      return {
        ...state,
        saveAttendenceLoading: false,
      };
    default:
      return state;
  }
};

const emergencyDrillsReducer = (
  state = initialState.emergencyDrills,
  action
) => {
  switch (action.type) {
    case types.EMERGENCY_DRILLS_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.EMERGENCY_DRILLS_DATA:
      return {
        ...state,
        loading: false,
        // rowsCount: action.payload.count,
        // list: action.payload.rows,
        list: action.payload,
      };
    case types.EMERGENCY_DRILLS_ERROR:
      return {
        ...state,
        loading: false,
      };
    case types.EMERGENCY_DRILLS_RESET:
      return {
        ...state,
        loading: false,
        list: [],
      };
    case types.EMERGENCY_DRILL_DETAIL_FETCH:
      return {
        ...state,
        drillDetailLoading: true,
      };
    case types.EMERGENCY_DRILL_DETAIL_DATA:
      return {
        ...state,
        drillDetailLoading: false,
        drillDetail: action.payload,
      };
    case types.EMERGENCY_DRILL_DETAIL_ERROR:
      return {
        ...state,
        drillDetailLoading: false,
      };
    case types.EMERGENCY_DRILL_DETAIL_RESET:
      return {
        ...state,
        drillDetailLoading: false,
        drillDetail: null,
      };
    case types.ADD_EMERGENCY_DRILL_FETCH:
      return {
        ...state,
        addDrillLoading: true,
      };
    case types.ADD_EMERGENCY_DRILL_SUCCESS:
      return {
        ...state,
        addDrillLoading: false,
        addDrillSuccess: true,
        list: [...state.list, action.payload],
      };
    case types.ADD_EMERGENCY_DRILL_ERROR:
      return {
        ...state,
        addDrillLoading: false,
      };
    case types.ADD_EMERGENCY_DRILL_NOTIFICATION_FETCH:
      return {
        ...state,
        addDrillNotificationLoading: true,
      };
    case types.ADD_EMERGENCY_DRILL_NOTIFICATION_SUCCESS:
      const index = state.list.findIndex(
        (item) => item.id === action.payload.id
      );
      let records = [...state.list];
      records[index] = action.payload;

      return {
        ...state,
        addDrillNotificationLoading: false,
        addDrillNotificationSuccess: true,
        list: records,
        drillDetail: action.payload,
      };
    case types.ADD_EMERGENCY_DRILL_NOTIFICATION_ERROR:
      return {
        ...state,
        addDrillNotificationLoading: false,
      };

    case types.UPDATE_EMERGENCY_DRILL_FETCH:
      return {
        ...state,
        updateDrillLoading: true,
        updateDrillSuccess: false,
      };
    case types.UPDATE_EMERGENCY_DRILL_SUCCESS:
      const updateIndex = state.list.findIndex(
        (item) => item.id === action.payload.id
      );
      let recordsAfterUpdate = [...state.list];
      recordsAfterUpdate[updateIndex] = action.payload;

      return {
        ...state,
        updateDrillLoading: false,
        updateDrillSuccess: true,
        list: recordsAfterUpdate,
        drillDetail: action.payload,
      };
    case types.UPDATE_EMERGENCY_DRILL_ERROR:
      return {
        ...state,
        updateDrillLoading: false,
        updateDrillError: true,
      };
    default:
      return state;
  }
};

const environmentalProbabilitiesReducer = (
  state = initialState.environmentalProbabilities,
  action
) => {
  switch (action.type) {
    case types.ENVIRONMENTAL_PROBABILITYS_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.ENVIRONMENTAL_PROBABILITYS_DATA:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case types.ENVIRONMENTAL_PROBABILITYS_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
const environmentalSeveritiesReducer = (
  state = initialState.environmentalSeverities,
  action
) => {
  switch (action.type) {
    case types.ENVIRONMENTAL_SEVERITYS_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.ENVIRONMENTAL_SEVERITYS_DATA:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case types.ENVIRONMENTAL_SEVERITYS_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
const environmentalActivitiesReducer = (
  state = initialState.environmentalActivities,
  action
) => {
  switch (action.type) {
    case types.ENVIRONMENTAL_ACTIVITIES_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.ENVIRONMENTAL_ACTIVITIES_DATA:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case types.ENVIRONMENTAL_ACTIVITIES_ERROR:
      return {
        ...state,
        loading: false,
      };
    case types.ADD_ENVIRONMENTAL_ACTIVITY_FETCH:
      return {
        ...state,
        addLoading: true,
      };
    case types.ADD_ENVIRONMENTAL_ACTIVITY_SUCCESS:
      return {
        ...state,
        addLoading: false,
        addSuccess: true,
        list: [...state.list, action.payload],
      };
    case types.ADD_ENVIRONMENTAL_ACTIVITY_ERROR:
      return {
        ...state,
        addLoading: false,
        addSuccess: false,
        addError: true,
      };
    default:
      return state;
  }
};

const environmentalRecordsReducer = (
  state = initialState.environmentalRecords,
  action
) => {
  switch (action.type) {
    case types.ENVIRONMENTAL_RECORDS_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.ENVIRONMENTAL_RECORDS_DATA:
      return {
        ...state,
        loading: false,
        // rowsCount: action.payload.count,
        // list: action.payload.rows,
        list: action.payload,
      };
    case types.ENVIRONMENTAL_RECORDS_ERROR:
      return {
        ...state,
        loading: false,
      };
    case types.ENVIRONMENTAL_RECORDS_RESET:
      return {
        ...state,
        loading: false,
        list: [],
      };
    case types.ENVIRONMENTAL_RECORD_DETAIL_FETCH:
      return {
        ...state,
        detailLoading: true,
      };
    case types.ENVIRONMENTAL_RECORD_DETAIL_DATA:
      return {
        ...state,
        detailLoading: false,
        detail: action.payload,
      };
    case types.ENVIRONMENTAL_RECORD_DETAIL_ERROR:
      return {
        ...state,
        detailLoading: false,
      };
    case types.ENVIRONMENTAL_RECORD_DETAIL_RESET:
      return {
        ...state,
        detailLoading: false,
        detail: null,
      };
    case types.ADD_ENVIRONMENTAL_RECORD_FETCH:
      return {
        ...state,
        addLoading: true,
      };
    case types.ADD_ENVIRONMENTAL_RECORD_SUCCESS:
      return {
        ...state,
        addLoading: false,
        addSuccess: true,
        list: [...state.list, action.payload],
      };
    case types.ADD_ENVIRONMENTAL_RECORD_ERROR:
      return {
        ...state,
        addLoading: false,
      };
    case types.UPDATE_ENVIRONMENTAL_RECORD_FETCH:
      return {
        ...state,
        updateLoading: true,
      };
    case types.UPDATE_ENVIRONMENTAL_RECORD_SUCCESS:
      const index = state.list.findIndex(
        (item) => item.id === action.payload.id
      );
      let records = [...state.list];
      records[index] = action.payload;

      return {
        ...state,
        updateLoading: false,
        updateSuccess: true,
        list: records,
        detail: action.payload,
      };
    case types.UPDATE_ENVIRONMENTAL_RECORD_ERROR:
      return {
        ...state,
        updateLoading: false,
      };
    default:
      return state;
  }
};

const faceTerminalsReducer = (state = initialState.faceTerminals, action) => {
  switch (action.type) {
    case types.FACE_TERMINALS_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.FACE_TERMINALS_DATA:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case types.FACE_TERMINALS_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const hiraProbabilitiesReducer = (
  state = initialState.hiraProbabilities,
  action
) => {
  switch (action.type) {
    case types.HIRA_PROBABILITYS_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.HIRA_PROBABILITYS_DATA:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case types.HIRA_PROBABILITYS_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const hiraSeveritiesReducer = (state = initialState.hiraSeverities, action) => {
  switch (action.type) {
    case types.HIRA_SEVERITYS_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.HIRA_SEVERITYS_DATA:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case types.HIRA_SEVERITYS_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
const hiraEntitiesReducer = (state = initialState.hiraEntities, action) => {
  switch (action.type) {
    case types.HIRA_ENTITIES_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.HIRA_ENTITIES_DATA:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case types.HIRA_ENTITIES_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
const hiraHazardsReducer = (state = initialState.hiraHazards, action) => {
  switch (action.type) {
    case types.HIRA_HAZARDS_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.HIRA_HAZARDS_DATA:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case types.HIRA_HAZARDS_ERROR:
      return {
        ...state,
        loading: false,
      };
    case types.ADD_HIRA_HAZARD_FETCH:
      return {
        ...state,
        addLoading: true,
      };
    case types.ADD_HIRA_HAZARD_SUCCESS:
      return {
        ...state,
        addLoading: false,
        addSuccess: true,
        list: [...state.list, action.payload],
      };
    case types.ADD_HIRA_HAZARD_ERROR:
      return {
        ...state,
        addLoading: false,
        addSuccess: false,
        addError: true,
      };
    default:
      return state;
  }
};

const hiraRecordsReducer = (state = initialState.hiraRecords, action) => {
  switch (action.type) {
    case types.HIRA_RECORDS_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.HIRA_RECORDS_DATA:
      return {
        ...state,
        loading: false,
        // rowsCount: action.payload.count,
        // list: action.payload.rows,
        list: action.payload,
      };
    case types.HIRA_RECORDS_ERROR:
      return {
        ...state,
        loading: false,
      };
    case types.HIRA_RECORDS_RESET:
      return {
        ...state,
        loading: false,
        list: [],
      };
    case types.HIRA_RECORD_DETAIL_FETCH:
      return {
        ...state,
        detailLoading: true,
      };
    case types.HIRA_RECORD_DETAIL_DATA:
      return {
        ...state,
        detailLoading: false,
        detail: action.payload,
      };
    case types.HIRA_RECORD_DETAIL_ERROR:
      return {
        ...state,
        detailLoading: false,
      };
    case types.HIRA_RECORD_DETAIL_RESET:
      return {
        ...state,
        detailLoading: false,
        detail: null,
      };
    case types.ADD_HIRA_RECORD_FETCH:
      return {
        ...state,
        addLoading: true,
      };
    case types.ADD_HIRA_RECORD_SUCCESS:
      return {
        ...state,
        addLoading: false,
        addSuccess: true,
        list: [...state.list, action.payload],
      };
    case types.ADD_HIRA_RECORD_ERROR:
      return {
        ...state,
        addLoading: false,
      };
    case types.UPDATE_HIRA_RECORD_FETCH:
      return {
        ...state,
        updateLoading: true,
      };
    case types.UPDATE_HIRA_RECORD_SUCCESS:
      const index = state.list.findIndex(
        (item) => item.id === action.payload.id
      );
      let records = [...state.list];
      records[index] = action.payload;

      return {
        ...state,
        updateLoading: false,
        updateSuccess: true,
        list: records,
        detail: action.payload,
      };
    case types.UPDATE_HIRA_RECORD_ERROR:
      return {
        ...state,
        updateLoading: false,
      };
    default:
      return state;
  }
};

const eraLikelihoodsReducer = (state = initialState.eraLikelihoods, action) => {
  switch (action.type) {
    case types.ERA_LIKELIHOODS_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.ERA_LIKELIHOODS_DATA:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case types.ERA_LIKELIHOODS_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const eraConsequencesReducer = (
  state = initialState.eraConsequences,
  action
) => {
  switch (action.type) {
    case types.ERA_CONSEQUENCES_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.ERA_CONSEQUENCES_DATA:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case types.ERA_CONSEQUENCES_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const eraActionsReducer = (state = initialState.eraActions, action) => {
  switch (action.type) {
    case types.ERA_ACTIONS_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.ERA_ACTIONS_DATA:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case types.ERA_ACTIONS_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const eraStatusesReducer = (state = initialState.eraStatuses, action) => {
  switch (action.type) {
    case types.ERA_STATUSES_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.ERA_STATUSES_DATA:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case types.ERA_STATUSES_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const eraAssessmentsReducer = (state = initialState.eraAssessments, action) => {
  switch (action.type) {
    case types.ERA_ASSESSMENTS_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.ERA_ASSESSMENTS_DATA:
      return {
        ...state,
        loading: false,
        // rowsCount: action.payload.count,
        // list: action.payload.rows,
        list: action.payload,
      };
    case types.ERA_ASSESSMENTS_ERROR:
      return {
        ...state,
        loading: false,
      };
    case types.ERA_ASSESSMENTS_RESET:
      return {
        ...state,
        loading: false,
        list: [],
      };
    case types.ERA_ASSESSMENT_DETAIL_FETCH:
      return {
        ...state,
        detailLoading: true,
      };
    case types.ERA_ASSESSMENT_DETAIL_DATA:
      return {
        ...state,
        detailLoading: false,
        detail: action.payload,
      };
    case types.ERA_ASSESSMENT_DETAIL_ERROR:
      return {
        ...state,
        detailLoading: false,
      };
    case types.ERA_ASSESSMENT_DETAIL_RESET:
      return {
        ...state,
        detailLoading: false,
        detail: null,
      };
    case types.ADD_ERA_ASSESSMENT_FETCH:
      return {
        ...state,
        addLoading: true,
      };
    case types.ADD_ERA_ASSESSMENT_SUCCESS:
      return {
        ...state,
        addLoading: false,
        addSuccess: true,
        list: [...state.list, action.payload],
      };
    case types.ADD_ERA_ASSESSMENT_ERROR:
      return {
        ...state,
        addLoading: false,
      };
    case types.UPDATE_ERA_ASSESSMENT_FETCH:
      return {
        ...state,
        updateLoading: true,
      };
    case types.UPDATE_ERA_ASSESSMENT_SUCCESS:
      const index = state.list.findIndex(
        (item) => item.id === action.payload.id
      );
      let records = [...state.list];
      records[index] = action.payload;

      return {
        ...state,
        updateLoading: false,
        updateSuccess: true,
        list: records,
        detail: action.payload,
      };
    case types.UPDATE_ERA_ASSESSMENT_ERROR:
      return {
        ...state,
        updateLoading: false,
      };
    default:
      return state;
  }
};

const legalRegisterRecordsReducer = (
  state = initialState.legalRegisterRecords,
  action
) => {
  switch (action.type) {
    case types.LEGAL_REGISTER_RECORDS_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.LEGAL_REGISTER_RECORDS_DATA:
      return {
        ...state,
        loading: false,
        // rowsCount: action.payload.count,
        // list: action.payload.rows,
        list: action.payload,
      };
    case types.LEGAL_REGISTER_RECORDS_ERROR:
      return {
        ...state,
        loading: false,
      };
    case types.LEGAL_REGISTER_RECORDS_RESET:
      return {
        ...state,
        loading: false,
        list: [],
      };
    case types.LEGAL_REGISTER_RECORD_DETAIL_FETCH:
      return {
        ...state,
        detailLoading: true,
      };
    case types.LEGAL_REGISTER_RECORD_DETAIL_DATA:
      return {
        ...state,
        detailLoading: false,
        detail: action.payload,
      };
    case types.LEGAL_REGISTER_RECORD_DETAIL_ERROR:
      return {
        ...state,
        detailLoading: false,
      };
    case types.LEGAL_REGISTER_RECORD_DETAIL_RESET:
      return {
        ...state,
        detailLoading: false,
        detail: null,
      };
    case types.ADD_LEGAL_REGISTER_RECORD_FETCH:
      return {
        ...state,
        addLoading: true,
        addSuccess: false,
        addError: false,
      };
    case types.ADD_LEGAL_REGISTER_RECORD_SUCCESS:
      return {
        ...state,
        addLoading: false,
        addSuccess: true,
        addError: false,
        list: [
          ...state.list,
          action.payload.selectedYear === action.payload.year.year
            ? action.payload
            : {},
        ],
      };
    case types.ADD_LEGAL_REGISTER_RECORD_ERROR:
      return {
        ...state,
        addLoading: false,
        addSuccess: false,
        addError: true,
      };
    case types.UPDATE_LEGAL_REGISTER_RECORD_FETCH:
      return {
        ...state,
        updateLoading: true,
        updateSuccess: false,
        updateError: false,
      };
    case types.UPDATE_LEGAL_REGISTER_RECORD_SUCCESS:
      const index = state.list.findIndex(
        (item) => item.id === action.payload.id
      );
      let records = [...state.list];
      records[index] = action.payload;

      return {
        ...state,
        updateLoading: false,
        updateSuccess: true,
        updateError: false,
        list: records,
        detail: action.payload,
      };
    case types.UPDATE_LEGAL_REGISTER_RECORD_ERROR:
      return {
        ...state,
        updateLoading: false,
        updateSuccess: false,
        updateError: true,
      };
    default:
      return state;
  }
};

/**
 * COSHH Reducer
 */

const coshhRiskPersonsReducer = (
  state = initialState.coshhRiskPersons,
  action
) => {
  switch (action.type) {
    case types.COSHH_RISK_PERSONS_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.COSHH_RISK_PERSONS_DATA:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case types.COSHH_RISK_PERSONS_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const coshhClassificationsReducer = (
  state = initialState.coshhClassifications,
  action
) => {
  switch (action.type) {
    case types.COSHH_CLASSIFICATIONS_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.COSHH_CLASSIFICATIONS_DATA:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case types.COSHH_CLASSIFICATIONS_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const coshhHazardTypesReducer = (
  state = initialState.coshhHazardTypes,
  action
) => {
  switch (action.type) {
    case types.COSHH_HAZARD_TYPES_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.COSHH_HAZARD_TYPES_DATA:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case types.COSHH_HAZARD_TYPES_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const coshhExposureRoutesReducer = (
  state = initialState.coshhExposureRoutes,
  action
) => {
  switch (action.type) {
    case types.COSHH_EXPOSURE_ROUTES_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.COSHH_EXPOSURE_ROUTES_DATA:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case types.COSHH_EXPOSURE_ROUTES_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const coshhProtectiveEquipmentsReducer = (
  state = initialState.coshhProtectiveEquipments,
  action
) => {
  switch (action.type) {
    case types.COSHH_PROTECTIVE_EQUIPMENTS_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.COSHH_PROTECTIVE_EQUIPMENTS_DATA:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case types.COSHH_PROTECTIVE_EQUIPMENTS_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const coshhSubstanceDisposalTypesReducer = (
  state = initialState.coshhSubstanceDisposalTypes,
  action
) => {
  switch (action.type) {
    case types.COSHH_SUBSTANCES_DISPOSAL_TYPES_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.COSHH_SUBSTANCES_DISPOSAL_TYPES_DATA:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case types.COSHH_SUBSTANCES_DISPOSAL_TYPES_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const coshhRiskRatingsReducer = (
  state = initialState.coshhRiskRatings,
  action
) => {
  switch (action.type) {
    case types.COSHH_RISK_RATINGS_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.COSHH_RISK_RATINGS_DATA:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case types.COSHH_RISK_RATINGS_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const coshhAssessmentsReducer = (
  state = initialState.coshhAssessments,
  action
) => {
  switch (action.type) {
    case types.COSHH_ASSESSMENTS_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.COSHH_ASSESSMENTS_DATA:
      return {
        ...state,
        loading: false,
        // rowsCount: action.payload.count,
        // list: action.payload.rows,
        list: action.payload,
      };
    case types.COSHH_ASSESSMENTS_ERROR:
      return {
        ...state,
        loading: false,
      };
    case types.COSHH_ASSESSMENT_DETAIL_FETCH:
      return {
        ...state,
        detailLoading: true,
      };
    case types.COSHH_ASSESSMENT_DETAIL_DATA:
      return {
        ...state,
        detailLoading: false,
        detail: action.payload,
      };
    case types.COSHH_ASSESSMENT_DETAIL_ERROR:
      return {
        ...state,
        detailLoading: false,
      };
    case types.COSHH_ASSESSMENT_DETAIL_RESET:
      return {
        ...state,
        detailLoading: false,
        detail: null,
      };
    case types.ADD_COSHH_ASSESSMENT_FETCH:
      return {
        ...state,
        addLoading: true,
        addSuccess: false,
        addError: false,
      };
    case types.ADD_COSHH_ASSESSMENT_SUCCESS:
      return {
        ...state,
        addLoading: false,
        addSuccess: true,
        addError: false,
        list: [...state.list, action.payload],
      };
    case types.ADD_COSHH_ASSESSMENT_ERROR:
      return {
        ...state,
        addLoading: false,
        addSuccess: false,
        addError: true,
      };
    case types.UPDATE_COSHH_ASSESSMENT_FETCH:
      return {
        ...state,
        updateLoading: true,
        updateSuccess: false,
        updateError: false,
      };
    case types.UPDATE_COSHH_ASSESSMENT_SUCCESS:
      const index = state.list.findIndex(
        (item) => item.id === action.payload.id
      );
      let records = [...state.list];
      records[index] = action.payload;

      return {
        ...state,
        updateLoading: false,
        updateSuccess: true,
        updateError: false,
        list: records,
        detail: action.payload,
      };
    case types.UPDATE_COSHH_ASSESSMENT_ERROR:
      return {
        ...state,
        updateLoading: false,
        updateSuccess: false,
        updateError: true,
      };
    default:
      return state;
  }
};

/**
 * COSHH Reducer End
 */

const rootReducer = combineReducers({
  auth: authReducer,
  login: loginReducer,
  applications: applicationsReducer,
  userApplications: userApplicationsReducer,
  selectedUserApplication: selectedUserApplicationReducer,
  applicationMenu: applicationMenuReducer,
  userApplicationMenu: userApplicationMenuReducer,
  userApplicationRole: userApplicationRoleReducer,
  profile: profileReducer,
  records: recordReducer,
  users: usersReducer,
  employees: employeesReducer,
  roles: rolesReducer,
  companies: componiesReducer,
  userCompanies: userComponiesReducer,
  departments: departmentsReducer,
  areas: areasReducer,
  sources: sourcesReducer,
  ncTypes: ncTypesReducer,
  categories: categoriesReducer,
  managementSystems: managementSystemsReducer,
  statuses: statusesReducer,
  months: monthsReducer,
  auditFindings: auditFindingsReducer,

  ncrByMonth: ncrByMonthReducer,
  ncrByDepartment: ncrByDepartmentReducer,
  ncrByStatus: ncrByStatusReducer,
  ncrByStatusAndMonth: ncrByStatusAndMonthReducer,
  ncrByCompany: ncrByCompanyReducer,

  calibrationRecords: calibrationRecordReducer,
  frequencies: frequenciesReducer,
  dueCalibrationByMonth: dueCalibrationByMonthReducer,
  calibrationByFrequency: calibrationByFrequencyReducer,
  calibrationAllRecords: calibrationAllRecordsReducer,

  years: yearsReducer,
  quaters: quatersReducer,
  aspects: aspectReducer,

  surveys: surveysReducer,
  surveyReminder: surveyReminderReducer,
  surveyRatingByAspectAndYear: surveyRatingByAspectAndYearReducer,
  surveyRatingByCompanyAndYear: surveyRatingByCompanyAndYearReducer,
  allSurveysData: allSurveysDataReducer,

  auditStatuses: auditStatusesReducer,
  findingTypes: findingTypesReducer,
  audits: auditsReducer,

  locations: locationsReducer,
  emergencyDrillTypes: emergencyDrillTypesReducer,
  drillAttendenceEmployees: drillAttendenceEmployeesReducer,
  emergencyDrills: emergencyDrillsReducer,

  environmentalProbabilities: environmentalProbabilitiesReducer,
  environmentalSeverities: environmentalSeveritiesReducer,
  environmentalActivities: environmentalActivitiesReducer,
  environmentalRecords: environmentalRecordsReducer,
  faceTerminals: faceTerminalsReducer,

  hiraProbabilities: hiraProbabilitiesReducer,
  hiraSeverities: hiraSeveritiesReducer,
  hiraEntities: hiraEntitiesReducer,
  hiraHazards: hiraHazardsReducer,
  hiraRecords: hiraRecordsReducer,

  eraLikelihoods: eraLikelihoodsReducer,
  eraConsequences: eraConsequencesReducer,
  eraActions: eraActionsReducer,
  eraStatuses: eraStatusesReducer,
  eraAssessments: eraAssessmentsReducer,
  legalRegisterRecords: legalRegisterRecordsReducer,

  coshhRiskPersons: coshhRiskPersonsReducer,
  coshhClassifications: coshhClassificationsReducer,
  coshhHazardTypes: coshhHazardTypesReducer,
  coshhExposureRoutes: coshhExposureRoutesReducer,
  coshhProtectiveEquipments: coshhProtectiveEquipmentsReducer,
  coshhSubstanceDisposalTypes: coshhSubstanceDisposalTypesReducer,
  coshhRiskRatings: coshhRiskRatingsReducer,
  coshhAssessments: coshhAssessmentsReducer,
});

export default rootReducer;
