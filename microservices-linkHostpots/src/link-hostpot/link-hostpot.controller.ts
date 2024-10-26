import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LinkHostpotMSG } from 'src/common/constants';
import { LinkHostpotDTO } from './dto/link-hostpot.dto';
import { LinkHostpotService } from './link-hostpot.service';

@Controller()
export class LinkHostpotController {
    constructor(private readonly linkHostpotService: LinkHostpotService){}
    @MessagePattern(LinkHostpotMSG.CREATE)
    create(@Payload() linkHostpotDTO: LinkHostpotDTO){
      return this.linkHostpotService.create(linkHostpotDTO);  
    } 
    @MessagePattern(LinkHostpotMSG.FIND_ALL)
    findAll(){
        return this.linkHostpotService.findAll();
    }
    @MessagePattern(LinkHostpotMSG.FIND_ONE)
    findOne(@Payload()id:string){
        return this.linkHostpotService.findOne(id);
    }
    @MessagePattern(LinkHostpotMSG.UPDATE)
    update(@Payload() payload:any){
        return this.linkHostpotService.update(payload.id,payload.linkHostpotDTO);

    }
    @MessagePattern(LinkHostpotMSG.DELETE)
    delete(@Payload() id:string){
        return this.linkHostpotService.delete(id);

    }
    
}
