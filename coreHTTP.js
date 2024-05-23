class coreHTTP {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async request(method, url, data = null) {
    const config = {
      method: method,
      headers: { "Content-Type": "application/json" },
    };

    if (data) {
      config.body = JSON.stringify(data);
    }

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

  async get(url) {
    return await this.request("GET", url);
  }

  async post(url, data) {
    return await this.request("POST", url, data);
  }

  async put(url, data) {
    return await this.request("PUT", url, data);
  }

  async delete(url) {
    return await this.request("DELETE", url);
  }

  async patch(url, data) {
    return await this.request("PATCH", url, data);
  }
}
