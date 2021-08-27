/* INFO DOMAIN API */

let envAPI = "https://tiki.vn/api";
if (process.env.NODE_ENV === "development") {
  // envAPI = "http://10.9.34.251:3380"; // DEV
}

/* EXPORT API */
export const API_TIKI = envAPI;
export const API_TIKI_VERSION = "/v2";

const api_upload = "apiurl"; // Server: chứa file upload (avatar, cmnd, cccd, video, ...)

export const API_UPLOAD_VERSION = "/v1";
export const API_UPLOAD = `https://${api_upload}`;
export const API_UPLOAD_SANDBOX = `https://apiurl-${api_upload}`;

/* General */
export const KEY_HEADER_THREE = "sum";
