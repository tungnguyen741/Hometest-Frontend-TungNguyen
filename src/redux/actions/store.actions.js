import { typeName } from "../redux.config";
import { callApi } from "./middleware/callApi";

export function getBannersHome(payload, callback) {
  return {
    api: (args) => {
      return callApi("GET", "/banners_home", args);
    },
    type: typeName.GET_BANNERS_HOME,
    showLoading: true,
    payload,
    callback,
  };
}

export function getBookList(payload, callback) {
  const { limit = 8, is_mweb = 1, category = 8322, page = 1 } = payload;
  return {
    api: (args) => {
      return callApi(
        "GET",
        `/personalish/v1/blocks/listings?limit=${limit}&is_mweb=${is_mweb}&category=${category}&page=${page}`,
        args
      );
    },
    type: typeName.GET_BOOK_LIST,
    showLoading: true,
    payload,
    callback,
  };
}
export function getBookListFlash(payload, callback) {
  const { limit = 8, is_mweb = 1, category = 8322, page = 1 } = payload;
  return {
    api: (args) => {
      return callApi(
        "GET",
        `/personalish/v1/blocks/listings?limit=${limit}&is_mweb=${is_mweb}&category=${category}&page=${page}`,
        args
      );
    },
    type: typeName.GET_BOOK_LIST_FLASH_SALE,
    showLoading: true,
    payload,
    callback,
  };
}

// CART
export function addBookToCart(payload, callback) {
  return {
    type: typeName.ADD_BOOK_TO_CART,
    payload,
    callback,
  };
}
export function removeBookToCart(payload, callback) {
  return {
    type: typeName.REMOVE_BOOK_TO_CART,
    payload,
    callback,
  };
}
export function decreaseBookToCart(payload, callback) {
  return {
    type: typeName.DECREASE_BOOK_TO_CART,
    payload,
    callback,
  };
}
export function editBookToCart(payload, callback) {
  return {
    type: typeName.EDIT_QUANTITY_BOOK_TO_CART,
    payload,
    callback,
  };
}
