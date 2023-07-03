import { carsUrl } from "../config/api";

export const getCarsRequest = async (token) => {
  try {
    const config = {
      method: "GET",
      mode: "no-cors",
    };
    const data = {
      token,
    };

    const response = await fetch(carsUrl, data, config);
    return response;
  } catch (error) {
    return error?.response;
  }
}