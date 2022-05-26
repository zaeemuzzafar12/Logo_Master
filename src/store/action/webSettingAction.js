import {
  GET_WEB_SETTINGS,
  TOGGLE_AUTH_MODAL,
  TOGGLE_FOOTER,
} from "../constants";

export function getWebSettings(web_setting) {
  return async (dispatch) => {
    dispatch({
      type: GET_WEB_SETTINGS,
      payload: web_setting,
    });
  };
}
export function toggleAuthModal() {
  return async (dispatch) => {
    dispatch({
      type: TOGGLE_AUTH_MODAL,
    });
  };
}
export function toggleFooter() {
  return async (dispatch) => {
    dispatch({
      type: TOGGLE_FOOTER,
    });
  };
}
