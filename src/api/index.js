import axios from "axios";
import { KITEE_TOKEN } from "../utils/constants";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 50000,
});

export const getHeaders = () => ({
  "x-access-token": localStorage.getItem(KITEE_TOKEN),
});

export const processError = (error) => {
  if (error.response) {
    // client received an error response (5xx, 4xx)

    return error.response.data;
  }

  if (error.request) {
    // client never received a response, or request never left

    return {
      success: false,
      message: "It's not you, it's us, want to give it another try?",
    };
  }

  // anything else

  return {
    success: false,
    message: "Something went wrong.",
  };
};

export const signUp = async ({ email, password }) => {
  try {
    const response = await API.post("/users/signup", {
      email: String(email).trim(),
      password: String(password).trim(),
    });

    return response.data;
  } catch (error) {
    return processError(error);
  }
};

export const signIn = async ({ email, password }) => {
  try {
    const response = await API.post("/users/signin", {
      email: String(email).trim(),
      password: String(password).trim(),
    });

    return response.data;
  } catch (error) {
    return processError(error);
  }
};

export const getUserInfo = async () => {
  try {
    const response = await API.get("/users/info", {
      headers: getHeaders(),
    });

    return response.data;
  } catch (error) {
    return processError(error);
  }
};
