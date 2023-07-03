import { getCarsRequest } from "../api/cars";
import { token } from "../config/api";

export const getCars = async () => {
  try {
    const response = await getCarsRequest(token);
    const data = await response.json();
    if (response.ok) {
      return { error: false, cars: data.cars };
    } else {
      return { error: true, message: data?.message };
    }
  } catch (error) {
    console.error(error);
    return { error: true, message: "Something went wrong" };
  }
};

