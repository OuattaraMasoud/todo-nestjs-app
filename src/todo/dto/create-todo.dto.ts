import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateTodoDto {
    @ApiProperty({ description: 'The read status of the todo' })
    @IsBoolean()
    @IsNotEmpty()
    readonly isReaded: boolean;

    @ApiProperty({ description: 'The message text of the todo' })
    @IsString()
    @IsNotEmpty()
    readonly messageText: string;

    @ApiProperty({ description: 'The title of the todo' })
    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @ApiProperty({ description: 'The user Id' })
    @IsString()
    @IsNotEmpty()
    readonly userId: string;

}
