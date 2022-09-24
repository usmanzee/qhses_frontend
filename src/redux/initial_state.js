const authState = {
  loading: false,
  success: false,
  error: false,
};

const loginState = {
  loading: false,
  success: false,
  error: false,
};

const applicationsState = {
  loading: false,
  list: [],
};

const userApplicationsState = {
  loading: false,
  list: [],
};

const selectedUserApplicationState = {
  loading: false,
  data: null,
};

const applicationMenuState = {
  loading: false,
  list: [],
};

const userApplicationMenuState = {
  loading: false,
  list: [],
};

const userApplicationRoleState = {
  loading: false,
  data: null,
};

const profileState = {
  loading: false,
  data: null,
};

const recordState = {
  loading: false,
  rowsCount: 0,
  list: [],
  addRecordLoading: false,
  addRecordSuccess: false,
  addRecordError: false,
  recordDetail: null,
  recordDetailLoading: false,
  updateRecordLoading: false,
  updateRecordSuccess: false,
  updateRecordError: false,
  allListloading: false,
  allList: [],
};

const rolesState = {
  loading: false,
  list: [],
};

const employeesState = {
  loading: false,
  list: [],
};

const companiesState = {
  loading: false,
  list: [],
};

const userCompaniesState = {
  loading: false,
  list: [],
};

const departmentsState = {
  loading: false,
  list: [],
};

const categoriesState = {
  loading: false,
  list: [],
};

const areasState = {
  loading: false,
  list: [],
};

const sourcesState = {
  loading: false,
  list: [],
};

const ncTypesState = {
  loading: false,
  list: [],
};

const usersState = {
  loading: false,
  list: [],
  userDetailLoading: false,
  userDetail: null,
  addUserLoading: false,
  addUserSuccess: false,
  addUserError: false,
  updateUserLoading: false,
  updateUserSuccess: false,
  updateUserError: false,
};

const managementSystemsState = {
  loading: false,
  list: [],
};

const statusesState = {
  loading: false,
  list: [],
};
const monthsState = {
  loading: false,
  list: [],
};
const auditFindingsState = {
  loading: false,
  list: [],
};

const ncrByMonthState = {
  loading: false,
  data: null,
};

const ncrByDepartmentState = {
  loading: false,
  list: [],
};

const ncrByStatusState = {
  loading: false,
  list: [],
};

const ncrByStatusAndMonthState = {
  loading: false,
  list: {},
};

const ncrByCompanyState = {
  loading: false,
  list: [],
};

const calibrationRecordState = {
  loading: false,
  rowsCount: 0,
  list: [],
  addRecordLoading: false,
  addRecordSuccess: false,
  addRecordError: false,
  recordDetail: null,
  recordDetailLoading: false,
  updateRecordLoading: false,
  updateRecordSuccess: false,
  updateRecordError: false,
};

const frequenciesState = {
  loading: false,
  list: [],
};

const dueCalibrationByMonthState = {
  loading: false,
  list: [],
};

const calibrationByFrequencyState = {
  loading: false,
  list: [],
};

const calibrationAllRecordsState = {
  loading: false,
  list: [],
};

const yearsState = {
  loading: false,
  list: [],
};

const quatersState = {
  loading: false,
  list: [],
};

const aspectsState = {
  loading: false,
  list: [],
};

const surveysState = {
  loading: false,
  rowsCount: 0,
  list: [],
  addSurveyLoading: false,
  addSurveySuccess: false,
  addSurveyError: false,
  surveyDetailLoading: false,
  surveyDetail: null,
  updateSurveyLoading: false,
  updateSurveySuccess: false,
  updateSurveyError: false,
  addSurveyFeedbackLoading: false,
  addSurveyFeedbackSuccess: false,
  addSurveyFeedbackError: false,
};

const surveyReminderState = {
  loading: false,
  success: false,
  error: false,
};

const surveyRatingByAspectAndYearState = {
  loading: false,
  list: [],
};

const surveyRatingByCompanyAndYearState = {
  loading: false,
  list: [],
};

const allSurveysDataState = {
  loading: false,
  data: null,
};

