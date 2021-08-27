import axios from "axios";

import { store } from "../../redux.store";

const Request = {
  callApiRSA({ method, domain, apiUrl, args }) {
    return new Promise(async (resolve) => {
      try {
        const {
          storeReducer: { connectToken, clientInfo },
        } = store.getState();

        let urlFull = `${domain}${apiUrl}`;

        // let apiHeader = {
        //   Authorization: appToken,
        //   Language: lang,
        //   "Content-Type": "application/json; charset=utf-8",
        // };

        let apiBody = {
          ...args,
          connectToken,
          clientInfo,
        };

        const option = {
          method,
          url: urlFull,
          // headers: apiHeader,
        };

        if (method.toUpperCase() !== "GET") {
          option.data = apiBody;
        }
        if (process.env.NODE_ENV === "development") {
          console.log("[REQUEST]", method.toUpperCase(), domain + apiUrl);
        }

        const response = await axios(option);

        if (process.env.NODE_ENV === "development") {
          console.log(
            "[RESPONSE]",
            method.toUpperCase(),
            domain + apiUrl,
            apiBody,
            response.data
          );
        }

        resolve(response.data);
      } catch (error) {
        if (error) console.log(error);
        resolve({
          code: -1001,
          data: { message: "Lỗi kết nối server. Vui lòng quay lại sau!" },
        });
      }
    });
  },

  async callApiUpload({ domain, apiUrl, args }) {
    return new Promise(async (resolve) => {
      try {
        const {
          storeReducer: { lang, appToken },
        } = store.getState();
        const urlFull = `${domain}${apiUrl}`;

        const apiHeader = {
          "Content-Type": "multipart/form-data",
          Authorization: appToken,
          Language: lang,
        };

        const apiBody = args;

        const response = await axios({
          headers: apiHeader,
          method: "POST",
          url: urlFull,
          data: apiBody,
          timeout: 30000,
        });

        if (process.env.NODE_ENV === "development") {
          console.log("[RESPONSE]", domain + apiUrl, response.data);
        }
        resolve(response.data);
      } catch (error) {
        if (error) console.log(error);
        resolve({
          code: -1001,
          data: { message: "Lỗi kết nối server. Vui lòng quay lại sau!" },
        });
      }
    });
  },
};

export default Request;
