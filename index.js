const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

// Routes
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const postRoute = require('./routes/post');
const categoryRoute = require('./routes/category');

const PORT = "5000"

dotenv.config();
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '/images')));
app.use(cors({
    origin: 'http://localhost:3001'
}));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (req.body.directory) {
            cb(null, req.body.directory);
        } else {
            cb(null, 'images');
        }
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    }
});

const upload = multer({ storage: storage });

mongoose.connect(process.env.MONGO_URL)
    .then(console.log('Connected to MongoDB.'))
    .catch(error => console.error(error));

app.post('/api/upload', upload.single('file'), (req, res) => {
    res.status(200).json('File has been uploaded.');
});

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/post', postRoute);
app.use('/api/category', categoryRoute);


app.listen(PORT, () => {
    console.log('Backend is running on ',PORT);
});