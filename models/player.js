const mongoose = require('mongoose');

const playerSchema = mongoose.Schema({
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
});

module.exports = mongoose.model('Player', playerSchema);