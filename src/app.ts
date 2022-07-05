import express from 'express';
import passport from 'passport';
import mongoose, { ConnectOptions } from 'mongoose';
import cors from 'cors';
import users from './controller/users';
import bots from './controller/bots';
import * as http from 'http';
import session from 'express-session';
const app = express();
app.use(cors());
const port = process.env.PORT || 5000;

mongoose
.connect('mongodb+srv://buddyest:buddyest773@cluster0.ocws3.mongodb.net/buddyest?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } as ConnectOptions
  )
  .then(() => {
    console.log("The mongoose database is connected");
  });
  app.use(session({
    name: "myname.sid",
    resave:false,
    saveUninitialized:false,
    secret:'PsyX7lk63g',
    cookie:{
      maxAge:36000000,
      httpOnly:false,
      secure:false
    }
  }));
app.use(passport.initialize());
app.use(passport.authenticate('session'));

const server = http.createServer(app)
app.use(express.json());
app.use("/users", users);
app.use("/bots", bots);
app.get("/", (req, res) => {
  res.send("server up and running...");
});
server.listen(port, () => {
  console.log(`Server is started on port ${port}!`);
});
