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
import { ProjectMSG } from 'src/common/constants';
import { ProjectDTO } from './dto/project.dto';
import { ProjectService } from './project.service';

@Controller()
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}
  @MessagePattern(ProjectMSG.CREATE)
  create(@Payload() projectDTO: ProjectDTO) {
    return this.projectService.create(projectDTO);
  }
  // @MessagePattern(ProjectMSG.FIND_ALL)
  // findAll(@Payload()userId:string){
  //     return this.projectService.findAll(userId);
  // }
  @MessagePattern(ProjectMSG.FIND_ALL)
  findAll(@Payload() userId: string) {
    return this.projectService.findAll();
  }
  @MessagePattern(ProjectMSG.FIND_UNVALIDED)
  findUnvalided() {
    return this.projectService.findUnvalided();
  }
  @MessagePattern(ProjectMSG.FIND_VALIDED)
  findValided() {
    return this.projectService.findValided();
  }

  @MessagePattern(ProjectMSG.FIND_ALL_BY_USER)
  findAllByUser(@Payload() userId: string) {
    return this.projectService.findAllByUser(userId);
  }
  @MessagePattern(ProjectMSG.FIND_ONE)
  findOne(@Payload() id: string) {
    return this.projectService.findOne(id);
  }
  @MessagePattern(ProjectMSG.UPDATE)
  update(@Payload() payload: any) {
    return this.projectService.update(payload.id, payload.projectDTO);
  }
  @MessagePattern(ProjectMSG.DELETE)
  delete(@Payload() id: string) {
    return this.projectService.delete(id);
  }

  @MessagePattern(ProjectMSG.ADD_LIKES)
  addLikes(@Payload() data: { id: string; likes: string }): Promise<any> {
    const { id, likes } = data;
    return this.projectService.addLikes(id, likes);
  }

  @MessagePattern(ProjectMSG.REMOVE_LIKES)
  removeLikes(@Payload() data: { id: string; likes: string }): Promise<any> {
    const { id, likes } = data;
    return this.projectService.removeLikes(id, likes);
  }

  @MessagePattern(ProjectMSG.VALIDATE_PROJECT)
  validateProject(@Payload() id: string) {
    return this.projectService.validateProject(id);
  }

  @MessagePattern(ProjectMSG.UNVALIDATE_PROJECT)
  unvalidateProject(@Payload() id: string) {
    return this.projectService.unvalidateProject(id);
  }

  @MessagePattern(ProjectMSG.FOR_REVISION)
  forRevision(@Payload() id: string) {
    return this.projectService.forRevision(id);
  }

  @MessagePattern(ProjectMSG.TO_NEUTRAL)
  toNeutral(@Payload() id: string) {
    return this.projectService.toNeutral(id);
  }

  @MessagePattern(ProjectMSG.ADD_COMMENT)
  addComment(
    @Payload() payload: { id: string; comment: { user: string; chat: string } },
  ) {
    return this.projectService.addComment(payload.id, payload.comment);
  }

  @MessagePattern(ProjectMSG.REMOVE_COMMENT)
  removeComment(@Payload() data: { projectId: string; commentId: string }) {
    const { projectId, commentId } = data;
    return this.projectService.deleteComment(projectId, commentId);
  }

  @MessagePattern(ProjectMSG.FILTER_BY_STATUS)
  filterByStatus(@Payload() data: { userId: string; status: string }) {
    const { userId, status } = data;
    return this.projectService.filterByStatus(userId, status);
  }

  //new
  @MessagePattern(ProjectMSG.CHANGE_USERNAME_PROJECT)
  changeUsername(@Payload() data: { oldusername: string; username: string }) {
    const { oldusername, username } = data;
    return this.projectService.changeUsername(oldusername, username);
  }

  @MessagePattern(ProjectMSG.EDIT_COMMENT)
  editComment(
    @Payload() data: { projectId: string; commentId: string; comment: string },
  ) {
    const { projectId, commentId, comment } = data;
    return this.projectService.editComment(projectId, commentId, comment);
  }

  @MessagePattern(ProjectMSG.ADD_RATE)
  addRating(
    @Payload() payload: { id: string; rating: { user: string; rate: number } },
  ) {
    return this.projectService.addRating(payload.id, payload.rating);
  }

  @MessagePattern(ProjectMSG.DELETE_RATE)
  removeRating(@Payload() data: { projectId: string; rateId: string }) {
    const { projectId, rateId } = data;
    return this.projectService.deleteRating(projectId, rateId);
  }

  @MessagePattern(ProjectMSG.EDIT_RATE)
  editRating(
    @Payload() data: { projectId: string; rateId: string; rate: number },
  ) {
    const { projectId, rateId, rate } = data;
    return this.projectService.editRating(projectId, rateId, rate);
  }
}
