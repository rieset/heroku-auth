import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './constants';
import fetch from 'node-fetch';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    if (username === '' || password === '') {
      throw new UnauthorizedException();
    }

    const status = await fetch(jwtConstants.basikValidator, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' +  (Buffer.from('' + username + ":" + password).toString('base64'))
      }
    })
    .then((res) => {
      return res.status
    })
    .catch((e) => {
      throw new UnauthorizedException();
    });

    if (status === 200) {
      return { username: username }
    }

    throw new UnauthorizedException();
  }
}
