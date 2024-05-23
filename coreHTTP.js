/**
 * CoreHTTP Class
 * CSC 3221
 * Main code by Joyce Tang.
 * Tertiary code by Dorothy Prosser and Kyler Veenstra
 * Comments by Kyler Veenstra.
 * 
 * Created 5/23/24
 */
class coreHTTP {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

/**
   * Main request functionality
   * @param {*} method The method to use when querying the url and route.
   * @param {*} route The route to use, the extension after the domain name.
   * e.g: [example.com][/peanuts]
   *       domain name    route 
   * @param {*} params The parameters of the request.
   * @param {*} body The body of the request.
   * @returns A JSON object representation of the returned data if successful. The error message if failed.
   */
  async request(method, url, data = null) {
    const config = {
      method: method,
      headers: { "Content-Type": "application/json" },
    };

    if (data) {
      config.body = JSON.stringify(data);
    }
// Try/Catch for error handling.
    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (err) {
      console.error("Fetch error:", err);
      throw err;
    }
  }

  /**
   * Get
   * @param {} route The route to send the get request to.
   * @param {*} params The parameters to send in the get request.
   * @returns The JSON object if successful. An error message if failed.
   */
  async get(url) {
    return await this.request("GET", url);
  }

/**
   * Post
   * @param {*} route The route to send the request to.
   * @param {*} body The body to send in the request.
   * @returns The JSON object if successful. An error message if failed.
   */

  async post(url, data) {
    return await this.request("POST", url, data);
  }

/**
   * Put
   * @param {*} route The route to send the request to.
   * @param {*} body The body to send in the request.
   * @returns The JSON object if successful. An error message if failed.
   */

  async put(url, data) {
    return await this.request("PUT", url, data);
  }


   /**
   * Delete
   * @param {*} route The route to send the request to.
   * @param {*} body The body to send in the request.
   * @returns The JSON object if successful. An error message if failed.
   */
  async delete(url) {
    return await this.request("DELETE", url);
  }


  /**
   * Patch
   * @param {*} route The route to send the request to.
   * @param {*} body The body to send in the request.
   * @returns The JSON object if successful. An error message if failed.
   */
  async patch(url, data) {
    return await this.request("PATCH", url, data);
  }
}