import { HttpStatus, Injectable } from '@nestjs/common';
import { IProject } from 'src/common/interfaces/project.interface';
import { ProjectDTO } from './dto/project.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { PROJECT } from 'src/common/models/models';
import { Model } from 'mongoose';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(PROJECT.name) private readonly model: Model<IProject>,
  ) {}

  async create(projectDTO: ProjectDTO): Promise<IProject> {
    const newProject = new this.model(projectDTO);
    return await newProject.save();
  }
  // async findAll(userId: string): Promise<IProject[]> {
  //   return await this.model.find({userId});
  // }
  async findAll(): Promise<IProject[]> {
    return await this.model.find();
  }

  async findAllByUser(userId: string): Promise<IProject[]> {
    return await this.model.find({ userId });
  }
  async findOne(id: string): Promise<IProject> {
    return await this.model.findById(id);
  }
  async update(id: string, projectDTO: ProjectDTO): Promise<IProject> {
    return await this.model.findByIdAndUpdate(id, projectDTO, { new: true });
  }
  async delete(id: string) {
    await this.model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, msg: 'Deleted' };
  }

  async addLikes(id: string, likes: string): Promise<any> {
    const project = await this.model.findOne({ _id: id });
    if (!project) {
      return { message: 'Proyecto no encontrado' };
    }
    const isLiked = project.likes.includes(likes);
    if (isLiked) {
      return { message: 'Ya existe el like' };
    }
    project.likes.push(likes);
    const updatedProject = await project.save();
    return updatedProject;
  }

  async removeLikes(id: string, likes: string): Promise<any> {
    const oldProject = await this.model.findOne({ _id: id });
    try {
      if (!oldProject) {
        return { message: 'Proyecto no encontrado' };
      }
      oldProject.likes = oldProject.likes.filter((like) => like !== likes);
      const updatedProject = await oldProject.save();
      return updatedProject;
    } catch (error) {
      throw new Error(`Error al eliminar like: ${error}`);
    }
  }

  async validateProject(id: string): Promise<IProject> {
    try {
      const oldProject = await this.model.findOne({ _id: id });
      if (!oldProject) {
        return null;
      }
      oldProject.currentState = 'aprobado'; //agregado
      oldProject.isValid = true;
      const updatedProject = await oldProject.save();
      return updatedProject;
    } catch (error) {
      throw new Error(`Error al validar projecto: ${error}`);
    }
  }

  async unvalidateProject(id: string): Promise<IProject> {
    try {
      const oldProject = await this.model.findOne({ _id: id });
      if (!oldProject) {
        return null;
      }
      oldProject.currentState = 'desaprobado'; //agregado
      const updatedProject = await oldProject.save();
      return updatedProject;
    } catch (error) {
      throw new Error(`Error al invalidar projecto: ${error}`);
    }
  }

  async forRevision(id: string): Promise<IProject> {
    try {
      const oldProject = await this.model.findOne({ _id: id });
      if (!oldProject) {
        return null;
      }
      oldProject.currentState = 'revision'; //agregado
      const updatedProject = await oldProject.save();
      return updatedProject;
    } catch (error) {
      throw new Error(`Error al invalidar projecto: ${error}`);
    }
  }

  async toNeutral(id: string): Promise<IProject> {
    try {
      const oldProject = await this.model.findOne({ _id: id });
      if (!oldProject) {
        return null;
      }
      oldProject.currentState = 'neutro'; //agregado
      oldProject.isValid = false;
      const updatedProject = await oldProject.save();
      return updatedProject;
    } catch (error) {
      throw new Error(`Error al invalidar projecto: ${error}`);
    }
  }

  async findUnvalided(): Promise<any[]> {
    const projects = await this.findAll();
    const unvalid = projects.filter((project) => project.isValid === false);
    return unvalid;
  }
  async findValided(): Promise<any[]> {
    const projects = await this.findAll();
    const unvalid = projects.filter((project) => project.isValid === true);
    return unvalid;
  }

  async findUnvalidedByUser(id: string): Promise<any[]> {
    const projects = await this.findUnvalided();
    const unvalid = projects.filter((project) => project.isValid === id);
    return unvalid;
  }

  async addComment(
    id: string,
    comment: { user: string; chat: string },
  ): Promise<IProject> {
    try {
      const project = await this.model.findOne({ _id: id });

      if (!project) {
        return null;
      }

      // Asegúrate de que el campo "comments" exista, si no, inicialízalo como un array vacío
      if (!project.comments) {
        project.comments = [];
      }

      // Agrega el nuevo comentario al array de comentarios
      project.comments.push(comment);

      // Guarda el proyecto actualizado
      const updatedProject = await project.save();

      return updatedProject;
    } catch (error) {
      throw new Error(`Error al agregar comentario al proyecto: ${error}`);
    }
  }

  async deleteComment(projectId: string, commentId: string): Promise<IProject> {
    try {
      const project = await this.model.findOne({ _id: projectId });

      if (!project) {
        return null;
      }

      // Filtra los comentarios, manteniendo solo aquellos que no coincidan con el ID del comentario a eliminar
      project.comments = project.comments.filter(
        (comment: any) => comment._id.toString() !== commentId,
      );

      // Guarda el proyecto actualizado
      const updatedProject = await project.save();

      return updatedProject;
    } catch (error) {
      throw new Error(`Error al eliminar comentario del proyecto: ${error}`);
    }
  }

  async editComment(
    projectId: string,
    commentId: string,
    comment: string,
  ): Promise<IProject> {
    try {
      const updatedProject = await this.model.findOneAndUpdate(
        { _id: projectId, 'comments._id': commentId },
        { $set: { 'comments.$.chat': comment } },
        { new: true },
      );

      const projectWithUpdatedComments = await this.model.findOne({
        _id: projectId,
      });

      return projectWithUpdatedComments;

      // const project = await this.model.findOne({ _id: projectId });
      // const projects = await updatedProject.save();

      // return projects;
    } catch (error) {
      throw new Error(
        `Error al actualizar el comentario del proyecto: ${error}`,
      );
    }
  }

  async filterByStatus(userId: string, status: string): Promise<IProject[]> {
    try {
      if (status === 'todos') {
        return await this.model.find({ userId });
      } else {
        const projects = await this.model.find({
          userId: userId,
        });
        const filtered = projects.filter(
          (project) => project.currentState === status,
        );
        console.log('result ', filtered);
        return filtered;
      }
    } catch (error) {
      throw new Error(`Error al filtrar proyectos: ${error}`);
    }
  }

  ///new

  async changeUsername(
    oldusername: string,
    username: string,
  ): Promise<IProject[]> {
    try {
      const projects = await this.model.find();
      const changedValues = [];
      projects.forEach((project) => {
        if (project.userId === oldusername) {
          project.userId = username;
          project.save();
          changedValues.push({ id: project.id, userId: project.userId });
        }
      });

      return changedValues;
    } catch (error) {
      throw new Error(
        `Error al cambiar el nombre de usuario proyectos: ${error}`,
      );
    }
  }

  // async addRating(
  //   id: string,
  //   ratings: { user: string; rate: number },
  // ): Promise<IProject> {
  //   try {
  //     const project = await this.model.findOne({ _id: id });

  //     if (!project) {
  //       return null;
  //     }

  //     if (!project.rating) {
  //       project.rating = [];
  //     }

  //     project.rating.push(ratings);

  //     const updatedProject = await project.save();

  //     return updatedProject;
  //   } catch (error) {
  //     throw new Error(`Error al agregar valoración al proyecto: ${error}`);
  //   }
  // }

  async addRating(
    id: string,
    rating: { user: string; rate: number },
  ): Promise<IProject> {
    try {
      const project = await this.model.findOne({ _id: id });

      if (!project) {
        return null;
      }

      // Verificar si el usuario ya ha valorado
      const existingRatingIndex = project.rating.findIndex(
        (r) => r.user === rating.user,
      );

      if (existingRatingIndex !== -1) {
        // Si el usuario ya ha valorado, actualizar la valoración existente
        project.rating[existingRatingIndex].rate = rating.rate;
      } else {
        // Si el usuario no ha valorado, agregar una nueva valoración
        if (!project.rating) {
          project.rating = [];
        }
        project.rating.push(rating);
      }

      const updatedProject = await project.save();

      return updatedProject;
    } catch (error) {
      throw new Error(
        `Error al agregar/actualizar valoración al proyecto: ${error}`,
      );
    }
  }

  async deleteRating(projectId: string, rateId: string): Promise<IProject> {
    try {
      const project = await this.model.findOne({ _id: projectId });

      if (!project) {
        return null;
      }

      // Filtra los comentarios, manteniendo solo aquellos que no coincidan con el ID del comentario a eliminar
      project.rating = project.rating.filter(
        (rating: any) => rating._id.toString() !== rateId,
      );

      // Guarda el proyecto actualizado
      const updatedProject = await project.save();

      return updatedProject;
    } catch (error) {
      throw new Error(`Error al eliminar valoración del proyecto: ${error}`);
    }
  }

  async editRating(
    projectId: string,
    rateId: string,
    rate: number,
  ): Promise<IProject> {
    try {
      const updatedProject = await this.model.findOneAndUpdate(
        { _id: projectId, 'rating._id': rateId },
        { $set: { 'rating.$.rate': rate } },
        { new: true },
      );

      const projectWithUpdatedRating = await this.model.findOne({
        _id: projectId,
      });

      return projectWithUpdatedRating;
    } catch (error) {
      throw new Error(
        `Error al actualizar el valoración del proyecto: ${error}`,
      );
    }
  }
}
