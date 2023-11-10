import axios from "axios";
import { GET_ALL_TASK, UPDATE_STATUS } from "./ApiConstants";
const userId = "654bdb0af039ffd03fb00829";

export const getAllTask = async () => {
  console.log(GET_ALL_TASK);

  //send auth token in header
  const response = await axios.get(GET_ALL_TASK + `/${userId}`, {
    headers: {
      "Content-Type": "application/json",
      "auth-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRiZGIwYWYwMzlmZmQwM2ZiMDA4MjkiLCJpYXQiOjE2OTk1MTI1MjF9.OgpPRmjICMYNML3Hjd-CGCTFdThWOSn_sDdhWQQ-Y7k",
    },
  });
  return response;
};

export const updateStatus = async (id) => {
  console.log(UPDATE_STATUS + `/${id}`);
  const response = await axios
    .put(
      UPDATE_STATUS + `/${id}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRiZGIwYWYwMzlmZmQwM2ZiMDA4MjkiLCJpYXQiOjE2OTk1MTI1MjF9.OgpPRmjICMYNML3Hjd-CGCTFdThWOSn_sDdhWQQ-Y7k",
        },
      }
    )
    .catch((err) => {
      console.log(err);
    });
  console.log(response);
  return response;
};
