import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import fetch from 'node-fetch';
import {jwtConstants} from './constants';

@Injectable()
export class AuthService {
  constructor(
      private readonly jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const status = await fetch(jwtConstants.basikValidator, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' +  (Buffer.from('' + username + ":" + pass).toString('base64'))
      }
    })
    .then(res => res.status);

    if (status === 200) {
      return { success: true }
    }

    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: Math.round(Math.random() * 100000)};
    const token = {
      access_token: this.jwtService.sign(payload, {
        expiresIn: new Date(new Date().valueOf() + (120 * 60 * 1000)).valueOf()
      }),
    };
    console.log('Token', token);

    return token;
  }
}
