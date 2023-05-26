import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ResetPasswordDto {
    @IsUUID()
    userId: number;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    token: string;
}
