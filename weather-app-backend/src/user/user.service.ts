import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async create(email: string, password: string): Promise<User> {
        const existingUser = await this.findByEmail(email);
        if (existingUser) {
            throw new ConflictException('User with this email already exists');
        }

        const hashedPassword = await hash(password, 10);
        const user = this.userRepository.create({
            email,
            password: hashedPassword,
        });
        return this.userRepository.save(user);
    }

    async createFavorite(id: number, city: string): Promise<void> {
        const existingUser = await this.findById(id);
        if (!existingUser) {
            throw new ConflictException('User not exists');
        }
        await this.userRepository.update(id, { favorite: city });
    }

    async findByEmail(email: string): Promise<User> {
        return this.userRepository.findOne({
            where: { email },
        });
    }

    async findById(id: number): Promise<User> {
        return this.userRepository.findOne({
            where: { id },
        });
    }

    async setPassword(id: number, password: string): Promise<void> {
        const hashedPassword = await hash(password, 10);
        await this.userRepository.update(id, { password: hashedPassword });
    }
}
