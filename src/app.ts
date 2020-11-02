import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


/*import routes*/
import anagramsRoute from './routes/anagrams';

const apiBase = '/api';
/* set up routes */
app.use(apiBase + '/anagrams', anagramsRoute);

export default app;