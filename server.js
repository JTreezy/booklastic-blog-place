const express = require("express");
const exphbs = require("express-handlebars");
const allRoutes = require("./controllers");
const session = require("express-session");
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const {Server} = require('socket.io')
let cookie = require('cookie')

// Sets up the Express App
// =============================================================
const app = express();

const http = require('http').createServer(app);
const io = new Server(http)

const PORT = process.env.PORT || 3000;
// Requiring our models for syncing
const { User, Blog } = require("./models");
const req = require("express/lib/request");
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
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

//pass through session.user to grab the user information
app.use("/", allRoutes);
app.get('/bookclub', (req, res) => {
  res.sendFile(__dirname + 'main');
  console.log("session",req.session.user)
});

//initialize socket server side
sequelize.sync({ force: false }).then(function() {
  http.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
      io.on('connection', (socket) => {
        var tS = cookie.parse(socket.handshake.headers.cookie)['connect.sid'];
        var sessionID = tS.split(".")[0].split(":")[1];
        console.log('user connected', tS, sessionID);
        socket.on('chat message', (msg) => {
          console.log('message: ' + msg);
          console.log(socket.handshake.address);
          io.emit('chat message', {msg, sessionID});
        });
        socket.on('disconnect', () => {
          console.log('user disconnected');
          socket.disconnect();
        });
      })
    });
  });