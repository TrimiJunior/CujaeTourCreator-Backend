import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/filters/http-exception.filter';
import { TimeOutInterceptor } from './common/interceptor/timeout.interceptor';
import { json } from 'body-parser';
import { usersRouter } from './routes/users.router';
import { UserController, userController } from './user/user.controller';
// const passport = require('passport');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
// const moment = require('moment-timezone');
const dayjs = require('dayjs');
const helmet = require('helmet');
const hpp = require('hpp');
const csrf = require('csurf');
// import { JwtMiddleware } from './auth/strategies/token.check';

///////DEPS FROM EXPRESS-BRUTE///////////
// const session = require('express-session');
// const MongoStore = require('connect-mongo')(session);
// const MongoDb = require('mongodb');
// const bruteforce = require('express-brute');
// const MongoBrute = require('express-brute-mongo');
//////////////////////////////////////////////////

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  const option = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 200,
    credentials: true,
  };
  // app.enableCors(option);

  app.use(require('express-status-monitor')());

  // app.use(JwtMiddleware);

  // Enable All CORS Requests
  app.use(cors());

  app.use(json({ limit: '50mb' /* edit this */ }));
  app.use(express.static('public'));

  app.use(bodyParser.json({ type: 'application/*+json' }));

  // app.use(checkRoles('Admin'));
  // app.get('/', checkRoles('Admin'), (req, res) => {

  // });

  ///////////////////
  //   const bruteStore = new ExpressBrute.MemoryStore();
  //   const failCallback = function (req, res, next, nextValidRequestDate) {
  //     res.status(429).json({
  //       message: `You've made too many failed attempts in a short period of time, please try again ${nextValidRequestDate.toISOString()}`,
  //     });
  //   };
  //   const handleStoreError = function (error) {
  //     throw {
  //       message: error.message,
  //       parent: error.parent,
  //     };
  //   };
  //   const bruteforceExpress = new ExpressBrute(bruteStore, {
  //     freeRetries: 3,
  //     minWait: 5000,
  //     maxWait: 15 * 60 * 1000,
  //     failCallback,
  //     handleStoreError,
  //   });
  // app.use(bruteforceExpress.prevent);
  ////////////////////

  // app.use(session({ secret: 'anything' }));
  // app.use(passport.initialize());
  // app.use(passport.session());

  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalInterceptors(new TimeOutInterceptor());

  const options = new DocumentBuilder()
    .setTitle('CujaeTourCreator API')
    .setDescription('Scheduled TourCreator App')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  ///////////IMPL EXPRESE-BRUTE//////////////
  // const store = new MongoStore({
  //   url: 'mongodb://localhost:27017/sessions',
  //   collectionName: 'sessions',
  //   mongoOptions: {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //   },
  // });

  // app.use(
  //   session({
  //     secret: 'cookiessignsecret',
  //     resave: false,
  //     saveUninitialized: true,
  //     store,
  //   })
  // );

  // const MongoClient = MongoDb.MongoClient;
  // const uri = 'mongodb://localhost:27017/superflights';

  // const bruteStore = new MongoBrute({
  //   MongoClient,
  //   uri,
  //   collectionName: 'bruteforce',
  // });

  // const failCallback = function (req, res, next, nextValidRequestDate) {
  //   res.status(429).json({
  //     message: `Too many requests, please try again ${nextValidRequestDate.toUTCString()}.`,
  //   });
  // };

  // const handleStoreError = function (error) {
  //   console.error(error);
  //   throw {
  //     message: error.message,
  //     parent: error.parent,
  //   };
  // };

  // const bruteforceExpress = new bruteforce(bruteStore, {
  //   freeRetries: 3,
  //   minWait: 5000,
  //   maxWait: 15 * 60 * 1000,
  //   failCallback,
  //   handleStoreError,
  // });
  ////////////////////////////////////

  const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minuto
    max: 10000, // límite de solicitudes
    message:
      'Has excedido el límite de solicitudes. Intenta de nuevo en un minuto',
  });

  app.use(limiter);

  // Registrar solicitudes en access.log
  const fs = require('fs');
  const path = require('path');
  const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'access.log'),
    { flags: 'a' },
  );

  const utc = require('dayjs/plugin/utc');
  const timezone = require('dayjs/plugin/timezone');
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.tz.setDefault('America/Puerto_Rico');

  // Usar middleware de Morgan
  app.use(
    morgan('combined', {
      stream: accessLogStream,
      // Configurar el formato de fecha y hora con dayjs
      format:
        ':date[YYYY-MM-DDTHH:mm:ss.SSSZ] :method :url :status :response-time ms',
    }),
  );

  // Usar middleware de Morgan
  // app.use(morgan('combined', { stream: accessLogStream }));

  // Usar middleware de Helmet
  app.use(helmet());

  // Usar middleware de HPP
  app.use(hpp());

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  // Usar middleware de CSRF
  // app.use(csrf());

  // var store = new ExpressBrute.MemoryStore();
  // var bruteforce = new ExpressBrute(store, {
  //   freeRetries: 2,
  //   lifetime: 60 //1 min //1 hour(60*60)
  // });

  // app.use('/api/v1/user',
  // bruteforce.prevent,
  // async (req, res, next) => {
  //   try {
  //     const users = await req.body.findAll().toPromise();
  //     res.json(users);
  //   } catch (err) {
  //     res.status(500).json({ error: 'Error al obtener usuarios' });
  //   }

  // });
  //   try {
  //     const users = await userController.findAll().toPromise;
  //     res.json(users);
  //   } catch (err) {
  //     res.status(500).json({ error: 'Error al obtener usuarios' });
  //   }
  // });
  // function (req, res, next){
  //   res.send('Success!!');
  // })

  // Resto de la configuración del API gateway
  // ...

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('/api/docs', app, document, {
    swaggerOptions: {
      filter: true,
    },
  });

  await app.listen(process.env.PORT || 5000);
}
bootstrap();
