const {
  REACT_APP_ENV,
  REACT_APP_DEV_BASE_URL,
  REACT_APP_STAGING_BASE_URL,
  REACT_APP_PRODUCTION_BASE_URL,
} = process.env;

const getBaseUrl = () => {
  var baseUrl = REACT_APP_PRODUCTION_BASE_URL;
  if (REACT_APP_ENV === "dev" || REACT_APP_ENV === "development") {
    baseUrl = REACT_APP_DEV_BASE_URL;
  } else if (REACT_APP_ENV == "staging") {
    baseUrl = REACT_APP_STAGING_BASE_URL;
  } else {
    baseUrl = REACT_APP_PRODUCTION_BASE_URL;
  }
  return baseUrl;
};
export const defaultConfig = {
  api: {
    baseUrl: getBaseUrl(),
  },
};

export const equipmentCalibrationFrontend = {
  config: defaultConfig,
};

window.env = window.env || defaultConfig;
equipmentCalibrationFrontend.config = { ...window.env };

export const baseUrl = () => equipmentCalibrationFrontend.config.api.baseUrl;
