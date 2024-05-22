class coreHTTP{

async request(method,url,data=null){
  const config = {
method: method,
headers: data ? { 'Content-Type': 'application/json' } : {}
  };

if (data && (method==='POST' || method==='PUT'|| method==='PATCH')){
  config.body = JSON.stringify(data);
}

try{
  const response = await fetch(url,config);
  const responseData = await response.json();
  return responseData;
} catch(err){
  console.log('HTTP Error', err);
  throw err;
}
}

async get(url){
  return await this.request('GET',url);
}

async post(url,data){
  return await this.request('POST',url,data);
}

async put(url,data){
  return await this.request('PUT',url,data);
}

async delete(url){
  return await this.request('DELETE',url);
}

async patch(url,data){
  return await this.request('PATCH',url,data);
}
}