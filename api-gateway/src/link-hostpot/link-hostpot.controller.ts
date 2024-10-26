import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { LinkHostpotMSG } from 'src/common/constants';
import { ILinkHostpot } from 'src/common/interfaces/link-hostpot.interface';
import { ClientProxyCujaeTourCreator } from 'src/common/proxy/client-proxy';
import { LinkHostpotDTO } from './dto/link-hostpot.dto';


@ApiTags('Link-hostpots')
//@UseGuards(JwtAuthGuard)
@Controller('api/v1/link-hostpot')
export class LinkHostpotController {
    constructor(private readonly clientProxy: ClientProxyCujaeTourCreator) {}
  private _clientProxyLinkHostpot = this.clientProxy.clientProxyLinkHostPots();

  @Post()
    create(@Body() linkHostpotDTO: LinkHostpotDTO): Observable<ILinkHostpot>{
      return this._clientProxyLinkHostpot.send(LinkHostpotMSG.CREATE, linkHostpotDTO);  
    } 
    @Get()
    findAll(): Observable<ILinkHostpot[]>{
        return this._clientProxyLinkHostpot.send(LinkHostpotMSG.FIND_ALL, '');
    }
    @Get(':id')
    findOne(@Param('id')id:string):Observable<ILinkHostpot>{
        return this._clientProxyLinkHostpot.send(LinkHostpotMSG.FIND_ONE, id);
    }
    @Put(':id')
    update(@Param('id')id:string, @Body() linkHostpotDTO:LinkHostpotDTO): Observable<ILinkHostpot>{
        return this._clientProxyLinkHostpot.send(LinkHostpotMSG.UPDATE,{id,linkHostpotDTO: linkHostpotDTO});

    }
    @Delete(':id')
    delete(@Param('id') id:string):Observable<any>{
        return this._clientProxyLinkHostpot.send(LinkHostpotMSG.DELETE,id);

    }
}
