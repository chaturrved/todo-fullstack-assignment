import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';

@Injectable()
export class AuthService {

    constructor(private prisma: PrismaService, private jwtService: JwtService) {}

    async login(email: string, password: string) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
            return new NotFoundException(`No user found for email: ${email}`);
        }
        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
            return new UnauthorizedException('Invalid password');
        }
        const payload = { 
            userId: user.id,
            role: user.role,
        };
        return {
            access_token: this.jwtService.sign(payload),
            userId: user.id,
        };
    }

    async logout(response: Response){
        return response.cookie('Authentication', '', {
            httpOnly: true,
            expires: new Date(), 
        })
    }
}
