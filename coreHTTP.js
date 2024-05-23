class coreHTTP {
	// Request overarching method, used by all subordinate methods to construct a response.
	async request(method, url, data = null) {
		const config = {
			method: "POST",
			mode: "no-cors",
			cache: "no-cache",
			credentials: "same-origin",
			// If we need data to be passed in request, specify the content as JSON.
			headers: { "Content-Type": "application/json" },
		};

		if (
			data &&
			(method === "POST" || method === "PUT" || method === "PATCH")
		) {
			config.body = JSON.stringify(data);
		}

		fetch(url)
			.then((response) => response.json())
			.then((json) => console.log(json));

		// Fetches a response from the url given the configuration.
		const response = await fetch(url);

		if (!response.ok) console.log(response.status);

		// Get currently fails here, as the length of the .json response is zero.
		const responseData = await response.json();

		return responseData;
		console.log("HTTP Error", err);
		throw err;
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
