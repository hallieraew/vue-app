const { Schema, model } = require('mongoose');

const PlayerSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    wins: {
        type: Number,
        required: true,
    },
    losses: {
        type: Number,
        required: true,
    },
    goalieShots: {
        type: Number,
        required: true,
    },
    shots: {
        type: Number,
        required: true,
    },
    skunk: {
        type: Number,
        required: true,
    },
    team: {
        type: String,
        required: true,
    }
});

const Player = model('player', PlayerSchema);

module.exports = Player;