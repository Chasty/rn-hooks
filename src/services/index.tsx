import axios from 'axios';
const baseUrl = 'http://192.168.43.66:3800/api'


function getUrlEncoded(params) {
    var formBody = [];
    for (var property in params) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(params[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }

    var formBodyS = formBody.join("&");
    return formBodyS;
}

export async function getTasks() {
    try {
        const response = await axios({
            url: `${baseUrl}/tasks`,
            method: 'GET'
        })

        return response
    } catch(e) {
        console.log(e)
    }
}

export async function saveTask(data) {
    data = getUrlEncoded(data)
    try {
        const response = await axios({
            url: `${baseUrl}/tasks`,
            data: data,
            method: 'POST'
        })

        return response
    } catch(e) {
        console.log(e)
    }
}