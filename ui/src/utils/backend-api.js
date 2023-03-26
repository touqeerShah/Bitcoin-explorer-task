import axios from "axios";
import { config } from "../config";

/**
 * This is user to get call on Backend server
 * @param {*} api
 * @param {*} params
 * @returns
 */
export async function get(api, params) {
  try {
    const { data } = await axios.get(`${config.env.BACKEND_ENDPOINT}${api}`, {
      params: params,
    });

    return data;
  } catch (err) {
    console.log(err);

    return { status: 400, data: {}, message: err.toString() };
  }
}

/**
 * This will help as to do all post call on backend
 * @param {*} api
 * @param {*} args
 * @returns
 */
export async function post(api, args) {
  try {
    console.log(config, `''''''''''''''''''''''''ß`);
    const { data } = await axios.post(
      `${config.env.BACKEND_ENDPOINT}${api}`,
      args
    );
    return data;
  } catch (err) {
    console.log(err);
    return { status: 400, data: {}, message: err.toString() };
  }
}
