import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MapService } from './map.service';
import { MapMSG } from '../common/constants';
import { CreateMapDTO, UpdateMapDTO } from './dto/map.dto';
import { MarkerDTO, UpdateMarkerDTO } from './dto/marker.dto';

@Controller()
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @MessagePattern(MapMSG.CREATE)
  create(@Payload() dto: CreateMapDTO) {
    return this.mapService.create(dto);
  }

  @MessagePattern(MapMSG.FIND_BY_PROJECT)
  findByProject(@Payload() projectId: string) {
    return this.mapService.findByProject(projectId);
  }

  @MessagePattern(MapMSG.FIND_ONE)
  findOne(@Payload() id: string) {
    return this.mapService.findOne(id);
  }

  @MessagePattern(MapMSG.UPDATE)
  update(@Payload() payload: { id: string; dto: UpdateMapDTO }) {
    return this.mapService.update(payload.id, payload.dto);
  }

  @MessagePattern(MapMSG.DELETE)
  delete(@Payload() id: string) {
    return this.mapService.delete(id);
  }

  @MessagePattern(MapMSG.ADD_MARKER)
  addMarker(@Payload() payload: { mapId: string; marker: MarkerDTO }) {
    return this.mapService.addMarker(payload.mapId, payload.marker);
  }

  @MessagePattern(MapMSG.UPDATE_MARKER)
  updateMarker(
    @Payload() payload: { mapId: string; markerId: string; marker: UpdateMarkerDTO }
  ) {
    return this.mapService.updateMarker(payload.mapId, payload.markerId, payload.marker);
  }

  @MessagePattern(MapMSG.DELETE_MARKER)
  deleteMarker(@Payload() payload: { mapId: string; markerId: string }) {
    return this.mapService.deleteMarker(payload.mapId, payload.markerId);
  }
}
