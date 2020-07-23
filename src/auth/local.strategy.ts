import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './constants';
import fetch from 'node-fetch';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super();

    console.log('LocalStrategy');
  }

  async validate(username: string, password: string): Promise<any> {
    console.log('Validate', username);

    if (username === '' || password === '') {
      console.log('Username and password not found');
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
      .then(data => {
        console.log('RAW DATA', data.status, data);
        return data;
      })
      .catch(e => {
        console.log('Error', e);
        throw new UnauthorizedException();
      })
      .then(response => response.json())
      .then(async res => {
        console.log('RES', res);

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
            console.log('RAW DATA API', data.status, data);
            return data;
          })
          .catch(e => {
            console.log('Error request api members', e);
            throw new UnauthorizedException();
          })
          .then(response => response.json())
          .then(async res => {
            console.log('MEMBERS', res);

            return res && res instanceof Array
              ? res.find(user => user.username === username)
              : null;
          });
      });

    console.log('User find', user);

    if (!!user && !!user.username) {
      console.log('Access user', user);
      return user;
    }

    throw new UnauthorizedException();
  }
}
