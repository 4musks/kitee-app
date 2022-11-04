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

export const getForm = async ({ formRef }) => {
  try {
    const response = await API.get(`/forms/${formRef}`, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return processError(error);
  }
};

export const getForms = async () => {
  try {
    const response = await API.get("/forms/", {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return processError(error);
  }
};

export const getPublishedForm = async ({ formRef }) => {
  try {
    const response = await API.get(`/forms/published/${formRef}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return processError(error);
  }
};

export const putForm = async ({
  formRef,
  title = null,
  questions = null,
  isEmailNotificationEnabled = null,
  shouldPublish = null,
  customMetadata = null,
}) => {
  try {
    const response = await API.put(
      "/forms/",
      {
        title: title ? String(title).trim() : title,
        formRef,
        questions,
        isEmailNotificationEnabled,
        shouldPublish,
        customMetadata,
      },
      {
        headers: getHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return processError(error);
  }
};

export const putPublishForm = async ({ formRef, title, questions }) => {
  try {
    const response = await API.put(
      "/forms/publish",
      { formRef, title, questions },
      {
        headers: getHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return processError(error);
  }
};

export const deleteForm = async ({ formRef }) => {
  try {
    const response = await API.delete(`/forms/${formRef}`, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return processError(error);
  }
};

export const getInsights = async ({ formRef }) => {
  try {
    const response = await API.get(`/insights/${formRef}`, {
      headers: getHeaders(),
    });

    return response.data;
  } catch (error) {
    console.error(error);
    return processError(error);
  }
};

export const postOpenEvent = async ({ formRef }) => {
  try {
    const result = await API.post("/insights/events/open", { formRef });

    return result.data;
  } catch (error) {
    console.error(error);
    return processError(error);
  }
};

export const postStartEvent = async ({ formRef }) => {
  try {
    const result = await API.post("/insights/events/start", { formRef });

    return result.data;
  } catch (error) {
    console.error(error);
    return processError(error);
  }
};

export const postCompleteEvent = async ({ formRef }) => {
  try {
    const result = await API.post("/insights/events/complete", { formRef });

    return result.data;
  } catch (error) {
    console.error(error);
    return processError(error);
  }
};

export const postSeeEvent = async ({ formRef, seenQuestionId }) => {
  try {
    const result = await API.post("/insights/events/see", {
      formRef,
      seenQuestionId,
    });

    return result.data;
  } catch (error) {
    console.error(error);
    return processError(error);
  }
};

export const postResponse = async ({ formRef, responseRef, response }) => {
  try {
    const result = await API.post("/responses/", {
      formRef,
      responseRef,
      response,
    });

    return result.data;
  } catch (error) {
    console.error(error);
    return processError(error);
  }
};

export const getResponses = async ({ formRef }) => {
  try {
    const result = await API.get(`/responses/${formRef}`,
      {
        headers: getHeaders(),
      }
    );
    return result.data;
  } catch (error) {
    console.error(error);
    return processError(error);
  }
};
