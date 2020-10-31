import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
const PORT = 5000;

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


/*set the backend server URL*/
const port = process.env.PORT || PORT;

/*listen on port*/
app.listen(port, () => console.log('server started on port ' + PORT));