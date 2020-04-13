const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;

app.use(require('./middleware/session'));
app.use(require('./middleware/https-redirect'));
app.use(require('./middleware/hash-removal'));

const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

app.all('/_ah/health', (req, res) => res.sendStatus(200));
app.use('/static', require('./apps/static'));
app.use('/auth', require('./apps/authentication').app);
app.use('/admin', require('./apps/admin'));
app.use('/sw.js', require('./apps/service-worker'));
app.use('/', require('./apps/dynamic'));

app.listen(PORT, _ => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});