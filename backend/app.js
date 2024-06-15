require("dotenv").config();

const express = require('express');
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const cors = require('cors');
const app=express();
const port = process.env.PORT || 5000;

app.use(cors());
connectDb();
app.use(express.json());
app.use('/api/contacts',require('./routes/contactRoutes'))
app.use('/api/users',require('./routes/userRoutes'))
app.use(errorHandler)

console.log(port);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 