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

        let result;
        try {
            [result] = await client.analyzeSentiment({ document: document });
            responce["Entire Document"] = result.documentSentiment
        }
        catch (error) {
            return { error: error, result: null };
        }

        //Each word
        for (let word of data.text.split(" ")) {
            let document = {
                content: word,
                type: this.config.text_type,
            };
            Promise.all()
            try {
                [result] =  await client.analyzeSentiment({ document: document });
                console.log(result);
                responce[word] = result.documentSentiment
            }
            catch (error) {
                return { error: error, result: null };
            }
        }
        return { error: null, result: responce };
    }

}
module.exports = function () {
    return new Service();
};
