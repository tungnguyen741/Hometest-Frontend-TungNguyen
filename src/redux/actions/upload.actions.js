import { typeName } from "../redux.config";
import { callApiUpload } from "./middleware/callApi";

export function uploadFile(payload, callback) {
  return {
    api: (args) => {
      return callApiUpload("/Upload", args);
    }, // Fix method: POST
    type: typeName.UPLOAD_FILE,
    showLoading: true,
    payload,
    callback,
  };
}
