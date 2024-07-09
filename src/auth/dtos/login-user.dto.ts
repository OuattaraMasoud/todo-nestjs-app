import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginUserDto {
    @ApiProperty({ description: 'The title of the todo' })
    @IsString()
    readonly userName: string;

    @ApiProperty({ description: 'The title of the todo' })
    @IsString()
    readonly password: string;


}
