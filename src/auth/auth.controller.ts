import { Controller, Post, Body, OnModuleInit } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController implements OnModuleInit {
  constructor(private auth: AuthService) {}
  async onModuleInit() { await this.auth.seedAdmin(); }

  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    return this.auth.login(body.email, body.password);
  }
}
