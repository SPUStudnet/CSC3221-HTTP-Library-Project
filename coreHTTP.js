
/**
 * CoreHTTP Class
 * CSC 3221
 * Main code by Joyce Tang.
 * Tertiary code by Dorothy Prosser and Kyler Veenstra
 * Comments by Kyler Veenstra.
 * 
 * Created 5/23/24
 */


class coreHttp {
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
  async request(method, route, params = {}, body = null) {
	// Try/Catch for error handling.
    try {
	// Constructor the url with the route.
      let url = new URL(`${this.baseURL}${route}`);

	  // For each parameter, add it to the URL's search parameters.
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));


	  // Create the options for the request.
      const options = {
        method: method.toUpperCase(),
        headers: {
          'Content-Type': 'application/json'
        }
      };


	  // If there is a body to pass in the request, add it to the fetch options.
      if (body) {
        options.body = JSON.stringify(body);
      }

	  // Set the request, wait for a response.
      const response = await fetch(url, options);

      if (!response.ok) {
		// If the response results in an error, send an error.
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

	  // Await the response converted to a json object.
      const data = await response.json();

	  // Return the object.
      return data;

    } catch (error) {
		// If an error is encountered, write it to the terminal and return it.
      console.error('Request failed', error);
      return { error: error.message };
    }
  }


  /**
   * Get
   * @param {} route The route to send the get request to.
   * @param {*} params The parameters to send in the get request.
   * @returns The JSON object if successful. An error message if failed.
   */
  get(route, params = {}) {
    return this.request('GET', route, params);
  }

  /**
   * Post
   * @param {*} route The route to send the request to.
   * @param {*} body The body to send in the request.
   * @returns The JSON object if successful. An error message if failed.
   */
  post(route, body) {
    return this.request('POST', route, {}, body);
  }

  /**
   * Put
   * @param {*} route The route to send the request to.
   * @param {*} body The body to send in the request.
   * @returns The JSON object if successful. An error message if failed.
   */
  put(route, body) {
    return this.request('PUT', route, {}, body);
  }

  /**
   * Delete
   * @param {*} route The route to send the request to.
   * @param {*} body The body to send in the request.
   * @returns The JSON object if successful. An error message if failed.
   */
  delete(route, params = {}) {
    return this.request('DELETE', route, params);
  }

  /**
   * Patch
   * @param {*} route The route to send the request to.
   * @param {*} body The body to send in the request.
   * @returns The JSON object if successful. An error message if failed.
   */
  patch(route, body) {
    return this.request('PATCH', route, {}, body);
  }
}

