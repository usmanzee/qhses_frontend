import { message } from "antd";
import types from "../types";
import { API } from "../../api";
import { getToken } from "../../utils/common";

import { handleError } from "../actions";

export const getCoshhRiskPersonsAction = (history) => async (dispatch) => {
  try {
    dispatch({
      type: types.COSHH_RISK_PERSONS_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
      headers: { Authorization: "Bearer " + getToken() },
    };
    const response = await API.get(config)("/api/coshh/risk-persons");
    const data = response.data;
    dispatch({
      type: types.COSHH_RISK_PERSONS_DATA,
      payload: data,
    });
  } catch (error) {
    handleError(error, history, dispatch);
    dispatch({
      type: types.COSHH_RISK_PERSONS_ERROR,
    });
  }
};

export const getCoshhClassificationsAction = (history) => async (dispatch) => {
  try {
    dispatch({
      type: types.COSHH_CLASSIFICATIONS_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
      headers: { Authorization: "Bearer " + getToken() },
    };
    const response = await API.get(config)("/api/coshh/classifications");
    const data = response.data;
    dispatch({
      type: types.COSHH_CLASSIFICATIONS_DATA,
      payload: data,
    });
  } catch (error) {
    handleError(error, history, dispatch);
    dispatch({
      type: types.COSHH_CLASSIFICATIONS_ERROR,
    });
  }
};

export const getCoshhHazardTypesAction = (history) => async (dispatch) => {
  try {
    dispatch({
      type: types.COSHH_HAZARD_TYPES_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
      headers: { Authorization: "Bearer " + getToken() },
    };
    const response = await API.get(config)("/api/coshh/hazard-types");
    const data = response.data;
    dispatch({
      type: types.COSHH_HAZARD_TYPES_DATA,
      payload: data,
    });
  } catch (error) {
    handleError(error, history, dispatch);
    dispatch({
      type: types.COSHH_HAZARD_TYPES_ERROR,
    });
  }
};

export const getCoshhExposureRoutesAction = (history) => async (dispatch) => {
  try {
    dispatch({
      type: types.COSHH_EXPOSURE_ROUTES_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
      headers: { Authorization: "Bearer " + getToken() },
    };
    const response = await API.get(config)("/api/coshh/exposure-routes");
    const data = response.data;
    dispatch({
      type: types.COSHH_EXPOSURE_ROUTES_DATA,
      payload: data,
    });
  } catch (error) {
    handleError(error, history, dispatch);
    dispatch({
      type: types.COSHH_EXPOSURE_ROUTES_ERROR,
    });
  }
};

export const getCoshhProtectiveEquipmentsAction =
  (history) => async (dispatch) => {
    try {
      dispatch({
        type: types.COSHH_PROTECTIVE_EQUIPMENTS_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      const response = await API.get(config)(
        "/api/coshh/protective-equipments"
      );
      const data = response.data;
      dispatch({
        type: types.COSHH_PROTECTIVE_EQUIPMENTS_DATA,
        payload: data,
      });
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.COSHH_PROTECTIVE_EQUIPMENTS_ERROR,
      });
    }
  };

export const getCoshhSubstancesDisposalTypesAction =
  (history) => async (dispatch) => {
    try {
      dispatch({
        type: types.COSHH_SUBSTANCES_DISPOSAL_TYPES_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      const response = await API.get(config)(
        "/api/coshh/substances-disposal-types"
      );
      const data = response.data;
      dispatch({
        type: types.COSHH_SUBSTANCES_DISPOSAL_TYPES_DATA,
        payload: data,
      });
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.COSHH_SUBSTANCES_DISPOSAL_TYPES_ERROR,
      });
    }
  };

export const getCoshhRiskRatingsAction = (history) => async (dispatch) => {
  try {
    dispatch({
      type: types.COSHH_RISK_RATINGS_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
      headers: { Authorization: "Bearer " + getToken() },
    };
    const response = await API.get(config)("/api/coshh/risk-ratings");
    const data = response.data;
    dispatch({
      type: types.COSHH_RISK_RATINGS_DATA,
      payload: data,
    });
  } catch (error) {
    handleError(error, history, dispatch);
    dispatch({
      type: types.COSHH_RISK_RATINGS_ERROR,
    });
  }
};

export const getCoshhAssessmentsAction =
  (history, pageNumber) => async (dispatch) => {
    try {
      dispatch({
        type: types.COSHH_ASSESSMENTS_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      var query = "?page=" + pageNumber;
      const response = await API.get(config)("/api/coshh" + query);
      const data = response.data;
      dispatch({
        type: types.COSHH_ASSESSMENTS_DATA,
        payload: data,
      });
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.COSHH_ASSESSMENTS_ERROR,
      });
    }
  };

export const getCoshhAssessmentDetailAction =
  (history, id) => async (dispatch) => {
    try {
      dispatch({
        type: types.COSHH_ASSESSMENT_DETAIL_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      const response = await API.get(config)(`/api/coshh/${id}`);
      const data = response.data;
      dispatch({
        type: types.COSHH_ASSESSMENT_DETAIL_DATA,
        payload: data,
      });
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.COSHH_ASSESSMENT_DETAIL_ERROR,
      });
    }
  };

export const addCoshhAssessmentAction =
  (history, requestData) => async (dispatch) => {
    try {
      dispatch({
        type: types.ADD_COSHH_ASSESSMENT_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: {
          Authorization: "Bearer " + getToken(),
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await API.post(config)("/api/coshh", requestData);
      const data = response.data;
      dispatch({
        type: types.ADD_COSHH_ASSESSMENT_SUCCESS,
        payload: data,
      });
      history.push("/coshh/assessments");
      message.success("Assessment Added Successfully.");
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.ADD_COSHH_ASSESSMENT_ERROR,
      });
    }
  };

export const updateCoshhAssessmentAction =
  (history, id, requestData) => async (dispatch) => {
    try {
      dispatch({
        type: types.UPDATE_COSHH_ASSESSMENT_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: {
          Authorization: "Bearer " + getToken(),
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await API.patch(config)(`/api/coshh/${id}`, requestData);
      const data = response.data;
      dispatch({
        type: types.UPDATE_COSHH_ASSESSMENT_SUCCESS,
        payload: data,
      });
      message.success("Assessment updated Successfully.");
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.UPDATE_COSHH_ASSESSMENT_ERROR,
      });
    }
  };
