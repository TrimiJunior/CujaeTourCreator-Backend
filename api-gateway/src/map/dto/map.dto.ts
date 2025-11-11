import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { MarkerDTO } from './marker.dto';

export class MapDTO {
  @ApiProperty({ description: 'ID del proyecto al que pertenece el mapa' })
  @IsString()
  @IsNotEmpty()
  projectId: string;

  @ApiProperty({ description: 'Ruta relativa a la imagen base del mapa' })
  @IsString()
  @IsNotEmpty()
  baseImagePath: string;

  @ApiProperty({ type: [MarkerDTO], required: false, description: 'Lista de marcadores del mapa' })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MarkerDTO)
  markers?: MarkerDTO[];
}
