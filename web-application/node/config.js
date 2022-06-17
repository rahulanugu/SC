const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
<<<<<<< HEAD
  path: path.resolve(_dirname, `${process.env.NODE_ENV}.env`)

=======
  path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`)});
>>>>>>> development-environment
 
 module.exports = {
              NODE_ENV : process.env.NODE_ENV || 'development',
              HOST : process.env.HOST || 'localhost', 
              PORT : process.env.PORT || 3000
              }
