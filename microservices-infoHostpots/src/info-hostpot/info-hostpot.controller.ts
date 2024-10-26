import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {InfoHostpotMSG } from 'src/common/constants';
import {InfoHostpotDTO } from './dto/info-hostpot.dto';
import { InfoHostpotService } from './info-hostpot.service';

@Controller()
export class InfoHostpotController {
    constructor(private readonly infoHostpotService: InfoHostpotService){}
    @MessagePattern(InfoHostpotMSG.CREATE)
    create(@Payload() infoHostpotDTO: InfoHostpotDTO){
      return this.infoHostpotService.create(infoHostpotDTO);  
    } 
    @MessagePattern(InfoHostpotMSG.FIND_ALL)
    findAll(){
        return this.infoHostpotService.findAll();
    }
    @MessagePattern(InfoHostpotMSG.FIND_ONE)
    findOne(@Payload()id:string){
        return this.infoHostpotService.findOne(id);
    }
    @MessagePattern(InfoHostpotMSG.UPDATE)
    update(@Payload() payload:any){
        return this.infoHostpotService.update(payload.id,payload.infoHostpotDTO);

    }
    @MessagePattern(InfoHostpotMSG.DELETE)
    delete(@Payload() id:string){
        return this.infoHostpotService.delete(id);

    }
    
}
