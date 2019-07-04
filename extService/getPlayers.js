const r = require('request').defaults({
    json: true
});
const parser = require('xml2json');


module.exports = (body) => {
    return new Promise((resolve, reject) => {
        console.log(body);
        const teamOptions = {
            method: 'GET',
            uri: `http://sokker.org/xml/players-${body.teamId}.xml`,
            headers: {
                'User-Agent': 'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
                'Cookie': body.cookie,
                'Accept': '/',
                'Connection': 'keep-alive'
            }
        };

        r.get(teamOptions, function (error, response, body) {
            if(error) {
                console.log("Error", error);
            }
            if(!error && response.statusCode === 200) {
                console.log("a", parser.toJson(body))
                resolve(JSON.parse(parser.toJson(body)));
            } else {
                console.log(response.code)

            }
        });

    });
};