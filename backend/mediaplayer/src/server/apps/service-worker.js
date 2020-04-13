const path = require('path');
const express = require('express');
const adaro = require('adaro');
const serviceWorker = express();

const packageReader = require('../utils/package-reader');
const version = packageReader.getVersion();
const viewPath = path.join(__dirname, '..', '..', 'client');
const helpersPath = path.join(__dirname, '..', 'helpers');
const dustOptions = {
    cache: false,
    whitespace: true,
    helpers: [
        require(`${helpersPath}/hash`)
    ]
};

if (process.env.NODE_ENV === 'production') {
    dustOptions.cache = true;
    dustOptions.whitespace = false;
    console.log('[App: Service Worker] Templating is cached');
}

serviceWorker.engine('js', adaro.dust(dustOptions));
serviceWorker.set('view engine', 'js');
serviceWorker.set('views', viewPath);
serviceWorker.use(require('../middleware/no-cache.js'));

serviceWorker.get('*', (req, res) => {
    res.set('Content-Type', 'application/javascript');
    res.status(200).render('sw', {
        version
    });
});

console.log('[App: Service Worker] initialized.');
module.exports = serviceWorker;