/* eslint-disable import/no-cycle */
import { query } from '../../services/api';
import { ENDPOINTS, METHODS } from '../../constants/api';

export const GET_RECEIPTS_REQUEST = 'get-receipts-request';
export const GET_RECEIPTS_SUCCESS = 'get-receipts-success';
export const GET_RECEIPTS_FAILURE = 'get-receipts-failure';

export function getReceipts({ params, success, failure }) {
  return async dispatch => {
    try {
      dispatch({ type: GET_RECEIPTS_REQUEST });
      const endpoint = ENDPOINTS.getReceipts;

      const result = await query({
        endpoint,
        params,
        method: METHODS.get,
      });

      if (result.status === 200) {
        success();
        dispatch({
          type: GET_RECEIPTS_SUCCESS,
          payload: result.data,
        });
      } else {
        failure();
        dispatch({
          type: GET_RECEIPTS_FAILURE,
        });
      }
    } catch (error) {
      failure();
      dispatch({
        type: GET_RECEIPTS_FAILURE,
        payload: error,
      });
    }
  };
}