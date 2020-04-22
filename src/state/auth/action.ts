import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import {
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  AuthActionTypes,
  CLEAR_ERROR,
  LOGOUT,
} from './actionsType';
import axiosWithConfig from '../../utils/axiosWithConfig';

const asyncHandlerError = (fn: (dispatch: ThunkDispatch<{}, {}, AuthActionTypes>) => void) => (
  dispatch: ThunkDispatch<{}, {}, AuthActionTypes>,
) =>
  Promise.resolve(fn(dispatch)).catch((err) => {
    console.log(err.response?.data.error);
    dispatch({
      type: AUTH_ERROR,
      payload: err.response?.data.error,
    });
  });

export const loadUser = () =>
  asyncHandlerError(async (dispatch: Dispatch<AuthActionTypes>) => {
    const res = await axiosWithConfig.get('/auth/me');
    console.log(res.data.data);

    dispatch({
      type: USER_LOADED,
      payload: { ...res.data.data },
    });
  });

export const setLogin = (email: string, password: string) =>
  asyncHandlerError(async (dispatch: ThunkDispatch<{}, {}, AuthActionTypes>) => {
    await axiosWithConfig.post('/auth/login', { email, password });
    await dispatch({
      type: LOGIN_SUCCESS,
    });
    await dispatch(loadUser());
  });

export const setLoginRegisterGoogleFb = (res: any, strategy: string) =>
  asyncHandlerError(async (dispatch: ThunkDispatch<{}, {}, AuthActionTypes>) => {
    await axiosWithConfig.post(`/auth/${strategy}/token`, {
      access_token: res.accessToken,
    });
    await dispatch({
      type: LOGIN_SUCCESS,
    });
    await dispatch(loadUser());
  });

export const setRegister = (name: string, email: string, password: string) =>
  asyncHandlerError(async (dispatch: ThunkDispatch<{}, {}, AuthActionTypes>) => {
    await axiosWithConfig.post('/auth/register', { name, email, password });
    await dispatch({
      type: REGISTER_SUCCESS,
    });
    await dispatch(loadUser());
  });

export const setLogOut = () =>
  asyncHandlerError(async (dispatch: ThunkDispatch<{}, {}, AuthActionTypes>) => {
    const res = await axiosWithConfig.post('/auth/logout');
    dispatch({
      type: LOGOUT,
      payload: res.data,
    });
  });

export const clearError = (): AuthActionTypes => ({ type: CLEAR_ERROR });
