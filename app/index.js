const language = require('@google-cloud/language');
var app_config = require('../config/prod.json');
class Service {
    constructor(options) {
        this.options = options || {};
        this.config = app_config;
    }
    async analyze_text(data) {
        // Instantiates a client
        let responce = {};
        const client = new language.LanguageServiceClient(this.config.google);

        const document = {
            content: data.text,
            type: this.config.text_type,
        };

        // Detects the sentiment of the text
        const [sentiment_result, sentiment_error] = await client.analyzeSentiment({ document: document });
        if (sentiment_error) {
            return { error: sentiment_error, result: null };
        }
        const sentiment = sentiment_result.documentSentiment;

        responce.sentiment = sentiment

        // Detects syntax in the document
        const [syntax_result, syntax_error] = await client.analyzeSyntax({ document: document });
        if (syntax_error) {
            return { error: syntax_error, result: null };
        }  
    
        syntax_result.tokens.forEach(part => {
            responce[part.text.content] = { tag: part.partOfSpeech.tag };
            responce[part.text.content].morphology =  part.partOfSpeech;
        });

        return { error: null, result: responce };

    }
}
module.exports = function (options) {
    return new Service(options);
};

module.exports.Service = Service;
