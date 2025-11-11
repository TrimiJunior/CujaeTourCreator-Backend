import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Max, Min, IsNotEmpty } from 'class-validator';

export class MarkerDTO {
	@ApiProperty({ description: 'ID de la escena destino' })
	@IsString()
	@IsNotEmpty()
	sceneId: string;

	@ApiProperty({ description: 'Coordenada X relativa (0-1)', minimum: 0, maximum: 1 })
	@IsNumber()
	@Min(0)
	@Max(1)
	x: number;

	@ApiProperty({ description: 'Coordenada Y relativa (0-1)', minimum: 0, maximum: 1 })
	@IsNumber()
	@Min(0)
	@Max(1)
	y: number;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	description?: string;
}

