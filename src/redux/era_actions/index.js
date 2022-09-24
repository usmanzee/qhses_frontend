import types from "../types";
import { API } from "../../api";
import { getToken } from "../../utils/common";

import { handleError } from "../actions";

export const getEraLikelihoodsAction = (history) => async (dispatch) => {
  try {
    dispatch({
      type: types.ERA_LIKELIHOODS_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
      headers: { Authorization: "Bearer " + getToken() },
    };
    const response = await API.get(config)("/api/era/likelihoods");
    const data = response.data;
    dispatch({
      type: types.ERA_LIKELIHOODS_DATA,
      payload: data,
    });
  } catch (error) {
    handleError(error, history, dispatch);
    dispatch({
      type: types.ERA_LIKELIHOODS_ERROR,
    });
  }
};

export const getEraConsequencesAction = (history) => async (dispatch) => {
  try {
    dispatch({
      type: types.ERA_CONSEQUENCES_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
      headers: { Authorization: "Bearer " + getToken() },
    };
    const response = await API.get(config)("/api/era/consequences");
    const data = response.data;
    dispatch({
      type: types.ERA_CONSEQUENCES_DATA,
      payload: data,
    });
  } catch (error) {
    handleError(error, history, dispatch);
    dispatch({
      type: types.ERA_CONSEQUENCES_ERROR,
    });
  }
};

export const getEraActionsAction = (history) => async (dispatch) => {
  try {
    dispatch({
      type: types.ERA_ACTIONS_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
      headers: { Authorization: "Bearer " + getToken() },
    };
    const response = await API.get(config)("/api/era/actions");
    const data = response.data;
    dispatch({
      type: types.ERA_ACTIONS_DATA,
      payload: data,
    });
  } catch (error) {
    handleError(error, history, dispatch);
    dispatch({
      type: types.ERA_ACTIONS_ERROR,
    });
  }
};

export const getEraStatusesAction = (history) => async (dispatch) => {
  try {
    dispatch({
      type: types.ERA_STATUSES_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
      headers: { Authorization: "Bearer " + getToken() },
    };
    const response = await API.get(config)("/api/era/statuses");
    const data = response.data;
    dispatch({
      type: types.ERA_STATUSES_DATA,
      payload: data,
    });
  } catch (error) {
    handleError(error, history, dispatch);
    dispatch({
      type: types.ERA_STATUSES_ERROR,
    });
  }
};

export const getEraAssessmentsAction = (history) => async (dispatch) => {
  try {
    dispatch({
      type: types.ERA_ASSESSMENTS_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
      headers: { Authorization: "Bearer " + getToken() },
    };
    const response = await API.get(config)("/api/era");
    const data = response.data;
    dispatch({
      type: types.ERA_ASSESSMENTS_DATA,
      payload: data,
    });
  } catch (error) {
    handleError(error, history, dispatch);
    dispatch({
      type: types.ERA_ASSESSMENTS_ERROR,
    });
  }
};

export const getEraAssessmentDetailAction =
  (history, id) => async (dispatch) => {
    try {
      dispatch({
        type: types.ERA_ASSESSMENT_DETAIL_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      const response = await API.get(config)(`/api/era/${id}`);
      const data = response.data;
      dispatch({
        type: types.ERA_ASSESSMENT_DETAIL_DATA,
        payload: data,
      });
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.ERA_ASSESSMENT_DETAIL_ERROR,
      });
    }
  };

export const addEraAssessmentsAction =
  (history, requestData) => async (dispatch) => {
    try {
      dispatch({
        type: types.ADD_ERA_ASSESSMENT_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      const response = await API.post(config)("/api/era", requestData);
      const data = response.data;
      dispatch({
        type: types.ADD_ERA_ASSESSMENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.ADD_ERA_ASSESSMENT_ERROR,
      });
    }
  };

export const updateEraAssessmentsAction =
  (history, requestData) => async (dispatch) => {
    try {
      dispatch({
        type: types.UPDATE_ERA_ASSESSMENT_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      const response = await API.patch(config)("/api/era", requestData);
      const data = response.data;
      dispatch({
        type: types.UPDATE_ERA_ASSESSMENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.UPDATE_ERA_ASSESSMENT_ERROR,
      });
    }
  };
export const closeEraAssessmentsAction =
  (history, requestData) => async (dispatch) => {
    try {
      dispatch({
        type: types.UPDATE_ERA_ASSESSMENT_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      const response = await API.patch(config)(
        "/api/era/close-assessment",
        requestData
      );
      const data = response.data;
      dispatch({
        type: types.UPDATE_ERA_ASSESSMENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.UPDATE_ERA_ASSESSMENT_ERROR,
      });
    }
  };
