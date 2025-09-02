import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private users: Repository<User>,
    private jwt: JwtService,
  ) {}

  async seedAdmin() {
    const email = 'admin@menu.local';
    const exists = await this.users.findOne({ where: { email } });
    if (exists) return;
    const u = this.users.create({
      name: 'Admin',
      email,
      passwordHash: await bcrypt.hash('admin123', 10),
      role: 'admin',
    });
    await this.users.save(u);
  }

  async validate(email: string, password: string) {
    const user = await this.users.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    return user;
  }

  async login(email: string, password: string) {
    const user = await this.validate(email, password);
    const payload = { sub: user.id, role: user.role, email: user.email };
    return { access_token: await this.jwt.signAsync(payload) };
  }
}
