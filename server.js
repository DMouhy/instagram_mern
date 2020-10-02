const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { MONGO_URI } = require('./keys');
const cors = require('cors');
const path = require('path');

//App config
const PORT = process.env.PORT || 8000
app.use(cors())

// Mongodb Config
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(() => console.log('Connected'))
.catch(err => console.log('Caught', err.stack));

mongoose.connection.on('connected', () => console.log('Connected to instagramdb DataBase'))
mongoose.connection.on('error', (err) => console.log(`ERROR: ${err}`))

mongoose.set('useFindAndModify', false); //to use FindByIdAndUpdate()

//general MiddleWare
app.use(express.json())

//routes
app.use('/api', require('./routes/Auth_route'));
app.use('/api', require('./routes/Profile_route'));
app.use('/api', require('./routes/Post_route'));

//
// app.use(express.static('frontend/build'))
app.use(express.static(path.join(__dirname, 'frontend/build')));
app.get('/*', function (req, res) {
   res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
 });

// listen to port
app.listen(PORT, () => console.log(`server running on PORT:${PORT}`))