document.addEventListener('DOMContentLoaded', function() {
  const httpCore = new coreHTTP('https://jsonplaceholder.typicode.com/posts'); 
  const form = document.getElementById('request-form');
  const responseContainer = document.getElementById('response');

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    console.log("Form submitted!");

    // UI feedback: indicate loading process
    responseContainer.innerHTML = "<p>Loading...</p>";

    // Retrieve values from form elements
    const url = document.getElementById('route').value;
    const reqType = document.querySelector('input[name="HTTPtype"]:checked').value;
    const userId = document.getElementById('userId').value.trim();
    const userName = document.getElementById('uname').value.trim();

    // Construct the endpoint URL
    let endpoint = url + (userId ? `/${userId}` : '');

    // Prepare data object for POST, PUT, PATCH methods
    let data = null;
    if (['post', 'put', 'patch'].includes(reqType.toLowerCase())) {
      if (!userName) {
        responseContainer.textContent = "Error: User Name is required for POST, PUT, PATCH methods.";
        return;
      }
      data = {
        title: userName,
        body:'This is a test post',
        userId:1
      };
    }

    // Function to process the response
    const processResponse = (responseData) => {
      console.log("Response Data:", responseData);
      responseContainer.innerHTML = `<pre>${JSON.stringify(responseData, null, 2)}</pre>`;
    };

    // Function to handle errors
    const handleError = (error) => {
      console.error("Fetch error:", error);
      responseContainer.textContent = `Error: ${error.message || error}`;
    };

    // Execute the appropriate fetch call based on the request type
    try {
      switch (reqType.toLowerCase()) {
        case 'get':
          processResponse(await httpCore.get(endpoint));
          break;
        case 'post':
          processResponse(await httpCore.post(url, data));
          break;
        case 'put':
          processResponse(await httpCore.put(endpoint, data));
          break;
        case 'delete':
          processResponse(await httpCore.delete(endpoint));
          break;
        case 'patch':
          processResponse(await httpCore.patch(endpoint, data));
          break;
        default:
          throw new Error('Unsupported request type');
      }
    } catch (err) {
      handleError(err);
    }
  });
});
