import {
  BadRequestException,
  Body,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { unwatchFile } from 'fs';
import { isEmpty, materialize } from 'rxjs';
import { UserMSG } from 'src/common/constants';
import { ClientProxyCujaeTourCreator } from 'src/common/proxy/client-proxy';
import { UserDTO } from 'src/user/dto/user.dto';
const logger = require('../middlewares/logger.error');
import { sendEmail } from '../common/sendMail/send.mail';
import * as generatePassword from 'generate-password';
import { sendSignUpEmail } from '../common/sendMail/signup.mail';
import { generateVerificationCode } from '../common/sendMail/code.gen';
import * as fs from 'fs';
import * as zxcvbn from 'zxcvbn';
import { UserController } from 'src/user/user.controller';

// import { IUser } from '@microservices-users/src/common/interfaces/user.interface';

// import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  // private revokedTokens: Set<string> = new Set();
  private verificationCode: string | Promise<string>;
  private readonly tokens: string[] = [];
  constructor(
    private readonly clientProxy: ClientProxyCujaeTourCreator,
    private readonly jwtService: JwtService,
  ) {}
  private _clientProxyUser = this.clientProxy.clientProxyUsers();
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this._clientProxyUser
      .send(UserMSG.VALID_USER, {
        username, //email
        password,
      })
      .toPromise();
    if (user) return user;
    return null;
  }

  async getRoleFromToken(token: string): Promise<string> {
    const decodedToken = await this.jwtService.verifyAsync(token);
    return decodedToken.role;
  }

  async validateUsers(email: string): Promise<boolean> {
    try {
      const users = JSON.parse(
        fs
          .readFileSync(
            '/Users/jeankarlosantana/Documents/college/PP2/App/Backend/microservices-users/user.json',
          )
          .toString(),
      );
      const foundUser = users.find((user: any) => user.email === email);
      console.log('users: ', users);
      console.log('foundUser: ', foundUser);
      return !!foundUser;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    try {
      const users = JSON.parse(
        fs
          .readFileSync(
            '/Users/jeankarlosantana/Documents/college/PP2/App/Backend/microservices-users/user.json',
          )
          .toString(),
      );
      const foundUser = users.find((user: any) => user.password === password);
      console.log('users: ', users);
      console.log('foundUser: ', foundUser);
      return !!foundUser;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async sendVerificationCode(email: string) {
    this.verificationCode = await generateVerificationCode();
    sendSignUpEmail(email, this.verificationCode);
    console.log('Codigo de verificacion: ', this.verificationCode);
  }

  async verifyCode(code: string) {
    if (code === this.verificationCode) {
      return true;
    } else return false;
  }

  async generateAccessToken(email: string) {
    const payload = { email };
    return this.jwtService.signAsync(payload);
  }

  async preAuth(user: any) {
    const is = await this.verifyCode(user.code);
    if (is) {
      const tok = await this.generateAccessToken(user.email);
      this.tokens.push(tok);
      fs.writeFileSync('tokens.json', JSON.stringify(this.tokens));
      console.log('Token: ', tok);
    } else {
      logger.error(`El código de verificación es incorrecto`);
      throw new BadRequestException('El código de verificación es incorrecto.');
    }
  }

  async signIn(userBody: any) {
    console.log('userBody.email: ', userBody.email);
    console.log('userBody.pass: ', userBody.password);
    const user = await this._clientProxyUser
      .send(UserMSG.VALID_USER, userBody)
      .toPromise();

    console.log('requiest: ', user);

    if (user) {
      const payload = {
        username: user.username,
        email: user.email,
        role: user.role,
        sub: user._id,
      };
      const token = this.jwtService.sign(payload);
      const tokenUser = {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        password: user.password,
        role: user.role,
        favorites: user.favorites,
        perValidate: user.perValidate,
        token: token,
        refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
      };

      console.log('tokenUser: ', tokenUser);
      return tokenUser;
    } else {
      throw new Error('Usuario no encontrado');
    }
  }

  async refreshToken(user: any) {
    const payload = {
      id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role,
      favorites: user.favorites,
      perValidate: user.perValidate,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async signUp(userDTO: UserDTO) {
    // await sendEmail(userDTO.email, userDTO.username);
    const response = await this._clientProxyUser
      .send(UserMSG.CREATE, userDTO)
      .toPromise();
    console.log('response', response);
    await sendEmail(userDTO.email, userDTO.username);

    return response;
  }

  // async signOut(token: string) {
  //   // Aquí deberías tener lógica para verificar si el token está en la lista de revocados
  //   if (this.revokedTokens.has(token)) {
  //     throw new Error('Token revocado');
  //   }

  //   // Realizar cualquier otra lógica necesaria para cerrar sesión

  //   // Eliminar el token de la lista de tokens revocados
  //   this.revokedTokens.add(token);

  //   return { message: 'Logout successful' };
  // }

  // async logout(token: string){

  //   const index = this.tokens.indexOf(token);
  //   if (index !== -1) {
  //     this.tokens.splice(index, 1);
  //     fs.writeFileSync('tokens.json', JSON.stringify(this.tokens));
  //   }
  //   const data = fs.readFileSync('tokens.json');
  //   const tokencito = JSON.parse(data.toString());
  //   console.log('Tokens.json: ', tokencito);
  // }
}
