const hashRemoval = (req, res, next) => {
    const hasHashInName = /[a-f0-9]{64}\./;
    if (!hasHashInName) {
        return next();
    }

    req.url = req.url.replace(hasHashInName, '');
    next();
};

console.log('[Middleware: Hash removal] initialized.');
module.exports = hashRemoval;