const auditStatusesState = {
  loading: false,
  list: [],
};
const findingTypesState = {
  loading: false,
  list: [],
};

const auditState = {
  loading: false,
  rowsCount: 0,
  list: [],
  auditDetailLoading: false,
  auditDetail: null,
  addAuditLoading: false,
  addAuditSuccess: false,
  addAuditError: false,

  updateAuditLoading: false,
  updateAuditSuccess: false,
  updateAuditError: false,

  addAuditNotificationLoading: false,
  addAuditNotificationSuccess: false,
  addAuditNotificationError: false,
  addAuditChecklistLoading: false,
  addAuditChecklistSuccess: false,
  addAuditChecklistError: false,
  updateAuditChecklistLoading: false,
  updateAuditChecklistSuccess: false,
  updateAuditChecklistError: false,
  deleteAuditChecklistLoading: false,
  deleteAuditChecklistSuccess: false,
  deleteAuditChecklistError: false,
};

const locationsState = {
  loading: false,
  list: [],
  addLoading: false,
  addSuccess: false,
  addError: false,
};
const emergencyDrillTypesState = {
  loading: false,
  list: [],
};
const drillAttendenceEmployeesState = {
  loading: false,
  list: [],
  saveAttendenceLoading: false,
  saveAttendenceSuccess: false,
  saveAttendenceError: false,
};

const emergencyDrillsState = {
  loading: false,
  rowsCount: 0,
  list: [],
  drillDetailLoading: false,
  drillDetail: null,
  addDrillLoading: false,
  addDrillSuccess: false,
  addDrillError: false,
  addDrillNotificationLoading: false,
  addDrillNotificationSuccess: false,
  addDrillNotificationError: false,
  updateDrillLoading: false,
  updateDrillSuccess: false,
  updateDrillError: false,
};

const environmentalProbabilitiesState = {
  loading: false,
  list: [],
};
const environmentalSeveritiesState = {
  loading: false,
  list: [],
};
const environmentalActivitiesState = {
  loading: false,
  list: [],
  addLoading: false,
  addSuccess: false,
  addError: false,
};

const environmentalRecordsState = {
  loading: false,
  rowsCount: 0,
  list: [],
  detailLoading: false,
  detail: null,
  addLoading: false,
  addSuccess: false,
  addError: false,
  updateLoading: false,
  updateSuccess: false,
  updateError: false,
};

const faceTerminalsState = {
  loading: false,
  list: [],
};

const hiraProbabilitiesState = {
  loading: false,
  list: [],
};

const hiraSeveritiesState = {
  loading: false,
  list: [],
};
const hiraEntitiesState = {
  loading: false,
  list: [],
};
const hiraHazardsState = {
  loading: false,
  list: [],
  addLoading: false,
  addSuccess: false,
  addError: false,
};

const hiraRecordsState = {
  loading: false,
  rowsCount: 0,
  list: [],
  detailLoading: false,
  detail: null,
  addLoading: false,
  addSuccess: false,
  addError: false,
  updateLoading: false,
  updateSuccess: false,
  updateError: false,
};

/**
 * Initial State for ERA
 */

const eraLikelihoodsState = {
  loading: false,
  list: [],
};

const eraConsequencesState = {
  loading: false,
  list: [],
};

const eraActionsState = {
  loading: false,
  list: [],
};

const eraStatusesState = {
  loading: false,
  list: [],
};

const eraAssessmentsState = {
  loading: false,
  list: [],
  detailLoading: false,
  detail: null,
  addLoading: false,
  addSuccess: false,
  addError: false,
  updateLoading: false,
  updateSuccess: false,
  updateError: false,
};

/**
 * End initial State for ERA
 */

/**
 * Legal Register Initial State
 */

const legalRegisterRecordsState = {
  loading: false,
  list: [],
  detailLoading: false,
  detail: null,
  addLoading: false,
  addSuccess: false,
  addError: false,
  updateLoading: false,
  updateSuccess: false,
  updateError: false,
};

/**
 * Legal Register Initial State End
 */

/**
 * COSHH States
 */

const coshhRiskPersonsState = {
  loading: false,
  list: [],
};

