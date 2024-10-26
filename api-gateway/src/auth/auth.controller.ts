import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  Header,
  NotFoundException,
  NestMiddleware,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserDTO } from 'src/user/dto/user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshJwtGuard } from './guards/refresh-auth.guard';
// import { invalidTokens } from '../common/constants';
@ApiTags('Authentication')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signIn(@Req() req) {
    console.log(req.body.email);
    console.log(req.body.password);
    return await this.authService.signIn(req.body);
  }

  
  @Post('refresh/:username')
  @UseGuards(RefreshJwtGuard)
  async refreshToken(@Param() username: string) {
    return this.authService.refreshToken(username);
  }
  // @Post('signin')
  // async signIn(email: string, password: string) {
  //   return await this.authService.signIn(email, password);
  // }

  @Post('signup')
  async signUp(@Body() userDTO: UserDTO) {
    return await this.authService.signUp(userDTO);
  }

  @Post('presignin')
  async preAuth(@Req() req) {
    return await this.authService.preAuth(req.body);
  }

  // @Post('signout')
  // async signOut(@Body() { token }: { token: string }) {
  //   return await this.authService.signOut(token);
  // }

  //   @Post('logout')
  //   async logout(@Req() req): Promise<void> {
  //   const token = req.headers.authorization;
  //   console.log('Deleted token: ', token);

  //   this.authService.logout(token);
  //   return token;
  // }

  // @Post('/forgot-password')
  // async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
  //   const user = await this.userService.findByEmail(forgotPasswordDto.email);
  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }
  //   const resetPasswordToken = await this.authService.generateResetPasswordToken(user);
  //   await this.emailService.sendResetPasswordEmail(user, resetPasswordToken);
  //   return { message: 'Reset password email sent' };
  // }

  // @Post('logout')
  // async logout(@Req() req) {
  //   const authorizationHeader = req.headers.authorization;
  //   if (!authorizationHeader) {
  //     return { message: 'Authorization header not found' };
  //   }

  //   const [bearer, token] = authorizationHeader.split(' ');
  //   if (bearer !== 'Bearer' || !token) {
  //     return { message: 'Invalid authorization header format' };
  //   }

  //   invalidTokens.add(token);
  //   return { message: 'Logout successful' };
  // }

  // @Post('logout')
  // async logout(@Header() headers): Promise<{ message: string }> {
  //   if (!authorizationHeader) {
  //     return { message: 'Authorization header not found' };
  //   }

  //   const [bearer, token] = authorizationHeader.split(' ');
  //   if (bearer !== 'Bearer' || !token) {
  //     return { message: 'Invalid authorization header format' };
  //   }

  //   invalidTokens.add(token);
  //   return { message: 'Logout successful' };
  // }

  // @Post('logout')
  // async logout(@Req() req, @Header('authorization') authorization: string) {
  //   if (!authorization) {
  //     return { message: 'Authorization header not found' };
  //   }

  //   const [bearer, token] = authorization.split(' ');
  //   if (bearer !== 'Bearer' || !token) {
  //     return { message: 'Invalid authorization header format' };
  //   }

  //   invalidTokens.add(token);
  //   req.logOut();
  //   return { message: 'Logout successful' };
  // }

  // @Post('logout')
  // async logout(@Headers() headers) {
  //   const authorizationHeader = headers.authorization;
  //   if (!authorizationHeader) {
  //     return { message: 'Authorization header not found' };
  //   }

  //   const [bearer, token] = authorizationHeader.split(' ');
  //   if (bearer !== 'Bearer' || !token) {
  //     return { message: 'Invalid authorization header format' };
  //   }

  //   invalidTokens.add(token);
  //   return { message: 'Logout successful' };
  // }

  //   @Post('logout')
  // async logout(@Req() req) {
  //   const token = req.headers.authorization.split(' ')[1];
  //   invalidTokens.add(token);
  //   req.logOut();
  //   return ({ message: 'Logout successful' });
  // }

  //   @Post('logout')
  //   async logout(@Req() req) {
  //     console.log(req.body);
  //   req.logout();
  // }
  /*  @Get()
    findAll(): Observable<IPassenger[]>{
        return this._clientProxyPassenger.send(PassengerMSG.FIND_ALL, '');
    }
    @Get(':id')
    findOne(@Param('id')id:string):Observable<IPassenger>{
        return this._clientProxyPassenger.send(PassengerMSG.FIND_ONE, id);
    }
    @Put(':id')
    update(@Param('id')id:string, @Body() passengerDTO:PassengerDTO): Observable<IPassenger>{
        return this._clientProxyPassenger.send(PassengerMSG.UPDATE,{id,userDTO: passengerDTO});

    }
    @Delete(':id')
    delete(@Param('id') id:string):Observable<any>{
        return this._clientProxyPassenger.send(PassengerMSG.DELETE,id);

    }*/
}
