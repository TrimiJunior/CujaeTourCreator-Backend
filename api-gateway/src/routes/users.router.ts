import { ConfigService } from '@nestjs/config';
import { Router } from 'express';
import { ClientProxyCujaeTourCreator } from 'src/common/proxy/client-proxy';
import { UserController } from 'src/user/user.controller';

const usersRouter = Router();
const config = new ConfigService();
const clientProxy = new ClientProxyCujaeTourCreator(config); // Crear una instancia de ClientProxyCujaeTourCreator

const userController = new UserController(clientProxy); // Crear una instancia de UserController y pasar la instancia de ClientProxyCujaeTourCreator como argumento

// Inyecta UsersController para manejar las solicitudes HTTP
usersRouter.get('/', userController.findAll);
usersRouter.get('/:id', userController.findOne);
usersRouter.post('/', userController.create);
usersRouter.put('/:id', userController.update.bind(userController));
usersRouter.delete('/:id', userController.delete);

export { usersRouter };
