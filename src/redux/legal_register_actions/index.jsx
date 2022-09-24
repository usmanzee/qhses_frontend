import types from "../types";
import { API } from "../../api";
import { getToken } from "../../utils/common";

import { handleError } from "../actions";

export const getLegalRegisterRecordsAction =
  (history, pageNumber, yearId) => async (dispatch) => {
    try {
      dispatch({
        type: types.LEGAL_REGISTER_RECORDS_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      var query = "?page=" + pageNumber;
      if (yearId && yearId != "undefined") {
        query += `&year_id=${yearId}`;
      }
      const response = await API.get(config)("/api/legal-register" + query);
      const data = response.data;
      dispatch({
        type: types.LEGAL_REGISTER_RECORDS_DATA,
        payload: data,
      });
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.LEGAL_REGISTER_RECORDS_ERROR,
      });
    }
  };

export const getLegalRegisterRecordDetailAction =
  (history, id) => async (dispatch) => {
    try {
      dispatch({
        type: types.LEGAL_REGISTER_RECORD_DETAIL_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      const response = await API.get(config)(`/api/legal-register/${id}`);
      const data = response.data;
      dispatch({
        type: types.LEGAL_REGISTER_RECORD_DETAIL_DATA,
        payload: data,
      });
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.LEGAL_REGISTER_RECORD_DETAIL_ERROR,
      });
    }
  };

export const addLegalRegisterRecordAction =
  (history, requestData, selectedYear) => async (dispatch) => {
    try {
      dispatch({
        type: types.ADD_LEGAL_REGISTER_RECORD_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      const response = await API.post(config)(
        "/api/legal-register",
        requestData
      );
      const data = response.data;
      data["selectedYear"] = selectedYear;

      dispatch({
        type: types.ADD_LEGAL_REGISTER_RECORD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.ADD_LEGAL_REGISTER_RECORD_ERROR,
      });
    }
  };

export const updateLegalRegisterRecordAction =
  (history, requestData) => async (dispatch) => {
    try {
      dispatch({
        type: types.UPDATE_LEGAL_REGISTER_RECORD_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      const response = await API.patch(config)(
        "/api/legal-register",
        requestData
      );
      const data = response.data;
      dispatch({
        type: types.UPDATE_LEGAL_REGISTER_RECORD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.UPDATE_LEGAL_REGISTER_RECORD_ERROR,
      });
    }
  };
export const addLegalRegisterRecordQuarterReviewAction =
  (history, recordId, requestData) => async (dispatch) => {
    try {
      dispatch({
        type: types.UPDATE_LEGAL_REGISTER_RECORD_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      const response = await API.post(config)(
        `/api/legal-register/${recordId}/add-review`,
        requestData
      );
      const data = response.data;
      dispatch({
        type: types.UPDATE_LEGAL_REGISTER_RECORD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.UPDATE_LEGAL_REGISTER_RECORD_ERROR,
      });
    }
  };
