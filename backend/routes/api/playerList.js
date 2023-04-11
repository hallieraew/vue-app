const { Router } = require('express')
const Player = require('../../models/player');

const router = Router()

router.get('/', async (req, res) => {
    try {
        const playerList = await Player.find();
        if (!playerList) throw new Error('No Player List found');
        res.status(200).json(playerList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    const newPlayer = new Player(req.body);
    try {
        const player = await newPlayer.save();
        if (!player) throw new Error('Something went wrong saving the player.');
        res.status(200).json(player);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const removed = await Player.findByIdAndDelete(id);
        if (!removed) throw Error('Something went wrong ');
        res.status(200).json(removed);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const changedPlayer = await Player.findByIdAndUpdate(id, req.body);
        if (!changedPlayer) throw Error('Something went wrong ');
        res.status(200).json(changedPlayer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;