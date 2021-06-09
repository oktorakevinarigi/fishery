import * as types from '../types'

export const handleState = (field: string, value: any) => {
  return {
    type: types.APP_HANDLE_STATE,
    field,
    value
  };
};

export const fetchData = () => {
  return {
    type: types.APP_FETCH_DATA,
  };
};