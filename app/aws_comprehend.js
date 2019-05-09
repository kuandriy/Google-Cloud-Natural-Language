var AWS = require('aws-sdk');
var app_config = require('../config/prod.json');
var credentials = new AWS.SharedIniFileCredentials({ profile: 'personal-account' });
AWS.config.credentials = credentials;
AWS.config.update({ region: app_config.region });
class Service {
    constructor() {
        this.config = app_config;
    }
    async analyze_text(data) {
        var params = {
            LanguageCode: app_config.language_code,
            Text: data.text
        };
        var comprehend = new AWS.Comprehend();
        return new Promise(function (resolve, reject) {
            comprehend.detectSentiment(params, function (err, data) {
                if (err) {
                    reject( { error: err, result: null });
                }
                else {
                    resolve({ error: null, result: data });
                }
            });
        });
    }
}

module.exports = function () {
    return new Service();
}; 
