const google_natural_language = require('./google_natural_language.js')();
const aws_comprehend = require('./aws_comprehend.js')();
class Service {
    constructor(options) {
        this.options = options || {};
    }
    async analyze_text(data) {
        let google_result = await this.google_analyze_text(data);
        let aws_result = await this.aws_analyze_text(data);

        let responce = {};
        responce.result = { google: google_result.result };
        responce.error = google_result.error;
        if (!responce.error) {
            responce.error = aws_result.error;
        }
        responce.result.aws = aws_result.result.result;
        return responce;
    }
    async google_analyze_text(data) {
        let { result, error } = await google_natural_language.analyze_text(data);
        if (error) {
            return { error: error, result: null };
        }
        return { error: null, result: result }
    }
    async aws_analyze_text(data) {
        return await aws_comprehend.analyze_text(data).then((result) => {
            return { error: null, result: result }
        }).catch((error) => {
            return { error: error, result: null }
        });
    }
}
module.exports = function (options) {
    return new Service(options);
};
