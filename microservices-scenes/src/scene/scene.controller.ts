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
import { SceneMSG } from 'src/common/constants';
import { SceneDTO } from './dto/scene.dto';
import { SceneService } from './scene.service';

@Controller()
export class SceneController {
  constructor(private readonly sceneService: SceneService) {}
  @MessagePattern(SceneMSG.CREATE)
  create(@Payload() sceneDTO: SceneDTO) {
    return this.sceneService.create(sceneDTO);
  }
  @MessagePattern(SceneMSG.FIND_ALL)
  findAll() {
    return this.sceneService.findAll();
  }
  @MessagePattern(SceneMSG.FIND_ONE)
  findOne(@Payload() id: string) {
    return this.sceneService.findOne(id);
  }
  @MessagePattern(SceneMSG.UPDATE)
  update(@Payload() payload: any) {
    return this.sceneService.update(payload.id, payload.sceneDTO);
  }
  @MessagePattern(SceneMSG.DELETE)
  delete(@Payload() id: string) {
    return this.sceneService.delete(id);
  }
}
