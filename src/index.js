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
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default';

                const icons = {
                    default: 'fa-sort',
                    asc: 'fa-arrow-down-short-wide',
                    desc: 'fa-arrow-down-wide-short',
                };

                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc',
                };

                const icon = icons[sortType];
                const type = types[sortType];

                return `<a href='?_sort&column=${field}&type=${type}'> <i class='fa-solid ${icon}'></i></a>`;
            },
        },
    })
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

route(app);

app.listen(port, () => {
    console.log(`App listening at http:localhost:${port}`);
});
