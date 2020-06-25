// Ajax
import { ajax } from "rxjs/ajax";

// Default content type of our data (so far)
const CONTENT_TYPE = "application/x-www-form-urlencoded";

// TODO: Use real userToken from local storage
const userToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjozLCJlbWFpbCI6InNlYW5oZWlucmljaHNAZ21haWwuY29tIiwiZmlyc3ROYW1lIjoic2VhbiIsImxhc3ROYW1lIjoiaGVpbnJpY2hzIiwiYXNwaXJhdGlvbmFsTWVzc2FnZSI6InRlc3QiLCJjcmVhdGVkQXQiOiIyMDIwLTA2LTI0VDE2OjMwOjEwLjU1NloiLCJ1cGRhdGVkQXQiOiIyMDIwLTA2LTI0VDE2OjMwOjEwLjU1NloifSwiaWF0IjoxNTkzMDUwMzA2LCJleHAiOjE1OTMxMzY3MDZ9.OgiXvvq9OtK78E5IupbutbcsYVb99S6iireaXASD7_o";

/**
 * Helper method to augment the XMLHttpRequest (xhr) RxJS call
 *
 * @param {String} method - The method of the http request
 * @param {String} url - The URL (without host/port prefix) of the request
 * @param {Object} body - Optional payload
 * @param {String} contentType - Optional content-type override
 *
 * @returns {Observable}
 */
const xhr = (method, url, body = null, contentType = CONTENT_TYPE) => {
  const options = {
    body,
    method,
    headers: {
      // Authorization: Storage.getUserToken() ? `Bearer ${Storage.getUserToken()}` : null,
      Authorization: userToken ? `Bearer ${userToken}` : null,
    },
    responseType: "json",
    url: `${process.env.REACT_APP_BACKEND_HOST}${url}`,
  };

  // Adding this so we can allow for undefined contentType to trigger default behavior
  // We will need this for avatars and any other file uploads later.
  if (contentType) {
    options.headers["Content-Type"] = contentType;
  }

  return ajax(options);
};

export default xhr;
