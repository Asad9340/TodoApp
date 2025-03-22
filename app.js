const express = require('express');
const router = require('./src/routes/routes');
const bodyParser = require('body-parser');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const connectDB = require('./src/helper/DBConnection')



const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(mongoSanitize());


// Limit api calling for 15 min 100 requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use(limiter);

// mongodb database connection
connectDB();


app.use('/api/v1', router);


// for undefined route 
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'Route not found' });
})

module.exports = app;