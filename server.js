// step 1 import ...
const express = require('express');
const app = express();
const morgan = require('morgan');
const { readdirSync } = require('fs');
const cors = require('cors');

// import authRouter from './routes/auth.js';


//middleware
app.use(morgan('dev'));
app.use(express.json({ limit: '20mb' }));
app.use(cors());

// step 3 router
// app.use('/api',authRouter);
readdirSync('./routes').map((c) => app.use('/api', require('./routes/' + c)))



// step 2 star server
app.listen(5000, () => console.log('Servicer is running on port: 5000'))





