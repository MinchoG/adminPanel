import { createLogic } from 'redux-logic';
import { 
  loginError, 
  loginSuccess, 
  receiveEmployees, 
  receiveOpenings, 
  receiveOpeningsById,
  receiveAbout,
  saveAboutWithPOST,
  saveAboutWithPUT 
} from './actions';
import {
  ACTION_LOGIN_REQUEST,
  FETCH_EMPLOYEES,
  DELETE_EMPLOYEE,
  SAVE_EMPLOYEE_POST,
  SAVE_EMPLOYEE_PUT,
  FETCH_OPENINGS,
  DELETE_OPENING,
  SAVE_OPENINGS_POST,
  SAVE_OPENINGS_PUT,
  FETCH_OPENINGS_BY_ID,
  FETCH_ABOUT,
  SAVE_ABOUT_POST,
  SAVE_ABOUT_PUT
} from './constants';

import axios from 'axios';

const LoginLogic = createLogic({
  type: ACTION_LOGIN_REQUEST,
  async process({ action, getState }, dispatch, done) {
    try {
      console.log(action.payload);
      const res = await axios.post('http://localhost:3001/login', {
        username: action.payload.user,
        password: action.payload.pass
      });
      console.log(res.data.token);
      if (res.data.token) {
        dispatch(loginSuccess(res.data.token));
        localStorage.setItem('token', res.data.token);
        window.location.assign('/admin/panel');
        return;
      }
      return dispatch(loginError(res.data.error));
    } catch (e) {
      console.log('Error', e);
    } finally {
      done();
    }
  }
});

const FetchEmployees = createLogic({
  type: FETCH_EMPLOYEES,
  async process({ action }, dispatch, done) {
    try {
      const res = await axios.get('http://localhost:3001/employees');
      await dispatch(receiveEmployees(res.data));
      return;
    } catch (e) {
      console.log(e);
    } finally {
      done();
    }
  }
});

const DeleteEmployee = createLogic({
  type: DELETE_EMPLOYEE,
  async process({ action, getState }, dispatch, done) {
    try {
      console.log('action payload:', action.payload);

      if (action.payload) {
        const token = localStorage.getItem('token');
        const res = await axios.delete(
          `http://localhost:3001/employees/${action.payload}`,
          {
            data: {
              token
            }
          }
        );
        if (res.status === 200) {
          alert('Succesfully deleted from DB');
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      done();
    }
  }
});

const SaveEmployeePOST = createLogic({
  type: SAVE_EMPLOYEE_POST,
  async process({ action, getState }, dispatch, done) {
    //if we have added an empty ROW, we will do POST, otherwise we do PUT
    try {
      console.log('action CHANGED DATA:', action.payload.changedData);
      await axios.post('http://localhost:3001/employees', {
        changedData: action.payload.changedData,
        token: action.payload.token
      });
    } catch (e) {
      console.log(e);
    } finally {
      done();
    }
  }
});

const SaveEmployeePUT = createLogic({
  type: SAVE_EMPLOYEE_PUT,
  async process({ action, getState }, dispatch, done) {
    //if we have added an empty ROW, we will do POST, otherwise we do PUT
    try {
      await axios.put(
        `http://localhost:3001/employees/${action.payload.changedData.id}`,
        { changedData: action.payload.changedData, token: action.payload.token }
      );
    } catch (e) {
      console.log(e);
    } finally {
      done();
    }
  }
});

const FetchOpenings = createLogic({
  type: FETCH_OPENINGS,
  async process({ action }, dispatch, done) {
    try {
      const res = await axios.get('http://localhost:3001/openings');
      dispatch(receiveOpenings(res.data));
       return;
    } catch (e) {
      console.log(e);
    } finally {
      done();
    }
  }
});

const FetchOpeningsById = createLogic({
  type: FETCH_OPENINGS_BY_ID,
  async process({ action, getState }, dispatch, done) {
    try {
      const res = await axios.get(`http://localhost:3001/openings/${action.payload}`);
      const payload = {
        id: action.payload,
        data: res.data
      };
      if(getState().openings.data.length) {
        dispatch(receiveOpeningsById(payload));
      } else {
        const res = await axios.get('http://localhost:3001/openings');
        dispatch(receiveOpenings(res.data));
      }
      
    } catch (e) {
      console.log(e);
    } finally {
      done();
    }
  }
})

const DeleteOpening = createLogic({
  type: DELETE_OPENING,
  async process({ action, getState }, dispatch, done) {
    try {
      if (action.payload) {
        const token = localStorage.getItem('token');
        const res = await axios.delete(
          `http://localhost:3001/openings/${action.payload}`,
          {
            data: {
              token
            }
          }
        );
        if (res.status === 200) {
          alert('Succesfully deleted from DB');
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      done();
    }
  }
});

const SaveOpeningsPOST = createLogic({
  type: SAVE_OPENINGS_POST,
  async process({ action, getState }, dispatch, done) {
    //if we have added an empty ROW, we will do POST, otherwise we do PUT
    try {
      console.log('action CHANGED DATA:', action.payload.changedData);
      await axios.post('http://localhost:3001/Openings', {
        changedData: action.payload.changedData,
        token: action.payload.token
      });
    } catch (e) {
      console.log(e);
    } finally {
      done();
    }
  }
});

const SaveOpeningsPUT = createLogic({
  type: SAVE_OPENINGS_PUT,
  async process({ action, getState }, dispatch, done) {
    //if we have added an empty ROW, we will do POST, otherwise we do PUT
    try {
      await axios.put(
        `http://localhost:3001/openings/${action.payload.changedData.id}`,
        { changedData: action.payload.changedData, token: action.payload.token }
      );
    } catch (e) {
      console.log(e);
    } finally {
      done();
    }
  }
});

const FetchAbout = createLogic({
  type: FETCH_ABOUT,
  async process({action, getState}, dispatch, done) {
    try {
      const res = await axios.get('http://localhost:3001/about');
      dispatch(receiveAbout(res.data));
    } catch (e) {
      console.log(e);
    } finally {
      done();
    }
  }
});

const SaveAboutPOST = createLogic({
  type: SAVE_ABOUT_POST,
  async process({ action, getState }, dispatch, done) {
    try {
      console.log('action CHANGED DATA:', action.payload.changedData);
      await axios.post('http://localhost:3001/about', {
        changedData: action.payload.changedData,
        token: action.payload.token
      });
    } catch (e) {
      console.log(e);
    } finally {
      done();
    }
  }
});

const SaveAboutPUT = createLogic({
  type: SAVE_ABOUT_PUT,
  async process({ action, getState }, dispatch, done) {
    try {
      await axios.put(
        `http://localhost:3001/about/${action.payload.changedData.id}`, {
          changedData: action.payload.changedData,
          token: action.payload.token
        });
    } catch(e) {
      console.log(e);
    } finally {
      done();
    }
  }
});



export default [
  LoginLogic,
  FetchEmployees,
  DeleteEmployee,
  SaveEmployeePOST,
  SaveEmployeePUT,
  FetchOpenings,
  DeleteOpening,
  SaveOpeningsPOST,
  SaveOpeningsPUT,
  FetchOpeningsById,
  FetchAbout,
  SaveAboutPOST,
  SaveAboutPUT
];
