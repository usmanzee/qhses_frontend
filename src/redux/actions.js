import types from "./types";
import axios from "axios";
import { API } from "../api";
import {
  getToken,
  setToken,
  removeToken,
  setAuthToken,
  removeAuthToken,
  getAuthToken,
} from "../utils/common";
import { message } from "antd";
import { history } from "../helpers";

/**
 * Other Actions
 */
export * from "./era_actions";
export * from "./legal_register_actions";
export * from "./coshh_register_actions";

/**
 * End Other Actions
 */

export const handleError = (error, history, dispatch) => {
  if (error.code === 401) {
    removeToken();
    removeAuthToken();
    history.push("/unauthorized");
    // history.push("/login");
  }
  message.error(error.message || "Something went wrong.");
};

export const authAction = (authToken, history) => async (dispatch) => {
  try {
    dispatch({
      type: types.AUTH_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
    };
    const response = await API.post(config)("/api/auth", { token: authToken });
    setToken(response.token);
    setAuthToken(authToken);
    dispatch({
      type: types.AUTH_SUCCESS,
    });
    const redirectUrl =
      response.redirectUrl && response.redirectUrl != ""
        ? response.redirectUrl
        : localStorage.getItem("redirectUrl") || null;
    if (redirectUrl) {
      localStorage.removeItem("redirectUrl");
      history.push(decodeURIComponent(redirectUrl));
    } else {
      history.push("/");
    }
    message.success("Logged In.");
  } catch (error) {
    dispatch({
      type: types.AUTH_ERROR,
    });
    handleError(error, history, dispatch);
  }
};

export const loginAction = (requestData, history) => async (dispatch) => {
  try {
    dispatch({
      type: types.USER_LOGIN_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
    };
    const response = await API.post(config)("/api/users/login", requestData);
    setToken(response.token);
    dispatch({
      type: types.USER_LOGIN_SUCCESS,
    });
    history.push("/");
    message.success("Logged In.");
  } catch (error) {
    dispatch({
      type: types.USER_LOGIN_ERROR,
    });
    handleError(error, history, dispatch);
  }
};
export const logoutAction = (history) => async (dispatch) => {
  removeToken();
  removeAuthToken();
};
export const logoutClickAction = (history) => async (dispatch) => {
  removeToken();
  history.push("/unauthorized");
  // history.push("/login");
  // message.success("Session has expired.");
};

export const getApplicationsAction = (history) => async (dispatch) => {
  try {
    dispatch({
      type: types.APPLICATIONS_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
      headers: { Authorization: "Bearer " + getToken() },
    };
    const response = await API.get(config)("/api/applications/all");
    dispatch({
      type: types.APPLICATIONS_DATA,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: types.APPLICATIONS_ERROR,
    });
    handleError(error, history, dispatch);
  }
};

export const getUserApplicationsAction = (history) => async (dispatch) => {
  try {
    dispatch({
      type: types.USER_APPLICATIONS_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
      headers: { Authorization: "Bearer " + getToken() },
    };
    const response = await API.get(config)("/api/applications/user");
    dispatch({
      type: types.USER_APPLICATIONS_DATA,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: types.USER_APPLICATIONS_ERROR,
    });
    handleError(error, history, dispatch);
  }
};

export const getApplicationMenuAction =
  (history, appId) => async (dispatch) => {
    try {
      dispatch({
        type: types.APPLICATION_MENU_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      const response = await API.get(config)(
        `/api/applications/menu-by-id/${appId}`
      );
      if (response.data.length) {
        dispatch({
          type: types.APPLICATION_MENU_DATA,
          payload: response.data,
        });
      }
    } catch (error) {
      dispatch({
        type: types.APPLICATION_MENU_ERROR,
      });
      handleError(error, history, dispatch);
    }
  };
export const getSelectedApplicationByRoute =
  (history, applicationRoute) => async (dispatch) => {
    try {
      dispatch({
        type: types.SELECTED_USER_APPLICATIONS_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      const response = await API.get(config)(
        `/api/applications/by-route/${applicationRoute}`
      );
      dispatch({
        type: types.SELECTED_USER_APPLICATIONS_DATA,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: types.SELECTED_USER_APPLICATIONS_ERROR,
      });
      handleError(error, history, dispatch);
    }
  };
export const getUserApplicationMenuAction =
  (history, applicationRoute) => async (dispatch) => {
    try {
      dispatch({
        type: types.USER_APPLICATION_MENU_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      const response = await API.get(config)(
        `/api/applications/menu/user/${applicationRoute}`
      );
      if (response.data.length) {
        dispatch({
          type: types.USER_APPLICATION_MENU_DATA,
          payload: response.data,
        });
      } else {
        dispatch({
          type: types.USER_APPLICATION_MENU_ERROR,
        });
      }
    } catch (error) {
      dispatch({
        type: types.USER_APPLICATION_MENU_ERROR,
      });
      handleError(error, history, dispatch);
    }
  };
export const getUserApplicationRoleAction =
  (history, applicationRoute) => async (dispatch) => {
    try {
      dispatch({
        type: types.USER_APPLICATION_ROLE_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      const response = await API.get(config)(
        `/api/applications/role/user/${applicationRoute}`
      );
      if (Object.keys(response.data).length) {
        dispatch({
          type: types.USER_APPLICATION_ROLE_DATA,
          payload: response.data,
        });
      } else {
        dispatch({
          type: types.USER_APPLICATION_ROLE_ERROR,
        });
      }
    } catch (error) {
      dispatch({
        type: types.USER_APPLICATION_ROLE_ERROR,
      });
      handleError(error, history, dispatch);
    }
  };

export const getProfileAction = (history) => async (dispatch) => {
  try {
    dispatch({
      type: types.USER_PROFILE_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
      headers: { Authorization: "Bearer " + getToken() },
    };
    const response = await API.get(config)("/api/users/profile");
    dispatch({
      type: types.USER_PROFILE_DATA,
      payload: response.data,
    });
  } catch (error) {
    handleError(error, history, dispatch);
    dispatch({
      type: types.USER_PROFILE_ERROR,
    });
  }
};

export const addUserAction = (requestData, history) => async (dispatch) => {
  try {
    dispatch({
      type: types.ADD_USER_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
      headers: { Authorization: "Bearer " + getToken() },
    };
    const response = await API.post(config)("/api/users/add", requestData);
    dispatch({
      type: types.ADD_USER_SUCCESS,
      payload: response.data,
    });
    message.success("User Added Successfully.");
  } catch (error) {
    handleError(error, history, dispatch);
    dispatch({
      type: types.ADD_USER_ERROR,
    });
  }
};

export const updateUserAction =
  (userId, requestData, history) => async (dispatch) => {
    try {
      dispatch({
        type: types.UPDATE_USER_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      const response = await API.patch(config)(
        `/api/users/update/${userId}`,
        requestData
      );
      dispatch({
        type: types.UPDATE_USER_SUCCESS,
        payload: response.data,
      });
      message.success("User Updated Successfully.");
      // history.push("/users/add");
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.UPDATE_USER_ERROR,
      });
    }
  };

export const getAllNcrRecordsAction = (history) => async (dispatch) => {
  try {
    dispatch({
      type: types.NCR_ALL_RECORDS_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
      headers: { Authorization: "Bearer " + getToken() },
    };
    const response = await API.get(config)("/api/ncr/records/get/all");
    const data = response.data;
    dispatch({
      type: types.NCR_ALL_RECORDS_DATA,
      payload: data,
    });
  } catch (error) {
    handleError(error, history, dispatch);
    dispatch({
      type: types.NCR_ALL_RECORDS_ERROR,
    });
  }
};

export const getRecordsAction =
  (
    pageNumber,
    history,
    ownerId,
    departmentId,
    sourceId,
    statusId,
    findingTypeId
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: types.NCR_RECORD_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      var query = "?page=" + pageNumber;
      if (ownerId && ownerId != "undefined") {
        query += `&owner_id=${ownerId}`;
      }
      if (departmentId && departmentId != "undefined") {
        query += `&department_id=${departmentId}`;
      }
      if (sourceId && sourceId != "undefined") {
        query += `&source_id=${sourceId}`;
      }
      if (statusId && statusId != "undefined") {
        query += `&status_id=${statusId}`;
      }
      if (findingTypeId && findingTypeId != "undefined") {
        query += `&finding_type_id=${findingTypeId}`;
      }

      const response = await API.get(config)("/api/ncr/records" + query);
      const data = response.data;
      dispatch({
        type: types.NCR_RECORD_DATA,
        payload: data,
      });
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.NCR_RECORD_ERROR,
      });
    }
  };

export const getRecordDetailAction =
  (recordId, history) => async (dispatch) => {
    try {
      dispatch({
        type: types.NCR_RECORD_DETAIL_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      const response = await API.get(config)("/api/ncr/records/" + recordId);
      const data = response.data;
      dispatch({
        type: types.NCR_RECORD_DETAIL_DATA,
        payload: data,
      });
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.NCR_RECORD_DETAIL_ERROR,
      });
    }
  };

export const getUsersAction =
  (history, getAll = false) =>
  async (dispatch) => {
    try {
      dispatch({
        type: types.USERS_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      const url = getAll ? "/api/users/all" : "/api/users";
      const response = await API.get(config)(url);
      const data = response.data;
      dispatch({
        type: types.USERS_DATA,
        payload: data,
      });
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.USERS_ERROR,
      });
    }
  };

export const getUserDetailAction = (history, userId) => async (dispatch) => {
  try {
    dispatch({
      type: types.USER_DETAIL_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
      headers: { Authorization: "Bearer " + getToken() },
    };
    const url = `/api/users/detail/${userId}`;
    const response = await API.get(config)(url);
    const data = response.data;
    dispatch({
      type: types.USER_DETAIL_DATA,
      payload: data,
    });
  } catch (error) {
    handleError(error, history, dispatch);
    dispatch({
      type: types.USER_DETAIL_ERROR,
    });
  }
};

export const getRolesAction = (history) => async (dispatch) => {
  try {
    dispatch({
      type: types.ROLES_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
      headers: { Authorization: "Bearer " + getToken() },
    };
    const response = await API.get(config)("/api/common/roles");
    const data = response.data;
    dispatch({
      type: types.ROLES_DATA,
      payload: data,
    });
  } catch (error) {
    handleError(error, history, dispatch);
    dispatch({
      type: types.ROLES_ERROR,
    });
  }
};
export const getEmployeesAction = (history) => async (dispatch) => {
  try {
    dispatch({
      type: types.EMPLOYEES_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
      headers: { Authorization: "Bearer " + getToken() },
    };
    const response = await API.get(config)("/api/common/employees");
    const data = response.data;
    dispatch({
      type: types.EMPLOYEES_DATA,
      payload: data,
    });
  } catch (error) {
    handleError(error, history, dispatch);
    dispatch({
      type: types.EMPLOYEES_ERROR,
    });
  }
};

export const getCategoriesAction = (history) => async (dispatch) => {
  try {
    dispatch({
      type: types.CATEGORIES_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
      headers: { Authorization: "Bearer " + getToken() },
    };
    const response = await API.get(config)("/api/common/categories");
    const data = response.data;
    dispatch({
      type: types.CATEGORIES_DATA,
      payload: data,
    });
  } catch (error) {
    handleError(error, history, dispatch);
    dispatch({
      type: types.CATEGORIES_ERROR,
    });
  }
};

export const getCompaniesAction = (history) => async (dispatch) => {
  try {
    dispatch({
      type: types.COMPANIES_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
      headers: { Authorization: "Bearer " + getToken() },
    };
    const response = await API.get(config)("/api/common/companies");
    const data = response.data;
    dispatch({
      type: types.COMPANIES_DATA,
      payload: data,
    });
  } catch (error) {
    handleError(error, history, dispatch);
    dispatch({
      type: types.COMPANIES_ERROR,
    });
  }
};

export const getUserCompaniesAction = (history) => async (dispatch) => {
  try {
    dispatch({
      type: types.USER_COMPANIES_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
      headers: { Authorization: "Bearer " + getToken() },
    };
    const response = await API.get(config)("/api/common/companies/user");
    const data = response.data;
    dispatch({
      type: types.USER_COMPANIES_DATA,
      payload: data,
    });
  } catch (error) {
    handleError(error, history, dispatch);
    dispatch({
      type: types.USER_COMPANIES_ERROR,
    });
  }
};

export const getDepartmentsAction = (history) => async (dispatch) => {
  try {
    dispatch({
      type: types.DEPARTMENTS_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
      headers: { Authorization: "Bearer " + getToken() },
    };
    const response = await API.get(config)("/api/common/departments");
    const data = response.data;
    dispatch({
      type: types.DEPARTMENTS_DATA,
      payload: data,
    });
  } catch (error) {
    handleError(error, history, dispatch);
    dispatch({
      type: types.DEPARTMENTS_ERROR,
    });
  }
};

export const getAreasAction = (history) => async (dispatch) => {
  try {
    dispatch({
      type: types.AREAS_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
      headers: { Authorization: "Bearer " + getToken() },
    };
    const response = await API.get(config)("/api/common/areas");
    const data = response.data;
    dispatch({
      type: types.AREAS_DATA,
      payload: data,
    });
  } catch (error) {
    handleError(error, history, dispatch);
    dispatch({
      type: types.AREAS_ERROR,
    });
  }
};

export const getSourcesAction = (history) => async (dispatch) => {
  try {
    dispatch({
      type: types.SOURCES_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
      headers: { Authorization: "Bearer " + getToken() },
    };
    const response = await API.get(config)("/api/common/sources");
    const data = response.data;
    dispatch({
      type: types.SOURCES_DATA,
      payload: data,
    });
  } catch (error) {
    handleError(error, history, dispatch);
    dispatch({
      type: types.SOURCES_ERROR,
    });
  }
};

export const getNCTypesAction = (history) => async (dispatch) => {
  try {
    dispatch({
      type: types.NC_TYPES_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
      headers: { Authorization: "Bearer " + getToken() },
    };
    const response = await API.get(config)("/api/common/nc-types");
    const data = response.data;
    dispatch({
      type: types.NC_TYPES_DATA,
      payload: data,
    });
  } catch (error) {
    handleError(error, history, dispatch);
    dispatch({
      type: types.NC_TYPES_ERROR,
    });
  }
};

export const getManagementSystemsAction = (history) => async (dispatch) => {
  try {
    dispatch({
      type: types.MANAGEMENT_SYSTEMS_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
      headers: { Authorization: "Bearer " + getToken() },
    };
    const response = await API.get(config)("/api/common/management-systems");
    const data = response.data;
    dispatch({
      type: types.MANAGEMENT_SYSTEMS_DATA,
      payload: data,
    });
  } catch (error) {
    handleError(error, history, dispatch);
    dispatch({
      type: types.MANAGEMENT_SYSTEMS_ERROR,
    });
  }
};

export const getStatusesAction = (history) => async (dispatch) => {
  try {
    dispatch({
      type: types.STATUSES_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
      headers: { Authorization: "Bearer " + getToken() },
    };
    const response = await API.get(config)("/api/common/statuses");
    const data = response.data;
    dispatch({
      type: types.STATUSES_DATA,
      payload: data,
    });
  } catch (error) {
    handleError(error, history, dispatch);
    dispatch({
      type: types.STATUSES_ERROR,
    });
  }
};
export const getMonthsAction = (history) => async (dispatch) => {
  try {
    dispatch({
      type: types.MONTHS_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
      headers: { Authorization: "Bearer " + getToken() },
    };
    const response = await API.get(config)("/api/common/months");
    const data = response.data;
    dispatch({
      type: types.MONTHS_DATA,
      payload: data,
    });
  } catch (error) {
    handleError(error, history, dispatch);
    dispatch({
      type: types.MONTHS_ERROR,
    });
  }
};
export const getAuditFindingsAction = (history) => async (dispatch) => {
  try {
    dispatch({
      type: types.AUDIT_FINDINGS_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
      headers: { Authorization: "Bearer " + getToken() },
    };
    const response = await API.get(config)("/api/common/audit-findings");
    const data = response.data;
    dispatch({
      type: types.AUDIT_FINDINGS_DATA,
      payload: data,
    });
  } catch (error) {
    handleError(error, history, dispatch);
    dispatch({
      type: types.AUDIT_FINDINGS_ERROR,
    });
  }
};

export const addRecordAction = (requestData, history) => async (dispatch) => {
  try {
    dispatch({
      type: types.NCR_ADD_RECORD_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
      headers: {
        Authorization: "Bearer " + getToken(),
        "Content-Type": "multipart/form-data",
      },
    };
    const response = await API.post(config)("/api/ncr/records", requestData);
    dispatch({
      type: types.NCR_ADD_RECORD_SUCCESS,
      payload: response.data,
    });
    history.push("/ncr/records");
    message.success("Record Added Successfully.");
  } catch (error) {
    handleError(error, history, dispatch);
    dispatch({
      type: types.NCR_ADD_RECORD_ERROR,
    });
  }
};

export const updateRecordAction =
  (recordId, requestData, history) => async (dispatch) => {
    try {
      dispatch({
        type: types.NCR_UPDATE_RECORD_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: {
          Authorization: "Bearer " + getToken(),
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await API.patch(config)(
        "/api/ncr/records/update/" + recordId,
        requestData
      );
      dispatch({
        type: types.NCR_UPDATE_RECORD_SUCCESS,
        payload: response.data,
      });
      // history.push("/records");
      message.success("Record updated Successfully.");
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.NCR_UPDATE_RECORD_ERROR,
      });
    }
  };
export const updateCorrectiveActionPlanAction =
  (recordId, actionId, requestData, history) => async (dispatch) => {
    try {
      dispatch({
        type: types.NCR_UPDATE_RECORD_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: {
          Authorization: "Bearer " + getToken(),
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await API.patch(config)(
        "/api/ncr/records/update-action/" + recordId + "/" + actionId,
        requestData
      );
      dispatch({
        type: types.NCR_UPDATE_RECORD_SUCCESS,
        payload: response.data,
      });
      message.success("Record updated Successfully.");
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.NCR_UPDATE_RECORD_ERROR,
      });
    }
  };

export const updateClosedoutDateAction =
  (recordId, requestData, history) => async (dispatch) => {
    try {
      dispatch({
        type: types.NCR_UPDATE_RECORD_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      const response = await API.patch(config)(
        "/api/ncr/records/update-closed-out-date/" + recordId,
        requestData
      );
      dispatch({
        type: types.NCR_UPDATE_RECORD_SUCCESS,
        payload: response.data,
      });
      message.success("Record updated Successfully.");
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.NCR_UPDATE_RECORD_ERROR,
      });
    }
  };

export const updateRemarksAction =
  (recordId, requestData, history) => async (dispatch) => {
    try {
      dispatch({
        type: types.NCR_UPDATE_RECORD_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      const response = await API.patch(config)(
        "/api/ncr/records/update-remarks/" + recordId,
        requestData
      );
      dispatch({
        type: types.NCR_UPDATE_RECORD_SUCCESS,
        payload: response.data,
      });
      message.success("Record updated Successfully.");
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.NCR_UPDATE_RECORD_ERROR,
      });
    }
  };

export const updateVerificationAction =
  (recordId, requestData, history) => async (dispatch) => {
    try {
      dispatch({
        type: types.NCR_UPDATE_RECORD_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      const response = await API.patch(config)(
        "/api/ncr/records/update-verification/" + recordId,
        requestData
      );
      dispatch({
        type: types.NCR_UPDATE_RECORD_SUCCESS,
        payload: response.data,
      });
      message.success("Record updated Successfully.");
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.NCR_UPDATE_RECORD_ERROR,
      });
    }
  };

export const updateStatusAction =
  (recordId, requestData, history) => async (dispatch) => {
    try {
      dispatch({
        type: types.NCR_UPDATE_RECORD_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      const response = await API.patch(config)(
        "/api/ncr/records/update-status/" + recordId,
        requestData
      );
      dispatch({
        type: types.NCR_UPDATE_RECORD_SUCCESS,
        payload: response.data,
      });
      message.success("Record updated Successfully.");
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.NCR_UPDATE_RECORD_ERROR,
      });
    }
  };

export const getNcrByMonthAction = (history) => async (dispatch) => {
  try {
    dispatch({
      type: types.NCR_BY_MONTH_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
      headers: { Authorization: "Bearer " + getToken() },
    };
    const response = await API.get(config)("/api/common/ncr-by-month");
    const data = response.data;
    dispatch({
      type: types.NCR_BY_MONTH_DATA,
      payload: data,
    });
  } catch (error) {
    handleError(error, history, dispatch);
    dispatch({
      type: types.NCR_BY_MONTH_ERROR,
    });
  }
};
export const getNcrByDepartmentAction = (history) => async (dispatch) => {
  try {
    dispatch({
      type: types.NCR_BY_DEPARTMENT_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
      headers: { Authorization: "Bearer " + getToken() },
    };
    const response = await API.get(config)("/api/common/ncr-by-department");
    const data = response.data;
    dispatch({
      type: types.NCR_BY_DEPARTMENT_DATA,
      payload: data,
    });
  } catch (error) {
    handleError(error, history, dispatch);
    dispatch({
      type: types.NCR_BY_DEPARTMENT_ERROR,
    });
  }
};
export const getNcrByStatusAction = (history) => async (dispatch) => {
  try {
    dispatch({
      type: types.NCR_BY_STATUS_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
      headers: { Authorization: "Bearer " + getToken() },
    };
    const response = await API.get(config)("/api/common/ncr-by-status");
    const data = response.data;
    dispatch({
      type: types.NCR_BY_STATUS_DATA,
      payload: data,
    });
  } catch (error) {
    handleError(error, history, dispatch);
    dispatch({
      type: types.NCR_BY_STATUS_ERROR,
    });
  }
};
export const getNcrByStatusAndMonthAction = (history) => async (dispatch) => {
  try {
    dispatch({
      type: types.NCR_BY_STATUS_AND_MONTH_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
      headers: { Authorization: "Bearer " + getToken() },
    };
    const response = await API.get(config)(
      "/api/common/ncr-by-status-and-month"
    );
    const data = response.data;
    dispatch({
      type: types.NCR_BY_STATUS_AND_MONTH_DATA,
      payload: data,
    });
  } catch (error) {
    handleError(error, history, dispatch);
    dispatch({
      type: types.NCR_BY_STATUS_AND_MONTH_ERROR,
    });
  }
};
export const getNcrByCompanyAction = (history) => async (dispatch) => {
  try {
    dispatch({
      type: types.NCR_BY_COMPANY_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
      headers: { Authorization: "Bearer " + getToken() },
    };
    const response = await API.get(config)("/api/common/ncr-by-company");
    const data = response.data;
    dispatch({
      type: types.NCR_BY_COMPANY_DATA,
      payload: data,
    });
  } catch (error) {
    handleError(error, history, dispatch);
    dispatch({
      type: types.NCR_BY_COMPANY_ERROR,
    });
  }
};

export const getCalibrationRecordsAction =
  (pageNumber, history, searchValue, filter) => async (dispatch) => {
    try {
      dispatch({
        type: types.CALIBRATION_RECORD_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      var query = "?page=" + pageNumber;
      if (searchValue && searchValue != "undefined") {
        query += `&searchValue=${searchValue}`;
      }
      if (filter && filter != "undefined") {
        query += `&filter=${filter}`;
      }
      const response = await API.get(config)(
        "/api/calibration/records" + query
      );
      const data = response.data;
      dispatch({
        type: types.CALIBRATION_RECORD_DATA,
        payload: data,
      });
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.CALIBRATION_RECORD_ERROR,
      });
    }
  };

export const getCalibrationRecordDetailAction =
  (recordId, history) => async (dispatch) => {
    try {
      dispatch({
        type: types.CALIBRATION_RECORD_DETAIL_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      const response = await API.get(config)(
        "/api/calibration/records/" + recordId
      );
      const data = response.data;
      dispatch({
        type: types.CALIBRATION_RECORD_DETAIL_DATA,
        payload: data,
      });
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.CALIBRATION_RECORD_DETAIL_ERROR,
      });
    }
  };

export const getFrequenciesAction = (history) => async (dispatch) => {
  try {
    dispatch({
      type: types.FREQUENCIES_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
      headers: { Authorization: "Bearer " + getToken() },
    };
    const response = await API.get(config)("/api/common/frequencies");
    const data = response.data;
    dispatch({
      type: types.FREQUENCIES_DATA,
      payload: data,
    });
  } catch (error) {
    handleError(error, history, dispatch);
    dispatch({
      type: types.FREQUENCIES_ERROR,
    });
  }
};

export const addCalibrationRecordAction =
  (requestData, history) => async (dispatch) => {
    try {
      dispatch({
        type: types.CALIBRATION_ADD_RECORD_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: {
          Authorization: "Bearer " + getToken(),
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await API.post(config)(
        "/api/calibration/records",
        requestData
      );
      dispatch({
        type: types.CALIBRATION_ADD_RECORD_SUCCESS,
        payload: response.data,
      });
      history.push("/equipment-calibration/records");
      message.success("Record Added Successfully.");
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.CALIBRATION_ADD_RECORD_ERROR,
      });
    }
  };

export const updateCalibrationRecordAction =
  (recordId, requestData, history) => async (dispatch) => {
    try {
      dispatch({
        type: types.CALIBRATION_UPDATE_RECORD_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: {
          Authorization: "Bearer " + getToken(),
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await API.patch(config)(
        "/api/calibration/records/update/" + recordId,
        requestData
      );
      dispatch({
        type: types.CALIBRATION_UPDATE_RECORD_SUCCESS,
        payload: response.data,
      });
      history.push("/equipment-calibration/records");
      message.success("Record updated Successfully.");
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.CALIBRATION_UPDATE_RECORD_ERROR,
      });
    }
  };

export const getDueCalibrationsByMonthAction =
  (history) => async (dispatch) => {
    try {
      dispatch({
        type: types.DUE_CALIBRATION_BY_MONTH_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      const response = await API.get(config)(
        "/api/common/due-calibration-by-month"
      );
      const data = response.data;
      dispatch({
        type: types.DUE_CALIBRATION_BY_MONTH_DATA,
        payload: data,
      });
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.DUE_CALIBRATION_BY_MONTH_ERROR,
      });
    }
  };

export const getCalibrationsByFrequencyAction =
  (history) => async (dispatch) => {
    try {
      dispatch({
        type: types.CALIBRATION_BY_FREQUENCY_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      const response = await API.get(config)(
        "/api/common/calibration-by-frequency"
      );
      const data = response.data;
      dispatch({
        type: types.CALIBRATION_BY_FREQUENCY_DATA,
        payload: data,
      });
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.CALIBRATION_BY_FREQUENCY_ERROR,
      });
    }
  };

export const getCalibrationsAllRecordsAction =
  (history) => async (dispatch) => {
    try {
      dispatch({
        type: types.CALIBRATION_ALL_RECORDS_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      const response = await API.get(config)(
        "/api/calibration/records/get/all"
      );
      const data = response.data;
      dispatch({
        type: types.CALIBRATION_ALL_RECORDS_DATA,
        payload: data,
      });
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.CALIBRATION_ALL_RECORDS_ERROR,
      });
    }
  };

export const getYearsAction = (history) => async (dispatch) => {
  try {
    dispatch({
      type: types.YEARS_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
      headers: { Authorization: "Bearer " + getToken() },
    };
    const response = await API.get(config)("/api/common/years");
    const data = response.data;
    dispatch({
      type: types.YEARS_DATA,
      payload: data,
    });
  } catch (error) {
    handleError(error, history, dispatch);
    dispatch({
      type: types.YEARS_ERROR,
    });
  }
};
export const getQuatersAction = (history) => async (dispatch) => {
  try {
    dispatch({
      type: types.QUATERS_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
      headers: { Authorization: "Bearer " + getToken() },
    };
    const response = await API.get(config)("/api/common/quaters");
    const data = response.data;
    dispatch({
      type: types.QUATERS_DATA,
      payload: data,
    });
  } catch (error) {
    handleError(error, history, dispatch);
    dispatch({
      type: types.QUATERS_ERROR,
    });
  }
};
export const getAspectsAction = (history) => async (dispatch) => {
  try {
    dispatch({
      type: types.ASPECTS_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
      headers: { Authorization: "Bearer " + getToken() },
    };
    const response = await API.get(config)("/api/common/aspects");
    const data = response.data;
    dispatch({
      type: types.ASPECTS_DATA,
      payload: data,
    });
  } catch (error) {
    handleError(error, history, dispatch);
    dispatch({
      type: types.ASPECTS_ERROR,
    });
  }
};

export const getSurveysAction =
  (pageNumber, history, yearId, quaterId, companyId) => async (dispatch) => {
    try {
      dispatch({
        type: types.SURVEYS_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      var query = "?page=" + pageNumber;
      if (yearId && yearId != "undefined") {
        query += `&year_id=${yearId}`;
      }
      if (quaterId && quaterId != "undefined") {
        query += `&quater_id=${quaterId}`;
      }
      if (companyId && companyId != "undefined") {
        query += `&company_id=${companyId}`;
      }

      const response = await API.get(config)("/api/survey" + query);
      const data = response.data;
      dispatch({
        type: types.SURVEYS_DATA,
        payload: data,
      });
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.SURVEYS_ERROR,
      });
    }
  };

export const getSurveyDetailAction = (id, history) => async (dispatch) => {
  try {
    dispatch({
      type: types.SURVEY_DETAIL_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
      headers: { Authorization: "Bearer " + getToken() },
    };
    const response = await API.get(config)("/api/survey/" + id);
    const data = response.data;
    if (data) {
      dispatch({
        type: types.SURVEY_DETAIL_DATA,
        payload: data,
      });
    } else {
      dispatch({
        type: types.SURVEY_DETAIL_ERROR,
      });
    }
  } catch (error) {
    handleError(error, history, dispatch);
    dispatch({
      type: types.SURVEY_DETAIL_ERROR,
    });
  }
};

export const addSurveyAction = (requestData, history) => async (dispatch) => {
  try {
    dispatch({
      type: types.ADD_SURVEY_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
      headers: { Authorization: "Bearer " + getToken() },
    };
    const response = await API.post(config)("/api/survey/add", requestData);
    dispatch({
      type: types.ADD_SURVEY_SUCCESS,
      payload: response.data,
    });
    history.push("/customer-survey/surveys");
    message.success("Survey Created Successfully.");
  } catch (error) {
    handleError(error, history, dispatch);
    dispatch({
      type: types.ADD_SURVEY_ERROR,
    });
  }
};

export const updateSurveyAction =
  (id, requestData, history) => async (dispatch) => {
    try {
      dispatch({
        type: types.UPDATE_SURVEY_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      const response = await API.patch(config)(
        "/api/survey/update/" + id,
        requestData
      );
      dispatch({
        type: types.UPDATE_SURVEY_SUCCESS,
        payload: response.data,
      });
      message.success("Survey updated Successfully.");
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.UPDATE_SURVEY_ERROR,
      });
    }
  };

export const addSurveyFeedbackAction =
  (id, requestData, history) => async (dispatch) => {
    try {
      dispatch({
        type: types.ADD_SURVEY_FEEDBACK_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      const response = await API.post(config)(
        "/api/survey/add-feedback/" + id,
        requestData
      );
      dispatch({
        type: types.ADD_SURVEY_FEEDBACK_SUCCESS,
        payload: response.data,
      });
      message.success("Survey Feedback has been submitted.");
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.ADD_SURVEY_FEEDBACK_ERROR,
      });
    }
  };
export const sendSurveyReminderToUserAction =
  (surveyId, surveyUserId, history) => async (dispatch) => {
    try {
      dispatch({
        type: types.SEND_SURVEY_REMINDER_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      await API.get(config)(`/api/survey/reminder/${surveyId}/${surveyUserId}`);
      message.success("Reminder Sent!");
      dispatch({
        type: types.SEND_SURVEY_REMINDER_SUCCESS,
      });
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.SEND_SURVEY_REMINDER_ERROR,
      });
    }
  };

export const getSurveyRatingByAspectAndYearAction =
  (requestData, history) => async (dispatch) => {
    try {
      dispatch({
        type: types.SURVEY_RATING_BY_ASPECT_YEAR_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      const response = await API.post(config)(
        `/api/survey/rating-by-aspect-year`,
        requestData
      );
      const data = response.data;
      dispatch({
        type: types.SURVEY_RATING_BY_ASPECT_YEAR_DATA,
        payload: data,
      });
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.SURVEY_RATING_BY_ASPECT_YEAR_ERROR,
      });
    }
  };

export const getSurveyRatingByCompanyAndYearAction =
  (requestData, history) => async (dispatch) => {
    try {
      dispatch({
        type: types.SURVEY_RATING_BY_COMPANY_YEAR_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      const response = await API.post(config)(
        `/api/survey/rating-by-company-year`,
        requestData
      );
      const data = response.data;
      dispatch({
        type: types.SURVEY_RATING_BY_COMPANY_YEAR_DATA,
        payload: data,
      });
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.SURVEY_RATING_BY_COMPANY_YEAR_ERROR,
      });
    }
  };

export const getAllSurveysDataAction = (history) => async (dispatch) => {
  try {
    dispatch({
      type: types.ALL_SURVEYS_DATA_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
      headers: { Authorization: "Bearer " + getToken() },
    };
    const response = await API.get(config)(`/api/survey/get-surveys-data/all`);
    const data = response.data;
    dispatch({
      type: types.ALL_SURVEYS_DATA_DATA,
      payload: data,
    });
  } catch (error) {
    handleError(error, history, dispatch);
    dispatch({
      type: types.ALL_SURVEYS_DATA_ERROR,
    });
  }
};

export const getAuditStatusesAction = (history) => async (dispatch) => {
  try {
    dispatch({
      type: types.AUDIT_STATUSES_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
      headers: { Authorization: "Bearer " + getToken() },
    };
    const response = await API.get(config)("/api/common/audit-statuses");
    const data = response.data;
    dispatch({
      type: types.AUDIT_STATUSES_DATA,
      payload: data,
    });
  } catch (error) {
    handleError(error, history, dispatch);
    dispatch({
      type: types.AUDIT_STATUSES_ERROR,
    });
  }
};
export const getAuditsAction =
  (pageNumber, history, yearId, auditStatusId) => async (dispatch) => {
    try {
      dispatch({
        type: types.AUDITS_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      var query = "?page=" + pageNumber;
      if (yearId && yearId != "undefined") {
        query += `&year_id=${yearId}`;
      }
      if (auditStatusId && auditStatusId != "undefined") {
        query += `&status_id=${yearId}`;
      }
      const response = await API.get(config)("/api/audits" + query);
      const data = response.data;
      dispatch({
        type: types.AUDITS_DATA,
        payload: data,
      });
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.AUDITS_ERROR,
      });
    }
  };

export const getAuditDetailAction = (history, auditId) => async (dispatch) => {
  try {
    dispatch({
      type: types.AUDIT_DETAIL_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
      headers: { Authorization: "Bearer " + getToken() },
    };
    const response = await API.get(config)(`/api/audits/${auditId}`);
    const data = response.data;
    dispatch({
      type: types.AUDIT_DETAIL_DATA,
      payload: data,
    });
  } catch (error) {
    handleError(error, history, dispatch);
    dispatch({
      type: types.AUDIT_DETAIL_ERROR,
    });
  }
};

export const addAuditAction =
  (history, requestData, selectedYear) => async (dispatch) => {
    try {
      dispatch({
        type: types.ADD_AUDIT_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      const response = await API.post(config)("/api/audits/add", requestData);
      if (response.data.year.year === selectedYear) {
        dispatch({
          type: types.ADD_AUDIT_SUCCESS,
          payload: response.data,
        });
      }
      message.success("Audit Scheduled Successfully.");
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.ADD_AUDIT_ERROR,
      });
    }
  };
export const updateAuditAction =
  (history, requestData, auditId) => async (dispatch) => {
    try {
      dispatch({
        type: types.UPDATE_AUDIT_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      const response = await API.patch(config)(
        `/api/audits/update/${auditId}`,
        requestData
      );
      dispatch({
        type: types.UPDATE_AUDIT_SUCCESS,
        payload: response.data,
      });
      message.success("Audit Updated.");
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.UPDATE_AUDIT_ERROR,
      });
    }
  };

export const addAuditNotificationAction =
  (history, requestData, auditId) => async (dispatch) => {
    try {
      dispatch({
        type: types.ADD_AUDIT_NOTIFICATION_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: {
          Authorization: "Bearer " + getToken(),
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await API.post(config)(
        `/api/audits/${auditId}/notification/add`,
        requestData
      );
      dispatch({
        type: types.ADD_AUDIT_NOTIFICATION_SUCCESS,
        payload: response.data,
      });
      message.success("Audit Notification Added.");
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.ADD_AUDIT_NOTIFICATION_ERROR,
      });
    }
  };
export const addAuditChecklistAction =
  (history, requestData, auditId) => async (dispatch) => {
    try {
      dispatch({
        type: types.ADD_AUDIT_CHECKLIST_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      const response = await API.post(config)(
        `/api/audits/${auditId}/checklist/add`,
        requestData
      );
      dispatch({
        type: types.ADD_AUDIT_CHECKLIST_SUCCESS,
        payload: response.data,
      });
      message.success("Audit Checklist Added.");
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.ADD_AUDIT_CHECKLIST_ERROR,
      });
    }
  };
export const updateAuditChecklistAction =
  (history, requestData, auditId, checklistId) => async (dispatch) => {
    try {
      dispatch({
        type: types.UPDATE_AUDIT_CHECKLIST_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      const response = await API.patch(config)(
        `/api/audits/${auditId}/checklist/${checklistId}`,
        requestData
      );
      dispatch({
        type: types.UPDATE_AUDIT_CHECKLIST_SUCCESS,
        payload: response.data,
      });
      message.success("Audit Checklist updated.");
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.UPDATE_AUDIT_CHECKLIST_ERROR,
      });
    }
  };
export const deleteAuditChecklistAction =
  (history, auditId, checklistId) => async (dispatch) => {
    try {
      dispatch({
        type: types.DELETE_AUDIT_CHECKLIST_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      const response = await API.delete(config)(
        `/api/audits/${auditId}/checklist/${checklistId}`
      );
      dispatch({
        type: types.DELETE_AUDIT_CHECKLIST_SUCCESS,
        payload: response.data,
      });
      message.success("Audit Checklist deleted.");
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.DELETE_AUDIT_CHECKLIST_ERROR,
      });
    }
  };

export const submitAuditChecklistAction =
  (history, requestData, auditId) => async (dispatch) => {
    try {
      dispatch({
        type: types.UPDATE_AUDIT_CHECKLIST_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      const response = await API.patch(config)(
        `/api/audits/${auditId}/submit`,
        requestData
      );
      dispatch({
        type: types.UPDATE_AUDIT_CHECKLIST_SUCCESS,
        payload: response.data,
      });
      message.success("Audit Checklist updated.");
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.UPDATE_AUDIT_CHECKLIST_ERROR,
      });
    }
  };
export const completeAuditAction =
  (history, requestData, auditId) => async (dispatch) => {
    try {
      dispatch({
        type: types.UPDATE_AUDIT_CHECKLIST_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      const response = await API.patch(config)(
        `/api/audits/${auditId}/complete`,
        requestData
      );
      dispatch({
        type: types.UPDATE_AUDIT_CHECKLIST_SUCCESS,
        payload: response.data,
      });
      message.success("Audit updated.");
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.UPDATE_AUDIT_CHECKLIST_ERROR,
      });
    }
  };

export const copyAuditChecklistAction =
  (history, requestData, auditId) => async (dispatch) => {
    try {
      dispatch({
        type: types.UPDATE_AUDIT_CHECKLIST_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      const response = await API.post(config)(
        `/api/audits/${auditId}/copy-checklist`,
        requestData
      );
      dispatch({
        type: types.UPDATE_AUDIT_CHECKLIST_SUCCESS,
        payload: response.data,
      });
      message.success("Audit updated.");
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.UPDATE_AUDIT_CHECKLIST_ERROR,
      });
    }
  };

export const getFindingTypesAction = (history) => async (dispatch) => {
  try {
    dispatch({
      type: types.FINDING_TYPES_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
      headers: { Authorization: "Bearer " + getToken() },
    };
    const response = await API.get(config)("/api/common/finding-types");
    const data = response.data;
    dispatch({
      type: types.FINDING_TYPES_DATA,
      payload: data,
    });
  } catch (error) {
    handleError(error, history, dispatch);
    dispatch({
      type: types.FINDING_TYPES_ERROR,
    });
  }
};

export const getLocationsAction = (history) => async (dispatch) => {
  try {
    dispatch({
      type: types.LOCATIONS_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
      headers: { Authorization: "Bearer " + getToken() },
    };
    const response = await API.get(config)("/api/common/locations");
    const data = response.data;
    dispatch({
      type: types.LOCATIONS_DATA,
      payload: data,
    });
  } catch (error) {
    handleError(error, history, dispatch);
    dispatch({
      type: types.LOCATIONS_ERROR,
    });
  }
};

export const addLocationAction = (history, requestData) => async (dispatch) => {
  try {
    dispatch({
      type: types.ADD_LOCATION_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
      headers: { Authorization: "Bearer " + getToken() },
    };
    const response = await API.post(config)(
      "/api/common/add-location",
      requestData
    );
    const data = response.data;
    dispatch({
      type: types.ADD_LOCATION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    handleError(error, history, dispatch);
    dispatch({
      type: types.ADD_LOCATION_ERROR,
    });
  }
};

export const getEmergencyDrillTypesAction = (history) => async (dispatch) => {
  try {
    dispatch({
      type: types.EMERGENCY_DRILL_TYPES_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
      headers: { Authorization: "Bearer " + getToken() },
    };
    const response = await API.get(config)("/api/common/emergency-drill-types");
    const data = response.data;
    dispatch({
      type: types.EMERGENCY_DRILL_TYPES_DATA,
      payload: data,
    });
  } catch (error) {
    handleError(error, history, dispatch);
    dispatch({
      type: types.EMERGENCY_DRILL_TYPES_ERROR,
    });
  }
};
export const getDrillEmployeesAttendenceActions =
  (history, drillId) => async (dispatch) => {
    try {
      dispatch({
        type: types.DRILL_ATTENDENCE_EMPLOYEES_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      const response = await API.get(config)(
        `/api/emergency-drills/${drillId}/employee-attendence`
      );
      const data = response.data;
      dispatch({
        type: types.DRILL_ATTENDENCE_EMPLOYEES_DATA,
        payload: data,
      });
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.DRILL_ATTENDENCE_EMPLOYEES_ERROR,
      });
    }
  };

export const getEmergencyDrillsAction =
  (history, pageNumber, yearId, companyId) => async (dispatch) => {
    try {
      dispatch({
        type: types.EMERGENCY_DRILLS_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      var query = "?page=" + pageNumber;
      if (yearId && yearId != "undefined") {
        query += `&year_id=${yearId}`;
      }
      if (companyId && companyId != "undefined") {
        query += `&company_id=${companyId}`;
      }
      const response = await API.get(config)("/api/emergency-drills" + query);
      const data = response.data;
      dispatch({
        type: types.EMERGENCY_DRILLS_DATA,
        payload: data,
      });
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.EMERGENCY_DRILLS_ERROR,
      });
    }
  };

export const getEmergencyDrillDetailAction =
  (history, id) => async (dispatch) => {
    try {
      dispatch({
        type: types.EMERGENCY_DRILL_DETAIL_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      const response = await API.get(config)(`/api/emergency-drills/${id}`);
      const data = response.data;
      dispatch({
        type: types.EMERGENCY_DRILL_DETAIL_DATA,
        payload: data,
      });
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.EMERGENCY_DRILL_DETAIL_ERROR,
      });
    }
  };

export const addEmergencyDrillAction =
  (history, requestData, selectedYear) => async (dispatch) => {
    try {
      dispatch({
        type: types.ADD_EMERGENCY_DRILL_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      const response = await API.post(config)(
        "/api/emergency-drills/add",
        requestData
      );
      if (response.data.year.year === selectedYear) {
        dispatch({
          type: types.ADD_EMERGENCY_DRILL_SUCCESS,
          payload: response.data,
        });
      }
      message.success("Drill Scheduled Successfully.");
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.ADD_EMERGENCY_DRILL_ERROR,
      });
    }
  };

export const addEmergencyDrillNotificationAction =
  (history, requestData, drillId) => async (dispatch) => {
    try {
      dispatch({
        type: types.ADD_EMERGENCY_DRILL_NOTIFICATION_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      const response = await API.post(config)(
        `/api/emergency-drills/${drillId}/notification/add`,
        requestData
      );
      dispatch({
        type: types.ADD_EMERGENCY_DRILL_NOTIFICATION_SUCCESS,
        payload: response.data,
      });
      message.success("Drill Notification Created.");
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.ADD_EMERGENCY_DRILL_NOTIFICATION_ERROR,
      });
    }
  };

export const saveEmployeesAttendenceAction =
  (history, drillId, reqData) => async (dispatch) => {
    try {
      dispatch({
        type: types.SAVE_EMPLOYEE_ATTENDENCE_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      const response = await API.post(config)(
        `/api/emergency-drills/${drillId}/save-employee-attendence`,
        reqData
      );
      const data = response.data;
      dispatch({
        type: types.SAVE_EMPLOYEE_ATTENDENCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.SAVE_EMPLOYEE_ATTENDENCE_ERROR,
      });
    }
  };
export const submitEmployeesAttendenceAction =
  (history, drillId, reqData) => async (dispatch) => {
    try {
      dispatch({
        type: types.UPDATE_EMERGENCY_DRILL_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      const response = await API.post(config)(
        `/api/emergency-drills/${drillId}/submit-employee-attendence`,
        reqData
      );
      const data = response.data;
      dispatch({
        type: types.UPDATE_EMERGENCY_DRILL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.UPDATE_EMERGENCY_DRILL_ERROR,
      });
    }
  };
export const updateEmergencyDrill =
  (history, drillId, reqData) => async (dispatch) => {
    try {
      dispatch({
        type: types.UPDATE_EMERGENCY_DRILL_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: {
          Authorization: "Bearer " + getToken(),
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await API.patch(config)(
        `/api/emergency-drills/${drillId}/update`,
        reqData
      );
      const data = response.data;
      dispatch({
        type: types.UPDATE_EMERGENCY_DRILL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.UPDATE_EMERGENCY_DRILL_ERROR,
      });
    }
  };

export const getEnvironmentalProbabilitiesAction =
  (history) => async (dispatch) => {
    try {
      dispatch({
        type: types.ENVIRONMENTAL_PROBABILITYS_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      const response = await API.get(config)("/api/eair/probabilities");
      const data = response.data;
      dispatch({
        type: types.ENVIRONMENTAL_PROBABILITYS_DATA,
        payload: data,
      });
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.ENVIRONMENTAL_PROBABILITYS_ERROR,
      });
    }
  };

export const getEnvironmentalSeveritiesAction =
  (history) => async (dispatch) => {
    try {
      dispatch({
        type: types.ENVIRONMENTAL_SEVERITYS_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      const response = await API.get(config)("/api/eair/severities");
      const data = response.data;
      dispatch({
        type: types.ENVIRONMENTAL_SEVERITYS_DATA,
        payload: data,
      });
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.ENVIRONMENTAL_SEVERITYS_ERROR,
      });
    }
  };
export const getEnvironmentalActivitiesAction =
  (history) => async (dispatch) => {
    try {
      dispatch({
        type: types.ENVIRONMENTAL_ACTIVITIES_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      const response = await API.get(config)("/api/eair/activities");
      const data = response.data;
      dispatch({
        type: types.ENVIRONMENTAL_ACTIVITIES_DATA,
        payload: data,
      });
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.ENVIRONMENTAL_ACTIVITIES_ERROR,
      });
    }
  };
export const addEnvironmentalActivitiesAction =
  (history, requestData) => async (dispatch) => {
    try {
      dispatch({
        type: types.ADD_ENVIRONMENTAL_ACTIVITY_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      const response = await API.post(config)(
        "/api/eair/add-activity",
        requestData
      );
      const data = response.data;
      dispatch({
        type: types.ADD_ENVIRONMENTAL_ACTIVITY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.ADD_ENVIRONMENTAL_ACTIVITY_ERROR,
      });
    }
  };

export const getEnvironmentalRecordsAction = (history) => async (dispatch) => {
  try {
    dispatch({
      type: types.ENVIRONMENTAL_RECORDS_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
      headers: { Authorization: "Bearer " + getToken() },
    };
    const response = await API.get(config)("/api/eair");
    const data = response.data;
    dispatch({
      type: types.ENVIRONMENTAL_RECORDS_DATA,
      payload: data,
    });
  } catch (error) {
    handleError(error, history, dispatch);
    dispatch({
      type: types.ENVIRONMENTAL_RECORDS_ERROR,
    });
  }
};

export const getEnvironmentalRecordDetailAction =
  (history, id) => async (dispatch) => {
    try {
      dispatch({
        type: types.ENVIRONMENTAL_RECORD_DETAIL_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      const response = await API.get(config)(`/api/eair/${id}`);
      const data = response.data;
      dispatch({
        type: types.ENVIRONMENTAL_RECORD_DETAIL_DATA,
        payload: data,
      });
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.ENVIRONMENTAL_RECORD_DETAIL_ERROR,
      });
    }
  };

export const addEnvironmentalRecordAction =
  (history, requestData) => async (dispatch) => {
    try {
      dispatch({
        type: types.ADD_ENVIRONMENTAL_RECORD_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      const response = await API.post(config)("/api/eair", requestData);
      dispatch({
        type: types.ADD_ENVIRONMENTAL_RECORD_SUCCESS,
        payload: response.data,
      });
      history.push("/eair/records");
      message.success("Environmental Record Successfully Created.");
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.ADD_ENVIRONMENTAL_RECORD_ERROR,
      });
    }
  };
export const addAssessmentAction =
  (history, id, requestData) => async (dispatch) => {
    try {
      dispatch({
        type: types.UPDATE_ENVIRONMENTAL_RECORD_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      const response = await API.post(config)(
        `/api/eair/${id}/add-assessment`,
        requestData
      );
      dispatch({
        type: types.UPDATE_ENVIRONMENTAL_RECORD_SUCCESS,
        payload: response.data,
      });
      message.success("Environmental Record Successfully Updated.");
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.UPDATE_ENVIRONMENTAL_RECORD_ERROR,
      });
    }
  };
export const addMeasurementAction =
  (history, recordId, assessmentId, requestData) => async (dispatch) => {
    try {
      dispatch({
        type: types.UPDATE_ENVIRONMENTAL_RECORD_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      const response = await API.post(config)(
        `/api/eair/${recordId}/add-measurement/${assessmentId}`,
        requestData
      );
      dispatch({
        type: types.UPDATE_ENVIRONMENTAL_RECORD_SUCCESS,
        payload: response.data,
      });
      message.success("Environmental Record Successfully Updated.");
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.UPDATE_ENVIRONMENTAL_RECORD_ERROR,
      });
    }
  };
export const updateAssessmentAction =
  (history, recordId, assessmentId, requestData) => async (dispatch) => {
    try {
      dispatch({
        type: types.UPDATE_ENVIRONMENTAL_RECORD_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      const response = await API.patch(config)(
        `/api/eair/${recordId}/update-assessment/${assessmentId}`,
        requestData
      );
      dispatch({
        type: types.UPDATE_ENVIRONMENTAL_RECORD_SUCCESS,
        payload: response.data,
      });
      message.success("Environmental Record Successfully Updated.");
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.UPDATE_ENVIRONMENTAL_RECORD_ERROR,
      });
    }
  };

export const getFaceTerminalsAction = (history) => async (dispatch) => {
  try {
    dispatch({
      type: types.FACE_TERMINALS_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
      headers: { Authorization: "Bearer " + getToken() },
    };
    const response = await API.get(config)("/api/common/face-terminals");
    const data = response.data;
    dispatch({
      type: types.FACE_TERMINALS_DATA,
      payload: data,
    });
  } catch (error) {
    handleError(error, history, dispatch);
    dispatch({
      type: types.FACE_TERMINALS_ERROR,
    });
  }
};

export const getHiraProbabilitiesAction = (history) => async (dispatch) => {
  try {
    dispatch({
      type: types.HIRA_PROBABILITYS_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
      headers: { Authorization: "Bearer " + getToken() },
    };
    const response = await API.get(config)("/api/hira/probabilities");
    const data = response.data;
    dispatch({
      type: types.HIRA_PROBABILITYS_DATA,
      payload: data,
    });
  } catch (error) {
    handleError(error, history, dispatch);
    dispatch({
      type: types.HIRA_PROBABILITYS_ERROR,
    });
  }
};

export const getHiraSeveritiesAction = (history) => async (dispatch) => {
  try {
    dispatch({
      type: types.HIRA_SEVERITYS_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
      headers: { Authorization: "Bearer " + getToken() },
    };
    const response = await API.get(config)("/api/hira/severities");
    const data = response.data;
    dispatch({
      type: types.HIRA_SEVERITYS_DATA,
      payload: data,
    });
  } catch (error) {
    handleError(error, history, dispatch);
    dispatch({
      type: types.HIRA_SEVERITYS_ERROR,
    });
  }
};

export const getHiraEntitiesAction = (history) => async (dispatch) => {
  try {
    dispatch({
      type: types.HIRA_ENTITIES_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
      headers: { Authorization: "Bearer " + getToken() },
    };
    const response = await API.get(config)("/api/hira/entities");
    const data = response.data;
    dispatch({
      type: types.HIRA_ENTITIES_DATA,
      payload: data,
    });
  } catch (error) {
    handleError(error, history, dispatch);
    dispatch({
      type: types.HIRA_ENTITIES_ERROR,
    });
  }
};

export const getHiraHazardsAction = (history) => async (dispatch) => {
  try {
    dispatch({
      type: types.HIRA_HAZARDS_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
      headers: { Authorization: "Bearer " + getToken() },
    };
    const response = await API.get(config)("/api/hira/hazards");
    const data = response.data;
    dispatch({
      type: types.HIRA_HAZARDS_DATA,
      payload: data,
    });
  } catch (error) {
    handleError(error, history, dispatch);
    dispatch({
      type: types.HIRA_HAZARDS_ERROR,
    });
  }
};
export const addHiraHazardAction =
  (history, requestData) => async (dispatch) => {
    try {
      dispatch({
        type: types.ADD_HIRA_HAZARD_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      const response = await API.post(config)(
        "/api/hira/add-hazard",
        requestData
      );
      const data = response.data;
      dispatch({
        type: types.ADD_HIRA_HAZARD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.ADD_HIRA_HAZARD_ERROR,
      });
    }
  };

export const getHiraRecordsAction = (history) => async (dispatch) => {
  try {
    dispatch({
      type: types.HIRA_RECORDS_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
      headers: { Authorization: "Bearer " + getToken() },
    };
    const response = await API.get(config)("/api/hira");
    const data = response.data;
    dispatch({
      type: types.HIRA_RECORDS_DATA,
      payload: data,
    });
  } catch (error) {
    handleError(error, history, dispatch);
    dispatch({
      type: types.HIRA_RECORDS_ERROR,
    });
  }
};

export const getHiraRecordDetailAction = (history, id) => async (dispatch) => {
  try {
    dispatch({
      type: types.HIRA_RECORD_DETAIL_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
      headers: { Authorization: "Bearer " + getToken() },
    };
    const response = await API.get(config)(`/api/hira/${id}`);
    const data = response.data;
    dispatch({
      type: types.HIRA_RECORD_DETAIL_DATA,
      payload: data,
    });
  } catch (error) {
    handleError(error, history, dispatch);
    dispatch({
      type: types.HIRA_RECORD_DETAIL_ERROR,
    });
  }
};

export const addHiraRecordAction =
  (history, requestData) => async (dispatch) => {
    try {
      dispatch({
        type: types.ADD_HIRA_RECORD_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      const response = await API.post(config)("/api/hira", requestData);
      dispatch({
        type: types.ADD_HIRA_RECORD_SUCCESS,
        payload: response.data,
      });
      history.push("/hsera/records");
      message.success("Hira Record Successfully Created.");
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.ADD_HIRA_RECORD_ERROR,
      });
    }
  };
export const addHiraRecordAssessmentAction =
  (history, id, requestData) => async (dispatch) => {
    try {
      dispatch({
        type: types.UPDATE_HIRA_RECORD_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      const response = await API.post(config)(
        `/api/hira/${id}/add-assessment`,
        requestData
      );
      dispatch({
        type: types.UPDATE_HIRA_RECORD_SUCCESS,
        payload: response.data,
      });
      message.success("Hira Record Successfully Updated.");
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.UPDATE_HIRA_RECORD_ERROR,
      });
    }
  };
export const addHiraRecordAssessmentMeasurementAction =
  (history, recordId, assessmentId, requestData) => async (dispatch) => {
    try {
      dispatch({
        type: types.UPDATE_HIRA_RECORD_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      const response = await API.post(config)(
        `/api/hira/${recordId}/add-measurement/${assessmentId}`,
        requestData
      );
      dispatch({
        type: types.UPDATE_HIRA_RECORD_SUCCESS,
        payload: response.data,
      });
      message.success("Hira Record Successfully Updated.");
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.UPDATE_HIRA_RECORD_ERROR,
      });
    }
  };
export const updateHiraRecordAssessmentAction =
  (history, recordId, assessmentId, requestData) => async (dispatch) => {
    try {
      dispatch({
        type: types.UPDATE_HIRA_RECORD_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      const response = await API.patch(config)(
        `/api/hira/${recordId}/update-assessment/${assessmentId}`,
        requestData
      );
      dispatch({
        type: types.UPDATE_HIRA_RECORD_SUCCESS,
        payload: response.data,
      });
      message.success("Hira Record Successfully Updated.");
    } catch (error) {
      handleError(error, history, dispatch);
      dispatch({
        type: types.UPDATE_HIRA_RECORD_ERROR,
      });
    }
  };
