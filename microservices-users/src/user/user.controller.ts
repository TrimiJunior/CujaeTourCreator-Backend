import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserMSG } from 'src/common/constants';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';
import { UserRole } from 'src/common/constants';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @MessagePattern(UserMSG.CREATE)
  create(@Payload() userDTO: UserDTO) {
    return this.userService.create(userDTO);
  }
  @MessagePattern(UserMSG.FIND_ALL)
  findAll() {
    return this.userService.findAll();
  }
  @MessagePattern(UserMSG.FIND_ONE)
  findOne(@Payload() id: string) {
    return this.userService.findOne(id);
  }
  @MessagePattern(UserMSG.FIND_ONE)
  findByName(@Payload() name: string) {
    return this.userService.findByName(name);
  }
  @MessagePattern(UserMSG.UPDATE)
  update(@Payload() payload: any) {
    return this.userService.update(payload.id, payload.userDTO);
  }
  @MessagePattern(UserMSG.DELETE)
  delete(@Payload() id: string) {
    return this.userService.delete(id);
  }

  @MessagePattern(UserMSG.FIND_BY_EMAIL)
  findByEmai(@Payload() mail: string) {
    return this.userService.findByUsername(mail);
  }

  @MessagePattern(UserMSG.FIND_BY_PW)
  findByPassword(@Payload() password: string) {
    return this.userService.findByPassword(password);
  }

  @MessagePattern(UserMSG.UPDATE_PASSWORD)
  updatePassword(
    @Payload() data: { id: string; password: string },
  ): Promise<any> {
    const { id, password } = data;
    return this.userService.updatePassword(id, password);
  }

  @MessagePattern(UserMSG.ADD_FAVORITE)
  addFavorite(
    @Payload() data: { id: string; projectId: string },
  ): Promise<any> {
    const { id, projectId } = data;
    return this.userService.addFavorite(id, projectId);
  }

  @MessagePattern(UserMSG.REMOVE_FAVORITE)
  removeFavorite(
    @Payload() data: { id: string; projectId: string },
  ): Promise<any> {
    const { id, projectId } = data;
    return this.userService.removeFavorite(id, projectId);
  }

  @MessagePattern(UserMSG.ADD_PER_VALIDATE)
  addProject(@Payload() data: { projectId: string }): Promise<any> {
    const { projectId } = data;
    return this.userService.addProject(projectId);
  }
  @MessagePattern(UserMSG.REMOVE_PER_VALIDATE)
  removeProject(
    @Payload() data: { id: string; projectId: string },
  ): Promise<any> {
    const { id, projectId } = data;
    return this.userService.removeProject(id, projectId);
  }

  @MessagePattern(UserMSG.ASIGN_ROLE)
  asignRole(@Payload() data: { id: string; role: UserRole }): Promise<any> {
    const { id, role } = data;
    return this.userService.asignRole(id, role);
  }

  @MessagePattern(UserMSG.DELETE_USER)
  deleteUser(@Payload() data: { id: string; currentUser: string }) {
    const { id, currentUser } = data;
    return this.userService.deleteUser(id, currentUser);
  }

  ////new
  // @MessagePattern(UserMSG.SEND_ACCEPTED_MAIL)
  // sendAcceptedMail(@Payload() data: { email: string }) {
  //   const { email } = data;
  //   return this.userService.sendAcceptedMail(email);
  // }

  @MessagePattern(UserMSG.CHECK_MAIL)
  checkMail(@Payload() email: string) {
    return this.userService.checkMail(email);
  }

  @MessagePattern(UserMSG.EXCEPT_ME)
  findAllExceptMe(@Payload() id: string) {
    return this.userService.findAllExceptMe(id);
  }

  @MessagePattern(UserMSG.VALID_USER)
  async validateUserSignIn(
    @Payload() data: { email: string; password: string },
  ) {
    const { email, password } = data;
    return this.userService.validateUser(email, password);
  }

  @MessagePattern(UserMSG.VALID_PASSWORD)
  async validatePassword(@Payload() data: { id: string; password: string }): Promise<any> {
    const { id, password } = data;
    return this.userService.validatePassword(id, password);
  }

  ///end of new

  // @MessagePattern(UserMSG.SEND_CODE)
  // sendCodeToEmail(@Payload() mail:string){

  // }

  /*ES FUNCION SE ENCARGA DE VALIDAR A LOS USUARIOS
    ATENDIENDO A SU USERNAME Y PASSWORD*/
  //este era el bueno
  // @MessagePattern(UserMSG.VALID_USER)
  // async validateUser (@Payload () payload){
  //     const user = await this.userService.findByEmail(payload.email);
  //     const isValidPassword = await this.userService.checkPassword(
  //         payload.password,
  //         user.password,
  //     );
  //     if(user && isValidPassword)
  //     {
  //         return user;
  //     }

  //     return null;

  // }
  // @MessagePattern(UserMSG.VALID_USER)
  // async validateUser(@Payload() payload) {
  //   console.log(payload);
  //   const user = await this.userService.findByEmail(payload.email);
  //   const isValidPassword = await this.userService.findByPassword(
  //     payload.password,
  //   );
  //   if (user && isValidPassword) {
  //     return user;
  //   }

  //   return null;
  // }

  // @MessagePattern(UserMSG.VALID_USERR)
  // async validateUserr ( email: string, password: string){
  //     const user = await this.userService.findByEmail(email);
  //     console.log('emailyti: ', user);
  //     const isValidPassword = await this.userService.checkPassword(
  //         password,
  //         user.password,
  //     );
  //        console.log('paswiro: ', isValidPassword);
  //     if(user && isValidPassword)
  //     {
  //         return user;
  //     }

  //     return null;

  // }
}
