const { httpGet } = require('./mock-http-interface');

const SUCCESS_STATUS = 200;
const SUCCESS_KEY = 'Arnie Quote';
const FAILURE_KEY = 'FAILURE';

/**
 * Handles the request to the URL and returns the result in the correct format.
 * Future implementation could include error handling if the request fails for some reason or if the response is not in the correct format.
 * @param {string} url - The URL to request.
 * @returns {Promise<Object>} - The result in the correct format.
 * @example
 * handleUrlRequest('http://www.smokeballdev.com/arnie0') // Promise<Object>
 */
const handleUrlRequest = async (url) => {
  const { status, body } = await httpGet(url);
  return handleResponse(status, body);
};

/**
 * Handles the response from the HTTP GET request and returns the result in the correct format.
 * @param {number} status - The status code of the response.
 * @param {string} body - The body of the response.
 * @returns {Object} - The result in the correct format.
 * @example
 * handleResponse(200, '{"message": "Get to the chopper"}') // { 'Arnie Quote': 'Get to the chopper' }
 * handleResponse(500, '{"message": "Your request has been terminated"}') // { 'FAILURE': 'Your request has been terminated' }
 */
const handleResponse = (status, body) => {
  const parsedBody = JSON.parse(body);
  const key = status === SUCCESS_STATUS ? SUCCESS_KEY : FAILURE_KEY;
  return { [key]: parsedBody.message };
};

/**
 * Gets the Arnie quotes from the URLs.
 * @param {string[]} urls - The URLs to get the Arnie quotes from.
 * @returns {Promise<Object[]>} - The results of the HTTP GET requests.
 * @example
 * getArnieQuotes(['http://www.smokeballdev.com/arnie0', 'http://www.smokeballdev.com/arnie1']) // Promise<Object[]>
 */
const getArnieQuotes = async (urls) => {
  return Promise.all(urls.map(url => handleUrlRequest(url)));  
};

module.exports = {
  getArnieQuotes,
};
