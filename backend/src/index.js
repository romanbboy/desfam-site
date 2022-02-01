const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const history = require('connect-history-api-fallback');
require('dotenv').config({path: path.join(__dirname, '../.env')});

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const datebookRouter = require('./routes/datebook');
const invitationRouter = require('./routes/invitation');
const issueRouter = require('./routes/issue');
const notificationRouter = require('./routes/notification');

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors());

// routes
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/datebooks', datebookRouter);
app.use('/api/invitations', invitationRouter);
app.use('/api/issues', issueRouter);
app.use('/api/notifications', notificationRouter);

// Скачивать файлы, для прода работает
// p.s для дев качать так http://localhost:3000/files/.......
app.use('/files', express.static(path.join(__dirname, '../../files/')));

app.use(history());
app.use(express.static(path.join(__dirname, '../../frontend/dist/desfam/')));


async function start(){
  try{
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });

    // 10.0.0.135 - это ТОЛЬКО для DEV разработки на рабочем компе! Продумать и заменить, что бы везде пахало
    // Потом это все заменить для боя на нормальный https:// сайт с SSl сертификатом!
    app.listen(process.env.PORT, process.env.HOSTNAME,  () => {
      console.log('-----> ', `Server start on port ${process.env.BASE_URL}`);
    })
  } catch (e) {
    console.log('-----> ', e);
  }
}

start();
