import axios from "axios";
const { nextConfig } = require("../next.config")

/**
 * This is user to get call on Backend server
 * @param {*} api
 * @param {*} params
 * @returns
 */
export async function get(api: string, params: any) {
  var response: Partial<Response> = {};

  try {
    const { data } = await axios.get(`${nextConfig.BACKEND_ENDPOINT}${api}`, {
      params: params,
    });

    return data;



  } catch (err: any) {
    console.log(err);


    return ({ status: 400, data: {}, message: err.toString() });
  }
}

/**
 * This will help as to do all post call on backend
 * @param {*} api
 * @param {*} args
 * @returns
 */
export async function post(api: string, args: any, header?: any) {

  try {
    const { data } = await axios.post(`${nextConfig.BACKEND_ENDPOINT}${api}`, args, header);
    return data;
  } catch (err: any) {
    console.log(err);

    return ({ status: 400, data: {}, message: err.toString() });
  }
}


