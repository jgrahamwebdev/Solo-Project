
import path from 'path';
import express from 'express';
import asyncHandler from 'express-async-handler';
import dotenv from 'dotenv';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import entryRoutes from './routes/entryRoutes.js';
import userRoutes from './routes/userRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

const app = express();

//Body Parser
app.use(express.json())

dotenv.config()

connectDB()

//Message sent to Client(browser)
app.get('/', (req, res) => {
    res.send('API is running');
});

//Mount entryRoutes
app.use('/entries', entryRoutes)

//Mount userRoutes
app.use('/users', userRoutes)

//Mount uploadRoutes
app.use('/api/upload', uploadRoutes)

//Makes 'uploads' folder Static
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

//Custom Error Middleware calls:
app.use(notFound)
app.use(errorHandler)

//Environment Variables Implementation
const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`));