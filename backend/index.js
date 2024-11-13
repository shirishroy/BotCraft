const express = require('express');
const app = express();
const port = 3007;
const cors = require('cors'); // Import cors middleware
const connectDB = require('./db');
connectDB();
const userRouter = require('./routes/user');

// Enable CORS for all origins (you can restrict to specific origins if needed)
app.use(cors());

// Use the user routes
app.use('/user', userRouter);

app.get('/', (req, res) => {
    res.send('Welcome');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
