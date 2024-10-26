import { HttpStatus, Injectable } from '@nestjs/common';
import { IInfoHostpot } from 'src/common/interfaces/info-hostpot.interface';
import { InfoHostpotDTO } from './dto/info-hostpot.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { INFOHOSTPOT } from 'src/common/models/models';
import { Model } from 'mongoose';

@Injectable()
export class InfoHostpotService {
  constructor(
    @InjectModel(INFOHOSTPOT.name) private readonly model: Model<IInfoHostpot>,
  ) {}

  async create(infoHostpotDTO: InfoHostpotDTO): Promise<IInfoHostpot> {
    const newInfoHostpot = new this.model(infoHostpotDTO);
    return await newInfoHostpot.save();
  }
  async findAll(): Promise<IInfoHostpot[]> {
    return await this.model.find();
  }
  async findOne(id: string): Promise<IInfoHostpot> {
    return await this.model.findById(id);
  }
  async update(
    id: string,
    infoHostpotDTO: InfoHostpotDTO,
  ): Promise<IInfoHostpot> {
    return await this.model.findByIdAndUpdate(id, infoHostpotDTO, {
      new: true,
    });
  }
  async delete(id: string) {
    await this.model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, msg: 'Deleted' };
  }

}
