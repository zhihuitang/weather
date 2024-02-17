const express = require('express');
const path = require('path');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode')

const app = express();
const port = 3000;

console.log(__dirname);
console.log(__filename);
console.log(path.join(__dirname, '../public'));

// define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Zhihui Tang'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Mia Tang'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Zhihui Tang',
        helpText: 'This is some helpful text.'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) { 
        return res.json({
            error: 'You must provide a address'
        });
    }
    const address = req.query.address;
    console.log(req.query);

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.json({ error });
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.json({ error });
            }
            res.json({
                forecast: forecastData,
                location,
                address
            });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Zhihui Tang',
        errorMessage: 'Help article not found'
    });
});


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Zhihui Tang',
        errorMessage: 'Page not found: ' + req.path
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
