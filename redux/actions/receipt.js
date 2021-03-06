/* eslint-disable import/no-cycle */
import { query } from '../../services/api';
import { ENDPOINTS, METHODS } from '../../constants/api';

export const GET_RECEIPTS_REQUEST = 'get-receipts-request';
export const GET_RECEIPTS_SUCCESS = 'get-receipts-success';
export const GET_RECEIPTS_FAILURE = 'get-receipts-failure';

export const GET_RECEIPT_BY_ID_REQUEST = 'get-receipt-by-id-request';
export const GET_RECEIPT_BY_ID_SUCCESS = 'get-receipt-by-id-success';
export const GET_RECEIPT_BY_ID_FAILURE = 'get-receipt-by-id-failure';

export const DELETE_RECEIPT_BY_ID_REQUEST = 'delete-receipt-by-id-request';
export const DELETE_RECEIPT_BY_ID_SUCCESS = 'delete-receipt-by-id-success';
export const DELETE_RECEIPT_BY_ID_FAILURE = 'delete-receipt-by-id-failure';

export const CHOOSE_RECEIPT = 'choose-receipt';

export const ADD_CUSTOMER_TO_RECEIPT = 'add-customer-to-receipt';
export const ADD_PAYMENT_TO_RECEIPT = 'add-payment-to-receipt';

export const POST_RECEIPT_REQUEST = 'post-receipt-request';
export const POST_RECEIPT_SUCCESS = 'post-receipt-success';
export const POST_RECEIPT_FAILURE = 'post-receipt-failure';

export function getReceipts(
  params,
  { success = () => {}, failure = () => {}, handle401 }
) {
  return async dispatch => {
    try {
      dispatch({ type: GET_RECEIPTS_REQUEST });
      const endpoint = ENDPOINTS.getReceipts;

      const result = await query({
        endpoint,
        params,
        method: METHODS.get,
      });

      if (result.status === 200 || result.status === 304) {
        dispatch({
          type: GET_RECEIPTS_SUCCESS,
          payload: result.data,
        });
        success();
      } else {
        dispatch({
          type: GET_RECEIPTS_FAILURE,
        });
        failure();
      }
    } catch (error) {
      dispatch({
        type: GET_RECEIPTS_FAILURE,
        payload: error,
      });
      if (error.response.status === 401) {
        return handle401();
      }
      failure();
    }
  };
}

export function chooseReceipt(receipt) {
  return {
    type: CHOOSE_RECEIPT,
    payload: receipt,
  };
}

export function getReceiptById(
  id,
  { success = () => {}, failure = () => {}, handle401 }
) {
  return async dispatch => {
    try {
      dispatch({ type: GET_RECEIPT_BY_ID_REQUEST });
      const endpoint = `/receipts/${id}`;

      const result = await query({
        endpoint,
        method: METHODS.get,
      });

      if (result.status === 200 || result.status === 304) {
        dispatch({
          type: GET_RECEIPT_BY_ID_SUCCESS,
          payload: result.data,
        });
        success();
      } else {
        dispatch({
          type: GET_RECEIPT_BY_ID_FAILURE,
        });
        failure();
      }
    } catch (error) {
      dispatch({
        type: GET_RECEIPT_BY_ID_FAILURE,
        payload: error,
      });
      if (error.response.status === 401) {
        return handle401();
      }
      failure();
    }
  };
}

export function deleteReceiptById(
  id,
  { success = () => {}, failure = () => {}, handle401 }
) {
  return async dispatch => {
    try {
      dispatch({ type: DELETE_RECEIPT_BY_ID_REQUEST });
      const endpoint = `/receipts/${id}`;

      const result = await query({
        endpoint,
        method: METHODS.delete,
      });

      if (result.status === 200) {
        dispatch({
          type: DELETE_RECEIPT_BY_ID_SUCCESS,
          payload: result.data,
        });
        success();
      } else {
        dispatch({
          type: DELETE_RECEIPT_BY_ID_FAILURE,
        });
        failure();
      }
    } catch (error) {
      dispatch({
        type: DELETE_RECEIPT_BY_ID_FAILURE,
        payload: error,
      });
      if (error.response.status === 401) {
        return handle401();
      }
      failure();
    }
  };
}

export function addCustomerToReceipt(customer) {
  return {
    type: ADD_CUSTOMER_TO_RECEIPT,
    payload: customer,
  };
}

export function addPaymentToReceipt(payment) {
  return {
    type: ADD_PAYMENT_TO_RECEIPT,
    payload: payment,
  };
}

export function addReceipt(
  data,
  { success = () => {}, failure = () => {}, handle401 }
) {
  return async dispatch => {
    try {
      dispatch({ type: POST_RECEIPT_REQUEST });
      const endpoint = '/receipts';

      const result = await query({
        endpoint,
        data,
        method: METHODS.post,
      });

      if (result.status === 200 || result.status === 201) {
        dispatch({
          type: POST_RECEIPT_SUCCESS,
          payload: result.data,
        });
        success();
      } else {
        dispatch({
          type: POST_RECEIPT_FAILURE,
        });
        failure();
      }
    } catch (error) {
      dispatch({
        type: POST_RECEIPT_FAILURE,
        payload: error,
      });
      if (error.response.status === 401) {
        return handle401();
      }
      failure();
    }
  };
}
