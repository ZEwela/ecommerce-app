import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const app = express();

const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Ecommerce app listening on port ${port}`);
});
