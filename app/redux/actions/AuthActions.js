import {
  RESET_APP,
  PUSH_DATE,
  UPDATE_GOAL,
  DAILY_GOAL,
  SET_ALERT,
} from '../types';

export const ResetApp = () => ({
  type: RESET_APP,
});

export const PushDate = payload => ({
  type: PUSH_DATE,
  payload,
});

export const UpdateGoal = payload => ({
  type: UPDATE_GOAL,
  payload,
});

export const DailyGoal = payload => ({
  type: DAILY_GOAL,
  payload,
});

export const SetAlert = payload => ({
  type: SET_ALERT,
  payload,
});
