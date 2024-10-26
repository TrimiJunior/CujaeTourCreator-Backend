import { HttpStatus, Injectable } from '@nestjs/common';
import { ILinkHostpot } from 'src/common/interfaces/link-hostpot.interface';
import { LinkHostpotDTO } from './dto/link-hostpot.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { LINKHOSTPOT } from 'src/common/models/models';
import { Model } from 'mongoose';

@Injectable()
export class LinkHostpotService {
  constructor(
    @InjectModel(LINKHOSTPOT.name) private readonly model: Model<ILinkHostpot>,
  ) {}

  async create(linkHostpotDTO: LinkHostpotDTO): Promise<ILinkHostpot> {
    const newLinkHostpot = new this.model(linkHostpotDTO);
    return await newLinkHostpot.save();
  }
  async findAll(): Promise<ILinkHostpot[]> {
    return await this.model.find();
  }
  async findOne(id: string): Promise<ILinkHostpot> {
    return await this.model.findById(id);
  }
  async update(
    id: string,
    linkHostpotDTO: LinkHostpotDTO,
  ): Promise<ILinkHostpot> {
    return await this.model.findByIdAndUpdate(id, linkHostpotDTO, {
      new: true,
    });
  }
  async delete(id: string) {
    await this.model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, msg: 'Deleted' };
  }

}
