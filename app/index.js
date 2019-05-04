const language = require('@google-cloud/language');
var app_config = require('../config/prod.json');
class Service {
    constructor(options) {
        this.options = options || {};
        this.config = app_config;
    }
    async analyze_text(data) {
        // Instantiates a client
        const client = new language.LanguageServiceClient();
        let responce = {};
        //Over all text
        let document = {
            content: data.text,
            type: this.config.text_type,
        };

        let [result, error] = await client.analyzeSentiment({ document: document });
        if (error) {
            return { error: error, result: null };
        }
        responce["Entire Document"] = result.documentSentiment
        
        //Each word
        for(let word of data.text.split(" ")) {
            let document = {
                content: word,
                type: this.config.text_type,
            };

            let [result, error] = await client.analyzeSentiment({ document: document });
            if (error) {
                return { error: error, result: null };
            }
            responce[word] = result.documentSentiment
        }

        return { error: null, result: responce };
    }

}
module.exports = function (options) {
    return new Service(options);
};

module.exports.Service = Service;
