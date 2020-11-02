import app from './app';
const PORT = 5000;

/*set the backend server URL*/
const port = process.env.PORT || PORT;

/*listen on port*/
app.listen(port, () => console.log('server started on port ' + PORT));
