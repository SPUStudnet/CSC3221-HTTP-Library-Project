class coreHttp {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async request(method, route, params = {}, body = null) {
    try {
      let url = new URL(`${this.baseURL}${route}`);
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

      const options = {
        method: method.toUpperCase(),
        headers: {
          'Content-Type': 'application/json'
        }
      };

      if (body) {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Request failed', error);
      return { error: error.message };
    }
  }

  get(route, params = {}) {
    return this.request('GET', route, params);
  }

  post(route, body) {
    return this.request('POST', route, {}, body);
  }

  put(route, body) {
    return this.request('PUT', route, {}, body);
  }

  delete(route, params = {}) {
    return this.request('DELETE', route, params);
  }

  patch(route, body) {
    return this.request('PATCH', route, {}, body);
  }
}

