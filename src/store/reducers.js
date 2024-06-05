// reducers.js
import { SET_DATA } from './types';

const initialState = {
  data: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
