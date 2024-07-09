import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './interfaces/user.interface';
import { access } from 'fs';
import { LoginUserDto } from './dtos/login-user.dto';

@Injectable()
export class AuthService {
    private readonly invalidatedTokens: string[] = [];

    logger = new Logger(AuthService.name)

    constructor(
        private readonly prisma: PrismaService, private readonly jwtService: JwtService
    ) { }

    async register(userData: CreateUserDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        const user = await this.prisma.user.create({
            data: {
                ...userData,
                password: hashedPassword
            }
        });
        return user
    }

    async login(user: LoginUserDto) {
        console.log("USER =>", user)
        if (!user.userName && !user.password) {
            throw new Error("Invalide credentials");
        }
        const res = await this.validateUser(user.userName, user.password)
        if (!res) {
            throw new Error("Invalide user or credentials");
        }

        delete res.password;

        const token = await this.jwtService.signAsync(res)

        return {
            access_token: token,
        }
    }

    async validateUser(userName: string, pass: string): Promise<User> {

        console.log("username", userName, "pass", pass)
        const user = await this.prisma.user.findUnique({
            where: {
                userName:
                    userName
            }
        });
        console.log("user", user)
        if (user) {
            if (await bcrypt.compare(pass, user.password)) {
                console.log(user)
                return user;
            }
            else {
                this.logger.error("Invalide password")
                throw new UnauthorizedException("Invalide password")
            }

        }
        else {
            this.logger.error("User not found")
            throw new UnauthorizedException("User not found")
        }
    }
    async verifyUser(userName: string, pass: string): Promise<User> {

        console.log("username", userName, "pass", pass)
        const user = await this.prisma.user.findUnique({
            where: {
                userName:
                    userName
            }
        });
        console.log("user", user)
        if (user) {
            if (await bcrypt.compare(pass, user.password)) {
                console.log(user)
                return user;
            }
            else {
                this.logger.error("Invalide password")
                throw new UnauthorizedException("Invalide password")
            }

        }
        else {
            this.logger.error("User not found")
            throw new UnauthorizedException("User not found")
        }
    }

    isTokenInvalidated(token: string) {

        return this.invalidatedTokens.includes(token)
    }

    async logout(token: string): Promise<void> {
        this.invalidatedTokens.push(token);
    }
}