const coshhClassificationsState = {
  loading: false,
  list: [],
};

const coshhHazardTypesState = {
  loading: false,
  list: [],
};

const coshhExposureRoutesState = {
  loading: false,
  list: [],
};

const coshhProtectiveEquipmentsState = {
  loading: false,
  list: [],
};

const coshhSubstanceDisposalTypesState = {
  loading: false,
  list: [],
};

const coshhRiskRatingsState = {
  loading: false,
  list: [],
};

const coshhAssessmentsState = {
  loading: false,
  list: [],
  detailLoading: false,
  detail: null,
  addLoading: false,
  addSuccess: false,
  addError: false,
  updateLoading: false,
  updateSuccess: false,
  updateError: false,
};

/**
 * COSHH States End
 */

const initialState = {
  auth: authState,
  login: loginState,
  applications: applicationsState,
  userApplications: userApplicationsState,
  selectedUserApplication: selectedUserApplicationState,
  applicationMenu: applicationMenuState,
  userApplicationMenu: userApplicationMenuState,
  userApplicationRole: userApplicationRoleState,

  profile: profileState,
  records: recordState,
  users: usersState,
  roles: rolesState,
  employees: employeesState,
  companies: companiesState,
  userCompanies: userCompaniesState,
  deprtments: departmentsState,
  areas: areasState,
  sources: sourcesState,
  ncTypes: ncTypesState,
  categories: categoriesState,
  managementSystems: managementSystemsState,
  statuses: statusesState,
  months: monthsState,
  auditFindings: auditFindingsState,
  ncrByMonth: ncrByMonthState,
  ncrByDepartment: ncrByDepartmentState,
  ncrByStatus: ncrByStatusState,
  ncrByStatusAndMonth: ncrByStatusAndMonthState,
  ncrByCompany: ncrByCompanyState,

  calibrationRecords: calibrationRecordState,
  frequencies: frequenciesState,
  dueCalibrationByMonth: dueCalibrationByMonthState,
  calibrationByFrequency: calibrationByFrequencyState,
  calibrationAllRecords: calibrationAllRecordsState,

  years: yearsState,
  quaters: quatersState,
  aspects: aspectsState,

  surveys: surveysState,
  surveyReminder: surveyReminderState,
  surveyRatingByAspectAndYear: surveyRatingByAspectAndYearState,
  surveyRatingByCompanyAndYear: surveyRatingByCompanyAndYearState,
  allSurveysData: allSurveysDataState,

  auditStatuses: auditStatusesState,
  findingTypes: findingTypesState,
  audits: auditState,

  locations: locationsState,
  emergencyDrillTypes: emergencyDrillTypesState,
  drillAttendenceEmployees: drillAttendenceEmployeesState,
  emergencyDrills: emergencyDrillsState,

  environmentalProbabilities: environmentalProbabilitiesState,
  environmentalSeverities: environmentalSeveritiesState,
  environmentalActivities: environmentalActivitiesState,
  environmentalRecords: environmentalRecordsState,
  faceTerminals: faceTerminalsState,

  hiraProbabilities: hiraProbabilitiesState,
  hiraSeverities: hiraSeveritiesState,
  hiraEntities: hiraEntitiesState,
  hiraHazards: hiraHazardsState,
  hiraRecords: hiraRecordsState,

  eraLikelihoods: eraLikelihoodsState,
  eraConsequences: eraConsequencesState,
  eraActions: eraActionsState,
  eraStatuses: eraStatusesState,
  eraAssessments: eraAssessmentsState,
  legalRegisterRecords: legalRegisterRecordsState,

  coshhRiskPersons: coshhRiskPersonsState,
  coshhClassifications: coshhClassificationsState,
  coshhHazardTypes: coshhHazardTypesState,
  coshhExposureRoutes: coshhExposureRoutesState,
  coshhProtectiveEquipments: coshhProtectiveEquipmentsState,
  coshhSubstanceDisposalTypes: coshhSubstanceDisposalTypesState,
  coshhRiskRatings: coshhRiskRatingsState,
  coshhAssessments: coshhAssessmentsState,
};

export { initialState };
