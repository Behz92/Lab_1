const express = require('express');
const app = express();
const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const registeredRouter = require('./routes/registration');
const cors = require('cors');
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/blogDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

// Middleware to parse JSON
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3001' // Replace with your frontend URL if different
}));


// Use the routers
app.use('/posts', postsRouter);
app.use('/users', usersRouter);
app.use('/registration', registeredRouter);
app.use('/login', loginRouter);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
