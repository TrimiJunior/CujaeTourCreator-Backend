import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class InfoHostpotDTO{
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
    readonly info: string;

    @ApiProperty()
    @IsNotEmpty()
    readonly position: Array<number>; 

}