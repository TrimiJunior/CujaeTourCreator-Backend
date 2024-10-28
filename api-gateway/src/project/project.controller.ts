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

const path = require('path');
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ProjectMSG } from 'src/common/constants';
import { IProject } from 'src/common/interfaces/project.interface';
import { ClientProxyCujaeTourCreator } from 'src/common/proxy/client-proxy';
import { ProjectDTO } from './dto/project.dto';

@ApiTags('Projects')
//@UseGuards(JwtAuthGuard)
@Controller('api/v1/projects')
export class ProjectController {
  constructor(private readonly clientProxy: ClientProxyCujaeTourCreator) {}
  private _clientProxyProject = this.clientProxy.clientProxyProjects();

  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/uploads/cover',
        filename: function (req, file, cb) {
          cb(null, Date.now() + '_' + file.originalname);
        },
      }),
    }),
  )
  @Post()
  create(
    @Body() projectDTO: ProjectDTO,
    @UploadedFile() file: Express.Multer.File,
  ): Observable<IProject> {
    const __dirname = path.resolve();
    const pathImage = 'uploads/cover/' + file.filename;
    console.log(file.path);
    projectDTO = { ...projectDTO, img: pathImage };
    return this._clientProxyProject.send(ProjectMSG.CREATE, projectDTO);
  }
  // @Get(':userId')
  // findAll(@Param('userId')userId:string): Observable<IProject[]>{
  //     return this._clientProxyProject.send(ProjectMSG.FIND_ALL, userId);
  // }
  @Get()
  findAll(): Observable<IProject[]> {
    return this._clientProxyProject.send(ProjectMSG.FIND_ALL, '');
  }
  @Get(':userId')
  findAllByUser(@Param('userId') userId: string): Observable<IProject[]> {
    return this._clientProxyProject.send(ProjectMSG.FIND_ALL_BY_USER, userId);
  }

  @Get('/unvalidated/unvalidated/')
  findAllUnvalidated(
    @Param('moderator') moderator: string,
  ): Observable<IProject[]> {
    return this._clientProxyProject.send(ProjectMSG.FIND_UNVALIDED, '');
  }
  @Get('/validated/validated/')
  @UseGuards(JwtAuthGuard)
  findAllValidated(
    @Param('moderator') moderator: string,
  ): Observable<IProject[]> {
    return this._clientProxyProject.send(ProjectMSG.FIND_VALIDED, '');
  }

  @Get('/byId/:id')
  findOne(@Param('id') id: string): Observable<IProject> {
    return this._clientProxyProject.send(ProjectMSG.FIND_ONE, id);
  }
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() projectDTO: ProjectDTO,
  ): Observable<IProject> {
    return this._clientProxyProject.send(ProjectMSG.UPDATE, {
      id,
      projectDTO: projectDTO,
    });
  }
  @Delete(':id')
  delete(@Param('id') id: string): Observable<any> {
    return this._clientProxyProject.send(ProjectMSG.DELETE, id);
  }

  @Put('/add-likes/:id')
  addLikes(
    @Param('id') id: string,
    @Body('likes') likes: string,
  ): Observable<IProject> {
    return this._clientProxyProject.send(ProjectMSG.ADD_LIKES, { id, likes });
  }

  @Put('/delete-likes/:id')
  removeLikes(
    @Param('id') id: string,
    @Body('likes') likes: string,
  ): Observable<IProject> {
    return this._clientProxyProject.send(ProjectMSG.REMOVE_LIKES, {
      id,
      likes,
    });
  }

  @Put('/validate-project/:id')
  validateProject(@Param('id') id: string): Observable<IProject> {
    return this._clientProxyProject.send(ProjectMSG.VALIDATE_PROJECT, id);
  }

  @Put('/unvalidate-project/:id')
  unvalidateProject(@Param('id') id: string): Observable<IProject> {
    return this._clientProxyProject.send(ProjectMSG.UNVALIDATE_PROJECT, id);
  }

  @Put('/for-revision/:id')
  forRevision(@Param('id') id: string): Observable<IProject> {
    return this._clientProxyProject.send(ProjectMSG.FOR_REVISION, id);
  }

  @Put('/to-neutral/:id')
  toNeutral(@Param('id') id: string): Observable<IProject> {
    return this._clientProxyProject.send(ProjectMSG.TO_NEUTRAL, id);
  }

  @Put('/addComment/:id')
  addComment(
    @Param('id') id: string,
    @Body() comment: { user: string; chat: string },
  ): Observable<IProject> {
    return this._clientProxyProject.send(ProjectMSG.ADD_COMMENT, {
      id,
      comment,
    });
  }

  @Put('/delete-Comment/:id')
  deleteComment(
    @Param('id') projectId: string,
    @Body('commentId') commentId: string,
  ): Observable<IProject> {
    return this._clientProxyProject.send(ProjectMSG.REMOVE_COMMENT, {
      projectId,
      commentId,
    });
  }

  @Get('/filterByStatus/:id')
  filterByStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ): Observable<IProject> {
    return this._clientProxyProject.send(ProjectMSG.FILTER_BY_STATUS, {
      id,
      status,
    });
  }

  //new
  @Put('/change/username/')
  changeUsername(@Body() body: any): Observable<IProject> {
    const { oldusername, username } = body;
    return this._clientProxyProject.send(ProjectMSG.CHANGE_USERNAME_PROJECT, {
      oldusername,
      username,
    });
  }

  @Put('/edit-comment/:projectId')
  editComment(
    @Param('projectId') projectId: string,
    @Body('commentId') commentId: string,
    @Body('comment') comment: string,
  ): Observable<IProject> {
    return this._clientProxyProject.send(ProjectMSG.EDIT_COMMENT, {
      projectId,
      commentId,
      comment,
    });
  }

  @Put('/addRating/:id')
  addRating(
    @Param('id') id: string,
    @Body() rating: { user: string; rate: number },
  ): Observable<IProject> {
    return this._clientProxyProject.send(ProjectMSG.ADD_RATE, {
      id,
      rating,
    });
  }

  @Put('/delete-rating/:id')
  deleteRating(
    @Param('id') projectId: string,
    @Body('rateId') rateId: string,
  ): Observable<IProject> {
    return this._clientProxyProject.send(ProjectMSG.DELETE_RATE, {
      projectId,
      rateId,
    });
  }

  @Put('/edit-rating/:projectId')
  editRating(
    @Param('projectId') projectId: string,
    @Body('rateId') rateId: string,
    @Body('rate') rate: number,
  ): Observable<IProject> {
    return this._clientProxyProject.send(ProjectMSG.EDIT_RATE, {
      projectId,
      rateId,
      rate,
    });
  }
}
