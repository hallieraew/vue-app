const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const PlayerListRoutes = require('./routes/api/playerList');
const path = require('path');
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,

    })
    .then(() => console.log('MongoDB database Connected...'))
    .catch((err) => console.log(err))

app.use('/api/playerList', PlayerListRoutes);

app.listen(process.env.PORT, () => console.log(`App listening at http://localhost:${process.env.PORT}`));