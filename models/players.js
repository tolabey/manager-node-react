const mongoose = require('mongoose');

const playersSchema = mongoose.Schema({
    info: String,
    players: [{
        ID: String,
        name: String,
        surname: String,
        saveDate: String,
        age: String,
        skillForm: String,
        skillExperience: String,
        skillTeamwork: String,
        skillDiscipline: String,
        skillStamina: String,
        skillPace: String,
        skillTechnique: String,
        skillPassing: String,
        skillKeeper: String,
        skillDefending: String,
        skillPlaymaking: String,
        skillScoring: String,
    }],
    date: String
});

module.exports = mongoose.model('Player', playersSchema);