import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class LinkHostpotDTO{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly sceneId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @ApiProperty()
  //  @IsNotEmpty()
    @IsString()
    readonly targetSceneId: string;

    @ApiProperty()
    @IsNotEmpty()
    readonly position: Array<number>; 

}