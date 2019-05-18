import axios from 'axios';
import { query } from '../services/api';
import { ENDPOINTS, METHODS } from '../constants/api';

export const LOGIN_REQUEST = 'login-request';
export const LOGIN_SUCCESS = 'login-success';
export const LOGIN_FAILURE = 'login-failure';
export const LOGOUT = 'logout';

export function login(data, callback) {
  return async dispatch => {
    try {
      dispatch({ type: LOGIN_REQUEST });
      const endpoint = ENDPOINTS.login;
      const result = await query({
        data,
        endpoint,
        method: METHODS.post,
      });

      if (result.status === 200) {
        callback.success();
        dispatch({
          type: LOGIN_SUCCESS,
          payload: result.data,
        });
      } else {
        callback.failure();
        dispatch({
          type: LOGIN_FAILURE,
        });
      }
    } catch (error) {
      callback.failure();
      dispatch({
        type: LOGIN_FAILURE,
        payload: error,
      });
    }
  };
}
