import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  SetMetadata,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
// import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserMSG } from 'src/common/constants';
import { IUser } from 'src/common/interfaces/user.interface';
import { ClientProxyCujaeTourCreator } from 'src/common/proxy/client-proxy';
import { UserDTO } from './dto/user.dto';
import { RolesGuard } from 'src/auth/guards/roles-guard';
import * as fs from 'fs';
import { sendCodeEmail } from '../common/sendMail/forget-password.mail';
import { generateVerificationCode } from '../common/sendMail/code.gen';
import { sendRejectEmail } from '../common/sendMail/unaccepted-tour';
import { sendAcceptEmail } from '../common/sendMail/accepted-tour';
import { isEmpty } from 'class-validator';
import { newProjectMail } from '../common/sendMail/new-project';
import { Payload } from '@nestjs/microservices';

@ApiTags('Users')
// @UseGuards(JwtAuthGuard)
@Controller('api/v1/user')
export class UserController {
  constructor(private readonly clientProxy: ClientProxyCujaeTourCreator) {}
  private _clientProxyUser = this.clientProxy.clientProxyUsers();

  @Post()
  create(@Body() userDTO: UserDTO): Observable<IUser> {
    return this._clientProxyUser.send(UserMSG.CREATE, userDTO);
  }

  // @SetMetadata('roles', ['admin'])
  // @UseGuards(RolesGuard)

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @SetMetadata('role', ['admin'])

  // @SetMetadata('roles', ['admin'])
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('role', ['admin'])
  findAll(): Observable<IUser[]> {
    console.log('User FindAll');
    return this._clientProxyUser.send(UserMSG.FIND_ALL, '');
  }
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string): Observable<IUser> {
    return this._clientProxyUser.send(UserMSG.FIND_ONE, id);
  }
  @Get('/name/:name')
  findByUserName(@Param('name') name: string): Observable<IUser> {
    return this._clientProxyUser.send(UserMSG.FIND_ONE, name);
  }
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() userDTO: UserDTO): Observable<IUser> {
    return this._clientProxyUser.send(UserMSG.UPDATE, { id, userDTO });
  }
  @Delete(':id')
  delete(@Param('id') id: string): Observable<any> {
    // this.deleteUser(id);
    return this._clientProxyUser.send(UserMSG.DELETE, id);
  }

  @Delete('/delete-user/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('role', ['admin'])
  deleteUsers(
    @Param('id') id: string,
    @Body('currentUser') currentUser: string,
  ): Observable<any> {
    return this._clientProxyUser.send(UserMSG.DELETE_USER, { id, currentUser });
  }

  //le quite el guard
  @Get('/email/:mail')
  findByEmail(@Param('mail') mail: string): Observable<IUser> {
    return this._clientProxyUser.send(UserMSG.FIND_BY_EMAIL, mail);
  }

  @Get('/password/:password')
  @UseGuards(JwtAuthGuard)
  findByPassword(@Param('password') password: string): Observable<IUser> {
    return this._clientProxyUser.send(UserMSG.FIND_BY_PW, password);
  }

  //le quite el guard
  @Put('/update-password/:id')
  updatePassword(
    @Param('id') id: string,
    @Body('password') password: string,
  ): Observable<any> {
    return this._clientProxyUser.send(UserMSG.UPDATE_PASSWORD, {
      id,
      password,
    });
  }

  @Put('/add-favorite/:id')
  addFavorite(
    @Param('id') id: string,
    @Body('favorites') favorites: string,
  ): Observable<IUser> {
    return this._clientProxyUser.send(UserMSG.ADD_FAVORITE, {
      id,
      projectId: favorites,
    });
  }

  @Put('/delete-favorite/:id')
  removeFavorite(
    @Param('id') id: string,
    @Body('favorites') favorites: string,
  ): Observable<IUser> {
    return this._clientProxyUser.send(UserMSG.REMOVE_FAVORITE, {
      id,
      projectId: favorites,
    });
  }

  @Post('/send-email/:mail')
  async sendCodeToEmail(@Param('mail') mail: string) {
    const code = generateVerificationCode();
    const emailed = await sendCodeEmail(mail, code);
    return code;
  }

  @Post('/send-rejectemail/:mail')
  sendRejectMail(@Param('mail') mail: string) {
    return sendRejectEmail(mail);
  }

  @Post('/send-acceptemail/:mail')
  sendAcceptEmail(@Param('mail') mail: string) {
    return sendAcceptEmail(mail);
  }

  @Post('/send-new-tour/:mail')
  sendEmailToModerator(@Param('mail') mail: string) {
    return newProjectMail(mail);
  }

  // @Put('/add-pervalidate/:id')
  // addProject(@Param('id') id: string, @Body('perValidate') projectId: string): Observable<IUser> {
  //     return this._clientProxyUser.send(UserMSG.ADD_PER_VALIDATE, {id, projectId: projectId });
  // }
  @Put('/add-pervalidate/send-project')
  addProject(@Body('perValidate') projectId: string): Observable<IUser> {
    return this._clientProxyUser.send(UserMSG.ADD_PER_VALIDATE, {
      projectId: projectId,
    });
  }

  @Put('/remove-pervalidate/:id')
  removeProject(
    @Param('id') id: string,
    @Body('perValidate') projectId: string,
  ): Observable<IUser> {
    return this._clientProxyUser.send(UserMSG.REMOVE_PER_VALIDATE, {
      id,
      projectId: projectId,
    });
  }

  @Put('/asign-role/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('role', ['admin'])
  asignRole(
    @Param('id') id: string,
    @Body('role') role: string,
  ): Observable<any> {
    return this._clientProxyUser.send(UserMSG.ASIGN_ROLE, {
      id,
      role,
    });
  }

  ////NEW
  // @Post('/accepted-project/:mail')
  // sendAcceptedMail(@Payload('email') email: string): Observable<any> {
  //   return this._clientProxyUser.send(UserMSG.SEND_ACCEPTED_MAIL, email);
  // }

  @Get('/check/mail/')
  checkMail(@Body('email') mail: string): Observable<IUser> {
    return this._clientProxyUser.send(UserMSG.CHECK_MAIL, mail);
  }

  @Get('/except-me/:id')
  findAllExceptMe(@Param('id') id: string): Observable<IUser> {
    return this._clientProxyUser.send(UserMSG.EXCEPT_ME, id);
  }

  @Get('/validatePassword/:id')
  validatePassword(
    @Param('id') id: string,
    @Body('password') password: string,
    ): Observable<IUser> {
    return this._clientProxyUser.send(UserMSG.VALID_PASSWORD, {
      id, 
      password,
    });
  }

 

  ///END OF NEW

  async deleteUser(id: string) {
    console.log('ID: ', id);

    const users = JSON.parse(
      fs
        .readFileSync(
          '/Users/jeankarlosantana/Documents/college/PP2/App/Backend/microservices-users/user.json',
        )
        .toString(),
    );
    console.log(users);

    const userIndex = users.findIndex((user: any) => user._id === id);
    console.log('UserIndex: ', userIndex);

    if (userIndex === -1) {
      throw new NotFoundException('No existe ese usuario');
    }

    const deletedUser = users.splice(userIndex, 1)[0];
    fs.writeFileSync(
      '/Users/jeankarlosantana/Documents/college/PP2/App/Backend/microservices-users/user.json',
      JSON.stringify(users, null, 2),
    );

    console.log('UserDeleted: ', deletedUser);
  }
}

//new
const config = new ConfigService();
const clientProxy = new ClientProxyCujaeTourCreator(config); // crea una instancia de ClientProxyCujaeTourCreator

export const userController = new UserController(clientProxy);
