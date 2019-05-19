import {
  ACTION_LOGIN_SUCCESS,
  ACTION_LOGIN_FAILURE,
  CLICKED_ROW,
  FETCH_EMPLOYEES,
  SELECT_FILE,
  RECEIVE_EMPLOYEES,
  DELETE_EMPLOYEE,
  ADD_EMPLOYEE,
  EDIT_EMPLOYEE,
  EDIT_EMPLOYEE_VALUE,
  CANCEL_EDIT_EMPLOYEE,
  SAVE_EMPLOYEE_POST,
  SAVE_EMPLOYEE_PUT,
  STORE_UPLOADED_PIC_NAME,
  PUT_SELECTED_FILE_IN_STORE,
  FETCH_OPENINGS,
  RECEIVE_OPENINGS,
  DELETE_OPENING,
  EDIT_OPENING,
  TAKE_UI_SNAPSHOT,
  CANCEL_EDIT_OPENING,
  SAVE_OPENINGS_POST,
  SAVE_OPENINGS_PUT,
  ADD_OPENING,
  EDIT_OPENING_VALUE,
} from './constants';




import { combineReducers } from 'redux';

const initialStateAuth = {
  isFetching: false,
  isAuthenticated: localStorage.getItem('token') 
  ? true 
  : false,
  error: ''
};

const authReducer = (state = initialStateAuth, action) => {
  switch (action.type) {
    case ACTION_LOGIN_SUCCESS:
      return Object.assign({}, 
        state, 
        action.payload);
    case ACTION_LOGIN_FAILURE:
      return Object.assign({}, 
        state, 
        action.payload);
    default:
      return state;
  }
};

const initialStateEmployee = {
  data: [],
  clickedRow: null,
  selectedFile: null,
  addingRow: null,
  uiSnapShot: null,
}

const initialStateOpenings = {
  data: [],
  clickedRow: null,
  addingRow: null,
  uiSnapShot: null,
}

const employeeReducer = (state = initialStateEmployee, action) => {
  switch (action.type) {
    case ADD_EMPLOYEE:
      return {
        ...state, 
        data: state.data.concat(action.payload),
        addingRow: true,
      };
    case EDIT_EMPLOYEE:
      return {
        ...state, clickedRow: action.clickedRow
      };
      case CANCEL_EDIT_EMPLOYEE:
      return {
        ...state, 
        data: state.data,
        clickedRow: null
      };
    case FETCH_EMPLOYEES:
      return Object.assign({}, state, action.payload);
    case CLICKED_ROW:
      return Object.assign({}, state, {id: action.payload});
    case SELECT_FILE:
      return Object.assign({}, state, action.payload);
    case RECEIVE_EMPLOYEES:
      return {
        ...state,
        data: action.payload
      };
    case DELETE_EMPLOYEE:
      return {
        ...state, 
        data: state.data.filter(v=>v.id!==action.payload)
      };
    case SAVE_EMPLOYEE_POST:
      return Object.assign({}, state, {clickedRow: null});
      
    case SAVE_EMPLOYEE_PUT:
      return {
        ...state,
        clickedRow: null,
      };
    case EDIT_EMPLOYEE_VALUE:
      return {
        ...state,
        data: action.payload,
      };
    case STORE_UPLOADED_PIC_NAME:
    return {
      ...state,
      data: action.payload,
    }
    case PUT_SELECTED_FILE_IN_STORE:
      return {
        ...state,
        selectedFile: action.payload
      };
    case TAKE_UI_SNAPSHOT:
      return {
        ...state,
        firstCancelClick: true,
        uiSnapShot: state,
      }
    default:
      return state;
  }
}

const openingsReducer = (state = initialStateOpenings, action) => {
  switch (action.type) {
    case FETCH_OPENINGS:
      return {
        ...state, 
      };
    case RECEIVE_OPENINGS:
      return {
        ...state,
        data: action.payload,
      };
    case DELETE_OPENING:
      return {
        ...state, 
        data: state.data.filter(v=>v.id!==action.payload)
      };
      case EDIT_OPENING:
        return {
          ...state, 
          clickedRow: action.clickedRow
        };
      case CANCEL_EDIT_OPENING: 
        return {
          ...state,
          clickedRow: null,
        };
      case SAVE_OPENINGS_POST:
        return Object.assign({}, state, {clickedRow: null});
        
      case SAVE_OPENINGS_PUT:
        return {
          ...state,
          clickedRow: null,
        };
      case ADD_OPENING:
        return {
          ...state, 
          data: state.data.concat(action.payload),
          addingRow: true,
        };
      case EDIT_OPENING_VALUE:
        return {
          ...state,
          data: action.payload,
        };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  auth: authReducer,
  employee: employeeReducer,
  openings: openingsReducer,
});

export default rootReducer;
