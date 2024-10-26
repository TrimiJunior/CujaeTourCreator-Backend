import { HttpStatus, Injectable } from '@nestjs/common';
import { IScene } from 'src/common/interfaces/scene.interface';
import { SceneDTO } from './dto/scene.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SCENE } from 'src/common/models/models';
import { Model } from 'mongoose';
import path from 'path'

@Injectable()
export class SceneService {
  constructor(@InjectModel(SCENE.name) private readonly model: Model<IScene>) {}

  async create(sceneDTO: SceneDTO): Promise<IScene> {
    const newScene = new this.model(sceneDTO);
    return await newScene.save();
  }
  async findAll(): Promise<IScene[]> {
    return await this.model.find();
  }
  async findOne(id: string): Promise<IScene> {
    return await this.model.findById(id);
  }
  async update(id: string, sceneDTO: SceneDTO): Promise<IScene> {
    return await this.model.findByIdAndUpdate(id, sceneDTO, { new: true });
  }
  async delete(id: string) {
    await this.model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, msg: 'Deleted' };
  }

}
