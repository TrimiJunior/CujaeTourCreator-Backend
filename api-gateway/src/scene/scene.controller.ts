import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors';
import { ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { SceneMSG } from 'src/common/constants';
import { IScene } from 'src/common/interfaces/scene.interface';
import { ClientProxyCujaeTourCreator } from 'src/common/proxy/client-proxy';
import { SceneDTO } from './dto/scene.dto';
const path = require('path');

@ApiTags('Scenes')
//@UseGuards(JwtAuthGuard)
@Controller('api/v1/scenes')
export class SceneController {
  constructor(private readonly clientProxy: ClientProxyCujaeTourCreator) {}
  private _clientProxyScene = this.clientProxy.clientProxyScenes();

  @UseInterceptors(
    FileInterceptor(
        'file',
        {
            storage: diskStorage({
                destination: './public/uploads/background',
                filename: function(req, file, cb){
                    cb(null,  Date.now()+ '_' +file.originalname);
                }
            })
        }
    )
)
  @Post()
  create(@Body() sceneDTO: SceneDTO,@UploadedFile() file: Express.Multer.File): Observable<IScene> {
    const __dirname = path.resolve();
    const pathImage = "http://localhost:5000/uploads/background/" + file.filename;
    sceneDTO={...sceneDTO, img:pathImage} 
    return this._clientProxyScene.send(SceneMSG.CREATE, sceneDTO);
  }
  @Get()
  findAll(): Observable<IScene[]> {
    return this._clientProxyScene.send(SceneMSG.FIND_ALL, '');
  }
  @Get(':id')
  findOne(@Param('id') id: string): Observable<IScene> {
    return this._clientProxyScene.send(SceneMSG.FIND_ONE, id);
  }
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() sceneDTO: SceneDTO,
  ): Observable<IScene> {
    return this._clientProxyScene.send(SceneMSG.UPDATE, {
      id,
      sceneDTO: sceneDTO,
    });
  }
  @Delete(':id')
  delete(@Param('id') id: string): Observable<any> {
    return this._clientProxyScene.send(SceneMSG.DELETE, id);
  }
}
