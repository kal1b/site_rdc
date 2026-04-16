import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../common/prisma.service';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async register(dto: AuthDto) {
    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({ data: { email: dto.email, passwordHash } });
    return this.sign(user.id, user.email);
  }

  async login(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user || !(await bcrypt.compare(dto.password, user.passwordHash))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.sign(user.id, user.email);
  }

  async me(userId: string) {
    return this.prisma.user.findUnique({ where: { id: userId }, select: { id: true, email: true, role: true } });
  }

  private sign(sub: string, email: string) {
    return { accessToken: this.jwt.sign({ sub, email }) };
  }
}
