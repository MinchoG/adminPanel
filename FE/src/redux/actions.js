import {
  ACTION_LOGIN_SUCCESS,
  ACTION_LOGIN_FAILURE,
  ACTION_LOGIN_REQUEST,
  FETCH_EMPLOYEES,
  RECEIVE_EMPLOYEES,
  RECEIVE_ROW_ID,
  DELETE_EMPLOYEE,
  ADD_EMPLOYEE,
  EDIT_EMPLOYEE,
  CANCEL_EDIT_EMPLOYEE,
  SAVE_EMPLOYEE_POST,
  EDIT_EMPLOYEE_VALUE,
  SAVE_EMPLOYEE_PUT,
  STORE_UPLOADED_PIC_NAME,
  PUT_SELECTED_FILE_IN_STORE,
  FETCH_OPENINGS,
  RECEIVE_OPENINGS,
  FETCH_OPENINGS_BY_ID,
  DELETE_OPENING,
  EDIT_OPENING,
  TAKE_UI_SNAPSHOT,
  CANCEL_EDIT_OPENING,
  SAVE_OPENINGS_POST,
  SAVE_OPENINGS_PUT,
  ADD_OPENING,
  EDIT_OPENING_VALUE,
  RECEIVE_OPENINGS_BY_ID,
  FETCH_ABOUT,
  RECEIVE_ABOUT,
  DELETE_ABOUT,
  EDIT_ABOUT,
  CANCEL_EDIT_ABOUT,
  SAVE_ABOUT_PUT,
  SAVE_ABOUT_POST,
  EDIT_ABOUT_VALUE,
} from "./constants";

export const receiveLogin = payload => ({
  type: ACTION_LOGIN_REQUEST,
  isFetching: false,
  isAuthenticated: false,
  payload
}); //maybe gere user.id_token

export const loginSuccess = payload => ({
  type: ACTION_LOGIN_SUCCESS,
  isFetching: false,
  isAuthenticate: true,
  token: payload
});

export const loginError = payload => ({
  type: ACTION_LOGIN_FAILURE,
  isFetching: false,
  isAuthenticate: false,
  message: payload
});

export const fetchEmployees = payload => ({
  type: FETCH_EMPLOYEES,
  payload
});

export const receiveEmployees = payload => ({
  type: RECEIVE_EMPLOYEES,
  payload
});

export const receiveClickedRow = payload => ({
  type: RECEIVE_ROW_ID,
  index: payload
});

export const deleteClickedRow = payload => ({
  type: DELETE_EMPLOYEE,
  payload
});

export const addEmployee = payload => ({
  type: ADD_EMPLOYEE,
  payload
});

export const editEmployee = payload => ({
  type: EDIT_EMPLOYEE,
  clickedRow: payload
});

export const cancelEditEmployee = payload => ({
  type: CANCEL_EDIT_EMPLOYEE,
  payload
});

export const editEmployeeValue = payload => ({
  type: EDIT_EMPLOYEE_VALUE,
  payload
});

export const saveEmployeeWithPOST = payload => ({
  type: SAVE_EMPLOYEE_POST,
  payload
});

export const saveEmployeeWithPUT = payload => ({
  type: SAVE_EMPLOYEE_PUT,
  payload
});

export const storeUploadedPicName = payload => ({
  type: STORE_UPLOADED_PIC_NAME,
  payload
});

export const putSelectedFileInStore = payload => ({
  type: PUT_SELECTED_FILE_IN_STORE,
  payload
});

export const fetchOpenings = payload => ({
  type: FETCH_OPENINGS,
  payload
});

export const fetchOpeningsById = payload => ({
  type: FETCH_OPENINGS_BY_ID,
  payload
});

export const receiveOpeningsById = payload => ({
  type: RECEIVE_OPENINGS_BY_ID,
  payload
});

export const receiveOpenings = payload => ({
  type: RECEIVE_OPENINGS,
  payload
});

export const deleteClickedOpening = payload => ({
  type: DELETE_OPENING,
  payload
});

export const editOpening = payload => ({
  type: EDIT_OPENING,
  clickedRow: payload
});

export const takeUISnapShot = payload => ({
  type: TAKE_UI_SNAPSHOT,
  payload
});

export const cancelEditOpening = payload => ({
  type: CANCEL_EDIT_OPENING,
  payload
});

export const saveOpeningsWithPOST = payload => ({
  type: SAVE_OPENINGS_POST,
  payload
});

export const saveOpeningsWithPUT = payload => ({
  type: SAVE_OPENINGS_PUT,
  payload
});

export const addOpening = payload => ({
  type: ADD_OPENING,
  payload
});

export const editOpeningValue = payload => ({
  type: EDIT_OPENING_VALUE,
  payload
});

export const fetchAbout = payload => ({
  type: FETCH_ABOUT,
  payload
});

export const receiveAbout = payload => ({
  type: RECEIVE_ABOUT,
  payload
});

export const deleteClickedAbout = payload => ({
  type: DELETE_ABOUT,
  payload
});

export const editAbout = payload => ({
  type: EDIT_ABOUT,
  payload
});

export const cancelEditAbout = payload => ({
  type: CANCEL_EDIT_ABOUT,
  payload
});

export const saveAboutWithPUT = payload => ({
  type: SAVE_ABOUT_PUT,
  payload
});

export const saveAboutWithPOST = payload => ({
  type: SAVE_ABOUT_POST,
  payload
});

export const editAboutValue = payload => ({
  type: EDIT_ABOUT_VALUE,
  payload
})
