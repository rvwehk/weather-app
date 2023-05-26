import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from '../dto/create-user.tdo';
import { AuthService } from '../auth/auth.service';
import { LoginUserDto } from '../dto/login-user.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { User } from './user.entity';
import { CreateFavoriteDto } from 'src/dto/create-favorite.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

interface RequestWithUser extends Request {
    user: User;
}

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
    ) { }

    @ApiOperation({ summary: 'Register' })
    @Post('register')
    @ApiResponse({ status: 200, description: 'The user has been successfully registered.' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    async create(@Body() createUserDto: CreateUserDto) {
        await this.userService.create(
            createUserDto.email,
            createUserDto.password,
        );
        return { message: 'User created successfully' };
    }

    @ApiOperation({ summary: 'Set favorite city' })
    @Post('favorite-city')
    @ApiResponse({ status: 201, description: 'The favorite city has been successfully saved.' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    async favoriteCity(@Body() createFavorite: CreateFavoriteDto) {
        await this.userService.createFavorite(createFavorite.userId, createFavorite.city);
        return { message: 'City Favorite added successfully' };
    }

    @ApiOperation({ summary: 'Login' })
    @Post('login')
    @ApiResponse({ status: 201, description: 'The user has been successfully logged.' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
        const user = await this.authService.validateUser(loginUserDto.email, loginUserDto.password);
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = await this.authService.generateToken(user);
        return res.json({ token });
    }

    @ApiOperation({ summary: 'Password forgot' })
    @Post('forgot-password')
    @ApiResponse({ status: 201, description: 'A link has been sent to your address mail.' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    async forgotPassword(@Body() { email }: { email: string }) {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            return { message: 'User not found' };
        }
        const resetToken = await this.authService.generateResetToken(user);
        // Send reset email
        return { message: 'Reset email sent' };
    }

    @ApiOperation({ summary: 'Reset your password' })
    @Post('reset-password')
    @ApiResponse({ status: 201, description: 'Your password has been successfully changed.' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
        const user = await this.userService.findById(resetPasswordDto.userId);
        if (!user) {
            return { message: 'User not found' };
        }
        const tokenIsValid = await this.authService.validateResetToken(
            resetPasswordDto.token,
            user,
        );
        if (!tokenIsValid) {
            return { message: 'Invalid reset token' };
        }
        await this.userService.setPassword(
            resetPasswordDto.userId,
            resetPasswordDto.password,
        );
        return { message: 'Password reset successfully' };
    }

    @ApiOperation({ summary: 'Get user profile' })
    @Get('profile')
    @Post('reset-password')
    @ApiResponse({ status: 201, description: 'The user has been successfully founded.' })
    @UseGuards(AuthGuard('jwt'))
    async profile(@Req() req: RequestWithUser) {
        const userId = req.user['id'];
        const user = await this.userService.findById(userId);
        return {
            id: user.id,
            email: user.email,
            favorite: user.favorite
        };
    }
}
