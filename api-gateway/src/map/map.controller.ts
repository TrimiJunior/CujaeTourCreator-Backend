import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Patch,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { ClientProxyCujaeTourCreator } from 'src/common/proxy/client-proxy';
import { MapMSG } from 'src/common/constants';
import { IMap } from 'src/common/interfaces/map.interface';
import { MapDTO } from './dto/map.dto';
import { MarkerDTO } from './dto/marker.dto';

@ApiTags('Maps')
@Controller('api/v1/maps')
export class MapController {
  constructor(private readonly clientProxy: ClientProxyCujaeTourCreator) {}
  private _clientProxyMaps = this.clientProxy.clientProxyMaps();

  @Post()
  create(@Body() dto: MapDTO): Observable<IMap> {
    return this._clientProxyMaps.send(MapMSG.CREATE, dto);
  }

  @Get('project/:projectId')
  findByProject(@Param('projectId') projectId: string): Observable<IMap[]> {
    return this._clientProxyMaps.send(MapMSG.FIND_BY_PROJECT, projectId);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<IMap> {
    return this._clientProxyMaps.send(MapMSG.FIND_ONE, id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: MapDTO): Observable<IMap> {
    return this._clientProxyMaps.send(MapMSG.UPDATE, { id, dto });
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<any> {
    return this._clientProxyMaps.send(MapMSG.DELETE, id);
  }

  @Patch(':mapId/markers')
  addMarker(
    @Param('mapId') mapId: string,
    @Body() marker: MarkerDTO,
  ): Observable<IMap> {
    return this._clientProxyMaps.send(MapMSG.ADD_MARKER, { mapId, marker });
  }

  @Patch(':mapId/markers/:markerId')
  updateMarker(
    @Param('mapId') mapId: string,
    @Param('markerId') markerId: string,
    @Body() marker: MarkerDTO,
  ): Observable<IMap> {
    return this._clientProxyMaps.send(MapMSG.UPDATE_MARKER, {
      mapId,
      markerId,
      marker,
    });
  }

  @Delete(':mapId/markers/:markerId')
  deleteMarker(
    @Param('mapId') mapId: string,
    @Param('markerId') markerId: string,
  ): Observable<IMap> {
    return this._clientProxyMaps.send(MapMSG.DELETE_MARKER, { mapId, markerId });
  }
}
