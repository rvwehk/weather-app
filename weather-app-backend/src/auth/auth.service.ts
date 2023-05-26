import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { compare, hash } from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.userService.findByEmail(email);
        if (user && await this.comparePasswords(password, user.password)) {
            return user;
        }
        return null;
    }

    async login(user: User) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async generateToken(user: User) {
        const payload = { sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async generateResetToken(user: User) {
        const payload = { email: user.email, sub: user.id };
        return this.jwtService.sign(payload, { expiresIn: '1h' });
    }

    async validateResetToken(token: string, user: User) {
        try {
            const payload = this.jwtService.verify(token);
            return payload.email === user.email && payload.sub === user.id;
        } catch (e) {
            return false;
        }
    }

    private async comparePasswords(
        password: string,
        hashedPassword: string,
    ): Promise<boolean> {
        return await compare(password, hashedPassword);
    }

    async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        return await hash(password, saltRounds);
    }
}
