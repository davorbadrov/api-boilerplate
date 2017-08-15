const dotenv = require('dotenv');

if (process.env.NODE_ENV !== 'production') {
    const settings = dotenv.load();
}

require('./src');
