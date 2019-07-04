const r = require('request').defaults({
    json: true
});
const parser = require('xml2json');


module.exports = function (user) {
    return (
            new Promise((resolve, reject) => {

            const teamIdOptions = {
                method: 'POST',
                uri: 'http://sokker.org/start.php?session=xml',
                form: {
                    ilogin: user.username,
                    ipassword: user.password
                },
                headers: {
                    /* 'content-type': 'application/x-www-form-urlencoded' */ // Is set automatically
                }
            };

            let teamId = null;
            let cookie = null;
            r.post(teamIdOptions, function (error, response, body) {
                if(error) {
                    console.log("Error", error);
                }
                if(!body.toString().includes("FAILED errorno") && response.statusCode === 200) {
                    teamId = body.toString().split('=')[1];
                    cookie = response.headers['set-cookie'];
                    resolve( { teamId, cookie });
                } else {
                    reject({error: body});
                    console.log(response.code)
                }
            });
        })
    )
};