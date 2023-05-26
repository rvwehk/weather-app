import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateFavoriteDto {
    @IsUUID()
    userId: number;

    @IsString()
    @IsNotEmpty()
    city: string;
}
