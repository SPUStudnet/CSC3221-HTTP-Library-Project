
// When the entire page is loaded,
document.addEventListener('DOMContentLoaded', function() {
  const httpCore = new coreHTTP(document.getElementById("route").value); 
  const form = document.getElementById('request-form');
  const responseContainer = document.getElementById('response');
  StartUp();

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

    if (['delete'].includes(reqType.toLowerCase())) {
      if (!userId) {
        responseContainer.textContent = "Error: An Id is required for the DELETE method."
        return;
      }
    }

// Function to process and format the response data
const processResponse = (responseData) => {
  console.log("Response Data:", responseData);
  let formattedData = '';
  // Check if responseData is an array and handle it
  if (Array.isArray(responseData)) {
    responseData.forEach((item, index) => {
      //formattedData += `Item ${index + 1}:\n`;
      formattedData += formatObject(item);
      formattedData += '\n'; // Separate items with a blank line
    });
  } else {
    // Handle single object response
    formattedData = formatObject(responseData);
  }
  responseContainer.innerText = formattedData;
};

// Helper function to format each object
const formatObject = (obj) => {
  // Check if the object has 'userId' and 'id' properties
  if (obj.hasOwnProperty('userId') && obj.hasOwnProperty('id')) {
    return `User ${obj.userId}-${obj.id}\n`;
  }
  else {
    return JSON.stringify(obj);
  }
  return '';
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


function SetupInput(reqType) {
  switch (reqType) {
    case "get":
      document.querySelector("#uIdArea").style.display = "flex";
      document.querySelector("#uNameArea").style.display = "none";
      break;
    case "post":
      document.querySelector("#uIdArea").style.display = "none";
      document.querySelector("#uNameArea").style.display = "flex";
      break;
    case "put":
      document.querySelector("#uIdArea").style.display = "flex";
      document.querySelector("#uNameArea").style.display = "flex";
      break;
    case "delete":
      document.querySelector("#uIdArea").style.display = "flex";
      document.querySelector("#uNameArea").style.display = "none";
      break;

    case "patch":
      document.querySelector("#uIdArea").style.display = "flex";
      document.querySelector("#uNameArea").style.display = "flex";
  }
}

function StartUp() {
  // Setup the initial inputs
  document.querySelector("#rbGet").checked = true;
  SetupInput("get");
  
  // Add listeners for the radio buttons
  document.querySelector("#rbGet").addEventListener("change", () => SetupInput("get"));
  document.querySelector("#rbPost").addEventListener("change", () => SetupInput("post"));
  document.querySelector("#rbPut").addEventListener("change", () => SetupInput("put"));
  document.querySelector("#rbDelete").addEventListener("change", () => SetupInput("delete"));
  document.querySelector("#rbPatch").addEventListener("change", () => SetupInput("patch"));
};
