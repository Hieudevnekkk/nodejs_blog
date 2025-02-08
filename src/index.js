const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const path = require('path');
const { count } = require('console');
const app = express();
const port = 3000;

const route = require('./routes');

// Static file
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
); // dạng form

                  app.use(express.json());

// HTTP logger
// app.use(morgan("combined"));

//Template engine
                      app.engine(
    'hbs',
    engine({
        extname: '.hbs',
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

route(app);

app.listen(port, () => {
    console.log(`Example app listening at http:localhost:${port}`);
});
