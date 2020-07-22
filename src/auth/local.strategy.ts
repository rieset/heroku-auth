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

    const user = await fetch(jwtConstants.basicValidator, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'password',
        username: username,
        password: password,
      }),
    })
      .catch(e => {
        throw new UnauthorizedException();
      })
      .then(response => response.json())
      .then(async res => {
        if (res.error) {
          return 403;
        }

        return await fetch(
          jwtConstants.API + '?access_token=' + res.access_token,
          {
            method: 'get',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
          .catch(e => {
            throw new UnauthorizedException();
          })
          .then(response => response.json())
          .then(async res => {
            return res && res instanceof Array
              ? res.find(user => user.username === username)
              : null;
          });
      });

    if (!!user && user.username) {
      console.log('Access user', user);
      return user;
    }

    throw new UnauthorizedException();
  }
}
