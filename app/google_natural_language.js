const language = require('@google-cloud/language');
var app_config = require('../config/prod.json');
class Service {
    constructor() {
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

        try {
            let [result] = await client.analyzeSentiment({ document: document });
            responce["Entire Document"] = result.documentSentiment
        }
        catch (error) {
            return { error: error, result: null };
        }

        //Each word
        let word_process = [];
        let words = [];
        for (let word of data.text.split(" ")) {
            let document = {
                content: word,
                type: this.config.text_type,
            };
            words.push(word);
            word_process.push(client.analyzeSentiment({ document: document }))
        }
        return await Promise.all(word_process).then(values => {
            for (let i = 0; i < words.length; i++) {
                responce[words[i]] = values[i][0].documentSentiment;
            }
            return { error: null, result: responce };
        }
        ).catch(error => {
            return { error: error, result: null };
        });
    }

}
module.exports = function () {
    return new Service();
}; 
