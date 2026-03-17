import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { 
    requestLogger, 
    errorLogger 
} from './src/middleware/logger.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(requestLogger);


app.use(errorLogger);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});