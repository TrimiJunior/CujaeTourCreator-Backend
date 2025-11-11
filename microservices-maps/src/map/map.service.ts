import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IMap, IMarker } from '../common/interfaces/map.interface';
import { MAP } from '../common/models/models';
import { CreateMapDTO, UpdateMapDTO } from './dto/map.dto';
import { MarkerDTO, UpdateMarkerDTO } from './dto/marker.dto';

@Injectable()
export class MapService {
  constructor(@InjectModel(MAP.name) private readonly model: Model<IMap>) {}

  async create(dto: CreateMapDTO): Promise<IMap> {
    const created = new this.model({ ...dto, markers: dto.markers || [] });
    return created.save();
  }

  async findByProject(projectId: string): Promise<IMap[]> {
    return this.model.find({ projectId });
  }

  async findOne(id: string): Promise<IMap> {
    return this.model.findById(id);
  }

  async update(id: string, dto: UpdateMapDTO): Promise<IMap> {
    return this.model.findByIdAndUpdate(id, dto, { new: true });
  }

  async delete(id: string) {
    await this.model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, msg: 'Deleted' };
  }

  async addMarker(mapId: string, marker: MarkerDTO): Promise<IMap> {
    return this.model.findByIdAndUpdate(
      mapId,
      { $push: { markers: marker } },
      { new: true }
    );
  }

  async updateMarker(mapId: string, markerId: string, marker: UpdateMarkerDTO): Promise<IMap> {
    return this.model.findOneAndUpdate(
      { _id: mapId, 'markers._id': markerId },
      {
        $set: {
          'markers.$.sceneId': marker.sceneId,
          'markers.$.x': marker.x,
          'markers.$.y': marker.y,
          'markers.$.description': marker.description,
        },
      },
      { new: true }
    );
  }

  async deleteMarker(mapId: string, markerId: string): Promise<IMap> {
    return this.model.findByIdAndUpdate(
      mapId,
      { $pull: { markers: { _id: markerId } } },
      { new: true }
    );
  }
}
