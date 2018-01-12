const path = require('path');

<<<<<<< HEAD
const argv = require('minimist')(process.argv.slice(2));

let env = null;

switch (argv.env) {
    case 'production':
        env = 'webpack.config.prod';
        break;
    default:
        env = 'webpack.config.dev';

}

console.log(`you are in ${argv.env} mode`);

module.exports = require( path.resolve(__dirname,'cfg',env) );
=======
let env = process.env.NODE_ENV;

module.exports = require(path.resolve(__dirname, 'cfg', env));
>>>>>>> c7d664b6cf4327ebc5c8f682e3648b2a99445283
