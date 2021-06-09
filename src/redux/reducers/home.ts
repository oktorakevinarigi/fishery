import { AnyAction } from 'redux';

import * as types from '../types';
import IHome from '../interfaces/home'

const initState: IHome = {
  isLoading: false,
  sourceArea: [],
  sourceSize: [],
  list: [],
  areaId: 0,
  sizeId: 0,

  form: {
    komoditas: '',
    areaId: 0,
    sizeId: 0,
    price: ''
  }
};

const Home = (state = initState, action: AnyAction) => {
  switch (action.type) {
    case types.HOME_SET_LOADER: {
      return {
        ...state,
        isLoading: action.value,
      };
    }
    case types.HOME_HANDLE_STATE: {
      return {
        ...state,
        [action.field]: action.value,
      };
    }
    case types.HOME_FETCH_DATA_GLOBAL: {
      return {
        ...state,
        ...action.data,
      };
    }
    case types.HOME_HANDLE_STATE_FORM: {
      return {
        ...state,
        form: {
          ...state.form,
          [action.field]: action.value,
        }
      };
    }
    case types.HOME_CLEAR_STATE_FORM: {
      return {
        ...state,
        form: {
          ...initState.form,
        }
      };
    }
    default:
      return state;
  }
};

export default Home