/**
 * Checks if response code belongs to 2xx
 * @param response response to be checked
 */
const checkResponse = (response: Response) => {
  if (response.status < 200 || response.status > 300) {
    throw Error(response.statusText);
  }

  return response;
};

/**
 * Create HTTP request
 * @param url url of the endpoint
 * @param sttg optional settings
 */
const makeRequest = async (url: string, sttg: { method?: string; body?: any }) => {
  const request = await fetch(url, sttg);
  return checkResponse(request);
};

/**
 * Settings for POST, PUT and DELETE
 * @param method request method
 * @param data object for the body
 */
const settings = (method: string, data: any) => ({
  method,
  body: JSON.stringify(data),
});

/*! REST METHODS; GET, POST, PUT, DELETE */

/**
 * REST METHOD: GET
 * @param url url of the endpoint
 */
export const getJSON = async (url: string) => {
  const request = await makeRequest(url, {});
  return request?.json();
};

/**
 * REST METHOD: POST
 * @param {string} url url of the endpoint
 * @param {object} data data to pass through body
 * @return {Promise}
 */
export const postJSON = async (url: string, data: any) => {
  const request = await makeRequest(url, settings('POST', data));
  return request?.json();
};

/**
 * REST METHOD: PUT
 * @param {string} url url of the endpoint
 * @param {object} data data to pass through body
 * @return {Promise}
 */
export const putJSON = async (url: string, data: any) => {
  const request = await makeRequest(url, settings('PUT', data));
  return request?.json();
};

/**
 * REST METHOD: DELETE
 * @param {string} url url of the endpoint
 * @param {object} data data to pass through body
 * @return {Promise}
 */
export const deleteJSON = async (url: string, data: any) => {
  const request = await makeRequest(url, settings('DELETE', data));
  return request?.json();
};
