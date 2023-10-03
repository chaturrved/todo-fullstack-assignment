import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateTaskDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @ApiProperty()
    title: string;

    @IsString()
    @IsOptional()
    @MaxLength(300)
    @ApiProperty({ required: false })
    content?: string;

    @IsBoolean()
    @IsOptional()
    @ApiProperty({ required: false, default: false })
    completed?: boolean = false;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ required: false })
    authorId?: number;
}
