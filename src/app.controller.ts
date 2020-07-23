import {
  Controller,
  Get,
  UseGuards,
  Request,
  Param,
  Post,
  All,
} from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt.auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';

const key = 'ext_auth_' + Math.round(Math.random() * 100000 + 99999);

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  // Deprecated
  @UseGuards(LocalAuthGuard)
  @Get(':key/login')
  async loginTest(@Param() params, @Request() req) {
    return await this.authService.login(req.user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return await new Promise(resolve => {
      setTimeout(() => {
        resolve(this.authService.login(req.user));
      }, 5000);
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('check')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('/')
  getLoginPage(): string {
    return this.appService.getLoginPage(key);
  }

  @All('*')
  findAll(@Request() req): any {
    return {
      status: false,
    };
  }
}
