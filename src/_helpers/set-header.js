export function setHeader(requestType, data, authHeader = false, fileUpload = false) {
	let userToken = '';
	let headers = {};

	if(authHeader) {
		userToken = localStorage.getItem('userToken');
		headers['x-auth'] = userToken;
	}

	if(!fileUpload) {
		headers['Content-Type'] = 'application/json';
	}

	let request = {
		method: requestType,
    headers
	};

	if(data) {
		if(fileUpload) {
			request['body'] = data;
		} else {
			request['body'] = JSON.stringify(data);
		}
	}

  return request;
}