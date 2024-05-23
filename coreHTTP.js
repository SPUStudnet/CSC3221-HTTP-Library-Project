
/*************modify to class***************/
class CoreHTTP {
  async request(method, url, data = null) {
    const config = {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (data) {
      config.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();  // Assuming JSON response
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  get(url) {
    return this.request('GET', url);
  }

  post(url, data) {
    return this.request('POST', url, data);
  }

  put(url, data) {
    return this.request('PUT', url, data);
  }

  delete(url) {
    return this.request('DELETE', url);
  }

  patch(url, data) {
    return this.request('PATCH', url, data);
  }
}


// /******************vickers code******************/

// // Constructor to create an XHR object
// function coreHTTP() {
//   this.http = new XMLHttpRequest();
// }

// /* <<< HTTP GET request >>> */
// coreHTTP.prototype.get = function(url, callback) {
//   // Open the connection
//   this.http.open("GET", url);

//   // Process the request when it is returned.
//   this.http.onload = () => {
//     if (this.http.status >= 200 && this.http.status <= 299) {
//       callback(null, this.http.responseText);
//     } else {
//       callback(`GET Error: ${this.http.status}`);
//     }
//   }

//   // Send the request
//   this.http.send();
// }

// /* <<< HTTP POST request >>> */
// coreHTTP.prototype.post = function(url, data, callback) {
//   this.http.open("POST", url);
//   this.http.setRequestHeader("content-type","application/json");

//   this.http.onload = () => {
//     if (this.http.status >= 200 && this.http.status <= 299) {
//       callback(null, this.http.responseText);
//     } else {
//       callback(`POST Error: ${this.http.status}`);
//     }
//   }

//   this.http.send(JSON.stringify(data));
// }

// /* <<< HTTP PUT request >>> */
// coreHTTP.prototype.put = function(url, data, callback) {
//   this.http.open("PUT", url);
//   this.http.setRequestHeader("content-type","application/json");

//   this.http.onload = () => {
//     if (this.http.status >= 200 && this.http.status <= 299) {
//       callback(null, this.http.responseText);
//     } else {
//       callback(`PUT Error: ${this.http.status}`);
//     }
//   }

//   this.http.send(JSON.stringify(data));
// }

// /* <<< HTTP DELETE request >>> */
// coreHTTP.prototype.delete = function(url, callback) {
//   this.http.open("DELETE", url);
  
//   this.http.onload = () => {
//     if (this.http.status >= 200 && this.http.status <= 299) {
//       callback(null, "User Deleted");
//     } else {
//       callback(`DELETE Error: ${this.http.status}`);
//     }
//   }

//   this.http.send();  
// }