const express = require('express');
const dynamic = express();
const path = require('path');
const adaro = require('adaro');
const fs = require('fs');

const libraryPath = path.join(__dirname, '..', '..', 'client', 'videos.json');
const helpersPath = path.join(__dirname, '..', 'helpers');
const filtersPath = path.join(__dirname, '..', 'filters');
const viewPath = path.join(__dirname, '..', '..', 'views');

const packageReader = require('../utils/package-reader');
const version = packageReader.getVersion();
const videoLibrary = require('../utils/video-libraray');
const libraray = videoLibrary.load(libraryPath);
const inlines = {
    js: fs.readFileSync(path.join(viewPath, 'inlines', 'bootstrap.js'), 'utf-8'),
    css: fs.readFileSync(path.join(viewPath, 'inlines', 'bootstrap.css'), 'utf-8')
};

const dustOptions = {
    cache: false,
    whitespace: true,
    helpers: [
        require(`${helpersPath}/hash`),
        require(`${helpersPath}/star-rating`),
        require(`${filtersPath}/date-format`),
        require(`${filtersPath}/time-format`),
        require(`${filtersPath}/truncate`),
        require(`${filtersPath}/linkify`)
    ]
};

const defalutViewOptions = {
    title: 'Biograf',
    shows: library.shows,
    version,
    scripts: [
        'dist/client/scripts/app.js'
    ]
}

if (process.env.NODE_ENV === 'production') {
    dustOptions.cache = true;
    dustOptions.whitespace = false;
    console.log('[App: Dynamic] Templating is cached');
}

dynamic.engine('dust', adaro.dust(dustOptions));
dynamic.set('view engine', 'dust');
dynamic.set('views', viewPath);
dynamic.use(require('../middleware/no-cache.js'));

dynamic.get('/', (req, res) => {
    const viewOptions = Object.assign({}, defalutViewOptions, {
        featured: videoLibrary.find(libraryPath.shows, libraray.featured.split('/')),
        newest: videoLibrary.getNewest(libraray.shows, 4),
        inlines
    });

    viewOptions.scripts.push('dist/client/scripts/home.js');
    res.status(200).render('home', viewOptions);
});

dynamic.get('/*', (req, res) => {
    const pathName = req.url.replace(/^\/|\/$)/ig, '').replace(/[^a-z0-9\-\.\/]/ig, '');
});