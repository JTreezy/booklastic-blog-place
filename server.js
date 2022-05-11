const express = require("express");
const exphbs = require("express-handlebars");
const allRoutes = require("./controllers");
const session = require("express-session");
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const {Server} = require('socket.io')

// Sets up the Express App
// =============================================================
const app = express();

const http = require('http').createServer(app);
const io = new Server(http)
io.on('connection', (socket) => {
  console.log('user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
})

const PORT = process.env.PORT || 3000;
// Requiring our models for syncing
const { User, Blog } = require("./models");
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 2 * 60 * 60 * 1000
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};
app.use(session(sess));
// Static directory
app.use(express.static('public'));

const hbs = exphbs.create({});  //create handlebars engine
app.engine('handlebars', hbs.engine);  //create a veiw engine
app.set('view engine', 'handlebars');  //set out to use the view engine

app.use("/", allRoutes);

sequelize.sync({ force: false }).then(function() {
// keep app.listen as well??
  http.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
