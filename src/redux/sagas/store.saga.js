import { call, put, takeLatest } from "redux-saga/effects";
import { typeName } from "../redux.config";

function* doAction(action) {
  try {
    if (action?.showLoading) {
      yield put({ type: typeName.SHOW_LOADING });
    } // open loading

    // custom type
    switch (action.type) {
      case typeName.GET_BOOK_LIST:
      default:
    }
    const data = yield call(action.api, action.payload);

    if (action?.showLoading) {
      yield put({ type: typeName.HIDE_LOADING });
    } // hide loading

    yield put({ type: `${action?.type}_SUCCESS`, payload: data });
    if (action.callback) {
      action.callback(true, data);
    }
  } catch (error) {
    if (action?.showLoading) {
      yield put({ type: typeName.HIDE_LOADING });
    } // hide loading
    yield put({ type: `${action?.type}_FAILED` });
    if (action.callback) {
      action.callback(false, error, 1);
    }
  }
}

export default function* watchAction() {
  for (const [key] of Object.entries(typeName)) {
    yield takeLatest(key, doAction);
  }
}
