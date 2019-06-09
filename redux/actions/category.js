/* eslint-disable import/no-cycle */
import { query } from '../../services/api';
import { METHODS } from '../../constants/api';

export const GET_CATEGORIES_REQUEST = 'get-categories-request';
export const GET_CATEGORIES_SUCCESS = 'get-categories-success';
export const GET_CATEGORIES_FAILURE = 'get-categories-failure';

export function getCategories({ params, success, failure }) {
  return async dispatch => {
    try {
      dispatch({ type: GET_CATEGORIES_REQUEST });
      const endpoint = '/categories';

      const result = await query({
        endpoint,
        params,
        method: METHODS.get,
      });

      if (result.status === 200) {
        success();
        dispatch({
          type: GET_CATEGORIES_SUCCESS,
          payload: result.data,
        });
      } else {
        failure();
        dispatch({
          type: GET_CATEGORIES_FAILURE,
        });
      }
    } catch (error) {
      failure();
      dispatch({
        type: GET_CATEGORIES_FAILURE,
        payload: error,
      });
    }
  };
}