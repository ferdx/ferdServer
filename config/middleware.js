var morgan = require('morgan');
var bodyParser = require('body-parser');

module.exports = function (app, express) {
  // set up basic middleware
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  // define routers
  var userRouter = express.Router();

  // api paths for various routes
  app.use('/api/ferd', userRouter); // change when user and ferd schema are decoupled

  // require necessary route files
  require('../api/users/userRoutes.js')(userRouter);
}
