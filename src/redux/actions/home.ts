import * as types from '../types'

export const handleState = (field: string, value: string | number) => {
  return {
    type: types.HOME_HANDLE_STATE,
    field,
    value
  };
};
export const fetchData = () => {
  return {
    type: types.HOME_FETCH_DATA,
  };
};
export const fetchSearch = () => {
  return {
    type: types.HOME_FETCH_SEARCH,
  };
};
export const fetchClear = () => {
  return {
    type: types.HOME_FETCH_CLEAR,
  };
};
export const fetchDelete = (uuid: string) => {
  return {
    type: types.HOME_FETCH_DELETE,
    uuid
  };
};
export const handleStateForm = (field: string, value: string | number) => {
  return {
    type: types.HOME_HANDLE_STATE_FORM,
    field,
    value
  };
};
export const fetchSubmitForm = (history: any, uuid?: string,) => {
  return {
    type: types.HOME_FETCH_SUBMIT_FORM,
    history,
    uuid
  };
};
export const fetchGetEdit = (uuid?: string) => {
  return {
    type: types.HOME_FETCH_GET_EDIT_FORM,
    uuid
  };
};
export const clearStateForm = () => {
  return {
    type: types.HOME_CLEAR_STATE_FORM,
  };
};