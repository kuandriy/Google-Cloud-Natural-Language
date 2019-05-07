const google_natural_language = require('./google_natural_language.js')();
class Service {
    constructor(options) {
        this.options = options || {};
    }
    async analyze_text(data) {
        console.log();
        let { result, error } = await google_natural_language.analyze_text(data);
        if (error) {
            return { error: error, result: null };
        }
        return { error: null, result: result };       
    }

}
module.exports = function (options) {
    return new Service(options);
};
