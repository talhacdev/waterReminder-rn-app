import {
  RESET_APP,
  PUSH_DATE,
  UPDATE_GOAL,
  DAILY_GOAL,
  SET_ALERT,
} from '../types';

const initialState = {
  reminder: {},
  goal: 0,
  alert: {},
};
export default function (state = initialState, action) {
  switch (action.type) {
    case RESET_APP:
      console.log('RESET_APP is called.');
      return {
        ...state,
        reminder: {},
        alert: {},
      };

    case PUSH_DATE:
      console.log('PUSH_DATE is called: ', action.payload);
      return {
        ...state,
        reminder: {...action.payload},
      };

    case UPDATE_GOAL:
      console.log('UPDATE_GOAL is called: ', action.payload);
      return {
        ...state,
        reminder: {...action.payload},
      };

    case DAILY_GOAL:
      console.log('DAILY_GOAL is called: ', action.payload);
      return {
        ...state,
        goal: action.payload,
      };

    case SET_ALERT:
      console.log('SET_ALERTS is called: ', action.payload);
      return {
        ...state,
        alert: action.payload,
      };

    default:
      return state;
  }
}
