import { AnyAction } from 'redux';

import * as types from '../types';
import IApp from '../interfaces/app'

const initState: IApp = {
  isConnect: true,
  token: '',
};

const App = (state = initState, action: AnyAction) => {
  switch (action.type) {
    case types.APP_HANDLE_STATE: {
      return {
        ...state,
        [action.field]: action.value,
      };
    }
    default:
      return state;
  }
};

export default App