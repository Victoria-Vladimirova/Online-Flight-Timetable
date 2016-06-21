import 'whatwg-fetch';

function request(method, url, data, callback) {
    var options = {
        method: method,
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        credentials: 'same-origin'
    };
    if (method !== 'get') {
        options.body = JSON.stringify(data);
    }
    fetch(url, options).then(response => {
        return response.json();
    }).then(jsonResponse => {
        callback(null, jsonResponse);
    }).catch(err => {
        callback(err);
    });
}

export function list(objParams, callback) {
    var url = location.origin + '/flights?';
    Object.keys(objParams).forEach(key => url += key + '=' + encodeURIComponent(objParams[key]) + '&');
    request('get', url, objParams, callback);
}

export function edit(objParams, callback) {
    request('put', '/flights/' + objParams._id, objParams, callback);
}

export function remove(id, callback) {
    request('delete', '/flights/' + id, {}, callback);
}

export function add(objParams, callback) {
    request('post', '/flights', objParams, callback);
}
