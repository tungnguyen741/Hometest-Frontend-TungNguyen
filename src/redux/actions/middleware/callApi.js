import { API_UPLOAD_SANDBOX } from "configs/api.config";

import Request from "./requestRSA";

function callApi(method, api, args) {
  return Request.callApiRSA({
    method,
    domain: "",
    apiUrl: api,
    args,
  });
}

function callApiUpload(api, args) {
  return Request.callApiUpload({
    domain: API_UPLOAD_SANDBOX,
    apiUrl: api,
    args,
  });
}

export { callApi, callApiUpload };
