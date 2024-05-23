
// When the entire page is loaded,
document.addEventListener('DOMContentLoaded', () => {
  // Instantiate the coreHTTP object, with the explicit test URL
  const apiClient = new coreHttp('https://jsonplaceholder.typicode.com');

  document.getElementById('request-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const method = document.querySelector('input[name="HTTPtype"]:checked').value.toUpperCase();
    const userId = document.querySelector('input[name="userId"]').value;
    const userName = document.querySelector('input[name="uname"]').value;
    const route = '/posts';

    let params = {};
    let body = {};

    if (userId) {
      params.userId = userId;
    }
    
    if (userName) {
      body.title = userName;
    }

    let response;
    switch (method) {
      case 'GET':
        response = await apiClient.get(route, params);
        break;
      case 'POST':
        response = await apiClient.post(route, body);
        break;
      case 'PUT':
        response = await apiClient.put(`${route}/${userId}`, body);
        break;
      case 'DELETE':
        response = await apiClient.delete(`${route}/${userId}`);
        break;
      case 'PATCH':
        response = await apiClient.patch(`${route}/${userId}`, body);
        break;
    }

    document.getElementById('response').textContent = JSON.stringify(response, null, 2);
  });
});
