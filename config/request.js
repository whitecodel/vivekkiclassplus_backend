const https = require('https');

const getRequest = async (url) => {
    return new Promise((resolve, reject) => {
        https.get(url, (resp) => {
            let data = '';
    
            // A chunk of data has been received.
            resp.on('data', (chunk) => {
                data += chunk;
            });
    
            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                resolve(data);
            });
    
        }).on("error", (err) => {
            resolve('Error')
        });
    });
}

module.exports = {
    getRequest
}