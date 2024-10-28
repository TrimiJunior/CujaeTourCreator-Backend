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
const path = require('path');
import { diskStorage } from 'multer';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { InfoHostpotMSG } from 'src/common/constants';
import { IInfoHostpot } from 'src/common/interfaces/info-hostpot.interface';
import { ClientProxyCujaeTourCreator } from 'src/common/proxy/client-proxy';
import { InfoHostpotDTO } from './dto/info-hostpot.dto';


@ApiTags('Info-hostpots')
//@UseGuards(JwtAuthGuard)
@Controller('api/v1/info-hostpot')
export class InfoHostpotController {
    constructor(private readonly clientProxy: ClientProxyCujaeTourCreator) {}
  private _clientProxyInfoHostpot = this.clientProxy.clientProxyInfoHostPots();

  /*@UseInterceptors(
    FileInterceptor(
        'file',
        {
            storage: diskStorage({
                destination: './public/uploads/infoHostpot',
                filename: function(req, file, cb){
                    cb(null,  Date.now()+ '_' +file.originalname);
                }
            })
        }
    )
)*/

  @Post()
  create(@Body() infoHostpotDTO: InfoHostpotDTO/*,@UploadedFile() file: Express.Multer.File*/): Observable<IInfoHostpot> {
    //const __dirname = path.resolve();
  //  const pathImage = "uploads/infoHostpot/" + file.filename;
 //   infoHostpotDTO={...infoHostpotDTO, img:pathImage} 
    return this._clientProxyInfoHostpot.send(InfoHostpotMSG.CREATE, infoHostpotDTO);  
  }

    @Get()
    findAll(): Observable<IInfoHostpot[]>{
        return this._clientProxyInfoHostpot.send(InfoHostpotMSG.FIND_ALL, '');
    }
    @Get(':id')
    findOne(@Param('id')id:string):Observable<IInfoHostpot>{
        return this._clientProxyInfoHostpot.send(InfoHostpotMSG.FIND_ONE, id);
    }
    @Put(':id')
    update(@Param('id')id:string, @Body() infoHostpotDTO:InfoHostpotDTO): Observable<IInfoHostpot>{
        return this._clientProxyInfoHostpot.send(InfoHostpotMSG.UPDATE,{id,infoHostpotDTO: infoHostpotDTO});

    }
    @Delete(':id')
    delete(@Param('id') id:string):Observable<any>{
        return this._clientProxyInfoHostpot.send(InfoHostpotMSG.DELETE,id);

    }
}
