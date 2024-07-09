import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { AuthGuard } from "@nestjs/passport";
import { LoginUserDto } from "./dtos/login-user.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() req: LoginUserDto) {
        console.log("Request on login", req)
        return this.authService.login(req)
    }

    @Post('register')
    async register(@Body() userData: CreateUserDto) {
        console.log('UserData', userData);
        return this.authService.register(userData);
    }

    @Post('logout')
    async logout(@Body('token') token: string) {
        await this.authService.logout(token);
        return { message: 'Logout successful' };
    }
}