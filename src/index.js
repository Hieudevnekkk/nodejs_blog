const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const methodOverride = require('method-override');
const path = require('path');
const { count } = require('console');
const sortMiddleware = require('./app/middlewares/sortMiddleware');

const route = require('./routes');
const db = require('./config/db');

//Connect to DB
db.connect();

const app = express();
const port = 3000;

// Static file
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    })
); // dạng form

app.use(express.json());

app.use(methodOverride('_method'));

app.use(sortMiddleware);

// HTTP logger
// app.use(morgan("combined"));

//Template engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: require('./helpers/handlebars'),
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

route(app);

app.listen(port, () => {
    console.log(`App listening at http:localhost:${port}`);
});
