import {
  Controller,
  Get,
  UseGuards,
  Request,
  Param,
  Post,
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

  @UseGuards(LocalAuthGuard)
  @Get(':key/login')
  async loginTest(@Param() params, @Request() req) {
    console.log('Login test');
    return await this.authService.login(req.user);
  }

  @UseGuards(LocalAuthGuard)
  @Post(':key/login')
  async login(@Param() params, @Request() req) {
    console.log('Login test post', req.body);
    return await this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('check')
  getProfile(@Request() req) {
    console.log('Check');
    return req.user;
  }

  @Get('/')
  getLoginPage(): string {
    console.log('Login page', key);
    return this.appService.getLoginPage(key);
  }

  @Get('*')
  error(@Request() req) {
    console.log('Error', req.url);
    return '';
    // return await this.authService.login(req.user);
  }
}
