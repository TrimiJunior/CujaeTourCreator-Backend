import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class SceneDTO{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly projectId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly img: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    readonly initial: boolean; 

}