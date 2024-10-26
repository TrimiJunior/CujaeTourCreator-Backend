import ExpressBrute from 'express-brute';
import * as MongoStore from 'express-brute-mongo';

const mongoStore = new MongoStore({
    url: 'mongodb://localhost:27017/sessions', // URL de tu base de datos MongoDB
    collectionName: 'bruteforce', // Nombre de la colección donde se almacenará la información sobre las peticiones
  });
  

  const bruteforce = new ExpressBrute(mongoStore, {
    freeRetries: 3, // Número de intentos gratuitos permitidos antes de comenzar a bloquear las solicitudes
    minWait: 5000, // Tiempo mínimo de espera entre intentos (en milisegundos)
    maxWait: 15 * 60 * 1000, // Tiempo máximo de espera entre intentos (en milisegundos)
    failCallback: (req, res, next, nextValidRequestDate) => {
      res.status(429).json({
        message: `Too many requests, please try again after ${nextValidRequestDate.toLocaleString()}`
      });
    },
    handleStoreError: (error) => {
      console.error(error);
      throw new Error('Could not connect to the session store');
    },
  });
  
  export { bruteforce} ;
