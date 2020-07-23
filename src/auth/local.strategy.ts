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
    if (
      !!jwtConstants.DEFAULT_USERNAME &&
      !!jwtConstants.DEFAULT_PASSWORD &&
      jwtConstants.DEFAULT_USERNAME === username &&
      jwtConstants.DEFAULT_PASSWORD === password
    ) {
      return {
        username: 'default',
      };
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
      .then(data => {
        return data;
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
          .then(data => {
            return data;
          })
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

    if (!!user && !!user.username) {
      return user;
    }

    throw new UnauthorizedException();
  }
}
