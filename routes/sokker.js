const r = require('request').defaults({
    json: true
});

const Players = require('../models/players.js');

module.exports = function(app) {

    app.get('/getAllPlayerList', function (req, res) {
       console.log("Get All Player List") ;
        Players.find(function (err, players) {
            if(err) {
                res.json({info: 'error during find cats'});
            } else {
                res.json({data: players});
            }
        });
    });

    // body: ilogin ipassword
    app.post('/getTeamIdAndCookie', function (req, res) {
        const cookieAndTeamId = require('../extService/getCookieAndTeamId');
        cookieAndTeamId(req.body)
            .then(({teamId, cookie}) => {
                res.json({data: {teamId, cookie}});
            })
            .catch((err) => {
                res.json(err);
            })
    });

    // body: {cookie, teamId}
    app.post('/setCurrentPlayerList', function (req, res) {
                const getPlayers = require('../extService/getPlayers');
                getPlayers(req.body)
                    .then((players) => {

                        let playersData = {};

                        const today = new Date();
                        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                        const dateTime = date+' '+time;
                        playersData.date = dateTime;
                        playersData.players = players.players.player.map(each => {
                            each.saveDate = dateTime;
                            return each;
                        });

                        const newPlayers = new Players(playersData);
                        newPlayers.save(function (err, data) {
                            if (err) {
                                console.log({info: "error during player list create"});
                            } else {
                                console.log("Player List saved into MONGODB");

                                Players.find(function (err, players) {
                                    if(err) {
                                        res.json({info: 'error during find cats'});
                                    } else {
                                        res.json({data: players});
                                    }
                                });
                            }
                        });

                    })
                    .catch((err) => {
                        res.json({error: err});
                    });
    });

    app.delete('/removePlayer/:id', function(req, res) {
        Players.findByIdAndRemove(req.params.id, function(err) {
            if(err) {
                res.json({info: "error during remove cat", error: err});
            } else {
                res.json({info: "no error during remove cat"});
            }
        })
    });

    app.delete('/removePlayers', function (req, res) {
        Players.deleteMany({}, function (err) {
            if(err) {
                res.json({info: "not removed all"});
            } else {
                res.json({info: "no error"});
            }
        })
    })
};