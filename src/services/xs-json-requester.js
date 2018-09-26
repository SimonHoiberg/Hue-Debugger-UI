/**
 * Checks if response code belongs to 2xx
 * @param {Response} response response to be checked
 * @returns {Promise}
 */
const checkResponse = response => {
  if (response.status >= 200 && response.status < 300) return Promise.resolve(response);
  else Promise.reject(new Error(response.statusText));
}

/**
 * Create HTTP request
 * @param {string} url url of the endpoint
 * @param {object} settings optional settings
 * @returns {Promise}
 */
const makeRequest = (url, settings) => 
  fetch(url, settings).then(res => checkResponse(res));

/**
 * Settings for POST, PUT and DELETE
 * @param {string} method request method 
 * @param {object} data object for the body
 * @returns {object}
 */
const settings = (method, data) => ({
  method: method,
  body: JSON.stringify(data)
}); 

/**
 * Specialized settings for POST that uses URI encoding
 * Mainly used for retrieving POST via PHP
 * @param {string} method request method 
 * @param {object} data data to pass through body 
 * @returns {object}
 */
const encodeSettings = (method, data) => ({
  method: method,
  headers: {
    "Content-type": "application/x-www-form-urlencoded"
  },
  body: formEncode(data)
});

/**
 * URI Encode data from data object
 * @param {object} data data object to be encoded
 * @return {string}
 */
const formEncode = data => {
  const encoded = [];
  for(let d in data) encoded.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
  return encoded.join("&");
}

/* REST METHODS; GET, POST, PUT, DELETE */

/**
 * REST METHOD: GET
 * @param {string} url url of the endpoint
 * @return {Promise}
 */

export const getJSON = url => 
  makeRequest(url, null).then(res => res.json());

/**
 * REST METHOD: POST
 * @param {string} url url of the endpoint 
 * @param {object} data data to pass through body
 * @return {Promise}
 */
export const postJSON = (url, data) => 
  makeRequest(url, settings("POST", data)).then(res => res.json());

/**
 * REST METHOD: POST (URI Encoded)
 * @param {string} url url of the endpoint 
 * @param {object} data data to pass through body
 * @return {Promise}
 */
export const postEncodedJSON = (url, data) => 
  makeRequest(url, encodeSettings("POST", data)).then(res => res.json());

/**
 * REST METHOD: PUT
 * @param {string} url url of the endpoint 
 * @param {object} data data to pass through body
 * @return {Promise}
 */
export const putJSON = (url, data) => 
  makeRequest(url, settings("PUT", data)).then(res => res.json());

/**
 * REST METHOD: DELETE
 * @param {string} url url of the endpoint 
 * @param {object} data data to pass through body
 * @return {Promise}
 */
export const deleteJSON = (url, data) => 
  makeRequest(url, settings("DELETE", data)).then(res => res.json());